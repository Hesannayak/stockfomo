"use client";

import { mockUsers, mockTrades, mockPositions } from "@/lib/mock-data";
import { PortfolioSummary } from "@/components/portfolio-summary";
import { formatCurrency, formatPercent, getInitials, timeAgo } from "@/lib/utils";
import { Shield, UserPlus, ArrowUp, ArrowDown } from "lucide-react";

export function ProfileContent({ username }: { username: string }) {
  const user = mockUsers.find((u) => u.username === username) ?? mockUsers[0];
  const userTrades = mockTrades.filter((t) => t.userId === user.id);
  const userPositions = mockPositions.filter((p) => p.userId === user.id);

  return (
    <div className="animate-in">
      {/* Profile Header */}
      <div className="p-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
            style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)" }}
          >
            {getInitials(user.displayName)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold">{user.displayName}</h1>
              {user.isVerified && (
                <Shield size={16} style={{ color: "var(--blue)" }} />
              )}
            </div>
            <div className="text-sm font-mono" style={{ color: "var(--fg-dim)" }}>
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
        <button
          className="mt-4 py-2.5 px-8 rounded-md text-sm font-medium flex items-center justify-center gap-2 cursor-pointer btn-primary"
        >
          <UserPlus size={16} />
          Follow
        </button>
      </div>

      {/* Stats Row */}
      <div
        className="grid grid-cols-3 gap-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {[
          { label: "Total P&L", value: formatCurrency(user.totalPnl), color: user.totalPnl >= 0 ? "var(--green)" : "var(--red)" },
          { label: "Win Rate", value: `${user.winRate}%`, color: "var(--fg)" },
          { label: "Trades", value: user.tradeCount.toString(), color: "var(--fg)" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="text-center py-3"
            style={{ borderRight: i < 2 ? "1px solid var(--border)" : "none" }}
          >
            <div className="section-header mb-0.5">{stat.label}</div>
            <div className="text-sm font-bold font-mono mt-0.5" style={{ color: stat.color }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Positions */}
      {userPositions.length > 0 && (
        <div>
          <div className="px-4 pt-4 pb-2">
            <h2 className="section-header">Open Positions</h2>
          </div>
          <PortfolioSummary balance={user.virtualBalance} positions={userPositions} />
          <div style={{ borderBottom: "1px solid var(--border)" }}>
            {userPositions.map((pos) => {
              const pnl = pos.unrealizedPnl ?? 0;
              const isUp = pnl >= 0;
              return (
                <div
                  key={pos.id}
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <div>
                    <div className="font-bold text-sm">{pos.ticker}</div>
                    <div className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>
                      {pos.quantity} shares @ {formatCurrency(pos.avgEntryPrice)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-semibold">
                      {formatCurrency(pos.currentPrice ?? pos.avgEntryPrice)}
                    </div>
                    <div
                      className="text-xs font-mono font-semibold"
                      style={{ color: isUp ? "var(--green)" : "var(--red)" }}
                    >
                      {formatPercent(pos.unrealizedPnlPercent ?? 0)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Trade History */}
      <div>
        <div className="px-4 pt-4 pb-2">
          <h2 className="section-header">Recent Trades</h2>
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
                  background: isBuy ? "var(--green-muted)" : "var(--red-muted)",
                  color: isBuy ? "var(--green)" : "var(--red)",
                }}
              >
                {isBuy ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{trade.ticker}</span>
                  <span
                    className="stat-pill"
                    style={{
                      background: trade.status === "OPEN" ? "var(--yellow-muted)" : "var(--bg-elevated)",
                      color: trade.status === "OPEN" ? "var(--yellow)" : "var(--fg-dim)",
                      fontSize: "10px",
                    }}
                  >
                    {trade.status}
                  </span>
                </div>
                <div className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>
                  {trade.quantity} @ {formatCurrency(trade.entryPrice)} · {timeAgo(trade.createdAt)}
                </div>
              </div>
              {trade.status === "CLOSED" && (
                <div className="text-right">
                  <div
                    className="text-sm font-mono font-semibold"
                    style={{ color: isUp ? "var(--green)" : "var(--red)" }}
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
