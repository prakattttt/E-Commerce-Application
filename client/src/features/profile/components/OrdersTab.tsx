import { PackageOpen } from "lucide-react";

interface Order {
  _id: string;
  orderNumber: string;
  totalAmount: number;
  totalItems: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
}

interface OrdersTabProps {
  orders: Order[];
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
      <div className="rounded-3xl border border-border bg-card py-20 text-center">
        <PackageOpen size={48} className="mx-auto mb-4 text-muted-foreground" />

        <h3 className="font-display text-2xl font-bold">No Orders Yet</h3>

        <p className="mt-2 text-muted-foreground">
          Looks like you haven't purchased anything.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <div
          key={order._id}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-semibold">Order #{order.orderNumber}</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  statusStyles[order.status]
                }`}
              >
                {order.status}
              </span>

              <div className="text-right">
                <p className="font-semibold">
                  Rs. {order.totalAmount.toLocaleString()}
                </p>

                <p className="text-sm text-muted-foreground">
                  {order.totalItems} item
                  {order.totalItems > 1 ? "s" : ""}
                </p>
              </div>

              <button className="rounded-xl border border-border px-4 py-2 text-sm font-medium transition hover:bg-secondary">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersTab;
