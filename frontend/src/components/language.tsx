"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Locale } from "@/i18n";

const LanguageContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
}>({
  locale: "en",
  setLocale: () => {},
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    const detected: Locale = stored === "id" || stored === "en" ? stored : navigator.language.startsWith("id") ? "id" : "en";
    setLocaleState(detected);
    document.documentElement.lang = detected;
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    document.documentElement.lang = l;
    localStorage.setItem("lang", l);
  };

  const toggle = () => setLocale(locale === "en" ? "id" : "en");

  return <LanguageContext.Provider value={{ locale, setLocale, toggle }}>{children}</LanguageContext.Provider>;
}

export const useI18n = () => useContext(LanguageContext);
export const useT = () => {
  const { locale } = useI18n();
  return translations[locale];
};
