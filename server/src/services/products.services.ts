import { Product } from "../models/products.models.js";

export const getProducts = async (skip = 0) => {
  return Product.find()
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(12);
};

export const getProductBySlug = async (slug: string) => {
  return Product.findOne({ slug }).populate("category", "name");
};

export const getFeaturedProducts = async () => {
  return Product.find().sort({ createdAt: -1 }).limit(8);
};
