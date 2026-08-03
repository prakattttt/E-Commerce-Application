import { z } from "zod";

const productSchema = z.object({
  name: z.string().trim().min(3).max(20),

  description: z.string().trim().min(10),

  price: z.coerce.number().min(0),

  originalPrice: z.coerce.number().min(0).optional(),

  stock: z.coerce.number().min(0),

  brand: z.string().trim().min(2),

  category: z.string(),

  badge: z.string().trim().optional(),

  featured: z.coerce.boolean().default(false),

  flashSale: z.coerce.boolean().default(false),
});

export const createProductSchema = productSchema.transform((data) => ({
  ...data,
  badge: data.badge ?? "",
  originalPrice: data.originalPrice ?? data.price,
}));

export const updateProductSchema = productSchema
  .partial()
  .transform((data) => ({
    ...data,
    badge: data.badge ?? "",
    originalPrice: data.originalPrice ?? data.price,
  }));
