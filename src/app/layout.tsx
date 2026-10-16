import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./growth.css";
import "./work.css";
import "./services.css";
import "./team.css";
import "./process.css";
import "./brand.css";
import "./brand-theme.css";
import "./landing-completion.css";
import SmoothScroll from "@/components/SmoothScroll";
import { SpeedInsights } from "@vercel/speed-insights/next";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif-fallback",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#051F20",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Wazemtech | Digital Innovation & Design Studio",
  description:
    "Wazemtech blends creativity with technical expertise to craft transformative digital experiences, web design, and intelligent software solutions.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Wazemtech | Digital Innovation & Design Studio",
    description:
      "Wazemtech blends creativity with technical expertise to craft transformative digital experiences, web design, and intelligent software solutions.",
    siteName: "Wazemtech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wazemtech | Digital Innovation & Design Studio",
    description:
      "Wazemtech blends creativity with technical expertise to craft transformative digital experiences, web design, and intelligent software solutions.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${beVietnam.variable} ${playfairDisplay.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <SpeedInsights />
      </body>
    </html>
  );
}
