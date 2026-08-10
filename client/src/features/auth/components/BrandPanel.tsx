import { motion } from "framer-motion";

import { fadeUp } from "../../../animations/index";
import FeaturesList from "./FeaturesList";

const BrandPanel = () => {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-primary p-8 text-primary-foreground lg:p-12">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

      {/* Brand */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="relative z-10 flex items-center gap-3"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-primary shadow-sm">
          S
        </div>

        <span className="font-display text-xl font-bold tracking-tight">
          Shop<span className="text-accent">Sphere</span>
        </span>
      </motion.div>

      {/* Hero */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
        className="relative z-10 my-12 max-w-lg"
      >
        <span className="mb-5 inline-flex rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur-sm">
          A better way to shop
        </span>

        <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
          Everything you love,
          <span className="mt-1 block text-white/70">all in one place.</span>
        </h1>

        <p className="mt-6 max-w-md text-sm leading-7 text-white/70 sm:text-base">
          Shop your favorites, keep track of every order, and manage your
          account with a simple shopping experience built around you.
        </p>
      </motion.div>

      {/* Features */}
      <div className="relative z-10">
        <FeaturesList />
      </div>
    </div>
  );
};

export default BrandPanel;
