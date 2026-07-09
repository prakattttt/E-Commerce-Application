import { Heart, Star } from "lucide-react";
import type { Product } from "../../types/product.types";

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-foreground/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* Badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            {product.badge}
          </span>
        )}
        {/* Wishlist Icon */}
        <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-muted-foreground transition hover:text-accent">
          <Heart size={16} />
        </button>
        Out of Stock
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <span className="rounded-full bg-foreground p-3 text-xs font-semibold text-background">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2 p-4">
        {/* Brand */}
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < Math.floor(product.rating ?? 0)
                  ? "text-accent fill-accent"
                  : "text-muted"
              }
            />
          ))}

          <span className="ml-1 text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">${product.price}</span>

            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Button UI only */}
          <button className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
