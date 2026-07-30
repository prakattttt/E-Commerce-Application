interface StockStatusProps {
  stock: number;
}

const StockStatus = ({ stock }: StockStatusProps) => {
  if (stock > 0) {
    return (
      <span className="rounded-full bg-success/10 px-3 py-2 text-sm font-medium text-success">
        In Stock ({stock} available)
      </span>
    );
  }

  return (
    <span className="rounded-full bg-error/10 px-3 py-2 text-sm font-medium text-error">
      Out of Stock
    </span>
  );
};

export default StockStatus;
