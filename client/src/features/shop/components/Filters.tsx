import { motion } from "framer-motion";
import { fadeUp } from "../../../animations";
import type { TCategory, TPrice } from "../types/filter.types";

const categories: TCategory[] = [
  "All",
  "Electronics",
  "Fashion",
  "Shoes",
  "Accessories",
];

const prices: { value: TPrice; label: string }[] = [
  { value: "All", label: "All Prices" },
  { value: "P1", label: "Under $100" },
  { value: "P2", label: "$100 - $250" },
  { value: "P3", label: "$250 - $500" },
  { value: "Premium", label: "Premium" },
];

interface Props {
  selectedCategory: TCategory;
  setSelectedCategory: React.Dispatch<React.SetStateAction<TCategory>>;
  selectedPrice: TPrice;
  setSelectedPrice: React.Dispatch<React.SetStateAction<TPrice>>;
}

const Filters = ({
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
}: Props) => {
  return (
    <>
      {/* Mobile Filters */}
      <div className="space-y-4 lg:hidden">
        {/* Mobile Categories */}
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Category
          </h3>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition
                  ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border hover:bg-secondary"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Prices */}
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Price
          </h3>

          <div className="flex gap- overflow-x-auto pb-2 scrollbar-hide">
            {prices.map((price) => (
              <button
                key={price.value}
                onClick={() => setSelectedPrice(price.value)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition
                  ${
                    selectedPrice === price.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border hover:bg-secondary"
                  }`}
              >
                {price.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-xl scrollbar-hide lg:block"
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="mb-6 text-xl font-semibold"
        >
          Filters
        </motion.h2>

        <div className="space-y-8">
          {/* Category */}
          <motion.div variants={fadeUp} custom={1}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Category
            </h3>

            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full rounded-full px-4 py-2 text-left text-sm transition-all
                    ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Price */}
          <motion.div variants={fadeUp} custom={2}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Price
            </h3>

            <div className="space-y-1">
              {prices.map((price) => (
                <button
                  key={price.value}
                  onClick={() => setSelectedPrice(price.value)}
                  className={`w-full rounded-full px-4 py-2 text-left text-sm transition-all
                    ${
                      selectedPrice === price.value
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                >
                  {price.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Clear Filters */}
          <motion.button
            variants={fadeUp}
            custom={3}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setSelectedCategory("All");
              setSelectedPrice("All");
            }}
            className="w-full rounded-xl bg-primary py-2 font-medium text-primary-foreground"
          >
            Clear Filters
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
};

export default Filters;
