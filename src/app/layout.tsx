import type { Metadata } from "next";
import { Suspense } from "react";
import { DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/nav";
import { TopNav } from "@/components/top-nav";
import { TickerTape } from "@/components/ticker-tape";
import { AuthProvider } from "@/lib/auth-context";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Stockhome",
  description: "Social stock trading — see what the best traders are buying.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${ibmPlexMono.variable}`}>
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
