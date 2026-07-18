import api from "../../../api/axios";

export interface ProductFilters {
  category?: string;
}

export const getDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

export const getProducts = async (filters: ProductFilters = {}) => {
  const { data } = await api.get("/admin/products", {
    params: filters,
  });

  return data;
};

export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};
