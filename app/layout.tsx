import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "optional",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "optional",
  weight: ["400", "500"],
  preload: false, // only styles small code labels — keep it off the critical path
});

const ogImage = `${profile.siteUrl}/og.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: "Vishnu R — AI Engineer & Full Stack Developer",
  description:
    "Portfolio of Vishnu R — Full Stack Developer and AI Engineer building intelligent software, AI agents, scalable backend systems, and self-hosted cloud infrastructure.",
  keywords: [
    "Vishnu R",
    "AI Engineer",
    "Full Stack Developer",
    "Backend Developer",
    "AI Agents",
    "LLM",
    "RAG",
    "Portfolio",
  ],
  authors: [{ name: "Vishnu R" }],
  alternates: {
    canonical: `${profile.siteUrl}/`,
  },
  openGraph: {
    title: "Vishnu R — AI Engineer & Full Stack Developer",
    description:
      "Building intelligent software, AI agents, scalable backend systems, and cloud infrastructure.",
    type: "website",
    locale: "en_US",
    url: `${profile.siteUrl}/`,
    siteName: "Vishnu R — Portfolio",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Vishnu R — AI Engineer & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishnu R — AI Engineer & Full Stack Developer",
    description:
      "Building intelligent software, AI agents, scalable backend systems, and cloud infrastructure.",
    images: [ogImage],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "AI Engineer & Full Stack Developer",
  url: `${profile.siteUrl}/`,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sameAs: [profile.github, profile.linkedin],
};

export const viewport: Viewport = {
  themeColor: "#05070f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} noise antialiased`}
      >
        {/* Pre-paint: skip the intro loader on repeat views this session */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{sessionStorage.getItem('vr-intro-seen')&&document.documentElement.classList.add('intro-seen')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        {profile.goatcounter && (
          <script
            data-goatcounter={`https://${profile.goatcounter}.goatcounter.com/count`}
            async
            src="https://gc.zgo.at/count.js"
          />
        )}
      </body>
    </html>
  );
}
