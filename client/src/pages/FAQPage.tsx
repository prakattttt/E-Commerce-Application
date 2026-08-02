import { motion } from "framer-motion";

import FAQAccordion from "../features/faq/components/FAQComponent";

import { fadeUp } from "../animations";

const FAQPage = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mx-auto mb-16 max-w-3xl text-center"
      >
        <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          Support Center
        </span>

        <h1 className="mt-5 font-display text-4xl font-bold sm:text-5xl">
          Frequently Asked Questions
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          Everything you need to know about orders, payments, delivery, returns
          and your ShopSphere account.
        </p>
      </motion.div>

      <FAQAccordion />
    </section>
  );
};

export default FAQPage;
