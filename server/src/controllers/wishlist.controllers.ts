import type { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../services/wishlist.services.js";

export const addWishlistController: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.productId as string;

    const wishlistItem = await addToWishlist(userId, productId);

    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      wishlistItem,
    });
  },
);

export const getWishlistController: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const userId = req.user._id;

    const wishlist = await getWishlist(userId);

    res.status(200).json({
      success: true,
      wishlist,
    });
  },
);

export const removeWishlistController: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.productId as string;

    await removeFromWishlist(userId, productId);

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
    });
  },
);

