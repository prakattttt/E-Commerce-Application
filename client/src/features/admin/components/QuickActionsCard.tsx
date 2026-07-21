import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { fadeUp } from "../../../animations";
import LowStockAlert from "./LowStockAlert";

const QuickActionsCard = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={6}
      className="rounded-3xl border border-border bg-card p-6 shadow-sm"
    >
      <h2 className="mb-6 text-xl font-semibold">Quick Actions</h2>

      <div className="space-y-4">
        <Link
          to="/admin/products/new"
          className="flex items-center gap-3 rounded-2xl bg-primary px-5 py-4 font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus size={18} />
          Add Product
        </Link>

        <Link
          to="/admin/categories/new"
          className="flex items-center gap-3 rounded-2xl border border-border px-5 py-4 transition hover:bg-secondary"
        >
          <Plus size={18} />
          Add Category
        </Link>
      </div>

      <LowStockAlert />
    </motion.div>
  );
};

export default QuickActionsCard;
