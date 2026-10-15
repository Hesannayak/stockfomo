"use client";

import { FeedSidebar } from "@/components/feed-sidebar";
import { FollowSidebar } from "@/components/follow-sidebar";
import { TradeForm } from "@/components/trade-form";
import { ArrowLeftRight } from "lucide-react";

export default function TradePage() {
  return (
    <div className="lg:grid lg:grid-cols-[240px_1fr_260px]">
      {/* Left Sidebar — Live Feed (desktop) */}
      <div className="desktop-sidebar">
        <FeedSidebar />
      </div>

      {/* Center — Trade Form */}
      <div className="lg:border-r" style={{ borderColor: "var(--border)" }}>
        <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <h1 className="text-base font-bold tracking-tight">Trade</h1>
          <p className="text-xs mt-0.5 font-mono" style={{ color: "var(--fg-dim)" }}>
            $100K virtual cash · Real-time prices
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
