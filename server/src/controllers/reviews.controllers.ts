import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";

import {
  createProductReview,
  deleteProductReview,
  getProductReviews as getProductReviewsService,
} from "../services/reviews.services.js";

export const getProductReviews: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const id = req.params.productId as string;
    const reviews = await getProductReviewsService(id);

    res.status(200).json({
      success: true,
      reviews,
    });
  },
);

export const createReview: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const id = req.params.productId as string;

    const result = await createProductReview(id, req.user._id, req.body);

    res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      ...result,
    });
  },
);

export const deleteReview: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const summary = await deleteProductReview(
      req.params.reviewId as string,
      req.user._id,
      req.user.role === "admin",
    );

    res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
      ...summary,
    });
  },
);
