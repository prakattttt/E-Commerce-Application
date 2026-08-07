import { motion } from "framer-motion";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { fadeUp } from "../../../animations";
import type { ProductFormValues } from "../types/schemas/products.schemas";

interface ProductPricingFormProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}

const ProductPricingForm = ({ register, errors }: ProductPricingFormProps) => {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <h2 className="mb-6 font-display text-xl font-bold">Pricing & Inventory</h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Selling Price</label>

          <input
            type="number"
            step="0.01"
            placeholder="999"
            {...register("price")}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
          {errors.price && (
            <p className="mt-2 text-sm text-error">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Original Price</label>

          <input
            type="number"
            step="0.01"
            placeholder="1199"
            {...register("originalPrice")}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
          {errors.originalPrice && (
            <p className="mt-2 text-sm text-red-500">{errors.originalPrice.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Stock Quantity</label>

          <input
            type="number"
            min="0"
            placeholder="20"
            {...register("stock")}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
          {errors.stock && (
            <p className="mt-2 text-sm text-red-500">{errors.stock.message}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPricingForm;
