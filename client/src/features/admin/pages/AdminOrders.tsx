import { motion } from "framer-motion";
import { Search, Eye, Package, User, Calendar, CreditCard } from "lucide-react";

import { fadeUp } from "../../../animations";

const orders = [
  {
    id: "#1001",
    customer: "John Doe",
    total: "$299",
    status: "Delivered",
    date: "12 Jul 2026",
  },
  {
    id: "#1002",
    customer: "Jane Smith",
    total: "$129",
    status: "Pending",
    date: "14 Jul 2026",
  },
  {
    id: "#1003",
    customer: "Alex Johnson",
    total: "$89",
    status: "Cancelled",
    date: "15 Jul 2026",
  },
  {
    id: "#1004",
    customer: "Emily Wilson",
    total: "$549",
    status: "Delivered",
    date: "16 Jul 2026",
  },
];

const AdminOrders = () => {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* ================= Header ================= */}
      <div>
        <h1 className="font-display text-3xl font-bold">Orders</h1>

        <p className="mt-2 text-muted-foreground">
          Track and manage customer orders.
        </p>
      </div>

      {/* ================= Search ================= */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="text"
          placeholder="Search orders..."
          className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 outline-none transition focus:border-primary"
        />
      </div>

      {/* ================= Orders ================= */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            variants={fadeUp}
            custom={index}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
              <Package size={30} />
            </div>

            {/* Order ID */}
            <h2 className="mt-5 font-display text-xl font-bold">{order.id}</h2>

            {/* Customer */}
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <User size={16} />
              {order.customer}
            </div>

            {/* Date */}
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={16} />
              {order.date}
            </div>

            {/* Total */}
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard size={16} />
              {order.total}
            </div>

            {/* Status */}
            <div className="mt-6">
              <span
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  order.status === "Delivered"
                    ? "bg-success/15 text-success"
                    : order.status === "Pending"
                      ? "bg-warning/15 text-warning"
                      : "bg-error/15 text-error"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-3 transition hover:bg-secondary">
                <Eye size={18} />
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default AdminOrders;
