import { motion } from "framer-motion";
import {
  Package,
  Tags,
  ShoppingCart,
  Users,
  AlertTriangle,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

import { fadeUp } from "../../../animations";
import { useState, useEffect } from "react";
import { getDashboard } from "../api/admin.api";
import { getErrorMessage } from "../../../utils/getErrorMessage";

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    {
      title: "Products",
      value: 0,
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Categories",
      value: 0,
      icon: Tags,
      color: "text-accent",
    },
    {
      title: "Orders",
      value: 0,
      icon: ShoppingCart,
      color: "text-success",
    },
    {
      title: "Users",
      value: 0,
      icon: Users,
      color: "text-info",
    },
  ]);
  useEffect(() => {
    const run = async () => {
      try {
        const { products, categories, users } = await getDashboard();

        setStats([
          {
            title: "Products",
            value: products,
            icon: Package,
            color: "text-primary",
          },
          {
            title: "Categories",
            value: categories,
            icon: Tags,
            color: "text-accent",
          },
          {
            title: "Orders",
            value: 0,
            icon: ShoppingCart,
            color: "text-success",
          },
          {
            title: "Users",
            value: users,
            icon: Users,
            color: "text-info",
          },
        ]);
      } catch (error) {
        getErrorMessage(error);
      }
    };

    run();
  }, []);
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
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={index}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>

                  <h2 className="mt-2 text-3xl font-bold">{stat.value}</h2>
                </div>

                <div className={`rounded-2xl bg-secondary p-4 ${stat.color}`}>
                  <Icon size={28} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Dashboard Grid */}
      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        {/* Recent Orders */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="rounded-3xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Orders</h2>

            <Link
              to="/admin/orders"
              className="text-sm font-medium text-primary hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="flex h-60 items-center justify-center rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground">No orders yet.</p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
          className="rounded-3xl border border-border bg-card p-6 shadow-sm"
        >
          <h2 className="mb-6 text-xl font-semibold">Quick Actions</h2>

          <div className="space-y-4">
            <Link
              to="/admin/products/create"
              className="flex items-center gap-3 rounded-2xl bg-primary px-5 py-4 font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Plus size={18} />
              Add Product
            </Link>

            <Link
              to="/admin/categories/create"
              className="flex items-center gap-3 rounded-2xl border border-border px-5 py-4 transition hover:bg-secondary"
            >
              <Plus size={18} />
              Add Category
            </Link>
          </div>

          {/* Low Stock Section */}
          <div className="mt-8 rounded-2xl bg-secondary p-5">
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle size={18} className="text-warning" />

              <h3 className="font-semibold">Low Stock Alert</h3>
            </div>

            <p className="text-sm text-muted-foreground">
              All products currently have sufficient stock.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AdminDashboard;
