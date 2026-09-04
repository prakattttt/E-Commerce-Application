import { motion } from "framer-motion";

import { Eye, Package, User, Calendar, CreditCard } from "lucide-react";

import { Link } from "react-router-dom";

import { fadeUp } from "../../../animations";

import type { Order } from "../../checkout/types/ordres.schema";

interface OrderCardProps {
  order: Order;
  index: number;
}

const statusStyles: Record<Order["orderStatus"], string> = {
  Pending: "bg-warning/10 text-warning",
  Processing: "bg-primary/10 text-primary",
  Shipped: "bg-info/10 text-info",
  Delivered: "bg-success/10 text-success",
  Cancelled: "bg-error/10 text-error",
};

const OrderCard = ({ order, index }: OrderCardProps) => {
  const createdAt = new Date(order.createdAt);

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

      {/* Order number */}
      <h2 className="mt-5 font-display text-xl font-bold">
        #{order.orderNumber}
      </h2>

      {/* Customer */}
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <User size={16} />

        <span>{order.shippingAddress.fullName}</span>
      </div>

      {/* Date */}
      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar size={16} />

        <span>
          {createdAt.toLocaleDateString("en-NP", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Total */}
      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
        <CreditCard size={16} />

        <span>Rs. {order.total.toLocaleString()}</span>
      </div>

      {/* Status */}
      <div className="mt-6">
        <span
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            statusStyles[order.orderStatus]
          }`}
        >
          {order.orderStatus}
        </span>
      </div>

      {/* Action */}
      <div className="mt-6">
        <Link
          to={`/admin/orders/${order._id}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 transition hover:bg-secondary"
        >
          <Eye size={18} />
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default OrderCard;
