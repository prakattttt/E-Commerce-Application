import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Phone,
  Truck,
  User,
  XCircle,
} from "lucide-react";

import { toast } from "sonner";

import { fadeUp } from "../../../animations";

import Loader from "../../../components/ui/Loader";
import { getErrorMessage } from "../../../utils/getErrorMessage";

import { getAdminOrder } from "../api/admin.api";

import type { Order } from "../../checkout/types/ordres.schema";

import OrderItems from "../../profile/components/orders/OrderItems";
import OrderSummary from "../../profile/components/orders/OrderSummary";
import OrderActions from "../components/OrderActions";

const statusStyles: Record<
  Order["orderStatus"],
  {
    className: string;
    icon: typeof Clock3;
  }
> = {
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

const AdminOrderDetails = () => {
  const { orderId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-order", orderId],
    queryFn: () => getAdminOrder(orderId!),
    enabled: Boolean(orderId),
  });

  if (isError) {
    toast.error(getErrorMessage(error));
  }

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (isError || !data?.order) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <XCircle size={48} className="mx-auto text-error" />

          <h1 className="mt-4 font-display text-2xl font-bold">
            Order Not Found
          </h1>

          <p className="mt-2 text-muted-foreground">
            We couldn't find the order you're looking for.
          </p>

          <Link
            to="/admin/orders"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const order = data.order;

  const status = statusStyles[order.orderStatus];

  const StatusIcon = status.icon;

  const createdAt = new Date(order.createdAt);

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Back */}
      <Link
        to="/admin/orders"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft size={18} />
        Back to Orders
      </Link>

      {/* Header */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Order
            </p>

            <h1 className="mt-1 font-display text-3xl font-bold">
              #{order.orderNumber}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={16} />

              <span>
                {createdAt.toLocaleDateString("en-NP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div
            className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${status.className}`}
          >
            <StatusIcon size={17} />
            {order.orderStatus}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] xl:items-start">
        {/* Left column */}
        <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <OrderItems items={order.items} />

          {/* Customer */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-display text-xl font-bold">Customer</h2>

                <p className="text-sm text-muted-foreground">
                  Customer information
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <User size={18} className="text-muted-foreground" />

                <span className="font-medium">
                  {order.shippingAddress.fullName}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-muted-foreground" />

                <span className="text-sm">{order.shippingAddress.phone}</span>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin size={20} />
              </div>

              <div>
                <h2 className="font-display text-xl font-bold">
                  Shipping Address
                </h2>

                <p className="text-sm text-muted-foreground">
                  Delivery information
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-secondary/50 p-5">
              <p className="font-semibold">{order.shippingAddress.fullName}</p>

              <p className="mt-2 text-sm text-muted-foreground">
                {order.shippingAddress.address}
              </p>

              <p className="text-sm text-muted-foreground">
                {order.shippingAddress.city}, {order.shippingAddress.province}
              </p>

              <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                <Phone size={17} className="text-primary" />

                <span className="text-sm font-medium">
                  {order.shippingAddress.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <OrderSummary order={order} />

          <OrderActions order={order} />
        </div>
      </div>
    </motion.section>
  );
};

export default AdminOrderDetails;
