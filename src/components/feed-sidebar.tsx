"use client";

import Link from "next/link";
import { mockFeed } from "@/lib/mock-data";
import { formatCurrency, timeAgo, getInitials } from "@/lib/utils";

export function FeedSidebar() {
  return (
    <div className="h-full overflow-y-auto" style={{ borderRight: "1px solid var(--border)" }}>
      <div className="px-4 py-3 sticky top-0 z-10" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <h2 className="section-header flex items-center gap-1.5">
          <span className="live-dot" />
          Live Feed
        </h2>
      </div>
      {mockFeed.filter((item) => item.type === "trade").map((item) => {
        const { trade, user, timestamp } = item;
        const isBuy = trade.direction === "BUY";
        return (
          <Link
            key={item.id}
            href={`/stock/${trade.ticker}`}
            className="flex items-start gap-2.5 px-4 py-3 no-underline transition-colors card-hover"
            style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5"
              style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)" }}
            >
              {getInitials(user.displayName)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-semibold truncate">{user.displayName}</span>
                <span
                  className="stat-pill"
                  style={{
                    background: isBuy ? "var(--green-muted)" : "var(--red-muted)",
                    color: isBuy ? "var(--green)" : "var(--red)",
                    fontSize: "11px",
                    padding: "1px 6px",
                  }}
                >
                  {trade.direction}
                </span>
                <span className="text-[13px] ml-auto shrink-0 font-mono" style={{ color: "var(--fg-dim)" }}>
                  {timeAgo(timestamp)}
                </span>
              </div>
              <div className="text-[13px] font-mono mt-0.5" style={{ color: "var(--fg-dim)" }}>
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
