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
