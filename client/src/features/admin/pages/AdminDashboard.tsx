import { motion } from "framer-motion";
import { Package, Tags, ShoppingCart, Users } from "lucide-react";
import { useState, useEffect } from "react";

import { fadeUp } from "../../../animations";
import { getDashboard } from "../api/admin.api";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import StatCard from "../components/StatCard";
import RecentOrdersCard from "../components/RecentOrdersCard";
import QuickActionsCard from "../components/QuickActionsCard";
import Loader from "../../../components/ui/Loader";
import type { DashboardData } from "../types/dashboard.types";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardData>({
    products: 0,
    categories: 0,
    users: 0,
    orders: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const data = await getDashboard();
        setDashboard({
          products: data.products,
          categories: data.categories,
          users: data.users,
          orders: data.orders,
          recentOrders: data.recentOrders,
        });
      } catch (error) {
        getErrorMessage(error);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const stats = [
    {
      title: "Products",
      value: dashboard.products,
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Categories",
      value: dashboard.categories,
      icon: Tags,
      color: "text-accent",
    },
    {
      title: "Orders",
      value: dashboard.orders,
      icon: ShoppingCart,
      color: "text-success",
    },
    { title: "Users", value: dashboard.users, icon: Users, color: "text-info" },
  ];

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="space-y-6 overflow-y-hidden">
      {/* Dashboard Heading */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="font-display text-4xl font-bold">Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back! Here's an overview of your store.
        </p>
      </motion.div>

      {/* Statistics Cards */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </section>

      {/* Dashboard Grid */}
      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <RecentOrdersCard orders={dashboard.recentOrders} />{" "}
        <QuickActionsCard />
      </section>
    </div>
  );
};

export default AdminDashboard;
