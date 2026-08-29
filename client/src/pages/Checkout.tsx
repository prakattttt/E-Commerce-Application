import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import { fadeUp } from "../animations";
import CheckoutForm from "../features/checkout/components/CheckoutForm";
import CheckoutSummary from "../features/checkout/components/CheckoutSummary";

const Checkout = () => {
  return (
    <motion.main
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="container px-4 py-10 sm:px-6 sm:py-14"
    >
      {/* Header */}
      <div className="mx-auto mt-10 max-w-6xl">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Checkout
          </span>

          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Complete your order
          </h1>

          <p className="mt-2 max-w-xl text-muted-foreground">
            Enter your delivery information and choose your preferred payment
            method.
          </p>
        </div>

        {/* Checkout content */}
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">
          <CheckoutForm />

          <CheckoutSummary />
        </div>

        {/* Security notice */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-4">
          <ShieldCheck size={20} className="mt-0.5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-semibold">Your information is secure</p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Your personal and payment information is securely handled during
              checkout.
            </p>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default Checkout;
