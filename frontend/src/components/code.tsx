import { Reveal } from "./reveal";

const FEATURES = [
  { t: "Drop-in [OI]", d: "Point any SDK that speaks [OI] at our base URL. Rewrites as nothing." },
  { t: "One balance", d: "Every model billed from a single prepaid wallet. One invoice, no per-vendor keys." },
  { t: "Automatic failover", d: "If a provider blips, we reroute to the next-best model mid-request." },
  { t: "Streaming native", d: "Server-sent events, tokens as they land, tool calls pass through." },
];

export function Usage() {
  return (
    <section id="usage" className="relative border-t border-line py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div>
              <p className="label text-brand">02 — usage</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
                One line, then
                <br />
                you're shipping.
              </h2>
              <p className="mt-5 max-w-md text-[14px] leading-relaxed text-muted">
                Ten seconds of setup buys you the whole catalog. No model-specific SDKs,
                no provider hunting, no trial dashboards to babysit.
              </p>

              <div className="mt-8 space-y-5">
                {FEATURES.map((f, i) => (
                  <div key={f.t} className="flex gap-4">
                    <span className="font-mono text-[11px] text-brand mt-0.5 w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-semibold text-[15px]">{f.t}</p>
                      <p className="text-[13.5px] text-muted mt-0.5">{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-lg border border-line bg-card overflow-hidden shadow-[0_16px_40px_-20px_rgba(184,71,14,0.25)]">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[11px] text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e0543e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d9a441]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#5e9e5e]" />
                </span>
                <span>chat — python</span>
              </div>
              <pre className="p-5 text-[12.5px] leading-relaxed font-mono overflow-x-auto">
                <code>{`from openai import OpenAI

client = OpenAI(
    base_url="https://api.emberai.dev",
    api_key=os.environ["EMBER_KEY"],
)

chat = client.chat.completions.create(
    model="the-model-5",
    messages=[{ "role": "user", "content": "Hello" }],
)

print(chat.choices[0].message.content)`}</code>
              </pre>
              <div className="border-t border-line px-4 py-3">
                <p className="font-mono text-[11px] text-muted">
                  <span className="text-muted/60">$</span> 0.0042 charged · 64 tokens · 1.1s
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
