import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Save, Upload } from "lucide-react";
import { useState } from "react";

import { fadeUp } from "../../../animations";

const NewCategory = () => {
  const [name, setName] = useState("");

  const [slug, setSlug] = useState("");

  const [description, setDescription] = useState("");

  const [status, setStatus] = useState("active");

  const [featured, setFeatured] = useState(false);

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-5xl space-y-8"
    >
      {/* Header */}

      <div>
        <h1 className="font-display text-3xl font-bold">Add New Category</h1>

        <p className="mt-2 text-muted-foreground">
          Create a new category to organize your products.
        </p>
      </div>

      {/* Category Information */}

      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h2 className="mb-6 font-display text-xl font-bold">
          Category Information
        </h2>

        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Category Name</label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Electronics"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Slug</label>

              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="electronics"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">Description</label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write category description..."
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
            />
          </div>
        </div>
      </motion.div>

      {/* Category Image */}

      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h2 className="mb-6 font-display text-xl font-bold">Category Image</h2>

        <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border transition hover:border-primary">
          <Upload className="mb-4 text-primary" size={34} />

          <span className="font-medium">Upload Category Image</span>

          <span className="mt-2 text-sm text-muted-foreground">
            PNG, JPG or WEBP
          </span>

          <input type="file" className="hidden" />
        </label>
      </motion.div>

      {/* Settings */}

      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h2 className="mb-6 font-display text-xl font-bold">Settings</h2>

        <div className="grid gap-5 md:gap-10 md:grid-cols-2 md:items-end">
          <div>
            <label className="mb-2 block font-medium">Status</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured Category
          </label>
        </div>
      </motion.div>

      {/* Preview */}

      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h2 className="mb-5 font-display text-xl font-bold">Preview</h2>

        <div className="rounded-xl border border-border bg-background p-5">
          <div className="h-28 rounded-xl bg-secondary" />

          <h3 className="mt-4 text-lg font-semibold">
            {name || "Category Name"}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {description || "Category description preview..."}
          </p>
        </div>
      </motion.div>

      {/* Buttons */}

      <div className="flex flex-col-reverse gap-4 border-t border-border pt-8 sm:flex-row sm:justify-end">
        <Link
          to="/admin/categories"
          className="rounded-xl border border-border px-8 py-3 text-center font-medium hover:bg-secondary"
        >
          Cancel
        </Link>

        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-medium text-primary-foreground">
          <Save size={18} />
          Save Category
        </button>
      </div>
    </motion.section>
  );
};

export default NewCategory;
