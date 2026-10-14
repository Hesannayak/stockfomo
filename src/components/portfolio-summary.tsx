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
    <div className="p-4" style={{ background: "var(--bg-card)" }}>
      <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--fg-dim)" }}>
        Portfolio Value
      </div>
      <div className="text-3xl font-bold tracking-tight font-mono">
        {formatCurrency(portfolioValue)}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div
          className="flex items-center gap-1 text-sm font-semibold"
          style={{ color: isUp ? "var(--accent)" : "var(--red)" }}
        >
          {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{formatCurrency(totalPnl)}</span>
          <span style={{ opacity: 0.7 }}>({formatPercent(totalPnlPercent)})</span>
        </div>
        <span className="text-xs" style={{ color: "var(--fg-dim)" }}>
          today
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="text-center p-2 rounded-lg" style={{ background: "var(--bg-input)" }}>
          <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--fg-dim)" }}>
            Cash
          </div>
          <div className="text-sm font-bold font-mono mt-0.5">
            {formatCurrency(balance - totalInvested)}
          </div>
        </div>
        <div className="text-center p-2 rounded-lg" style={{ background: "var(--bg-input)" }}>
          <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--fg-dim)" }}>
            Invested
          </div>
          <div className="text-sm font-bold font-mono mt-0.5">
            {formatCurrency(totalInvested)}
          </div>
        </div>
        <div className="text-center p-2 rounded-lg" style={{ background: "var(--bg-input)" }}>
          <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--fg-dim)" }}>
            Positions
          </div>
          <div className="text-sm font-bold font-mono mt-0.5">{positions.length}</div>
        </div>
      </div>
    </div>
  );
}
