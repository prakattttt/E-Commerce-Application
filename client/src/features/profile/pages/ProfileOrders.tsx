import { useQuery } from "@tanstack/react-query";

import OrdersTab from "../components/OrdersTab";
import { getOrders } from "../../checkout/api/checkout.api";

const ProfileOrders = () => {
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const orders = ordersData?.orders ?? [];

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-card py-20 text-center">
        <p className="text-muted-foreground">Loading your orders...</p>
      </div>
    );
  }

  return <OrdersTab orders={orders} />;
};

export default ProfileOrders;
