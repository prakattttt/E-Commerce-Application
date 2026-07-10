import { create } from "zustand";

import { getMe, logoutUser } from "../api/auth.api";

import type { User } from "../types/auth.types";

interface AuthState {
  user: User | null;

  loading: boolean;

  isAuthenticated: boolean;

  checkAuth: () => Promise<void>;

  setUser: (user: User | null) => void;

  logout: () => Promise<void>;
}

// local zustland state for auth info
export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  loading: true,

  isAuthenticated: false,

  checkAuth: async () => {
    try {
      const response = await getMe();

      set({
        user: response.user,
        isAuthenticated: true,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({
        loading: false,
      });
    }
  },

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  //custom logout
  logout: async () => {
    await logoutUser();

    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
