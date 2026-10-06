import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  title: "The Vape Hub — Find Your Cloud | Pueblo, Colorado",
  description:
    "Premium devices, distinct flavors and local expertise in Pueblo, Colorado. Adults 21+ only.",
  robots: { index: false, follow: false }, // concept demo
};

export const viewport: Viewport = {
  themeColor: "#f6f1e9",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${geist.variable} ${geistMono.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');history.scrollRestoration='manual';" }} />
      </head>
      <body className="grain">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-10 focus:z-[200] focus:bg-bone focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
