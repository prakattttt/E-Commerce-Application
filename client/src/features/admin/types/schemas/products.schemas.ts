// schemas/product.schema.ts

import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),

  description: z.string().trim().min(10, "Description must have at least 10 characters"),

  brand: z.string().trim().min(1, "Brand is required"),

  category: z.string().min(1, "Category is required"),

  price: z.coerce.number().positive(),

  originalPrice: z.coerce.number().optional(),

  stock: z.coerce.number().min(0),

  badge: z.string().optional(),

  featured: z.boolean(),

  flashSale: z.boolean(),
});

export type ProductFormValues = z.input<typeof productSchema>;
