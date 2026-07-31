import { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";
import Toaster from "./components/ui/Toaster";
import Loader from "./components/ui/Loader";

import useAuth from "./features/auth/hooks/useAuth";
import useDelayedLoading from "./hooks/useDelayedLoading";

function App() {
  const { checkAuth, loading } = useAuth();
  const delayedLoading = useDelayedLoading(loading);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (delayedLoading) {
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
