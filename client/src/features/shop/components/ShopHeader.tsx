import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

const options = [
  "Most Popular",
  "Top Rated",
  "Newest",
  "Price: Low To High",
  "Price: High To Low",
];

const ShopHeader = () => {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="font-display text-4xl font-bold text-foreground">
          All Products
        </h1>

        <p className="mt-2 text-muted-foreground">
          Discover our newest arrivals and best sellers.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <div className="flex overflow-hidden rounded-xl border border-border bg-card">
          <button
            onClick={() => setView("grid")}
            className={`p-2.5 transition ${
              view === "grid"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <LayoutGrid size={18} />
          </button>

          <button
            onClick={() => setView("list")}
            className={`p-2.5 transition ${
              view === "list"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
