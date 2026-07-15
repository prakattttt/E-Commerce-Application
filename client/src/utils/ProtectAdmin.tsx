import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

const ProtectAdmin = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectAdmin;
