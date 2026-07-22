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
  async (req, res) => {
    const skip = Number(req.query.skip) || 0;

    const category = req.query.category as string;

    const search = req.query.search as string;

    const products = await AdminService.getAllProducts({
      skip,
      category,
      search,
    });

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
      users,
    });
  },
);

export const getAllUsers: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const skip = Number(req.query.skip) || 0;
    const search = (req.query.search as string) || "";

    const users = await AdminService.getAllUsers(skip, search);

    res.status(200).json({
      success: true,
      users,
    });
  },
);
export const getCategories: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const skip = Number(req.query.skip) || 0;
    const search = (req.query.search as string) || "";

    const categories = await AdminService.getCategories(skip, search);

    res.status(200).json({
      success: true,
      categories,
    });
  },
);

export const deleteUser: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const id = req.params.id as string;

    await AdminService.deleteUser(id);

    res
      .clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax" as const,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,

        message: "Account deleted",
      });
  },
);
