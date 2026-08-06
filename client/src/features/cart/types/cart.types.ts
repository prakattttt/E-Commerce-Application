import type { IProduct } from "../../shop/types/products.types";

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICart {
  _id: string;

  user: string;

  items: ICartItem[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IAddToCart {
  productId: string;
  quantity?: number;
}
