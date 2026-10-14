"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { User } from "./types";
import { mockUsers } from "./mock-data";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  signup: (displayName: string, username: string, password: string) => boolean;
  loginWithGoogle: () => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  user: null,
  isLoggedIn: false,
  login: () => false,
  signup: () => false,
  loginWithGoogle: () => false,
  logout: () => {},
});

function persist(u: User) {
  try { localStorage.setItem("sf_user", JSON.stringify(u)); } catch {}
}

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
      persist(found);
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
    persist(newUser);
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
    persist(newUser);
    return true;
  }, []);

  const loginWithGoogle = useCallback(() => {
    const googleUser: User = {
      id: `u_google_${Date.now()}`,
      username: "googleuser",
      displayName: "Google User",
      avatarUrl: null,
      bio: "Signed in with Google",
      virtualBalance: 100000,
      totalPnl: 0,
      winRate: 0,
      tradeCount: 0,
      isVerified: true,
      followerCount: 0,
      followingCount: 0,
    };
    setUser(googleUser);
    persist(googleUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try { localStorage.removeItem("sf_user"); } catch {}
  }, []);

  return (
    <AuthContext value={{ user, isLoggedIn: !!user, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
