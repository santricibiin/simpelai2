import { Reveal } from "./reveal";

const LINKS = [
  { t: "Models", h: "#models" },
  { t: "Usage", h: "#usage" },
  { t: "Pricing", h: "#pricing" },
  { t: "FAQ", h: "#faq" },
  { t: "Docs", h: "#" },
  { t: "Status", h: "#" },
  { t: "Privacy", h: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 flex flex-wrap items-center gap-x-4 gap-y-3 justify-between">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center w-6 h-6 rounded-md bg-brand text-white text-[10px] font-bold">E</span>
          <span className="font-display text-[13px] font-semibold">emberai</span>
          <span className="text-[11.5px] text-muted hidden sm:inline">— every model, one key</span>
        </div>

        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-[12.5px] text-muted">
          {LINKS.map((l) => (
            <a key={l.t} href={l.h} className="link-u hover:text-foreground">{l.t}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-[11.5px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-dotok animate-pulse" />
            <span className="hidden sm:inline">99.99%</span>
          </span>
          <span className="opacity-40">·</span>
          <span className="whitespace-nowrap">© 2026</span>
        </div>
      </div>
    </footer>
  );
}
