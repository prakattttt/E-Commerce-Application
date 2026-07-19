import { motion } from "framer-motion";

import { fadeUp } from "../../../animations";

interface ProductPricingFormProps {
  price: string;
  onPriceChange: (value: string) => void;
  originalPrice: string;
  onOriginalPriceChange: (value: string) => void;
  stock: string;
  onStockChange: (value: string) => void;
}

const ProductPricingForm = ({
  price,
  onPriceChange,
  originalPrice,
  onOriginalPriceChange,
  stock,
  onStockChange,
}: ProductPricingFormProps) => {
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 font-display text-xl font-bold">Pricing & Inventory</h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Selling Price</label>

          <input
            type="number"
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
            placeholder="999"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Original Price</label>

          <input
            type="number"
            value={originalPrice}
            onChange={(e) => onOriginalPriceChange(e.target.value)}
            placeholder="1199"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Stock Quantity</label>

          <input
            type="number"
            value={stock}
            onChange={(e) => onStockChange(e.target.value)}
            placeholder="20"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPricingForm;
