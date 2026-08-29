import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  phone: z
    .string()
    .trim()
    .regex(/^(98|97)\d{8}$/, "Enter a valid 10-digit Nepali phone number"),

  address: z
    .string()
    .trim()
    .min(5, "Please enter a valid delivery address")
    .max(200, "Address cannot exceed 200 characters"),

  city: z
    .string()
    .trim()
    .min(2, "City is required")
    .max(50, "City cannot exceed 50 characters"),

  province: z.enum(
    [
      "Koshi",
      "Madhesh",
      "Bagmati",
      "Gandaki",
      "Lumbini",
      "Karnali",
      "Sudurpashchim",
    ],
    {
      error: "Please select a province",
    },
  ),

  payment: z.enum(["COD", "esewa", "khalti"], {
    error: "Please select a payment method",
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
