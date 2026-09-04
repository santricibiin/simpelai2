import { Reveal } from "./reveal";

const QA = [
  { q: "Is it actually [OI]-compatible?", a: "Yes. We speak the wire format, so the official SDKs, LangChain, LlamaIndex and anything else that speaks [OI] just work. You only change the base_url and the key." },
  { q: "Why not just call the providers directly?", a: "You can. But that means five dashboards, five invoices, five sets of rate limits and five failure modes. We turn all of that into one key and one balance." },
  { q: "What happens when a model is down?", a: "We route around it. If your target blips, we fail over to the next-best model so your request finishes instead of dying. You see the reroute in the response metadata." },
  { q: "Are my prompts stored?", a: "No. We pass requests through and don't log prompt content by default. This is a proxy, not a training pipeline." },
];

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 lg:px-8 py-20 border-t border-line">
      <div className="grid gap-12 lg:grid-cols-[0.6fr_1fr] lg:items-start">
        <Reveal>
          <div className="lg:sticky lg:top-24">
            <p className="label text-brand">04 — faq</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Fair questions.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              The stuff people usually ask before they trust us with their bill.
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
