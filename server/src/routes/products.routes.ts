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

router.get("/:slug", getProductBySlug);

router.get("/:id/related", getRelatedProducts);

export default router;
