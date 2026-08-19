import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import EmotionRegistry from "./EmotionRegistry";
import ScrollProvider from "@/components/ScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anupam Sinha | Frontend Developer Portfolio",
  description: "Portfolio of Anupam Sinha, a Frontend Developer specialized in Next.js, React, GSAP, and optimization of Core Web Vitals based in India.",
  keywords: ["Anupam Sinha", "Frontend Developer", "Next.js", "React Portfolio", "GSAP Animations", "India", "Web Performance"],
  authors: [{ name: "Anupam Sinha" }],
  openGraph: {
    title: "Anupam Sinha | Frontend Developer Portfolio",
    description: "High-end frontend portfolio built with Next.js, Emotion, GSAP, and Lenis.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} style={{ scrollBehavior: 'auto' }}>
      <body style={{ backgroundColor: '#050505', color: '#ffffff', margin: 0, overflowX: 'hidden' }}>
        <EmotionRegistry>
          <ScrollProvider>
            {children}
          </ScrollProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
