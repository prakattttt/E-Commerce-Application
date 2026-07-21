import api from "../../../api/axios";
import type { CreateProductPayload } from "../types/products.types";
import type { CreateCategoryPayload } from "../types/categories.types";

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

export const getCategories = async () => {
  const response = await api.get("/admin/categories");
  return response.data;
};

export const createProduct = async (data: CreateProductPayload) => {
  const response = await api.post("/admin/products", data);
  return response.data;
};

export const createCategory = async (data: CreateCategoryPayload) => {
  const response = await api.post("/admin/categories", data);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/admin/products/${id}`);
  return response.data;
};

export const deleteCategory = async (slug: string) => {
  const response = await api.delete(`/admin/categories/${slug}`);
  return response.data;
};
