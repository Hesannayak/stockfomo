import { Suspense } from "react";
import { StockDetailContent } from "./stock-detail-content";

export const instant = false;

export default async function StockPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  return (
    <Suspense fallback={<div className="p-8 text-center" style={{ color: "var(--fg-dim)" }}>Loading...</div>}>
      <StockDetailContent ticker={ticker.toUpperCase()} />
    </Suspense>
  );
}
