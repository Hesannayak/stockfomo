"use client";

import Link from "next/link";
import { mockQuotes } from "@/lib/mock-data";

const tickers = Object.values(mockQuotes);
const doubled = [...tickers, ...tickers];

export function TickerTape() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden h-7 hidden lg:block"
      style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}
    >
      <div className="ticker-scroll flex items-center h-full gap-6 whitespace-nowrap">
        {doubled.map((q, i) => {
          const isUp = q.changePercent >= 0;
          return (
            <Link
              key={`${q.ticker}-${i}`}
              href={`/stock/${q.ticker}`}
              className="inline-flex items-center gap-2 text-xs no-underline shrink-0"
              style={{ color: "var(--fg)" }}
            >
              <span className="font-bold">{q.ticker}</span>
              <span className="font-mono">${q.price.toFixed(2)}</span>
              <span className="font-mono font-semibold" style={{ color: isUp ? "var(--accent)" : "var(--red)" }}>
                {isUp ? "+" : ""}{q.changePercent.toFixed(2)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
