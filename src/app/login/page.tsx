"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, TrendingUp, Users, Trophy } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const { login, signup } = useAuth();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (mode === "signup" && !displayName.trim()) {
      setError("Please enter your display name");
      return;
    }

    const ok = mode === "login"
      ? login(username.trim(), password)
      : signup(displayName.trim(), username.trim(), password);

    if (ok) {
      router.push("/");
    } else {
      setError("Login failed. Try again.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-6 w-full max-w-md">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={32} style={{ color: "var(--accent)" }} />
          <h1 className="text-3xl font-black tracking-tight">StockFomo</h1>
        </div>
        <p className="text-sm mb-8" style={{ color: "var(--fg-dim)" }}>
          Social paper trading. Zero risk, full FOMO.
        </p>

        <div className="grid grid-cols-3 gap-4 w-full max-w-xs mb-10">
          {[
            { icon: TrendingUp, label: "Paper Trade", sub: "Real prices" },
            { icon: Users, label: "Social Feed", sub: "Follow traders" },
            { icon: Trophy, label: "Leaderboards", sub: "Compete & win" },
          ].map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-1.5 text-center">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: "var(--accent-muted)" }}
              >
                <f.icon size={20} style={{ color: "var(--accent)" }} />
              </div>
              <span className="text-[11px] font-semibold">{f.label}</span>
              <span className="text-[10px]" style={{ color: "var(--fg-dim)" }}>{f.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Auth Form */}
      <div className="px-6 pb-10 w-full max-w-md">
        <div className="flex rounded-xl overflow-hidden mb-5" style={{ background: "var(--bg-input)" }}>
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className="flex-1 py-2.5 text-sm font-bold transition-colors cursor-pointer"
              style={{
                background: mode === m ? "var(--accent)" : "transparent",
                color: mode === m ? "#000" : "var(--fg-dim)",
              }}
            >
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "var(--bg-input)", color: "var(--fg)", border: "1px solid var(--border)" }}
            />
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: "var(--bg-input)", color: "var(--fg)", border: "1px solid var(--border)" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: "var(--bg-input)", color: "var(--fg)", border: "1px solid var(--border)" }}
          />

          {error && (
            <p className="text-xs font-medium" style={{ color: "var(--red)" }}>{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-bold cursor-pointer mt-1"
            style={{ background: "var(--accent)", color: "#000" }}
          >
            {mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-[11px] mt-4" style={{ color: "var(--fg-dim)" }}>
          Paper trading only · No real money · No broker needed
        </p>
      </div>
    </div>
  );
}
