import { ShoppingCartIcon } from "lucide-react";
import { useEffect } from "react";
import useCart from "../../../features/cart/hooks/useCart";
import { Link } from "react-router-dom";
import useAuth from "../../../features/auth/hooks/useAuth";

interface Props {
  isTransparent: boolean;
}

const ShoppingCart = ({ isTransparent }: Props) => {
  const { quantity, fetchCart } = useCart();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if(!isAuthenticated) return;

    fetchCart();
  }, [fetchCart, isAuthenticated]);

  return (
    <Link
      to={"/cart"}
      className={`relative rounded-full p-1.5 transition-colors ${
        isTransparent
          ? "backdrop-blur-md hover:bg-white/20"
          : "hover:bg-secondary"
      }`}
    >
      <ShoppingCartIcon
        className={`transition-colors ${isTransparent ? "text-card" : "text-foreground"}`}
      />
      {quantity ? (
        <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
          {quantity}
        </span>
      ) : null}
    </Link>
  );
};

export default ShoppingCart;
