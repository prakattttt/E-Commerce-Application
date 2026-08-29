import api from "../../../api/axios";
import type { CheckoutFormValues } from "../types/checkout.schema";

export const createOrder = async (data: CheckoutFormValues) => {
  const response = await api.post("/orders/", {
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
