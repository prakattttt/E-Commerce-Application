import api from "../../../api/axios";

export interface UpdateProfileData {
  name?: string;
  email?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface DeleteAccountData {
  password: string;
}

export const updateProfile = async (data: UpdateProfileData) => {
  const response = await api.patch("/users/me", data);

  return response.data;
};

export const updateProfilePicture = async (file: File) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await api.patch("/users/me/avatar", formData);

  return response.data;
};

export const changePassword = async (data: ChangePasswordData) => {
  const response = await api.patch("/users/me/password", data);

  return response.data;
};

export const deleteAccount = async (data: DeleteAccountData) => {
  const response = await api.delete("/users/me", {
    data,
  });

  return response.data;
};
