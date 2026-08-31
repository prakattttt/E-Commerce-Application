import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";

import { fadeUp } from "../../../animations";
import type { Order } from "../../checkout/types/ordres.schema";

interface Props {
  orders: Order[];
}

const RecentOrdersCard = ({ orders }: Props) => {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-success/10 text-success";
      case "processing":
        return "bg-primary/10 text-primary";
      case "shipped":
        return "bg-info/10 text-info";
      case "cancelled":
        return "bg-error/10 text-error";
      case "pending":
        return "bg-accent/10 text-accent";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  const getPaymentStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "text-success";
      case "pending":
        return "text-accent";
      case "failed":
        return "text-error";
      default:
        return "text-muted-foreground";
    }
  };
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={5}
      className="max-h-90 rounded-3xl border border-border bg-card p-6 shadow-sm"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Latest orders from your store
          </p>
        </div>
        <Link
          to="/admin/orders"
          className="group flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:opacity-80"
        >
          View All
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
      {/* Orders */}
      {orders.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-border text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
            <Package size={22} className="text-muted-foreground" />
          </div>
          <p className="mt-4 font-semibold">No orders yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Orders will appear here once customers place them.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/admin/orders/${order._id}`}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-background p-4 transition hover:border-primary/20 hover:bg-primary/[0.03] sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Order information */}
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Package size={20} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    #{order.orderNumber}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {order.shippingAddress.fullName ?? "Unknown customer"}
                  </p>
                </div>
              </div>
              {/* Order details */}
              <div className="flex items-center justify-between gap-8 sm:justify-end">
                <div className="flex justify-center items-center gap-8 text-left sm:text-right">
                  <p
                    className={`text-xs font-medium ${getPaymentStatusClass(order.paymentStatus)}`}
                  >
                    {order.paymentStatus}
                  </p>
                  <p className="text-sm font-bold">
                    Rs. {order.total.toLocaleString()}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(order.orderStatus)}`}
                >
                  {order.orderStatus}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RecentOrdersCard;
