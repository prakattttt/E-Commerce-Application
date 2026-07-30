interface QuantitySelectorProps {
  quantity: number;
  onChange: (value: number) => void;
  max: number;
}

const QuantitySelector = ({
  quantity,
  onChange,
  max,
}: QuantitySelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Quantity</label>

      <div className="flex w-fit items-center overflow-hidden rounded-xl border border-border">
        <button
          type="button"
          disabled={quantity <= 1}
          onClick={() => onChange(quantity - 1)}
          className="px-4 py-3 transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>

        <span className="border-x border-border px-6 py-3">{quantity}</span>

        <button
          type="button"
          disabled={quantity >= max}
          onClick={() => onChange(quantity + 1)}
          className="px-4 py-3 transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
