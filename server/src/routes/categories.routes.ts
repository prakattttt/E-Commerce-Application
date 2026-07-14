import { Router } from "express";

import * as CategoryController from "../controllers/categories.controllers.js";

const router:Router = Router();

/* Public */

router.get("/", CategoryController.getCategories);

router.get("/:slug", CategoryController.getCategoryBySlug);

export default router;
