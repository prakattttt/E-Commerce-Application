export interface Product  {
  image: string;
  name: string;
  badge?: string;
  inStock?: boolean;
  brand?: string;
  rating?: number;
  reviews?: number;
  price: number;
  originalPrice?: number;
};