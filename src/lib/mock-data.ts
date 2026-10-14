import { User, Trade, FeedItem, LeaderboardEntry, Position, StockQuote } from "./types";

function hoursAgo(h: number) {
  return `${h}h`;
}
function minutesAgo(m: number) {
  return `${m}m`;
}

export const mockUsers: User[] = [
  {
    id: "u1", username: "traderjake", displayName: "Jake Morrison",
    avatarUrl: null, bio: "Swing trader. Tech & energy focus.", virtualBalance: 112450,
    totalPnl: 12450, winRate: 68, tradeCount: 47, isVerified: false,
    followerCount: 1243, followingCount: 89,
  },
  {
    id: "u2", username: "sarahq", displayName: "Sarah Quinn",
    avatarUrl: null, bio: "Former hedge fund analyst. Sector rotation strategy.", virtualBalance: 134200,
    totalPnl: 34200, winRate: 72, tradeCount: 63, isVerified: true,
    followerCount: 5621, followingCount: 34,
  },
  {
    id: "u3", username: "mikedelta", displayName: "Mike Chen",
    avatarUrl: null, bio: "Options-minded. Day trades SPY & QQQ.", virtualBalance: 95800,
    totalPnl: -4200, winRate: 45, tradeCount: 112, isVerified: false,
    followerCount: 342, followingCount: 156,
  },
  {
    id: "u4", username: "pennywise", displayName: "Alex Rivera",
    avatarUrl: null, bio: "Small caps. High risk, high reward.", virtualBalance: 167300,
    totalPnl: 67300, winRate: 58, tradeCount: 89, isVerified: true,
    followerCount: 8904, followingCount: 12,
  },
  {
    id: "u5", username: "indexfund_izzy", displayName: "Isabella Park",
    avatarUrl: null, bio: "Slow and steady. ETF & dividend focus.", virtualBalance: 108700,
    totalPnl: 8700, winRate: 81, tradeCount: 23, isVerified: false,
    followerCount: 712, followingCount: 45,
  },
];

export const mockTrades: Trade[] = [
  {
    id: "t1", userId: "u2", ticker: "NVDA", direction: "BUY", quantity: 50,
    entryPrice: 142.30, exitPrice: null, pnlAmount: null, pnlPercent: null,
    status: "OPEN", createdAt: minutesAgo(12), closedAt: null, currentPrice: 148.75,
  },
  {
    id: "t2", userId: "u4", ticker: "PLTR", direction: "BUY", quantity: 200,
    entryPrice: 78.50, exitPrice: 84.20, pnlAmount: 1140, pnlPercent: 7.26,
    status: "CLOSED", createdAt: hoursAgo(2), closedAt: hoursAgo(1),
  },
  {
    id: "t3", userId: "u1", ticker: "TSLA", direction: "SELL", quantity: 30,
    entryPrice: 352.10, exitPrice: null, pnlAmount: null, pnlPercent: null,
    status: "OPEN", createdAt: minutesAgo(45), closedAt: null, currentPrice: 348.90,
  },
  {
    id: "t4", userId: "u3", ticker: "SPY", direction: "BUY", quantity: 100,
    entryPrice: 582.40, exitPrice: 580.10, pnlAmount: -230, pnlPercent: -0.39,
    status: "CLOSED", createdAt: hoursAgo(5), closedAt: hoursAgo(4),
  },
  {
    id: "t5", userId: "u5", ticker: "VOO", direction: "BUY", quantity: 25,
    entryPrice: 535.20, exitPrice: null, pnlAmount: null, pnlPercent: null,
    status: "OPEN", createdAt: hoursAgo(3), closedAt: null, currentPrice: 537.80,
  },
  {
    id: "t6", userId: "u2", ticker: "AAPL", direction: "BUY", quantity: 80,
    entryPrice: 228.50, exitPrice: 234.10, pnlAmount: 448, pnlPercent: 2.45,
    status: "CLOSED", createdAt: hoursAgo(8), closedAt: hoursAgo(6),
  },
  {
    id: "t7", userId: "u4", ticker: "SMCI", direction: "BUY", quantity: 150,
    entryPrice: 42.30, exitPrice: null, pnlAmount: null, pnlPercent: null,
    status: "OPEN", createdAt: minutesAgo(90), closedAt: null, currentPrice: 45.10,
  },
  {
    id: "t8", userId: "u1", ticker: "AMD", direction: "BUY", quantity: 75,
    entryPrice: 158.20, exitPrice: 162.80, pnlAmount: 345, pnlPercent: 2.91,
    status: "CLOSED", createdAt: hoursAgo(24), closedAt: hoursAgo(20),
  },
];

export const mockFeed: FeedItem[] = mockTrades.map((trade) => ({
  id: `fi-${trade.id}`,
  type: "trade" as const,
  trade,
  user: mockUsers.find((u) => u.id === trade.userId)!,
  timestamp: trade.createdAt,
  reactions: {
    fire: Math.floor(Math.random() * 50),
    skull: Math.floor(Math.random() * 10),
    rocket: Math.floor(Math.random() * 30),
  },
}));

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, user: mockUsers[3], totalReturn: 67.3, winRate: 58, tradeCount: 89, streak: 5 },
  { rank: 2, user: mockUsers[1], totalReturn: 34.2, winRate: 72, tradeCount: 63, streak: 8 },
  { rank: 3, user: mockUsers[0], totalReturn: 12.45, winRate: 68, tradeCount: 47, streak: 3 },
  { rank: 4, user: mockUsers[4], totalReturn: 8.7, winRate: 81, tradeCount: 23, streak: 12 },
  { rank: 5, user: mockUsers[2], totalReturn: -4.2, winRate: 45, tradeCount: 112, streak: 0 },
];

export const mockPositions: Position[] = [
  {
    id: "p1", userId: "u1", ticker: "TSLA", quantity: 30, avgEntryPrice: 352.10,
    currentPrice: 348.90, marketValue: 10467, unrealizedPnl: -96, unrealizedPnlPercent: -0.91,
  },
  {
    id: "p2", userId: "u1", ticker: "MSFT", quantity: 20, avgEntryPrice: 415.30,
    currentPrice: 422.10, marketValue: 8442, unrealizedPnl: 136, unrealizedPnlPercent: 1.64,
  },
  {
    id: "p3", userId: "u1", ticker: "AMZN", quantity: 15, avgEntryPrice: 192.40,
    currentPrice: 198.70, marketValue: 2980.5, unrealizedPnl: 94.5, unrealizedPnlPercent: 3.27,
  },
];

export const mockQuotes: Record<string, StockQuote> = {
  NVDA: { ticker: "NVDA", price: 148.75, change: 4.25, changePercent: 2.94, high: 150.20, low: 143.80, open: 144.50, previousClose: 144.50, volume: 312_400_000 },
  TSLA: { ticker: "TSLA", price: 348.90, change: -8.20, changePercent: -2.30, high: 358.10, low: 346.50, open: 357.10, previousClose: 357.10, volume: 89_600_000 },
  AAPL: { ticker: "AAPL", price: 234.10, change: 1.80, changePercent: 0.77, high: 235.40, low: 231.90, open: 232.30, previousClose: 232.30, volume: 54_200_000 },
  SPY: { ticker: "SPY", price: 582.40, change: 2.10, changePercent: 0.36, high: 584.00, low: 579.80, open: 580.30, previousClose: 580.30, volume: 72_100_000 },
  PLTR: { ticker: "PLTR", price: 84.20, change: 3.40, changePercent: 4.21, high: 85.10, low: 79.80, open: 80.80, previousClose: 80.80, volume: 145_300_000 },
  SMCI: { ticker: "SMCI", price: 45.10, change: 2.80, changePercent: 6.62, high: 46.20, low: 42.00, open: 42.30, previousClose: 42.30, volume: 67_800_000 },
  AMD: { ticker: "AMD", price: 162.80, change: -1.40, changePercent: -0.85, high: 165.20, low: 161.50, open: 164.20, previousClose: 164.20, volume: 43_500_000 },
  VOO: { ticker: "VOO", price: 537.80, change: 1.90, changePercent: 0.35, high: 539.20, low: 534.60, open: 535.90, previousClose: 535.90, volume: 4_200_000 },
  MSFT: { ticker: "MSFT", price: 422.10, change: 3.50, changePercent: 0.84, high: 424.30, low: 418.20, open: 418.60, previousClose: 418.60, volume: 21_300_000 },
  AMZN: { ticker: "AMZN", price: 198.70, change: 2.30, changePercent: 1.17, high: 199.80, low: 195.40, open: 196.40, previousClose: 196.40, volume: 38_700_000 },
};

export const trendingTickers = [
  { ticker: "NVDA", name: "NVIDIA Corp", sentiment: 87 },
  { ticker: "PLTR", name: "Palantir Technologies", sentiment: 79 },
  { ticker: "SMCI", name: "Super Micro Computer", sentiment: 72 },
  { ticker: "TSLA", name: "Tesla Inc", sentiment: 54 },
  { ticker: "AMD", name: "Advanced Micro Devices", sentiment: 65 },
];
