import { motion } from "framer-motion";
import { ImagePlus, X } from "lucide-react";

import { fadeUp } from "../../../animations";

const ProductImagesForm = () => {
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 font-display text-xl font-bold">Product Images</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-3 block text-sm font-medium">Cover Image</label>

          <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background transition hover:border-primary hover:bg-secondary/30">
            <ImagePlus size={40} className="mb-3 text-muted-foreground" />

            <p className="font-medium">Upload Cover Image</p>

            <span className="mt-1 text-sm text-muted-foreground">PNG, JPG or WEBP</span>

            <input type="file" hidden />
          </label>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium">Gallery Images</label>

          <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background transition hover:border-primary hover:bg-secondary/30">
            <ImagePlus size={36} className="mb-3 text-muted-foreground" />

            <p className="font-medium">Upload Multiple Images</p>

            <span className="mt-1 text-sm text-muted-foreground">
              Select multiple product images
            </span>

            <input type="file" multiple hidden />
          </label>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <label className="block text-sm font-medium">Image Preview</label>

          <span className="text-xs text-muted-foreground">3 images selected</span>
        </div>

        <div className="flex flex-wrap gap-3">
          {[1, 2, 3].map((image) => (
            <div
              key={image}
              className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border"
            >
              <div className="h-full w-full bg-secondary" />

              <button
                type="button"
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-error"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          <label className="flex h-24 w-24 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-background text-muted-foreground transition hover:border-primary hover:bg-secondary/30">
            <ImagePlus size={20} />
            <span className="text-xs">Add</span>
            <input type="file" multiple hidden />
          </label>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductImagesForm;
