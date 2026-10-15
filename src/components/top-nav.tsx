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
      className="hidden lg:flex items-center h-14 px-5 sticky top-0 z-50 glass glass-border"
    >
      <Link href="/" className="flex items-center gap-2 mr-8 no-underline" style={{ color: "var(--fg)" }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--accent)" }}>
          <Zap size={15} color="#000" fill="#000" />
        </div>
        <span className="text-sm font-black tracking-tight">StockFomo</span>
      </Link>

      <nav className="flex items-center gap-0.5">
        {tabs.map((tab) => {
          const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all no-underline relative"
              style={{
                background: isActive ? "var(--bg-input)" : "transparent",
                color: isActive ? "var(--fg)" : "var(--fg-dim)",
              }}
            >
              <tab.icon size={14} strokeWidth={isActive ? 2.5 : 1.5} />
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full" style={{ background: "var(--accent)" }} />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-colors"
          style={{ background: "var(--bg-input)", color: "var(--fg-dim)" }}
        >
          <Search size={13} />
          <span>Search stocks...</span>
          <kbd
            className="text-[11px] px-1.5 py-0.5 rounded font-mono"
            style={{ background: "var(--bg)", color: "var(--fg-dim)", border: "1px solid var(--border)" }}
          >
            /
          </kbd>
        </div>
        <button className="p-2 rounded-lg btn-ghost relative">
          <Bell size={15} />
          <div
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "var(--accent)", boxShadow: "0 0 6px rgba(16, 185, 129, 0.5)" }}
          />
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
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
