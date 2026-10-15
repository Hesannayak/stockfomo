import type { StockQuote, AnalystRating, EarningsData } from "./types";
import { mockQuotes, allStocks } from "./mock-data";

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockDetail {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  peRatio: number;
  eps: number;
  dividend: string;
  volume: string;
  avgVolume: string;
  high52w: number;
  low52w: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  about: string;
  sector?: string;
  industry?: string;
  analystRating?: AnalystRating;
  earnings?: EarningsData[];
  relatedTickers?: string[];
}

type DetailBase = Omit<StockDetail, "price" | "change" | "changePercent" | "open" | "high" | "low" | "previousClose">;

function fmtVol(v: number): string {
  if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(1)}B`;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  return `${(v / 1_000).toFixed(0)}K`;
}

function detail(
  ticker: string, name: string, marketCap: string, peRatio: number, eps: number, dividend: string,
  vol: number, avgVol: number, high52w: number, low52w: number, about: string,
  extra?: { sector?: string; industry?: string; analystRating?: AnalystRating; earnings?: EarningsData[]; relatedTickers?: string[] }
): DetailBase {
  return {
    ticker, name, marketCap, peRatio, eps, dividend,
    volume: fmtVol(vol), avgVolume: fmtVol(avgVol), high52w, low52w, about,
    ...extra,
  };
}

const stockDetails: Record<string, DetailBase> = {
  // ── Technology ─────────────────────────────────────────────
  AAPL: detail("AAPL", "Apple Inc.", "3.57T", 38.5, 6.08, "0.42%", 54_200_000, 48_700_000, 260.10, 169.21,
    "Apple designs consumer electronics, software, and services. Products include iPhone, Mac, iPad, Apple Watch, and services like iCloud, Apple Music, and Apple TV+.",
    { sector: "Technology", industry: "Consumer Electronics", analystRating: { buy: 28, hold: 12, sell: 2, priceTarget: 255, consensus: "Buy" }, relatedTickers: ["MSFT", "GOOG", "AMZN", "META"] }),

  MSFT: detail("MSFT", "Microsoft Corporation", "3.14T", 35.2, 11.99, "0.72%", 21_300_000, 19_400_000, 468.35, 385.58,
    "Microsoft develops software, services, and devices. Key products include Windows, Office 365, Azure cloud computing, LinkedIn, and Xbox gaming.",
    { sector: "Technology", industry: "Software", analystRating: { buy: 36, hold: 6, sell: 0, priceTarget: 470, consensus: "Strong Buy" }, relatedTickers: ["AAPL", "GOOG", "AMZN", "CRM"] }),

  NVDA: detail("NVDA", "NVIDIA Corporation", "3.64T", 62.4, 2.38, "0.01%", 312_400_000, 283_100_000, 153.13, 75.61,
    "NVIDIA designs and sells GPUs for gaming, data centers, and AI workloads. The company leads the AI chip market with its CUDA platform and H100/B200 accelerators.",
    { sector: "Technology", industry: "Semiconductors", analystRating: { buy: 42, hold: 4, sell: 1, priceTarget: 175, consensus: "Strong Buy" }, earnings: [
      { date: "2024-11-20", epsEstimate: 0.74, epsActual: 0.81, revenueEstimate: "33.1B", revenueActual: "35.1B", surprise: 9.5 },
      { date: "2025-02-26", epsEstimate: 0.84, epsActual: 0.89, revenueEstimate: "38.0B", revenueActual: "39.3B", surprise: 5.9 },
      { date: "2025-05-28", epsEstimate: 0.92, epsActual: null, revenueEstimate: "43.2B", revenueActual: null, surprise: null },
    ], relatedTickers: ["AMD", "AVGO", "ARM", "SMCI"] }),

  AMD: detail("AMD", "Advanced Micro Devices, Inc.", "263.9B", 109.3, 1.49, "—", 43_500_000, 39_800_000, 227.30, 117.01,
    "AMD designs CPUs, GPUs, and adaptive computing products. The company competes with Intel in processors and NVIDIA in data center accelerators.",
    { sector: "Technology", industry: "Semiconductors", analystRating: { buy: 30, hold: 10, sell: 2, priceTarget: 190, consensus: "Buy" }, relatedTickers: ["NVDA", "INTC", "AVGO", "ARM"] }),

  AVGO: detail("AVGO", "Broadcom Inc.", "868.4B", 36.8, 5.07, "1.24%", 28_700_000, 24_200_000, 205.30, 120.50,
    "Broadcom designs semiconductor and infrastructure software solutions. Key products span networking, broadband, wireless, storage, and industrial markets.",
    { sector: "Technology", industry: "Semiconductors", analystRating: { buy: 28, hold: 8, sell: 1, priceTarget: 210, consensus: "Buy" }, relatedTickers: ["NVDA", "AMD", "INTC", "CSCO"] }),

  CRM: detail("CRM", "Salesforce, Inc.", "303.2B", 48.6, 6.44, "0.56%", 8_400_000, 7_200_000, 348.86, 218.01,
    "Salesforce is the world's leading CRM platform, providing cloud-based sales, service, marketing, and analytics applications for businesses of all sizes.",
    { sector: "Technology", industry: "Software", analystRating: { buy: 32, hold: 12, sell: 1, priceTarget: 340, consensus: "Buy" }, relatedTickers: ["MSFT", "NOW", "ADBE", "ORCL"] }),

  ADBE: detail("ADBE", "Adobe Inc.", "215.8B", 42.3, 11.52, "—", 4_200_000, 3_800_000, 638.25, 403.75,
    "Adobe provides creative, document, and digital marketing software. Creative Cloud (Photoshop, Illustrator, Premiere Pro) and Document Cloud drive its subscription revenue.",
    { sector: "Technology", industry: "Software", analystRating: { buy: 22, hold: 14, sell: 2, priceTarget: 550, consensus: "Buy" }, relatedTickers: ["CRM", "MSFT", "NOW", "SHOP"] }),

  ORCL: detail("ORCL", "Oracle Corporation", "498.6B", 38.2, 4.67, "0.89%", 12_600_000, 10_800_000, 198.31, 112.40,
    "Oracle provides cloud infrastructure, database software, and enterprise applications. Its Oracle Cloud Infrastructure (OCI) is growing rapidly in the AI/cloud market.",
    { sector: "Technology", industry: "Software", analystRating: { buy: 20, hold: 14, sell: 3, priceTarget: 190, consensus: "Buy" }, relatedTickers: ["MSFT", "CRM", "NOW", "GOOG"] }),

  INTC: detail("INTC", "Intel Corporation", "96.2B", 0, -0.38, "—", 58_300_000, 52_400_000, 51.28, 18.84,
    "Intel designs and manufactures CPUs, chipsets, and related semiconductor products. The company is undergoing a major transformation with its IDM 2.0 foundry strategy.",
    { sector: "Technology", industry: "Semiconductors", analystRating: { buy: 4, hold: 28, sell: 10, priceTarget: 24, consensus: "Hold" }, relatedTickers: ["AMD", "NVDA", "AVGO", "ARM"] }),

  CSCO: detail("CSCO", "Cisco Systems, Inc.", "236.8B", 16.8, 3.44, "2.82%", 16_200_000, 14_600_000, 62.78, 44.30,
    "Cisco provides networking hardware, software, and security solutions. The company dominates enterprise networking with switches, routers, and collaboration tools.",
    { sector: "Technology", industry: "Networking", analystRating: { buy: 14, hold: 18, sell: 2, priceTarget: 62, consensus: "Hold" }, relatedTickers: ["AVGO", "NET", "CRWD", "HON"] }),

  PLTR: detail("PLTR", "Palantir Technologies Inc.", "195.8B", 412.5, 0.20, "—", 145_300_000, 128_400_000, 125.41, 20.33,
    "Palantir builds software platforms for data integration and analysis. Gotham serves government agencies while Foundry and AIP serve commercial customers.",
    { sector: "Technology", industry: "Software", analystRating: { buy: 8, hold: 10, sell: 6, priceTarget: 75, consensus: "Hold" }, relatedTickers: ["NOW", "CRM", "SNOW", "CRWD"] }),

  ARM: detail("ARM", "Arm Holdings plc", "172.4B", 248.6, 0.68, "—", 9_100_000, 8_200_000, 188.75, 68.58,
    "Arm designs CPU architectures licensed by virtually every smartphone maker, and increasingly by data center and automotive chip designers.",
    { sector: "Technology", industry: "Semiconductors", analystRating: { buy: 24, hold: 12, sell: 4, priceTarget: 180, consensus: "Buy" }, relatedTickers: ["NVDA", "AMD", "AVGO", "INTC"] }),

  CRWD: detail("CRWD", "CrowdStrike Holdings, Inc.", "87.6B", 482.4, 0.74, "—", 6_800_000, 5_600_000, 398.33, 200.81,
    "CrowdStrike provides cloud-native cybersecurity via its Falcon platform. The company is a leader in endpoint detection, threat intelligence, and incident response.",
    { sector: "Technology", industry: "Cybersecurity", analystRating: { buy: 36, hold: 8, sell: 1, priceTarget: 385, consensus: "Strong Buy" }, relatedTickers: ["PLTR", "NET", "NOW", "SNOW"] }),

  NOW: detail("NOW", "ServiceNow, Inc.", "190.4B", 68.2, 13.56, "—", 3_200_000, 2_800_000, 1012.50, 637.99,
    "ServiceNow provides cloud-based workflow automation for IT, employee, and customer service. Its Now Platform uses AI to streamline enterprise operations.",
    { sector: "Technology", industry: "Software", analystRating: { buy: 34, hold: 6, sell: 0, priceTarget: 990, consensus: "Strong Buy" }, relatedTickers: ["CRM", "MSFT", "PLTR", "ADBE"] }),

  SMCI: detail("SMCI", "Super Micro Computer, Inc.", "26.5B", 14.8, 3.05, "—", 67_800_000, 52_100_000, 122.90, 17.25,
    "Super Micro Computer designs and manufactures high-performance server and storage solutions optimized for AI, cloud, and enterprise workloads.",
    { sector: "Technology", industry: "Hardware", analystRating: { buy: 8, hold: 6, sell: 4, priceTarget: 50, consensus: "Hold" }, relatedTickers: ["NVDA", "AMD", "AVGO", "ARM"] }),

  SNOW: detail("SNOW", "Snowflake Inc.", "56.8B", 0, -1.63, "—", 8_300_000, 7_200_000, 237.24, 107.13,
    "Snowflake operates a cloud data platform for data warehousing, data lakes, and data sharing. The company enables cross-cloud analytics for enterprises.",
    { sector: "Technology", industry: "Cloud Computing", analystRating: { buy: 28, hold: 12, sell: 4, priceTarget: 195, consensus: "Buy" }, relatedTickers: ["CRM", "PLTR", "NET", "NOW"] }),

  NET: detail("NET", "Cloudflare, Inc.", "36.8B", 0, -0.12, "—", 5_600_000, 4_800_000, 132.58, 64.75,
    "Cloudflare provides a global cloud platform for security, performance, and reliability services. Its network spans 300+ cities and handles ~20% of internet traffic.",
    { sector: "Technology", industry: "Cloud Computing", analystRating: { buy: 22, hold: 10, sell: 2, priceTarget: 130, consensus: "Buy" }, relatedTickers: ["CRWD", "SNOW", "CSCO", "NOW"] }),

  SHOP: detail("SHOP", "Shopify Inc.", "140.6B", 78.4, 1.39, "—", 12_800_000, 10_400_000, 125.62, 50.30,
    "Shopify provides a commerce platform for merchants to create online stores, process payments, and manage shipping. It powers millions of businesses worldwide.",
    { sector: "Technology", industry: "E-Commerce", analystRating: { buy: 26, hold: 10, sell: 2, priceTarget: 120, consensus: "Buy" }, relatedTickers: ["AMZN", "SQ", "ADBE", "META"] }),

  // ── Communication Services ─────────────────────────────────
  GOOG: detail("GOOG", "Alphabet Inc.", "2.18T", 24.8, 7.11, "—", 22_400_000, 20_200_000, 192.18, 130.67,
    "Alphabet operates Google Search, YouTube, Google Cloud, and Waymo autonomous vehicles. Advertising revenue accounts for ~80% of total revenue.",
    { sector: "Communication Services", industry: "Internet", analystRating: { buy: 38, hold: 6, sell: 1, priceTarget: 200, consensus: "Strong Buy" }, relatedTickers: ["META", "MSFT", "AMZN", "AAPL"] }),

  META: detail("META", "Meta Platforms, Inc.", "1.57T", 28.4, 21.56, "0.32%", 18_900_000, 16_800_000, 638.40, 390.42,
    "Meta operates Facebook, Instagram, WhatsApp, and Messenger, serving ~3.9 billion monthly users. The company is investing heavily in AI and metaverse/Reality Labs.",
    { sector: "Communication Services", industry: "Social Media", analystRating: { buy: 40, hold: 6, sell: 1, priceTarget: 650, consensus: "Strong Buy" }, relatedTickers: ["GOOG", "SNAP", "NFLX", "AMZN"] }),

  NFLX: detail("NFLX", "Netflix, Inc.", "338.6B", 48.2, 16.24, "—", 7_200_000, 6_400_000, 812.50, 445.80,
    "Netflix is the world's leading streaming entertainment service with 280M+ paid memberships. The company produces original content and has added ad-supported tiers.",
    { sector: "Communication Services", industry: "Streaming", analystRating: { buy: 28, hold: 14, sell: 2, priceTarget: 800, consensus: "Buy" }, relatedTickers: ["DIS", "AMZN", "GOOG", "META"] }),

  DIS: detail("DIS", "The Walt Disney Company", "204.8B", 38.6, 2.91, "0.89%", 11_800_000, 10_200_000, 128.38, 84.07,
    "Disney operates theme parks, media networks (ABC, ESPN), streaming services (Disney+, Hulu), and produces films through Marvel, Pixar, Lucasfilm, and 20th Century Studios.",
    { sector: "Communication Services", industry: "Entertainment", analystRating: { buy: 18, hold: 14, sell: 4, priceTarget: 125, consensus: "Buy" }, relatedTickers: ["NFLX", "CMCSA", "META", "AMZN"] }),

  CMCSA: detail("CMCSA", "Comcast Corporation", "164.8B", 10.8, 3.92, "3.24%", 19_400_000, 17_200_000, 48.30, 34.82,
    "Comcast operates NBCUniversal (media, film, theme parks), Xfinity (cable/internet), and Sky (European pay-TV). It is the largest US cable/internet provider.",
    { sector: "Communication Services", industry: "Telecom", analystRating: { buy: 14, hold: 16, sell: 4, priceTarget: 48, consensus: "Hold" }, relatedTickers: ["DIS", "NFLX", "GOOG", "T"] }),

  // ── Consumer Discretionary ─────────────────────────────────
  AMZN: detail("AMZN", "Amazon.com, Inc.", "2.09T", 38.7, 5.13, "—", 38_700_000, 35_200_000, 242.52, 161.02,
    "Amazon operates the world's largest e-commerce marketplace, Amazon Web Services (AWS) cloud computing, advertising, and entertainment streaming.",
    { sector: "Consumer Discretionary", industry: "E-Commerce", analystRating: { buy: 42, hold: 4, sell: 0, priceTarget: 225, consensus: "Strong Buy" }, relatedTickers: ["MSFT", "GOOG", "META", "SHOP"] }),

  TSLA: detail("TSLA", "Tesla, Inc.", "1.12T", 178.2, 1.96, "—", 89_600_000, 95_200_000, 488.54, 138.80,
    "Tesla designs, manufactures, and sells electric vehicles, energy storage systems, and solar products. The company also develops autonomous driving technology.",
    { sector: "Consumer Discretionary", industry: "Electric Vehicles", analystRating: { buy: 18, hold: 14, sell: 12, priceTarget: 310, consensus: "Hold" }, relatedTickers: ["RIVN", "NIO", "F", "GM"] }),

  HD: detail("HD", "The Home Depot, Inc.", "392.8B", 26.4, 14.88, "2.28%", 5_300_000, 4_600_000, 418.52, 322.14,
    "Home Depot is the world's largest home improvement retailer with 2,300+ stores. The company sells building materials, tools, and home improvement products.",
    { sector: "Consumer Discretionary", industry: "Home Improvement", analystRating: { buy: 22, hold: 12, sell: 2, priceTarget: 415, consensus: "Buy" }, relatedTickers: ["LOW", "WMT", "COST", "CAT"] }),

  NKE: detail("NKE", "Nike, Inc.", "120.4B", 28.2, 2.78, "1.62%", 14_600_000, 12_800_000, 118.42, 70.82,
    "Nike designs and sells athletic footwear, apparel, and equipment globally. Its brands include Nike, Jordan, and Converse, sold through retail and direct-to-consumer channels.",
    { sector: "Consumer Discretionary", industry: "Apparel", analystRating: { buy: 16, hold: 18, sell: 6, priceTarget: 90, consensus: "Hold" }, relatedTickers: ["LULU", "ADIDAS", "SBUX", "DIS"] }),

  SBUX: detail("SBUX", "Starbucks Corporation", "112.8B", 28.4, 3.46, "2.48%", 8_700_000, 7_400_000, 112.48, 72.50,
    "Starbucks operates 38,000+ coffee stores globally and sells packaged coffee products. The company is the world's largest specialty coffee retailer.",
    { sector: "Consumer Discretionary", industry: "Restaurants", analystRating: { buy: 14, hold: 18, sell: 4, priceTarget: 105, consensus: "Hold" }, relatedTickers: ["MCD", "NKE", "DIS", "YUM"] }),

  MCD: detail("MCD", "McDonald's Corporation", "214.6B", 26.8, 11.14, "2.14%", 4_100_000, 3_600_000, 318.92, 242.10,
    "McDonald's operates and franchises the world's largest fast-food restaurant chain with 40,000+ locations in 100+ countries.",
    { sector: "Consumer Discretionary", industry: "Restaurants", analystRating: { buy: 24, hold: 10, sell: 2, priceTarget: 315, consensus: "Buy" }, relatedTickers: ["SBUX", "YUM", "WMT", "KO"] }),

  RIVN: detail("RIVN", "Rivian Automotive, Inc.", "15.2B", 0, -4.68, "—", 28_400_000, 24_200_000, 28.57, 8.26,
    "Rivian designs and manufactures electric vehicles including the R1T pickup truck and R1S SUV. The company also builds electric delivery vans for Amazon.",
    { sector: "Consumer Discretionary", industry: "Electric Vehicles", analystRating: { buy: 14, hold: 10, sell: 6, priceTarget: 18, consensus: "Hold" }, relatedTickers: ["TSLA", "LCID", "F", "GM"] }),

  // ── Healthcare ─────────────────────────────────────────────
  JNJ: detail("JNJ", "Johnson & Johnson", "382.4B", 18.2, 8.70, "2.92%", 7_800_000, 6_800_000, 172.48, 143.62,
    "J&J operates in pharmaceuticals (Innovative Medicine) and medical devices (MedTech). Major drugs include Stelara, Darzalex, and Tremfya.",
    { sector: "Healthcare", industry: "Pharmaceuticals", analystRating: { buy: 12, hold: 14, sell: 4, priceTarget: 175, consensus: "Hold" }, relatedTickers: ["PFE", "MRK", "ABBV", "LLY"] }),

  UNH: detail("UNH", "UnitedHealth Group Inc.", "518.6B", 22.4, 25.37, "1.38%", 4_200_000, 3_600_000, 630.73, 436.38,
    "UnitedHealth is the largest US health insurer, operating UnitedHealthcare (insurance) and Optum (health services, pharmacy benefits, data analytics).",
    { sector: "Healthcare", industry: "Health Insurance", analystRating: { buy: 22, hold: 8, sell: 2, priceTarget: 620, consensus: "Buy" }, relatedTickers: ["CVS", "CI", "HUM", "JNJ"] }),

  PFE: detail("PFE", "Pfizer Inc.", "160.8B", 48.2, 0.59, "5.82%", 32_400_000, 28_600_000, 32.42, 24.48,
    "Pfizer is a global pharmaceutical company developing medicines and vaccines. Key products include Paxlovid (COVID), Eliquis (blood thinner), and oncology treatments.",
    { sector: "Healthcare", industry: "Pharmaceuticals", analystRating: { buy: 8, hold: 18, sell: 6, priceTarget: 32, consensus: "Hold" }, relatedTickers: ["JNJ", "MRK", "ABBV", "LLY"] }),

  LLY: detail("LLY", "Eli Lilly and Company", "802.4B", 128.4, 6.56, "0.62%", 5_600_000, 4_800_000, 972.53, 544.26,
    "Eli Lilly develops treatments for diabetes, obesity, and oncology. Mounjaro/Zepbound (GLP-1 drugs) are driving massive revenue growth in the obesity market.",
    { sector: "Healthcare", industry: "Pharmaceuticals", analystRating: { buy: 22, hold: 6, sell: 1, priceTarget: 950, consensus: "Strong Buy" }, relatedTickers: ["NVO", "PFE", "MRK", "ABBV"] }),

  ABBV: detail("ABBV", "AbbVie Inc.", "340.2B", 22.8, 8.44, "3.42%", 6_800_000, 5_800_000, 212.48, 152.30,
    "AbbVie is a biopharmaceutical company focused on immunology, oncology, and neuroscience. Key drugs include Skyrizi, Rinvoq, and Botox (from Allergan acquisition).",
    { sector: "Healthcare", industry: "Pharmaceuticals", analystRating: { buy: 18, hold: 10, sell: 2, priceTarget: 210, consensus: "Buy" }, relatedTickers: ["JNJ", "PFE", "MRK", "LLY"] }),

  MRK: detail("MRK", "Merck & Co., Inc.", "324.6B", 18.4, 6.98, "2.68%", 9_200_000, 8_000_000, 142.38, 98.72,
    "Merck develops pharmaceuticals, vaccines, and animal health products. Keytruda (cancer immunotherapy) is the world's best-selling drug by revenue.",
    { sector: "Healthcare", industry: "Pharmaceuticals", analystRating: { buy: 18, hold: 12, sell: 2, priceTarget: 140, consensus: "Buy" }, relatedTickers: ["JNJ", "PFE", "ABBV", "LLY"] }),

  // ── Financials ─────────────────────────────────────────────
  JPM: detail("JPM", "JPMorgan Chase & Co.", "628.4B", 12.4, 17.63, "2.08%", 8_400_000, 7_200_000, 244.82, 164.72,
    "JPMorgan is the largest US bank by assets, operating in investment banking, commercial banking, asset management, and consumer banking (Chase).",
    { sector: "Financials", industry: "Banks", analystRating: { buy: 18, hold: 10, sell: 2, priceTarget: 235, consensus: "Buy" }, relatedTickers: ["BAC", "GS", "MS", "WFC"] }),

  BAC: detail("BAC", "Bank of America Corporation", "338.6B", 14.2, 3.01, "2.42%", 28_600_000, 24_800_000, 48.08, 32.40,
    "Bank of America is a multinational financial services company serving consumers, businesses, and institutional investors through its global banking network.",
    { sector: "Financials", industry: "Banks", analystRating: { buy: 14, hold: 12, sell: 4, priceTarget: 46, consensus: "Buy" }, relatedTickers: ["JPM", "WFC", "C", "GS"] }),

  GS: detail("GS", "The Goldman Sachs Group, Inc.", "172.4B", 16.8, 30.50, "2.24%", 3_200_000, 2_800_000, 558.38, 386.42,
    "Goldman Sachs is a global investment bank providing investment banking, securities trading, asset management, and wealth management services.",
    { sector: "Financials", industry: "Investment Banking", analystRating: { buy: 18, hold: 8, sell: 2, priceTarget: 545, consensus: "Buy" }, relatedTickers: ["JPM", "MS", "BAC", "V"] }),

  V: detail("V", "Visa Inc.", "578.4B", 32.6, 8.98, "0.72%", 6_100_000, 5_400_000, 318.72, 252.48,
    "Visa operates the world's largest electronic payment network, processing over 200 billion transactions annually across 200+ countries.",
    { sector: "Financials", industry: "Payments", analystRating: { buy: 32, hold: 6, sell: 0, priceTarget: 320, consensus: "Strong Buy" }, relatedTickers: ["MA", "PYPL", "SQ", "GPN"] }),

  MA: detail("MA", "Mastercard Incorporated", "448.6B", 36.4, 13.14, "0.52%", 3_800_000, 3_200_000, 512.48, 408.62,
    "Mastercard operates a global payments network connecting consumers, financial institutions, merchants, and governments across 210+ countries.",
    { sector: "Financials", industry: "Payments", analystRating: { buy: 30, hold: 8, sell: 0, priceTarget: 510, consensus: "Strong Buy" }, relatedTickers: ["V", "PYPL", "SQ", "GPN"] }),

  COIN: detail("COIN", "Coinbase Global, Inc.", "54.2B", 38.4, 6.86, "—", 14_600_000, 12_200_000, 278.98, 114.51,
    "Coinbase is the largest US cryptocurrency exchange, offering trading, staking, custody, and blockchain infrastructure services for institutional and retail clients.",
    { sector: "Financials", industry: "Crypto Exchange", analystRating: { buy: 14, hold: 10, sell: 6, priceTarget: 280, consensus: "Buy" }, relatedTickers: ["MSTR", "SQ", "SOFI", "HOOD"] }),

  SQ: detail("SQ", "Block, Inc.", "48.6B", 62.4, 1.32, "—", 11_500_000, 9_800_000, 98.42, 55.48,
    "Block (formerly Square) operates Square (merchant payments), Cash App (consumer fintech), TIDAL (music streaming), and TBD (Bitcoin/decentralized finance).",
    { sector: "Financials", industry: "Fintech", analystRating: { buy: 22, hold: 12, sell: 2, priceTarget: 95, consensus: "Buy" }, relatedTickers: ["COIN", "SOFI", "V", "MA"] }),

  SOFI: detail("SOFI", "SoFi Technologies, Inc.", "16.8B", 148.5, 0.10, "—", 42_700_000, 38_200_000, 17.48, 6.28,
    "SoFi is a digital financial services company offering student loan refinancing, personal loans, mortgages, investing, banking, and credit cards through its app.",
    { sector: "Financials", industry: "Fintech", analystRating: { buy: 12, hold: 8, sell: 4, priceTarget: 16, consensus: "Buy" }, relatedTickers: ["SQ", "COIN", "HOOD", "V"] }),

  MSTR: detail("MSTR", "MicroStrategy Incorporated", "42.8B", 0, -1.82, "—", 31_200_000, 26_400_000, 262.48, 88.42,
    "MicroStrategy provides enterprise analytics software but is primarily known as the largest corporate holder of Bitcoin, with 200,000+ BTC on its balance sheet.",
    { sector: "Financials", industry: "Software/BTC", analystRating: { buy: 6, hold: 4, sell: 4, priceTarget: 240, consensus: "Buy" }, relatedTickers: ["COIN", "BTC", "SQ", "SOFI"] }),

  // ── Industrials ────────────────────────────────────────────
  BA: detail("BA", "The Boeing Company", "126.4B", 0, -8.24, "—", 12_400_000, 10_800_000, 268.42, 138.62,
    "Boeing designs, manufactures, and services commercial aircraft, defense systems, and space vehicles. The 737 MAX and 787 Dreamliner are its flagship commercial jets.",
    { sector: "Industrials", industry: "Aerospace", analystRating: { buy: 14, hold: 14, sell: 6, priceTarget: 195, consensus: "Hold" }, relatedTickers: ["LMT", "GE", "RTX", "NOC"] }),

  CAT: detail("CAT", "Caterpillar Inc.", "178.6B", 18.4, 20.02, "1.52%", 4_600_000, 4_000_000, 398.42, 298.48,
    "Caterpillar manufactures construction and mining equipment, diesel and natural gas engines, industrial gas turbines, and diesel-electric locomotives.",
    { sector: "Industrials", industry: "Machinery", analystRating: { buy: 14, hold: 12, sell: 4, priceTarget: 380, consensus: "Buy" }, relatedTickers: ["DE", "HON", "GE", "BA"] }),

  HON: detail("HON", "Honeywell International Inc.", "142.6B", 22.8, 9.31, "1.98%", 4_200_000, 3_600_000, 228.42, 182.38,
    "Honeywell operates in aerospace, building technologies, performance materials, and safety/productivity solutions. The company serves industrial and consumer markets.",
    { sector: "Industrials", industry: "Conglomerate", analystRating: { buy: 16, hold: 12, sell: 2, priceTarget: 225, consensus: "Buy" }, relatedTickers: ["GE", "BA", "CAT", "MMM"] }),

  GE: detail("GE", "GE Aerospace", "198.4B", 38.2, 4.78, "0.62%", 7_800_000, 6_600_000, 198.42, 112.48,
    "GE Aerospace (formerly General Electric) designs, manufactures, and services jet engines, turbines, and avionics for commercial and military aviation.",
    { sector: "Industrials", industry: "Aerospace", analystRating: { buy: 22, hold: 8, sell: 1, priceTarget: 195, consensus: "Buy" }, relatedTickers: ["BA", "RTX", "HON", "LMT"] }),

  LMT: detail("LMT", "Lockheed Martin Corporation", "138.6B", 18.6, 29.47, "2.48%", 2_400_000, 2_000_000, 612.48, 428.62,
    "Lockheed Martin is the world's largest defense contractor, producing F-35 fighter jets, missile defense systems, space systems, and military helicopters.",
    { sector: "Industrials", industry: "Defense", analystRating: { buy: 14, hold: 10, sell: 4, priceTarget: 570, consensus: "Buy" }, relatedTickers: ["RTX", "NOC", "BA", "GD"] }),

  RKLB: detail("RKLB", "Rocket Lab USA, Inc.", "11.8B", 0, -0.22, "—", 35_200_000, 28_400_000, 27.42, 4.48,
    "Rocket Lab provides launch services and spacecraft components. Its Electron rocket serves the small satellite market, and the larger Neutron rocket is in development.",
    { sector: "Industrials", industry: "Aerospace", analystRating: { buy: 10, hold: 4, sell: 2, priceTarget: 28, consensus: "Buy" }, relatedTickers: ["BA", "LMT", "LUNR", "SPCE"] }),

  // ── Consumer Staples ───────────────────────────────────────
  PG: detail("PG", "Procter & Gamble Company", "408.6B", 28.2, 6.11, "2.32%", 6_200_000, 5_400_000, 182.48, 148.62,
    "P&G manufactures consumer goods across beauty, grooming, health care, fabric care, and home care. Brands include Tide, Pampers, Gillette, and Olay.",
    { sector: "Consumer Staples", industry: "Household Products", analystRating: { buy: 14, hold: 14, sell: 2, priceTarget: 178, consensus: "Buy" }, relatedTickers: ["KO", "PEP", "JNJ", "CL"] }),

  KO: detail("KO", "The Coca-Cola Company", "272.4B", 26.8, 2.34, "2.82%", 12_400_000, 10_800_000, 68.42, 54.28,
    "Coca-Cola manufactures and distributes beverages worldwide. Its portfolio includes Coca-Cola, Sprite, Fanta, Dasani, Minute Maid, and Costa Coffee.",
    { sector: "Consumer Staples", industry: "Beverages", analystRating: { buy: 18, hold: 10, sell: 2, priceTarget: 68, consensus: "Buy" }, relatedTickers: ["PEP", "PG", "MCD", "WMT"] }),

  PEP: detail("PEP", "PepsiCo, Inc.", "228.6B", 22.4, 7.51, "3.12%", 5_800_000, 5_000_000, 188.42, 148.62,
    "PepsiCo manufactures beverages and snack foods. Brands include Pepsi, Mountain Dew, Lay's, Doritos, Gatorade, Quaker, and Tropicana.",
    { sector: "Consumer Staples", industry: "Beverages", analystRating: { buy: 14, hold: 12, sell: 4, priceTarget: 180, consensus: "Buy" }, relatedTickers: ["KO", "PG", "MCD", "WMT"] }),

  WMT: detail("WMT", "Walmart Inc.", "662.4B", 38.6, 2.13, "0.92%", 9_400_000, 8_200_000, 88.42, 58.68,
    "Walmart is the world's largest retailer by revenue, operating ~10,500 stores and clubs across 19 countries. Walmart+ and e-commerce are key growth drivers.",
    { sector: "Consumer Staples", industry: "Retail", analystRating: { buy: 28, hold: 8, sell: 1, priceTarget: 90, consensus: "Strong Buy" }, relatedTickers: ["COST", "TGT", "AMZN", "HD"] }),

  COST: detail("COST", "Costco Wholesale Corporation", "398.6B", 52.4, 17.03, "0.48%", 2_800_000, 2_400_000, 938.42, 642.48,
    "Costco operates membership-only warehouse clubs offering bulk groceries, electronics, and services. It has 870+ locations and 130M+ cardholders worldwide.",
    { sector: "Consumer Staples", industry: "Retail", analystRating: { buy: 22, hold: 10, sell: 2, priceTarget: 920, consensus: "Buy" }, relatedTickers: ["WMT", "TGT", "HD", "AMZN"] }),

  // ── Energy ─────────────────────────────────────────────────
  XOM: detail("XOM", "Exxon Mobil Corporation", "482.4B", 14.2, 8.34, "3.28%", 14_200_000, 12_400_000, 128.42, 98.62,
    "ExxonMobil is the largest US oil and gas company, operating in upstream (exploration/production), downstream (refining), and chemical manufacturing.",
    { sector: "Energy", industry: "Oil & Gas", analystRating: { buy: 14, hold: 14, sell: 4, priceTarget: 125, consensus: "Hold" }, relatedTickers: ["CVX", "COP", "SLB", "OXY"] }),

  CVX: detail("CVX", "Chevron Corporation", "298.4B", 14.8, 10.97, "4.12%", 8_600_000, 7_400_000, 178.42, 138.62,
    "Chevron is an integrated energy company with upstream, downstream, and chemicals segments. The company also invests in hydrogen, CCS, and renewable fuels.",
    { sector: "Energy", industry: "Oil & Gas", analystRating: { buy: 14, hold: 12, sell: 4, priceTarget: 172, consensus: "Buy" }, relatedTickers: ["XOM", "COP", "SLB", "OXY"] }),

  COP: detail("COP", "ConocoPhillips", "128.6B", 12.4, 9.06, "1.82%", 6_400_000, 5_600_000, 132.48, 96.42,
    "ConocoPhillips is one of the world's largest independent E&P companies, producing oil and natural gas from operations in the US, Canada, Europe, and Asia-Pacific.",
    { sector: "Energy", industry: "Oil & Gas", analystRating: { buy: 18, hold: 8, sell: 2, priceTarget: 125, consensus: "Buy" }, relatedTickers: ["XOM", "CVX", "SLB", "EOG"] }),

  // ── Utilities ──────────────────────────────────────────────
  NEE: detail("NEE", "NextEra Energy, Inc.", "168.4B", 28.4, 2.91, "2.52%", 8_200_000, 7_000_000, 92.48, 58.62,
    "NextEra Energy is the world's largest generator of wind and solar energy. It operates Florida Power & Light (FPL) and NextEra Energy Resources (clean energy).",
    { sector: "Utilities", industry: "Renewable Energy", analystRating: { buy: 18, hold: 8, sell: 2, priceTarget: 88, consensus: "Buy" }, relatedTickers: ["DUK", "SO", "AEP", "D"] }),

  DUK: detail("DUK", "Duke Energy Corporation", "84.6B", 18.2, 5.96, "3.82%", 4_600_000, 3_800_000, 118.42, 88.62,
    "Duke Energy provides electric and gas utility services to ~8 million customers in the Southeast and Midwest US. The company is investing heavily in grid modernization.",
    { sector: "Utilities", industry: "Electric Utilities", analystRating: { buy: 10, hold: 14, sell: 2, priceTarget: 115, consensus: "Hold" }, relatedTickers: ["NEE", "SO", "AEP", "D"] }),

  // ── Real Estate ────────────────────────────────────────────
  AMT: detail("AMT", "American Tower Corporation", "98.6B", 42.8, 5.10, "2.98%", 3_800_000, 3_200_000, 238.48, 168.62,
    "American Tower is a REIT that owns and operates wireless and broadcast communications towers globally, with 220,000+ properties across 25 countries.",
    { sector: "Real Estate", industry: "REITs", analystRating: { buy: 14, hold: 10, sell: 2, priceTarget: 235, consensus: "Buy" }, relatedTickers: ["PLD", "CCI", "EQIX", "DLR"] }),

  PLD: detail("PLD", "Prologis, Inc.", "108.4B", 38.6, 3.22, "3.22%", 5_200_000, 4_400_000, 142.48, 98.62,
    "Prologis is the world's largest logistics REIT, owning ~1.2 billion sq ft of warehouse/distribution space across 19 countries. E-commerce growth drives demand.",
    { sector: "Real Estate", industry: "REITs", analystRating: { buy: 18, hold: 8, sell: 2, priceTarget: 135, consensus: "Buy" }, relatedTickers: ["AMT", "EQIX", "DLR", "SPG"] }),

  // ── Materials ──────────────────────────────────────────────
  LIN: detail("LIN", "Linde plc", "218.4B", 32.6, 14.36, "1.18%", 2_400_000, 2_000_000, 498.42, 382.48,
    "Linde is the world's largest industrial gas company, providing atmospheric and process gases, engineering services, and related equipment to diverse industries.",
    { sector: "Materials", industry: "Chemicals", analystRating: { buy: 18, hold: 8, sell: 1, priceTarget: 490, consensus: "Buy" }, relatedTickers: ["APD", "SHW", "ECL", "DD"] }),

  SHW: detail("SHW", "The Sherwin-Williams Company", "92.4B", 34.2, 10.77, "0.82%", 1_800_000, 1_400_000, 398.42, 278.62,
    "Sherwin-Williams manufactures and distributes paints, coatings, and related products. It operates 4,800+ company-owned stores across the Americas.",
    { sector: "Materials", industry: "Chemicals", analystRating: { buy: 18, hold: 8, sell: 2, priceTarget: 390, consensus: "Buy" }, relatedTickers: ["LIN", "PPG", "APD", "ECL"] }),

  // ── ETFs ───────────────────────────────────────────────────
  SPY: detail("SPY", "SPDR S&P 500 ETF Trust", "582.3B", 24.1, 24.16, "1.22%", 72_100_000, 68_500_000, 607.11, 494.74,
    "SPY tracks the S&P 500 index, providing diversified exposure to 500 of the largest US companies. It is the most actively traded ETF in the world.",
    { relatedTickers: ["VOO", "IVV", "QQQ", "DIA"] }),

  VOO: detail("VOO", "Vanguard S&P 500 ETF", "537.1B", 24.1, 22.31, "1.25%", 4_200_000, 3_800_000, 558.47, 455.22,
    "VOO tracks the S&P 500 index with one of the lowest expense ratios among S&P 500 ETFs at 0.03%. Popular choice for long-term passive investing.",
    { relatedTickers: ["SPY", "IVV", "VTI", "QQQ"] }),

  QQQ: detail("QQQ", "Invesco QQQ Trust", "262.4B", 34.6, 14.58, "0.52%", 45_600_000, 42_200_000, 528.42, 402.38,
    "QQQ tracks the Nasdaq-100 index, providing exposure to 100 of the largest non-financial companies listed on the Nasdaq, heavily weighted toward tech.",
    { relatedTickers: ["SPY", "XLK", "VOO", "ARKK"] }),

  IWM: detail("IWM", "iShares Russell 2000 ETF", "68.4B", 22.8, 9.75, "1.18%", 28_400_000, 24_800_000, 238.42, 188.62,
    "IWM tracks the Russell 2000 index of US small-cap stocks, offering broad exposure to 2,000 smaller companies as a barometer of the domestic economy.",
    { relatedTickers: ["SPY", "VTI", "DIA", "QQQ"] }),

  DIA: detail("DIA", "SPDR Dow Jones Industrial Average ETF", "34.8B", 22.4, 19.13, "1.62%", 5_200_000, 4_400_000, 448.42, 368.62,
    "DIA tracks the Dow Jones Industrial Average, providing exposure to 30 large-cap blue-chip US companies across various industries.",
    { relatedTickers: ["SPY", "QQQ", "VOO", "IWM"] }),

  VTI: detail("VTI", "Vanguard Total Stock Market ETF", "418.6B", 24.6, 11.32, "1.28%", 6_800_000, 5_800_000, 288.42, 228.62,
    "VTI tracks the CRSP US Total Market Index, providing exposure to the entire US stock market including large, mid, small, and micro caps (~4,000 stocks).",
    { relatedTickers: ["VOO", "SPY", "IWM", "SCHB"] }),

  ARKK: detail("ARKK", "ARK Innovation ETF", "6.8B", 0, -2.48, "—", 18_600_000, 16_200_000, 62.48, 38.42,
    "ARKK is an actively managed ETF by ARK Invest focused on disruptive innovation: genomics, robotics, AI, energy storage, blockchain, and next-gen internet.",
    { relatedTickers: ["QQQ", "TSLA", "COIN", "PLTR"] }),

  XLK: detail("XLK", "Technology Select Sector SPDR Fund", "68.4B", 34.2, 6.38, "0.62%", 8_400_000, 7_200_000, 228.42, 178.62,
    "XLK tracks the Technology Select Sector Index of the S&P 500, providing concentrated exposure to large-cap US technology companies.",
    { relatedTickers: ["QQQ", "VGT", "SPY", "VOO"] }),

  // ── Crypto ─────────────────────────────────────────────────
  BTC: detail("BTC", "Bitcoin", "1.34T", 0, 0, "—", 42_800_000, 38_400_000, 73_750, 38_500,
    "Bitcoin is the first and largest decentralized cryptocurrency, operating on a proof-of-work blockchain. It is increasingly viewed as digital gold and an inflation hedge.",
    { relatedTickers: ["ETH", "COIN", "MSTR", "SOL"] }),

  ETH: detail("ETH", "Ethereum", "462.4B", 0, 0, "—", 18_400_000, 16_200_000, 4_092, 1_520,
    "Ethereum is a programmable blockchain platform for decentralized applications, DeFi, NFTs, and smart contracts. The network transitioned to proof-of-stake in 2022.",
    { relatedTickers: ["BTC", "SOL", "COIN", "MATIC"] }),

  SOL: detail("SOL", "Solana", "82.4B", 0, 0, "—", 8_600_000, 7_200_000, 210.18, 18.28,
    "Solana is a high-performance blockchain known for fast transaction speeds (~400ms) and low fees. It hosts a growing DeFi, NFT, and meme coin ecosystem.",
    { relatedTickers: ["ETH", "BTC", "AVAX", "COIN"] }),

  DOGE: detail("DOGE", "Dogecoin", "20.2B", 0, 0, "—", 3_200_000_000, 2_800_000_000, 0.228, 0.058,
    "Dogecoin is a meme-inspired cryptocurrency originally created as a joke. It has a large, active community and has gained mainstream attention through social media.",
    { relatedTickers: ["SHIB", "BTC", "ETH", "SOL"] }),

  XRP: detail("XRP", "XRP", "34.2B", 0, 0, "—", 1_800_000_000, 1_400_000_000, 0.938, 0.428,
    "XRP is a digital payment protocol designed for fast, low-cost international money transfers. Ripple Labs develops the technology and partners with financial institutions.",
    { relatedTickers: ["BTC", "ETH", "SOL", "XLM"] }),
};

function generateCandles(quote: StockQuote, days: number): CandleData[] {
  const candles: CandleData[] = [];
  const basePrice = quote.previousClose * 0.85;
  const priceRange = quote.price - basePrice;

  for (let i = days; i >= 0; i--) {
    const d = new Date(2026, 9, 14);
    d.setDate(d.getDate() - i);
    if (d.getDay() === 0 || d.getDay() === 6) continue;

    const progress = 1 - i / days;
    const trend = basePrice + priceRange * progress;
    const noise = trend * 0.02 * (Math.sin(i * 1.7) + Math.cos(i * 0.3));

    const open = trend + noise;
    const close = i === 0 ? quote.price : trend + noise * 0.5;
    const high = Math.max(open, close) * (1 + Math.random() * 0.015);
    const low = Math.min(open, close) * (1 - Math.random() * 0.015);

    candles.push({
      time: d.toISOString().split("T")[0],
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
      volume: Math.floor(quote.volume * (0.6 + Math.random() * 0.8)),
    });
  }
  return candles;
}

export function getStockDetail(ticker: string): StockDetail | null {
  const quote = mockQuotes[ticker];
  const det = stockDetails[ticker];
  if (!quote || !det) return null;

  const info = allStocks.find((s) => s.ticker === ticker);
  return {
    ...det,
    price: quote.price,
    change: quote.change,
    changePercent: quote.changePercent,
    open: quote.open,
    high: quote.high,
    low: quote.low,
    previousClose: quote.previousClose,
    sector: det.sector ?? info?.sector,
    industry: det.industry ?? info?.industry,
  };
}

export function getStockCandles(ticker: string, range: string): CandleData[] {
  const quote = mockQuotes[ticker];
  if (!quote) return [];
  const days = range === "1W" ? 7 : range === "1M" ? 30 : range === "3M" ? 90 : range === "1Y" ? 365 : range === "5Y" ? 1825 : 30;
  return generateCandles(quote, days);
}

export function getAllTickers(): { ticker: string; name: string }[] {
  return Object.keys(stockDetails).map((t) => ({ ticker: t, name: stockDetails[t].name }));
}

export function getRelatedStocks(ticker: string): string[] {
  return stockDetails[ticker]?.relatedTickers ?? [];
}
