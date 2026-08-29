import { MapPin, User } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PaymentMethod from "./PaymentMethod";

import {
  checkoutSchema,
  type CheckoutFormValues,
} from "../types/checkout.schema";

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),

    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      province: undefined,
      payment: "cod",
    },
  });

  const selectedPayment = useWatch({
    control,
    name: "payment",
    defaultValue: "cod",
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    console.log("Checkout data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <label htmlFor="name" className="mb-2 block text-sm font-semibold">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register("fullName")}
              className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.fullName ? "border-error" : "border-border"
              }`}
            />

            {errors.fullName && (
              <p className="mt-1.5 text-xs text-error">{errors.fullName.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-semibold">
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              placeholder="98XXXXXXXX"
              {...register("phone")}
              className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.phone ? "border-error" : "border-border"
              }`}
            />

            {errors.phone && (
              <p className="mt-1.5 text-xs text-error">
                {errors.phone.message}
              </p>
            )}
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
              rows={3}
              placeholder="Street address, house number, landmark..."
              {...register("address")}
              className={`w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.address ? "border-error" : "border-border"
              }`}
            />

            {errors.address && (
              <p className="mt-1.5 text-xs text-error">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* City + Province */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="mb-2 block text-sm font-semibold"
              >
                City
              </label>

              <input
                id="city"
                type="text"
                placeholder="Kathmandu"
                {...register("city")}
                className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                  errors.city ? "border-error" : "border-border"
                }`}
              />

              {errors.city && (
                <p className="mt-1.5 text-xs text-error">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Province */}
            <div>
              <label
                htmlFor="province"
                className="mb-2 block text-sm font-semibold"
              >
                Province
              </label>

              <select
                id="province"
                {...register("province")}
                className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                  errors.province ? "border-error" : "border-border"
                }`}
              >
                <option value="">Select province</option>
                <option value="Koshi">Koshi</option>
                <option value="Madhesh">Madhesh</option>
                <option value="Bagmati">Bagmati</option>
                <option value="Gandaki">Gandaki</option>
                <option value="Lumbini">Lumbini</option>
                <option value="Karnali">Karnali</option>
                <option value="Sudurpashchim">Sudurpashchim</option>
              </select>

              {errors.province && (
                <p className="mt-1.5 text-xs text-error">
                  {errors.province.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Payment */}
      <PaymentMethod register={register} selectedPayment={selectedPayment} />

      {/* Mobile Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary flex w-full items-center justify-center gap-2 py-3.5 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-60 lg:hidden"
      >
        <User size={18} />

        {isSubmitting ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
};

export default CheckoutForm;
