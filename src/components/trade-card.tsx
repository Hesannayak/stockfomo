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

  function react(key: keyof typeof localReactions, e: React.MouseEvent<HTMLButtonElement>) {
    setLocalReactions((prev) => ({ ...prev, [key]: prev[key] + 1 }));
    const btn = e.currentTarget;
    btn.classList.remove("animate-pop");
    void btn.offsetWidth;
    btn.classList.add("animate-pop");
  }

  return (
    <div
      className="px-4 py-3.5 transition-colors card-hover"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex items-start gap-3">
        <Link
          href={`/profile/${user.username}`}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 no-underline"
          style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)" }}
        >
          {getInitials(user.displayName)}
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link href={`/profile/${user.username}`} className="font-semibold text-sm no-underline hover:underline" style={{ color: "var(--fg)" }}>
              {user.displayName}
            </Link>
            {user.isVerified && (
              <span className="pro-badge">PRO</span>
            )}
            <span className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>
              @{user.username}
            </span>
            <span className="text-xs font-mono ml-auto shrink-0" style={{ color: "var(--fg-dim)" }}>
              {timeAgo(timestamp)}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span
              className="stat-pill uppercase tracking-wide"
              style={{
                background: isBuy ? "var(--green-muted)" : "var(--red-muted)",
                color: isBuy ? "var(--green)" : "var(--red)",
                fontSize: "11px",
              }}
            >
              {trade.direction}
            </span>
            <Link
              href={`/stock/${trade.ticker}`}
              className="font-bold text-sm no-underline hover:underline"
              style={{ color: "var(--fg)" }}
            >
              {trade.ticker}
            </Link>
            <span className="text-[13px] font-mono" style={{ color: "var(--fg-muted)" }}>
              {trade.quantity} shares @ {formatCurrency(trade.entryPrice)}
            </span>
          </div>

          {pnl !== null && pnlPct !== null && (
            <div
              className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold px-2.5 py-1 rounded-md"
              style={{
                background: isPositive ? "var(--green-muted)" : "var(--red-muted)",
                color: isPositive ? "var(--green)" : "var(--red)",
              }}
            >
              <span className="font-mono">{formatCurrency(pnl)}</span>
              <span style={{ opacity: 0.5 }}>({formatPercent(pnlPct)})</span>
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

          <div className="mt-2.5 flex items-center gap-1">
            {[
              { key: "fire" as const, icon: Flame },
              { key: "rocket" as const, icon: Rocket },
              { key: "skull" as const, icon: Skull },
            ].map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={(e) => react(key, e)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all cursor-pointer hover:bg-[var(--bg-elevated)]"
                style={{ color: "var(--fg-dim)" }}
              >
                <Icon size={12} />
                <span className="font-mono text-[11px]">{localReactions[key]}</span>
              </button>
            ))}
            <button
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all cursor-pointer ml-auto hover:bg-[var(--bg-elevated)]"
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
