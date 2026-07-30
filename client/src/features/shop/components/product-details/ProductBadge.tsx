interface ProductBadgeProps {
  badge?: string;
  featured?: boolean;
}

const ProductBadge = ({ badge, featured }: ProductBadgeProps) => {
  if (!badge && !featured) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {badge && (
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          {badge}
        </span>
      )}

      {featured && (
        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Featured
        </span>
      )}
    </div>
  );
};

export default ProductBadge;
