import { Product } from "../models/products.models.js";
import type { CreateProductDTO } from "../models/products.models.js";
import { Category } from "../models/categories.models.js";
import AppError from "../utils/AppError.js";

export const createProduct = async (data: CreateProductDTO) => {
  const category = await Category.findById(data.category);

  if (!category) {
    throw new AppError("Category does not exist", 404);
  }
  return Product.create(data);
};

export const getAllProducts = async () => {
  return Product.find().populate("category", "name slug").sort({
    createdAt: -1,
  });
};

export const getProductById = async (id: string) => {
  return Product.findById(id).populate("category", "name slug");
};

export const updateProduct = async (
  id: string,
  updateData: Partial<CreateProductDTO>,
) => {
  return Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).populate("category", "name slug");
};

export const deleteProduct = async (id: string) => {
  return Product.findByIdAndDelete(id);
};
