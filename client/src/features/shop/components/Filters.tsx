const categories = ["All", "Electronics", "Fashion", "Shoes", "Accessories"];

const prices = [
  "All Prices",
  "Under $100",
  "$100 - $250",
  "$250 - $500",
  "Premium",
];

const Filters = () => {
  return (
    <aside className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide rounded-3xl shadow-xl border border-border bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold">Filters</h2>

      <div className="space-y-8">
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Category
          </h3>

          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                className="w-full rounded-xl px-4 py-2 text-left text-sm transition hover:bg-secondary"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Price
          </h3>

          <div className="space-y-2">
            {prices.map((price) => (
              <button
                key={price}
                className="w-full rounded-xl px-4 py-2 text-left text-sm transition hover:bg-secondary"
              >
                {price}
              </button>
            ))}
          </div>
        </div>
        <button className="w-full rounded-xl bg-primary py-2 font-medium text-primary-foreground transition hover:opacity-90">
          {" "}
          Clear Filters{" "}
        </button>
      </div>
    </aside>
  );
};

export default Filters;
