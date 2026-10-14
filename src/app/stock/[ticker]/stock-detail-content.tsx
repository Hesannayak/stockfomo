"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Star,
  Share2,
  Bell,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { StockChart } from "@/components/stock-chart";
import { getStockDetail, getStockCandles } from "@/lib/stock-data";
import { mockTrades, mockUsers } from "@/lib/mock-data";
import { formatCurrency, formatCompact, timeAgo, getInitials } from "@/lib/utils";

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

  if (!stock) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg font-bold mb-2">Ticker not found</p>
        <p className="text-sm" style={{ color: "var(--fg-dim)" }}>
          &quot;{ticker}&quot; is not available
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
          style={{ background: "var(--bg-input)", color: "var(--fg)" }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const isUp = stock.change >= 0;
  const qty = parseInt(quantity) || 0;
  const total = qty * stock.price;

  function handleOrder() {
    if (qty <= 0) return;
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setQuantity("");
    }, 2500);
  }

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <button onClick={() => router.back()} className="cursor-pointer p-1" style={{ color: "var(--fg)" }}>
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">{stock.ticker}</h1>
            <span className="text-xs px-2 py-0.5 rounded-md font-medium" style={{ background: "var(--bg-input)", color: "var(--fg-dim)" }}>
              {stock.name.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
        </div>
        <button
          onClick={() => setWatchlisted(!watchlisted)}
          className="p-2 cursor-pointer"
          style={{ color: watchlisted ? "var(--yellow)" : "var(--fg-dim)" }}
        >
          <Star size={20} fill={watchlisted ? "var(--yellow)" : "none"} />
        </button>
        <button className="p-2 cursor-pointer" style={{ color: "var(--fg-dim)" }}>
          <Bell size={20} />
        </button>
      </div>

      {/* Price */}
      <div className="px-4 pt-4 pb-2">
        <div className="text-3xl font-black font-mono">{formatCurrency(stock.price)}</div>
        <div className="flex items-center gap-1.5 mt-1">
          {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span
            className="text-sm font-semibold font-mono"
            style={{ color: isUp ? "var(--accent)" : "var(--red)" }}
          >
            {isUp ? "+" : ""}{formatCurrency(stock.change)} ({isUp ? "+" : ""}{stock.changePercent.toFixed(2)}%)
          </span>
          <span className="text-xs" style={{ color: "var(--fg-dim)" }}>Today</span>
        </div>
      </div>

      {/* Chart */}
      <StockChart data={candles} isPositive={isUp} />

      {/* Time Range */}
      <div className="flex gap-1 px-4 py-3">
        {TIME_RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className="flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer"
            style={{
              background: range === r ? "var(--bg-input)" : "transparent",
              color: range === r ? "var(--fg)" : "var(--fg-dim)",
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Key Stats */}
      <div className="px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
        <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--fg-dim)" }}>
          Key Statistics
        </h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
          {[
            { label: "Open", value: formatCurrency(stock.open) },
            { label: "Previous Close", value: formatCurrency(stock.previousClose) },
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
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--fg-dim)" }}>
          About
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{stock.about}</p>
      </div>

      {/* Community Trades */}
      {recentTrades.length > 0 && (
        <div style={{ borderTop: "1px solid var(--border)" }}>
          <div className="px-4 pt-3 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>
              Community Trades
            </h2>
          </div>
          {recentTrades.map((trade) => {
            const isBuy = trade.direction === "BUY";
            return (
              <div
                key={trade.id}
                className="flex items-center gap-3 px-4 py-2.5"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{ background: "var(--bg-input)", color: "var(--fg-muted)" }}
                >
                  {trade.user ? getInitials(trade.user.displayName) : "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{trade.user?.displayName}</span>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{
                        background: isBuy ? "var(--accent-muted)" : "var(--red-muted)",
                        color: isBuy ? "var(--accent)" : "var(--red)",
                      }}
                    >
                      {trade.direction}
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: "var(--fg-dim)" }}>
                    {trade.quantity} shares @ {formatCurrency(trade.entryPrice)} · {timeAgo(trade.createdAt)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Trade Panel */}
      <div
        className="px-4 py-4 mt-2"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--fg-dim)" }}>
          Paper Trade
        </h2>

        <div className="flex rounded-xl overflow-hidden mb-3" style={{ background: "var(--bg-input)" }}>
          {(["BUY", "SELL"] as const).map((side) => (
            <button
              key={side}
              onClick={() => setOrderSide(side)}
              className="flex-1 py-2 text-sm font-bold cursor-pointer transition-colors"
              style={{
                background: orderSide === side
                  ? side === "BUY" ? "var(--accent)" : "var(--red)"
                  : "transparent",
                color: orderSide === side ? "#000" : "var(--fg-dim)",
              }}
            >
              {side}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1">
            <label className="text-[10px] uppercase tracking-wider font-semibold mb-1 block" style={{ color: "var(--fg-dim)" }}>
              Shares
            </label>
            <input
              type="number"
              min="1"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-sm font-mono outline-none"
              style={{ background: "var(--bg-input)", color: "var(--fg)", border: "1px solid var(--border)" }}
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] uppercase tracking-wider font-semibold mb-1 block" style={{ color: "var(--fg-dim)" }}>
              Est. Total
            </label>
            <div
              className="px-3 py-2.5 rounded-lg text-sm font-mono"
              style={{ background: "var(--bg-input)", color: qty > 0 ? "var(--fg)" : "var(--fg-dim)", border: "1px solid var(--border)" }}
            >
              {qty > 0 ? formatCurrency(total) : "$0.00"}
            </div>
          </div>
        </div>

        <button
          onClick={handleOrder}
          disabled={qty <= 0 || orderPlaced}
          className="w-full py-3 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: orderPlaced ? "var(--bg-input)" : orderSide === "BUY" ? "var(--accent)" : "var(--red)",
            color: orderPlaced ? "var(--accent)" : "#000",
          }}
        >
          {orderPlaced
            ? "Order Placed!"
            : `${orderSide} ${ticker} · Market Order`}
        </button>

        <p className="text-center text-[10px] mt-2" style={{ color: "var(--fg-dim)" }}>
          Paper trade only · No real money involved
        </p>
      </div>
    </div>
  );
}
