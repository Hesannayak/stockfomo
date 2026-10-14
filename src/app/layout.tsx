import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/nav";
import { TopNav } from "@/components/top-nav";
import { TickerTape } from "@/components/ticker-tape";
import { AuthProvider } from "@/lib/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StockFomo",
  description: "Social stock trading — see what the best traders are buying.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen pb-16 lg:pb-7">
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
