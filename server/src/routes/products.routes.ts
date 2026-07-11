import { Router } from "express";

import {
  getProducts,
  getProductBySlug,
} from "../controllers/products.controllers.js";

const router: Router = Router();

/*
    Product Routes

    GET     /api/products
    GET     /api/products/:slug
*/

router.get("/", getProducts);

router.get("/:slug", getProductBySlug);

export default router;
