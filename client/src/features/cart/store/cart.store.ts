import { create } from "zustand";
import { isAxiosError } from "axios";

import {
  addToCart,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "../api/cart.api";

import type { ICart, ICartItem } from "../types/cart.types";
import { toast } from "sonner";

interface CartStore {
  cart: ICart | null;
  quantity: number;
  loading: boolean;

  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateItem: (productId: string, quantity: number) => Promise<void>;
  deleteItem: (productId: string) => Promise<void>;

  clearCart: () => void;
}

const getQuantity = (cart: ICart | null) =>
  cart?.items.reduce(
    (sum: number, item: ICartItem) => sum + item.quantity,
    0,
  ) ?? 0;

export const useCartStore = create<CartStore>((set) => {
  const updateCartState = (cart: ICart | null) => {
    set({
      cart,
      quantity: getQuantity(cart),
    });
  };

  return {
    cart: null,
    quantity: 0,
    loading: false,

    fetchCart: async () => {
      set({ loading: true });

      try {
        const response = await getCart();

        updateCartState(response.cart ?? null);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          updateCartState(null);
          return;
        }

        toast.error("Something went wrong");
      } finally {
        set({ loading: false });
      }
    },

    addItem: async (productId, quantity = 1) => {
      const response = await addToCart({
        productId,
        quantity,
      });

      updateCartState(response.cart ?? null);
    },

    updateItem: async (productId, quantity) => {
      const response = await updateCartItem(productId, quantity);

      updateCartState(response.cart ?? null);
    },

    deleteItem: async (productId) => {
      const response = await deleteCartItem(productId);

      updateCartState(response.cart ?? null);
    },

    clearCart: () => {
      updateCartState(null);
    },
  };
});
