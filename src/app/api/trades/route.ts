import { NextRequest } from "next/server";
import { mockTrades, mockQuotes } from "@/lib/mock-data";

export async function GET() {
  return Response.json(mockTrades);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { ticker, direction, quantity } = body;

  if (!ticker || !direction || !quantity) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const quote = mockQuotes[ticker as string];
  if (!quote) {
    return Response.json({ error: "Unknown ticker" }, { status: 404 });
  }

  const trade = {
    id: `t-${Date.now()}`,
    userId: "u1",
    ticker,
    direction,
    quantity,
    entryPrice: quote.price,
    exitPrice: null,
    pnlAmount: null,
    pnlPercent: null,
    status: "OPEN" as const,
    createdAt: new Date().toISOString(),
    closedAt: null,
    currentPrice: quote.price,
  };

  return Response.json(trade, { status: 201 });
}
