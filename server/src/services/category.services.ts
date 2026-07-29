import type { CreateCategoryInput } from "../validators/categories.validator.js";
import AppError from "../utils/AppError.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { Category } from "../models/categories.models.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";

export const createCategory = async (
  data: CreateCategoryInput,
  image?: Express.Multer.File,
) => {
  let uploadedImage:
    | {
        url: string;
        publicId: string;
      }
    | undefined;

  if (image) {
    const uploaded = await uploadToCloudinary(image, "categories");

    uploadedImage = {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    };
  }

  return Category.create({
    ...data,

    ...(uploadedImage && {
      image: uploadedImage,
    }),
  });
};

export const getCategories = async () => {
  return Category.find().sort({
    name: 1,
  });
};

export const getCategoryBySlug = async (slug: string) => {
  return Category.findOne({
    slug,
  });
};

export const updateCategory = async (
  slug: string,
  data: {
    name?: string;
    image?: {
      url: string;
      publicId: string;
    };
  },
) => {
  return Category.findOneAndUpdate(
    {
      slug,
    },
    data,
    {
      new: true,
      runValidators: true,
    },
  );
};

export const deleteCategory = async (slug: string) => {
  const category = await Category.findOne({ slug });

  if (!category) {
    throw new AppError("Category not found.", 404);
  }

  if (category.image?.publicId) {
    await deleteFromCloudinary(category.image.publicId);
  }

  await category.deleteOne();

  return category;
};
