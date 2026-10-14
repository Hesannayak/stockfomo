"use client";

import { useEffect, useRef, useState } from "react";
import type { CandleData } from "@/lib/stock-data";

interface StockChartProps {
  data: CandleData[];
  isPositive: boolean;
}

export function StockChart({ data, isPositive }: StockChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof import("lightweight-charts").createChart> | null>(null);
  const [chartType, setChartType] = useState<"candle" | "line">("line");

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    let mounted = true;

    import("lightweight-charts").then(({ createChart, ColorType, LineStyle }) => {
      if (!mounted || !containerRef.current) return;

      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }

      const chart = createChart(containerRef.current, {
        width: containerRef.current.clientWidth,
        height: 280,
        layout: {
          background: { type: ColorType.Solid, color: "transparent" },
          textColor: "#71717a",
          fontSize: 11,
        },
        grid: {
          vertLines: { color: "rgba(46, 46, 51, 0.5)", style: LineStyle.Dotted },
          horzLines: { color: "rgba(46, 46, 51, 0.5)", style: LineStyle.Dotted },
        },
        crosshair: {
          vertLine: { color: "rgba(250, 250, 250, 0.2)", labelBackgroundColor: "#27272a" },
          horzLine: { color: "rgba(250, 250, 250, 0.2)", labelBackgroundColor: "#27272a" },
        },
        rightPriceScale: { borderColor: "#2e2e33" },
        timeScale: { borderColor: "#2e2e33", timeVisible: false },
        handleScroll: { mouseWheel: false, pressedMouseMove: true },
        handleScale: { mouseWheel: false, pinch: false },
      });

      const color = isPositive ? "#22c55e" : "#ef4444";

      if (chartType === "candle") {
        chart.addCandlestickSeries({
          upColor: "#22c55e",
          downColor: "#ef4444",
          borderUpColor: "#22c55e",
          borderDownColor: "#ef4444",
          wickUpColor: "#22c55e",
          wickDownColor: "#ef4444",
        }).setData(data as any);
      } else {
        chart.addAreaSeries({
          lineColor: color,
          topColor: isPositive ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)",
          bottomColor: isPositive ? "rgba(34, 197, 94, 0.02)" : "rgba(239, 68, 68, 0.02)",
          lineWidth: 2,
        }).setData(data.map((d) => ({ time: d.time, value: d.close })) as any);
      }

      chart.timeScale().fitContent();
      chartRef.current = chart;

      const observer = new ResizeObserver((entries) => {
        if (entries[0] && chartRef.current) {
          chartRef.current.applyOptions({ width: entries[0].contentRect.width });
        }
      });
      observer.observe(containerRef.current);

      return () => observer.disconnect();
    });

    return () => {
      mounted = false;
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [data, isPositive, chartType]);

  return (
    <div>
      <div className="flex gap-2 px-4 mb-2">
        {(["line", "candle"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setChartType(t)}
            className="text-xs px-3 py-1 rounded-lg font-semibold cursor-pointer"
            style={{
              background: chartType === t ? "var(--bg-input)" : "transparent",
              color: chartType === t ? "var(--fg)" : "var(--fg-dim)",
            }}
          >
            {t === "line" ? "Line" : "Candles"}
          </button>
        ))}
      </div>
      <div ref={containerRef} className="w-full" />
    </div>
  );
}
