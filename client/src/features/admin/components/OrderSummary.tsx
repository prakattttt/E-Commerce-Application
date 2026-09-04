import type { Order } from "../../checkout/types/ordres.schema";

interface Props {
  order: Order;
}

const OrderSummary = ({ order }: Props) => {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h2 className="font-display text-xl font-bold">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Subtotal</span>

          <span className="font-medium">
            Rs. {order.subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Shipping</span>

          <span className="font-medium">
            Rs. {order.shippingCost.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Tax</span>

          <span className="font-medium">Rs. {order.tax.toLocaleString()}</span>
        </div>
      </div>

      <div className="my-6 border-t border-border" />

      <div className="flex items-center justify-between gap-4">
        <span className="font-display text-lg font-bold">Total</span>

        <span className="font-display text-2xl font-bold text-primary">
          Rs. {order.total.toLocaleString()}
        </span>
      </div>

      <div className="mt-6 rounded-2xl bg-secondary/50 p-4">
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

export default OrderSummary;
