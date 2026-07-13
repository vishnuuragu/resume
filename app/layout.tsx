import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
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
  openGraph: {
    title: "Vishnu R — AI Engineer & Full Stack Developer",
    description:
      "Building intelligent software, AI agents, scalable backend systems, and cloud infrastructure.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishnu R — AI Engineer & Full Stack Developer",
    description:
      "Building intelligent software, AI agents, scalable backend systems, and cloud infrastructure.",
  },
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
        {children}
      </body>
    </html>
  );
}
