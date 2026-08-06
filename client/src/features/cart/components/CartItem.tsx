import { Minus, Plus, Trash2 } from "lucide-react";

import type { ICartItem } from "../types/cart.types";

interface Props {
  item: ICartItem;
}

const CartItem = ({ item }: Props) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <img
          src={item.product.imageCover.url}
          alt={item.product.name}
          className="h-28 w-28 rounded-xl object-cover"
        />

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {item.product.brand}
            </p>

            <h3 className="mt-1 font-semibold">{item.product.name}</h3>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center rounded-xl border border-border bg-secondary/40 p-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-card hover:text-primary">
                <Minus size={15} />
              </button>

              <span className="min-w-10 text-center text-sm font-semibold">
                {item.quantity}
              </span>

              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-card hover:text-primary">
                <Plus size={15} />
              </button>
            </div>

            <div className="flex items-center gap-5">
              <span className="font-bold text-primary">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>

              <button className="text-muted-foreground hover:text-error">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
