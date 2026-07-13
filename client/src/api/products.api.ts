import api from "./axios";

export interface ProductFilters {
  category?: string;
  price?: string;
  sort?: string;
};

export const getAllProducts = async (filters: ProductFilters = {}) => {
  const { data } = await api.get("/products", {
    params: filters,
  });

  return data;
};
