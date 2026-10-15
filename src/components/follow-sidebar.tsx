"use client";

import { useState } from "react";
import Link from "next/link";
import { mockUsers, mockTrades } from "@/lib/mock-data";
import { formatCurrency, timeAgo, getInitials } from "@/lib/utils";

export function FollowSidebar() {
  const suggestedUsers = mockUsers.filter((u) => u.isVerified || (u.followerCount ?? 0) > 1000);
  const [following, setFollowing] = useState<Set<string>>(new Set());

  return (
    <div className="h-full overflow-y-auto" style={{ borderLeft: "1px solid var(--border)" }}>
      <div className="px-4 py-3 sticky top-0 z-10" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <h2 className="section-header">Follow Top Traders</h2>
      </div>
      {suggestedUsers.map((user, i) => (
        <div
          key={user.id}
          className={`flex items-center gap-2.5 px-4 py-2.5 transition-colors card-hover animate-slide stagger-${Math.min(i + 1, 8)}`}
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <Link
            href={`/profile/${user.username}`}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 no-underline"
            style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)" }}
          >
            {getInitials(user.displayName)}
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <Link href={`/profile/${user.username}`} className="text-sm font-medium truncate no-underline hover:underline" style={{ color: "var(--fg)" }}>
                {user.displayName}
              </Link>
              {user.isVerified && (
                <span className="pro-badge">PRO</span>
              )}
            </div>
            <div className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>
              @{user.username}
            </div>
          </div>
          <button
            onClick={() => setFollowing((prev) => {
              const next = new Set(prev);
              next.has(user.id) ? next.delete(user.id) : next.add(user.id);
              return next;
            })}
            className="px-2.5 py-1 rounded-md text-[13px] font-medium cursor-pointer shrink-0 transition-all active:scale-90"
            style={{
              background: following.has(user.id) ? "var(--bg-elevated)" : "var(--fg)",
              color: following.has(user.id) ? "var(--fg-muted)" : "#fff",
              border: following.has(user.id) ? "1px solid var(--border)" : "1px solid transparent",
            }}
          >
            {following.has(user.id) ? "Following" : "Follow"}
          </button>
        </div>
      ))}

      <div className="px-4 py-3 sticky top-0 z-10" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", borderTop: "1px solid var(--border)" }}>
        <h2 className="section-header">Recent Activity</h2>
      </div>
      {mockTrades.slice(0, 6).map((trade) => {
        const user = mockUsers.find((u) => u.id === trade.userId);
        const isBuy = trade.direction === "BUY";
        return (
          <Link
            key={trade.id}
            href={`/stock/${trade.ticker}`}
            className="flex items-start gap-2.5 px-4 py-2.5 no-underline transition-colors card-hover"
            style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
          >
            <div
              className="w-2 h-2 rounded-full shrink-0 mt-1.5"
              style={{ background: isBuy ? "var(--green)" : "var(--red)" }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[13px]">
                <span className="font-semibold">{user?.displayName}</span>
                {" "}
                <span style={{ color: "var(--fg-muted)" }}>
                  {isBuy ? "bought" : "sold"} {trade.ticker} @ {formatCurrency(trade.entryPrice)}
                </span>
              </div>
              <div className="text-[13px] font-mono mt-0.5" style={{ color: "var(--fg-dim)" }}>
                {timeAgo(trade.createdAt)}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
