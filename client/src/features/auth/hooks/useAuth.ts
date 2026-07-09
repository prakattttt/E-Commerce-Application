import { useAuthStore } from "../store/auth.store";

const useAuth = () => {
  const user = useAuthStore((state) => state.user);

  const loading = useAuthStore((state) => state.loading);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const checkAuth = useAuthStore((state) => state.checkAuth);

  const setUser = useAuthStore((state) => state.setUser);

  const logout = useAuthStore((state) => state.logout);

  return {
    user,
    loading,
    isAuthenticated,
    checkAuth,
    setUser,
    logout,
  };
};

export default useAuth;
