import { motion } from "framer-motion";
import { ShieldCheck, Truck, Sparkles, HeartHandshake } from "lucide-react";
import { fadeUp } from "../../../animations";

const values = [
  {
    icon: ShieldCheck,
    title: "Trusted Quality",
    description:
      "Every product is carefully selected to ensure premium quality and long-lasting value.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Reliable shipping with secure packaging so your orders arrive safely and on time.",
  },
  {
    icon: Sparkles,
    title: "Curated Collection",
    description:
      "From fashion to electronics, we handpick products that combine style and performance.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Your satisfaction is our highest priority. We're always here to help before and after every purchase.",
  },
];

const AboutValues = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <h2 className="font-display text-4xl font-bold">Our Core Values</h2>

          <p className="mt-4 text-muted-foreground">
            Everything we do revolves around delivering an exceptional shopping
            experience built on trust, quality, and innovation.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                whileHover={{ y: -8 }}
                className="rounded-3xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={28} />
                </div>

                <h3 className="mb-3 font-display text-xl font-bold">
                  {value.title}
                </h3>

                <p className="leading-7 text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
