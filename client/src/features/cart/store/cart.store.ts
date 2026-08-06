import { create } from "zustand";

import { addToCart, getCart } from "../api/cart.api";
import type { ICart, ICartItem } from "../types/cart.types";

interface CartStore {
  cart: ICart | null;
  quantity: number;
  loading: boolean;

  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;

  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: null,
  quantity: 0,
  loading: false,

  fetchCart: async () => {
    set({ loading: true });

    try {
      const response = await getCart();

      const cart = response.cart;

      const quantity = cart.items.reduce((sum: number, item: ICartItem) => sum + item.quantity, 0);

      set({
        cart,
        quantity,
      });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (productId, quantity = 1) => {
    await addToCart({
      productId,
      quantity,
    });

    await useCartStore.getState().fetchCart();
  },

  clearCart: () => {
    set({
      cart: null,
      quantity: 0,
    });
  },
}));
