"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const ACCENTS = {
  ember: {
    label: "Ember",
    light: ["#b8470e", "#8f3308", "#f3e0d2"],
    dark: ["#f9822b", "#ffa14d", "#2c1c10"],
  },
  azure: {
    label: "Azure",
    light: ["#0e56b8", "#083f8f", "#d2e2f3"],
    dark: ["#2b8ef9", "#4da1ff", "#10202c"],
  },
  jade: {
    label: "Jade",
    light: ["#0e8f5a", "#086f44", "#d2f3e4"],
    dark: ["#2bf9a1", "#4dffae", "#0d2c1d"],
  },
  violet: {
    label: "Violet",
    light: ["#6d28d9", "#5b21b6", "#e6dcf7"],
    dark: ["#a78bfa", "#c4b0ff", "#1d122c"],
  },
  rose: {
    label: "Rose",
    light: ["#be185d", "#9d174d", "#f9d9e6"],
    dark: ["#f9529b", "#ff74ae", "#2c0d1d"],
  },
} as const;

export type Accent = keyof typeof ACCENTS;

const applyAccent = (accent: Accent, dark: boolean) => {
  const [brand, strong, soft] = dark ? ACCENTS[accent].dark : ACCENTS[accent].light;
  const root = document.documentElement;
  root.style.setProperty("--brand", brand);
  root.style.setProperty("--brand-strong", strong);
  root.style.setProperty("--brand-soft", soft);
};

const ThemeContext = createContext<{
  theme: "light" | "dark";
  toggle: () => void;
  accent: Accent;
  setAccent: (a: Accent) => void;
}>({
  theme: "light",
  toggle: () => {},
  accent: "ember",
  setAccent: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [accent, setAccentState] = useState<Accent>("ember");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = (stored ?? (prefers ? "dark" : "light")) as "light" | "dark";
    document.documentElement.classList.toggle("dark", initial === "dark");
    setTheme(initial);

    const storedAccent = (localStorage.getItem("accent") ?? "ember") as Accent;
    if (ACCENTS[storedAccent]) {
      setAccentState(storedAccent);
      applyAccent(storedAccent, initial === "dark");
    }
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
      applyAccent(accent, next === "dark");
      return next;
    });
  };

  const setAccent = (a: Accent) => {
    setAccentState(a);
    localStorage.setItem("accent", a);
    applyAccent(a, theme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
