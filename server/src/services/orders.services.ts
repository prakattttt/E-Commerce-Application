import mongoose from "mongoose";
import AppError from "../utils/AppError.js";
import type { CreateOrderData } from "../validators/orders.validators.js";
import { Cart } from "../models/carts.models.js";
import { Product } from "../models/products.models.js";
import { Order } from "../models/orders.models.js";

export const createOrderService = async (
  userId: string,
  data: CreateOrderData,
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const cart = await Cart.findOne({ user: userId }).session(session);

    if (!cart || cart.items.length === 0) {
      throw new AppError("Your cart is empty", 400);
    }

    const orderItems = [];

    let subtotal = 0;

    for (const cartItem of cart.items) {
      const product = await Product.findById(cartItem.product).session(session);

      if (!product) {
        throw new AppError("One or more products no longer exist", 400);
      }

      if (product.stock < cartItem.quantity) {
        throw new AppError(
          `Only ${product.stock} ${product.name} item(s) available`,
          400,
        );
      }

      subtotal += product.price * cartItem.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.imageCover.url ?? "",
        price: product.price,
        quantity: cartItem.quantity,
      });
    }

    //Price calculation

    const shippingCost = subtotal >= 5000 ? 0 : 250;

    const tax = subtotal * 0.13;

    const total = subtotal + shippingCost + tax;

    //Generate Order number

    const orderNumber = `SS-${Date.now()}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`;

    const [order] = await Order.create(
      [
        {
          orderNumber,
          user: userId,
          items: orderItems,
          subtotal: Number(subtotal.toFixed(2)),
          shippingCost: Number(shippingCost.toFixed(2)),
          tax: Number(tax.toFixed(2)),
          total: Number(total.toFixed(2)),
          shippingAddress: data.shippingAddress,
          paymentMethod: data.paymentMethod,
          paymentStatus: "Pending",
          orderStatus: "Pending",
        },
      ],
      { session },
    );

    for (const cartItem of cart.items) {
      const result = await Product.updateOne(
        {
          _id: cartItem.product,
          stock: { $gte: cartItem.quantity },
        },
        {
          $inc: {
            stock: -cartItem.quantity,
          },
        },
        { session },
      );

      if (result.modifiedCount === 0) {
        throw new AppError(
          "Stock changed while placing your order. Please try again.",
          409,
        );
      }
    }

    // Clear cart only for COD
    if (data.paymentMethod === "COD") {
      cart.items = [];
      await cart.save({ session });
    }

    await session.commitTransaction();

    return order;
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    await session.endSession();
  }
};

export const getMyOrdersService = async (userId: string) => {
  const orders = await Order.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });

  return orders;
};

export const getMyOrderService = async (userId: string, orderId: string) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError("Invalid order ID", 400);
  }

  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
};

export const cancelOrderService = async (userId: string, orderId: string) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError("Invalid order ID", 400);
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    }).session(session);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    if (order.orderStatus !== "Pending") {
      throw new AppError("This order can no longer be cancelled", 400);
    }

    //Return stock to products

    for (const item of order.items) {
      await Product.updateOne(
        {
          _id: item.product,
        },
        {
          $inc: {
            stock: item.quantity,
          },
        },
        { session },
      );
    }

    order.orderStatus = "Cancelled";

    await order.save({ session });

    await session.commitTransaction();

    return order;
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    await session.endSession();
  }
};
