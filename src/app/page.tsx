"use client";

import { useState } from "react";
import { TradeCard } from "@/components/trade-card";
import { TrendingBar } from "@/components/trending-bar";
import { mockFeed } from "@/lib/mock-data";
import { Bell, Zap } from "lucide-react";

type Filter = "all" | "following" | "trending";

export default function FeedPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "For You" },
    { key: "following", label: "Following" },
    { key: "trending", label: "Top Traders" },
  ];

  return (
    <div>
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 pt-4 pb-0"
        style={{ background: "var(--bg)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={20} style={{ color: "var(--accent)" }} fill="var(--accent)" />
            <h1 className="text-lg font-bold tracking-tight">StockFomo</h1>
          </div>
          <button
            className="p-2 rounded-lg cursor-pointer"
            style={{ background: "var(--bg-card)" }}
          >
            <Bell size={18} style={{ color: "var(--fg-muted)" }} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-3 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer"
              style={{
                background: filter === f.key ? "var(--fg)" : "var(--bg-card)",
                color: filter === f.key ? "var(--bg)" : "var(--fg-dim)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Tickers */}
      <TrendingBar />

      {/* Feed */}
      <div>
        {mockFeed.map((item) => (
          <TradeCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
