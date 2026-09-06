import { Router } from "express";

import {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getFlashSaleProducts,
  getNewProducts,
  getTrendingProducts,
  getRelatedProducts
} from "../controllers/products.controllers.js";
import {
  createReview,
  deleteReview,
  getProductReviews,
} from "../controllers/reviews.controllers.js";
import { protect } from "../middlewares/authentication.js";

const router: Router = Router();

/*
    Product Routes

    GET     /api/products
    GET     /api/products/:slug
*/

router.get("/", getProducts);

router.get("/featured", getFeaturedProducts);

router.get("/flash-sale", getFlashSaleProducts);

router.get("/latest", getNewProducts);

router.get("/trending", getTrendingProducts);

router.get("/:productId/reviews", getProductReviews);

router.post("/:productId/reviews", protect, createReview);

router.delete("/:productId/reviews/:reviewId", protect, deleteReview);

router.get("/:id/related", getRelatedProducts);

router.get("/:slug", getProductBySlug);

export default router;
