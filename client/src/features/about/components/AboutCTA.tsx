import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { fadeUp, scaleIn } from "../../../animations";

const AboutCTA = () => {
  return (
    <section className="py-20">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="overflow-hidden rounded-4xl bg-linear-to-r from-primary via-secondary-foreground to-primary p-10 text-center text-white shadow-2xl"
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="font-display text-3xl font-bold md:text-5xl"
        >
          Ready to Start Shopping?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={1}
          className="mx-auto mt-5 max-w-2xl text-base text-white/85 md:text-lg"
        >
          Discover thousands of quality products carefully selected from trusted
          brands. Shop confidently with secure payments, fast delivery, and
          customer-first support.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={2}
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-primary transition hover:-translate-y-1 hover:shadow-xl"
          >
            Shop Now
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutCTA;
