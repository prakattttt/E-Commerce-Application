export interface CreateProductPayload {
  name: string;
  description: string;

  price: number;
  originalPrice?: number;

  stock: number;

  brand: string;

  category: string;

  rating?: number;
  reviews?: number;

  badge?: string;
}
