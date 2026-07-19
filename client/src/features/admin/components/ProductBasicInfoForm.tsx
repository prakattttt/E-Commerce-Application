import { motion } from "framer-motion";

import { fadeUp } from "../../../animations";

const dummyCategories = ["Electronics", "Fashion", "Shoes", "Accessories"];

interface ProductBasicInfoFormProps {
  productName: string;
  onProductNameChange: (value: string) => void;
  brand: string;
  onBrandChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
}

const ProductBasicInfoForm = ({
  productName,
  onProductNameChange,
  brand,
  onBrandChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  description,
  onDescriptionChange,
}: ProductBasicInfoFormProps) => {
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 font-display text-xl font-bold">Basic Information</h2>

      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Product Name</label>

            <input
              type="text"
              value={productName}
              onChange={(e) => onProductNameChange(e.target.value)}
              placeholder="iPhone 16 Pro"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Brand</label>

            <input
              type="text"
              value={brand}
              onChange={(e) => onBrandChange(e.target.value)}
              placeholder="Apple"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Category</label>

            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            >
              <option value="">Select Category</option>

              {dummyCategories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Visibility</label>

            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Write product description..."
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductBasicInfoForm;
