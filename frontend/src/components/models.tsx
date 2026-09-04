import { Reveal } from "./reveal";

const ROWS = [
  { id: "the-model-5", by: "Embed", tags: ["flagship", "reasoning"], ctx: "1M", lat: "34ms", ok: true },
  { id: "gpt-5.6-sol", by: "Brightline", tags: ["multimodal", "tools"], ctx: "512k", lat: "41ms", ok: true },
  { id: "glm-5.3", by: "Zhipu", tags: ["coding", "agentic"], ctx: "256k", lat: "39ms", ok: true },
  { id: "gemini-3-ultra", by: "Google", tags: ["long-ctx", "image"], ctx: "2M", lat: "47ms", ok: true },
  { id: "deepseek-r2", by: "DeepSeek", tags: ["reasoning", "cheap"], ctx: "128k", lat: "28ms", ok: true },
  { id: "llama-6-405b", by: "Meta", tags: ["open"], ctx: "512k", lat: "52ms", ok: false },
  { id: "qwen-5-max", by: "Alibaba", tags: ["multilingual"], ctx: "512k", lat: "45ms", ok: true },
  { id: "mistral-large-3", by: "Mistral", tags: ["efficient", "eu"], ctx: "256k", lat: "36ms", ok: true },
];

export function ModelLedger() {
  return (
    <section id="models" className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label text-brand">01 — catalog</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Pick a model.
          </h2>
        </div>
        <p className="max-w-sm text-[13.5px] leading-relaxed text-muted">
          Stable IDs across every provider. Swap models without touching a line of code —
          the response shape never changes.
        </p>
      </div>

      <Reveal>
        <div className="mt-10 rounded-lg border border-line bg-card overflow-hidden">
          <div className="grid grid-cols-[2.6rem_1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-line font-mono text-[10.5px] uppercase tracking-wider text-muted md:grid-cols-[2.6rem_1.4fr_1.4fr_4.2rem_3.8rem]">
            <span>#</span>
            <span>Model</span>
            <span className="hidden md:block">Provider</span>
            <span className="text-right">ctx</span>
            <span className="text-right">status</span>
          </div>
          {ROWS.map((r, i) => (
            <div
              key={r.id}
              className="card-lift grid grid-cols-[2.6rem_1fr_auto_auto_auto] items-center gap-4 px-5 py-3.5 border-b border-line last:border-0 hover:bg-card2 group md:grid-cols-[2.6rem_1.4fr_1.4fr_4.2rem_3.8rem]"
            >
              <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <p className="font-mono text-[13.5px] truncate group-hover:text-brand transition-colors">{r.id}</p>
                <p className="text-[12px] text-muted md:hidden">{r.by}</p>
              </div>
              <div className="hidden md:flex flex-wrap gap-1.5">
                <span className="text-[12.5px] text-muted">{r.by}</span>
                <span className="font-mono text-[10px] text-muted/70 border border-line rounded px-1.5 py-0.5">{r.tags[0]}</span>
              </div>
              <span className="text-right font-mono text-[12.5px] text-muted">{r.ctx}</span>
              <span className="text-right">
                {r.ok ? (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-dotok">
                    <span className="h-1.5 w-1.5 rounded-full bg-dotok" />
                    <span className="hidden sm:inline">{r.lat}</span>
                    <span className="sm:hidden">up</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-muted/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    warm
                  </span>
                )}
              </span>
            </div>
          ))}
          <div className="px-5 py-3 flex items-center justify-between font-mono text-[11px] text-muted">
            <span>2,400+ models total — some behind the paywall</span>
            <span className="hidden sm:block">full ledger at /v1/models</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
