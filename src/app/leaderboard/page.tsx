"use client";

import { LeaderboardTable } from "@/components/leaderboard-table";
import { mockLeaderboard } from "@/lib/mock-data";
import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div>
      <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <Trophy size={20} style={{ color: "var(--yellow)" }} />
          <h1 className="text-lg font-bold tracking-tight">Leaderboard</h1>
        </div>
        <p className="text-xs mt-1" style={{ color: "var(--fg-dim)" }}>
          Top paper traders ranked by total return
        </p>
      </div>
      <LeaderboardTable entries={mockLeaderboard} />
    </div>
  );
}
