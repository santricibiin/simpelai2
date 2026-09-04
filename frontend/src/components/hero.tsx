"use client";

import { useT } from "./language";
import { OrbSVG } from "./orb";

export function Hero() {
  const t = useT();
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-8 pt-20 pb-20 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="label text-brand">{t.hero.label}</p>
          <h1 className="mt-5 font-display text-[clamp(2.3rem,6vw,4.4rem)] font-bold leading-[1.04] tracking-tight">
            {t.hero.title1}
            <br />
            {t.hero.title2}
            <br />
            <span className="text-brand">{t.hero.title3}</span>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">{t.hero.body}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#usage"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-brand px-6 text-[14px] font-semibold text-white hover:bg-brand-strong transition-colors"
            >
              {t.hero.cta1}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-px">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#models"
              className="inline-flex h-11 items-center rounded-md border border-line bg-card px-6 text-[14px] font-semibold hover:border-brand/60 transition-colors"
            >
              {t.hero.cta2}
            </a>
          </div>

          <p className="mt-8 font-mono text-[12px] text-muted">
            {t.hero.meta} <span className="text-dotok">● {t.hero.up}</span>
          </p>
        </div>

        <div className="flex items-center justify-center py-6">
          <OrbSVG />
        </div>
      </div>
    </section>
  );
}
