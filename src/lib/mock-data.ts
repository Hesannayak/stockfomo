import { User, Trade, Thesis, FeedItem, LeaderboardEntry, Position, StockQuote } from "./types";

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

export const mockTheses: Thesis[] = [
  {
    id: "th1", userId: "u2", ticker: "NVDA", direction: "BUY",
    title: "NVDA is the infrastructure backbone of the AI era",
    body: "NVIDIA's data center revenue grew 427% YoY last quarter. Every major cloud provider — AWS, Azure, GCP — is locked into multi-year NVIDIA GPU contracts. The CUDA moat is real: switching costs are enormous because the entire ML ecosystem (PyTorch, TensorFlow, JAX) is optimized for CUDA. Competitors like AMD's MI300 exist, but developer tooling and library support lag years behind.\n\nBlackwell is ramping production with reported $11B+ in pre-orders. The gross margins on data center GPUs sit at 78%, which is almost unheard of in hardware. Even if AI spending slows (it won't — enterprise adoption is just starting), NVIDIA's gaming and automotive verticals provide a floor.\n\nAt 35x forward earnings for a company growing revenue 100%+ annually, this is cheap. My PT is $200 within 12 months.",
    createdAt: minutesAgo(25),
    reactions: { fire: 34, skull: 3, rocket: 22 },
    replyCount: 8,
  },
  {
    id: "th2", userId: "u4", ticker: "PLTR", direction: "BUY",
    title: "Palantir's AIP platform is an underappreciated growth engine",
    body: "Most people still think of Palantir as a government contractor. That narrative is 3 years stale. The AIP (Artificial Intelligence Platform) boot camps are converting enterprise prospects at an incredible rate — they went from 0 to 560+ organizations in under a year.\n\nThe unit economics tell the story: net dollar retention is 115%, meaning existing customers keep spending more. Government revenue provides stable, predictable cash flow while commercial revenue is the growth vector (now 55% of total and accelerating).\n\nPalantir is one of the few companies that can actually deploy AI at enterprise scale with real security and compliance. That's a genuine moat in a market flooded with AI wrappers. Rule of 40 score above 55. I'm long with a 12-month target of $100.",
    createdAt: hoursAgo(1),
    reactions: { fire: 41, skull: 5, rocket: 28 },
    replyCount: 12,
  },
  {
    id: "th3", userId: "u1", ticker: "TSLA", direction: "SELL",
    title: "Tesla's auto margins are compressing faster than bulls admit",
    body: "I shorted TSLA at $352. Here's my bear case: automotive gross margins have fallen from 28% to 18% over the past 18 months due to aggressive price cuts. The price cuts were supposed to drive volume — they haven't. Global deliveries are flat YoY while BYD is eating Tesla's lunch in China and Europe.\n\nThe FSD narrative keeps the stock elevated, but after 8 years of \"next year\" promises, the robotaxi fleet is still vaporware. Waymo has more autonomous miles driven than Tesla. The energy business is legitimate but it's 7% of revenue — not enough to justify a $1.1T market cap.\n\nAt 80x forward earnings with declining margins, this is a momentum stock masquerading as a growth stock. Fair value is $180-220.",
    createdAt: minutesAgo(50),
    reactions: { fire: 18, skull: 12, rocket: 7 },
    replyCount: 15,
  },
  {
    id: "th4", userId: "u5", ticker: "VOO", direction: "BUY",
    title: "Why I keep DCA-ing into VOO every paycheck",
    body: "This isn't a flashy thesis. VOO (S&P 500 index) has returned 10.5% annualized over the past 30 years. After inflation, that's about 7.5% real. No stock picking, no timing, no stress.\n\nFor my risk-adjusted strategy: 80% VOO, 15% individual names, 5% speculation. The 80% in VOO means I sleep well at night. Market timing loses to DCA over 10+ year horizons in 92% of historical periods studied.\n\nThe S&P is market-cap weighted, so it naturally rebalances toward winners. You got NVIDIA's 3000% run just by holding the index. That's the beauty of it.",
    createdAt: hoursAgo(4),
    reactions: { fire: 12, skull: 1, rocket: 15 },
    replyCount: 4,
  },
  {
    id: "th5", userId: "u3", ticker: "SPY", direction: "BUY",
    title: "SPY $600 by year end — here's the macro setup",
    body: "The Fed is done hiking. Inflation is trending toward 2.5%. Corporate earnings are beating estimates at a 78% clip this quarter. That's the trifecta for equities.\n\nThe put/call ratio is still elevated, meaning there's a wall of worry to climb. When sentiment is cautious but fundamentals are strong, that's historically the best setup for a grind higher. Breadth is improving too — the equal-weight S&P is finally catching up to the cap-weighted index.\n\nSeasonality is also in our favor: Q4 has been positive 80% of the time historically. I'm holding 100 shares with a covered call at $600 strike for December.",
    createdAt: hoursAgo(6),
    reactions: { fire: 9, skull: 4, rocket: 11 },
    replyCount: 6,
  },
  {
    id: "th6", userId: "u2", ticker: "AAPL", direction: "BUY",
    title: "Apple Intelligence will drive the biggest upgrade cycle since iPhone 6",
    body: "Apple's installed base is 2.2 billion devices. Only 15% of iPhones are iPhone 15 or newer — the minimum for Apple Intelligence features. That means 85% of the base needs to upgrade to access the AI features that are becoming table stakes.\n\nServices revenue is already $24B/quarter with 40%+ margins. Every new device sold feeds the services flywheel: App Store, iCloud, Apple TV+, Apple Music. The hardware is the razor, services are the blade.\n\nThe Vision Pro flopped at $3,500, but Apple will iterate down to $1,500 within 2 years. That's when spatial computing goes mainstream. Meanwhile, the core iPhone + Services combo generates $100B+ in annual free cash flow. At 30x earnings, it's fairly valued, but the upgrade cycle catalyst gives 15-20% upside from here.",
    createdAt: hoursAgo(9),
    reactions: { fire: 27, skull: 2, rocket: 19 },
    replyCount: 9,
  },
];

const tradeFeedItems: FeedItem[] = mockTrades.map((trade) => ({
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

const thesisFeedItems: FeedItem[] = mockTheses.map((thesis) => ({
  id: `fi-${thesis.id}`,
  type: "thesis" as const,
  thesis: { ...thesis, user: mockUsers.find((u) => u.id === thesis.userId) },
  user: mockUsers.find((u) => u.id === thesis.userId)!,
  timestamp: thesis.createdAt,
  reactions: thesis.reactions,
}));

export const mockFeed: FeedItem[] = [
  ...tradeFeedItems,
  ...thesisFeedItems,
].sort((a, b) => {
  const parseTime = (t: string) => {
    const m = t.match(/^(\d+)(m|h)$/);
    if (!m) return 0;
    return m[2] === "m" ? parseInt(m[1]) : parseInt(m[1]) * 60;
  };
  return parseTime(a.timestamp) - parseTime(b.timestamp);
});

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
  META: { ticker: "META", price: 612.40, change: 8.60, changePercent: 1.42, high: 615.20, low: 602.80, open: 603.80, previousClose: 603.80, volume: 18_900_000 },
  GOOG: { ticker: "GOOG", price: 176.30, change: -1.20, changePercent: -0.68, high: 178.40, low: 175.10, open: 177.50, previousClose: 177.50, volume: 22_400_000 },
  COIN: { ticker: "COIN", price: 263.50, change: 12.80, changePercent: 5.11, high: 268.30, low: 249.70, open: 250.70, previousClose: 250.70, volume: 14_600_000 },
  MSTR: { ticker: "MSTR", price: 214.80, change: 9.40, changePercent: 4.58, high: 218.60, low: 204.10, open: 205.40, previousClose: 205.40, volume: 31_200_000 },
  CRWD: { ticker: "CRWD", price: 358.20, change: 5.70, changePercent: 1.62, high: 361.40, low: 351.30, open: 352.50, previousClose: 352.50, volume: 6_800_000 },
  SNOW: { ticker: "SNOW", price: 172.40, change: -3.80, changePercent: -2.16, high: 177.20, low: 171.10, open: 176.20, previousClose: 176.20, volume: 8_300_000 },
  SQ: { ticker: "SQ", price: 82.60, change: 1.90, changePercent: 2.35, high: 83.40, low: 80.20, open: 80.70, previousClose: 80.70, volume: 11_500_000 },
  SOFI: { ticker: "SOFI", price: 14.85, change: 0.65, changePercent: 4.58, high: 15.10, low: 14.08, open: 14.20, previousClose: 14.20, volume: 42_700_000 },
  RIVN: { ticker: "RIVN", price: 16.30, change: -0.90, changePercent: -5.23, high: 17.40, low: 16.10, open: 17.20, previousClose: 17.20, volume: 28_400_000 },
  ARM: { ticker: "ARM", price: 168.90, change: 4.20, changePercent: 2.55, high: 170.80, low: 163.50, open: 164.70, previousClose: 164.70, volume: 9_100_000 },
  NET: { ticker: "NET", price: 118.40, change: 2.10, changePercent: 1.81, high: 119.60, low: 115.80, open: 116.30, previousClose: 116.30, volume: 5_600_000 },
  SHOP: { ticker: "SHOP", price: 109.20, change: 3.40, changePercent: 3.21, high: 110.50, low: 105.30, open: 105.80, previousClose: 105.80, volume: 12_800_000 },
  RKLB: { ticker: "RKLB", price: 24.60, change: 1.80, changePercent: 7.89, high: 25.10, low: 22.50, open: 22.80, previousClose: 22.80, volume: 35_200_000 },
  QQQ: { ticker: "QQQ", price: 504.30, change: 3.20, changePercent: 0.64, high: 506.10, low: 500.40, open: 501.10, previousClose: 501.10, volume: 45_600_000 },
};

export const trendingTickers = [
  { ticker: "NVDA", name: "NVIDIA Corp", sentiment: 87 },
  { ticker: "PLTR", name: "Palantir Technologies", sentiment: 79 },
  { ticker: "SMCI", name: "Super Micro Computer", sentiment: 72 },
  { ticker: "TSLA", name: "Tesla Inc", sentiment: 54 },
  { ticker: "AMD", name: "Advanced Micro Devices", sentiment: 65 },
  { ticker: "AAPL", name: "Apple Inc", sentiment: 74 },
  { ticker: "META", name: "Meta Platforms", sentiment: 81 },
  { ticker: "GOOG", name: "Alphabet Inc", sentiment: 68 },
  { ticker: "MSFT", name: "Microsoft Corp", sentiment: 76 },
  { ticker: "AMZN", name: "Amazon.com Inc", sentiment: 73 },
  { ticker: "COIN", name: "Coinbase Global", sentiment: 82 },
  { ticker: "MSTR", name: "MicroStrategy Inc", sentiment: 78 },
  { ticker: "CRWD", name: "CrowdStrike Holdings", sentiment: 71 },
  { ticker: "SNOW", name: "Snowflake Inc", sentiment: 48 },
  { ticker: "SQ", name: "Block Inc", sentiment: 66 },
  { ticker: "SOFI", name: "SoFi Technologies", sentiment: 77 },
  { ticker: "RIVN", name: "Rivian Automotive", sentiment: 42 },
  { ticker: "ARM", name: "Arm Holdings", sentiment: 83 },
  { ticker: "NET", name: "Cloudflare Inc", sentiment: 69 },
  { ticker: "SHOP", name: "Shopify Inc", sentiment: 75 },
  { ticker: "RKLB", name: "Rocket Lab USA", sentiment: 88 },
  { ticker: "QQQ", name: "Invesco QQQ Trust", sentiment: 70 },
  { ticker: "SPY", name: "SPDR S&P 500 ETF", sentiment: 64 },
  { ticker: "VOO", name: "Vanguard S&P 500 ETF", sentiment: 62 },
];
