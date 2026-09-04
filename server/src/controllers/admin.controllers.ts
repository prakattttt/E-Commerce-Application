import type { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/products.validators.js";

import * as AdminService from "../services/admin.services.js";

export const createProduct: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const data = createProductSchema.parse(req.body);

    const files = req.files as {
      imageCover?: Express.Multer.File[];
      images?: Express.Multer.File[];
    };

    const product = await AdminService.createProduct(
      data,
      files.imageCover?.[0],
      files.images ?? [],
    );

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
    const slug = req.params.slug as string;

    const validatedData = updateProductSchema.parse(req.body);

    const files = req.files as {
      imageCover?: Express.Multer.File[];
      images?: Express.Multer.File[];
    };

    const product = await AdminService.updateProduct(
      slug,
      validatedData,
      files.imageCover?.[0],
      files.images ?? [],
    );

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
    const { products, categories, users, orders, recentOrders } = await AdminService.getDashboard();
    res.status(200).json({
      success: true,
      products,
      categories,
      users,
      orders,
      recentOrders,
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

    res.status(200).json({
      success: true,

      message: "Account deleted",
    });
  },
);

export const getAllOrders: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const skip = Number(req.query.skip) || 0;

    const orders = await AdminService.getAllOrdersService(skip);

    res.status(200).json({
      success: true,
      orders,
    });
  },
);

export const updateOrderStatus: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const orderId = req.params.orderId as string;
    const orderStatus = req.body.orderStatus as
      | "Pending"
      | "Processing"
      | "Shipped"
      | "Delivered"
      | "Cancelled";

    const order = await AdminService.updateOrderStatusService(orderId, orderStatus);

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  },
);
