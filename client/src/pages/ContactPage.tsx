import { motion } from "framer-motion";

import { fadeUp } from "../animations/index";
import ContactForm from "../features/contact/components/ContactForm";
import ContactInfo from "../features/contact/components/ContactInfo";

const ContactPage = () => {
  return (
    <motion.main
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="py-10 sm:py-14 lg:py-16"
    >
      {/* Header */}
      <section className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Contact Us
        </span>

        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Let's talk
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          Have a question about an order, product, or anything else? Our team
          would love to hear from you.
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto mt-10 grid w-full max-w-5xl items-start gap-6 px-4 sm:mt-12 sm:gap-8 sm:px-6 lg:grid-cols-[1.4fr_0.8fr] lg:px-8">
        <ContactForm />

        <ContactInfo />
      </section>
    </motion.main>
  );
};

export default ContactPage;