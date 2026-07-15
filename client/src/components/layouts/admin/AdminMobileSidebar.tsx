import {
  ArrowLeft,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tags,
  Users,
  X,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
}

const links = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: Tags,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: Users,
  },
];

const AdminMobileSidebar = ({ open, onClose }: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />

          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.25 }}
            className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-card shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border p-6">
              <div>
                <h1 className="font-display text-3xl font-bold">
                  <span className="text-primary">Shop</span>
                  <span className="text-accent">Sphere</span>
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                  Admin Dashboard
                </p>
              </div>

              <button onClick={onClose}>
                <X />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-2 p-6">
              {links.map((link) => {
                const Icon = link.icon;

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === "/admin"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 transition
                      ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`
                    }
                  >
                    <Icon size={20} />

                    {link.name}
                  </NavLink>
                );
              })}
            </nav>

            <div className="border-t border-border p-6">
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-secondary"
              >
                <ArrowLeft size={18} />
                Back to Store
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminMobileSidebar;
