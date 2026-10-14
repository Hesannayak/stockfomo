"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, TrendingUp, Users, Trophy, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const { login, signup, loginWithGoogle } = useAuth();
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

  function handleGoogle() {
    if (loginWithGoogle()) {
      router.push("/");
    }
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
        </div>
        <p className="text-center text-sm mb-10" style={{ color: "var(--fg-dim)" }}>
          The social paper trading platform
        </p>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 mb-10">
          {[
            { icon: TrendingUp, value: "10K+", label: "Traders" },
            { icon: Trophy, value: "$2.4B", label: "Volume" },
            { icon: Users, value: "98%", label: "Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-lg font-bold font-mono" style={{ color: "var(--fg)" }}>{s.value}</div>
              <div className="text-[10px] uppercase tracking-wider font-medium" style={{ color: "var(--fg-dim)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Auth Card */}
        <div className="glass glass-border rounded-2xl p-6">
          {/* Google Sign-In */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            style={{
              background: "#fff",
              color: "#1f1f1f",
              border: "none",
            }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="divider my-5">or</div>

          {/* Mode Toggle */}
          <div className="flex rounded-xl overflow-hidden mb-5 p-1" style={{ background: "var(--bg-input)" }}>
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className="flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer"
                style={{
                  background: mode === m ? "var(--bg-elevated)" : "transparent",
                  color: mode === m ? "var(--fg)" : "var(--fg-dim)",
                  boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,0.3)" : "none",
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
                className="w-full px-4 py-3 text-sm input-field"
              />
            )}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 text-sm input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm input-field"
            />

            {error && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium" style={{ background: "var(--red-muted)", color: "var(--red)" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 text-sm font-semibold btn-primary flex items-center justify-center gap-2 mt-1"
            >
              {mode === "login" ? "Log In" : "Create Account"}
              <ArrowRight size={14} />
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] mt-6" style={{ color: "var(--fg-dim)" }}>
          Paper trading only · No real money · No broker needed
        </p>
      </div>
    </div>
  );
}
