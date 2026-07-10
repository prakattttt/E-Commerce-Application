import { create } from "zustand";

interface NavState {
  isScrolled: boolean;
  isHomePage: boolean;
  setScrolled: (scrolled: boolean) => void;
  setHomePage: (isHome: boolean) => void;
}

// local zustland state for scroll behaviour
export const useNavStore = create<NavState>((set) => ({
  isScrolled: false,
  isHomePage: true,

  setScrolled: (scrolled) => set({ isScrolled: scrolled }),
  setHomePage: (isHome) => set({ isHomePage: isHome }),
}));
