export type PaymentMethod = "cod" | "esewa" | "khalti";

export interface CheckoutFormValues {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  paymentMethod: PaymentMethod;
}