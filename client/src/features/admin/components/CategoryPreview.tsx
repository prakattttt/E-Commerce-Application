import { motion } from "framer-motion";

import { fadeUp } from "../../../animations";

interface CategoryPreviewProps {
  name: string;
  description: string;
}

const CategoryPreview = ({ name, description }: CategoryPreviewProps) => {
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-5 font-display text-xl font-bold">Preview</h2>

      <div className="rounded-xl border border-border bg-background p-5">
        <div className="h-28 rounded-xl bg-secondary" />

        <h3 className="mt-4 text-lg font-semibold">{name || "Category Name"}</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          {description || "Category description preview..."}
        </p>
      </div>
    </motion.div>
  );
};

export default CategoryPreview;
