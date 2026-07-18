import type { ICategory } from "../../shop/types/categories.types";

export interface ICategoryPlus extends ICategory {
    productCount: number;
}