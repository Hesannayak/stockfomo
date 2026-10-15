import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/nav";
import { TopNav } from "@/components/top-nav";
import { TickerTape } from "@/components/ticker-tape";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StockFomo",
  description: "Social stock trading — see what the best traders are buying.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen pb-16 lg:pb-8">
        <AuthProvider>
          <Suspense>
            <TopNav />
          </Suspense>
          <div className="max-w-lg mx-auto lg:max-w-none">{children}</div>
          <Suspense>
            <BottomNav />
          </Suspense>
          <TickerTape />
        </AuthProvider>
      </body>
    </html>
  );
}
