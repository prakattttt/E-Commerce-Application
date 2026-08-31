import type { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";

import {
  cancelOrderService,
  createOrderService,
  getMyOrderService,
  getMyOrdersService,
  getPendingPaymentOrderService,
  simulatePaymentService,
} from "../services/orders.services.js";

export const createOrder: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const order = await createOrderService(req.user._id.toString(), req.body);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  },
);

export const getMyOrders: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const orders = await getMyOrdersService(req.user._id.toString());

    res.status(200).json({
      success: true,
      orders,
    });
  },
);

export const getMyOrder: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const orderId = req.params.orderId as string;
    const order = await getMyOrderService(req.user._id.toString(), orderId);

    res.status(200).json({
      success: true,
      order,
    });
  },
);

export const getPendingPaymentOrder: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const order = await getPendingPaymentOrderService(req.user._id.toString());

    res.status(200).json({
      success: true,
      order,
    });
  },
);

export const simulatePayment: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const orderId = req.params.orderId as string;
    const order = await simulatePaymentService(orderId, req.user._id.toString());

    res.status(200).json({
      success: true,
      messagge: "Payment successful.",
      order,
    });
  },
);

export const cancelOrder: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const orderId = req.params.orderId as string;

    const order = await cancelOrderService(req.user._id.toString(), orderId);

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  },
);
