import api from "../../../api/axios";

import type {
  LoginFormData,
  RegisterFormData,
} from "../schemas/auth.schema";

// Register

export const registerUser = async (data: RegisterFormData) => {
  const response = await api.post("/users/register", data);

  return response.data;
};

// Login

export const loginUser = async (data: LoginFormData) => {
  const response = await api.post("/users/login", data);

  return response.data;
};

// Logout

export const logoutUser = async () => {
  const response = await api.post("/users/logout");

  return response.data;
};

// Get current user

export const getMe = async () => {
  const response = await api.get("/users/me");

  return response.data;
};
