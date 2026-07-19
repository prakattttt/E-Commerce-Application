import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { fadeUp } from "../../../animations";

const RecentOrdersCard = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={5}
      className="rounded-3xl border border-border bg-card p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Orders</h2>

        <Link
          to="/admin/orders"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="flex h-60 items-center justify-center rounded-2xl border border-dashed border-border">
        <p className="text-muted-foreground">No orders yet.</p>
      </div>
    </motion.div>
  );
};

export default RecentOrdersCard;
