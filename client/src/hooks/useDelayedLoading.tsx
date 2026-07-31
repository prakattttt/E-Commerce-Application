import { useEffect, useState } from "react";

const useDelayedLoading = (loading: boolean, delay = 1000) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (loading) {
      timer = setTimeout(() => {
        setShowLoader(true);
      }, delay);
    } else {
      timer = setTimeout(() => {
        setShowLoader(false);
      }, 0);
    }

    return () => clearTimeout(timer);
  }, [loading, delay]);

  return showLoader;
};

export default useDelayedLoading;
