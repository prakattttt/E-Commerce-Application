import { motion } from "framer-motion";
import { Pencil, Trash2, StarIcon } from "lucide-react";

import { fadeUp } from "../../../animations";
import type { IProduct } from "../../shop/types/products.types";

interface ProductCardProps {
  product: IProduct;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Product Image */}
      <div className="flex gap-4">
        <img
          src={product.imageCover.url}
          alt={product.name}
          className="h-20 w-20 rounded-xl border border-border object-cover"
        />

        <div className="flex-1">
          <h2 className="font-semibold">{product.name}</h2>

          <p className="text-sm text-muted-foreground">{product.brand}</p>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Category</span>

          <span>{product.category.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Price</span>

          <span className="font-semibold">${product.price.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Stock</span>

          <span>{product.stock}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Rating</span>

          <span className="flex items-center gap-1">
            <StarIcon size={18} className="fill-gold text-gold" /> {product.rating} (
            {product.reviews})
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Status</span>

          {product.stock > 0 ? (
            <span className="rounded-full bg-success/15 px-3 py-1 text-xs text-success">
              In Stock
            </span>
          ) : (
            <span className="rounded-full bg-error/15 px-3 py-1 text-xs text-error">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-3 transition-all duration-200 hover:bg-secondary">
          <Pencil size={18} />
          Edit
        </button>

        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-error/10 py-3 text-error transition-all duration-200 hover:bg-error hover:text-white">
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
