import { ArrowRight } from "lucide-react";
import ProductCard from "../../../components/common/ProductCard";
import { motion } from "framer-motion";
import { fadeUp } from "../../../animations";
import { useState, useEffect } from "react";
import type { IProduct } from "../../shop/types/products.types";
import { getTrendingProducts } from "../api/home.api";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { toast } from "sonner";
import Loader from "../../../components/ui/Loader";

const Trending = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashSaleProducts = async () => {
      try {
        const data = await getTrendingProducts();
        setProducts(data.products);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSaleProducts();
  }, []);

  if (loading) {
    <Loader fullScreen />;
  }

  if (products.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      {/* Header */}
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Hot Right Now
          </p>

          <h2 className="mt-2 font-display text-4xl font-bold">
            Trending Products
          </h2>
        </div>

        <button className="flex items-center gap-2 font-semibold text-primary transition hover:translate-x-1">
          View All
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Products */}
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

export default Trending;
