import z from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  email: z.string().trim().email("Invalid email address"),

  subject: z.enum(["order", "product", "payment", "account", "other"]),

  message: z.string().trim().min(1, "Message is required"),
});
