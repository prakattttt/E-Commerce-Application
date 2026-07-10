import ProductCard from "../../../components/common/ProductCard";
import {
  trendingProducts,
  flashSaleProducts,
  newArrivalProducts,
} from "../../../components/dummy/dummy";

const products = [
  ...trendingProducts,
  ...flashSaleProducts,
  ...newArrivalProducts,
];

const ProductsGrid = () => {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={`${product.id}-${product.name}`} product={product} />
      ))}
    </section>
  );
};

export default ProductsGrid;
