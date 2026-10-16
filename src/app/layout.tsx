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
  verification: {
    google: "U7AnFXOFuKBz18Hwa9rbgs7wQ5euKQudAqfgXstWxvY",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://wazemtech.com/#waseemakram",
      name: "Waseem Akram",
      jobTitle: "Founder & Full Stack Software Developer",
      description:
        "Full Stack Software Developer & SaaS Architect, founder of Wazemtech, specializing in modern web applications, scalable SaaS products, and digital experiences.",
      url: "https://wazemtech.com",
      image: "https://wazemtech.com/favicon.svg",
      sameAs: [
        "https://www.linkedin.com/in/waseemakramdev",
        "https://github.com/waseemakram-dev",
        "https://x.com/iamwaseemdev",
        "https://www.behance.net/iamwaseemdev",
        "https://dribbble.com/waseemakramdev",
        "https://www.tiktok.com/@iamwaseemdev",
      ],
      knowsAbout: [
        "Full Stack Software Development",
        "SaaS Application Architecture",
        "Web Development",
        "Next.js & React",
        "Cloud Software Engineering",
      ],
      worksFor: {
        "@type": "Organization",
        "@id": "https://wazemtech.com/#organization",
        name: "Wazemtech",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://wazemtech.com/#organization",
      name: "Wazemtech",
      url: "https://wazemtech.com",
      logo: "https://wazemtech.com/favicon.svg",
      description:
        "Wazemtech is a digital innovation & software studio building transformative web experiences, intelligent SaaS platforms, and modern digital solutions.",
      founder: {
        "@type": "Person",
        "@id": "https://wazemtech.com/#waseemakram",
      },
      sameAs: [
        "https://github.com/wazemtech-beep",
        "https://x.com/iamwaseemdev",
        "https://www.linkedin.com/in/waseemakramdev",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${beVietnam.variable} ${playfairDisplay.variable}`}>
      <head>
        <meta
          name="google-site-verification"
          content="U7AnFXOFuKBz18Hwa9rbgs7wQ5euKQudAqfgXstWxvY"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <SpeedInsights />
      </body>
    </html>
  );
}
