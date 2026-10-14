"use client";

import { TradeForm } from "@/components/trade-form";
import { ArrowLeftRight } from "lucide-react";

export default function TradePage() {
  return (
    <div>
      <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <ArrowLeftRight size={20} style={{ color: "var(--accent)" }} />
          <h1 className="text-lg font-bold tracking-tight">Paper Trade</h1>
        </div>
        <p className="text-xs mt-1" style={{ color: "var(--fg-dim)" }}>
          Trade with $100K virtual cash · Real-time prices
        </p>
      </div>
      <TradeForm />
    </div>
  );
}
