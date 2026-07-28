import type { IProductImage } from "./products.types";

export interface ICategory {
  _id: string;

  name: string;

  slug: string;

  image: IProductImage;
}
