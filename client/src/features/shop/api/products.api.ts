import api from "../../../api/axios";

export interface ProductFilters {
  category?: string;
  price?: string;
  sort?: string;
}

export const getAllProducts = async (filters: ProductFilters = {}) => {
  const { data } = await api.get("/products", {
    params: filters,
  });

  return data;
};

export const searchProducts = async (search: string) => {
  const response = await api.get("/products", {
    params: {
      search,
    },
  });

  return response.data;
};
