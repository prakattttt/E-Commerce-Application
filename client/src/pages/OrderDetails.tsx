import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

import { fadeUp } from "../animations";
import Loader from "../components/ui/Loader";
import { getErrorMessage } from "../utils/getErrorMessage";

import { getOrder } from "../features/checkout/api/checkout.api";

import OrderItems from "../features/profile/components/orders/OrderItems";
import OrderShipping from "../features/profile/components/orders/OrderShipping";
import OrderSummary from "../features/profile/components/orders/OrderSummary";

const statusStyles = {
  Pending: {
    className: "bg-warning/10 text-warning",
    icon: Clock3,
  },
  Processing: {
    className: "bg-primary/10 text-primary",
    icon: Package,
  },
  Shipped: {
    className: "bg-info/10 text-info",
    icon: Truck,
  },
  Delivered: {
    className: "bg-success/10 text-success",
    icon: CheckCircle2,
  },
  Cancelled: {
    className: "bg-error/10 text-error",
    icon: XCircle,
  },
};

const OrderDetails = () => {
  const { orderId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId!),
    enabled: Boolean(orderId),
  });

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (isError) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6">
        <div className="max-w-md text-center">
          <XCircle size={48} className="mx-auto mb-4 text-error" />

          <h1 className="font-display text-2xl font-bold">
            Unable to load order
          </h1>

          <p className="mt-2 text-muted-foreground">{getErrorMessage(error)}</p>

          <Link
            to="/profile"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const order = data?.order;

  if (!order) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6">
        <div className="max-w-md text-center">
          <Package size={48} className="mx-auto mb-4 text-muted-foreground" />

          <h1 className="font-display text-2xl font-bold">Order Not Found</h1>

          <p className="mt-2 text-muted-foreground">
            We couldn't find the order you're looking for.
          </p>

          <Link
            to="/profile"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const status = statusStyles[order.orderStatus as keyof typeof statusStyles];

  const StatusIcon = status?.icon ?? Clock3;

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl px-6 py-10"
    >
      {/* Back button */}
      <Link
        to="/profile"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft size={18} />
        Back to Orders
      </Link>

      {/* Header */}
      <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Order
            </p>

            <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
              #{order.orderNumber}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-NP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              status?.className ?? "bg-muted text-muted-foreground"
            }`}
          >
            <StatusIcon size={17} />
            {order.orderStatus}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Left column */}
        <div className="space-y-6">
          <OrderItems items={order.items} />

          <OrderShipping address={order.shippingAddress} />
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <OrderSummary order={order} />

          {/* Payment */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CreditCard size={20} />
              </div>

              <div>
                <h2 className="font-semibold">Payment</h2>

                <p className="text-sm text-muted-foreground">
                  Payment information
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">Method</span>

                <span className="text-sm font-semibold">
                  {order.paymentMethod}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">Status</span>

                <span className="text-sm font-semibold">
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            {/* Continue pending online payment */}
            {order.paymentStatus === "Pending" &&
              (order.paymentMethod === "eSewa" ||
                order.paymentMethod === "Khalti") &&
              order.orderStatus === "Pending" && (
                <Link
                  to={`/payment/${order._id}`}
                  className="mt-6 flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Continue Payment
                </Link>
              )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default OrderDetails;
