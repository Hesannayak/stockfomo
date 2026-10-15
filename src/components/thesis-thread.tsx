"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Flame, Skull, Rocket, MessageCircle, ChevronDown, ChevronUp, Send } from "lucide-react";
import type { Thesis } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";
import { timeAgo, getInitials } from "@/lib/utils";

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const WORD_LIMIT = 500;

function ThesisItem({ thesis }: { thesis: Thesis }) {
  const [expanded, setExpanded] = useState(false);
  const [localReactions, setLocalReactions] = useState(thesis.reactions);

  const isBuy = thesis.direction === "BUY";
  const user = thesis.user;
  const needsTruncation = thesis.body.length > 280;
  const displayBody = needsTruncation && !expanded
    ? thesis.body.slice(0, 280).trim() + "..."
    : thesis.body;

  function react(key: keyof typeof localReactions, e: React.MouseEvent<HTMLButtonElement>) {
    setLocalReactions((prev) => ({ ...prev, [key]: prev[key] + 1 }));
    const btn = e.currentTarget;
    btn.classList.remove("animate-pop");
    void btn.offsetWidth;
    btn.classList.add("animate-pop");
  }

  return (
    <div
      className="px-4 py-3.5"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex items-start gap-3">
        <Link
          href={user ? `/profile/${user.username}` : "#"}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 no-underline"
          style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)" }}
        >
          {user ? getInitials(user.displayName) : "?"}
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {user && (
              <Link href={`/profile/${user.username}`} className="font-semibold text-[15px] no-underline hover:underline" style={{ color: "var(--fg)" }}>
                {user.displayName}
              </Link>
            )}
            {user?.isVerified && <span className="pro-badge">PRO</span>}
            <span
              className="stat-pill uppercase tracking-wide flex items-center gap-0.5"
              style={{
                background: isBuy ? "var(--green-muted)" : "var(--red-muted)",
                color: isBuy ? "var(--green)" : "var(--red)",
                fontSize: "11px",
              }}
            >
              {thesis.direction}
            </span>
            <span className="text-[13px] font-mono ml-auto shrink-0" style={{ color: "var(--fg-dim)" }}>
              {timeAgo(thesis.createdAt)}
            </span>
          </div>

          <h3 className="text-[15px] font-bold mt-1.5 leading-snug">{thesis.title}</h3>

          <p
            className="text-sm mt-1.5 leading-relaxed whitespace-pre-line"
            style={{ color: "var(--fg-muted)" }}
          >
            {displayBody}
          </p>

          {needsTruncation && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-[13px] font-medium mt-1 cursor-pointer"
              style={{ color: "var(--fg-dim)" }}
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {expanded ? "Show less" : "Read more"}
            </button>
          )}

          <div className="mt-2 flex items-center gap-1">
            {[
              { key: "fire" as const, icon: Flame },
              { key: "rocket" as const, icon: Rocket },
              { key: "skull" as const, icon: Skull },
            ].map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={(e) => react(key, e)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[13px] transition-all cursor-pointer hover:bg-[var(--bg-elevated)]"
                style={{ color: "var(--fg-dim)" }}
              >
                <Icon size={13} />
                <span className="font-mono text-xs">{localReactions[key]}</span>
              </button>
            ))}
            <span
              className="flex items-center gap-1 px-2 py-1 text-[13px] ml-auto"
              style={{ color: "var(--fg-dim)" }}
            >
              <MessageCircle size={13} />
              <span className="font-mono text-xs">{thesis.replyCount}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ThesisThread({ ticker, theses }: { ticker: string; theses: Thesis[] }) {
  const { user, isLoggedIn } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [direction, setDirection] = useState<"BUY" | "SELL">("BUY");
  const [submitted, setSubmitted] = useState(false);

  const words = wordCount(body);
  const overLimit = words > WORD_LIMIT;

  function handleSubmit() {
    if (!title.trim() || !body.trim() || overLimit) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setTitle("");
      setBody("");
    }, 2000);
  }

  return (
    <div>
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <h2 className="section-header flex items-center gap-1.5">
          <FileText size={12} />
          Theses ({theses.length})
        </h2>
        {isLoggedIn && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-[13px] font-medium px-3 py-1.5 rounded-md cursor-pointer transition-all"
            style={{
              background: showForm ? "var(--bg-elevated)" : "var(--fg)",
              color: showForm ? "var(--fg)" : "var(--bg)",
              border: showForm ? "1px solid var(--border)" : "1px solid transparent",
            }}
          >
            {showForm ? "Cancel" : "Write Thesis"}
          </button>
        )}
      </div>

      {showForm && (
        <div className="px-4 pb-3 animate-in">
          <div className="rounded-lg p-3" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
            <div className="flex gap-2 mb-3">
              {(["BUY", "SELL"] as const).map((side) => (
                <button
                  key={side}
                  onClick={() => setDirection(side)}
                  className="px-3 py-1 text-[13px] font-semibold rounded-md cursor-pointer transition-all"
                  style={{
                    background: direction === side
                      ? side === "BUY" ? "var(--green)" : "var(--red)"
                      : "transparent",
                    color: direction === side ? "#fff" : "var(--fg-dim)",
                    border: direction === side ? "1px solid transparent" : "1px solid var(--border)",
                  }}
                >
                  {side}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Thesis title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              className="w-full px-3 py-2 rounded-md text-sm font-semibold outline-none mb-2 input-field"
            />

            <textarea
              placeholder={`Why are you ${direction === "BUY" ? "bullish" : "bearish"} on ${ticker}?`}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 rounded-md text-sm outline-none resize-none input-field"
              style={{ lineHeight: "1.6" }}
            />

            <div className="flex items-center justify-between mt-2">
              <span
                className="text-[13px] font-mono"
                style={{ color: overLimit ? "var(--red)" : "var(--fg-dim)" }}
              >
                {words}/{WORD_LIMIT} words
              </span>
              <button
                onClick={handleSubmit}
                disabled={!title.trim() || !body.trim() || overLimit || submitted}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[13px] font-medium cursor-pointer disabled:opacity-40 transition-all"
                style={{
                  background: submitted ? "var(--green-muted)" : "var(--fg)",
                  color: submitted ? "var(--green)" : "var(--bg)",
                }}
              >
                {submitted ? "Posted!" : <><Send size={11} /> Post Thesis</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {theses.length === 0 && !showForm ? (
        <div className="px-4 py-6 text-center">
          <FileText size={24} style={{ color: "var(--fg-dim)", margin: "0 auto 8px" }} />
          <p className="text-sm" style={{ color: "var(--fg-dim)" }}>
            No theses yet for {ticker}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--fg-dim)" }}>
            Buy this stock to share your thesis
          </p>
        </div>
      ) : (
        theses.map((thesis, i) => (
          <div key={thesis.id} className={`animate-in stagger-${Math.min(i + 1, 8)}`}>
            <ThesisItem thesis={thesis} />
          </div>
        ))
      )}
    </div>
  );
}
