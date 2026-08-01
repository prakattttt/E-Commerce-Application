import { Heart } from "lucide-react";

import ProductCard from "../../../components/common/ProductCard";
import type { IProduct } from "../../shop/types/products.types";

interface WishlistTabProps {
  products: IProduct[];
}

const WishlistTab = ({ products }: WishlistTabProps) => {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-card py-20 text-center">
        <Heart size={48} className="mx-auto mb-4 text-muted-foreground" />

        <h3 className="font-display text-2xl font-bold">
          Your Wishlist is Empty
        </h3>

        <p className="mt-2 text-muted-foreground">
          Save your favourite products and they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default WishlistTab;
