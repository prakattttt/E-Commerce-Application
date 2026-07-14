import { Category } from "../models/categories.models.js";

export const createCategory = async (
  name: string,
  image?: {
    url: string;
    publicId: string;
  },
) => {
  const categoryData = image ? { name, image } : { name };
  return Category.create(categoryData);
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
  return Category.findOneAndDelete({
    slug,
  });
};
