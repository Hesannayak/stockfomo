"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { mockTrades, mockPositions, mockUsers, mockLeaderboard, mockQuotes, trendingTickers } from "@/lib/mock-data";
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
  Trophy,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { FollowSidebar } from "@/components/follow-sidebar";

export default function ProfilePage() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);

  const rankColors = ["var(--gold)", "var(--silver)", "var(--bronze)"];

  if (!isLoggedIn || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4"
          style={{ background: "var(--bg-elevated)", color: "var(--fg-dim)" }}
        >
          ?
        </div>
        <h2 className="text-lg font-bold mb-2">Not Logged In</h2>
        <p className="text-sm mb-6" style={{ color: "var(--fg-dim)" }}>
          Log in to track your portfolio and trades
        </p>
        <button
          onClick={() => router.push("/login")}
          className="px-8 py-2.5 rounded-md text-sm font-medium cursor-pointer btn-primary"
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

  const profileContent = (
    <div className="animate-in">
      {/* Profile Header */}
      <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)" }}
            >
              {getInitials(displayUser.displayName)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold">{displayUser.displayName}</h1>
                {displayUser.isVerified && <Shield size={14} style={{ color: "var(--blue)" }} />}
              </div>
              <div className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>@{displayUser.username}</div>
            </div>
          </div>
          <div className="flex gap-1">
            <button className="p-2 rounded-lg cursor-pointer btn-ghost">
              <Settings size={18} />
            </button>
            <button
              onClick={() => { logout(); router.push("/login"); }}
              className="p-2 rounded-lg cursor-pointer btn-ghost"
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
          <span className="section-header">Portfolio Value</span>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="cursor-pointer"
            style={{ color: "var(--fg-dim)" }}
          >
            {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
        </div>
        <div className="text-2xl font-bold font-mono">
          {showBalance ? formatCurrency(totalValue) : "••••••"}
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          {displayUser.totalPnl >= 0
            ? <TrendingUp size={14} style={{ color: "var(--green)" }} />
            : <TrendingDown size={14} style={{ color: "var(--red)" }} />
          }
          <span
            className="text-sm font-semibold font-mono"
            style={{ color: displayUser.totalPnl >= 0 ? "var(--green)" : "var(--red)" }}
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
        ].map((stat, i) => (
          <div key={stat.label} className="text-center py-3" style={{ borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
            <div className="section-header mb-0.5">{stat.label}</div>
            <div className="text-sm font-bold font-mono">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Open Positions */}
      {userPositions.length > 0 && (
        <div>
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <h2 className="section-header">Open Positions</h2>
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
                className="flex items-center justify-between px-4 py-3 no-underline transition-colors card-hover"
                style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{pos.ticker}</span>
                    <span
                      className="stat-pill"
                      style={{
                        background: isUp ? "var(--green-muted)" : "var(--red-muted)",
                        color: isUp ? "var(--green)" : "var(--red)",
                        fontSize: "10px",
                      }}
                    >
                      {isUp ? "+" : ""}{formatPercent(pos.unrealizedPnlPercent ?? 0)}
                    </span>
                  </div>
                  <div className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>
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
                      style={{ color: isUp ? "var(--green)" : "var(--red)" }}
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
          <h2 className="section-header">Trade History</h2>
        </div>
        {userTrades.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-sm" style={{ color: "var(--fg-dim)" }}>No trades yet</p>
            <button
              onClick={() => router.push("/trade")}
              className="mt-3 px-6 py-2 rounded-md text-sm font-medium cursor-pointer btn-primary"
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
                className="flex items-center gap-3 px-4 py-3 no-underline transition-colors card-hover"
                style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
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
                  <div
                    className="text-sm font-mono font-semibold"
                    style={{ color: isUp ? "var(--green)" : "var(--red)" }}
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

  return (
    <div className="lg:grid lg:grid-cols-[240px_1fr_260px]">
      {/* Left Sidebar — Leaderboard (desktop) */}
      <div className="desktop-sidebar" style={{ borderRight: "1px solid var(--border)" }}>
        <div className="px-4 py-3 sticky top-0 z-10" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
          <h2 className="section-header flex items-center gap-1.5">
            <Trophy size={11} /> Leaderboard
          </h2>
        </div>
        {mockLeaderboard.map((entry, i) => (
          <Link
            key={entry.user.id}
            href={`/profile/${entry.user.username}`}
            className="flex items-center gap-2.5 px-4 py-2.5 no-underline transition-colors card-hover"
            style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
          >
            <div
              className="w-6 text-right text-[12px] font-mono shrink-0"
              style={{
                color: i < 3 ? rankColors[i] : "var(--fg-dim)",
                fontStyle: "italic",
                fontWeight: i < 3 ? 700 : 400,
              }}
            >
              {String(entry.rank).padStart(2, "0")}
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)" }}
            >
              {getInitials(entry.user.displayName)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold truncate">{entry.user.displayName}</span>
                {entry.user.isVerified && (
                  <span className="pro-badge">PRO</span>
                )}
              </div>
              <div className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>
                {entry.tradeCount} trades · {entry.winRate}%
              </div>
            </div>
            <div
              className="text-xs font-bold font-mono shrink-0"
              style={{ color: entry.totalReturn >= 0 ? "var(--green)" : "var(--red)" }}
            >
              {formatPercent(entry.totalReturn)}
            </div>
          </Link>
        ))}

        <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="section-header mb-3">Trending</h2>
          {trendingTickers.map((t) => {
            const quote = mockQuotes[t.ticker];
            const isUp = quote?.changePercent >= 0;
            return (
              <Link
                key={t.ticker}
                href={`/stock/${t.ticker}`}
                className="flex items-center justify-between py-1.5 no-underline transition-opacity hover:opacity-80"
                style={{ color: "var(--fg)" }}
              >
                <div>
                  <span className="text-xs font-bold">{t.ticker}</span>
                  <span className="text-xs ml-1.5 font-mono" style={{ color: "var(--fg-dim)" }}>{t.name.split(" ")[0]}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono">${quote?.price.toFixed(2)}</span>
                  <span
                    className="stat-pill"
                    style={{
                      color: isUp ? "var(--green)" : "var(--red)",
                      background: isUp ? "var(--green-muted)" : "var(--red-muted)",
                      fontSize: "10px",
                    }}
                  >
                    {isUp ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                    {isUp ? "+" : ""}{quote?.changePercent.toFixed(2)}%
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Center — Profile Content */}
      <div className="lg:border-r" style={{ borderColor: "var(--border)" }}>
        {profileContent}
      </div>

      {/* Right Sidebar — Follow Suggestions (desktop) */}
      <div className="desktop-sidebar">
        <FollowSidebar />
      </div>
    </div>
  );
}
