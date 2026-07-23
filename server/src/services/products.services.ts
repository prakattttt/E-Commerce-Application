import { Product } from "../models/products.models.js";
import { Category } from "../models/categories.models.js";

interface GetProductsOptions {
  skip?: number;
  category?: string;
  price?: string;
  sort?: string;
  search?: string;
}

export const getProducts = async ({
  skip = 0,
  category,
  price,
  sort,
  search,
}: GetProductsOptions) => {
  const query: Record<string, unknown> = {};

  /* Sorting */

  let sortOption: Record<string, 1 | -1> = {
    createdAt: -1,
  };

  switch (sort) {
    case "Most-Popular":
      sortOption = { reviews: -1 };
      break;

    case "Top-Rated":
      sortOption = { rating: -1 };
      break;

    case "L-H":
      sortOption = { price: 1 };
      break;

    case "H-L":
      sortOption = { price: -1 };
      break;

    case "Newest":
      sortOption = { createdAt: -1 };
      break;
  }

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

  if (search?.trim()) {
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

  /* Price */

  switch (price) {
    case "P1":
      query.price = { $lt: 100 };
      break;

    case "P2":
      query.price = {
        $gte: 100,
        $lte: 250,
      };
      break;

    case "P3":
      query.price = {
        $gte: 250,
        $lte: 500,
      };
      break;

    case "Premium":
      query.price = {
        $gt: 500,
      };
      break;
  }

  return Product.find(query)
    .populate("category")
    .sort(sortOption)
    .skip(skip)
    .limit(12);
};

export const getProductBySlug = async (slug: string) => {
  return Product.findOne({ slug }).populate("category");
};

export const getFeaturedProducts = async () => {
  return Product.find({ featured: true })
    .populate("category")
    .sort({ createdAt: -1 })
    .limit(8);
};
