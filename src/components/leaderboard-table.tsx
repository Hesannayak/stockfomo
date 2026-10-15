"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Flame, Shield, TrendingUp } from "lucide-react";
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

  const borderClasses = ["rank-card-gold", "rank-card-silver", "rank-card-bronze"];
  const rankColors = ["var(--gold)", "var(--silver)", "var(--bronze)"];

  return (
    <div>
      {/* Timeframe Tabs */}
      <div className="flex gap-1.5 p-4 pb-2">
        {timeframes.map((tf) => (
          <button
            key={tf.key}
            onClick={() => setTimeframe(tf.key)}
            className="px-3.5 py-1.5 text-[12px] font-semibold rounded-full transition-all cursor-pointer"
            style={{
              background: timeframe === tf.key ? "var(--fg)" : "transparent",
              color: timeframe === tf.key ? "var(--bg)" : "var(--fg-dim)",
              border: timeframe === tf.key ? "1px solid transparent" : "1px solid var(--border)",
            }}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Entries */}
      <div className="px-4 pb-4 flex flex-col gap-2 mt-2">
        {entries.map((entry, i) => (
          <Link
            key={entry.user.id}
            href={`/profile/${entry.user.username}`}
            className={`rank-card ${i < 3 ? borderClasses[i] : ""} flex items-center gap-3 px-4 py-3.5 no-underline`}
            style={{ color: "var(--fg)" }}
          >
            {/* Rank Number */}
            <div
              className="text-lg font-mono shrink-0 w-8 text-right"
              style={{
                color: i < 3 ? rankColors[i] : "var(--fg-dim)",
                fontStyle: "italic",
                fontWeight: i < 3 ? 700 : 400,
              }}
            >
              {String(entry.rank).padStart(2, "0")}
            </div>

            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{
                background: i < 3 ? `${rankColors[i]}15` : "var(--bg-input)",
                color: i < 3 ? rankColors[i] : "var(--fg-muted)",
                border: `1.5px solid ${i < 3 ? `${rankColors[i]}30` : "var(--border)"}`,
              }}
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
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
                  >
                    PRO
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-[11px] font-mono" style={{ color: "var(--fg-dim)" }}>
                  {entry.tradeCount} trades
                </span>
                <span className="text-[11px] font-mono" style={{ color: "var(--fg-dim)" }}>
                  {entry.winRate}% win
                </span>
                {entry.streak > 0 && (
                  <span
                    className="text-[11px] font-semibold flex items-center gap-0.5"
                    style={{ color: "var(--yellow)" }}
                  >
                    <Flame size={10} />
                    {entry.streak}
                  </span>
                )}
              </div>
            </div>

            {/* Return */}
            <div className="text-right shrink-0">
              <div
                className="stat-pill"
                style={{
                  background: entry.totalReturn >= 0 ? "var(--accent-muted)" : "var(--red-muted)",
                  color: entry.totalReturn >= 0 ? "var(--accent)" : "var(--red)",
                }}
              >
                {entry.totalReturn >= 0 && <TrendingUp size={10} />}
                {formatPercent(entry.totalReturn)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
