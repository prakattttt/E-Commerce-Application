import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";

import { fadeUp } from "../../../animations";

const orders = [
  {
    id: "#1001",
    customer: "John Doe",
    total: "$299",
    status: "Delivered",
  },
  {
    id: "#1002",
    customer: "Jane Smith",
    total: "$129",
    status: "Pending",
  },
  {
    id: "#1003",
    customer: "Alex Johnson",
    total: "$89",
    status: "Cancelled",
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
      <div>
        <h1 className="font-display text-3xl font-bold">Orders</h1>

        <p className="mt-2 text-muted-foreground">
          Track and manage customer orders.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          placeholder="Search order..."
          className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 outline-none transition focus:border-primary"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <table className="min-w-full">
          <thead className="bg-secondary">
            <tr className="text-left text-sm font-semibold">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-border hover:bg-secondary/40"
              >
                <td className="px-6 py-4">{order.id}</td>

                <td className="px-6 py-4">{order.customer}</td>

                <td className="px-6 py-4">{order.total}</td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-secondary px-3 py-1 text-sm">
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button className="rounded-lg p-2 hover:bg-secondary">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
};

export default AdminOrders;
