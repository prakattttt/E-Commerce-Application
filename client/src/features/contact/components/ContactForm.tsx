import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { fadeUp } from "../../../animations";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    setSubmitted(true);
    toast.success("Message sent successfully!");
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
          Thanks for reaching out. We'll get back to you at{" "}
          <span className="font-semibold text-foreground">
            {form.email}
          </span>{" "}
          as soon as possible.
        </p>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              email: "",
              subject: "",
              message: "",
            });
          }}
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
        <h2 className="font-display text-2xl font-bold">
          Send us a message
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Fill out the form and we'll get back to you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name + Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-semibold"
          >
            Subject
          </label>

          <select
            id="subject"
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="">Select a topic</option>
            <option value="order">Order Support</option>
            <option value="product">Product Question</option>
            <option value="payment">Payment Issue</option>
            <option value="account">Account Support</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-semibold"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            required
            rows={11}
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us how we can help..."
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
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
