import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { Header } from "@/components/sections/Header";
import { Attribution } from "@/components/ui/Attribution";
import { Footer } from "@/components/sections/Footer";
import { META } from "@/lib/content";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elegix.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: META.title,
  description: META.description,
  openGraph: { title: META.title, description: META.description, url: siteUrl, siteName: "Elegix", type: "website" },
  twitter: { card: "summary_large_image", title: META.title, description: META.description },
};

export const viewport: Viewport = { themeColor: "#f6f5ef", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <Attribution />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
