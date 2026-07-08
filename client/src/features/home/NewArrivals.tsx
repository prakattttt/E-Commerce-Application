import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "../../components/common/ProductCard";
import { newArrivalProducts } from "../../components/dummy/dummy";
import { fadeUp } from "../../animations/index";

const NewArrivals = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      {/* Header */}
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Just In
          </p>

          <h2 className="mt-2 font-display text-4xl font-bold">New Arrivals</h2>
        </div>

        <button className="flex items-center gap-2 font-semibold text-primary transition hover:gap-3">
          View All
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {newArrivalProducts.map((product, index) => (
          <motion.div
            key={product.id}
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
