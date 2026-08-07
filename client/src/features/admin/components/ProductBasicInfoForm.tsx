import { motion } from "framer-motion";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { fadeUp } from "../../../animations";
import type { ICategory } from "../../shop/types/categories.types";
import type { ProductFormValues } from "../types/schemas/products.schemas";

interface ProductBasicInfoFormProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  categories: ICategory[];
}

const ProductBasicInfoForm = ({
  register,
  errors,
  categories,
}: ProductBasicInfoFormProps) => {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <h2 className="mb-6 font-display text-xl font-bold">Basic Information</h2>

      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Product Name</label>

            <input
              type="text"
              placeholder="iPhone 16 Pro"
              {...register("name")}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-error">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Brand</label>

            <input
              type="text"
              placeholder="Apple"
              {...register("brand")}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            />
            {errors.brand && (
              <p className="mt-2 text-sm text-error">{errors.brand.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Category</label>

            <select
              {...register("category")}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-2 text-sm text-error">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>

          <textarea
            rows={5}
            placeholder="Write product description..."
            {...register("description")}
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
          {errors.description && (
            <p className="mt-2 text-sm text-error">{errors.description.message}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductBasicInfoForm;
