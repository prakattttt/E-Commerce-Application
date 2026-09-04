import { ReceiptText, Truck } from "lucide-react";

import type { Order } from "../../../checkout/types/ordres.schema";

interface Props {
  order: Order;
}

const OrderSummary = ({ order }: Props) => {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ReceiptText size={20} />
        </div>

        <div>
          <h2 className="font-display text-xl font-bold">Order Summary</h2>

          <p className="text-sm text-muted-foreground">Payment breakdown</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* Subtotal */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Subtotal</span>

          <span className="font-medium">
            Rs. {order.subtotal.toLocaleString()}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Shipping</span>

            {order.shippingCost === 0 && (
              <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                Free
              </span>
            )}
          </div>

          <span className="font-medium">
            Rs. {order.shippingCost.toLocaleString()}
          </span>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Tax</span>

          <span className="font-medium">Rs. {order.tax.toLocaleString()}</span>
        </div>
      </div>

      <div className="my-6 border-t border-border" />

      {/* Total */}
      <div className="flex items-center justify-between gap-4">
        <span className="font-display text-lg font-bold">Total</span>

        <span className="font-display text-2xl font-bold text-primary">
          Rs. {order.total.toLocaleString()}
        </span>
      </div>

      {/* Delivery information */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-secondary/50 p-4">
        <Truck size={19} className="mt-0.5 shrink-0 text-primary" />

        <div>
          <p className="text-sm font-semibold">Delivery</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Your order will be delivered to the address provided during
            checkout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
