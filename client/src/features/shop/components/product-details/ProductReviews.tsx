import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { fadeUp } from "../../../../animations/index";
import type { IProduct } from "../../types/products.types";

interface ProductReviewsProps {
  product: IProduct;
}

const ProductReviews = ({ product }: ProductReviewsProps) => {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-12 rounded-3xl border border-border bg-card p-8 shadow-sm"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold">Customer Reviews</h2>

          <p className="mt-2 text-muted-foreground">
            {product.reviews} verified customer reviews
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-secondary px-5 py-3">
          <Star size={22} className="fill-gold text-gold" />

          <span className="text-2xl font-bold">
            {product.rating.toFixed(1)}
          </span>

          <span className="text-muted-foreground">/5</span>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-border py-16 text-center">
        <h3 className="text-xl font-semibold">Reviews Coming Soon</h3>

        <p className="mt-2 text-muted-foreground">
          Product reviews will appear here once customers start purchasing and
          reviewing this product.
        </p>
      </div>
    </motion.section>
  );
};

export default ProductReviews;
