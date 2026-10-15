"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Bell,
  TrendingUp,
  TrendingDown,
  Shield,
} from "lucide-react";
import { StockChart } from "@/components/stock-chart";
import { FeedSidebar } from "@/components/feed-sidebar";
import { ThesisThread } from "@/components/thesis-thread";
import { getStockDetail, getStockCandles } from "@/lib/stock-data";
import { mockTrades, mockUsers, mockTheses } from "@/lib/mock-data";
import { formatCurrency, timeAgo, getInitials } from "@/lib/utils";

const TIME_RANGES = ["1W", "1M", "3M", "1Y", "5Y"] as const;

export function StockDetailContent({ ticker }: { ticker: string }) {
  const router = useRouter();
  const stock = getStockDetail(ticker);
  const [range, setRange] = useState<string>("1M");
  const [orderSide, setOrderSide] = useState<"BUY" | "SELL">("BUY");
  const [quantity, setQuantity] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [watchlisted, setWatchlisted] = useState(false);

  const candles = useMemo(() => getStockCandles(ticker, range), [ticker, range]);
  const recentTrades = mockTrades
    .filter((t) => t.ticker === ticker)
    .map((t) => ({ ...t, user: mockUsers.find((u) => u.id === t.userId) }));

  const tickerTheses = mockTheses
    .filter((th) => th.ticker === ticker)
    .map((th) => ({ ...th, user: mockUsers.find((u) => u.id === th.userId) }));

  if (!stock) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg font-bold mb-2">Ticker not found</p>
        <p className="text-sm" style={{ color: "var(--fg-dim)" }}>&quot;{ticker}&quot; is not available</p>
        <button onClick={() => router.back()} className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer btn-ghost" style={{ border: "1px solid var(--border)" }}>Go Back</button>
      </div>
    );
  }

  const isUp = stock.change >= 0;
  const qty = parseInt(quantity) || 0;
  const total = qty * stock.price;

  function handleOrder() {
    if (qty <= 0) return;
    setOrderPlaced(true);
    setTimeout(() => { setOrderPlaced(false); setQuantity(""); }, 2500);
  }

  const presets = [10, 25, 50, 100];

  return (
    <div className="lg:grid lg:grid-cols-[240px_1fr_300px]">
      {/* Left Sidebar — Feed (desktop) */}
      <div className="desktop-sidebar">
        <FeedSidebar />
      </div>

      {/* Center — Chart + Stats */}
      <div style={{ borderRight: "1px solid var(--border)" }}>
        {/* Top bar with stock info */}
        <div className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
          <button onClick={() => router.back()} className="cursor-pointer p-1 lg:hidden" style={{ color: "var(--fg)" }}>
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <h1 className="text-base font-bold">{stock.ticker}</h1>
            <span className="text-xs px-2 py-0.5 rounded-md font-medium font-mono" style={{ background: "var(--bg-elevated)", color: "var(--fg-dim)", border: "1px solid var(--border)" }}>
              {stock.name}
            </span>
          </div>

          {/* Desktop inline stats */}
          <div className="hidden lg:flex items-center gap-4 text-xs">
            {[
              { label: "Mkt Cap", value: stock.marketCap },
              { label: "P/E", value: stock.peRatio.toFixed(1) },
              { label: "Vol", value: stock.volume },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="section-header" style={{ fontSize: "10px" }}>{s.label}</div>
                <div className="font-mono font-semibold">{s.value}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setWatchlisted(!watchlisted)} className="p-2 cursor-pointer" style={{ color: watchlisted ? "var(--yellow)" : "var(--fg-dim)" }}>
            <Star size={18} fill={watchlisted ? "var(--yellow)" : "none"} />
          </button>
          <button className="p-2 cursor-pointer" style={{ color: "var(--fg-dim)" }}>
            <Bell size={18} />
          </button>
        </div>

        {/* Price */}
        <div className="px-4 pt-3 pb-2 animate-in">
          <div className="text-2xl font-bold font-mono">{formatCurrency(stock.price)}</div>
          <div className="flex items-center gap-1.5 mt-1">
            {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span className="text-sm font-semibold font-mono" style={{ color: isUp ? "var(--green)" : "var(--red)" }}>
              {isUp ? "+" : ""}{formatCurrency(stock.change)} ({isUp ? "+" : ""}{stock.changePercent.toFixed(2)}%)
            </span>
            <span className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>Today</span>
          </div>
        </div>

        {/* Chart */}
        <StockChart data={candles} isPositive={isUp} />

        {/* Time Ranges */}
        <div className="flex gap-1.5 px-4 py-3">
          {TIME_RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="flex-1 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-all"
              style={{
                background: range === r ? "var(--fg)" : "transparent",
                color: range === r ? "var(--bg)" : "var(--fg-dim)",
                border: range === r ? "1px solid transparent" : "1px solid var(--border)",
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Stats grid */}
        <div className="px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
          <h2 className="section-header mb-3">Key Statistics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            {[
              { label: "Open", value: formatCurrency(stock.open) },
              { label: "Prev Close", value: formatCurrency(stock.previousClose) },
              { label: "Day High", value: formatCurrency(stock.high) },
              { label: "Day Low", value: formatCurrency(stock.low) },
              { label: "52W High", value: formatCurrency(stock.high52w) },
              { label: "52W Low", value: formatCurrency(stock.low52w) },
              { label: "Market Cap", value: stock.marketCap },
              { label: "P/E Ratio", value: stock.peRatio.toFixed(1) },
              { label: "EPS", value: `$${stock.eps.toFixed(2)}` },
              { label: "Dividend", value: stock.dividend },
              { label: "Volume", value: stock.volume },
              { label: "Avg Volume", value: stock.avgVolume },
            ].map((s) => (
              <div key={s.label} className="flex justify-between items-center py-1">
                <span className="text-xs" style={{ color: "var(--fg-dim)" }}>{s.label}</span>
                <span className="text-xs font-semibold font-mono">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
          <h2 className="section-header mb-2">About</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{stock.about}</p>
        </div>

        {/* Theses Thread */}
        <div style={{ borderTop: "1px solid var(--border)" }}>
          <ThesisThread ticker={ticker} theses={tickerTheses} />
        </div>

        {/* Community Trades — inline on mobile */}
        {recentTrades.length > 0 && (
          <div className="lg:hidden" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="px-4 pt-3 pb-2">
              <h2 className="section-header">Community Trades</h2>
            </div>
            {recentTrades.map((trade) => {
              const isBuy = trade.direction === "BUY";
              return (
                <div key={trade.id} className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)" }}>
                    {trade.user ? getInitials(trade.user.displayName) : "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{trade.user?.displayName}</span>
                      <span className="stat-pill" style={{ background: isBuy ? "var(--green-muted)" : "var(--red-muted)", color: isBuy ? "var(--green)" : "var(--red)", fontSize: "10px" }}>{trade.direction}</span>
                    </div>
                    <div className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>{trade.quantity} shares @ {formatCurrency(trade.entryPrice)} · {timeAgo(trade.createdAt)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Trade panel — mobile only */}
        <div className="lg:hidden px-4 py-4" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex rounded-md overflow-hidden mb-3" style={{ background: "var(--bg-elevated)" }}>
            {(["BUY", "SELL"] as const).map((side) => (
              <button key={side} onClick={() => setOrderSide(side)} className="flex-1 py-2 text-sm font-semibold cursor-pointer transition-all" style={{ background: orderSide === side ? (side === "BUY" ? "var(--green)" : "var(--red)") : "transparent", color: orderSide === side ? "#fff" : "var(--fg-dim)" }}>{side}</button>
            ))}
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <label className="section-header mb-1 block">Shares</label>
              <input type="number" min="1" placeholder="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-sm font-mono outline-none input-field" />
            </div>
            <div className="flex-1">
              <label className="section-header mb-1 block">Est. Total</label>
              <div className="px-3 py-2.5 rounded-lg text-sm font-mono" style={{ background: "var(--bg-elevated)", color: qty > 0 ? "var(--fg)" : "var(--fg-dim)", border: "1px solid var(--border)" }}>{qty > 0 ? formatCurrency(total) : "$0.00"}</div>
            </div>
          </div>
          <button onClick={handleOrder} disabled={qty <= 0 || orderPlaced} className="w-full py-2.5 rounded-md text-sm font-medium cursor-pointer disabled:opacity-50 transition-all" style={{ background: orderPlaced ? "var(--bg-elevated)" : orderSide === "BUY" ? "var(--green)" : "var(--red)", color: orderPlaced ? "var(--green)" : "#fff" }}>
            {orderPlaced ? "Order Placed!" : `${orderSide} ${ticker} · Market Order`}
          </button>
          <p className="text-center text-xs font-mono mt-2" style={{ color: "var(--fg-dim)" }}>Paper trade only · No real money involved</p>
        </div>
      </div>

      {/* Right Sidebar — Buy/Sell Panel (desktop) */}
      <div className="desktop-sidebar" style={{ borderLeft: "1px solid var(--border)" }}>
        <div className="p-4">
          {/* Buy / Sell toggle */}
          <div className="flex rounded-md overflow-hidden mb-4" style={{ background: "var(--bg-elevated)" }}>
            {(["BUY", "SELL"] as const).map((side) => (
              <button key={side} onClick={() => setOrderSide(side)} className="flex-1 py-2.5 text-sm font-semibold cursor-pointer transition-all" style={{ background: orderSide === side ? (side === "BUY" ? "var(--green)" : "var(--red)") : "transparent", color: orderSide === side ? "#fff" : "var(--fg-dim)" }}>{side}</button>
            ))}
          </div>

          {/* Amount presets */}
          <div className="flex gap-2 mb-3">
            {presets.map((p) => (
              <button key={p} onClick={() => setQuantity(String(p))} className="flex-1 py-2 rounded-md text-xs font-semibold cursor-pointer transition-all" style={{ background: quantity === String(p) ? "var(--bg-card-hover)" : "var(--bg-elevated)", color: "var(--fg)", border: quantity === String(p) ? "1px solid var(--fg)" : "1px solid var(--border)" }}>
                {p}
              </button>
            ))}
          </div>

          {/* Shares input */}
          <label className="section-header mb-1 block">Shares</label>
          <input type="number" min="1" placeholder="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-sm font-mono outline-none mb-2 input-field" />

          <div className="flex justify-between text-xs mb-4 py-1">
            <span style={{ color: "var(--fg-dim)" }}>Est. Total</span>
            <span className="font-mono font-semibold">{qty > 0 ? formatCurrency(total) : "$0.00"}</span>
          </div>

          {/* Submit */}
          <button onClick={handleOrder} disabled={qty <= 0 || orderPlaced} className="w-full py-2.5 rounded-md text-sm font-medium cursor-pointer disabled:opacity-50 transition-all" style={{ background: orderPlaced ? "var(--bg-elevated)" : orderSide === "BUY" ? "var(--green)" : "var(--red)", color: orderPlaced ? "var(--green)" : "#fff" }}>
            {orderPlaced ? "Order Placed!" : `${orderSide} ${ticker}`}
          </button>

          <p className="text-center text-xs font-mono mt-2" style={{ color: "var(--fg-dim)" }}>Paper trade only · No real money</p>
        </div>

        {/* About section on right panel */}
        <div className="px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
          <h2 className="section-header mb-2">About {stock.ticker}</h2>
          <p className="text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>{stock.about}</p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3">
            {[
              { label: "Market Cap", value: stock.marketCap },
              { label: "P/E", value: stock.peRatio.toFixed(1) },
              { label: "EPS", value: `$${stock.eps.toFixed(2)}` },
              { label: "Dividend", value: stock.dividend },
              { label: "Volume", value: stock.volume },
              { label: "Avg Vol", value: stock.avgVolume },
            ].map((s) => (
              <div key={s.label} className="flex justify-between items-center">
                <span className="text-xs" style={{ color: "var(--fg-dim)" }}>{s.label}</span>
                <span className="text-xs font-mono font-semibold">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Community Trades on right panel */}
        {recentTrades.length > 0 && (
          <div style={{ borderTop: "1px solid var(--border)" }}>
            <div className="px-4 pt-3 pb-2">
              <h2 className="section-header">Holders</h2>
            </div>
            {recentTrades.map((trade) => {
              const isBuy = trade.direction === "BUY";
              return (
                <div key={trade.id} className="flex items-center gap-2 px-4 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0" style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)" }}>
                    {trade.user ? getInitials(trade.user.displayName) : "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold">{trade.user?.displayName}</span>
                    <div className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>{trade.quantity} @ {formatCurrency(trade.entryPrice)}</div>
                  </div>
                  <span className="stat-pill shrink-0" style={{ background: isBuy ? "var(--green-muted)" : "var(--red-muted)", color: isBuy ? "var(--green)" : "var(--red)", fontSize: "10px", padding: "1px 6px" }}>
                    {trade.direction}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
