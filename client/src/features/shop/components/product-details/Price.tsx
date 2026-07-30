interface PriceProps {
  price: number;
  originalPrice: number;
}

const Price = ({ price, originalPrice }: PriceProps) => {
  const hasDiscount = originalPrice > price;

  const discount = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="flex flex-wrap items-end gap-4">
      <h2 className="font-display text-4xl font-bold text-primary">
        Rs. {price.toLocaleString()}
      </h2>

      {hasDiscount && (
        <>
          <span className="text-xl text-muted-foreground line-through">
            Rs. {originalPrice.toLocaleString()}
          </span>

          <span className="rounded-full bg-success/10 px-3 py-1 text-sm font-semibold text-success">
            {discount}% OFF
          </span>
        </>
      )}
    </div>
  );
};

export default Price;
