"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Flame, Shield } from "lucide-react";
import type { LeaderboardEntry } from "@/lib/types";
import { formatPercent, getInitials } from "@/lib/utils";

type Timeframe = "today" | "week" | "month" | "all";

export function LeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  const [timeframe, setTimeframe] = useState<Timeframe>("all");

  const timeframes: { key: Timeframe; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "all", label: "All Time" },
  ];

  const rankColors = ["var(--yellow)", "var(--fg-muted)", "#cd7f32"];

  return (
    <div>
      {/* Timeframe Tabs */}
      <div
        className="flex gap-1 p-1 mx-4 mt-4 rounded-lg"
        style={{ background: "var(--bg-input)" }}
      >
        {timeframes.map((tf) => (
          <button
            key={tf.key}
            onClick={() => setTimeframe(tf.key)}
            className="flex-1 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer"
            style={{
              background: timeframe === tf.key ? "var(--bg-card)" : "transparent",
              color: timeframe === tf.key ? "var(--fg)" : "var(--fg-dim)",
            }}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Entries */}
      <div className="mt-3">
        {entries.map((entry, i) => (
          <Link
            key={entry.user.id}
            href={`/profile/${entry.user.username}`}
            className="flex items-center gap-3 px-4 py-3 transition-colors"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            {/* Rank */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{
                color: i < 3 ? rankColors[i] : "var(--fg-dim)",
                background: i < 3 ? "var(--bg-input)" : "transparent",
              }}
            >
              {i < 3 ? <Trophy size={16} /> : entry.rank}
            </div>

            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{ background: "var(--bg-input)", color: "var(--fg-muted)" }}
            >
              {getInitials(entry.user.displayName)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm truncate">
                  {entry.user.displayName}
                </span>
                {entry.user.isVerified && (
                  <Shield size={12} style={{ color: "var(--accent)" }} />
                )}
              </div>
              <div className="text-xs" style={{ color: "var(--fg-dim)" }}>
                {entry.tradeCount} trades · {entry.winRate}% win rate
              </div>
            </div>

            {/* Return */}
            <div className="text-right shrink-0">
              <div
                className="text-sm font-bold font-mono"
                style={{
                  color: entry.totalReturn >= 0 ? "var(--accent)" : "var(--red)",
                }}
              >
                {formatPercent(entry.totalReturn)}
              </div>
              {entry.streak > 0 && (
                <div
                  className="flex items-center justify-end gap-0.5 text-[10px] font-semibold mt-0.5"
                  style={{ color: "var(--yellow)" }}
                >
                  <Flame size={10} />
                  {entry.streak} streak
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
