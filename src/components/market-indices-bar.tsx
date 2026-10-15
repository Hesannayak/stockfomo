"use client";

import { mockIndices } from "@/lib/mock-data";
import { TrendingUp, TrendingDown } from "lucide-react";

export function MarketIndicesBar() {
  return (
    <div
      className="flex items-center gap-4 px-4 py-2 overflow-x-auto"
      style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}
    >
      {mockIndices.map((idx) => {
        const isUp = idx.changePercent >= 0;
        return (
          <div key={idx.name} className="flex items-center gap-2 shrink-0">
            <span className="text-[13px] font-semibold">{idx.name}</span>
            <span className="text-[13px] font-mono font-semibold">
              {idx.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
            <span
              className="flex items-center gap-0.5 text-[13px] font-mono font-medium"
              style={{ color: isUp ? "var(--green)" : "var(--red)" }}
            >
              {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {isUp ? "+" : ""}{idx.changePercent.toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
