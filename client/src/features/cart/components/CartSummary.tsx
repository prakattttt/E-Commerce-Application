import type { ICart } from "../types/cart.types";

interface Props {
  cart: ICart;
}

const CartSummary = ({ cart }: Props) => {
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const shipping = subtotal >= 100 ? 0 : 10;

  const tax = subtotal * 0.13;

  const total = subtotal + shipping + tax;

  return (
    <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 font-display text-2xl font-bold">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>

          <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>

          <span>${tax.toFixed(2)}</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>

          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="btn-primary mt-8 w-full">Proceed to Checkout</button>
    </div>
  );
};

export default CartSummary;
