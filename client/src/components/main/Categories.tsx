import { motion } from "framer-motion";
import { fadeUp } from "../../animations";
import categories from "./categories.data";

const Categories = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Browse By
        </p>

        <h2 className="mt-2 font-display text-4xl font-bold">
          Shop Categories
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category, index) => (
          <motion.button
            key={category.name}
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="group overflow-hidden rounded-2xl bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-3/4 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-4 text-left text-primary-foreground">
                <p className="text-2xl">{category.icon}</p>

                <h3 className="mt-1 font-semibold">{category.name}</h3>

                <p className="text-sm text-primary-foreground/70">
                  {category.count} Products
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
