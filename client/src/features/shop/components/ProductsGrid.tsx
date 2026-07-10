import { motion } from "framer-motion";

import ProductCard from "../../../components/common/ProductCard";
import {
  trendingProducts,
  flashSaleProducts,
  newArrivalProducts,
} from "../../../components/dummy/dummy";
import { fadeUp } from "../../../animations";

// Combine all dummy product collections into a single list for display.
const products = [
  ...trendingProducts,
  ...flashSaleProducts,
  ...newArrivalProducts,
];

const ProductsGrid = () => {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product, index) => (
        <motion.div
          key={`${product.id}-${product.name}`}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={index}
        >
          {/* Render each product card with entrance animation on scroll. */}
          <ProductCard product={product} />
        </motion.div>
      ))}
    </section>
  );
};

export default ProductsGrid;
