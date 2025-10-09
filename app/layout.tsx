import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SmoothScroll from "./components/layout/SmoothScroll";
import BackgroundGrid from "./components/animations/BackgroundCanvas";
import NavbarClient from "./components/layout/NavbarClient";
import FooterClient from "./components/layout/FooterClient";
import ScrollToTop from "./components/layout/ScrollToTop"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solace Studio",
  description: "Designing spaces, creating joy!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="aqua"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex flex-col min-h-screen bg-black text-gray-900 relative overflow-x-hidden">
        {/* Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <BackgroundGrid />
        </div>

        {/* Main content layer (Navbar + Page Sections) */}
        <div className="flex-1 flex flex-col relative z-20">
          <SmoothScroll>
            <NavbarClient />
            <ScrollToTop />
            {children}
          </SmoothScroll>
        </div>

        {/* Footer (below content visually) */}
        <div className="relative z-10">
          <FooterClient />
        </div>
      </body>
    </html>
  );
}
