import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import type { User } from "../types/auth.types";
import useCart from "../../cart/hooks/useCart";

const useAuth = () => {
  const navigate = useNavigate();
  const { clearCart, fetchCart } = useCart();

  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const setUser = useAuthStore((state) => state.setUser);
  const logoutStore = useAuthStore((state) => state.logout);

  // Wraping the login success action with navigation
  const login = (userData: User) => {
    setUser(userData);
    fetchCart();

    navigate("/", { replace: true });
  };

  // Handling logout navigation here too to avoid repetition
  const logout = async () => {
    await logoutStore();
    clearCart();
    navigate("/auth", { replace: true });
  };

  return {
    user,
    loading,
    isAuthenticated,
    checkAuth,
    setUser,
    login,
    logout,
  };
};

export default useAuth;
