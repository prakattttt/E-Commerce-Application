import ShopHeader from "../features/shop/components/ShopHeader";
import ProductsGrid from "../features/shop/components/ProductsGrid";
import Filters from "../features/shop/components/Filters";

const Shop = () => {
  return (
    <section className="min-h-screen bg-background pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="space-y-8">
          <ShopHeader />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            <Filters />
            <ProductsGrid />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
