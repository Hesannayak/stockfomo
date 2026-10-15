"use client";

import { FeedSidebar } from "@/components/feed-sidebar";
import { FollowSidebar } from "@/components/follow-sidebar";
import { TradeForm } from "@/components/trade-form";
import { ArrowLeftRight } from "lucide-react";

export default function TradePage() {
  return (
    <div className="lg:grid lg:grid-cols-[260px_1fr_280px]">
      {/* Left Sidebar — Live Feed (desktop) */}
      <div className="desktop-sidebar">
        <FeedSidebar />
      </div>

      {/* Center — Trade Form */}
      <div className="lg:border-r" style={{ borderColor: "var(--border)" }}>
        <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <ArrowLeftRight size={18} style={{ color: "var(--accent)" }} />
            <h1 className="text-lg font-bold tracking-tight">Paper Trade</h1>
          </div>
          <p className="text-xs mt-1 font-mono" style={{ color: "var(--fg-dim)" }}>
            Trade with $100K virtual cash · Real-time prices
          </p>
        </div>
        <TradeForm />
      </div>

      {/* Right Sidebar — Follow Suggestions (desktop) */}
      <div className="desktop-sidebar">
        <FollowSidebar />
      </div>
    </div>
  );
}
