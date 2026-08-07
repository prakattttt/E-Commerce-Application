import { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";
import Toaster from "./components/ui/Toaster";
import Loader from "./components/ui/Loader";

import useAuth from "./features/auth/hooks/useAuth";

function App() {
  const { checkAuth, loading } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <Loader fullScreen text="Checking your session..." />;
  }

  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
