import { motion } from "framer-motion";
import { ShieldCheck, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { fadeUp } from "../animations";
import CheckoutForm from "../features/checkout/components/CheckoutForm";
import CheckoutSummary from "../features/checkout/components/CheckoutSummary";
import { createOrder } from "../features/checkout/api/checkout.api";
import useCart from "../features/cart/hooks/useCart";
import Loader from "../components/ui/Loader";
import { toast } from "sonner";
import { getErrorMessage } from "../utils/getErrorMessage";
import useAuth from "../features/auth/hooks/useAuth";

const Checkout = () => {
  const { cart, loading, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const { mutate, isPending, reset } = useMutation({
    mutationFn: createOrder,

    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      clearCart();
      navigate("/shop");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-4 py-10 text-center"
      >
        <div className="rounded-full bg-muted/30 p-6">
          <ShoppingCart size={42} className="text-primary" />
        </div>

        <h1 className="mt-6 font-display text-3xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-3 max-w-md text-muted-foreground">
          Add at least one item to your cart before proceeding to checkout.
        </p>

        <Link to="/shop" className="btn-primary mt-8">
          Continue Shopping
        </Link>
      </motion.section>
    );
  }

  return (
    <motion.main
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="container px-4 py-10 sm:px-6 sm:py-14"
    >
      {/* Header */}
      <div className="mx-auto mt-10 max-w-6xl">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Checkout
          </span>

          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Complete your order
          </h1>

          <p className="mt-2 max-w-xl text-muted-foreground">
            Enter your delivery information and choose your preferred payment
            method.
          </p>
        </div>

        {/* Checkout content */}
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">
          <div className="min-w-0">
            <CheckoutForm mutate={mutate} />
          </div>
          <div className="min-w-0">
            <CheckoutSummary isPending={isPending} />
          </div>
        </div>

        {/* Security notice */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-4">
          <ShieldCheck size={20} className="mt-0.5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-semibold">Your information is secure</p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Your personal and payment information is securely handled during
              checkout.
            </p>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default Checkout;
