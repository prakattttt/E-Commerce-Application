import { motion } from "framer-motion";
import { CheckCircle2, Package, ShoppingBag, ArrowRight } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fadeUp } from "../animations";

interface OrderConfirmationState {
  orderNumber?: string;
  total?: number;
  paymentMethod?: "COD" | "eSewa" | "Khalti";
}

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const location = useLocation();

  const state = location.state as OrderConfirmationState | null;

  const paymentMethod = state?.paymentMethod ?? "COD";

  return (
    <motion.main
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="container flex min-h-screen items-center justify-center px-4 py-14 sm:px-6"
    >
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl border border-border bg-card p-7 text-center shadow-lg sm:p-10">
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 size={44} />
          </div>

          {/* Heading */}
          <h1 className="mt-7 font-display text-3xl font-bold sm:text-4xl">
            Order Confirmed!
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed
            and we'll let you know when it is on its way.
          </p>

          {/* Order Information */}
          <div className="mt-8 rounded-2xl border border-border bg-background p-5 text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Package size={20} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Order Number
                </p>

                <p className="mt-1 font-semibold">
                  {state?.orderNumber ?? `#${orderId}`}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Payment Method
                </p>

                <p className="mt-1 font-semibold">
                  {paymentMethod === "COD" ? "Cash on Delivery" : paymentMethod}
                </p>
              </div>

              {state?.total !== undefined && (
                <div className="sm:text-right">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Total
                  </p>

                  <p className="mt-1 font-display text-xl font-bold text-primary">
                    Rs. {state.total.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* COD Notice */}
          {paymentMethod === "COD" && (
            <div className="mt-5 rounded-2xl border border-warning/20 bg-warning/10 p-4 text-left">
              <p className="text-sm font-semibold text-warning">
                Cash on Delivery
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Please keep the required amount ready when your order is
                delivered.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/profile?tab=orders"
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Package size={18} />
              View My Orders
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/shop"
              className="flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-secondary"
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default OrderConfirmation;
