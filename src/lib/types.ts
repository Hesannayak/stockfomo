export type Direction = "BUY" | "SELL";
export type TradeStatus = "OPEN" | "CLOSED";

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  virtualBalance: number;
  totalPnl: number;
  winRate: number;
  tradeCount: number;
  isVerified: boolean;
  followerCount?: number;
  followingCount?: number;
}

export interface Trade {
  id: string;
  userId: string;
  ticker: string;
  direction: Direction;
  quantity: number;
  entryPrice: number;
  exitPrice: number | null;
  pnlAmount: number | null;
  pnlPercent: number | null;
  status: TradeStatus;
  createdAt: string;
  closedAt: string | null;
  user?: User;
  currentPrice?: number;
}

export interface Position {
  id: string;
  userId: string;
  ticker: string;
  quantity: number;
  avgEntryPrice: number;
  currentPrice?: number;
  marketValue?: number;
  unrealizedPnl?: number;
  unrealizedPnlPercent?: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  totalReturn: number;
  winRate: number;
  tradeCount: number;
  streak: number;
}

export interface StockQuote {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  volume: number;
}

export interface Thesis {
  id: string;
  userId: string;
  ticker: string;
  direction: Direction;
  title: string;
  body: string;
  createdAt: string;
  user?: User;
  reactions: { fire: number; skull: number; rocket: number };
  replyCount: number;
}

export type FeedItem = {
  id: string;
  user: User;
  timestamp: string;
  reactions: { fire: number; skull: number; rocket: number };
} & (
  | { type: "trade"; trade: Trade }
  | { type: "thesis"; thesis: Thesis }
);
