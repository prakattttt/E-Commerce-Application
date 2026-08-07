import { useCartStore } from "../store/cart.store";

const useCart = () => {
  const cart = useCartStore((state) => state.cart);
  const quantity = useCartStore((state) => state.quantity);
  const loading = useCartStore((state) => state.loading);

  const fetchCart = useCartStore((state) => state.fetchCart);
  const addItem = useCartStore((state) => state.addItem);
  const deleteItem = useCartStore((state) => state.deleteItem);
  const clearCart = useCartStore((state) => state.clearCart);

  return {
    cart,
    quantity,
    loading,

    fetchCart,
    addItem,
    deleteItem,
    clearCart,
  };
};

export default useCart;
