import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, ArrowLeft, LockKeyhole, Package, ArrowRight } from "lucide-react";
import Loader from "../components/ui/Loader";
import { Link, useParams } from "react-router-dom";
import { fadeUp } from "../animations";
import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../features/checkout/api/checkout.api";
import { getErrorMessage } from "../utils/getErrorMessage";

const Payment = () => {
  const { orderId } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId!),
    enabled: Boolean(orderId),
  });

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (isError || !data?.order) {
    return (
      <motion.main
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="container flex min-h-screen items-center justify-center px-4 py-14 sm:px-6"
      >
        <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-error">
            <Package size={32} />
          </div>

          <h1 className="mt-6 font-display text-2xl font-bold">
            Unable to load your order
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            {getErrorMessage(error)}
          </p>

          <Link
            to="/profile?tab=orders"
            className="btn-primary mt-7 inline-flex items-center gap-2"
          >
            View My Orders
            <ArrowRight size={17} />
          </Link>
        </div>
      </motion.main>
    );
  }

  return (
    <motion.main
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="container flex min-h-screen items-center justify-center px-4 py-14 sm:px-6"
    >
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Payment
          </span>

          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Complete your payment
          </h1>

          <p className="mt-3 text-muted-foreground">
            Your order has been created. Complete the payment to confirm your
            order.
          </p>
        </div>

        {/* Payment Card */}
        <div className="rounded-3xl border border-border bg-card p-7 shadow-lg sm:p-8">
          {/* Order Information */}
          <div className="rounded-2xl bg-secondary/50 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Order
                </p>

                <p className="mt-1 font-semibold">
                  {data.order.orderNumber ?? `#${orderId}`}
                </p>
              </div>

              {data.order.total !== undefined && (
                <div className="text-right">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Amount
                  </p>

                  <p className="mt-1 font-display text-xl font-bold text-primary">
                    Rs. {data.order.total.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold">Payment Method</p>

            <div className="flex items-center gap-4 rounded-2xl border border-primary bg-primary/5 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CreditCard size={21} />
              </div>

              <div>
                <p className="font-semibold">
                  {data.order.paymentMethod ?? "Online Payment"}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  You will be redirected to the payment gateway.
                </p>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-4">
            <ShieldCheck size={19} className="mt-0.5 shrink-0 text-primary" />

            <div>
              <p className="text-sm font-semibold">Secure payment</p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Your payment information is securely handled by the payment
                provider.
              </p>
            </div>
          </div>

          {/* Payment Button */}
          <button
            type="button"
            className="btn-primary mt-7 flex w-full items-center justify-center gap-2 py-3.5 text-base font-semibold"
          >
            <LockKeyhole size={18} />
            Pay Rs.{" "}
            {data.order.total !== undefined ? data.order.total.toLocaleString() : "Now"}
          </button>

          {/* Back */}
          <Link
            to="/shop"
            className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </motion.main>
  );
};

export default Payment;
