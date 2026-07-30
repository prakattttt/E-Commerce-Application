import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import ProductCard from "../../../../components/common/ProductCard";
import { fadeUp } from "../../../../animations";

import type { IProduct } from "../../types/products.types";
import { getRelatedProducts } from "../../api/products.api";

interface RelatedProductsProps {
  categorySlug: string;
  currentProductId: string;
}

const RelatedProducts = ({
  categorySlug,
  currentProductId,
}: RelatedProductsProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getRelatedProducts(categorySlug, currentProductId);

        setProducts(data.products);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, currentProductId]);

  if (loading) {
    return (
      <section className="mx-auto mt-20 max-w-7xl">
        <h2 className="mb-8 font-display text-3xl font-bold">
          Related Products
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-90 animate-pulse rounded-2xl bg-card"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="mx-auto mt-20 max-w-7xl">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            You May Also Like
          </p>

          <h2 className="mt-2 font-display text-4xl font-bold">
            Related Products
          </h2>
        </div>

        <button className="flex items-center gap-2 font-semibold text-primary transition hover:translate-x-1">
          View More
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            variants={fadeUp}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
