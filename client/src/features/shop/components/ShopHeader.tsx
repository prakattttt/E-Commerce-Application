import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../../animations";

const options = [
  "Most Popular",
  "Top Rated",
  "Newest",
  "Price: Low To High",
  "Price: High To Low",
];

const ShopHeader = () => {
  // Toggle between grid and list view styles for the product listing.
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
    >
      <motion.div variants={fadeUp} custom={0}>
        <h1 className="font-display text-4xl font-bold text-foreground">
          All Products
        </h1>

        <p className="mt-2 text-muted-foreground">
          Discover our newest arrivals and best sellers.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        custom={1}
        className="flex flex-wrap items-center gap-3"
      >
        {/* Sort order select menu for product listings. */}
        <motion.select
          whileFocus={{ scale: 1.02 }}
          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </motion.select>

        {/* View mode toggle buttons. */}
        <div className="flex overflow-hidden rounded-xl border border-border bg-card">
          <motion.button
            whileTap={{ scale: 0.9 }}
            animate={{
              backgroundColor:
                view === "grid" ? "var(--primary)" : "transparent",
            }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setView("grid")}
            className={`p-2.5 ${
              view === "grid"
                ? "text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <LayoutGrid size={18} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            animate={{
              backgroundColor:
                view === "list" ? "var(--primary)" : "transparent",
            }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setView("list")}
            className={`p-2.5 ${
              view === "list"
                ? "text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <List size={18} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShopHeader;
