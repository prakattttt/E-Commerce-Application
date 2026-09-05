import { Wishlist } from "../models/wishlist.models.js";
import { Product } from "../models/products.models.js";
import AppError from "../utils/AppError.js";

export const addToWishlist = async (userId: string, productId: string) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const existingWishlistItem = await Wishlist.findOne({
    user: userId,
    product: productId,
  });

  if (existingWishlistItem) {
    throw new AppError("Product is already in your wishlist", 400);
  }

  const wishlistItem = await Wishlist.create({
    user: userId,
    product: productId,
  });

  return wishlistItem;
};

export const getWishlist = async (userId: string) => {
  return Wishlist.find({ user: userId })
    .populate("product")
    .sort({ createdAt: -1 });
};

export const removeFromWishlist = async (userId: string, productId: string) => {
  const wishlistItem = await Wishlist.findOneAndDelete({
    user: userId,
    product: productId,
  });

  if (!wishlistItem) {
    throw new AppError("Product is not in your wishlist", 404);
  }

  return wishlistItem;
};