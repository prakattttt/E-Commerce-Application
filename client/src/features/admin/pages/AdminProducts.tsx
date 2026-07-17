import { motion } from "framer-motion";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { fadeUp } from "../../../animations";

const AdminProducts = () => {
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
          <h1 className="font-display text-3xl font-bold">Products</h1>

          <p className="mt-2 text-muted-foreground">
            Manage every product available in ShopSphere.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            placeholder="Search products..."
            className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 outline-none transition focus:border-primary"
          />
        </div>

        <select className="rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-primary">
          <option>All Categories</option>
        </select>

        <select className="rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-primary">
          <option>Newest</option>
          <option>Price Low → High</option>
          <option>Price High → Low</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-secondary">
              <tr className="text-left text-sm font-semibold">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr
                  key={item}
                  className="border-t border-border hover:bg-secondary/40"
                >
                  <td className="px-6 py-4">
                    <div className="h-14 w-14 rounded-xl bg-secondary" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium">iPhone 16 Pro</div>

                    <div className="text-sm text-muted-foreground">Apple</div>
                  </td>

                  <td className="px-6 py-4">Electronics</td>

                  <td className="px-6 py-4 font-medium">$999</td>

                  <td className="px-6 py-4">24</td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-success/15 px-3 py-1 text-sm font-medium text-success">
                      In Stock
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="rounded-lg p-2 transition hover:bg-secondary">
                        <Pencil size={18} />
                      </button>

                      <button className="rounded-lg p-2 text-error transition hover:bg-error/10">
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

export default AdminProducts;
