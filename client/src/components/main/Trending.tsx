import { ArrowRight } from "lucide-react";
import { trendingProducts } from "../../utils/dummy";
import ProductCard from "../main/ProductCard";

const Trending = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      {/* Header */}
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Hot Right Now
          </p>

          <h2 className="mt-2 font-display text-4xl font-bold">
            Trending Products
          </h2>
        </div>

        <button className="flex items-center gap-2 font-semibold text-primary transition hover:gap-3">
          View All
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {trendingProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default Trending;
