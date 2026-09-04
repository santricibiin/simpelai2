"use client";

import { Reveal } from "./reveal";
import { useT } from "./language";

export function FAQ() {
  const tr = useT();
  const QA = [
    { q: tr.faq.q1, a: tr.faq.a1 },
    { q: tr.faq.q2, a: tr.faq.a2 },
    { q: tr.faq.q3, a: tr.faq.a3 },
    { q: tr.faq.q4, a: tr.faq.a4 },
  ];
  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 lg:px-8 py-20 border-t border-line">
      <div className="grid gap-12 lg:grid-cols-[0.6fr_1fr] lg:items-start">
        <Reveal>
          <div className="lg:sticky lg:top-24">
            <p className="label text-brand">{tr.faq.label}</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
              {tr.faq.title}
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              {tr.faq.body}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="divide-y divide-line border-y border-line">
            {QA.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-semibold text-[15px]">
                  {item.q}
                  <span className="shrink-0 font-mono text-brand transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-6 pr-8 text-[13.5px] leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
