import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

import type { IProduct } from "../../types/products.types";
import ProductBadge from "./ProductBadge";
import RatingStars from "./RatingStars";
import Price from "./Price";
import StockStatus from "./StockStatus";
import QuantitySelector from "./QuantitySelector";
import { toast } from "sonner";
import useCart from "../../../cart/hooks/useCart";
import useAuth from "../../../auth/hooks/useAuth";
import { getErrorMessage } from "../../../../utils/getErrorMessage";

interface ProductInfoProps {
  product: IProduct;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const addCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      await addItem(product._id, quantity);

      toast.success(`${product.name} added to cart`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="space-y-7">
      <ProductBadge badge={product.badge} featured={product.featured} />
      {/* Name */}
      <h1 className="font-display text-4xl font-bold leading-tight">
        {product.name}
      </h1>
      {/* Brand + Category */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>{product.brand}</span>
        <span>•</span>
        <span>{product.category.name}</span>
      </div>
      <RatingStars rating={product.rating} reviews={product.reviews} />
      <Price
        price={product.price}
        originalPrice={product.originalPrice ?? product.price}
      />
      <StockStatus stock={product.stock} />
      {/* Description */}
      <div>
        <h3 className="mt-7 mb-2 font-semibold">Description</h3>
        <p className="leading-7 text-muted-foreground">{product.description}</p>
      </div>
      {isAuthenticated && (
        <>
          <QuantitySelector
            quantity={quantity}
            onChange={setQuantity}
            max={product.stock > 0 ? product.stock : 1}
          />
          {/* Buttons */}

          <div className="flex flex-wrap gap-3">
            <button
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-3 lg:px-6 py-4 font-semibold text-primary-foreground transition hover:opacity-90"
              onClick={addCart}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <button className="rounded-xl border border-border p-4 transition hover:bg-secondary">
              <Heart size={20} />
            </button>

            <button className="rounded-xl border border-border p-4 transition hover:bg-secondary">
              <Share2 size={20} />
            </button>
          </div>
        </>
      )}
      Benefits
      <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <Truck className="text-primary" size={20} />
          <div>
            <p className="font-medium">Free Delivery</p>
            <p className="text-sm text-muted-foreground">
              On orders above Rs. 5,000
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <RotateCcw className="text-primary" size={20} />
          <div>
            <p className="font-medium">7 Day Returns</p>
            <p className="text-sm text-muted-foreground">Easy return policy</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck className="text-primary" size={20} />
          <div>
            <p className="font-medium">100% Genuine Product</p>
            <p className="text-sm text-muted-foreground">
              Direct from verified brands
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
