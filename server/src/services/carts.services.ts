import { Cart } from "../models/carts.models.js";
import { Product } from "../models/products.models.js";
import AppError from "../utils/AppError.js";

export const getCart = async (userId: string) => {
  return Cart.findOne({ user: userId }).populate(
    "items.product",
    "name slug price originalPrice imageCover stock",
  );
};

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    if (newQuantity > product.stock) {
      throw new AppError(
        `Only ${product.stock} item(s) available in stock`,
        400,
      );
    }

    existingItem.quantity = newQuantity;
  } else {
    if (quantity > product.stock) {
      throw new AppError(
        `Only ${product.stock} item(s) available in stock`,
        400,
      );
    }

    cart.items.push({
      product: productId as any,
      quantity,
    });
  }

  await cart.save();

  return getCart(userId);
};

export const updateCartItem = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  const item = cart.items.find((item) => item.product.toString() === productId);

  if (!item) {
    throw new AppError("Item not found in cart", 404);
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (quantity > product.stock) {
    throw new AppError(`Only ${product.stock} item(s) available in stock`, 400);
  }

  item.quantity = quantity;

  await cart.save();

  return getCart(userId);
};

export const removeCartItem = async (userId: string, productId: string) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) return null;

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  await cart.save();

  return getCart(userId);
};

export const clearCart = async (userId: string) => {
  await Cart.findOneAndUpdate(
    { user: userId },
    {
      items: [],
    },
  );

  return getCart(userId);
};

export const deleteCart = async (userId: string) => {
  await Cart.findOneAndDelete({ user: userId }, { runValidators: true });
};

export const removeProduct = async (productId: string) => {
  await Cart.updateMany(
    { "items.product": productId },
    {
      $pull: {
        items: {
          product: productId,
        },
      },
    },
  );
};
