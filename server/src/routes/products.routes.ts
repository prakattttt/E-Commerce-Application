import { Router } from "express";

import {
  getProducts,
  getProductBySlug,
  getFeaturedProducts
} from "../controllers/products.controllers.js";

const router: Router = Router();

/*
    Product Routes

    GET     /api/products
    GET     /api/products/:slug
*/

router.get("/", getProducts);

router.get("/featured", getFeaturedProducts);

router.get("/:slug", getProductBySlug);


export default router;
