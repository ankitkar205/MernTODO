import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "todoMern_theme";

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved).dark;
      }
      return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  const [fontScale, setFontScale] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).fontScale ?? 1 : 1;
    } catch {
      return 1;
    }
  });

  useEffect(() => {
    document.body.classList.toggle("dark", dark);

    const BASE_FONT = 16;
    document.documentElement.style.fontSize = `${
      BASE_FONT * fontScale
    }px`;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ dark, fontScale })
    );
  }, [dark, fontScale]);

  return (
    <ThemeContext.Provider
      value={{
        dark,
        setDark,
        fontScale,
        setFontScale,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/* =========================
   SAFE HOOK
========================= */

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used within a ThemeProvider"
    );
  }

  return context;
}