import { motion } from "framer-motion";
import { Upload } from "lucide-react";

import { fadeUp } from "../../../animations";

const CategoryImageUpload = () => {
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 font-display text-xl font-bold">Category Image</h2>

      <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border transition hover:border-primary">
        <Upload className="mb-4 text-primary" size={34} />

        <span className="font-medium">Upload Category Image</span>

        <span className="mt-2 text-sm text-muted-foreground">PNG, JPG or WEBP</span>

        <input type="file" className="hidden" />
      </label>
    </motion.div>
  );
};

export default CategoryImageUpload;
