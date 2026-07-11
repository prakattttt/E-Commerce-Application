import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3).max(20),

  description: z.string().min(10),

  price: z.number().min(0),

  originalPrice: z.number().min(0).optional(),

  stock: z.number().min(0),

  brand: z.string().min(2),

  category: z.string().min(1),
});
