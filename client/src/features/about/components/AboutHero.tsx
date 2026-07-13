import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, scaleIn } from "../../../animations";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary via-primary/90 to-secondary-foreground pt-14 pb-24 text-primary-foreground">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 h-10 w-full bg-linear-to-t from-background to-transparent"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-20">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-gold rounded-full border border-white/20 bg-ring px-5 py-2 text-sm font-medium backdrop-blur transition-all duration-150 hover:bg-card/5"
          >
            About ShopSphere
          </motion.span>

          <motion.h1
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="mt-5 max-w-4xl font-display text-5xl font-bold leading-tight md:text-6xl"
          >
            Shopping should feel
            <span className="text-gold"> effortless</span>, fast, and enjoyable.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-8 max-w-3xl text-lg leading-8 text-white/80"
          >
            ShopSphere is a modern e-commerce platform built to deliver a
            beautiful shopping experience with carefully designed interfaces,
            seamless browsing, secure checkout, and premium performance across
            every device.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <button className="flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-primary transition hover:scale-105">
              Explore Products
              <ArrowRight size={18} />
            </button>

            <button className="rounded-xl border border-white/30 px-7 py-3 font-semibold backdrop-blur transition hover:bg-white/10">
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
