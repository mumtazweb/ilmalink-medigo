import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import FloatingContactButton from "./components/FloatingContactButton";
import "./globals.css";

// STYLE UPDATED: Use Inter as the production UI font while keeping the existing mono font token.
const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mbbs.ilmalink.com"),
  title: "High-Authority SEO Websites | YourBrand",
  description:
    "We build fast, SEO-optimized websites designed to earn backlinks, increase domain rating, and rank for competitive keywords.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <FloatingContactButton />
      </body>
    </html>
  );
}
