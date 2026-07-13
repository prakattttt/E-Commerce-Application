import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";

import * as ProductService from "../services/products.services.js";
import AppError from "../utils/AppError.js";

export type ProductFilters = {
  category?: string;
  price?: string;
  sort?: string;
};

export const getProducts: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const skip = Number(req.query.skip) || 0;

    const category = req.query.category as string;
    const price = req.query.price as string;
    const sort = req.query.sort as string;

    const products = await ProductService.getProducts({
      skip,
      category,
      price,
      sort
    });

    res.status(200).json({
      success: true,
      message: "Products fetched successfully.",
      products,
    });
  },
);

export const getProductBySlug: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const slug = req.params.slug as string;

    if (!slug) {
      throw new AppError("Product slug is required", 400);
    }

    const product = await ProductService.getProductBySlug(slug);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully.",
      product,
    });
  },
);

export const getFeaturedProducts: RequestHandler = expressAsyncHandler(
  async (_req, res) => {
    const products = await ProductService.getFeaturedProducts();

    res.status(200).json({
      success: true,
      message: "Featured products fetched successfully.",
      products,
    });
  },
);
