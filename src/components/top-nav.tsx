"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Flame, Trophy, ArrowLeftRight, User, Search, Bell } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getInitials } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Feed", icon: Flame },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/trade", label: "Trade", icon: ArrowLeftRight },
  { href: "/profile", label: "Profile", icon: User },
] as const;

export function TopNav() {
  const pathname = usePathname();
  const { user, isLoggedIn } = useAuth();

  return (
    <header
      className="hidden lg:flex items-center h-14 px-5 sticky top-0 z-50"
      style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}
    >
      <Link href="/" className="flex items-center gap-2 mr-8 no-underline" style={{ color: "var(--fg)" }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--green)" }}>
          <Zap size={15} color="#fff" fill="#fff" />
        </div>
        <span className="text-[15px] font-extrabold tracking-tight">StockFomo</span>
        <span
          className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded"
          style={{ background: "var(--bg-elevated)", color: "var(--fg-dim)", border: "1px solid var(--border)" }}
        >
          Beta
        </span>
      </Link>

      <nav className="flex items-center gap-0.5">
        {tabs.map((tab) => {
          const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all no-underline"
              style={{
                color: isActive ? "var(--fg)" : "var(--fg-dim)",
                fontWeight: isActive ? 700 : 500,
              }}
            >
              <tab.icon size={14} strokeWidth={isActive ? 2.5 : 1.5} />
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-colors"
          style={{ background: "var(--bg)", color: "var(--fg-dim)", border: "1px solid var(--border)" }}
        >
          <Search size={13} />
          <span>Search markets...</span>
          <kbd
            className="text-xs px-1.5 py-0.5 rounded font-mono"
            style={{ background: "var(--bg-elevated)", color: "var(--fg-dim)", border: "1px solid var(--border)" }}
          >
            /
          </kbd>
        </div>
        <button className="p-2 rounded-lg btn-ghost relative">
          <Bell size={15} />
          <div className="live-dot absolute top-1.5 right-1.5" />
        </button>
        {isLoggedIn && user ? (
          <Link
            href="/profile"
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold no-underline transition-all"
            style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "2px solid var(--accent)" }}
          >
            {getInitials(user.displayName)}
          </Link>
        ) : (
          <Link
            href="/login"
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold no-underline btn-primary"
          >
            Early Access
          </Link>
        )}
      </div>
    </header>
  );
}
