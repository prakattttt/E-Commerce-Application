import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    label: "Categories",
    path: "/admin/categories",
    icon: Tags,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 flex-col border-r border-border bg-card px-6 py-8 lg:flex">
      {/* Logo */}
      <div className="mb-10">
        <Link to="/" className="inline-block">
          <h1 className="font-display text-3xl font-bold">
            <span className="text-primary">Shop</span>
            <span className="text-accent">Sphere</span>
          </h1>
        </Link>

        <span className="mt-3 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          Admin Panel
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            location.pathname === item.path ||
            (item.path === "/admin" && location.pathname === "/admin");

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200
              ${
                active
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon size={20} />

              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Back to Store */}
      <Link
        to="/"
        className="mt-6 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
      >
        <ArrowLeft size={18} />
        Back to Store
      </Link>
    </aside>
  );
};

export default AdminSidebar;
