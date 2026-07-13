import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeUp, scaleIn } from "../../../animations";

const features = [
  "Curated collection of quality products",
  "Secure payments with trusted gateways",
  "Fast delivery and order tracking",
  "Customer-first shopping experience",
];

const AboutStory = () => {
  return (
    <section className="mt-15 grid items-center gap-16 lg:grid-cols-2">
      {/* Left Content */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-6"
      >
        <span className="inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
          Our Story
        </span>

        <h2 className="font-display text-4xl font-bold leading-tight">
          Built with passion for modern online shopping.
        </h2>

        <p className="text-lg leading-8 text-muted-foreground">
          ShopSphere began with a simple idea—shopping should be fast,
          beautiful, and enjoyable. We wanted to create an online marketplace
          where discovering products feels effortless and every interaction is
          smooth.
        </p>

        <p className="leading-8 text-muted-foreground">
          From carefully designed interfaces to secure checkout and responsive
          customer support, every part of ShopSphere is focused on giving users
          the best possible shopping experience.
        </p>

        <div className="grid gap-4 pt-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              variants={fadeUp}
              custom={index + 2}
              className="flex items-center gap-3"
            >
              <CheckCircle2 className="text-primary" size={20} />

              <span className="font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative"
      >
        <div className="absolute -top-8 -left-8 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

        <img
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200"
          alt="Shopping"
          className="relative z-10 h-130 w-full rounded-4xl object-cover shadow-2xl"
        />
      </motion.div>
    </section>
  );
};

export default AboutStory;
