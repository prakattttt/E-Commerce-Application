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
            <div className="flex items-center gap-2 rounded-xl border px-2 py-1">
              <button>
                <Minus size={16} />
              </button>

              <span>{item.quantity}</span>

              <button>
                <Plus size={16} />
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
