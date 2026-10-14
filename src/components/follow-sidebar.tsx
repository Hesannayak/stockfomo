"use client";

import Link from "next/link";
import { mockUsers, mockTrades } from "@/lib/mock-data";
import { formatCurrency, timeAgo, getInitials } from "@/lib/utils";
import { Shield, UserPlus } from "lucide-react";

export function FollowSidebar() {
  const suggestedUsers = mockUsers.filter((u) => u.isVerified || (u.followerCount ?? 0) > 1000);

  return (
    <div className="h-full overflow-y-auto" style={{ borderLeft: "1px solid var(--border)" }}>
      {/* Follow Suggestions */}
      <div className="px-3 py-3 sticky top-0" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>
          Follow Top Traders
        </h2>
      </div>
      {suggestedUsers.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-2 px-3 py-2.5"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <Link
            href={`/profile/${user.username}`}
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 no-underline"
            style={{ background: "var(--bg-input)", color: "var(--fg-muted)" }}
          >
            {getInitials(user.displayName)}
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <Link href={`/profile/${user.username}`} className="text-xs font-semibold truncate no-underline" style={{ color: "var(--fg)" }}>
                {user.displayName}
              </Link>
              {user.isVerified && <Shield size={10} style={{ color: "var(--accent)" }} />}
            </div>
            <div className="text-[10px]" style={{ color: "var(--fg-dim)" }}>@{user.username}</div>
          </div>
          <button
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer shrink-0"
            style={{ background: "var(--accent)", color: "#000" }}
          >
            Follow
          </button>
        </div>
      ))}

      {/* Recent Activity */}
      <div className="px-3 py-3 sticky top-0" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", borderTop: "1px solid var(--border)" }}>
        <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>
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
            className="flex items-center gap-2 px-3 py-2 no-underline"
            style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold truncate">{user?.displayName}</span>
                <span
                  className="text-[9px] font-bold px-1 py-0.5 rounded"
                  style={{
                    background: isBuy ? "var(--accent-muted)" : "var(--red-muted)",
                    color: isBuy ? "var(--accent)" : "var(--red)",
                  }}
                >
                  {trade.direction}
                </span>
              </div>
              <div className="text-[10px]" style={{ color: "var(--fg-dim)" }}>
                {trade.ticker} · {formatCurrency(trade.entryPrice)} · {timeAgo(trade.createdAt)}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
