import { motion } from "framer-motion";

import { fadeUp } from "../../../animations";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import OrderCard, { type IOrderSummary } from "../components/OrderCard";

const orders: IOrderSummary[] = [
  { id: "#1001", customer: "John Doe", total: "$299", status: "Delivered", date: "12 Jul 2026" },
  { id: "#1002", customer: "Jane Smith", total: "$129", status: "Pending", date: "14 Jul 2026" },
  { id: "#1003", customer: "Alex Johnson", total: "$89", status: "Cancelled", date: "15 Jul 2026" },
  { id: "#1004", customer: "Emily Wilson", total: "$549", status: "Delivered", date: "16 Jul 2026" },
];

const AdminOrders = () => {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <PageHeader title="Orders" description="Track and manage customer orders." />

      <SearchBar placeholder="Search orders..." className="max-w-md" />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {orders.map((order, index) => (
          <OrderCard key={order.id} order={order} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default AdminOrders;
