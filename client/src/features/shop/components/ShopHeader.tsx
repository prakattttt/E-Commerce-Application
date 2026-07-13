import { motion } from "framer-motion";
import { fadeUp } from "../../../animations";
import type { TSort } from "../types/filter.types";
import type React from "react";

const options: { label: string; value: TSort }[] = [
  { label: "Newest", value: "Newest" },
  { label: "Most Popular", value: "Most-Popular" },
  { label: "Top Rated", value: "Top-Rated" },
  { label: "Price: Low To High", value: "L-H" },
  { label: "Price: High To Low", value: "H-L" },
];

interface Props {
  selectedSort: TSort;
  setSelectedSort: React.Dispatch<React.SetStateAction<TSort>>;
}

const ShopHeader = ({ selectedSort, setSelectedSort }: Props) => {
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
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value as TSort)}
          whileFocus={{ scale: 1.02 }}
          className="rounded-xl border border-border border-ring bg-card px-4 py-2.5 text-sm text-foreground outline-none transition"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </motion.select>
      </motion.div>
    </motion.div>
  );
};

export default ShopHeader;
