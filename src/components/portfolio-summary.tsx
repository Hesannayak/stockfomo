"use client";

import { formatCurrency, formatPercent } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { Position } from "@/lib/types";

export function PortfolioSummary({
  balance,
  positions,
}: {
  balance: number;
  positions: Position[];
}) {
  const totalInvested = positions.reduce(
    (sum, p) => sum + p.avgEntryPrice * p.quantity,
    0
  );
  const totalValue = positions.reduce(
    (sum, p) => sum + (p.currentPrice ?? p.avgEntryPrice) * p.quantity,
    0
  );
  const totalPnl = totalValue - totalInvested;
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;
  const portfolioValue = balance + totalValue - totalInvested;
  const isUp = totalPnl >= 0;

  return (
    <div className="p-4" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
      <div className="section-header mb-1">Portfolio Value</div>
      <div className="text-3xl font-bold tracking-tight font-mono">
        {formatCurrency(portfolioValue)}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div
          className="flex items-center gap-1 text-sm font-semibold"
          style={{ color: isUp ? "var(--green)" : "var(--red)" }}
        >
          {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span className="font-mono">{formatCurrency(totalPnl)}</span>
          <span className="font-mono" style={{ opacity: 0.7 }}>({formatPercent(totalPnlPercent)})</span>
        </div>
        <span className="text-[11px] font-mono" style={{ color: "var(--fg-dim)" }}>
          today
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {[
          { label: "Cash", value: formatCurrency(balance - totalInvested) },
          { label: "Invested", value: formatCurrency(totalInvested) },
          { label: "Positions", value: positions.length.toString() },
        ].map((item) => (
          <div key={item.label} className="text-center p-2 rounded-lg" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
            <div className="section-header mb-0.5">{item.label}</div>
            <div className="text-sm font-bold font-mono">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
