export interface IProductImage {
  url: string;
  publicId: string;
}

export interface IProduct {
  _id: string;

  name: string;
  slug: string;

  description: string;

  price: number;
  originalPrice?: number;

  stock: number;

  brand: string;

  category: string;

  imageCover: IProductImage;

  images: IProductImage[];

  rating: number;
  reviews: number;

  badge?: string;
}
