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

export const getProductBySlug = async (slug: string) => {
  const response = await api.get(`/products/${slug}`);
  return response.data;
};

export const searchProducts = async (search: string) => {
  const response = await api.get("/products", {
    params: {
      search,
    },
  });

  return response.data;
};

export const getRelatedProducts = async (
  category: string,
  productId: string,
) => {
  const response = await api.get(`/products/${productId}/related`, {
    params: {
      category,
    },
  });

  return response.data;
};
