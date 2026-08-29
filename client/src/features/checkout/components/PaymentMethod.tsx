import { CreditCard } from "lucide-react";
import type { UseFormRegister } from "react-hook-form";

import type { CheckoutFormValues } from "../types/checkout.schema";

interface PaymentMethodProps {
  register: UseFormRegister<CheckoutFormValues>;
  selectedPayment: CheckoutFormValues["payment"];
}

const paymentOptions: {
  value: CheckoutFormValues["payment"];
  label: string;
  description: string;
}[] = [
  {
    value: "COD",
    label: "Cash on Delivery",
    description: "Pay when your order arrives.",
  },
  {
    value: "eSewa",
    label: "eSewa",
    description: "Pay securely using eSewa.",
  },
  {
    value: "Khalti",
    label: "Khalti",
    description: "Pay securely using Khalti.",
  },
];

const PaymentMethod = ({ register, selectedPayment }: PaymentMethodProps) => {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-7 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CreditCard size={20} />
        </div>

        <div>
          <h2 className="font-display text-xl font-bold">Payment Method</h2>

          <p className="text-sm text-muted-foreground">
            Choose how you'd like to pay.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {paymentOptions.map((option) => {
          const isSelected = selectedPayment === option.value;

          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-secondary"
              }`}
            >
              <input
                type="radio"
                value={option.value}
                {...register("payment")}
                className="h-4 w-4 accent-primary"
              />

              <div className="flex-1">
                <p className="text-sm font-semibold">{option.label}</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {option.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
};

export default PaymentMethod;
