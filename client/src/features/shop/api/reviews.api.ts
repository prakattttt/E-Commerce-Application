import api from "../../../api/axios";
import type {
  CreateReviewInput,
  CreateReviewResponse,
  ProductReviewsResponse,
} from "../types/reviews.types";

export const getProductReviews = async (
  productId: string,
): Promise<ProductReviewsResponse> => {
  const { data } = await api.get(`/products/${productId}/reviews`);
  return data;
};

export const createProductReview = async (
  productId: string,
  review: CreateReviewInput,
): Promise<CreateReviewResponse> => {
  const { data } = await api.post(`/products/${productId}/reviews`, review);
  return data;
};
