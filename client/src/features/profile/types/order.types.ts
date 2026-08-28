export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface IOrderSummary {
  _id: string;
  orderNumber: string;
  totalAmount: number;
  totalItems: number;
  status: OrderStatus;
  createdAt: string;
}