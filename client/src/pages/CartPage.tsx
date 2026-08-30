import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelOrder,
  getPendingPaymentOrder,
} from "../features/checkout/api/checkout.api";
import { toast } from "sonner";
import { getErrorMessage } from "../utils/getErrorMessage";
import { Clock3, CreditCard, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp } from "../animations";
import CartItem from "../features/cart/components/CartItem";
import CartSummary from "../features/cart/components/CartSummary";
import useCart from "../features/cart/hooks/useCart";
import Loader from "../components/ui/Loader";
import ClearCart from "../features/cart/components/ClearCart";
import useAuth from "../features/auth/hooks/useAuth";
import SecondaryUi from "../features/profile/components/SecondaryUi";

const CartPage = () => {
  const { isAuthenticated } = useAuth();
  const { cart, loading, quantity } = useCart();

  const queryClient = useQueryClient();

  const { data: pendingOrderData, isLoading: isPendingOrderLoading } = useQuery(
    {
      queryKey: ["pending-payment-order"],
      queryFn: getPendingPaymentOrder,
      enabled: isAuthenticated,
    },
  );

  const pendingOrder = pendingOrderData?.order;

  const { mutate: cancelOrderMutation, isPending: isCancelling } = useMutation({
    mutationFn: cancelOrder,

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["pending-payment-order"],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  if (!isAuthenticated) {
    return <SecondaryUi />;
  }

  if (loading || isPendingOrderLoading) {
    return <Loader fullScreen />;
  }

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl px-6 pt-24 pb-12"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold">Shopping Cart</h1>

        <p className="mt-2 ml-1 text-lg text-muted-foreground">
          {quantity} {quantity === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {/* Pending Payment Banner */}
      {pendingOrder && (
        <div className="mb-8 overflow-hidden rounded-3xl border border-warning/20 bg-warning/5 shadow-sm">
          <div className="flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
            {/* Information */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-warning/10 text-warning">
                <Clock3 size={24} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-lg font-bold">
                    Payment pending
                  </h2>

                  <span className="rounded-full bg-warning/10 px-2.5 py-1 text-xs font-semibold text-warning">
                    {pendingOrder.paymentMethod}
                  </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  You have an unfinished order{" "}
                  <span className="font-semibold text-foreground">
                    #{pendingOrder.orderNumber}
                  </span>
                  .
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Complete your payment to confirm this order.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Link
                to={`/payment/${pendingOrder._id}`}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <CreditCard size={17} />
                Complete Payment
              </Link>

              <button
                type="button"
                onClick={() => cancelOrderMutation(pendingOrder._id)}
                disabled={isCancelling}
                className="flex items-center justify-center gap-2 rounded-xl border border-warning/20 bg-warning/5 px-5 py-3 text-sm font-semibold text-warning transition hover:bg-warning/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={17} />
                {isCancelling ? "Cancelling..." : "Cancel Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart */}
      {!cart || cart.items.length === 0 ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <div className="rounded-full bg-muted-foreground/10 p-6">
            <ShoppingCart size={42} className="text-primary" />
          </div>

          <h2 className="mt-6 font-display text-3xl font-bold">
            Your cart is empty
          </h2>

          <p className="mt-3 max-w-md text-muted-foreground">
            Looks like you haven't added any products yet.
          </p>

          <Link to="/shop" className="btn-primary mt-8">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid items-start gap-8 lg:grid-cols-[2fr_380px]">
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.items.map((item) => (
                <CartItem key={item.product._id} item={item} />
              ))}

              <ClearCart />
            </div>

            {/* Cart Summary */}
            <aside className="lg:sticky lg:top-24">
              <CartSummary cart={cart} />
            </aside>
          </div>
        </>
      )}
    </motion.section>
  );
};

export default CartPage;
