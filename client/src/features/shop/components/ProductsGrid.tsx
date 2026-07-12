import { motion } from "framer-motion";

import ProductCard from "../../../components/common/ProductCard";
// import {
//   trendingProducts,
//   flashSaleProducts,
//   newArrivalProducts,
// } from "../../../components/dummy/dummy";
import { fadeUp } from "../../../animations";
import { useEffect, useState } from "react";
import type { IProduct } from "../types/products.types";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { getAllProducts } from "../../../api/products.api";

// Combine all dummy product collections into a single list for display.
// const products = [
//   ...trendingProducts,
//   ...flashSaleProducts,
//   ...newArrivalProducts,
// ];

type Props = {
  selectedCategory: string;
  selectedPrice: string;
};

const ProductsGrid = ({ selectedCategory, selectedPrice }: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts({
          category: selectedCategory,
          price: selectedPrice,
        });
        setProducts(data.products);
      } catch (error) {
        getErrorMessage(error);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedPrice]);

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products?.map((product, index) => (
        <motion.div
          key={product._id}
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
