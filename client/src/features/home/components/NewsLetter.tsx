import { motion } from "framer-motion";
import { scaleIn } from "../../../animations";

const Newsletter = () => {
  return (
    <motion.section
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto mb-24 max-w-7xl px-6"
    >
      <div className="relative overflow-hidden rounded-4xl border border-border bg-card px-8 py-14 shadow-[0_20px_80px_rgba(99,102,241,0.08)] md:px-16 md:py-16">
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Join 50,000+ happy shoppers
          </div>

          {/* Heading */}
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-5xl">
            Get exclusive offers before everyone else.
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Early access to new collections, member-only discounts, flash sale
            alerts, and curated recommendations delivered to your inbox.
          </p>

          {/* Form */}
          <form className="mt-10 flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Email address"
              className="w-full flex-1 rounded-2xl border border-border bg-background px-5 py-3 shadow-sm transition-all duration-300 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-muted-foreground"
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-primary px-7 py-3 font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 sm:w-auto"
            >
              Subscribe
            </button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            No spam. Unsubscribe whenever you want.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default Newsletter;
