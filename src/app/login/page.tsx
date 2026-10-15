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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow effects */}
      <div
        className="absolute top-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-30 blur-[120px] pointer-events-none"
        style={{ background: "var(--accent)" }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{ background: "var(--blue)" }}
      />

      <div className="relative z-10 w-full max-w-[420px] px-6 py-12">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center glow-green" style={{ background: "var(--accent)" }}>
            <Zap size={22} color="#000" fill="#000" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">StockFomo</h1>
          <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid rgba(0, 255, 106, 0.2)" }}>Beta</span>
        </div>
        <p className="text-center text-sm mb-10" style={{ color: "var(--fg-dim)" }}>
          The social paper trading platform
        </p>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 mb-10">
          {[
            { icon: TrendingUp, value: "12+", label: "Waitlist" },
            { icon: Trophy, value: "$10k", label: "Volume" },
            { icon: Users, value: "80%", label: "Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-lg font-bold font-mono" style={{ color: "var(--fg)" }}>{s.value}</div>
              <div className="text-[11px] uppercase tracking-wider font-medium" style={{ color: "var(--fg-dim)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="glass glass-border rounded-2xl p-6">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-4 fade-in">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: "var(--accent-muted)", border: "2px solid var(--accent)" }}
              >
                <Check size={28} style={{ color: "var(--accent)" }} />
              </div>
              <h2 className="text-xl font-bold mb-2">You're on the list!</h2>
              <p className="text-sm mb-1" style={{ color: "var(--fg-muted)" }}>
                We'll notify you at <strong style={{ color: "var(--fg)" }}>{email}</strong> when it's your turn.
              </p>
              <p className="text-xs mt-3" style={{ color: "var(--fg-dim)" }}>
                Early members get priority access + exclusive perks
              </p>
              <div
                className="flex items-center gap-2 mt-5 px-4 py-2 rounded-lg text-xs font-medium"
                style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
              >
                <Sparkles size={13} />
                Position #10,847 in line
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-5">
                <h2 className="text-lg font-bold mb-1">Get Early Access</h2>
                <p className="text-xs" style={{ color: "var(--fg-dim)" }}>
                  Join the waitlist — be first to trade with top traders
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className="w-full px-4 py-3 text-sm input-field"
                  autoComplete="email"
                />

                {error && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium" style={{ background: "var(--red-muted)", color: "var(--red)" }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 text-sm font-semibold btn-primary flex items-center justify-center gap-2"
                >
                  Join the Waitlist
                  <ArrowRight size={14} />
                </button>
              </form>

              <div className="flex flex-col gap-2.5 mt-6 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
                {[
                  "Paper trade with $100K virtual cash",
                  "Follow top traders & copy their moves",
                  "Compete on the leaderboard",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--accent-muted)" }}>
                      <Check size={10} style={{ color: "var(--accent)" }} />
                    </div>
                    <span className="text-xs" style={{ color: "var(--fg-muted)" }}>{feature}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "var(--fg-dim)" }}>
          Paper trading only · No real money · No broker needed
        </p>
      </div>
    </div>
  );
}
