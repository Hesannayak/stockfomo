"use client";

import Link from "next/link";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { FeedSidebar } from "@/components/feed-sidebar";
import { FollowSidebar } from "@/components/follow-sidebar";
import { mockLeaderboard, mockQuotes, trendingTickers } from "@/lib/mock-data";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";

const tickerColors = ["#0A0A0A", "#525252", "#CA8A04", "#DC2626", "#0891B2"];

export default function LeaderboardPage() {
  return (
    <div className="lg:grid lg:grid-cols-[240px_1fr_260px]">
      {/* Left Sidebar — Live Feed (desktop) */}
      <div className="desktop-sidebar">
        <FeedSidebar />
      </div>

      {/* Center — Leaderboard */}
      <div className="lg:border-r" style={{ borderColor: "var(--border)" }}>
        <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <h1 className="text-base font-bold tracking-tight">Leaderboard</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--fg-dim)" }}>
            Top paper traders ranked by total return across all portfolios.
          </p>
        </div>
        <LeaderboardTable entries={mockLeaderboard} />

        {/* Trending Stocks */}
        <div className="px-4 py-4" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Trending Stocks</h2>
            <Link href="/trade" className="text-[13px] font-medium no-underline hover:underline" style={{ color: "var(--fg-muted)" }}>
              View All
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollBehavior: "smooth" }}>
            {trendingTickers.map((t, idx) => {
              const quote = mockQuotes[t.ticker];
              const isUp = quote?.changePercent >= 0;
              return (
                <Link
                  key={t.ticker}
                  href={`/stock/${t.ticker}`}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl shrink-0 no-underline transition-all hover:scale-[1.02] hover:shadow-[var(--shadow)] active:scale-[0.98] animate-scale stagger-${Math.min(idx + 1, 8)}`}
                  style={{ color: "var(--fg)", border: "1px solid var(--border)", minWidth: "150px" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: tickerColors[idx % tickerColors.length], color: "#fff" }}
                  >
                    {t.ticker.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold">{t.ticker}</span>
                      <span className="text-[13px]" style={{ color: "var(--fg-dim)" }}>
                        {t.name.split(" ")[0]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-sm font-mono font-semibold">
                        ${quote?.price.toFixed(2)}
                      </span>
                      <span
                        className="text-[13px] font-mono font-semibold"
                        style={{ color: isUp ? "var(--green)" : "var(--red)" }}
                      >
                        {isUp ? "+" : ""}{quote?.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Sidebar — Follow Suggestions (desktop) */}
      <div className="desktop-sidebar">
        <FollowSidebar />
      </div>
    </div>
  );
}
