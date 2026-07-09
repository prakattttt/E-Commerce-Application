import { NavLink } from "react-router-dom";
import { ChevronRight, User, LogOut } from "lucide-react";
import useAuth from "../../../features/auth/hooks/useAuth";
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
};

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Profile", path: "/profile" },
];

const MobileMenu = ({ open }: Props) => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div
      className={`
        md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-border bg-card
        ${
          open
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }
      `}
    >
      <div className="px-6 py-4">
        {/* Links */}
        <ul className="flex flex-col gap-4 mb-6">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-foreground hover:text-primary"
                  }`
                }
              >
                <span>{item.name}</span>
                <ChevronRight size={16} className="opacity-60" />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Sign In Button */}
        {isAuthenticated ? (
          <button
            className="flex w-full items-center justify-center rounded-full bg-primary p-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary-foreground"
            onClick={logout}
          >
            <LogOut size={18} className="mr-2" />
            Log Out
          </button>
        ) : (
          <Link
            to="/auth"
            className="flex w-full items-center justify-center rounded-full bg-primary p-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary-foreground"
          >
            <User size={18} className="mr-2" />
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
