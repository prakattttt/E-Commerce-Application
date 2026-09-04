import { Package } from "lucide-react";

import type { Order } from "../../../checkout/types/ordres.schema";

interface Props {
  items: Order["items"];
}

const OrderItems = ({ items }: Props) => {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Package size={20} />
        </div>

        <div>
          <h2 className="font-display text-xl font-bold">Order Items</h2>

          <p className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"} in this order
          </p>
        </div>
      </div>

      <div className="mt-6 divide-y divide-border">
        {items.map((item) => {
          const itemTotal = item.price * item.quantity;

          return (
            <div
              key={item.product}
              className="flex gap-4 py-5 first:pt-0 last:pb-0"
            >
              {/* Product image */}
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-24 sm:w-24">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Product details */}
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{item.name}</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Rs. {item.price.toLocaleString()}
                </p>

                <p className="mt-2 text-sm font-medium text-muted-foreground">
                  Quantity: {item.quantity}
                </p>
              </div>

              {/* Item total */}
              <div className="shrink-0 text-right">
                <p className="font-display font-bold">
                  Rs. {itemTotal.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderItems;
