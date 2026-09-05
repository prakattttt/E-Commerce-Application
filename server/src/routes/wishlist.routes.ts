import { Router } from "express";

import {
  addWishlistController,
  getWishlistController,
  removeWishlistController,
} from "../controllers/wishlist.controllers.js";

import { protect } from "../middlewares/authentication.js";

const router: Router = Router();

router.use(protect);

router.get("/", getWishlistController);

router.post("/:productId", addWishlistController);

router.delete("/:productId", removeWishlistController);

export default router;
