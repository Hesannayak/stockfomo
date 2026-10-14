"use client";

import { useState } from "react";
import Link from "next/link";
import { TradeCard } from "@/components/trade-card";
import { TrendingBar } from "@/components/trending-bar";
import { FollowSidebar } from "@/components/follow-sidebar";
import { mockFeed, mockLeaderboard, mockQuotes, trendingTickers } from "@/lib/mock-data";
import { Bell, Zap, Trophy, Flame, Shield, TrendingUp, TrendingDown } from "lucide-react";
import { formatPercent, getInitials } from "@/lib/utils";

type Filter = "all" | "following" | "trending";

export default function FeedPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "For You" },
    { key: "following", label: "Following" },
    { key: "trending", label: "Top Traders" },
  ];

  return (
    <div className="lg:grid lg:grid-cols-[280px_1fr_280px]">
      {/* Left Sidebar — Leaderboard (desktop) */}
      <div className="desktop-sidebar" style={{ borderRight: "1px solid var(--border)" }}>
        <div className="px-3 py-3 sticky top-0 z-10" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: "var(--fg-dim)" }}>
            <Trophy size={12} /> Leaderboard
          </h2>
        </div>
        {mockLeaderboard.map((entry, i) => {
          const rankColors = ["var(--yellow)", "var(--fg-muted)", "#cd7f32"];
          return (
            <Link
              key={entry.user.id}
              href={`/profile/${entry.user.username}`}
              className="flex items-center gap-2 px-3 py-2.5 no-underline transition-colors card-hover"
              style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{
                  color: i < 3 ? rankColors[i] : "var(--fg-dim)",
                  background: i < 3 ? "var(--bg-input)" : "transparent",
                }}
              >
                {i < 3 ? <Trophy size={11} /> : entry.rank}
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{ background: "var(--bg-input)", color: "var(--fg-muted)", border: "1px solid var(--border)" }}
              >
                {getInitials(entry.user.displayName)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold truncate">{entry.user.displayName}</span>
                  {entry.user.isVerified && (
                    <span className="text-[8px] font-bold px-1 py-px rounded-full" style={{ background: "var(--accent-muted)", color: "var(--accent)" }}>PRO</span>
                  )}
                </div>
                <div className="text-[10px]" style={{ color: "var(--fg-dim)" }}>
                  {entry.tradeCount} trades · {entry.winRate}%
                </div>
              </div>
              <div
                className="text-xs font-bold font-mono shrink-0"
                style={{ color: entry.totalReturn >= 0 ? "var(--accent)" : "var(--red)" }}
              >
                {formatPercent(entry.totalReturn)}
              </div>
            </Link>
          );
        })}

        <div className="px-3 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--fg-dim)" }}>
            Trending
          </h2>
          {trendingTickers.map((t) => {
            const quote = mockQuotes[t.ticker];
            const isUp = quote?.changePercent >= 0;
            return (
              <Link
                key={t.ticker}
                href={`/stock/${t.ticker}`}
                className="flex items-center justify-between py-1.5 no-underline transition-opacity hover:opacity-80"
                style={{ color: "var(--fg)" }}
              >
                <div>
                  <span className="text-xs font-bold">{t.ticker}</span>
                  <span className="text-[10px] ml-1.5" style={{ color: "var(--fg-dim)" }}>{t.name.split(" ")[0]}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono">${quote?.price.toFixed(2)}</span>
                  <span
                    className="text-[10px] font-mono font-semibold flex items-center gap-0.5 px-1.5 py-0.5 rounded"
                    style={{ color: isUp ? "var(--accent)" : "var(--red)", background: isUp ? "var(--accent-muted)" : "var(--red-muted)" }}
                  >
                    {isUp ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                    {isUp ? "+" : ""}{quote?.changePercent.toFixed(2)}%
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Center — Feed */}
      <div className="lg:border-r" style={{ borderColor: "var(--border)" }}>
        {/* Mobile Header */}
        <div
          className="sticky top-0 z-40 px-4 pt-4 pb-0 lg:hidden"
          style={{ background: "var(--bg)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap size={20} style={{ color: "var(--accent)" }} fill="var(--accent)" />
              <h1 className="text-lg font-bold tracking-tight">StockFomo</h1>
            </div>
            <button className="p-2 rounded-lg cursor-pointer relative" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <Bell size={18} style={{ color: "var(--fg-muted)" }} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "var(--accent)", boxShadow: "0 0 6px rgba(16, 185, 129, 0.5)" }} />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer"
              style={{
                background: filter === f.key ? "var(--fg)" : "transparent",
                color: filter === f.key ? "var(--bg)" : "var(--fg-dim)",
                border: filter === f.key ? "1px solid transparent" : "1px solid var(--border)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Trending Tickers — mobile only */}
        <div className="lg:hidden">
          <TrendingBar />
        </div>

        {/* Feed */}
        <div>
          {mockFeed.map((item) => (
            <TradeCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Right Sidebar — Follow Suggestions (desktop) */}
      <div className="desktop-sidebar">
        <FollowSidebar />
      </div>
    </div>
  );
}
