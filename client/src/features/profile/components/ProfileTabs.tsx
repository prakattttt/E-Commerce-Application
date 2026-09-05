import { ChevronDown } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const tabs = [
  {
    label: "Orders",
    value: "orders",
    path: "/profile/orders",
  },
  {
    label: "Wishlist",
    value: "wishlist",
    path: "/profile/wishlist",
  },
  {
    label: "Settings",
    value: "settings",
    path: "/profile/settings",
  },
];

const ProfileTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab =
    tabs.find((tab) => location.pathname === tab.path)?.value ?? "orders";

  return (
    <div className="my-8">
      {/* Mobile: Select dropdown */}{" "}
      <div className="relative sm:hidden">
        <select
          value={activeTab}
          onChange={(e) => {
            const selectedTab = tabs.find(
              (tab) => tab.value === e.target.value,
            );

            if (selectedTab) {
              navigate(selectedTab.path);
            }
          }}
          className="w-full appearance-none rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground focus:border-primary/50 focus:outline-none"
        >
          {tabs.map((tab) => (
            <option key={tab.value} value={tab.value}>
              {tab.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
      </div>
      {/* Desktop: Navigation tabs */}
      <div className="hidden flex-wrap gap-3 sm:flex">
        {tabs.map((tab) => (
          <NavLink
            key={tab.value}
            to={tab.path}
            className={({ isActive }) =>
              `rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-secondary"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
