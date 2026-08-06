import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { clearCart as clearCartAPI } from "../api/cart.api";
import useCart from "../hooks/useCart";

const ClearCart = () => {
  const { clearCart } = useCart();
  const clearCartHandler = async () => {
    try {
      await clearCartAPI();
      clearCart();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <button onClick={clearCartHandler} className="btn-primary w-full lg:w-fit">
      <Trash2
        size={16}
        className="transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
      />
      <span>Clear Cart</span>
    </button>
  );
};

export default ClearCart;
