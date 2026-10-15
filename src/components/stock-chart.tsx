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
          textColor: "#9CA3AF",
          fontSize: 11,
        },
        grid: {
          vertLines: { color: "rgba(229, 231, 235, 0.6)", style: LineStyle.Dotted },
          horzLines: { color: "rgba(229, 231, 235, 0.6)", style: LineStyle.Dotted },
        },
        crosshair: {
          vertLine: { color: "rgba(156, 163, 175, 0.3)", labelBackgroundColor: "#F3F4F6" },
          horzLine: { color: "rgba(156, 163, 175, 0.3)", labelBackgroundColor: "#F3F4F6" },
        },
        rightPriceScale: { borderColor: "#E5E7EB" },
        timeScale: { borderColor: "#E5E7EB", timeVisible: false },
        handleScroll: { mouseWheel: false, pressedMouseMove: true },
        handleScale: { mouseWheel: false, pinch: false },
      });

      const color = isPositive ? "#16A34A" : "#DC2626";

      if (chartType === "candle") {
        chart.addCandlestickSeries({
          upColor: "#16A34A",
          downColor: "#DC2626",
          borderUpColor: "#16A34A",
          borderDownColor: "#DC2626",
          wickUpColor: "#16A34A",
          wickDownColor: "#DC2626",
        }).setData(data as any);
      } else {
        chart.addAreaSeries({
          lineColor: color,
          topColor: isPositive ? "rgba(22, 163, 74, 0.15)" : "rgba(220, 38, 38, 0.15)",
          bottomColor: isPositive ? "rgba(22, 163, 74, 0.01)" : "rgba(220, 38, 38, 0.01)",
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
              background: chartType === t ? "var(--bg-elevated)" : "transparent",
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
