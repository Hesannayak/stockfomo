import { NextRequest } from "next/server";
import { mockQuotes } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get("ticker");

  if (ticker) {
    const quote = mockQuotes[ticker.toUpperCase()];
    if (!quote) {
      return Response.json({ error: "Unknown ticker" }, { status: 404 });
    }
    return Response.json(quote);
  }

  return Response.json(mockQuotes);
}
