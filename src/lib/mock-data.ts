import { User, Trade, Thesis, FeedItem, LeaderboardEntry, Position, StockQuote, StockInfo, MarketIndex } from "./types";

function hoursAgo(h: number) {
  return `${h}h`;
}
function minutesAgo(m: number) {
  return `${m}m`;
}

function makeQuote(ticker: string, price: number, changePct: number, volume: number): StockQuote {
  const change = +(price * changePct / 100).toFixed(2);
  const previousClose = +(price - change).toFixed(2);
  const high = +(price * (1 + Math.abs(changePct) / 100 * 0.6 + 0.003)).toFixed(2);
  const low = +(price * (1 - Math.abs(changePct) / 100 * 0.4 - 0.003)).toFixed(2);
  const open = +(previousClose + change * 0.3).toFixed(2);
  return { ticker, price, change, changePercent: changePct, high, low, open, previousClose, volume };
}

// ── All assets ──────────────────────────────────────────────────

export const allStocks: StockInfo[] = [
  // Technology (18)
  { ticker: "AAPL", name: "Apple Inc.", type: "stock", sector: "Technology", industry: "Consumer Electronics", marketCap: "mega", sentiment: 74 },
  { ticker: "MSFT", name: "Microsoft Corp.", type: "stock", sector: "Technology", industry: "Software", marketCap: "mega", sentiment: 76 },
  { ticker: "NVDA", name: "NVIDIA Corp.", type: "stock", sector: "Technology", industry: "Semiconductors", marketCap: "mega", sentiment: 87 },
  { ticker: "AMD", name: "Advanced Micro Devices", type: "stock", sector: "Technology", industry: "Semiconductors", marketCap: "large", sentiment: 65 },
  { ticker: "AVGO", name: "Broadcom Inc.", type: "stock", sector: "Technology", industry: "Semiconductors", marketCap: "mega", sentiment: 72 },
  { ticker: "CRM", name: "Salesforce Inc.", type: "stock", sector: "Technology", industry: "Software", marketCap: "large", sentiment: 63 },
  { ticker: "ADBE", name: "Adobe Inc.", type: "stock", sector: "Technology", industry: "Software", marketCap: "large", sentiment: 58 },
  { ticker: "ORCL", name: "Oracle Corp.", type: "stock", sector: "Technology", industry: "Software", marketCap: "large", sentiment: 67 },
  { ticker: "INTC", name: "Intel Corp.", type: "stock", sector: "Technology", industry: "Semiconductors", marketCap: "mid", sentiment: 38 },
  { ticker: "CSCO", name: "Cisco Systems", type: "stock", sector: "Technology", industry: "Networking", marketCap: "large", sentiment: 52 },
  { ticker: "PLTR", name: "Palantir Technologies", type: "stock", sector: "Technology", industry: "Software", marketCap: "large", sentiment: 79 },
  { ticker: "ARM", name: "Arm Holdings", type: "stock", sector: "Technology", industry: "Semiconductors", marketCap: "large", sentiment: 83 },
  { ticker: "CRWD", name: "CrowdStrike Holdings", type: "stock", sector: "Technology", industry: "Cybersecurity", marketCap: "large", sentiment: 71 },
  { ticker: "NOW", name: "ServiceNow Inc.", type: "stock", sector: "Technology", industry: "Software", marketCap: "large", sentiment: 74 },
  { ticker: "SMCI", name: "Super Micro Computer", type: "stock", sector: "Technology", industry: "Hardware", marketCap: "mid", sentiment: 72 },
  { ticker: "SNOW", name: "Snowflake Inc.", type: "stock", sector: "Technology", industry: "Cloud Computing", marketCap: "mid", sentiment: 48 },
  { ticker: "NET", name: "Cloudflare Inc.", type: "stock", sector: "Technology", industry: "Cloud Computing", marketCap: "mid", sentiment: 69 },
  { ticker: "SHOP", name: "Shopify Inc.", type: "stock", sector: "Technology", industry: "E-Commerce", marketCap: "large", sentiment: 75 },

  // Communication Services (5)
  { ticker: "GOOG", name: "Alphabet Inc.", type: "stock", sector: "Communication Services", industry: "Internet", marketCap: "mega", sentiment: 68 },
  { ticker: "META", name: "Meta Platforms", type: "stock", sector: "Communication Services", industry: "Social Media", marketCap: "mega", sentiment: 81 },
  { ticker: "NFLX", name: "Netflix Inc.", type: "stock", sector: "Communication Services", industry: "Streaming", marketCap: "large", sentiment: 70 },
  { ticker: "DIS", name: "Walt Disney Co.", type: "stock", sector: "Communication Services", industry: "Entertainment", marketCap: "large", sentiment: 55 },
  { ticker: "CMCSA", name: "Comcast Corp.", type: "stock", sector: "Communication Services", industry: "Telecom", marketCap: "large", sentiment: 44 },

  // Consumer Discretionary (7)
  { ticker: "AMZN", name: "Amazon.com Inc.", type: "stock", sector: "Consumer Discretionary", industry: "E-Commerce", marketCap: "mega", sentiment: 73 },
  { ticker: "TSLA", name: "Tesla Inc.", type: "stock", sector: "Consumer Discretionary", industry: "Electric Vehicles", marketCap: "mega", sentiment: 54 },
  { ticker: "HD", name: "Home Depot Inc.", type: "stock", sector: "Consumer Discretionary", industry: "Home Improvement", marketCap: "large", sentiment: 60 },
  { ticker: "NKE", name: "Nike Inc.", type: "stock", sector: "Consumer Discretionary", industry: "Apparel", marketCap: "large", sentiment: 42 },
  { ticker: "SBUX", name: "Starbucks Corp.", type: "stock", sector: "Consumer Discretionary", industry: "Restaurants", marketCap: "large", sentiment: 50 },
  { ticker: "MCD", name: "McDonald's Corp.", type: "stock", sector: "Consumer Discretionary", industry: "Restaurants", marketCap: "large", sentiment: 62 },
  { ticker: "RIVN", name: "Rivian Automotive", type: "stock", sector: "Consumer Discretionary", industry: "Electric Vehicles", marketCap: "mid", sentiment: 42 },

  // Healthcare (6)
  { ticker: "JNJ", name: "Johnson & Johnson", type: "stock", sector: "Healthcare", industry: "Pharmaceuticals", marketCap: "mega", sentiment: 56 },
  { ticker: "UNH", name: "UnitedHealth Group", type: "stock", sector: "Healthcare", industry: "Health Insurance", marketCap: "mega", sentiment: 64 },
  { ticker: "PFE", name: "Pfizer Inc.", type: "stock", sector: "Healthcare", industry: "Pharmaceuticals", marketCap: "large", sentiment: 35 },
  { ticker: "LLY", name: "Eli Lilly & Co.", type: "stock", sector: "Healthcare", industry: "Pharmaceuticals", marketCap: "mega", sentiment: 85 },
  { ticker: "ABBV", name: "AbbVie Inc.", type: "stock", sector: "Healthcare", industry: "Pharmaceuticals", marketCap: "large", sentiment: 68 },
  { ticker: "MRK", name: "Merck & Co.", type: "stock", sector: "Healthcare", industry: "Pharmaceuticals", marketCap: "large", sentiment: 58 },

  // Financials (9)
  { ticker: "JPM", name: "JPMorgan Chase", type: "stock", sector: "Financials", industry: "Banks", marketCap: "mega", sentiment: 72 },
  { ticker: "BAC", name: "Bank of America", type: "stock", sector: "Financials", industry: "Banks", marketCap: "large", sentiment: 55 },
  { ticker: "GS", name: "Goldman Sachs", type: "stock", sector: "Financials", industry: "Investment Banking", marketCap: "large", sentiment: 66 },
  { ticker: "V", name: "Visa Inc.", type: "stock", sector: "Financials", industry: "Payments", marketCap: "mega", sentiment: 75 },
  { ticker: "MA", name: "Mastercard Inc.", type: "stock", sector: "Financials", industry: "Payments", marketCap: "mega", sentiment: 74 },
  { ticker: "COIN", name: "Coinbase Global", type: "stock", sector: "Financials", industry: "Crypto Exchange", marketCap: "mid", sentiment: 82 },
  { ticker: "SQ", name: "Block Inc.", type: "stock", sector: "Financials", industry: "Fintech", marketCap: "mid", sentiment: 66 },
  { ticker: "SOFI", name: "SoFi Technologies", type: "stock", sector: "Financials", industry: "Fintech", marketCap: "small", sentiment: 77 },
  { ticker: "MSTR", name: "MicroStrategy Inc.", type: "stock", sector: "Financials", industry: "Software/BTC", marketCap: "mid", sentiment: 78 },

  // Industrials (6)
  { ticker: "BA", name: "Boeing Co.", type: "stock", sector: "Industrials", industry: "Aerospace", marketCap: "large", sentiment: 40 },
  { ticker: "CAT", name: "Caterpillar Inc.", type: "stock", sector: "Industrials", industry: "Machinery", marketCap: "large", sentiment: 65 },
  { ticker: "HON", name: "Honeywell Int'l", type: "stock", sector: "Industrials", industry: "Conglomerate", marketCap: "large", sentiment: 58 },
  { ticker: "GE", name: "GE Aerospace", type: "stock", sector: "Industrials", industry: "Aerospace", marketCap: "large", sentiment: 71 },
  { ticker: "LMT", name: "Lockheed Martin", type: "stock", sector: "Industrials", industry: "Defense", marketCap: "large", sentiment: 68 },
  { ticker: "RKLB", name: "Rocket Lab USA", type: "stock", sector: "Industrials", industry: "Aerospace", marketCap: "small", sentiment: 88 },

  // Consumer Staples (5)
  { ticker: "PG", name: "Procter & Gamble", type: "stock", sector: "Consumer Staples", industry: "Household Products", marketCap: "mega", sentiment: 60 },
  { ticker: "KO", name: "Coca-Cola Co.", type: "stock", sector: "Consumer Staples", industry: "Beverages", marketCap: "mega", sentiment: 58 },
  { ticker: "PEP", name: "PepsiCo Inc.", type: "stock", sector: "Consumer Staples", industry: "Beverages", marketCap: "mega", sentiment: 55 },
  { ticker: "WMT", name: "Walmart Inc.", type: "stock", sector: "Consumer Staples", industry: "Retail", marketCap: "mega", sentiment: 70 },
  { ticker: "COST", name: "Costco Wholesale", type: "stock", sector: "Consumer Staples", industry: "Retail", marketCap: "large", sentiment: 76 },

  // Energy (3)
  { ticker: "XOM", name: "Exxon Mobil Corp.", type: "stock", sector: "Energy", industry: "Oil & Gas", marketCap: "mega", sentiment: 52 },
  { ticker: "CVX", name: "Chevron Corp.", type: "stock", sector: "Energy", industry: "Oil & Gas", marketCap: "large", sentiment: 50 },
  { ticker: "COP", name: "ConocoPhillips", type: "stock", sector: "Energy", industry: "Oil & Gas", marketCap: "large", sentiment: 48 },

  // Utilities (2)
  { ticker: "NEE", name: "NextEra Energy", type: "stock", sector: "Utilities", industry: "Renewable Energy", marketCap: "large", sentiment: 62 },
  { ticker: "DUK", name: "Duke Energy Corp.", type: "stock", sector: "Utilities", industry: "Electric Utilities", marketCap: "large", sentiment: 50 },

  // Real Estate (2)
  { ticker: "AMT", name: "American Tower", type: "stock", sector: "Real Estate", industry: "REITs", marketCap: "large", sentiment: 55 },
  { ticker: "PLD", name: "Prologis Inc.", type: "stock", sector: "Real Estate", industry: "REITs", marketCap: "large", sentiment: 53 },

  // Materials (2)
  { ticker: "LIN", name: "Linde plc", type: "stock", sector: "Materials", industry: "Chemicals", marketCap: "large", sentiment: 62 },
  { ticker: "SHW", name: "Sherwin-Williams", type: "stock", sector: "Materials", industry: "Chemicals", marketCap: "large", sentiment: 58 },

  // ETFs (8)
  { ticker: "SPY", name: "SPDR S&P 500 ETF", type: "etf", sentiment: 64 },
  { ticker: "VOO", name: "Vanguard S&P 500 ETF", type: "etf", sentiment: 62 },
  { ticker: "QQQ", name: "Invesco QQQ Trust", type: "etf", sentiment: 70 },
  { ticker: "IWM", name: "iShares Russell 2000", type: "etf", sentiment: 48 },
  { ticker: "DIA", name: "SPDR Dow Jones ETF", type: "etf", sentiment: 56 },
  { ticker: "VTI", name: "Vanguard Total Market", type: "etf", sentiment: 64 },
  { ticker: "ARKK", name: "ARK Innovation ETF", type: "etf", sentiment: 52 },
  { ticker: "XLK", name: "Technology Select SPDR", type: "etf", sentiment: 68 },

  // Crypto (5)
  { ticker: "BTC", name: "Bitcoin", type: "crypto", sentiment: 80 },
  { ticker: "ETH", name: "Ethereum", type: "crypto", sentiment: 72 },
  { ticker: "SOL", name: "Solana", type: "crypto", sentiment: 78 },
  { ticker: "DOGE", name: "Dogecoin", type: "crypto", sentiment: 60 },
  { ticker: "XRP", name: "XRP", type: "crypto", sentiment: 65 },
];

// ── Market Indices ──────────────────────────────────────────────

export const mockIndices: MarketIndex[] = [
  { name: "S&P 500", value: 5842.30, change: 22.10, changePercent: 0.38 },
  { name: "NASDAQ", value: 18492.80, change: 98.40, changePercent: 0.53 },
  { name: "DOW", value: 42780.50, change: -45.20, changePercent: -0.11 },
  { name: "Russell 2000", value: 2218.40, change: 12.60, changePercent: 0.57 },
];

// ── Quotes for all assets ───────────────────────────────────────

export const mockQuotes: Record<string, StockQuote> = {
  // Technology
  AAPL: makeQuote("AAPL", 234.10, 0.77, 54_200_000),
  MSFT: makeQuote("MSFT", 422.10, 0.84, 21_300_000),
  NVDA: makeQuote("NVDA", 148.75, 2.94, 312_400_000),
  AMD: makeQuote("AMD", 162.80, -0.85, 43_500_000),
  AVGO: makeQuote("AVGO", 186.40, 1.52, 28_700_000),
  CRM: makeQuote("CRM", 312.80, 0.92, 8_400_000),
  ADBE: makeQuote("ADBE", 487.30, -0.64, 4_200_000),
  ORCL: makeQuote("ORCL", 178.50, 1.38, 12_600_000),
  INTC: makeQuote("INTC", 22.40, -2.18, 58_300_000),
  CSCO: makeQuote("CSCO", 57.80, 0.35, 16_200_000),
  PLTR: makeQuote("PLTR", 84.20, 4.21, 145_300_000),
  ARM: makeQuote("ARM", 168.90, 2.55, 9_100_000),
  CRWD: makeQuote("CRWD", 358.20, 1.62, 6_800_000),
  NOW: makeQuote("NOW", 924.50, 1.14, 3_200_000),
  SMCI: makeQuote("SMCI", 45.10, 6.62, 67_800_000),
  SNOW: makeQuote("SNOW", 172.40, -2.16, 8_300_000),
  NET: makeQuote("NET", 118.40, 1.81, 5_600_000),
  SHOP: makeQuote("SHOP", 109.20, 3.21, 12_800_000),

  // Communication Services
  GOOG: makeQuote("GOOG", 176.30, -0.68, 22_400_000),
  META: makeQuote("META", 612.40, 1.42, 18_900_000),
  NFLX: makeQuote("NFLX", 782.60, 1.85, 7_200_000),
  DIS: makeQuote("DIS", 112.40, -0.53, 11_800_000),
  CMCSA: makeQuote("CMCSA", 42.30, -0.71, 19_400_000),

  // Consumer Discretionary
  AMZN: makeQuote("AMZN", 198.70, 1.17, 38_700_000),
  TSLA: makeQuote("TSLA", 348.90, -2.30, 89_600_000),
  HD: makeQuote("HD", 392.80, 0.48, 5_300_000),
  NKE: makeQuote("NKE", 78.40, -1.52, 14_600_000),
  SBUX: makeQuote("SBUX", 98.20, 0.31, 8_700_000),
  MCD: makeQuote("MCD", 298.50, 0.67, 4_100_000),
  RIVN: makeQuote("RIVN", 16.30, -5.23, 28_400_000),

  // Healthcare
  JNJ: makeQuote("JNJ", 158.40, 0.25, 7_800_000),
  UNH: makeQuote("UNH", 568.20, -0.42, 4_200_000),
  PFE: makeQuote("PFE", 28.60, -1.38, 32_400_000),
  LLY: makeQuote("LLY", 842.30, 2.14, 5_600_000),
  ABBV: makeQuote("ABBV", 192.50, 0.84, 6_800_000),
  MRK: makeQuote("MRK", 128.40, -0.31, 9_200_000),

  // Financials
  JPM: makeQuote("JPM", 218.60, 0.92, 8_400_000),
  BAC: makeQuote("BAC", 42.80, 0.47, 28_600_000),
  GS: makeQuote("GS", 512.40, 1.18, 3_200_000),
  V: makeQuote("V", 292.80, 0.55, 6_100_000),
  MA: makeQuote("MA", 478.30, 0.62, 3_800_000),
  COIN: makeQuote("COIN", 263.50, 5.11, 14_600_000),
  SQ: makeQuote("SQ", 82.60, 2.35, 11_500_000),
  SOFI: makeQuote("SOFI", 14.85, 4.58, 42_700_000),
  MSTR: makeQuote("MSTR", 214.80, 4.58, 31_200_000),

  // Industrials
  BA: makeQuote("BA", 178.20, -1.84, 12_400_000),
  CAT: makeQuote("CAT", 368.40, 0.72, 4_600_000),
  HON: makeQuote("HON", 212.30, 0.38, 4_200_000),
  GE: makeQuote("GE", 182.60, 1.24, 7_800_000),
  LMT: makeQuote("LMT", 548.20, 0.55, 2_400_000),
  RKLB: makeQuote("RKLB", 24.60, 7.89, 35_200_000),

  // Consumer Staples
  PG: makeQuote("PG", 172.40, 0.41, 6_200_000),
  KO: makeQuote("KO", 62.80, 0.32, 12_400_000),
  PEP: makeQuote("PEP", 168.30, -0.24, 5_800_000),
  WMT: makeQuote("WMT", 82.40, 0.85, 9_400_000),
  COST: makeQuote("COST", 892.30, 1.12, 2_800_000),

  // Energy
  XOM: makeQuote("XOM", 118.40, -0.68, 14_200_000),
  CVX: makeQuote("CVX", 162.30, -0.55, 8_600_000),
  COP: makeQuote("COP", 112.40, -0.89, 6_400_000),

  // Utilities
  NEE: makeQuote("NEE", 82.60, 0.73, 8_200_000),
  DUK: makeQuote("DUK", 108.40, 0.28, 4_600_000),

  // Real Estate
  AMT: makeQuote("AMT", 218.60, -0.46, 3_800_000),
  PLD: makeQuote("PLD", 124.30, -0.32, 5_200_000),

  // Materials
  LIN: makeQuote("LIN", 468.20, 0.64, 2_400_000),
  SHW: makeQuote("SHW", 368.40, 0.52, 1_800_000),

  // ETFs
  SPY: makeQuote("SPY", 582.40, 0.36, 72_100_000),
  VOO: makeQuote("VOO", 537.80, 0.35, 4_200_000),
  QQQ: makeQuote("QQQ", 504.30, 0.64, 45_600_000),
  IWM: makeQuote("IWM", 222.40, 0.58, 28_400_000),
  DIA: makeQuote("DIA", 428.60, -0.10, 5_200_000),
  VTI: makeQuote("VTI", 278.40, 0.42, 6_800_000),
  ARKK: makeQuote("ARKK", 52.80, 2.34, 18_600_000),
  XLK: makeQuote("XLK", 218.40, 0.82, 8_400_000),

  // Crypto
  BTC: makeQuote("BTC", 68420.00, 3.24, 42_800_000),
  ETH: makeQuote("ETH", 3842.50, 2.68, 18_400_000),
  SOL: makeQuote("SOL", 178.40, 5.42, 8_600_000),
  DOGE: makeQuote("DOGE", 0.142, 4.41, 3_200_000_000),
  XRP: makeQuote("XRP", 0.628, 2.12, 1_800_000_000),
};

// ── Trending tickers (top 24 by sentiment) ──────────────────────

export const trendingTickers: StockInfo[] = [...allStocks]
  .sort((a, b) => b.sentiment - a.sentiment)
  .slice(0, 24);

// ── Stocks by sector ────────────────────────────────────────────

export function getStocksBySector(): Record<string, StockInfo[]> {
  const sectors: Record<string, StockInfo[]> = {};
  for (const s of allStocks) {
    if (s.sector) {
      if (!sectors[s.sector]) sectors[s.sector] = [];
      sectors[s.sector].push(s);
    }
  }
  return sectors;
}

export function getStocksByType(type: StockInfo["type"]): StockInfo[] {
  return allStocks.filter((s) => s.type === type);
}

// ── Users, Trades, Theses (unchanged) ───────────────────────────

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
