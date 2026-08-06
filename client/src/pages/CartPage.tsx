import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { fadeUp } from "../animations";
import CartItem from "../features/cart/components/CartItem";
import CartSummary from "../features/cart/components/CartSummary";
import useCart from "../features/cart/hooks/useCart";
import Loader from "../components/ui/Loader";
import ClearCart from "../features/cart/components/ClearCart";

const CartPage = () => {
  const { cart, loading, quantity } = useCart();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="container flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center"
      >
        <div className="rounded-full bg-secondary p-6">
          <ShoppingCart size={42} />
        </div>

        <h1 className="mt-6 font-display text-3xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-3 text-muted-foreground">
          Looks like you haven't added any products yet.
        </p>

        <Link to="/shop" className="btn-primary mt-8">
          Continue Shopping
        </Link>
      </motion.section>
    );
  }

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl px-6 pt-24 pb-12"
    >
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold">Shopping Cart</h1>
        <p className="mt-2 ml-1 text-muted-foreground text-lg">
          {quantity} {quantity === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[2fr_380px]">
        <div className="space-y-4">
          {cart.items.map((item) => (
            <CartItem key={item.product._id} item={item} />
          ))}
          <ClearCart />
        </div>

        <aside className="lg:sticky lg:top-24">
          <CartSummary cart={cart} />
        </aside>
      </div>
    </motion.section>
  );
};

export default CartPage;
