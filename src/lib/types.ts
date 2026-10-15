export type Direction = "BUY" | "SELL";
export type TradeStatus = "OPEN" | "CLOSED";
export type AssetType = "stock" | "etf" | "crypto";

export type Sector =
  | "Technology"
  | "Communication Services"
  | "Consumer Discretionary"
  | "Healthcare"
  | "Financials"
  | "Industrials"
  | "Consumer Staples"
  | "Energy"
  | "Utilities"
  | "Real Estate"
  | "Materials";

export type MarketCapCategory = "mega" | "large" | "mid" | "small";

export interface StockInfo {
  ticker: string;
  name: string;
  type: AssetType;
  sector?: Sector;
  industry?: string;
  marketCap?: MarketCapCategory;
  sentiment: number;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface AnalystRating {
  buy: number;
  hold: number;
  sell: number;
  priceTarget: number;
  consensus: "Strong Buy" | "Buy" | "Hold" | "Sell" | "Strong Sell";
}

export interface EarningsData {
  date: string;
  epsEstimate: number;
  epsActual: number | null;
  revenueEstimate: string;
  revenueActual: string | null;
  surprise: number | null;
}

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
