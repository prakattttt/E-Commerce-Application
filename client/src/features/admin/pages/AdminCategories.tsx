import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, Package } from "lucide-react";
import { Link } from "react-router-dom";

import { fadeUp } from "../../../animations";

const categories = [
  {
    _id: "1",
    name: "Electronics",
    slug: "electronics",
    products: 18,
  },
  {
    _id: "2",
    name: "Fashion",
    slug: "fashion",
    products: 24,
  },
  {
    _id: "3",
    name: "Shoes",
    slug: "shoes",
    products: 12,
  },
  {
    _id: "4",
    name: "Accessories",
    slug: "accessories",
    products: 9,
  },
];

const AdminCategories = () => {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Categories</h1>

          <p className="mt-2 text-muted-foreground">
            Organize your products into different categories.
          </p>
        </div>

        <Link
          to="/admin/categories/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus size={18} />
          Add Category
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="text"
          placeholder="Search category..."
          className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 outline-none transition focus:border-primary"
        />
      </div>

      {/* Categories */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category, index) => (
          <motion.div
            key={category._id}
            variants={fadeUp}
            custom={index}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Category Icon */}
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Package size={26} />
            </div>

            {/* Category Name */}
            <h2 className="font-display text-xl font-bold">{category.name}</h2>

            {/* Slug */}
            <p className="mt-1 text-sm text-muted-foreground">
              /{category.slug}
            </p>

            {/* Product Count */}
            <div className="mt-6 rounded-xl bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Products</p>

              <h3 className="mt-1 text-2xl font-bold">{category.products}</h3>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-3 transition hover:bg-secondary">
                <Pencil size={18} />
                Edit
              </button>

              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-error/10 py-3 text-error transition hover:bg-error/20">
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default AdminCategories;
