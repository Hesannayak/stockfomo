"use client";

import Link from "next/link";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { FeedSidebar } from "@/components/feed-sidebar";
import { FollowSidebar } from "@/components/follow-sidebar";
import { mockLeaderboard, mockQuotes, trendingTickers } from "@/lib/mock-data";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";

const tickerColors = ["#7C3AED", "#2563EB", "#D97706", "#DC2626", "#0891B2"];

export default function LeaderboardPage() {
  return (
    <div className="lg:grid lg:grid-cols-[260px_1fr_280px]">
      {/* Left Sidebar — Live Feed (desktop) */}
      <div className="desktop-sidebar">
        <FeedSidebar />
      </div>

      {/* Center — Leaderboard */}
      <div className="lg:border-r" style={{ borderColor: "var(--border)" }}>
        <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <span className="text-lg">🏆</span>
            <h1 className="text-lg font-bold tracking-tight">Leaderboard</h1>
          </div>
          <p className="text-xs mt-1" style={{ color: "var(--fg-dim)" }}>
            Top paper traders ranked by total return across all portfolios.
          </p>
        </div>
        <LeaderboardTable entries={mockLeaderboard} />

        {/* Trending Stocks */}
        <div className="px-4 py-4" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-sm">Trending Stocks</h2>
            <Link href="/trade" className="text-xs font-semibold no-underline" style={{ color: "var(--accent)" }}>
              View All
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {trendingTickers.map((t, idx) => {
              const quote = mockQuotes[t.ticker];
              const isUp = quote?.changePercent >= 0;
              return (
                <Link
                  key={t.ticker}
                  href={`/stock/${t.ticker}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl shrink-0 no-underline transition-all hover:scale-[1.01]"
                  style={{ color: "var(--fg)", border: "1px solid var(--border)", minWidth: "150px" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0"
                    style={{ background: tickerColors[idx % tickerColors.length], color: "#fff" }}
                  >
                    {t.ticker.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold">{t.ticker}</span>
                      <span className="text-[11px]" style={{ color: "var(--fg-dim)" }}>
                        {t.name.split(" ")[0]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-sm font-mono font-semibold">
                        ${quote?.price.toFixed(2)}
                      </span>
                      <span
                        className="text-[11px] font-mono font-semibold"
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
