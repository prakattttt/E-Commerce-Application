import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";

import * as CartService from "../services/carts.services.js";

export const getCart: RequestHandler = expressAsyncHandler(async (req, res) => {
  const cart = await CartService.getCart(req.user._id);

  res.status(200).json({
    success: true,
    cart,
  });
});

export const addToCart: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const { productId, quantity = 1 } = req.body;

    const cart = await CartService.addToCart(req.user._id, productId, quantity);

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  },
);

export const updateCartItem: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const productId = req.params.productId as string;
    const { quantity } = req.body;

    const cart = await CartService.updateCartItem(
      req.user._id,
      productId,
      quantity,
    );

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart,
    });
  },
);

export const removeCartItem: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const productId = req.params.productId as string;

    const cart = await CartService.removeCartItem(req.user._id, productId);

    res.status(200).json({
      success: true,
      message: "Item removed",
      cart,
    });
  },
);

export const clearCart: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const cart = await CartService.clearCart(req.user._id);

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      cart,
    });
  },
);
