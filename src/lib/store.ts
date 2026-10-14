"use client";

import { create } from "zustand";
import type { Position, FeedItem } from "./types";
import { mockPositions, mockFeed } from "./mock-data";

interface AppState {
  virtualBalance: number;
  positions: Position[];
  feed: FeedItem[];
  activeTab: "feed" | "leaderboard" | "trade" | "profile";
  setActiveTab: (tab: AppState["activeTab"]) => void;
  addPosition: (position: Position) => void;
  updateBalance: (amount: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  virtualBalance: 100000,
  positions: mockPositions,
  feed: mockFeed,
  activeTab: "feed",
  setActiveTab: (tab) => set({ activeTab: tab }),
  addPosition: (position) =>
    set((state) => ({ positions: [...state.positions, position] })),
  updateBalance: (amount) =>
    set((state) => ({ virtualBalance: state.virtualBalance + amount })),
}));
