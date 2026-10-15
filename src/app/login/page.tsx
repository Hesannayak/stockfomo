"use client";

import { useState } from "react";
import { Zap, TrendingUp, Users, Trophy, ArrowRight, Check, Sparkles } from "lucide-react";

export default function EarlyAccessPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email");
      return;
    }

    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="relative z-10 w-full max-w-[380px] px-6 py-16 animate-in">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--fg)" }}>
            <Zap size={17} color="#fff" fill="#fff" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Stockhome</h1>
        </div>
        <p className="text-center text-sm mb-10" style={{ color: "var(--fg-dim)" }}>
          The social stock trading platform
        </p>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-8 mb-10">
          {[
            { icon: TrendingUp, value: "12+", label: "Waitlist" },
            { icon: Trophy, value: "$10k", label: "Volume" },
            { icon: Users, value: "80%", label: "Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-base font-bold font-mono">{s.value}</div>
              <div className="text-[11px] uppercase tracking-wider font-medium" style={{ color: "var(--fg-dim)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rank-card p-5">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-4 fade-in">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ background: "var(--green-muted)" }}
              >
                <Check size={24} style={{ color: "var(--green)" }} />
              </div>
              <h2 className="text-lg font-bold mb-1.5">You're on the list</h2>
              <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                We'll notify you at <strong style={{ color: "var(--fg)" }}>{email}</strong>
              </p>
              <p className="text-xs mt-2" style={{ color: "var(--fg-dim)" }}>
                Early members get priority access
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-5">
                <h2 className="text-base font-bold mb-0.5">Get Early Access</h2>
                <p className="text-xs" style={{ color: "var(--fg-dim)" }}>
                  Join the waitlist — be first to trade with top traders
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className="w-full px-3.5 py-2.5 text-sm input-field"
                  autoComplete="email"
                />

                {error && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium" style={{ background: "var(--red-muted)", color: "var(--red)" }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 text-sm font-medium btn-primary flex items-center justify-center gap-2"
                >
                  Join the Waitlist
                  <ArrowRight size={14} />
                </button>
              </form>

              <div className="flex flex-col gap-2 mt-5 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                {[
                  "Start trading with $100K virtual cash",
                  "Follow top traders & copy their moves",
                  "Compete on the leaderboard",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check size={12} style={{ color: "var(--green)" }} />
                    <span className="text-[13px]" style={{ color: "var(--fg-muted)" }}>{feature}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
