"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { mockTrades, mockPositions, mockUsers } from "@/lib/mock-data";
import { formatCurrency, formatPercent, getInitials, timeAgo } from "@/lib/utils";
import {
  Settings,
  LogOut,
  Shield,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);

  if (!isLoggedIn || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4"
          style={{ background: "var(--bg-input)", color: "var(--fg-dim)" }}
        >
          ?
        </div>
        <h2 className="text-xl font-bold mb-2">Not Logged In</h2>
        <p className="text-sm mb-6" style={{ color: "var(--fg-dim)" }}>
          Log in to track your portfolio and trades
        </p>
        <button
          onClick={() => router.push("/login")}
          className="px-8 py-3 rounded-xl text-sm font-bold cursor-pointer"
          style={{ background: "var(--accent)", color: "#000" }}
        >
          Log In
        </button>
      </div>
    );
  }

  const displayUser = mockUsers.find((u) => u.username === user.username) ?? user;
  const userTrades = mockTrades.filter((t) => t.userId === displayUser.id);
  const userPositions = mockPositions.filter((p) => p.userId === displayUser.id);
  const totalValue = displayUser.virtualBalance;
  const invested = userPositions.reduce((sum, p) => sum + (p.marketValue ?? 0), 0);

  return (
    <div>
      {/* Profile Header */}
      <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ background: "var(--bg-input)", color: "var(--fg-muted)" }}
            >
              {getInitials(displayUser.displayName)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg font-bold">{displayUser.displayName}</h1>
                {displayUser.isVerified && <Shield size={14} style={{ color: "var(--accent)" }} />}
              </div>
              <div className="text-xs" style={{ color: "var(--fg-dim)" }}>@{displayUser.username}</div>
            </div>
          </div>
          <div className="flex gap-1">
            <button className="p-2 rounded-lg cursor-pointer" style={{ color: "var(--fg-dim)" }}>
              <Settings size={18} />
            </button>
            <button
              onClick={() => { logout(); router.push("/login"); }}
              className="p-2 rounded-lg cursor-pointer"
              style={{ color: "var(--fg-dim)" }}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {displayUser.bio && (
          <p className="text-sm mb-3" style={{ color: "var(--fg-muted)" }}>{displayUser.bio}</p>
        )}

        <div className="flex gap-4 text-sm">
          <span>
            <strong>{displayUser.followerCount?.toLocaleString() ?? 0}</strong>{" "}
            <span style={{ color: "var(--fg-dim)" }}>followers</span>
          </span>
          <span>
            <strong>{displayUser.followingCount?.toLocaleString() ?? 0}</strong>{" "}
            <span style={{ color: "var(--fg-dim)" }}>following</span>
          </span>
        </div>
      </div>

      {/* Portfolio Value */}
      <div className="px-4 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--fg-dim)" }}>
            Portfolio Value
          </span>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="cursor-pointer"
            style={{ color: "var(--fg-dim)" }}
          >
            {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
        </div>
        <div className="text-3xl font-black font-mono">
          {showBalance ? formatCurrency(totalValue) : "••••••"}
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          {displayUser.totalPnl >= 0
            ? <TrendingUp size={14} style={{ color: "var(--accent)" }} />
            : <TrendingDown size={14} style={{ color: "var(--red)" }} />
          }
          <span
            className="text-sm font-semibold font-mono"
            style={{ color: displayUser.totalPnl >= 0 ? "var(--accent)" : "var(--red)" }}
          >
            {displayUser.totalPnl >= 0 ? "+" : ""}{formatCurrency(displayUser.totalPnl)} all time
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        className="grid grid-cols-4 gap-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {[
          { label: "Cash", value: showBalance ? formatCurrency(totalValue - invested) : "••••" },
          { label: "Invested", value: showBalance ? formatCurrency(invested) : "••••" },
          { label: "Win Rate", value: `${displayUser.winRate}%` },
          { label: "Trades", value: displayUser.tradeCount.toString() },
        ].map((stat) => (
          <div key={stat.label} className="text-center py-3" style={{ borderRight: "1px solid var(--border)" }}>
            <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--fg-dim)" }}>
              {stat.label}
            </div>
            <div className="text-sm font-bold font-mono mt-0.5">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Open Positions */}
      {userPositions.length > 0 && (
        <div>
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>
              Open Positions
            </h2>
            <span className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>
              {userPositions.length} positions
            </span>
          </div>
          {userPositions.map((pos) => {
            const pnl = pos.unrealizedPnl ?? 0;
            const isUp = pnl >= 0;
            return (
              <Link
                key={pos.id}
                href={`/stock/${pos.ticker}`}
                className="flex items-center justify-between px-4 py-3 no-underline"
                style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{pos.ticker}</span>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{
                        background: isUp ? "var(--accent-muted)" : "var(--red-muted)",
                        color: isUp ? "var(--accent)" : "var(--red)",
                      }}
                    >
                      {isUp ? "+" : ""}{formatPercent(pos.unrealizedPnlPercent ?? 0)}
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: "var(--fg-dim)" }}>
                    {pos.quantity} shares · avg {formatCurrency(pos.avgEntryPrice)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-sm font-mono font-semibold">
                      {formatCurrency(pos.currentPrice ?? pos.avgEntryPrice)}
                    </div>
                    <div
                      className="text-xs font-mono"
                      style={{ color: isUp ? "var(--accent)" : "var(--red)" }}
                    >
                      {isUp ? "+" : ""}{formatCurrency(pnl)}
                    </div>
                  </div>
                  <ChevronRight size={14} style={{ color: "var(--fg-dim)" }} />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Trade History */}
      <div>
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>
            Trade History
          </h2>
        </div>
        {userTrades.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-sm" style={{ color: "var(--fg-dim)" }}>No trades yet</p>
            <button
              onClick={() => router.push("/trade")}
              className="mt-3 px-6 py-2 rounded-lg text-sm font-semibold cursor-pointer"
              style={{ background: "var(--accent)", color: "#000" }}
            >
              Make Your First Trade
            </button>
          </div>
        ) : (
          userTrades.map((trade) => {
            const isBuy = trade.direction === "BUY";
            const pnl = trade.pnlAmount ?? 0;
            const isUp = pnl >= 0;
            return (
              <Link
                key={trade.id}
                href={`/stock/${trade.ticker}`}
                className="flex items-center gap-3 px-4 py-3 no-underline"
                style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
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
                  <div
                    className="text-sm font-mono font-semibold"
                    style={{ color: isUp ? "var(--accent)" : "var(--red)" }}
                  >
                    {isUp ? "+" : ""}{formatCurrency(pnl)}
                  </div>
                )}
                <ChevronRight size={14} style={{ color: "var(--fg-dim)" }} />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
