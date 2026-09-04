export function OrbSVG() {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-auto select-none"
        role="img"
        aria-label="Animated model constellation"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.38" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.7" />
            <stop offset="60%" stopColor="var(--brand)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="200" r="130" fill="url(#glow)" className="pulse-dot" />

        <g className="beam">
          <path d="M200 200 L200 40 A160 160 0 0 1 312 88 Z" fill="url(#beamGrad)" opacity="0.35" />
        </g>

        <circle cx="200" cy="200" r="60" fill="none" stroke="var(--brand)" strokeWidth="1" className="ring-pulse" />
        <circle cx="200" cy="200" r="60" fill="none" stroke="var(--brand)" strokeWidth="1" className="ring-pulse" style={{ animationDelay: "1.4s" }} />

        <g className="orbit-slow">
          <circle cx="200" cy="200" r="188" fill="none" stroke="var(--line)" strokeWidth="1" />
          <circle cx="200" cy="12" r="3.5" fill="var(--dotok)" className="pulse-dot" />
          <circle cx="388" cy="200" r="2.5" fill="var(--muted)" opacity="0.6" />
        </g>

        <g className="orbit-rev">
          <circle cx="200" cy="200" r="150" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" />
          <circle cx="200" cy="50" r="4.5" fill="var(--brand)" />
          <circle cx="50" cy="200" r="3" fill="var(--brand-strong)" className="pulse-dot" style={{ animationDelay: "0.8s" }} />
        </g>

        <g className="orbit">
          <circle cx="200" cy="200" r="105" fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="4 6" className="dash-flow" />
          <circle cx="305" cy="200" r="5" fill="var(--brand-strong)" />
          <circle cx="200" cy="95" r="3" fill="var(--brand)" opacity="0.7" />
        </g>

        <g className="orbit-fast">
          <circle cx="200" cy="200" r="74" fill="none" stroke="var(--line)" strokeWidth="1" opacity="0.5" />
          <circle cx="274" cy="200" r="3" fill="var(--dotok)" />
        </g>

        <circle cx="200" cy="200" r="27" fill="var(--card)" stroke="var(--brand)" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="14" fill="var(--brand)" className="pulse-dot" />

        <text x="200" y="148" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)">the-model-5</text>
        <text x="200" y="262" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)">gpt-5.6-sol</text>
        <text x="330" y="206" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)">glm-5.3</text>
        <text x="66" y="206" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)">r2</text>
      </svg>
    </div>
  );
}
