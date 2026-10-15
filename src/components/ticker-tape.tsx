"use client";

import Link from "next/link";
import { mockQuotes } from "@/lib/mock-data";

const tickers = Object.values(mockQuotes);
const doubled = [...tickers, ...tickers];

export function TickerTape() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden h-8 hidden lg:block"
      style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}
    >
      <div className="ticker-scroll flex items-center h-full gap-8 whitespace-nowrap px-4">
        {doubled.map((q, i) => {
          const isUp = q.changePercent >= 0;
          return (
            <Link
              key={`${q.ticker}-${i}`}
              href={`/stock/${q.ticker}`}
              className="inline-flex items-center gap-2 text-xs no-underline shrink-0 transition-opacity hover:opacity-80"
              style={{ color: "var(--fg-muted)" }}
            >
              <span className="font-semibold" style={{ color: "var(--fg)" }}>{q.ticker}</span>
              <span className="font-mono">${q.price.toFixed(2)}</span>
              <span
                className="font-mono font-semibold px-1.5 py-0.5 rounded"
                style={{
                  color: isUp ? "var(--accent)" : "var(--red)",
                  background: isUp ? "var(--accent-muted)" : "var(--red-muted)",
                }}
              >
                {isUp ? "+" : ""}{q.changePercent.toFixed(2)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
