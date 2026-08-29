import z from "zod";

export const createOrderSchema = z.object({
  shippingAddress: z.object({
    fullName: z.string().min(2).max(50),

    phone: z.string().regex(/^(97|98)\d{8}$/, "Invalid Nepal phone number"),

    address: z.string().min(5).max(200),

    city: z.string().min(2).max(50),

    province: z.string().min(2).max(50),
  }),

  paymentMethod: z.enum(["COD", "eSewa", "Khalti"]),
});

export type CreateOrderData = z.infer<typeof createOrderSchema>;
