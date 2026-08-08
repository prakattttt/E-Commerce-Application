import { Cart } from "../models/carts.models.js";

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
    existingItem.quantity += quantity;
  } else {
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

  if (!cart) return null;

  const item = cart.items.find((item) => item.product.toString() === productId);

  if (!item) return null;

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
