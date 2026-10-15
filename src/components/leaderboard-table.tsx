"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame, Shield } from "lucide-react";
import type { LeaderboardEntry } from "@/lib/types";
import { formatPercent, getInitials } from "@/lib/utils";

type Timeframe = "today" | "week" | "month" | "all";

export function LeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  const [timeframe, setTimeframe] = useState<Timeframe>("all");

  const timeframes: { key: Timeframe; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "week", label: "Week" },
    { key: "month", label: "Month" },
    { key: "all", label: "All Time" },
  ];

  const rankBg = ["var(--gold)", "var(--silver)", "var(--bronze)"];

  return (
    <div>
      {/* Timeframe Tabs */}
      <div className="flex gap-1 p-4 pb-3">
        {timeframes.map((tf) => (
          <button
            key={tf.key}
            onClick={() => setTimeframe(tf.key)}
            className="px-3 py-1 text-[13px] rounded-md transition-all cursor-pointer"
            style={{
              background: timeframe === tf.key ? "var(--fg)" : "transparent",
              color: timeframe === tf.key ? "var(--bg)" : "var(--fg-dim)",
              fontWeight: timeframe === tf.key ? 600 : 400,
            }}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Column Headers */}
      <div
        className="grid items-center px-4 py-2"
        style={{
          gridTemplateColumns: "48px 1fr 140px 80px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span className="section-header">Rank</span>
        <span className="section-header">Trader</span>
        <span className="section-header hidden sm:block">Performance</span>
        <span className="section-header text-right">Return</span>
      </div>

      {/* Entries */}
      <div>
        {entries.map((entry, i) => (
          <Link
            key={entry.user.id}
            href={`/profile/${entry.user.username}`}
            className="grid items-center px-4 py-3.5 no-underline transition-colors card-hover"
            style={{
              gridTemplateColumns: "48px 1fr 140px 80px",
              borderBottom: "1px solid var(--border)",
              color: "var(--fg)",
            }}
          >
            {/* Rank */}
            <div className="flex justify-center">
              {i < 3 ? (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: rankBg[i], color: "#fff" }}
                >
                  {entry.rank}
                </div>
              ) : (
                <span className="text-sm" style={{ color: "var(--fg-dim)" }}>
                  {entry.rank}
                </span>
              )}
            </div>

            {/* Trader */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{
                  background: i < 3 ? `${rankBg[i]}18` : "var(--bg-elevated)",
                  color: i < 3 ? rankBg[i] : "var(--fg-muted)",
                  border: `1.5px solid ${i < 3 ? `${rankBg[i]}30` : "var(--border)"}`,
                }}
              >
                {getInitials(entry.user.displayName)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-[15px] truncate">
                    {entry.user.displayName}
                  </span>
                  {entry.user.isVerified && (
                    <Shield size={13} style={{ color: "var(--blue)" }} />
                  )}
                  {entry.streak > 0 && (
                    <span
                      className="text-xs font-semibold flex items-center gap-0.5"
                      style={{ color: "var(--yellow)" }}
                    >
                      <Flame size={10} />
                      {entry.streak} streak
                    </span>
                  )}
                  {entry.user.isVerified && (
                    <span className="pro-badge">PRO</span>
                  )}
                </div>
                <div className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>
                  @{entry.user.username}
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="hidden sm:block">
              <div className="text-sm" style={{ color: "var(--fg-muted)" }}>
                {entry.tradeCount} trades
              </div>
              <div className="text-xs" style={{ color: "var(--fg-dim)" }}>
                {entry.winRate}% win rate
              </div>
            </div>

            {/* Return */}
            <div
              className="text-right text-sm font-semibold font-mono"
              style={{
                color: entry.totalReturn >= 0 ? "var(--green)" : "var(--red)",
              }}
            >
              {entry.totalReturn >= 0 ? "+" : ""}
              {formatPercent(entry.totalReturn)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
