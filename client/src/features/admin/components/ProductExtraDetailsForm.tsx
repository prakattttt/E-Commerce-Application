import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { fadeUp } from "../../../animations";

interface ProductExtraDetailsFormProps {
  badge: string;
  onBadgeChange: (value: string) => void;

  featured: boolean;
  onFeaturedChange: (value: boolean) => void;
}

const ProductExtraDetailsForm = ({
  badge,
  onBadgeChange,
  featured,
  onFeaturedChange,
}: ProductExtraDetailsFormProps) => {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <h2 className="mb-6 font-display text-xl font-bold">Extra Details</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Badge</label>

          <input
            type="text"
            value={badge}
            onChange={(e) => onBadgeChange(e.target.value)}
            placeholder="Best Seller"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
          <div className="flex items-center gap-3">
            <Star size={18} className="fill-gold text-gold" />

            <div>
              <p className="font-medium">Featured Product</p>

              <p className="text-sm text-muted-foreground">
                Display this product in featured sections.
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
      </div>
    </motion.div>
  );
};

export default ProductExtraDetailsForm;
