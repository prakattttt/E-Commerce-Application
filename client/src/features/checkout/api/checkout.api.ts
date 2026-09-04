import api from "../../../api/axios";

import type { CheckoutFormValues } from "../types/checkout.schema";
import type { Order } from "../types/ordres.schema";

interface IOrdersResponse {
  success: boolean;
  orders: Order[];
}

interface IOrderResponse {
  success: boolean;
  order: Order;
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  order: Order;
}

interface CancelOrderResponse {
  success: boolean;
  message: string;
  order: Order;
}

export const createOrder = async (
  data: CheckoutFormValues,
): Promise<CreateOrderResponse> => {
  const response = await api.post<CreateOrderResponse>("/orders/", {
    shippingAddress: {
      fullName: data.fullName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      province: data.province,
    },
    paymentMethod: data.payment,
  });

  return response.data;
};

export const getOrders = async (): Promise<IOrdersResponse> => {
  const response = await api.get<IOrdersResponse>("/orders/");
  return response.data;
};

export const getOrder = async (orderId: string): Promise<IOrderResponse> => {
  const response = await api.get<IOrderResponse>(`/orders/${orderId}`);

  return response.data;
};

export const getAdminOrder = async (orderId: string): Promise<IOrderResponse> => {
  const response = await api.get<IOrderResponse>(`/admin/orders/${orderId}`);

  return response.data;
};

export const getAllOrders = async (skip: number = 0): Promise<IOrdersResponse> => {
  const response = await api.get<IOrdersResponse>("/admin/orders/all", {
    params: {
      skip,
    },
  });

  return response.data;
};

export const updateOrderStatus = async (
  orderId: string,
  orderStatus: Order["orderStatus"],
): Promise<{ success: boolean; message: string; order: Order }> => {
  const response = await api.patch<{ success: boolean; message: string; order: Order }>(
    `/admin/orders/${orderId}/status`,
    {
      orderStatus,
    },
  );

  return response.data;
};

export const updateOrderPaymentStatus = async (
  orderId: string,
  paymentStatus: Order["paymentStatus"],
): Promise<{ success: boolean; message: string; order: Order }> => {
  const response = await api.patch<{ success: boolean; message: string; order: Order }>(
    `/admin/orders/${orderId}/payment-status`,
    {
      paymentStatus,
    },
  );

  return response.data;
};

export const getPendingPaymentOrder = async (): Promise<{
  success: boolean;
  order: Order | null;
}> => {
  const response = await api.get("/orders/pending-payment");

  return response.data;
};

export const simulatePayment = async (
  id: string,
): Promise<{
  success: boolean;
  messagge: string;
  order: Order | null;
}> => {
  const response = await api.patch(`/orders/pay/${id}`);

  return response.data;
};

export const cancelOrder = async (
  orderId: string,
): Promise<CancelOrderResponse> => {
  const response = await api.patch<CancelOrderResponse>(
    `/orders/${orderId}/cancel`,
  );

  return response.data;
};
