import api from "../../../api/axios";

export const getDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

export const getProducts = async () => {
  const response = await api.get("/admin/products");
  return response.data;
};
