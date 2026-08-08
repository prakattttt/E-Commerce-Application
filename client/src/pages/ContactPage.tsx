import { motion } from "framer-motion";

import { fadeUp } from "../animations/index";
import ContactForm from "../features/contact/components/ContactForm";
import ContactInfo from "../features/contact/components/ContactInfo";

const Contact = () => {
  return (
    <motion.main
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="container py-16"
    >
      {/* Header */}
      <section className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Contact Us
        </span>

        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Let's talk
        </h1>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
          Have a question about an order, product, or anything else?
          Our team would love to hear from you.
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <ContactForm />

        <ContactInfo />
      </section>
    </motion.main>
  );
};

export default Contact;