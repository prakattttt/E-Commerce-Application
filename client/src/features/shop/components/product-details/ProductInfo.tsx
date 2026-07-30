import {
  Heart,
  ShoppingCart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
} from "lucide-react";

import type { IProduct } from "../../types/products.types";

interface ProductInfoProps {
  product: IProduct;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  return (
    <div className="space-y-7">
      {/* Badge */}
      {(product.badge || product.featured) && (
        <div className="flex flex-wrap gap-2">
          {product.badge && (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              {product.badge}
            </span>
          )}

          {product.featured && (
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Featured
            </span>
          )}
        </div>
      )}

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

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Star size={18} className="fill-gold text-gold" />

          <span className="font-semibold">{product.rating.toFixed(1)}</span>
        </div>

        <span className="text-muted-foreground">
          ({product.reviews} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-end gap-4">
        <h2 className="font-display text-4xl font-bold text-primary">
          Rs. {product.price.toLocaleString()}
        </h2>

        {discount > 0 && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              Rs. {product.originalPrice?.toLocaleString()}
            </span>

            <span className="rounded-full bg-success/10 px-3 py-1 text-sm font-semibold text-success">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Stock */}
      <div>
        {product.stock > 0 ? (
          <span className="rounded-full bg-success/10 px-3 py-2 text-sm font-medium text-success">
            In Stock ({product.stock} available)
          </span>
        ) : (
          <span className="rounded-full bg-error/10 px-3 py-2 text-sm font-medium text-error">
            Out of Stock
          </span>
        )}
      </div>

      {/* Description */}
      <div>
        <h3 className="mb-2 font-semibold">Description</h3>

        <p className="leading-7 text-muted-foreground">{product.description}</p>
      </div>

      {/* Quantity */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Quantity</label>

        <div className="flex w-fit items-center overflow-hidden rounded-xl border border-border">
          <button className="px-4 py-3 hover:bg-secondary">−</button>

          <span className="border-x border-border px-6 py-3">1</span>

          <button className="px-4 py-3 hover:bg-secondary">+</button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition hover:opacity-90">
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

      {/* Benefits */}
      <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <Truck className="text-primary" size={20} />

          <div>
            <p className="font-medium">Free Delivery</p>

            <p className="text-sm text-muted-foreground">
              On orders above Rs. 2,000
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
