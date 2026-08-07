import { create } from "zustand";

import { addToCart, getCart, deleteCartItem } from "../api/cart.api";
import type { ICart, ICartItem } from "../types/cart.types";

interface CartStore {
  cart: ICart | null;
  quantity: number;
  loading: boolean;

  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  deleteItem: (productId: string, quantity?: number) => Promise<void>;

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

      const quantity = cart.items.reduce(
        (sum: number, item: ICartItem) => sum + item.quantity,
        0,
      );

      set({
        cart,
        quantity,
      });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (productId, quantity = 1) => {
    const response = await addToCart({
      productId,
      quantity,
    });

    const cart = response.cart;

    set({
      cart,
      quantity: cart.items.reduce(
        (sum: number, item: ICartItem) => sum + item.quantity,
        0,
      ),
    });
  },

  deleteItem: async (productId) => {
    const response = await deleteCartItem(productId);

    const cart = response.cart;

    set({
      cart,
      quantity: cart.items.reduce(
        (sum: number, item: ICartItem) => sum + item.quantity,
        0,
      ),
    });
  },

  clearCart: () => {
    set({
      cart: null,
      quantity: 0,
    });
  },
}));
