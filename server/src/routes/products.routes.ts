import { Router } from "express";

import {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getFlashSaleProducts
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

router.get("/:slug", getProductBySlug);


export default router;
