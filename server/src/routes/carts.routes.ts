import { Router } from "express";

import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/carts.controllers.js";

import { protect } from "../middlewares/authentication.js";

const router: Router = Router();

router.use(protect);

router.get("/", getCart);

router.post("/", addToCart);

router.patch("/:productId", updateCartItem);

router.delete("/:productId", removeCartItem);

router.delete("/", clearCart);

export default router;
