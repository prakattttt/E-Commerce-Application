import { useState } from "react";

import { Save } from "lucide-react";
import { toast } from "sonner";

import type { Order } from "../../checkout/types/ordres.schema";

interface Props {
  order: Order;
}

const orderStatuses: Order["orderStatus"][] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const OrderActions = ({ order }: Props) => {
  const [status, setStatus] = useState<Order["orderStatus"]>(order.orderStatus);

  const handleUpdate = () => {
    // Connect this to your admin API later.
    toast.info("Order status API is not connected yet.");
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div>
        <h2 className="font-display text-xl font-bold">Order Management</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage this customer's order.
        </p>
      </div>

      <div className="mt-6">
        <label htmlFor="order-status" className="text-sm font-semibold">
          Order Status
        </label>

        <select
          id="order-status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as Order["orderStatus"])
          }
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
        >
          {orderStatuses.map((orderStatus) => (
            <option key={orderStatus} value={orderStatus}>
              {orderStatus}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        disabled={status === order.orderStatus}
        onClick={handleUpdate}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Save size={18} />
        Update Order
      </button>

      <div className="mt-6 border-t border-border pt-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Payment Method</span>

          <span className="text-sm font-semibold">{order.paymentMethod}</span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Payment Status</span>

          <span className="text-sm font-semibold">{order.paymentStatus}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderActions;
