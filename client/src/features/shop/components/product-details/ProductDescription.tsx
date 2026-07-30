import {
  BadgeCheck,
  Box,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

import { fadeUp } from "../../../../animations/index";
import type { IProduct } from "../../types/products.types";

interface ProductDescriptionProps {
  product: IProduct;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-20 space-y-10"
    >
      {/* Overview */}
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h2 className="mb-6 font-display text-3xl font-bold">
          Product Overview
        </h2>

        <p className="leading-8 whitespace-pre-line text-muted-foreground">
          {product.description}
        </p>
      </div>

      {/* Features */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <ShieldCheck className="mb-4 text-primary" size={28} />

          <h3 className="font-semibold">Authentic Product</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Guaranteed genuine product sourced directly from trusted brands.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <Truck className="mb-4 text-primary" size={28} />

          <h3 className="font-semibold">Fast Delivery</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Quick nationwide shipping with secure packaging.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <BadgeCheck className="mb-4 text-primary" size={28} />

          <h3 className="font-semibold">Quality Assured</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Every product undergoes quality inspection before shipping.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <Box className="mb-4 text-primary" size={28} />

          <h3 className="font-semibold">Easy Returns</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Hassle-free returns and exchanges on eligible products.
          </p>
        </div>
      </div>

      {/* Specifications */}
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h2 className="mb-8 font-display text-3xl font-bold">
          Specifications
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex justify-between border-b border-border pb-4">
            <span className="text-muted-foreground">Brand</span>
            <span className="font-semibold">{product.brand}</span>
          </div>

          <div className="flex justify-between border-b border-border pb-4">
            <span className="text-muted-foreground">Category</span>
            <span className="font-semibold">{product.category.name}</span>
          </div>

          <div className="flex justify-between border-b border-border pb-4">
            <span className="text-muted-foreground">Availability</span>

            <span
              className={`font-semibold ${
                product.stock > 0 ? "text-success" : "text-error"
              }`}
            >
              {product.stock > 0
                ? `${product.stock} in stock`
                : "Out of stock"}
            </span>
          </div>

          <div className="flex justify-between border-b border-border pb-4">
            <span className="text-muted-foreground">Customer Rating</span>

            <span className="flex items-center gap-2 font-semibold">
              <Star size={16} className="fill-gold text-gold" />
              {product.rating.toFixed(1)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Reviews</span>

            <span className="font-semibold">
              {product.reviews} Reviews
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProductDescription;