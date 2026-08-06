import { CreditCard, Truck } from "lucide-react";
import type { ICart } from "../types/cart.types";

interface Props {
  cart: ICart;
}

const CartSummary = ({ cart }: Props) => {
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const shipping = subtotal >= 5000 ? 0 : 250;

  const tax = subtotal * 0.13;

  const total = subtotal + shipping + tax;

  return (
    <div className="sticky top-24 rounded-3xl border border-border bg-card p-7 shadow-lg">
      <h2 className="mb-6 font-display text-2xl font-bold">Order Summary</h2>

      {/* Free Shipping Notice */}
      {shipping === 0 && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-success/20 bg-success/10 p-3 text-sm text-success">
          <Truck size={18} />
          <span>Congratulations! You unlocked free shipping.</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-medium text-foreground">
            Rs. {subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between text-muted-foreground">
          <span>Shipping</span>

          {shipping === 0 ? (
            <span className="font-semibold text-success">Free</span>
          ) : (
            <span className="font-medium text-foreground">
              Rs. {shipping.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-muted-foreground">
          <span>Tax (13%)</span>

          <span className="font-medium text-foreground">Rs. {tax.toFixed(2)}</span>
        </div>

        <div className="my-2 border-t border-border" />

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Total</span>

          <span className="text-2xl font-bold text-primary">
            Rs. {total.toFixed(2)}
          </span>
        </div>
      </div>

      <button className="btn-primary mt-8 flex w-full items-center justify-center gap-2 py-3 text-base font-semibold">
        <CreditCard size={20} />
        Proceed to Checkout
      </button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Taxes calculated at checkout. Secure payments powered by Stripe.
      </p>
    </div>
  );
};

export default CartSummary;
