import { Product } from "../models/products.models.js";
import type { CreateProductDTO } from "../models/products.models.js";

export const createProduct = async (data: CreateProductDTO) => {
  const product = await Product.create({
    ...data,
    category: data.category,
  });

  return product;
};

export const getAllProducts = async () => {
  return Product.find()
  // .populate("category", "name")
  .sort({
    createdAt: -1,
  });
};

export const getProductById = async (id: string) => {
  return Product.findById(id).populate("category", "name");
};

export const updateProduct = async (id: string, updateData: any) => {
  return Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteProduct = async (id: string) => {
  return Product.findByIdAndDelete(id);
};
