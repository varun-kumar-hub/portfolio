"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type ThemeMode = "dark" | "light" | "system";

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: ThemeMode, originX?: number, originY?: number) => void;
  toggleTheme: (originX?: number, originY?: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  resolvedTheme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  // Helper to compute system preference
  const getSystemTheme = (): "dark" | "light" => {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  // Synchronize document classes and state
  const applyTheme = useCallback((newTheme: ThemeMode) => {
    if (typeof document === "undefined") return;

    const targetResolved = newTheme === "system" ? getSystemTheme() : newTheme;
    const root = document.documentElement;

    root.classList.remove("dark", "light");
    root.classList.add(targetResolved);
    root.style.colorScheme = targetResolved;

    setThemeState(newTheme);
    setResolvedTheme(targetResolved);

    try {
      localStorage.setItem("portfolio-theme", newTheme);
    } catch {
      // Storage access might be restricted
    }
  }, []);

  // Initialize theme from storage/system on mount
  useEffect(() => {
    let initialTheme: ThemeMode = "dark";
    try {
      const saved = localStorage.getItem("portfolio-theme") as ThemeMode | null;
      if (saved && ["dark", "light", "system"].includes(saved)) {
        initialTheme = saved;
      }
    } catch {
      initialTheme = "dark";
    }

    applyTheme(initialTheme);
    setMounted(true);

    // Listen to system theme changes if system mode is active
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      try {
        if (localStorage.getItem("portfolio-theme") === "system") {
          applyTheme("system");
        }
      } catch {}
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [applyTheme]);

  const transitionTheme = useCallback((nextTheme: ThemeMode, originX?: number, originY?: number) => {
    const nextResolved = nextTheme === "system" ? getSystemTheme() : nextTheme;
    if (nextTheme === theme && nextResolved === resolvedTheme) return;

      // If document.startViewTransition is supported, perform expanding circle reveal
      if (
        typeof document !== "undefined" &&
        "startViewTransition" in document &&
        typeof (document as unknown as { startViewTransition: (cb: () => void) => { ready: Promise<void> } }).startViewTransition === "function"
      ) {
        const x = originX ?? window.innerWidth / 2;
        const y = originY ?? window.innerHeight / 2;
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        const doc = document as unknown as {
          startViewTransition: (cb: () => void) => { ready: Promise<void> };
        };

        const transition = doc.startViewTransition(() => {
          applyTheme(nextTheme);
        });

        transition.ready.then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 550,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        });
      } else {
        // Fallback for browsers without View Transitions API
        applyTheme(nextTheme);
      }
    },
    [theme, resolvedTheme, applyTheme]
  );

  // Direct setTheme handler
  const setTheme = useCallback((newTheme: ThemeMode, originX?: number, originY?: number) => {
    transitionTheme(newTheme, originX, originY);
  }, [transitionTheme]);

  // Premium Radial Reveal Transition Handler
  const toggleTheme = useCallback(
    (originX?: number, originY?: number) => {
      const nextTheme: ThemeMode = resolvedTheme === "dark" ? "light" : "dark";
      transitionTheme(nextTheme, originX, originY);
    },
    [resolvedTheme, transitionTheme]
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
