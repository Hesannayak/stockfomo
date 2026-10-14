"use client";

import { useState } from "react";
import { Flame, Skull, Rocket } from "lucide-react";
import type { FeedItem } from "@/lib/types";
import { formatCurrency, formatPercent, timeAgo, getInitials } from "@/lib/utils";

export function TradeCard({ item }: { item: FeedItem }) {
  const { trade, user, reactions, timestamp } = item;
  const [localReactions, setLocalReactions] = useState(reactions);

  const isBuy = trade.direction === "BUY";
  const isOpen = trade.status === "OPEN";

  let pnl = trade.pnlAmount;
  let pnlPct = trade.pnlPercent;
  if (isOpen && trade.currentPrice) {
    const diff = isBuy
      ? trade.currentPrice - trade.entryPrice
      : trade.entryPrice - trade.currentPrice;
    pnl = diff * trade.quantity;
    pnlPct = (diff / trade.entryPrice) * 100;
  }

  const isPositive = (pnl ?? 0) >= 0;

  function react(key: keyof typeof localReactions) {
    setLocalReactions((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  }

  return (
    <div
      className="p-4 transition-colors"
      style={{
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{ background: "var(--bg-input)", color: "var(--fg-muted)" }}
        >
          {getInitials(user.displayName)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">{user.displayName}</span>
            {user.isVerified && (
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
              >
                VERIFIED
              </span>
            )}
            <span className="text-xs" style={{ color: "var(--fg-dim)" }}>
              @{user.username}
            </span>
            <span className="text-xs ml-auto" style={{ color: "var(--fg-dim)" }}>
              {timeAgo(timestamp)}
            </span>
          </div>

          {/* Trade Info */}
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded"
              style={{
                background: isBuy ? "var(--accent-muted)" : "var(--red-muted)",
                color: isBuy ? "var(--accent)" : "var(--red)",
              }}
            >
              {trade.direction}
            </span>
            <span className="font-bold text-base">{trade.ticker}</span>
            <span className="text-sm" style={{ color: "var(--fg-muted)" }}>
              {trade.quantity} shares @ {formatCurrency(trade.entryPrice)}
            </span>
          </div>

          {/* P&L */}
          {pnl !== null && pnlPct !== null && (
            <div
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg"
              style={{
                background: isPositive ? "var(--accent-muted)" : "var(--red-muted)",
                color: isPositive ? "var(--accent)" : "var(--red)",
              }}
            >
              <span>{formatCurrency(pnl)}</span>
              <span style={{ opacity: 0.7 }}>({formatPercent(pnlPct)})</span>
              {isOpen && (
                <span
                  className="text-[10px] font-bold ml-1 px-1.5 py-0.5 rounded"
                  style={{ background: "var(--yellow-muted)", color: "var(--yellow)" }}
                >
                  OPEN
                </span>
              )}
            </div>
          )}

          {/* Reactions */}
          <div className="mt-3 flex items-center gap-1">
            {[
              { key: "fire" as const, icon: Flame, label: "🔥" },
              { key: "rocket" as const, icon: Rocket, label: "🚀" },
              { key: "skull" as const, icon: Skull, label: "💀" },
            ].map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => react(key)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-colors cursor-pointer"
                style={{
                  background: "var(--bg-input)",
                  color: "var(--fg-dim)",
                }}
              >
                <Icon size={13} />
                <span className="font-mono text-[11px]">{localReactions[key]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
