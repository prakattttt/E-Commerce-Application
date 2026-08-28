import { Link } from "react-router-dom";
import { PackageOpen, ChevronRight } from "lucide-react";

import type { IOrderSummary } from "../types/order.types";

interface OrdersTabProps {
  orders: IOrderSummary[];
}

const statusStyles = {
  Pending: "bg-warning/10 text-warning",
  Processing: "bg-primary/10 text-primary",
  Shipped: "bg-info/10 text-info",
  Delivered: "bg-success/10 text-success",
  Cancelled: "bg-error/10 text-error",
};

const OrdersTab = ({ orders }: OrdersTabProps) => {
  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-card px-6 py-20 text-center shadow-sm">
        <PackageOpen
          size={48}
          className="mx-auto mb-4 text-muted-foreground"
        />

        <h3 className="font-display text-2xl font-bold">
          No Orders Yet
        </h3>

        <p className="mt-2 text-muted-foreground">
          Looks like you haven't purchased anything.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md sm:p-6"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            {/* Order information */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Order
              </p>

              <h3 className="mt-1 font-display text-lg font-bold">
                #{order.orderNumber}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString("en-NP", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Order status + amount + action */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span
                className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${
                  statusStyles[order.status]
                }`}
              >
                {order.status}
              </span>

              <div className="sm:text-right">
                <p className="font-display text-lg font-bold">
                  Rs. {order.totalAmount.toLocaleString()}
                </p>

                <p className="text-sm text-muted-foreground">
                  {order.totalItems}{" "}
                  {order.totalItems === 1 ? "item" : "items"}
                </p>
              </div>

              <Link
                to={`/orders/${order._id}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition hover:bg-secondary"
              >
                View Details
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersTab;