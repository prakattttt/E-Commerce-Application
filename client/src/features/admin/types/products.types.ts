export interface CreateProductPayload {
  name: string;
  description: string;

  price: number;
  originalPrice?: number;

  stock: number;

  brand: string;

  category: string;

  badge?: string;

  featured: boolean;
  flashSale: boolean;
}
