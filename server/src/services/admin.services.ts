import { Product } from "../models/products.models.js";
import { Category } from "../models/categories.models.js";
import AppError from "../utils/AppError.js";
import { User } from "../models/users.models.js";
import type { PipelineStage } from "mongoose";
import {
  uploadToCloudinary,
  uploadImages,
} from "../utils/uploadToCloudinary.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/products.validators.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";
import z from "zod";
import { Cart } from "../models/carts.models.js";
import { deleteCart } from "./carts.services.js";

interface GetAllProductsOptions {
  skip?: number;
  category?: string;
  search?: string;
}

type CreateProductInput = z.infer<typeof createProductSchema>;
type updateProductInput = z.infer<typeof updateProductSchema>;

export const createProduct = async (
  data: CreateProductInput,
  imageCover?: Express.Multer.File,
  images: Express.Multer.File[] = [],
) => {
  const category = await Category.findById(data.category);

  if (!category) {
    throw new AppError("Category does not exist", 404);
  }

  const gallery = await Promise.all(
    images.map(async (image) => {
      const uploaded = await uploadToCloudinary(image);

      return {
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
      };
    }),
  );

  const cover = imageCover ? await uploadToCloudinary(imageCover) : null;

  return Product.create({
    ...data,

    ...(cover && {
      imageCover: {
        url: cover.secure_url,
        publicId: cover.public_id,
      },
    }),

    images: gallery,
  });
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

export const getCategories = async (skip = 0, search = "") => {
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
  slug: string,
  updateData: updateProductInput,
  imageCover?: Express.Multer.File,
  images: Express.Multer.File[] = [],
) => {
  const product = await Product.findOne({ slug });

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  if (updateData.category) {
    const exists = await Category.exists({ _id: updateData.category });

    if (!exists) {
      throw new AppError("Category does not exist.", 404);
    }
  }

  Object.assign(product, updateData);

  // Cover
  if (imageCover) {
    if (product.imageCover?.publicId) {
      await deleteFromCloudinary(product.imageCover.publicId);
    }

    const cover = await uploadToCloudinary(imageCover);

    product.imageCover = {
      url: cover.secure_url,
      publicId: cover.public_id,
    };
  }

  // Gallery
  if (images.length) {
    product.images.push(...(await uploadImages(images)));
  }

  await product.save();

  return product.populate("category", "name slug");
};

export const deleteProduct = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  if (product.imageCover?.publicId) {
    await deleteFromCloudinary(product.imageCover.publicId);
  }

  await Promise.all(
    product.images.map((image) => deleteFromCloudinary(image.publicId)),
  );

  await product.deleteOne();

  return product;
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

export const getAllUsers = async (skip = 0, search = "") => {
  const query: Record<string, unknown> = {};

  if (search.trim()) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  return User.find(query)
    .select("name email avatar role createdAt")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(12);
};

export const deleteUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found", 400);
  }

  const cart = await Cart.find({ userId: id });

  if (cart) {
    await deleteCart(id);
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
