import type { IProduct } from "../../features/shop/types/products.types";

function DiscountCard({ product }: { product: IProduct }) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : null;

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/50 border-border bg-card/15 transition-all duration-300 hover:bg-card/20">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageCover.url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-foreground/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* Badge */}
        {discount && (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-sm font-semibold text-primary-foreground tracking-[0.15em]">
            {`-${discount}%`}
          </span>
        )}
        {/* Out of Stock */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <span className="rounded-full bg-foreground p-3 text-xs font-semibold text-background">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2 p-4">
        {/* Name */}
        <h3 className="line-clamp-1 text-xs font-medium text-muted">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-card">${product.price}</span>

            {product.originalPrice && (
              <span className="text-xs text-muted line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscountCard;
