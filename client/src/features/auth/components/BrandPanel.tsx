import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/index";
import FeaturesList from "./FeaturesList";
import Testimonial from "./Testimonial";

const BrandPanel = () => {
  return (
    <div className="relative hidden h-full overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-fuchsia-600 lg:flex lg:flex-col lg:justify-between lg:p-12 text-primary-foreground">
      <div className="pointer-events-none absolute -left-20 -top-20 h-90 w-90 rounded-full bg-white/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-90 w-90 rounded-full bg-fuchsia-300/20 blur-3xl" />

      {/* Brand */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="relative z-10 flex items-center gap-3"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold backdrop-blur">
          S
        </div>

        <span className="font-head text-xl font-semibold">
          Shop<span className="text-yellow-300">Sphere</span>
        </span>
      </motion.div>

      {/* Hero */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
        className="relative z-10 max-w-md"
      >
        <h1 className="font-head text-5xl font-bold leading-tight">
          Everything you need,
          <br />
          nothing you don't.
        </h1>

        <p className="mt-5 leading-7 text-white/75">
          One account gets you tracked orders, saved addresses, and a cart that
          remembers everything you love.
        </p>
      </motion.div>

      <FeaturesList />

      <Testimonial />
    </div>
  );
};

export default BrandPanel;
