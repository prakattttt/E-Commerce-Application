import { z } from "zod";

export const paymentMethodSchema = z.enum(["COD", "eSewa", "Khalti"]);

export const paymentStatusSchema = z.enum(["Pending", "Paid"]);

export const orderStatusSchema = z.enum([
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
]);

export const orderItemSchema = z.object({
  product: z.string(),

  name: z.string().min(1),
  image: z.string(),
  price: z.number().nonnegative(),

  quantity: z.number().int().min(1),
});

export const shippingAddressSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  province: z.string().min(1),
});

export const orderSchema = z.object({
  _id: z.string(),

  orderNumber: z.string().min(1),

  user: z.string(),

  items: z.array(orderItemSchema).min(1),

  subtotal: z.number().nonnegative(),
  shippingCost: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  total: z.number().nonnegative(),

  shippingAddress: shippingAddressSchema,

  paymentMethod: paymentMethodSchema,
  paymentStatus: paymentStatusSchema,

  orderStatus: orderStatusSchema,

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Order = z.infer<typeof orderSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;
export type OrderStatus = z.infer<typeof orderStatusSchema>;
