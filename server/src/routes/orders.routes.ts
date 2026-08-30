import { Router } from "express";

import {
  cancelOrder,
  createOrder,
  getMyOrder,
  getMyOrders,
  getPendingPaymentOrder
} from "../controllers/orders.controllers.js";

import { protect } from "../middlewares/authentication.js";

const router: Router = Router();

router.use(protect);

router.post("/", createOrder);

router.get("/", getMyOrders);

router.get("/pending-payment", getPendingPaymentOrder);

router.get("/:orderId", getMyOrder);

router.patch("/:orderId/cancel", cancelOrder);

export default router;
