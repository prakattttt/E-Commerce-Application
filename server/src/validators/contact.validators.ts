import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name is too long"),

  email: z.email(),

  subject: z.enum(["order", "product", "payment", "account", "other"], {
    message: "Please select a valid subject",
  }),

  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message is too long"),
});

export type ContactData = z.infer<typeof contactSchema>;
