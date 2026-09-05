import type { IProduct } from "../../shop/types/products.types";

export interface IWishlistItem {
  _id: string;
  user: string;
  product: IProduct;
  createdAt: string;
  updatedAt: string;
}

export interface IWishlistResponse {
  success: boolean;
  wishlist: IWishlistItem[];
}

export interface IWishlistMutationResponse {
  success: boolean;
  message: string;
  wishlistItem?: IWishlistItem;
}
