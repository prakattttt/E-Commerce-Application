import { motion } from "framer-motion";

import { fadeUp } from "../../../animations";

interface CategorySettingsFormProps {
  status: string;
  onStatusChange: (value: string) => void;
  featured: boolean;
  onFeaturedChange: (value: boolean) => void;
}

const CategorySettingsForm = ({
  status,
  onStatusChange,
  featured,
  onFeaturedChange,
}: CategorySettingsFormProps) => {
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 font-display text-xl font-bold">Settings</h2>

      <div className="grid gap-5 md:gap-10 md:grid-cols-2 md:items-end">
        <div>
          <label className="mb-2 block font-medium">Status</label>

          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          >
            <option value="active">Active</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>

        <label className="flex items-center gap-3 md:pb-3">
          <input
            type="checkbox"
            className="scale-150"
            checked={featured}
            onChange={(e) => onFeaturedChange(e.target.checked)}
          />
          Featured Category
        </label>
      </div>
    </motion.div>
  );
};

export default CategorySettingsForm;
