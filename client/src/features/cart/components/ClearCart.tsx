import { Trash2 } from "lucide-react";

const ClearCart = () => {
  return (
    <button
      //   onClick={clearCart}
      className="btn-primary w-full lg:w-fit"
    >
      <Trash2
        size={16}
        className="transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
      />
      <span>Clear Cart</span>
    </button>
  );
};

export default ClearCart;
