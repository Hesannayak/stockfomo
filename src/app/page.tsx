"use client";

import { useState } from "react";
import Link from "next/link";
import { TradeCard } from "@/components/trade-card";
import { ThesisCard } from "@/components/thesis-card";
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
    <div className="lg:grid lg:grid-cols-[240px_1fr_260px]">
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
            className={`flex items-center gap-2.5 px-4 py-2 no-underline transition-colors card-hover animate-slide stagger-${Math.min(i + 1, 8)}`}
            style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
          >
            <div
              className="w-5 text-right text-xs font-mono shrink-0"
              style={{
                color: i < 3 ? rankColors[i] : "var(--fg-dim)",
                fontWeight: i < 3 ? 700 : 400,
              }}
            >
              {entry.rank}
            </div>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
              style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)" }}
            >
              {getInitials(entry.user.displayName)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-medium truncate">{entry.user.displayName}</span>
                {entry.user.isVerified && (
                  <span className="pro-badge">PRO</span>
                )}
              </div>
              <div className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>
                {entry.winRate}% win
              </div>
            </div>
            <div
              className="text-[13px] font-semibold font-mono shrink-0"
              style={{ color: entry.totalReturn >= 0 ? "var(--green)" : "var(--red)" }}
            >
              {formatPercent(entry.totalReturn)}
            </div>
          </Link>
        ))}

        <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="section-header mb-2.5">Trending</h2>
          {trendingTickers.map((t) => {
            const quote = mockQuotes[t.ticker];
            const isUp = quote?.changePercent >= 0;
            return (
              <Link
                key={t.ticker}
                href={`/stock/${t.ticker}`}
                className="flex items-center justify-between py-1.5 no-underline transition-opacity hover:opacity-70"
                style={{ color: "var(--fg)" }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-semibold">{t.ticker}</span>
                  <span className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>{t.name.split(" ")[0]}</span>
                </div>
                <span
                  className="text-xs font-mono font-medium"
                  style={{ color: isUp ? "var(--green)" : "var(--red)" }}
                >
                  {isUp ? "+" : ""}{quote?.changePercent.toFixed(2)}%
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Center — Feed */}
      <div className="lg:border-r" style={{ borderColor: "var(--border)" }}>
        {/* Mobile Header */}
        <div
          className="sticky top-0 z-40 px-4 pt-3 pb-0 lg:hidden"
          style={{ background: "var(--bg)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "var(--fg)" }}>
                <Zap size={13} color="#fff" fill="#fff" />
              </div>
              <h1 className="text-[15px] font-bold tracking-tight">StockFomo</h1>
            </div>
            <button className="p-1.5 rounded-md cursor-pointer relative" style={{ color: "var(--fg-dim)" }}>
              <Bell size={18} />
              <div className="live-dot absolute top-1 right-1" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 px-4 py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-3 py-1 text-sm rounded-md transition-all cursor-pointer"
              style={{
                background: filter === f.key ? "var(--fg)" : "transparent",
                color: filter === f.key ? "var(--bg)" : "var(--fg-dim)",
                fontWeight: filter === f.key ? 600 : 400,
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
          {mockFeed.map((item, i) => (
            <div key={item.id} className={`animate-in stagger-${Math.min(i + 1, 8)}`}>
              {item.type === "thesis" ? (
                <ThesisCard item={item} />
              ) : (
                <TradeCard item={item} />
              )}
            </div>
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
