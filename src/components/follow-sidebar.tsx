"use client";

import Link from "next/link";
import { mockUsers, mockTrades } from "@/lib/mock-data";
import { formatCurrency, timeAgo, getInitials } from "@/lib/utils";
import { Shield, UserPlus } from "lucide-react";

export function FollowSidebar() {
  const suggestedUsers = mockUsers.filter((u) => u.isVerified || (u.followerCount ?? 0) > 1000);

  return (
    <div className="h-full overflow-y-auto" style={{ borderLeft: "1px solid var(--border)" }}>
      <div className="px-4 py-3 sticky top-0 z-10" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <h2 className="section-header flex items-center gap-1.5">
          <UserPlus size={11} /> Suggested Traders
        </h2>
      </div>
      {suggestedUsers.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-3 px-4 py-3 transition-colors card-hover"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <Link
            href={`/profile/${user.username}`}
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 no-underline"
            style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)", border: "1.5px solid var(--border)" }}
          >
            {getInitials(user.displayName)}
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <Link href={`/profile/${user.username}`} className="text-[13px] font-semibold truncate no-underline hover:underline" style={{ color: "var(--fg)" }}>
                {user.displayName}
              </Link>
              {user.isVerified && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "var(--accent-muted)", color: "var(--accent)" }}>PRO</span>
              )}
            </div>
            <div className="text-[11px] font-mono" style={{ color: "var(--fg-dim)" }}>
              {user.winRate}% win · {user.tradeCount} trades
            </div>
          </div>
          <button
            className="px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer shrink-0 transition-all hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Follow
          </button>
        </div>
      ))}

      <div className="px-4 py-3 sticky top-0 z-10" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", borderTop: "1px solid var(--border)" }}>
        <h2 className="section-header flex items-center gap-1.5">
          <span className="live-dot" />
          Recent Activity
        </h2>
      </div>
      {mockTrades.slice(0, 6).map((trade) => {
        const user = mockUsers.find((u) => u.id === trade.userId);
        const isBuy = trade.direction === "BUY";
        return (
          <Link
            key={trade.id}
            href={`/stock/${trade.ticker}`}
            className="flex items-center gap-2.5 px-4 py-2.5 no-underline transition-colors card-hover"
            style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold truncate">{user?.displayName}</span>
                <span
                  className="stat-pill"
                  style={{
                    background: isBuy ? "var(--accent-muted)" : "var(--red-muted)",
                    color: isBuy ? "var(--accent)" : "var(--red)",
                    fontSize: "10px",
                    padding: "1px 6px",
                  }}
                >
                  {trade.direction}
                </span>
              </div>
              <div className="text-[11px] font-mono mt-0.5" style={{ color: "var(--fg-dim)" }}>
                {trade.ticker} · {formatCurrency(trade.entryPrice)} · {timeAgo(trade.createdAt)}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
