import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "./components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rawchy-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rawchy-display",
});

export const metadata: Metadata = {
  title: "RawchySMP | The Hunter's World",
  description: SITE_CONFIG.description,
  keywords: [
    "RawchySMP",
    "Minecraft",
    "Survival",
    "Server",
    "Minecraft Server",
    "SMP"
  ],
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_CONFIG.url,
    title: "RawchySMP | The Hunter's World",
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "RawchySMP - The Hunter's World" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RawchySMP | The Hunter's World",
    description: SITE_CONFIG.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-[#05070A] text-slate-100 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
