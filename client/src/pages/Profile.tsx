import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import useAuth from "../features/auth/hooks/useAuth";

import ProfileHeader from "../features/profile/components/ProfileHeader";
import ProfileTabs from "../features/profile/components/ProfileTabs";

import OrdersTab from "../features/profile/components/OrdersTab";
import WishlistTab from "../features/profile/components/WishlistTab";
import SettingsTab from "../features/profile/components/SettingsTab";
import SecondaryUi from "../features/profile/components/SecondaryUi";

import type { IProduct } from "../features/shop/types/products.types";

import { container, item } from "../animations";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../features/checkout/api/checkout.api";

const Profile = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("orders");

  const { data: ordersData } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const orders = ordersData?.orders ?? [];

  const wishlist: IProduct[] = [];

  if (!user) {
    return <SecondaryUi />;
  }

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      className="mx-auto mt-10 max-w-7xl px-6 py-10"
    >
      <motion.div variants={item}>
        <ProfileHeader user={user} />
      </motion.div>

      <motion.div variants={item}>
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </motion.div>

      <motion.div variants={item}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {activeTab === "orders" && <OrdersTab orders={orders} />}

            {activeTab === "wishlist" && <WishlistTab products={wishlist} />}

            {activeTab === "settings" && <SettingsTab />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default Profile;
