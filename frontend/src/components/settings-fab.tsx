"use client";

import { useState } from "react";
import { ACCENTS, type Accent, useTheme } from "@/components/theme";

export function SettingsFab() {
  const { accent, setAccent, theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="card flex w-48 flex-col gap-1 rounded-2xl border border-line bg-card p-3 shadow-xl">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Accent</span>
          {Object.entries(ACCENTS).map(([key, a]) => (
            <button
              key={key}
              onClick={() => setAccent(key as Accent)}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-brand-soft ${
                accent === key ? "bg-brand-soft text-brand-strong" : "text-foreground"
              }`}
            >
              <span
                className="size-3.5 rounded-full border border-line"
                style={{ background: theme === "dark" ? a.dark[0] : a.light[0] }}
              />
              {a.label}
            </button>
          ))}
          <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">Mode</span>
          <button
            onClick={toggle}
            className="rounded-lg px-2 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-brand-soft"
          >
            {theme === "dark" ? "☀ Light" : "☾ Dark"}
          </button>
        </div>
      )}
      <button
        aria-label="Settings"
        onClick={() => setOpen((v) => !v)}
        className="flex size-10 items-center justify-center rounded-full border border-line bg-card text-foreground shadow-lg transition-transform hover:scale-110"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={`size-5 transition-transform duration-300 ${open ? "rotate-90" : ""}`}
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>
    </div>
  );
}
