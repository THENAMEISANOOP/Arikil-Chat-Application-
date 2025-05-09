
import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("loverFind-theme") || "valentine",
  setTheme: (theme) => {
    localStorage.setItem("loverFind-theme", theme);
    set({ theme });
  },
}));
