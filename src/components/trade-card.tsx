"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame, Skull, Rocket, MessageCircle } from "lucide-react";
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
      className="px-4 py-4 transition-colors card-hover"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex items-start gap-3">
        <Link
          href={`/profile/${user.username}`}
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 no-underline transition-transform hover:scale-105"
          style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)", border: "1.5px solid var(--border)" }}
        >
          {getInitials(user.displayName)}
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/profile/${user.username}`} className="font-semibold text-sm no-underline hover:underline" style={{ color: "var(--fg)" }}>
              {user.displayName}
            </Link>
            {user.isVerified && (
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
              >
                PRO
              </span>
            )}
            <span className="text-[11px] font-mono" style={{ color: "var(--fg-dim)" }}>
              @{user.username}
            </span>
            <span className="text-[11px] font-mono ml-auto shrink-0" style={{ color: "var(--fg-dim)" }}>
              {timeAgo(timestamp)}
            </span>
          </div>

          <div className="mt-2.5 flex items-center gap-2 flex-wrap">
            <span
              className="stat-pill uppercase tracking-wide"
              style={{
                background: isBuy ? "var(--accent-muted)" : "var(--red-muted)",
                color: isBuy ? "var(--accent)" : "var(--red)",
              }}
            >
              {trade.direction}
            </span>
            <Link
              href={`/stock/${trade.ticker}`}
              className="font-bold text-base no-underline hover:underline"
              style={{ color: "var(--fg)" }}
            >
              {trade.ticker}
            </Link>
            <span className="text-sm font-mono" style={{ color: "var(--fg-muted)" }}>
              {trade.quantity} shares @ {formatCurrency(trade.entryPrice)}
            </span>
          </div>

          {pnl !== null && pnlPct !== null && (
            <div
              className="mt-2.5 inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg"
              style={{
                background: isPositive ? "var(--accent-muted)" : "var(--red-muted)",
                color: isPositive ? "var(--accent)" : "var(--red)",
              }}
            >
              <span className="font-mono">{formatCurrency(pnl)}</span>
              <span style={{ opacity: 0.6 }}>({formatPercent(pnlPct)})</span>
              {isOpen && (
                <span
                  className="stat-pill uppercase"
                  style={{ background: "var(--yellow-muted)", color: "var(--yellow)", fontSize: "10px" }}
                >
                  Open
                </span>
              )}
            </div>
          )}

          <div className="mt-3 flex items-center gap-1.5">
            {[
              { key: "fire" as const, icon: Flame },
              { key: "rocket" as const, icon: Rocket },
              { key: "skull" as const, icon: Skull },
            ].map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => react(key)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer"
                style={{ background: "var(--bg-elevated)", color: "var(--fg-dim)", border: "1px solid var(--border)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-light)"; e.currentTarget.style.color = "var(--fg-muted)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--fg-dim)"; }}
              >
                <Icon size={12} />
                <span className="font-mono text-[11px]">{localReactions[key]}</span>
              </button>
            ))}
            <button
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ml-auto"
              style={{ color: "var(--fg-dim)" }}
            >
              <MessageCircle size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
