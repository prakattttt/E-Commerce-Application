import { useQuery } from "@tanstack/react-query";
import { CreditCard, Truck } from "lucide-react";
import { getCart } from "../../cart/api/cart.api";
import type { ICart } from "../../cart/types/cart.types";

interface Props {
  isPending: boolean;
}

const CheckoutSummary = ({ isPending }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 5 * 60 * 1000,
  });

  const cart = data?.cart as ICart | undefined;

  if (isLoading) {
    return (
      <aside className="lg:sticky lg:top-24">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-7">
          <h2 className="font-display text-xl font-bold">Order Summary</h2>
          <div className="mt-6 animate-pulse space-y-4">
            <div className="h-16 rounded-xl bg-muted/50" />
            <div className="h-16 rounded-xl bg-muted/50" />
            <div className="h-10 rounded-xl bg-muted/50" />
          </div>
        </div>
      </aside>
    );
  }

  if (isError || !cart) {
    return (
      <aside className="lg:sticky lg:top-24">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-7">
          <h2 className="font-display text-xl font-bold">Order Summary</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Unable to load your order summary right now.
          </p>
        </div>
      </aside>
    );
  }

  const visibleItems = cart.items.slice(0, 6);

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const shipping = subtotal >= 5000 ? 0 : 250;

  const tax = subtotal * 0.13;

  const total = subtotal + shipping + tax;

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-7">
        <h2 className="font-display text-xl font-bold">Order Summary</h2>

        {/* Items */}
        <div className="mt-6 lg:max-h-97 lg:overflow-y-auto lg:scrollbar-none lg:pr-1">
          <div className="space-y-4">
            {visibleItems.map((item) => (
              <div key={item.product._id} className="flex gap-3">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary">
                  <img
                    src={item.product.imageCover.url}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{item.product.name}</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="text-sm font-semibold">
                  Rs. {(item.product.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-6 border-t border-border" />

        {/* Pricing */}
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>

            <span className="font-medium text-foreground">
              Rs. {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Shipping</span>

            {shipping === 0 ? (
              <span className="font-semibold text-success">Free</span>
            ) : (
              <span className="font-medium text-foreground">
                Rs. {shipping.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Tax (13%)</span>

            <span className="font-medium text-foreground">
              Rs.{" "}
              {tax.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        <div className="my-5 border-t border-border" />

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Total</span>

          <span className="font-display text-2xl font-bold text-primary">
            Rs.{" "}
            {total.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        {/* Shipping notice */}
        {shipping === 0 && (
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-success/10 p-3 text-xs font-medium text-success">
            <Truck size={16} />
            Free shipping unlocked!
          </div>
        )}

        {/* Desktop submit */}
        <button
          type="submit"
          form="checkout-form"
          disabled={isPending}
          className="btn-primary mt-7 hidden w-full items-center justify-center gap-2 py-3.5 text-base font-semibold lg:flex"
        >
          <CreditCard size={18} />
          {isPending ? "Processing..." : "Place Order"}
        </button>

        {/* Mobile Submit */}
        <button
          type="submit"
          form="checkout-form"
          disabled={isPending}
          className="btn-primary mt-5 flex w-full items-center justify-center gap-2 py-3.5 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-60 lg:hidden"
        >
          <CreditCard size={18} />

          {isPending ? "Processing..." : "Place Order"}
        </button>

        <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
          By placing your order, you agree to our terms and conditions.
        </p>
      </div>
    </aside>
  );
};

export default CheckoutSummary;
