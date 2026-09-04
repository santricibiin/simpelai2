"use client";

import { Reveal } from "./reveal";
import { useT } from "./language";

export function Pricing() {
  const tr = useT();
  const TIERS = [
    {
      name: "Hobby",
      price: tr.pricing.t1p,
      desc: tr.pricing.t1d,
      rows: tr.pricing.t1r,
      cta: tr.pricing.t1c,
    },
    {
      name: tr.pricing.t2n,
      price: tr.pricing.t2p,
      desc: tr.pricing.t2d,
      rows: tr.pricing.t2r,
      cta: tr.pricing.t2c,
      hot: true,
    },
    {
      name: tr.pricing.t3n,
      price: tr.pricing.t3p,
      desc: tr.pricing.t3d,
      rows: tr.pricing.t3r,
      cta: tr.pricing.t3c,
    },
  ];
  return (
    <section id="pricing" className="border-t border-line py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="label text-brand">{tr.pricing.label}</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            {tr.pricing.title}
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            {tr.pricing.body}
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 70}>
              <div
                className={`card-lift h-full rounded-lg border p-6 flex flex-col ${
                  tier.hot
                    ? "border-brand bg-card shadow-[0_20px_50px_-24px_rgba(184,71,14,0.4)]"
                    : "border-line bg-card"
                }`}
              >
                {tier.hot && (
                  <span className="self-start mb-4 rounded-full bg-brand px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                    {tr.pricing.hot}
                  </span>
                )}
                <p className="font-semibold text-[15px]">{tier.name}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold">{tier.price}</span>
                  <span className="text-[13px] text-muted">{tr.pricing.perMonth}</span>
                </div>
                <p className="mt-2 text-[13px] text-muted">{tier.desc}</p>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {tier.rows.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-[13.5px]">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-brand shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
                <a
                  href="#usage"
                  className={`mt-7 inline-flex h-10 items-center justify-center rounded-md text-[13.5px] font-semibold transition-colors ${
                    tier.hot
                      ? "bg-brand text-white hover:bg-brand-strong"
                      : "border border-line hover:border-brand/60"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
