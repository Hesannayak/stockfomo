"use client";

import Link from "next/link";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { FeedSidebar } from "@/components/feed-sidebar";
import { FollowSidebar } from "@/components/follow-sidebar";
import { mockLeaderboard, mockQuotes, trendingTickers } from "@/lib/mock-data";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";

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
            <Trophy size={18} style={{ color: "var(--gold)" }} />
            <h1 className="text-lg font-bold tracking-tight">Leaderboard</h1>
          </div>
          <p className="text-xs mt-1 font-mono" style={{ color: "var(--fg-dim)" }}>
            Top paper traders ranked by total return
          </p>
        </div>
        <LeaderboardTable entries={mockLeaderboard} />

        {/* Trending Stocks Grid */}
        <div className="px-4 py-4" style={{ borderTop: "1px solid var(--border)" }}>
          <h2 className="section-header mb-3 flex items-center gap-1.5">
            <TrendingUp size={11} /> Trending Stocks
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {trendingTickers.map((t) => {
              const quote = mockQuotes[t.ticker];
              const isUp = quote?.changePercent >= 0;
              return (
                <Link
                  key={t.ticker}
                  href={`/stock/${t.ticker}`}
                  className="rank-card p-3 no-underline transition-all hover:scale-[1.01]"
                  style={{ color: "var(--fg)" }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold">{t.ticker}</span>
                    <span
                      className="stat-pill"
                      style={{
                        color: isUp ? "var(--accent)" : "var(--red)",
                        background: isUp ? "var(--accent-muted)" : "var(--red-muted)",
                        fontSize: "10px",
                      }}
                    >
                      {isUp ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                      {isUp ? "+" : ""}{quote?.changePercent.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-[11px] mb-1" style={{ color: "var(--fg-dim)" }}>
                    {t.name.split(" ")[0]}
                  </div>
                  <div className="text-sm font-mono font-semibold">
                    ${quote?.price.toFixed(2)}
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
