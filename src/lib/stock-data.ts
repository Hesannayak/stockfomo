import type { StockQuote } from "./types";
import { mockQuotes } from "./mock-data";

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
}

const stockDetails: Record<string, Omit<StockDetail, "price" | "change" | "changePercent" | "open" | "high" | "low" | "previousClose">> = {
  NVDA: { ticker: "NVDA", name: "NVIDIA Corporation", marketCap: "3.64T", peRatio: 62.4, eps: 2.38, dividend: "0.01%", volume: "312.4M", avgVolume: "283.1M", high52w: 153.13, low52w: 75.61, about: "NVIDIA designs and sells GPUs for gaming, data centers, and AI workloads. The company leads the AI chip market with its CUDA platform and H100/B200 accelerators." },
  TSLA: { ticker: "TSLA", name: "Tesla, Inc.", marketCap: "1.12T", peRatio: 178.2, eps: 1.96, dividend: "—", volume: "89.6M", avgVolume: "95.2M", high52w: 488.54, low52w: 138.80, about: "Tesla designs, manufactures, and sells electric vehicles, energy storage systems, and solar products. The company also develops autonomous driving technology." },
  AAPL: { ticker: "AAPL", name: "Apple Inc.", marketCap: "3.57T", peRatio: 38.5, eps: 6.08, dividend: "0.42%", volume: "54.2M", avgVolume: "48.7M", high52w: 260.10, low52w: 169.21, about: "Apple designs consumer electronics, software, and services. Its products include the iPhone, Mac, iPad, Apple Watch, and services like iCloud, Apple Music, and Apple TV+." },
  SPY: { ticker: "SPY", name: "SPDR S&P 500 ETF Trust", marketCap: "582.3B", peRatio: 24.1, eps: 24.16, dividend: "1.22%", volume: "72.1M", avgVolume: "68.5M", high52w: 607.11, low52w: 494.74, about: "SPY tracks the S&P 500 index, providing diversified exposure to 500 of the largest US companies. It is the most actively traded ETF in the world." },
  PLTR: { ticker: "PLTR", name: "Palantir Technologies Inc.", marketCap: "195.8B", peRatio: 412.5, eps: 0.20, dividend: "—", volume: "145.3M", avgVolume: "128.4M", high52w: 125.41, low52w: 20.33, about: "Palantir builds software platforms for data integration and analysis. Its Gotham platform serves government agencies while Foundry and AIP serve commercial customers." },
  SMCI: { ticker: "SMCI", name: "Super Micro Computer, Inc.", marketCap: "26.5B", peRatio: 14.8, eps: 3.05, dividend: "—", volume: "67.8M", avgVolume: "52.1M", high52w: 122.90, low52w: 17.25, about: "Super Micro Computer designs and manufactures high-performance server and storage solutions optimized for AI, cloud, and enterprise workloads." },
  AMD: { ticker: "AMD", name: "Advanced Micro Devices, Inc.", marketCap: "263.9B", peRatio: 109.3, eps: 1.49, dividend: "—", volume: "43.5M", avgVolume: "39.8M", high52w: 227.30, low52w: 117.01, about: "AMD designs CPUs, GPUs, and adaptive computing products. The company competes with Intel in processors and NVIDIA in data center accelerators." },
  VOO: { ticker: "VOO", name: "Vanguard S&P 500 ETF", marketCap: "537.1B", peRatio: 24.1, eps: 22.31, dividend: "1.25%", volume: "4.2M", avgVolume: "3.8M", high52w: 558.47, low52w: 455.22, about: "VOO tracks the S&P 500 index with one of the lowest expense ratios among S&P 500 ETFs at 0.03%. Popular choice for long-term passive investing." },
  MSFT: { ticker: "MSFT", name: "Microsoft Corporation", marketCap: "3.14T", peRatio: 35.2, eps: 11.99, dividend: "0.72%", volume: "21.3M", avgVolume: "19.4M", high52w: 468.35, low52w: 385.58, about: "Microsoft develops software, services, and devices. Key products include Windows, Office 365, Azure cloud computing, LinkedIn, and Xbox gaming." },
  AMZN: { ticker: "AMZN", name: "Amazon.com, Inc.", marketCap: "2.09T", peRatio: 38.7, eps: 5.13, dividend: "—", volume: "38.7M", avgVolume: "35.2M", high52w: 242.52, low52w: 161.02, about: "Amazon operates the world's largest e-commerce marketplace, Amazon Web Services (AWS) cloud computing, advertising, and entertainment streaming." },
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
  const detail = stockDetails[ticker];
  if (!quote || !detail) return null;
  return {
    ...detail,
    price: quote.price,
    change: quote.change,
    changePercent: quote.changePercent,
    open: quote.open,
    high: quote.high,
    low: quote.low,
    previousClose: quote.previousClose,
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
