"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Trophy, ArrowLeftRight, User, Search, Bell, Compass } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getInitials } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Feed", icon: Flame },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/trade", label: "Trade", icon: ArrowLeftRight },
  { href: "/profile", label: "Profile", icon: User },
] as const;

export function TopNav() {
  const pathname = usePathname();
  const { user, isLoggedIn } = useAuth();

  return (
    <header
      className="hidden lg:flex items-center h-[52px] px-5 sticky top-0 z-50"
      style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}
    >
      <Link href="/" className="flex items-center gap-2 mr-8 no-underline" style={{ color: "var(--fg)" }}>
        <img src="/logo.png" alt="StockFomo" className="w-6 h-6 rounded-md" />
        <span className="text-[15px] font-bold tracking-tight">StockFomo</span>
      </Link>

      <nav className="flex items-center gap-0.5">
        {tabs.map((tab) => {
          const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all no-underline hover:bg-[var(--bg-elevated)]"
              style={{
                color: isActive ? "var(--fg)" : "var(--fg-dim)",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              <tab.icon size={15} strokeWidth={isActive ? 2 : 1.5} />
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      <div className="flex items-center gap-1.5">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] cursor-pointer"
          style={{ color: "var(--fg-dim)", border: "1px solid var(--border)" }}
        >
          <Search size={13} />
          <span>Search markets...</span>
          <kbd
            className="text-[11px] px-1 py-px rounded font-mono"
            style={{ background: "var(--bg-elevated)", color: "var(--fg-dim)" }}
          >
            /
          </kbd>
        </div>
        <button className="p-2 rounded-md btn-ghost relative">
          <Bell size={15} />
          <div className="live-dot absolute top-1.5 right-1.5" />
        </button>
        {isLoggedIn && user ? (
          <Link
            href="/profile"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold no-underline"
            style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)", border: "1px solid var(--border)" }}
          >
            {getInitials(user.displayName)}
          </Link>
        ) : (
          <Link
            href="/login"
            className="px-3 py-1.5 rounded-md text-[13px] font-medium no-underline btn-primary"
          >
            Get Started
          </Link>
        )}
      </div>
    </header>
  );
}
