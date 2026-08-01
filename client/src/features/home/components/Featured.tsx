import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { fadeUp } from "../../../animations";
import ProductCard from "../../../components/common/ProductCard";
import { getFeaturedProducts } from "../api/home.api";
import type { IProduct } from "../../shop/types/products.types";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { toast } from "sonner";
import Loader from "../../../components/ui/Loader";

const Featured = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await getFeaturedProducts();
        setProducts(data.products);
      } catch (error) {
        toast.error(getErrorMessage(error), {
          id: "homepage-fetch-error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl py-24">
        <Loader />
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Hand Picked
          </p>

          <h2 className="mt-2 font-display text-4xl font-bold">
            Featured Products
          </h2>
        </div>

        <Link
          to="/shop"
          className="flex items-center gap-2 font-semibold text-primary transition hover:translate-x-1"
        >
          View All
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
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

export default Featured;
