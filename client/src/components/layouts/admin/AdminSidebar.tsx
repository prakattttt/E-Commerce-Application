import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  ArrowLeft,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";

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

const AdminSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-border bg-card lg:flex lg:flex-col">
      <div className="border-b border-border p-8">
        <h1 className="font-display text-3xl font-bold">
          <span className="text-primary">Shop</span>
          <span className="text-accent">Sphere</span>
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">Admin Dashboard</p>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-6">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
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
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-secondary"
        >
          <ArrowLeft size={18} />
          Back to Store
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
