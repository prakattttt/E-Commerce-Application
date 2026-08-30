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
    cart = new Cart({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );

  const newQuantity = existingItem
    ? existingItem.quantity + quantity
    : quantity;


  if(product.stock === 0) {
        throw new AppError("Item out of stock.", 400);
  }

  if (newQuantity > product.stock) {
    throw new AppError(`Only ${product.stock} item(s) available in stock`, 400);
  }

  if (existingItem) {
    existingItem.quantity = newQuantity;
  } else {
    cart.items.push({
      product: product._id,
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
