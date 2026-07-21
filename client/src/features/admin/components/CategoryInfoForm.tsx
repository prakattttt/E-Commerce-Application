import { motion } from "framer-motion";

import { fadeUp } from "../../../animations";

interface CategoryInfoFormProps {
  name: string;
  onNameChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
}

const CategoryInfoForm = ({
  name,
  onNameChange,
  description,
  onDescriptionChange,
}: CategoryInfoFormProps) => {
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 font-display text-xl font-bold">Category Information</h2>

      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Category Name</label>

            <input
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Electronics"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium">Description</label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Write category description..."
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryInfoForm;
