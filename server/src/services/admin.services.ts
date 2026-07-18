import { Product } from "../models/products.models.js";
import type { CreateProductDTO } from "../models/products.models.js";
import { Category } from "../models/categories.models.js";
import AppError from "../utils/AppError.js";
import { User } from "../models/users.models.js";

interface GetAllProductsOptions {
  skip?: number;
  category?: string;
}

export const createProduct = async (data: CreateProductDTO) => {
  const category = await Category.findById(data.category);

  if (!category) {
    throw new AppError("Category does not exist", 404);
  }
  return Product.create(data);
};

export const getAllProducts = async ({
  skip = 0,
  category,
}: GetAllProductsOptions) => {
  const query: Record<string, unknown> = {};

  /* Category */

  if (category && category !== "all") {
    const categoryDoc = await Category.findOne({
      slug: category,
    });

    if (categoryDoc) {
      query.category = categoryDoc._id;
    }
  }

  return Product.find(query)
    .populate("category")
    .sort({createdAt: -1})
    .skip(skip)
    .limit(12);
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

export const getDashboard = async () => {
  const [products, users, categories] = await Promise.all([
    Product.countDocuments(),
    User.countDocuments(),
    Category.countDocuments(),
  ]);

  return {
    products,
    users,
    categories,
  };
};
