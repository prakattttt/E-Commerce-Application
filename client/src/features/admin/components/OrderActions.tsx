import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { toast } from "sonner";

import {
  updateOrderPaymentStatus,
  updateOrderStatus,
} from "../../checkout/api/checkout.api";
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
  const queryClient = useQueryClient();

  const [status, setStatus] = useState<Order["orderStatus"]>(order.orderStatus);
  const [paymentStatus, setPaymentStatus] = useState<Order["paymentStatus"]>(
    order.paymentStatus,
  );

  const updateStatusMutation = useMutation({
    mutationFn: (nextStatus: Order["orderStatus"]) =>
      updateOrderStatus(order._id, nextStatus),
    onSuccess: async (data) => {
      setStatus(data.order.orderStatus);
      await queryClient.invalidateQueries({
        queryKey: ["admin-order", order._id],
      });
      toast.success(`Order status updated to ${data.order.orderStatus}.`);
    },
    onError: () => {
      toast.error("Failed to update order status. Please try again.");
    },
  });

  const updatePaymentMutation = useMutation({
    mutationFn: (nextPaymentStatus: Order["paymentStatus"]) =>
      updateOrderPaymentStatus(order._id, nextPaymentStatus),
    onSuccess: async (data) => {
      setPaymentStatus(data.order.paymentStatus);
      await queryClient.invalidateQueries({
        queryKey: ["admin-order", order._id],
      });
      toast.success(`Payment status updated to ${data.order.paymentStatus}.`);
    },
    onError: () => {
      toast.error("Failed to update payment status. Please try again.");
    },
  });

  const handleUpdate = () => {
    if (order.orderStatus === "Cancelled") {
      toast.error("This cancelled order cannot have its status changed.");
      return;
    }

    if (status === order.orderStatus) {
      toast.info("This order already has the selected status.");
      return;
    }

    updateStatusMutation.mutate(status);
  };

  const handlePaymentUpdate = () => {
    if (order.paymentMethod !== "COD") {
      toast.info("Only COD orders can be marked as paid manually.");
      return;
    }

    if (order.paymentStatus === "Paid") {
      toast.info("A paid COD order cannot be changed back to pending.");
      return;
    }

    if (paymentStatus === "Paid") {
      updatePaymentMutation.mutate(paymentStatus);
      return;
    }

    toast.info("COD payments can only move from Pending to Paid.");
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
          disabled={order.orderStatus === "Cancelled"}
          onChange={(event) =>
            setStatus(event.target.value as Order["orderStatus"])
          }
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
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
        disabled={
          order.orderStatus === "Cancelled" ||
          status === order.orderStatus ||
          updateStatusMutation.isPending
        }
        onClick={handleUpdate}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Save size={18} />
        {order.orderStatus === "Cancelled"
          ? "Cancelled Order"
          : updateStatusMutation.isPending
            ? "Updating..."
            : "Update Order"}
      </button>

      {order.paymentMethod === "COD" && (
        <div className="mt-6 border-t border-border pt-6">
          <label htmlFor="payment-status" className="text-sm font-semibold">
            Payment Status
          </label>

          <select
            id="payment-status"
            value={paymentStatus}
            disabled={order.paymentStatus === "Paid"}
            onChange={(event) =>
              setPaymentStatus(event.target.value as Order["paymentStatus"])
            }
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="Pending">Pending</option>
            <option value="Paid" disabled={order.paymentStatus === "Paid"}>
              Paid
            </option>
          </select>

          <button
            type="button"
            disabled={
              order.paymentStatus === "Paid" ||
              paymentStatus === "Paid" ||
              updatePaymentMutation.isPending
            }
            onClick={handlePaymentUpdate}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={18} />
            {order.paymentStatus === "Paid"
              ? "Paid"
              : updatePaymentMutation.isPending
                ? "Updating..."
                : "Mark as Paid"}
          </button>
        </div>
      )}

      <div className="mt-6 border-t border-border pt-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Payment Method</span>

          <span className="text-sm font-semibold">{order.paymentMethod}</span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Payment Status</span>

          <span className="text-sm font-semibold">{paymentStatus}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderActions;
