import { MapPin, Phone, User } from "lucide-react";

import type { Order } from "../../../checkout/types/ordres.schema";

interface Props {
  address: Order["shippingAddress"];
}

const OrderShipping = ({ address }: Props) => {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <MapPin size={20} />
        </div>

        <div>
          <h2 className="font-display text-xl font-bold">Shipping Address</h2>

          <p className="text-sm text-muted-foreground">Delivery information</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-secondary/50 p-5">
        <div className="flex items-start gap-3">
          <User size={18} className="mt-0.5 shrink-0 text-primary" />

          <div>
            <p className="font-semibold">{address.fullName}</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {address.address}
            </p>

            <p className="text-sm text-muted-foreground">
              {address.city}, {address.province}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
          <Phone size={18} className="shrink-0 text-primary" />

          <p className="text-sm font-medium">{address.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderShipping;
