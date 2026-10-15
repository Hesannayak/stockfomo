"use client";

import Link from "next/link";
import { mockFeed } from "@/lib/mock-data";
import { formatCurrency, timeAgo, getInitials } from "@/lib/utils";

export function FeedSidebar() {
  return (
    <div className="h-full overflow-y-auto" style={{ borderRight: "1px solid var(--border)" }}>
      <div className="px-3 py-3 sticky top-0 z-10" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <h2 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>
          Live Feed
        </h2>
      </div>
      {mockFeed.map((item) => {
        const { trade, user, timestamp } = item;
        const isBuy = trade.direction === "BUY";
        return (
          <Link
            key={item.id}
            href={`/stock/${trade.ticker}`}
            className="flex items-start gap-2 px-3 py-2.5 no-underline transition-colors card-hover"
            style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5"
              style={{ background: "var(--bg-input)", color: "var(--fg-muted)", border: "1px solid var(--border)" }}
            >
              {getInitials(user.displayName)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold truncate">{user.displayName}</span>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{
                    background: isBuy ? "var(--accent-muted)" : "var(--red-muted)",
                    color: isBuy ? "var(--accent)" : "var(--red)",
                  }}
                >
                  {trade.direction}
                </span>
                <span className="text-[11px] ml-auto shrink-0" style={{ color: "var(--fg-dim)" }}>
                  {timeAgo(timestamp)}
                </span>
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--fg-dim)" }}>
                <span className="font-semibold" style={{ color: "var(--fg-muted)" }}>{trade.ticker}</span>
                {" "}{formatCurrency(trade.entryPrice)} × {trade.quantity}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
