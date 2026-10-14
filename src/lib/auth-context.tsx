"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { User } from "./types";
import { mockUsers, mockPositions, mockTrades } from "./mock-data";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  signup: (displayName: string, username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  user: null,
  isLoggedIn: false,
  login: () => false,
  signup: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem("sf_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((username: string, _password: string) => {
    const found = mockUsers.find((u) => u.username === username);
    if (found) {
      setUser(found);
      try { localStorage.setItem("sf_user", JSON.stringify(found)); } catch {}
      return true;
    }
    const newUser: User = {
      id: `u_${Date.now()}`,
      username,
      displayName: username,
      avatarUrl: null,
      bio: null,
      virtualBalance: 100000,
      totalPnl: 0,
      winRate: 0,
      tradeCount: 0,
      isVerified: false,
      followerCount: 0,
      followingCount: 0,
    };
    setUser(newUser);
    try { localStorage.setItem("sf_user", JSON.stringify(newUser)); } catch {}
    return true;
  }, []);

  const signup = useCallback((displayName: string, username: string, _password: string) => {
    const newUser: User = {
      id: `u_${Date.now()}`,
      username,
      displayName,
      avatarUrl: null,
      bio: null,
      virtualBalance: 100000,
      totalPnl: 0,
      winRate: 0,
      tradeCount: 0,
      isVerified: false,
      followerCount: 0,
      followingCount: 0,
    };
    setUser(newUser);
    try { localStorage.setItem("sf_user", JSON.stringify(newUser)); } catch {}
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try { localStorage.removeItem("sf_user"); } catch {}
  }, []);

  return (
    <AuthContext value={{ user, isLoggedIn: !!user, login, signup, logout }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
