import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getCart } from "../../../features/cart/api/cart.api";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import type { ICartItem } from "../../../features/cart/types/cart.types";
import { toast } from "sonner";

interface Props {
  isTransparent: boolean;
}

const ShoppingCart = ({ isTransparent }: Props) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const run = async () => {
      try {
        const response = await getCart();

        const totalQuantity = response.items.reduce(
          (total: number, item: ICartItem) => total + item.quantity,
          0,
        );

        setCartQuantity(totalQuantity);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    };

    run();
  }, []);
  return (
    <button
      className={`relative rounded-full p-1.5 transition-colors ${
        isTransparent
          ? "backdrop-blur-md hover:bg-white/20"
          : "hover:bg-secondary"
      }`}
    >
      <ShoppingCartIcon
        className={`transition-colors ${isTransparent ? "text-card" : "text-foreground"}`}
      />
      {cartQuantity ? (
        <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
          {cartQuantity}
        </span>
      ): null}
    </button>
  );
};

export default ShoppingCart;
