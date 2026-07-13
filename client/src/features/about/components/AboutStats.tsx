import { motion } from "framer-motion";
import { Users, ShoppingBag, Star, Truck } from "lucide-react";
import { fadeUp } from "../../../animations";

const stats = [
  {
    icon: Users,
    value: "10K+",
    label: "Happy Customers",
  },
  {
    icon: ShoppingBag,
    value: "500+",
    label: "Products Available",
  },
  {
    icon: Star,
    value: "98%",
    label: "Customer Satisfaction",
  },
  {
    icon: Truck,
    value: "24/7",
    label: "Customer Support",
  },
];

const AboutStats = () => {
  return (
    <section className="mt-15 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            whileHover={{
              y: -6,
              transition: { duration: 0.05 },
            }}
            className="group rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition hover:shadow-xl"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition group-hover:bg-primary">
              <Icon
                size={30}
                className="text-primary transition group-hover:text-white"
              />
            </div>

            <h3 className="font-display text-4xl font-bold text-primary">
              {stat.value}
            </h3>

            <p className="mt-2 text-muted-foreground">{stat.label}</p>
          </motion.div>
        );
      })}
    </section>
  );
};

export default AboutStats;
