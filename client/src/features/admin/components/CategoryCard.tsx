import { motion } from "framer-motion";
import { Pencil, Trash2, Package } from "lucide-react";

import { fadeUp } from "../../../animations";
import type { ICategoryPlus } from "../types/categories.types";

interface CategoryCardProps {
  category: ICategoryPlus;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Category Icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
        <Package size={26} />
      </div>

      {/* Category Name */}
      <h2 className="font-display text-xl font-bold">{category.name}</h2>

      {/* Slug */}
      <p className="mt-1 text-sm text-muted-foreground">/{category.slug}</p>

      {/* Product Count */}
      <div className="mt-6 rounded-xl bg-secondary p-4">
        <p className="text-sm text-muted-foreground">Products</p>

        <h3 className="mt-1 text-2xl font-bold">{category.productCount}</h3>
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

export default CategoryCard;
