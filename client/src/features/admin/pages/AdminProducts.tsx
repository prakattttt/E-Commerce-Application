import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <motion.div
              key={item}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex gap-4">
                <div className="h-20 w-20 rounded-xl bg-secondary" />

                <div className="flex-1">
                  <h2 className="font-semibold">iPhone 16 Pro</h2>

                  <p className="text-sm text-muted-foreground">Apple</p>
                </div>
              </div>

              <div className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>

                  <span>Electronics</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>

                  <span className="font-semibold">$999</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock</span>

                  <span>24</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>

                  <span className="rounded-full bg-success/15 px-3 py-1 text-success text-xs">
                    In Stock
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button className="flex-1 rounded-xl bg-secondary py-2 hover:bg-secondary-foreground hover:text-white transition">
                  Edit
                </button>

                <button className="rounded-xl bg-error/10 px-4 text-error hover:bg-error hover:text-white transition">
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AdminProducts;
