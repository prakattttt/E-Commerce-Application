import type { Order } from "../../checkout/types/ordres.schema";

export interface DashboardData {
  products: number;
  categories: number;
  users: number;
  orders: number;
  recentOrders: Order[];
}

