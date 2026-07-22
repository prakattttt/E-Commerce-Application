import { Product } from "../models/products.models.js";
import type { CreateProductDTO } from "../models/products.models.js";
import { Category } from "../models/categories.models.js";
import AppError from "../utils/AppError.js";
import { User } from "../models/users.models.js";
import type { PipelineStage } from "mongoose";

interface GetAllProductsOptions {
  skip?: number;
  category?: string;
  search?: string;
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
  search,
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

  /* Search */

  if (search && search.trim() !== "") {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        brand: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  return Product.find(query)
    .populate("category")
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(12);
};

export const getProductById = async (id: string) => {
  return Product.findById(id).populate("category", "name slug");
};

export const getCategories = async (
  skip = 0,
  search = "",
) => {
  const pipeline: PipelineStage[] = [];

  if (search.trim()) {
    pipeline.push({
      $match: {
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            slug: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      },
    });
  }

  pipeline.push(
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "category",
        as: "products",
      },
    },
    {
      $addFields: {
        productCount: {
          $size: "$products",
        },
      },
    },
    {
      $project: {
        products: 0,
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: 12,
    },
  );

  return Category.aggregate(pipeline);
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

export const getAllUsers = async (skip = 0) => {
  return User.find()
    .select("name email avatar role createdAt")
    .skip(skip)
    .limit(12);
};

export const deleteUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found", 400);
  }

  if (user.role === "admin") {
    throw new AppError("Admin users cannot be deleted", 400);
  }

  const totalUsers = await User.countDocuments();

  if (totalUsers <= 1) {
    throw new AppError("At least one user must remain", 400);
  }

  const deletedUser = await User.findByIdAndDelete(id);

  return deletedUser;
};
