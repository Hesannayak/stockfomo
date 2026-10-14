"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Flame, Trophy, ArrowLeftRight, User, Search, Bell } from "lucide-react";

const tabs = [
  { href: "/", label: "Feed", icon: Flame },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/trade", label: "Trade", icon: ArrowLeftRight },
  { href: "/profile", label: "Profile", icon: User },
] as const;

export function TopNav() {
  const pathname = usePathname();

  return (
    <header
      className="hidden lg:flex items-center h-12 px-4 sticky top-0 z-50"
      style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}
    >
      <Link href="/" className="flex items-center gap-1.5 mr-8 no-underline" style={{ color: "var(--fg)" }}>
        <Zap size={18} style={{ color: "var(--accent)" }} fill="var(--accent)" />
        <span className="text-sm font-black tracking-tight">StockFomo</span>
      </Link>

      <nav className="flex items-center gap-1">
        {tabs.map((tab) => {
          const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors no-underline"
              style={{
                background: isActive ? "var(--bg-input)" : "transparent",
                color: isActive ? "var(--accent)" : "var(--fg-dim)",
              }}
            >
              <tab.icon size={14} strokeWidth={isActive ? 2.5 : 1.5} />
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
          style={{ background: "var(--bg-input)", color: "var(--fg-dim)" }}
        >
          <Search size={13} />
          <span>Search stocks...</span>
          <kbd className="text-[10px] px-1 py-0.5 rounded" style={{ background: "var(--bg-card)", color: "var(--fg-dim)" }}>/</kbd>
        </div>
        <button className="p-1.5 rounded-lg cursor-pointer relative" style={{ color: "var(--fg-dim)" }}>
          <Bell size={16} />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
        </button>
      </div>
    </header>
  );
}
