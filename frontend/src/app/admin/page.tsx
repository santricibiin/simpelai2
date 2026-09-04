"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminLayout } from "@/hooks/use-admin-layout";

const API = "/api/admin/api";

type Stats = { admins: number; login_attempts: number; failed_logins: number };
type LoginLog = { id: number; username: string; ip: string; success: boolean; created_at: string };

const NAV = [
  { key: "dashboard", label: "Dashboard", href: "/admin" },
  { key: "logins", label: "Login Logs", href: "#logins" },
  { key: "site", label: "View Site", href: "/" },
] as const;

function IconGrid({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [logs, setLogs] = useState<LoginLog[]>([]);
  const layout = useAdminLayout();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        router.replace("/admin/login");
        return;
      }
      const h = { Authorization: `Bearer ${token}` };
      const [meRes, statsRes, logRes] = await Promise.all([
        fetch(`${API}/me`, { headers: h }),
        fetch(`${API}/stats`, { headers: h }),
        fetch(`${API}/logins`, { headers: h }),
      ]);
      if (cancelled) return;
      if (meRes.status === 401) {
        localStorage.removeItem("admin_token");
        router.replace("/admin/login");
        return;
      }
      setUser((await meRes.json()).username);
      if (statsRes.ok) setStats(await statsRes.json());
      if (logRes.ok) setLogs(await logRes.json());
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/admin/login");
  };

  if (!user) {
    return (
      <main className="grid min-h-screen place-items-center bg-background">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.5" className="size-8 animate-spin">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
        </svg>
      </main>
    );
  }

  const navItems = (active: string, pill = false) =>
    NAV.map((n) => (
      <a
        key={n.key}
        href={n.href}
        className={`flex items-center gap-2.5 ${pill ? "rounded-full px-3.5 py-1.5" : "rounded-lg px-3 py-2"} text-[13px] transition-colors ${
          active === n.key
            ? "bg-brand-soft font-semibold text-brand-strong"
            : "text-muted hover:bg-brand-soft/60 hover:text-foreground"
        }`}
      >
        {n.key === "dashboard" && <IconGrid className="size-4" />}
        {n.key === "logins" && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="13" y2="17" />
          </svg>
        )}
        {n.key === "site" && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        )}
        {n.label}
      </a>
    ));

  const logo = (
    <div className="flex items-center gap-2.5">
      <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-strong text-[13px] font-bold text-white shadow-lg shadow-brand/25 transition-transform hover:scale-105">E</span>
      <div className="leading-tight">
        <div className="font-display text-[13px] font-semibold tracking-tight">emberai</div>
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">admin console</div>
      </div>
    </div>
  );

  const userChip = (
    <span className="hidden items-center gap-2 rounded-full border border-line bg-card2 px-3.5 py-1.5 text-[12px] text-muted sm:flex">
      <span className="pulse-dot size-1.5 rounded-full bg-dotok" />
      {user || "—"}
    </span>
  );

  const logoutBtn = (
    <button
      onClick={logout}
      className="group flex items-center gap-2 rounded-full border border-line bg-card2 px-4 py-1.5 text-[12px] font-medium text-muted transition-all hover:border-red-500/50 hover:bg-red-500/5 hover:text-red-500"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4 transition-transform group-hover:translate-x-0.5">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" />
        <polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" />
      </svg>
      Logout
    </button>
  );

  return (
    <main className="flex min-h-screen bg-background">
      {/* vertical sidebar */}
      {layout === "vertical" && (
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line bg-card p-4 md:flex">
          <div className="px-2 py-3">{logo}</div>
          <nav className="mt-4 flex flex-col gap-1">{navItems("dashboard")}</nav>
          <div className="mt-auto space-y-3">
            <div className="rounded-xl border border-line bg-card2 p-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">signed in</p>
              <p className="mt-1 truncate text-sm font-semibold text-brand">{user || "—"}</p>
            </div>
            {logoutBtn}
          </div>
        </aside>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* horizontal topbar (also fallback header on mobile) */}
        <header className="sticky top-0 z-40 border-b border-line bg-card/70 backdrop-blur-xl">
          <div
            className={`flex h-16 items-center gap-4 px-5 sm:px-8 ${
              layout === "horizontal" ? "justify-between" : "justify-end"
            }`}
          >
            {layout === "horizontal" && <div className="hidden md:block">{logo}</div>}
            {layout === "horizontal" && (
              <nav className="hidden items-center gap-1 rounded-full border border-line bg-card2 p-1 md:flex">
                {navItems("dashboard", true)}
              </nav>
            )}
            <div className="flex items-center gap-3">
              {userChip}
              {logoutBtn}
            </div>
          </div>
        </header>

        <div className="w-full flex-1 space-y-8 px-5 py-8 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label text-brand">overview</p>
              <h1 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-muted">
                Live stats from MySQL · layout:{" "}
                <span className="font-mono text-brand">{layout}</span>
                <span className="text-muted/70"> (ubah via ⚙ di sisi kanan)</span>
              </p>
            </div>
            <span className="flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span className="pulse-dot size-1.5 rounded-full bg-dotok" />
              mysql connected
            </span>
          </div>

          {/* stat cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                label: "Admins",
                value: stats?.admins,
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
                bar: "40%",
              },
              {
                label: "Login Attempts",
                value: stats?.login_attempts,
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
                  </svg>
                ),
                bar: "70%",
              },
              {
                label: "Failed Logins",
                value: stats?.failed_logins,
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <circle cx="12" cy="17" r="0.5" fill="currentColor" />
                  </svg>
                ),
                bar: "25%",
                danger: true,
              },
            ].map((c) => (
              <div key={c.label} className="card-lift rounded-2xl border border-line bg-card p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{c.label}</p>
                    <p className="mt-2 font-display text-3xl font-bold tabular-nums">
                      {c.value ?? "…"}
                    </p>
                  </div>
                  <span
                    className={`grid size-10 place-items-center rounded-xl ${
                      c.danger ? "bg-red-500/10 text-red-500" : "bg-brand-soft text-brand"
                    }`}
                  >
                    {c.icon}
                  </span>
                </div>
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-line">
                  <div
                    className={`animate-count-bar h-full rounded-full ${c.danger ? "bg-red-500" : "bg-brand"}`}
                    style={{ width: c.bar }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* recent logins */}
          <section id="logins" className="rounded-2xl border border-line bg-card">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-sm font-semibold">Recent Logins</h2>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                mysql · login_logs
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-line font-mono text-[10px] uppercase tracking-widest text-muted">
                    <th className="px-5 py-3 font-medium">User</th>
                    <th className="px-5 py-3 font-medium">IP</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-muted">
                        No login activity yet.
                      </td>
                    </tr>
                  )}
                  {logs.map((l) => (
                    <tr key={l.id} className="border-b border-line/50 last:border-0 hover:bg-brand-soft/30">
                      <td className="px-5 py-3 font-medium">{l.username}</td>
                      <td className="px-5 py-3 font-mono text-muted">{l.ip}</td>
                      <td className="px-5 py-3">
                        {l.success ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-dotok/10 px-2.5 py-0.5 text-[11px] font-semibold text-dotok">
                            <span className="size-1.5 rounded-full bg-dotok" /> success
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-red-500">
                            <span className="size-1.5 rounded-full bg-red-500" /> failed
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 font-mono text-muted">
                        {new Date(l.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
