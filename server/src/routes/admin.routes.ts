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
  getAllOrders,
  getOrderById,
  updateOrderPaymentStatus,
  updateOrderStatus,
} from "../controllers/admin.controllers.js";

import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controllers.js";

import { protect } from "../middlewares/authentication.js";
import { authorize } from "../middlewares/authorization.js";

import upload from "../middlewares/multer.js";

const router: Router = Router();

// Every route below requires admin access
router.use(protect);
router.use(authorize("admin"));

router.post(
  "/products",
  upload.fields([
    {
      name: "imageCover",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  createProduct,
);

router.get("/products", getAllProducts);

router.get("/users", getAllUsers);

router.get("/categories", getCategories);

router.get("/products/:id", getProductById);

router.get("/dashboard", getDashboard);

router.patch(
  "/products/:slug",
  upload.fields([
    {
      name: "imageCover",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  updateProduct,
);

router.delete("/products/:id", deleteProduct);

router.delete("/users/:id", deleteUser);

router.post("/categories", upload.single("image"), createCategory);

router.patch("/categories/:slug", upload.single("image"), updateCategory);

router.delete("/categories/:slug", deleteCategory);

router.get("/orders/all", getAllOrders);

router.get("/orders/:orderId", getOrderById);

router.patch("/orders/:orderId/payment-status", updateOrderPaymentStatus);

router.patch("/orders/:orderId/status", updateOrderStatus);

export default router;
