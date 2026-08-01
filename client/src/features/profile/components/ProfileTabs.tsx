import { ChevronDown } from "lucide-react";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  {
    label: "Orders",
    value: "orders",
  },
  {
    label: "Wishlist",
    value: "wishlist",
  },
  {
    label: "Addresses",
    value: "addresses",
  },
  {
    label: "Settings",
    value: "settings",
  },
];

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  return (
    <div className="my-8">
      {/* Mobile: Select dropdown */}
      <div className="relative sm:hidden">
        <select
          value={activeTab}
          onChange={(e) => onTabChange(e.target.value)}
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

      {/* Desktop: Button tabs */}
      <div className="hidden flex-wrap gap-3 sm:flex">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === tab.value
                ? "bg-primary text-primary-foreground shadow-md"
                : "border border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
