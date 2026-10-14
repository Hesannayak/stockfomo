"use client";

import { mockUsers, mockTrades, mockPositions } from "@/lib/mock-data";
import { PortfolioSummary } from "@/components/portfolio-summary";
import { formatCurrency, formatPercent, getInitials, timeAgo } from "@/lib/utils";
import { Settings, ArrowUp, ArrowDown } from "lucide-react";

export default function MyProfilePage() {
  const user = mockUsers[0];
  const userTrades = mockTrades.filter((t) => t.userId === user.id);
  const userPositions = mockPositions.filter((p) => p.userId === user.id);

  return (
    <div>
      {/* Header */}
      <div className="p-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
            style={{ background: "var(--bg-input)", color: "var(--fg-muted)" }}
          >
            {getInitials(user.displayName)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">{user.displayName}</h1>
              <button
                className="p-2 rounded-lg cursor-pointer"
                style={{ background: "var(--bg-card)" }}
              >
                <Settings size={18} style={{ color: "var(--fg-muted)" }} />
              </button>
            </div>
            <div className="text-sm" style={{ color: "var(--fg-dim)" }}>
              @{user.username}
            </div>
            {user.bio && (
              <p className="text-sm mt-2" style={{ color: "var(--fg-muted)" }}>
                {user.bio}
              </p>
            )}
            <div className="flex gap-4 mt-3 text-sm">
              <span>
                <strong>{user.followerCount?.toLocaleString()}</strong>{" "}
                <span style={{ color: "var(--fg-dim)" }}>followers</span>
              </span>
              <span>
                <strong>{user.followingCount?.toLocaleString()}</strong>{" "}
                <span style={{ color: "var(--fg-dim)" }}>following</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio */}
      <PortfolioSummary balance={user.virtualBalance} positions={userPositions} />

      {/* Positions */}
      {userPositions.length > 0 && (
        <div style={{ borderTop: "1px solid var(--border)" }}>
          <div className="px-4 pt-4 pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>
              Open Positions
            </h2>
          </div>
          {userPositions.map((pos) => {
            const pnl = pos.unrealizedPnl ?? 0;
            const isUp = pnl >= 0;
            return (
              <div
                key={pos.id}
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div>
                  <div className="font-bold text-sm">{pos.ticker}</div>
                  <div className="text-xs" style={{ color: "var(--fg-dim)" }}>
                    {pos.quantity} shares @ {formatCurrency(pos.avgEntryPrice)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-semibold">
                    {formatCurrency(pos.currentPrice ?? pos.avgEntryPrice)}
                  </div>
                  <div
                    className="text-xs font-mono font-semibold"
                    style={{ color: isUp ? "var(--accent)" : "var(--red)" }}
                  >
                    {formatPercent(pos.unrealizedPnlPercent ?? 0)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Trade History */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>
            Recent Trades
          </h2>
        </div>
        {userTrades.map((trade) => {
          const isBuy = trade.direction === "BUY";
          const pnl = trade.pnlAmount ?? 0;
          const isUp = pnl >= 0;
          return (
            <div
              key={trade.id}
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: isBuy ? "var(--accent-muted)" : "var(--red-muted)",
                  color: isBuy ? "var(--accent)" : "var(--red)",
                }}
              >
                {isBuy ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{trade.ticker}</span>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      background: trade.status === "OPEN" ? "var(--yellow-muted)" : "var(--bg-input)",
                      color: trade.status === "OPEN" ? "var(--yellow)" : "var(--fg-dim)",
                    }}
                  >
                    {trade.status}
                  </span>
                </div>
                <div className="text-xs" style={{ color: "var(--fg-dim)" }}>
                  {trade.quantity} @ {formatCurrency(trade.entryPrice)} · {timeAgo(trade.createdAt)}
                </div>
              </div>
              {trade.status === "CLOSED" && (
                <div className="text-right">
                  <div
                    className="text-sm font-mono font-semibold"
                    style={{ color: isUp ? "var(--accent)" : "var(--red)" }}
                  >
                    {formatCurrency(pnl)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
