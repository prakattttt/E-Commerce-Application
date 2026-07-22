import { Router } from "express";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getDashboard,
  getAllUsers,
  getCategories,
  deleteUser,
} from "../controllers/admin.controllers.js";

import * as CategoryController from "../controllers/categories.controllers.js";

import { protect } from "../middlewares/authentication.js";
import { authorize } from "../middlewares/authorization.js";

const router: Router = Router();

// Every route below requires admin access
router.use(protect);
router.use(authorize("admin"));

/*
    Admin Product Management Routes

    POST    /api/admin/products
    GET     /api/admin/products
    GET     /api/admin/products/:id
    PATCH   /api/admin/products/:id
    DELETE  /api/admin/products/:id
*/

router.post("/products", createProduct);

router.get("/products", getAllProducts);

router.get("/users", getAllUsers);

router.get("/categories", getCategories);

router.get("/products/:id", getProductById);

router.get("/dashboard", getDashboard);

router.patch("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

router.delete("/users/:id", deleteUser);

router.post(
  "/categories",
  protect,
  authorize("admin"),
  CategoryController.createCategory,
);

router.patch(
  "/categories/:slug",
  protect,
  authorize("admin"),
  CategoryController.updateCategory,
);

router.delete(
  "/categories/:slug",
  protect,
  authorize("admin"),
  CategoryController.deleteCategory,
);

export default router;
