import AppRoutes from "./routes/AppRoutes";
import Toaster from "./components/ui/Toaster";
import { useEffect } from "react";
import useAuth from "./features/auth/hooks/useAuth";

function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
