import api from "../../../api/axios";
import type { IAddToCart } from "../types/cart.types";

export const getCart = async () => {
  const response = await api.get("/cart/");
  return response.data;
};

export const addToCart = async ({ productId, quantity }: IAddToCart) => {
  const response = await api.post("/cart", {
    productId,
    quantity,
  });

  return response.data;
};

export const deleteCartItem = async (productId: string) => {
  const response = await api.delete(`/cart/${productId}`);

  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart");

  return response.data;
};
