import { Product } from "../models/products.models.js";

interface GetProductsOptions {
  skip?: number;
  category?: string;
  price?: string;
  sort?: string;
}

export const getProducts = async ({
  skip = 0,
  category,
  price,
  sort,
}: GetProductsOptions) => {
  const query: Record<string, unknown> = {};

  /* Sorting */

  let sortOption: Record<string, 1 | -1> = {
    createdAt: -1,
  };

  switch (sort) {
    case "Most-Popular":
      sortOption = {
        reviews: -1,
      };
      break;

    case "Top-Rated":
      sortOption = {
        rating: -1,
      };
      break;

    case "L-H":
      sortOption = {
        price: 1,
      };
      break;

    case "H-L":
      sortOption = {
        price: -1,
      };
      break;

    case "Newest":
      sortOption = {
        createdAt: -1,
      };
      break;
  }

  /* Category Filter */

  if (category && category !== "All") {
    query.category = category;
  }

  /* Price Filter */

  switch (price) {
    case "P1":
      query.price = {
        $lt: 100,
      };
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

  return Product.find(query).sort(sortOption).skip(skip).limit(12);
};

export const getProductBySlug = async (slug: string) => {
  return Product.findOne({
    slug,
  });
};

export const getFeaturedProducts = async () => {
  return Product.find()
    .sort({
      rating: -1,
    })
    .limit(8);
};
