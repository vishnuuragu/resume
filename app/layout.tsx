import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} noise antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
