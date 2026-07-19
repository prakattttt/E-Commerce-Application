import { motion } from "framer-motion";
import { Package, Tags, ShoppingCart, Users } from "lucide-react";
import { useState, useEffect } from "react";

import { fadeUp } from "../../../animations";
import { getDashboard } from "../api/admin.api";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import StatCard from "../components/StatCard";
import RecentOrdersCard from "../components/RecentOrdersCard";
import QuickActionsCard from "../components/QuickActionsCard";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState({
    products: 0,
    categories: 0,
    users: 0,
    orders: 0,
  });

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getDashboard();
        setDashboard({
          ...data,
          orders: 0,
        });
      } catch (error) {
        getErrorMessage(error);
      }
    };

    run();
  }, []);

  const stats = [
    { title: "Products", value: dashboard.products, icon: Package, color: "text-primary" },
    { title: "Categories", value: dashboard.categories, icon: Tags, color: "text-accent" },
    { title: "Orders", value: dashboard.orders, icon: ShoppingCart, color: "text-success" },
    { title: "Users", value: dashboard.users, icon: Users, color: "text-info" },
  ];

  return (
    <div className="space-y-8">
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
        <RecentOrdersCard />
        <QuickActionsCard />
      </section>
    </div>
  );
};

export default AdminDashboard;
