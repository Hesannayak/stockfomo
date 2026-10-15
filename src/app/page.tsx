"use client";

import { useState } from "react";
import Link from "next/link";
import { TradeCard } from "@/components/trade-card";
import { TrendingBar } from "@/components/trending-bar";
import { FollowSidebar } from "@/components/follow-sidebar";
import { mockFeed, mockLeaderboard, mockQuotes, trendingTickers } from "@/lib/mock-data";
import { Bell, Zap, Trophy, TrendingUp, TrendingDown } from "lucide-react";
import { formatPercent, getInitials } from "@/lib/utils";

type Filter = "all" | "following" | "trending";

export default function FeedPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "For You" },
    { key: "following", label: "Following" },
    { key: "trending", label: "Top Traders" },
  ];

  const rankColors = ["var(--gold)", "var(--silver)", "var(--bronze)"];

  return (
    <div className="lg:grid lg:grid-cols-[280px_1fr_280px]">
      {/* Left Sidebar — Leaderboard (desktop) */}
      <div className="desktop-sidebar" style={{ borderRight: "1px solid var(--border)" }}>
        <div className="px-4 py-3 sticky top-0 z-10" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
          <h2 className="section-header flex items-center gap-1.5">
            <Trophy size={11} /> Leaderboard
          </h2>
        </div>
        {mockLeaderboard.map((entry, i) => (
          <Link
            key={entry.user.id}
            href={`/profile/${entry.user.username}`}
            className="flex items-center gap-2.5 px-4 py-2.5 no-underline transition-colors card-hover"
            style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
          >
            <div
              className="w-6 text-right text-[12px] font-mono shrink-0"
              style={{
                color: i < 3 ? rankColors[i] : "var(--fg-dim)",
                fontStyle: "italic",
                fontWeight: i < 3 ? 700 : 400,
              }}
            >
              {String(entry.rank).padStart(2, "0")}
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
              style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)", border: "1px solid var(--border)" }}
            >
              {getInitials(entry.user.displayName)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold truncate">{entry.user.displayName}</span>
                {entry.user.isVerified && (
                  <span className="text-[9px] font-bold px-1 py-px rounded" style={{ background: "var(--accent-muted)", color: "var(--accent)" }}>PRO</span>
                )}
              </div>
              <div className="text-[11px] font-mono" style={{ color: "var(--fg-dim)" }}>
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
        ))}

        <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="section-header mb-3">Trending</h2>
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
                  <span className="text-[11px] ml-1.5 font-mono" style={{ color: "var(--fg-dim)" }}>{t.name.split(" ")[0]}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono">${quote?.price.toFixed(2)}</span>
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
              <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid rgba(0, 255, 106, 0.15)" }}>Beta</span>
            </div>
            <button className="p-2 rounded-lg cursor-pointer relative" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <Bell size={18} style={{ color: "var(--fg-muted)" }} />
              <div className="live-dot absolute top-1.5 right-1.5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-3.5 py-1.5 text-[12px] font-semibold rounded-full transition-all cursor-pointer"
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
