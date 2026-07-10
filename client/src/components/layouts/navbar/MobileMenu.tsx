import { NavLink } from "react-router-dom";
import { ChevronRight, User, LogOut } from "lucide-react";
import useAuth from "../../../features/auth/hooks/useAuth";
import { Link } from "react-router-dom";
import { menus, moreMenus } from "./menus.data"

interface Props {
  open: boolean;
}

const MobileMenu = ({ open }: Props) => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div
      className={`fixed top-15 left-0 right-0 z-40 overflow-hidden border-b border-border bg-background/90 transition-all duration-300 ease-in-out md:hidden ${
        open
          ? "max-h-96 translate-y-0 opacity-100"
          : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
      }`}
    >
      <div className="px-6 py-4">
        {/* Links */}
        <ul className="mb-6 flex flex-col gap-4">
          {/* Main navigation */}
          {menus.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between text-sm transition-colors duration-200 ${
                    isActive
                      ? "font-medium text-primary"
                      : "text-foreground hover:text-primary"
                  }`
                }
              >
                <span>{item.name}</span>
                <ChevronRight size={16} className="opacity-60" />
              </NavLink>
            </li>
          ))}

          {/* Divider */}
          <li className="pt-2">
            <p className="text-xs font-semibold tracking-[0.4em] text-muted-foreground">
              MORE
            </p>
          </li>

          {/* More links */}
          {moreMenus.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between text-sm transition-colors duration-200 ${
                    isActive
                      ? "font-medium text-primary"
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
