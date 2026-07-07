export interface Product {
  image: string;
  name: string;
  badge?: string;
  inStock?: boolean;
  brand?: string;
  rating?: number;
  reviews?: number;
  price: number;
  originalPrice?: number;
}

export interface DiscountProduct {
  id: number;
  image: string;
  name: string;
  inStock: boolean;
  price: number;
  originalPrice: number;
  discount: number;
}
