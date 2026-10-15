"use client";

import { useState } from "react";
import { Search, ArrowUp, ArrowDown, X } from "lucide-react";
import { mockQuotes, trendingTickers } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const allTickers = Object.keys(mockQuotes);

export function TradeForm() {
  const [search, setSearch] = useState("");
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [direction, setDirection] = useState<"BUY" | "SELL">("BUY");
  const [quantity, setQuantity] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filtered = search
    ? allTickers.filter(
        (t) =>
          t.toLowerCase().includes(search.toLowerCase()) ||
          trendingTickers.find((tt) => tt.ticker === t)?.name.toLowerCase().includes(search.toLowerCase())
      )
    : allTickers;

  const quote = selectedTicker ? mockQuotes[selectedTicker] : null;
  const qty = parseFloat(quantity) || 0;
  const total = quote ? qty * quote.price : 0;

  function handleSubmit() {
    if (!selectedTicker || qty <= 0) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="p-4">
      {/* Search */}
      {!selectedTicker ? (
        <div>
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-md transition-all input-field"
          >
            <Search size={16} style={{ color: "var(--fg-dim)" }} />
            <input
              type="text"
              placeholder="Search ticker or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "var(--fg)" }}
            />
          </div>

          <div className="mt-3">
            {filtered.map((ticker) => {
              const q = mockQuotes[ticker];
              const info = trendingTickers.find((t) => t.ticker === ticker);
              const isUp = q.changePercent >= 0;
              return (
                <button
                  key={ticker}
                  onClick={() => setSelectedTicker(ticker)}
                  className="w-full flex items-center justify-between px-3 py-3 transition-colors cursor-pointer card-hover"
                  style={{ borderBottom: "1px solid var(--border)", background: "transparent" }}
                >
                  <div className="text-left">
                    <div className="text-sm font-bold">{ticker}</div>
                    <div className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>
                      {info?.name ?? ticker}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-semibold">
                      {formatCurrency(q.price)}
                    </div>
                    <div
                      className="text-xs font-mono"
                      style={{ color: isUp ? "var(--green)" : "var(--red)" }}
                    >
                      {isUp ? "+" : ""}
                      {q.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          {/* Selected Stock Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xl font-bold">{selectedTicker}</div>
              <div className="text-sm font-mono" style={{ color: "var(--fg-muted)" }}>
                {trendingTickers.find((t) => t.ticker === selectedTicker)?.name ?? selectedTicker}
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedTicker(null);
                setQuantity("");
              }}
              className="p-2 rounded-lg cursor-pointer btn-ghost"
              style={{ border: "1px solid var(--border)" }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Price */}
          {quote && (
            <div
              className="rank-card p-4 mb-4"
            >
              <div className="text-2xl font-bold font-mono">
                {formatCurrency(quote.price)}
              </div>
              <div
                className="text-sm font-semibold font-mono mt-1"
                style={{
                  color: quote.changePercent >= 0 ? "var(--green)" : "var(--red)",
                }}
              >
                {quote.changePercent >= 0 ? "+" : ""}
                {formatCurrency(quote.change)} ({quote.changePercent >= 0 ? "+" : ""}
                {quote.changePercent.toFixed(2)}%)
              </div>
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[
                  { label: "Open", value: quote.open },
                  { label: "High", value: quote.high },
                  { label: "Low", value: quote.low },
                  { label: "Vol", value: `${(quote.volume / 1_000_000).toFixed(1)}M` },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="section-header" style={{ fontSize: "10px" }}>{item.label}</div>
                    <div className="text-xs font-mono font-semibold mt-0.5">
                      {typeof item.value === "number" ? formatCurrency(item.value) : item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direction Toggle */}
          <div
            className="flex gap-1 p-1 rounded-lg mb-4"
            style={{ background: "var(--bg-elevated)" }}
          >
            <button
              onClick={() => setDirection("BUY")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-md text-sm font-bold transition-all cursor-pointer"
              style={{
                background: direction === "BUY" ? "var(--green-muted)" : "transparent",
                color: direction === "BUY" ? "var(--green)" : "var(--fg-dim)",
              }}
            >
              <ArrowUp size={16} />
              Buy
            </button>
            <button
              onClick={() => setDirection("SELL")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-md text-sm font-bold transition-all cursor-pointer"
              style={{
                background: direction === "SELL" ? "var(--red-muted)" : "transparent",
                color: direction === "SELL" ? "var(--red)" : "var(--fg-dim)",
              }}
            >
              <ArrowDown size={16} />
              Sell
            </button>
          </div>

          {/* Quantity Input */}
          <div className="mb-4">
            <label className="section-header mb-2 block">Number of Shares</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
              min="1"
              className="w-full px-3.5 py-2.5 rounded-md text-base font-mono font-semibold input-field"
            />
          </div>

          {/* Order Summary */}
          {qty > 0 && quote && (
            <div
              className="p-3 rounded-lg mb-4 flex justify-between text-sm"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
            >
              <span style={{ color: "var(--fg-muted)" }}>Estimated Total</span>
              <span className="font-bold font-mono">{formatCurrency(total)}</span>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={qty <= 0}
            className="w-full py-2.5 rounded-md text-sm font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
            style={{
              background: direction === "BUY" ? "var(--green)" : "var(--red)",
              color: "#fff",
            }}
          >
            {submitted
              ? "Order Placed!"
              : `${direction} ${qty > 0 ? qty : ""} ${selectedTicker}`}
          </button>

          <p
            className="text-xs text-center mt-3 font-mono"
            style={{ color: "var(--fg-dim)" }}
          >
            Paper trade only · No real money involved
          </p>
        </div>
      )}
    </div>
  );
}
