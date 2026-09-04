"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./theme";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl border-b border-line transition-all duration-300 ${
        scrolled
          ? "bg-background/90 h-12"
          : "bg-background/60 h-16"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8 h-full flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display text-[15px] font-semibold tracking-tight">
          <span className={`grid place-items-center rounded-md bg-brand text-white text-xs font-bold transition-all duration-300 ${scrolled ? "w-6 h-6" : "w-7 h-7"}`}>
            E
          </span>
          emberai
          <span className="font-mono text-[10px] text-muted mt-0.5">/v1</span>
        </a>

        <div className="hidden md:flex items-center gap-7 text-[13px] text-muted">
          <a href="#models" className="link-u hover:text-foreground">Models</a>
          <a href="#usage" className="link-u hover:text-foreground">Usage</a>
          <a href="#pricing" className="link-u hover:text-foreground">Pricing</a>
          <a href="#faq" className="link-u hover:text-foreground">FAQ</a>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="w-8 h-8 grid place-items-center rounded-md border border-line bg-card hover:border-brand/60 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href="#usage"
            className={`hidden sm:inline-flex items-center gap-1.5 rounded-md bg-brand text-white text-[13px] font-semibold hover:bg-brand-strong transition-all ${scrolled ? "px-3 h-7" : "px-3.5 h-8"}`}
          >
            Get key
          </a>
        </div>
      </nav>
    </header>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M8.34 15.66l-1.41 1.41m11.14 0l-1.41-1.41M8.34 8.34l-1.41-1.41" strokeLinecap="round" />
    </svg>
  );
}
