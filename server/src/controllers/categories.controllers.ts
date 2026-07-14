import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";

import * as CategoryService from "../services/category.services.js";
import AppError from "../utils/AppError.js";

export const createCategory: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const category = await CategoryService.createCategory(
      req.body.name,
      req.body.image,
    );

    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    });
  },
);

export const getCategories: RequestHandler = expressAsyncHandler(
  async (_req, res) => {
    const categories = await CategoryService.getCategories();

    res.status(200).json({
      success: true,
      categories,
    });
  },
);

export const getCategoryBySlug: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const slug = req.params.slug as string;
    const category = await CategoryService.getCategoryBySlug(slug);

    if (!category) {
      throw new AppError("Category not found.", 404);
    }

    res.status(200).json({
      success: true,
      category,
    });
  },
);

export const updateCategory: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const slug = req.params.slug as string;
    const category = await CategoryService.updateCategory(slug, req.body);

    if (!category) {
      throw new AppError("Category not found.", 404);
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category,
    });
  },
);

export const deleteCategory: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const slug = req.params.slug as string;
    const category = await CategoryService.deleteCategory(slug);

    if (!category) {
      throw new AppError("Category not found.", 404);
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  },
);
