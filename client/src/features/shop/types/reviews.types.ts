export interface IReviewUser {
  _id: string;
  name: string;
  avatar?: {
    url: string;
    publicId: string;
  };
}

export interface IReview {
  _id: string;
  product: string;
  user: IReviewUser;
  rating: number;
  title?: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewInput {
  rating: number;
  title?: string;
  comment: string;
}

export interface ProductReviewsResponse {
  reviews: IReview[];
}

export interface CreateReviewResponse {
  review: IReview;
  rating: number;
  reviews: number;
}

export interface DeleteReviewResponse {
  rating: number;
  reviews: number;
}
