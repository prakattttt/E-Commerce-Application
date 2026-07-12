import { Product } from "../models/products.models.js";

interface GetProductsOptions {
  skip?: number;
  category?: string;
  price?: string;
}

export const getProducts = async ({
  skip = 0,
  category,
  price,
}: GetProductsOptions) => {
  const query: Record<string, unknown> = {};

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

  return Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(12);
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
