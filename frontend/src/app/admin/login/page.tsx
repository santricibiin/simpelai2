"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ponytail: rewrites proxy /api/* to backend — same-origin, no CORS
export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.status === 429) {
        setError("Too many attempts. Please wait a minute.");
        return;
      }
      if (!res.ok) {
        setError("Invalid username or password.");
        return;
      }
      const data = await res.json();
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", data.username);
      router.push("/admin");
    } catch {
      setError("Cannot reach server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-brand/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className={`relative w-full max-w-md ${error ? "animate-shake" : "animate-rise"}`}>
        <div className="rounded-3xl border border-line bg-card/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          {/* animated shield icon */}
          <div className="mx-auto mb-6 grid size-20 place-items-center">
            <svg viewBox="0 0 96 96" fill="none" className="size-20">
              <circle cx="48" cy="48" r="40" stroke="var(--brand)" strokeOpacity="0.25" strokeWidth="2" className="ring-pulse" />
              <circle cx="48" cy="48" r="32" stroke="var(--brand)" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="6 10" className="orbit" style={{ transformOrigin: "48px 48px" }} />
              {/* shield */}
              <path
                d="M48 24l18 7v14c0 12-7.5 20.5-18 25-10.5-4.5-18-13-18-25V31l18-7z"
                stroke="var(--brand)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                fill="var(--brand-soft)"
              />
              {/* keyhole group — subtle bobbing */}
              <g className="animate-bob">
                <circle cx="48" cy="44" r="5" stroke="var(--brand-strong)" strokeWidth="2.5" fill="var(--card-2)" />
                <path d="M48 49v10" stroke="var(--brand-strong)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M48 53h4" stroke="var(--brand-strong)" strokeWidth="2.5" strokeLinecap="round" />
              </g>
              {/* scanning line */}
              <line x1="30" y1="30" x2="66" y2="66" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" className="animate-scanline" opacity="0.6" />
            </svg>
          </div>

          <h1 className="text-center font-display text-2xl font-bold tracking-tight">
            Admin Console
          </h1>
          <p className="mt-2 text-center text-sm text-muted">
            Sign in to manage <span className="font-mono text-brand">emberai</span>
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted">
                Username
              </span>
              <div className="group relative">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-muted transition-colors group-focus-within:text-brand">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  maxLength={64}
                  autoComplete="username"
                  placeholder="admin"
                  className="h-12 w-full rounded-xl border border-line bg-card2 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-muted/60 focus:border-brand focus:ring-4 focus:ring-brand/15"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted">
                Password
              </span>
              <div className="group relative">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-muted transition-colors group-focus-within:text-brand">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
                </svg>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  maxLength={128}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="h-12 w-full rounded-xl border border-line bg-card2 pl-11 pr-12 text-sm outline-none transition-all placeholder:text-muted/60 focus:border-brand focus:ring-4 focus:ring-brand/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted transition-colors hover:bg-brand-soft hover:text-brand-strong"
                >
                  {showPw ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" />
                      <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-[13px] text-red-500 dark:text-red-400" role="alert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 shrink-0 animate-pulse">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="0.5" fill="currentColor" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !username || !password}
              className="group relative h-12 w-full overflow-hidden rounded-xl bg-brand font-display text-sm font-semibold text-white transition-all hover:bg-brand-strong focus:outline-none focus:ring-4 focus:ring-brand/25 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" className="size-4.5 animate-spin" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                    </svg>
                    Authenticating…
                  </>
                ) : (
                  <>
                    Sign in
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform duration-300 group-hover:translate-x-1">
                      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                      <polyline points="12 5 19 12 12 19" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </form>

          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-muted">
            protected · rate-limited · argon2
          </p>
        </div>

        <Link
          href="/"
          className="mt-5 block text-center text-[13px] text-muted transition-colors hover:text-brand"
        >
          ← back to emberai
        </Link>
      </div>
    </main>
  );
}
