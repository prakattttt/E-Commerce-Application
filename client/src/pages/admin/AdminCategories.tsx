import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Link } from "react-router-dom";

import { fadeUp } from "../../animations";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    products: 18,
  },
  {
    name: "Fashion",
    slug: "fashion",
    products: 24,
  },
  {
    name: "Shoes",
    slug: "shoes",
    products: 12,
  },
  {
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
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Categories</h1>

          <p className="mt-2 text-muted-foreground">
            Organize products into categories.
          </p>
        </div>

        <Link
          to="/admin/categories/new"
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
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
          placeholder="Search category..."
          className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 outline-none transition focus:border-primary"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-secondary">
              <tr className="text-left text-sm font-semibold">
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Products</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.slug}
                  className="border-t border-border hover:bg-secondary/40"
                >
                  <td className="px-6 py-4 font-medium">{category.name}</td>

                  <td className="px-6 py-4 text-muted-foreground">
                    {category.slug}
                  </td>

                  <td className="px-6 py-4">{category.products}</td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="rounded-lg p-2 hover:bg-secondary">
                        <Pencil size={18} />
                      </button>

                      <button className="rounded-lg p-2 text-error hover:bg-error/10">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  );
};

export default AdminCategories;
