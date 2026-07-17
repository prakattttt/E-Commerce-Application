import type { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { createProductSchema } from "../validators/products.validators.js";

import * as AdminService from "../services/admin.services.js";

export const createProduct: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const data = createProductSchema.parse(req.body);
    const product = await AdminService.createProduct({
      ...data,
      originalPrice: data.originalPrice ?? data.price,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  },
);

export const getAllProducts: RequestHandler = expressAsyncHandler(
  async (_req, res) => {
    const products = await AdminService.getAllProducts();

    res.status(200).json({
      success: true,
      products,
    });
  },
);

export const getProductById: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const id = req.params.id as string;
    const product = await AdminService.getProductById(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      product,
    });
  },
);

export const updateProduct: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const id = req.params.id as string;
    const product = await AdminService.updateProduct(id, req.body);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  },
);

export const deleteProduct: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const id = req.params.id as string;
    const product = await AdminService.deleteProduct(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  },
);


export const getDashboard: RequestHandler = expressAsyncHandler(
  async (_req, res) => {
    const { products, categories, users } = await AdminService.getDashboard();
    res.status(200).json({
      success: true,
      products, 
      categories,
      users
    });
  },
);