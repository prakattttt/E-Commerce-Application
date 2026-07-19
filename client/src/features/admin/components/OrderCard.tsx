import { motion } from "framer-motion";
import { Eye, Package, User, Calendar, CreditCard } from "lucide-react";

import { fadeUp } from "../../../animations";

export interface IOrderSummary {
  id: string;
  customer: string;
  total: string;
  status: "Delivered" | "Pending" | "Cancelled";
  date: string;
}

interface OrderCardProps {
  order: IOrderSummary;
  index: number;
}

const statusStyles: Record<IOrderSummary["status"], string> = {
  Delivered: "bg-success/15 text-success",
  Pending: "bg-warning/15 text-warning",
  Cancelled: "bg-error/15 text-error",
};

const OrderCard = ({ order, index }: OrderCardProps) => {
  return (
    <motion.div
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
        <span className={`rounded-full px-4 py-2 text-sm font-medium ${statusStyles[order.status]}`}>
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
  );
};

export default OrderCard;
