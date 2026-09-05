import api from "../../../api/axios";
import type {
  IWishlistMutationResponse,
  IWishlistResponse,
} from "../types/wishlist.types";

export const getWishlist = async (): Promise<IWishlistResponse> => {
  const response = await api.get<IWishlistResponse>("/wishlist");

  return response.data;
};

export const addToWishlist = async (
  productId: string,
): Promise<IWishlistMutationResponse> => {
  const response = await api.post<IWishlistMutationResponse>(
    `/wishlist/${productId}`,
  );

  return response.data;
};

export const removeFromWishlist = async (
  productId: string,
): Promise<IWishlistMutationResponse> => {
  const response = await api.delete<IWishlistMutationResponse>(
    `/wishlist/${productId}`,
  );

  return response.data;
};
