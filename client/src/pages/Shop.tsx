import ShopHeader from "../features/shop/components/ShopHeader";
import ProductsGrid from "../features/shop/components/ProductsGrid";
import Filters from "../features/shop/components/Filters";
import { useState } from "react";
import type {
  TPrice,
  TSort,
} from "../features/shop/types/filter.types";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPrice, setSelectedPrice] = useState<TPrice>("All");
  const [selectedSort, setSelectedSort] = useState<TSort>("Newest");

  return (
    <section className="min-h-screen bg-background pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="space-y-8">
          <ShopHeader
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            <Filters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />

            <ProductsGrid
              selectedCategory={selectedCategory}
              selectedPrice={selectedPrice}
              selectedSort={selectedSort}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
