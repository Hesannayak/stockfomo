"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame, Skull, Rocket, MessageCircle, FileText } from "lucide-react";
import type { FeedItem } from "@/lib/types";
import { timeAgo, getInitials } from "@/lib/utils";

export function ThesisCard({ item }: { item: FeedItem & { type: "thesis" } }) {
  const { thesis, user, timestamp } = item;
  const [localReactions, setLocalReactions] = useState(item.reactions);

  const isBuy = thesis.direction === "BUY";

  function react(key: keyof typeof localReactions, e: React.MouseEvent<HTMLButtonElement>) {
    setLocalReactions((prev) => ({ ...prev, [key]: prev[key] + 1 }));
    const btn = e.currentTarget;
    btn.classList.remove("animate-pop");
    void btn.offsetWidth;
    btn.classList.add("animate-pop");
  }

  return (
    <div
      className="px-4 py-3.5 transition-colors card-hover"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex items-start gap-3">
        <Link
          href={`/profile/${user.username}`}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 no-underline"
          style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)" }}
        >
          {getInitials(user.displayName)}
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link href={`/profile/${user.username}`} className="font-semibold text-sm no-underline hover:underline" style={{ color: "var(--fg)" }}>
              {user.displayName}
            </Link>
            {user.isVerified && (
              <span className="pro-badge">PRO</span>
            )}
            <span className="text-xs font-mono" style={{ color: "var(--fg-dim)" }}>
              @{user.username}
            </span>
            <span className="text-xs font-mono ml-auto shrink-0" style={{ color: "var(--fg-dim)" }}>
              {timeAgo(timestamp)}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span
              className="stat-pill uppercase tracking-wide flex items-center gap-1"
              style={{
                background: isBuy ? "var(--green-muted)" : "var(--red-muted)",
                color: isBuy ? "var(--green)" : "var(--red)",
                fontSize: "11px",
              }}
            >
              <FileText size={10} />
              {thesis.direction} THESIS
            </span>
            <Link
              href={`/stock/${thesis.ticker}`}
              className="font-bold text-sm no-underline hover:underline"
              style={{ color: "var(--fg)" }}
            >
              {thesis.ticker}
            </Link>
          </div>

          <Link
            href={`/stock/${thesis.ticker}`}
            className="block mt-2 no-underline"
            style={{ color: "var(--fg)" }}
          >
            <h3 className="text-sm font-bold leading-snug">
              {thesis.title}
            </h3>
            <p
              className="text-[13px] mt-1.5 leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              {thesis.body.length > 200
                ? thesis.body.slice(0, 200).trim() + "..."
                : thesis.body}
            </p>
          </Link>

          <div className="mt-2.5 flex items-center gap-1">
            {[
              { key: "fire" as const, icon: Flame },
              { key: "rocket" as const, icon: Rocket },
              { key: "skull" as const, icon: Skull },
            ].map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={(e) => react(key, e)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all cursor-pointer hover:bg-[var(--bg-elevated)]"
                style={{ color: "var(--fg-dim)" }}
              >
                <Icon size={12} />
                <span className="font-mono text-[11px]">{localReactions[key]}</span>
              </button>
            ))}
            <Link
              href={`/stock/${thesis.ticker}`}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all cursor-pointer ml-auto no-underline hover:bg-[var(--bg-elevated)]"
              style={{ color: "var(--fg-dim)" }}
            >
              <MessageCircle size={12} />
              <span className="font-mono text-[11px]">{thesis.replyCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
