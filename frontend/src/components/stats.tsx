import { Reveal } from "./reveal";

const TIERS = [
  {
    name: "Hobby",
    price: "$5",
    desc: "For tinkering and side projects.",
    rows: ["All open models", "128k ctx cap", "20 req/min", "Community support"],
    cta: "Start free",
  },
  {
    name: "Built",
    price: "$35",
    desc: "For products that ship weekly.",
    rows: ["Everything in Hobby", "Frontier + closed models", "Uncapped ctx", "400 req/min", "Failover on"],
    cta: "Get Built",
    hot: true,
  },
  {
    name: "Scale",
    price: "Custom",
    desc: "For serious volume.",
    rows: ["Everything in Built", "Dedicated capacity", "Slack / phone support", "SSO & audit logs"],
    cta: "Talk to us",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-line py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="label text-brand">03 — pricing</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Flat prepaid. No surprises.
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            One wallet for the whole catalog. We show the exact cost before every request
            and refund the failed ones. Top up, spend, done.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <div
                className={`card-lift h-full rounded-lg border p-6 flex flex-col ${
                  t.hot
                    ? "border-brand bg-card shadow-[0_20px_50px_-24px_rgba(184,71,14,0.4)]"
                    : "border-line bg-card"
                }`}
              >
                {t.hot && (
                  <span className="self-start mb-4 rounded-full bg-brand px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                    Most picked
                  </span>
                )}
                <p className="font-semibold text-[15px]">{t.name}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold">{t.price}</span>
                  <span className="text-[13px] text-muted">/ mo</span>
                </div>
                <p className="mt-2 text-[13px] text-muted">{t.desc}</p>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {t.rows.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-[13.5px]">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-brand shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
                <a
                  href="#usage"
                  className={`mt-7 inline-flex h-10 items-center justify-center rounded-md text-[13.5px] font-semibold transition-colors ${
                    t.hot
                      ? "bg-brand text-white hover:bg-brand-strong"
                      : "border border-line hover:border-brand/60"
                  }`}
                >
                  {t.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
