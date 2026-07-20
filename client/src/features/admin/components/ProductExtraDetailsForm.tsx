import { motion } from "framer-motion";

import { fadeUp } from "../../../animations";

interface ProductExtraDetailsFormProps {
  badge: string;
  onBadgeChange: (value: string) => void;
}

const ProductExtraDetailsForm = ({
  badge,
  onBadgeChange,
}: ProductExtraDetailsFormProps) => {
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 font-display text-xl font-bold">Extra Details</h2>

      <div className="grid gap-5 sm:grid-cols-3">
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
      </div>
    </motion.div>
  );
};

export default ProductExtraDetailsForm;
