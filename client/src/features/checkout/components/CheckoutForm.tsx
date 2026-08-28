import { CreditCard, MapPin, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import type { CheckoutFormValues } from "../types/checkout.types";

const CheckoutForm = () => {
  const [paymentMethod, setPaymentMethod] =
    useState<CheckoutFormValues["paymentMethod"]>("cod");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast.info("Order placement will be connected to the backend later.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Delivery Information */}
      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MapPin size={20} />
          </div>

          <div>
            <h2 className="font-display text-xl font-bold">
              Delivery Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Where should we deliver your order?
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-semibold"
            >
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-semibold">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="98XXXXXXXX"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-semibold"
            >
              Delivery Address
            </label>

            <textarea
              id="address"
              name="address"
              rows={3}
              placeholder="Street address, house number, landmark..."
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* City + Province */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="city"
                className="mb-2 block text-sm font-semibold"
              >
                City
              </label>

              <input
                id="city"
                name="city"
                type="text"
                placeholder="Kathmandu"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div>
              <label
                htmlFor="province"
                className="mb-2 block text-sm font-semibold"
              >
                Province
              </label>

              <select
                id="province"
                name="province"
                defaultValue=""
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="" disabled>
                  Select province
                </option>

                <option value="Koshi">Koshi</option>
                <option value="Madhesh">Madhesh</option>
                <option value="Bagmati">Bagmati</option>
                <option value="Gandaki">Gandaki</option>
                <option value="Lumbini">Lumbini</option>
                <option value="Karnali">Karnali</option>
                <option value="Sudurpashchim">Sudurpashchim</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Payment */}
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
          {/* COD */}
          <label
            className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
              paymentMethod === "cod"
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-secondary"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
              className="h-4 w-4 accent-primary"
            />

            <div className="flex-1">
              <p className="text-sm font-semibold">Cash on Delivery</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Pay when your order arrives.
              </p>
            </div>
          </label>

          {/* eSewa */}
          <label
            className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
              paymentMethod === "esewa"
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-secondary"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="esewa"
              checked={paymentMethod === "esewa"}
              onChange={() => setPaymentMethod("esewa")}
              className="h-4 w-4 accent-primary"
            />

            <div className="flex-1">
              <p className="text-sm font-semibold">eSewa</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Pay securely using eSewa.
              </p>
            </div>
          </label>

          {/* Khalti */}
          <label
            className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
              paymentMethod === "khalti"
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-secondary"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="khalti"
              checked={paymentMethod === "khalti"}
              onChange={() => setPaymentMethod("khalti")}
              className="h-4 w-4 accent-primary"
            />

            <div className="flex-1">
              <p className="text-sm font-semibold">Khalti</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Pay securely using Khalti.
              </p>
            </div>
          </label>
        </div>
      </section>

      {/* Mobile submit */}
      <button
        type="submit"
        className="btn-primary flex w-full items-center justify-center gap-2 py-3.5 text-base font-semibold lg:hidden"
      >
        <User size={18} />
        Place Order
      </button>
    </form>
  );
};

export default CheckoutForm;
