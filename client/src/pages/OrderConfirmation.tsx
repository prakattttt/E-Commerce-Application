import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { fadeUp } from "../animations";
import { getOrder } from "../features/checkout/api/checkout.api";
import Loader from "../components/ui/Loader";
import { getErrorMessage } from "../utils/getErrorMessage";

const OrderConfirmation = () => {
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

  const { order } = data;

  return (
    <motion.main
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="container px-4 py-10 sm:px-6 sm:py-14"
    >
      <div className="mx-auto mt-10 max-w-4xl">
        {/* Success Header */}

        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 size={44} />
          </div>

          <h1 className="mt-7 font-display text-3xl font-bold sm:text-4xl">
            Order Confirmed!
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>

          <p className="mt-3 text-sm font-semibold">
            Order #{order.orderNumber}
          </p>
        </div>

        {/* Order Status */}

        <section className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Package size={20} />
            </div>

            <div>
              <h2 className="font-display text-xl font-bold">
                Order Information
              </h2>

              <p className="text-sm text-muted-foreground">
                Order placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-background p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Order Status
              </p>

              <p className="mt-2 font-semibold">{order.orderStatus}</p>
            </div>

            <div className="rounded-2xl bg-background p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Payment Method
              </p>

              <p className="mt-2 font-semibold">
                {order.paymentMethod === "COD"
                  ? "Cash on Delivery"
                  : order.paymentMethod}
              </p>
            </div>

            <div className="rounded-2xl bg-background p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Payment Status
              </p>

              <p className="mt-2 font-semibold">{order.paymentStatus}</p>
            </div>
          </div>
        </section>

        {/* Ordered Products */}

        <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShoppingBag size={20} />
            </div>

            <div>
              <h2 className="font-display text-xl font-bold">Ordered Items</h2>

              <p className="text-sm text-muted-foreground">
                {order.items.length}{" "}
                {order.items.length === 1 ? "item" : "items"} in this order
              </p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-border">
            {order.items.map((item) => (
              <div
                key={item.product}
                className="flex gap-4 py-5 first:pt-0 last:pb-0"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{item.name}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Rs. {item.price.toLocaleString()} each
                  </p>
                </div>

                <p className="shrink-0 font-semibold">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping Address */}

        <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin size={20} />
            </div>

            <div>
              <h2 className="font-display text-xl font-bold">
                Delivery Address
              </h2>

              <p className="text-sm text-muted-foreground">
                Your order will be delivered here.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-background p-5">
            <p className="font-semibold">{order.shippingAddress.fullName}</p>

            <p className="mt-2 text-sm text-muted-foreground">
              {order.shippingAddress.phone}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {order.shippingAddress.address}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {order.shippingAddress.city}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {order.shippingAddress.province}
            </p>
          </div>
        </section>

        {/* Price Summary */}

        <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-xl font-bold">Payment Summary</h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>

              <span className="font-medium text-foreground">
                Rs. {order.subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>

              {order.shippingCost === 0 ? (
                <span className="font-semibold text-success">Free</span>
              ) : (
                <span className="font-medium text-foreground">
                  Rs. {order.shippingCost.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Tax</span>

              <span className="font-medium text-foreground">
                Rs. {order.tax.toLocaleString()}
              </span>
            </div>

            <div className="border-t border-border" />

            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>

              <span className="font-display text-2xl font-bold text-primary">
                Rs. {order.total.toLocaleString()}
              </span>
            </div>
          </div>
        </section>

        {/* COD Notice */}

        {order.paymentMethod === "COD" && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-warning/20 bg-warning/10 p-5">
            <Truck size={20} className="mt-0.5 shrink-0 text-warning" />

            <div>
              <p className="text-sm font-semibold text-warning">
                Cash on Delivery
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Please keep Rs. {order.total.toLocaleString()} ready when your
                order is delivered.
              </p>
            </div>
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
    </motion.main>
  );
};

export default OrderConfirmation;
