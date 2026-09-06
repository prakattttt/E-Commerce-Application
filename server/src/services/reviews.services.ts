import mongoose from "mongoose";

import { Order } from "../models/orders.models.js";
import { Product } from "../models/products.models.js";
import { Review } from "../models/reviews.models.js";
import AppError from "../utils/AppError.js";

export interface CreateReviewInput {
  rating: number;
  title?: string;
  comment: string;
}

export const getProductReviews = async (productId: string) => {
  if (!mongoose.isValidObjectId(productId)) {
    throw new AppError("Product not found.", 404);
  }

  return Review.find({ product: productId })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 })
    .limit(5);
};

const updateProductRating = async (productId: string) => {
  const [summary] = await Review.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: "$product",
        rating: { $avg: "$rating" },
        reviews: { $sum: 1 },
      },
    },
  ]);

  const rating = summary ? Number(summary.rating.toFixed(1)) : 0;
  const reviews = summary?.reviews ?? 0;

  await Product.findByIdAndUpdate(productId, { rating, reviews });

  return { rating, reviews };
};

export const createProductReview = async (
  productId: string,
  userId: string,
  input: CreateReviewInput,
) => {
  if (!mongoose.isValidObjectId(productId)) {
    throw new AppError("Product not found.", 404);
  }

  if (!(await Product.exists({ _id: productId }))) {
    throw new AppError("Product not found.", 404);
  }

  const rating = Number(input.rating);
  const comment = input.comment?.trim();
  const title = input.title?.trim();

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new AppError("Rating must be an integer between 1 and 5.", 400);
  }

  if (!comment || comment.length < 10 || comment.length > 1000) {
    throw new AppError("Review must be between 10 and 1000 characters.", 400);
  }

  if (title && title.length > 100) {
    throw new AppError("Review title cannot exceed 100 characters.", 400);
  }

  const deliveredOrder = await Order.exists({
    user: userId,
    orderStatus: "Delivered",
    "items.product": productId,
  });

  if (!deliveredOrder) {
    throw new AppError(
      "You can review this product after it has been delivered to you.",
      403,
    );
  }

  const alreadyReviewed = await Review.exists({
    product: productId,
    user: userId,
  });

  if (alreadyReviewed) {
    throw new AppError("You have already reviewed this product.", 409);
  }

  const reviewData: {
    product: string;
    user: string;
    rating: number;
    comment: string;
    title?: string;
  } = {
    product: productId,
    user: userId,
    rating,
    comment,
  };

  if (title) {
    reviewData.title = title;
  }

  const review = await Review.create(reviewData);

  const summary = await updateProductRating(productId);

  return {
    review: await Review.findById(review._id).populate("user", "name avatar"),
    rating: summary.rating,
    reviews: summary.reviews,
  };
};

export const deleteProductReview = async (
  reviewId: string,
  userId: string,
  isAdmin: boolean,
) => {
  if (!mongoose.isValidObjectId(reviewId)) {
    throw new AppError("Review not found.", 404);
  }

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new AppError("Review not found.", 404);
  }

  if (!isAdmin && review.user.toString() !== userId) {
    throw new AppError("You can only delete your own review.", 403);
  }

  await review.deleteOne();
  const summary = await updateProductRating(review.product.toString());

  return summary;
};
