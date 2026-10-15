"use client";

import { useState } from "react";
import Link from "next/link";
import { FeedSidebar } from "@/components/feed-sidebar";
import { FollowSidebar } from "@/components/follow-sidebar";
import { MarketIndicesBar } from "@/components/market-indices-bar";
import { allStocks, mockQuotes, getStocksBySector, getStocksByType } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, Search, Layers, BarChart3, Bitcoin } from "lucide-react";
import type { StockInfo } from "@/lib/types";

type Tab = "all" | "stocks" | "etfs" | "crypto";

const tabConfig: { key: Tab; label: string; icon: typeof Layers }[] = [
  { key: "all", label: "All", icon: Layers },
  { key: "stocks", label: "Stocks", icon: BarChart3 },
  { key: "etfs", label: "ETFs", icon: Layers },
  { key: "crypto", label: "Crypto", icon: Bitcoin },
];

export default function DiscoverPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const sectorMap = getStocksBySector();
  const sectors = Object.keys(sectorMap).sort();

  let filtered: StockInfo[];
  if (tab === "stocks") filtered = getStocksByType("stock");
  else if (tab === "etfs") filtered = getStocksByType("etf");
  else if (tab === "crypto") filtered = getStocksByType("crypto");
  else filtered = allStocks;

  if (selectedSector) {
    filtered = filtered.filter((s) => s.sector === selectedSector);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (s) => s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-[240px_1fr_260px]">
      <div className="desktop-sidebar">
        <FeedSidebar />
      </div>

      <div className="lg:border-r" style={{ borderColor: "var(--border)" }}>
        <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <h1 className="text-base font-bold tracking-tight">Discover</h1>
          <p className="text-xs mt-0.5 font-mono" style={{ color: "var(--fg-dim)" }}>
            {allStocks.length} assets · {sectors.length} sectors
          </p>
        </div>

        <MarketIndicesBar />

        {/* Search */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-md input-field">
            <Search size={14} style={{ color: "var(--fg-dim)" }} />
            <input
              type="text"
              placeholder="Search stocks, ETFs, crypto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "var(--fg)" }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
          {tabConfig.map((t) => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setSelectedSector(null); }}
              className="flex items-center gap-1.5 px-3 py-1 text-sm rounded-md transition-all cursor-pointer"
              style={{
                background: tab === t.key ? "var(--fg)" : "transparent",
                color: tab === t.key ? "var(--bg)" : "var(--fg-dim)",
                fontWeight: tab === t.key ? 600 : 400,
              }}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Sector chips (only for stocks and all) */}
        {(tab === "all" || tab === "stocks") && !search && (
          <div className="flex gap-1.5 px-4 py-2.5 overflow-x-auto" style={{ borderBottom: "1px solid var(--border)" }}>
            <button
              onClick={() => setSelectedSector(null)}
              className="px-2.5 py-1 text-xs font-medium rounded-md shrink-0 cursor-pointer transition-all"
              style={{
                background: !selectedSector ? "var(--fg)" : "var(--bg-elevated)",
                color: !selectedSector ? "var(--bg)" : "var(--fg-dim)",
                border: "1px solid var(--border)",
              }}
            >
              All Sectors
            </button>
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => setSelectedSector(selectedSector === sector ? null : sector)}
                className="px-2.5 py-1 text-xs font-medium rounded-md shrink-0 cursor-pointer transition-all"
                style={{
                  background: selectedSector === sector ? "var(--fg)" : "var(--bg-elevated)",
                  color: selectedSector === sector ? "var(--bg)" : "var(--fg-dim)",
                  border: "1px solid var(--border)",
                }}
              >
                {sector}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        <div>
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm" style={{ color: "var(--fg-dim)" }}>No assets found</p>
            </div>
          ) : (
            filtered.map((stock, i) => {
              const quote = mockQuotes[stock.ticker];
              if (!quote) return null;
              const isUp = quote.changePercent >= 0;
              return (
                <Link
                  key={stock.ticker}
                  href={`/stock/${stock.ticker}`}
                  className={`flex items-center gap-3 px-4 py-2.5 no-underline transition-colors card-hover animate-in stagger-${Math.min(i + 1, 8)}`}
                  style={{ borderBottom: "1px solid var(--border)", color: "var(--fg)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)" }}
                  >
                    {stock.ticker.slice(0, 3)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{stock.ticker}</span>
                      {stock.type !== "stock" && (
                        <span
                          className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{
                            background: stock.type === "etf" ? "var(--blue-muted, #dbeafe)" : "var(--yellow-muted, #fef3c7)",
                            color: stock.type === "etf" ? "var(--blue, #2563eb)" : "var(--yellow, #d97706)",
                          }}
                        >
                          {stock.type}
                        </span>
                      )}
                      <span className="text-xs truncate" style={{ color: "var(--fg-dim)" }}>
                        {stock.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {stock.sector && (
                        <span className="text-[11px] font-medium" style={{ color: "var(--fg-dim)" }}>
                          {stock.sector}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-mono font-semibold">
                      {quote.price < 1
                        ? `$${quote.price.toFixed(3)}`
                        : `$${quote.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </div>
                    <div
                      className="flex items-center gap-0.5 justify-end text-xs font-mono font-medium mt-0.5"
                      style={{ color: isUp ? "var(--green)" : "var(--red)" }}
                    >
                      {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {isUp ? "+" : ""}{quote.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>

      <div className="desktop-sidebar">
        <FollowSidebar />
      </div>
    </div>
  );
}
