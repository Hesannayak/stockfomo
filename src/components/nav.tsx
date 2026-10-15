"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Trophy,
  ArrowLeftRight,
  User,
} from "lucide-react";

const tabs = [
  { href: "/", label: "Feed", icon: Flame },
  { href: "/leaderboard", label: "Ranks", icon: Trophy },
  { href: "/trade", label: "Trade", icon: ArrowLeftRight },
  { href: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto h-16 px-4">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center gap-1 py-2 px-3 transition-all relative active:scale-90"
              style={{ color: isActive ? "var(--fg)" : "var(--fg-dim)" }}
            >
              {isActive && (
                <div
                  className="absolute -top-px left-3 right-3 h-0.5 rounded-full"
                  style={{ background: "var(--fg)" }}
                />
              )}
              <tab.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px] font-medium tracking-wide uppercase">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
      <div
        className="h-[env(safe-area-inset-bottom,0px)]"
        style={{ background: "transparent" }}
      />
    </nav>
  );
}
