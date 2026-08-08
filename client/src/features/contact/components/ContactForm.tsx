import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../types/schemas/contact.schemas";
import type { ContactFormValues } from "../types/schemas/contact.schemas";
import { fadeUp } from "../../../animations";



const options = [
  { value: "order", label: "Order Support" },
  { value: "product", label: "Product Question" },
  { value: "payment", label: "Payment Issue" },
  { value: "account", label: "Account Support" },
  { value: "other", label: "Other" },
];

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);

    setSubmitted(true);
    toast.success("Message sent successfully!");
  };

  const handleNewMessage = () => {
    setSubmitted(false);
    reset();
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-130 flex-col items-center justify-center rounded-3xl border border-border bg-card p-8 text-center shadow-sm"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <Check size={30} className="text-success" />
        </div>

        <h2 className="mt-5 font-display text-2xl font-bold">
          Message received!
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Thanks for reaching out. We'll get back to you as soon as possible.
        </p>

        <button
          type="button"
          onClick={handleNewMessage}
          className="mt-6 text-sm font-semibold text-primary hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="mb-7">
        <h2 className="font-display text-2xl font-bold">Send us a message</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Fill out the form and we'll get back to you.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Your name"
              {...register("name")}
              className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.name ? "border-destructive" : "border-border"
              }`}
            />

            {errors.name && (
              <p className="mt-1.5 text-xs text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.email ? "border-destructive" : "border-border"
              }`}
            />

            {errors.email && (
              <p className="mt-1.5 text-xs text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-semibold">
            Subject
          </label>

          <select
            id="subject"
            {...register("subject")}
            className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
              errors.subject ? "border-destructive" : "border-border"
            }`}
          >
            <option value="">Select a topic</option>

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {errors.subject && (
            <p className="mt-1.5 text-xs text-destructive">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold">
            Message
          </label>

          <textarea
            id="message"
            rows={11}
            placeholder="Tell us how we can help..."
            {...register("message")}
            className={`w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
              errors.message ? "border-destructive" : "border-border"
            }`}
          />

          {errors.message && (
            <p className="mt-1.5 text-xs text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary flex w-full items-center justify-center gap-2"
        >
          <Send size={17} />
          Send Message
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
