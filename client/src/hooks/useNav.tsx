import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { create } from "zustand";

// The Zustand Store
interface NavState {
  isScrolled: boolean;
  isHomePage: boolean;
  setScrolled: (scrolled: boolean) => void;
  setHomePage: (isHome: boolean) => void;
}

const useNavStore = create<NavState>((set) => ({
  isScrolled: false,
  isHomePage: true,
  setScrolled: (scrolled) => set({ isScrolled: scrolled }),
  setHomePage: (isHome) => set({ isHomePage: isHome }),
}));

// Custom Hook
const useNav = () => {
  const location = useLocation();

  const isScrolled = useNavStore((state) => state.isScrolled);
  const isHomePage = useNavStore((state) => state.isHomePage);
  const setScrolled = useNavStore((state) => state.setScrolled);
  const setHomePage = useNavStore((state) => state.setHomePage);

  // Sync route changes
  useEffect(() => {
    setHomePage(location.pathname === "/");
  }, [location.pathname, setHomePage]);

  // Sync scroll behavior
  useEffect(() => {
    if (!isHomePage) {
      setScrolled(false);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, setScrolled]);

  return {
    // Helper to determine text/icon contrast quickly
    isTransparent: isHomePage && !isScrolled,
  };
};

export default useNav;
