import api from "../../../api/axios";
import type {
  CreateReviewInput,
  CreateReviewResponse,
  DeleteReviewResponse,
  ProductReviewsResponse,
} from "../types/reviews.types";

export const getProductReviews = async (
  productId: string,
): Promise<ProductReviewsResponse> => {
  const { data } = await api.get(`/products/${productId}/reviews`);
  return data;
};

export const deleteProductReview = async (
  productId: string,
  reviewId: string,
): Promise<DeleteReviewResponse> => {
  const { data } = await api.delete(
    `/products/${productId}/reviews/${reviewId}`,
  );
  return data;
};

export const createProductReview = async (
  productId: string,
  review: CreateReviewInput,
): Promise<CreateReviewResponse> => {
  const { data } = await api.post(`/products/${productId}/reviews`, review);
  return data;
};
