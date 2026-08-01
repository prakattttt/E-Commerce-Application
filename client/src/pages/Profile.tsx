import { useState } from "react";

import useAuth from "../features/auth/hooks/useAuth";

import ProfileHeader from "../features/profile/components/ProfileHeader";
import ProfileTabs from "../features/profile/components/ProfileTabs";

import OrdersTab from "../features/profile/components/OrdersTab";
import WishlistTab from "../features/profile/components/WishlistTab";
import SettingsTab from "../features/profile/components/SettingsTab";
import type { IProduct } from "../features/shop/types/products.types";
import SecondaryUi from "../features/profile/components/SecondaryUi";

//Dummy orders for now
const orders = [
  {
    _id: "1",
    orderNumber: "SS10001",
    totalAmount: 5499,
    totalItems: 2,
    status: "Delivered" as const,
    createdAt: "2026-08-01",
  },
  {
    _id: "2",
    orderNumber: "SS10002",
    totalAmount: 2499,
    totalItems: 1,
    status: "Shipped" as const,
    createdAt: "2026-07-28",
  },
];

const Profile = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("orders");

  const wishlist: IProduct[] = [];

  if (!user) {
    return <SecondaryUi />;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 mt-10">
      <ProfileHeader user={user} />

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "orders" && <OrdersTab orders={orders} />}

      {activeTab === "wishlist" && <WishlistTab products={wishlist} />}

      {activeTab === "settings" && <SettingsTab />}
    </section>
  );
};

export default Profile;
