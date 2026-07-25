import api from "../../../api/axios";

export const getFeaturedProducts = async () => {
  const response = await api.get("/products/featured");
  return response.data;
};

export const getFlashSaleProducts = async () => {
  const response = await api.get("/products/flash-sale");
  return response.data;
};
