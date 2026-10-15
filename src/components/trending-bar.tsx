"use client";

import Link from "next/link";
import { trendingTickers, mockQuotes } from "@/lib/mock-data";
import { TrendingUp, TrendingDown } from "lucide-react";

export function TrendingBar() {
  return (
    <div
      className="overflow-x-auto"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex gap-2 p-3 min-w-max">
        {trendingTickers.map((t) => {
          const quote = mockQuotes[t.ticker];
          const isUp = quote?.changePercent >= 0;
          return (
            <Link
              key={t.ticker}
              href={`/stock/${t.ticker}`}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl shrink-0 cursor-pointer transition-all no-underline hover:scale-[1.01]"
              style={{ background: "var(--bg)", color: "var(--fg)", border: "1px solid var(--border)" }}
            >
              <div>
                <div className="text-xs font-bold">{t.ticker}</div>
                <div className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>
                  {t.name.length > 14 ? t.name.slice(0, 14) + "…" : t.name}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-semibold">
                  ${quote?.price.toFixed(2)}
                </div>
                <div
                  className="text-xs font-mono font-semibold flex items-center gap-0.5"
                  style={{ color: isUp ? "var(--green)" : "var(--red)" }}
                >
                  {isUp ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                  {isUp ? "+" : ""}
                  {quote?.changePercent.toFixed(2)}%
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
