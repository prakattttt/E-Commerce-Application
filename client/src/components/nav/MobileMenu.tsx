import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type Props = {
  open: boolean;
};

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Profile", path: "/profile" },
];

const MobileMenu = ({ open }: Props) => {
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
        <button className="w-full rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary-foreground">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
