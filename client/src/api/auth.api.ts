import api from "./axios";
import type { LoginData, RegisterData } from "../types/auth.types";

export const register = async (data: RegisterData) => {
  const { data: response } = await api.post("/users/register", data);

  return response;
};

export const login = async (data: LoginData) => {
  const { data: response } = await api.post("/users/login", data);

  return response;
};

export const logout = async () => {
  const { data: response } = await api.post("/users/logout");

  return response;
};

export const getMe = async () => {
  const { data: response } = await api.get("/users/me");

  return response;
};

export const updateProfile = async (data: Partial<RegisterData>) => {
  const { data: response } = await api.patch("/users/update", data);

  return response;
};

export const deleteAccount = async () => {
  const { data: response } = await api.delete("/users/delete");

  return response;
};
