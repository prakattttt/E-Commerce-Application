import { motion } from "framer-motion";
import { fadeUp } from "../../../animations";

// List of categories displayed in the filters panel.
const categories = ["All", "Electronics", "Fashion", "Shoes", "Accessories"];

// List of price range filter options
const prices = [
  "All Prices",
  "Under $100",
  "$100 - $250",
  "$250 - $500",
  "Premium",
];

const Filters = () => {
  return (
    // Aside element with animation and sticky positioning for the filter sidebar.
    <motion.aside
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-xl scrollbar-hide"
    >
      <motion.h2
        variants={fadeUp}
        custom={0}
        className="mb-6 text-xl font-semibold"
      >
        Filters
      </motion.h2>

      <div className="space-y-8">
        {/* Category filter section */}
        <motion.div variants={fadeUp} custom={1}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Category
          </h3>

          <div className="space-y-2">
            {categories.map((category) => (
              <button className="w-full rounded-xl px-4 py-2 text-left text-sm transition hover:bg-secondary">
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Price filter section */}
        <motion.div variants={fadeUp} custom={2}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Price
          </h3>

          <div className="space-y-2">
            {prices.map((price) => (
              <button className="w-full rounded-xl px-4 py-2 text-left text-sm transition hover:bg-secondary">
                {price}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Button to clear the selected filters. */}
        <motion.button
          variants={fadeUp}
          custom={8}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-xl bg-primary py-2 font-medium text-primary-foreground"
        >
          Clear Filters
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Filters;
