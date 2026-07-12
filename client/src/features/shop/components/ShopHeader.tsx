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
          className="rounded-xl border border-border border-ring bg-card px-4 py-2.5 text-sm text-foreground outline-none transition"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </motion.select>
      </motion.div>
    </motion.div>
  );
};

export default ShopHeader;
