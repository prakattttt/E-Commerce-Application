import { motion } from "framer-motion";
import { Star, Zap } from "lucide-react";

import { fadeUp } from "../../../animations";

interface ProductVisibilityFormProps {
  featured: boolean;
  onFeaturedChange: (value: boolean) => void;

  flashSale: boolean;
  onFlashSaleChange: (value: boolean) => void;
}

const ProductVisibilityForm = ({
  featured,
  onFeaturedChange,
  flashSale,
  onFlashSaleChange,
}: ProductVisibilityFormProps) => {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <h2 className="mb-6 font-display text-xl font-bold">
        Product Visibility
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gold/10 p-2">
              <Star size={18} className="fill-gold text-gold" />
            </div>

            <div>
              <p className="font-medium">Featured Product</p>

              <p className="text-sm text-muted-foreground">
                Show this product in the Featured Products section.
              </p>
            </div>
          </div>

          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => onFeaturedChange(e.target.checked)}
            className="h-5 w-5 accent-primary"
          />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-accent/10 p-2">
              <Zap size={18} className="fill-accent text-accent" />
            </div>

            <div>
              <p className="font-medium">Flash Sale</p>

              <p className="text-sm text-muted-foreground">
                Include this product in the Flash Sale section.
              </p>
            </div>
          </div>

          <input
            type="checkbox"
            checked={flashSale}
            onChange={(e) => onFlashSaleChange(e.target.checked)}
            className="h-5 w-5 accent-primary"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductVisibilityForm;
