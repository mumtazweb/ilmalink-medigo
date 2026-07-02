import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Footer from "./components/Footer";
import FloatingContactButton from "./components/FloatingContactButton";
import JsonLd from "./components/JsonLd";
import NeetFloatingPopup from "./components/NeetFloatingPopup";
import UniversalTranslator from "./components/UniversalTranslator";
import {
  ilmaLinkEntityData,
  ilmaLinkOrganizationSchema,
  ilmaLinkWebsiteSchema,
} from "./data/geo";
import {
  buildEducationalOrganizationSchema,
  buildGuidanceDisclaimerSchema,
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildSiteNavigationSchema,
  buildWebsiteSchema,
} from "./lib/schema";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ilmalink.com"),
  applicationName: "ilmalink",
  title: "ilmaLink",
  description:
    "ilmaLink is the public display style of ilmalink, an MBBS admission guidance platform for India and abroad. It helps NEET aspirants, parents and education partners with MBBS India counselling support, MBBS Abroad guidance, eligibility review, documentation, scholarships, education loans and transparent college or university comparison.",
  authors: [{ name: "ilmalink" }],
  creator: "ilmalink",
  publisher: "ilmalink",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "ilmaLink",
    description:
      "ilmaLink is the public display style of ilmalink, an MBBS admission guidance platform for India and abroad. It helps NEET aspirants, parents and education partners with MBBS India counselling support, MBBS Abroad guidance, eligibility review, documentation, scholarships, education loans and transparent college or university comparison.",
    url: "https://www.ilmalink.com/",
    siteName: "ilmaLink",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ilmaLink",
    description:
      "ilmaLink is the public display style of ilmalink, an MBBS admission guidance platform for India and abroad.",
  },
  other: {
    "application-name": "ilmaLink",
    "apple-mobile-web-app-title": "ilmaLink",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <UniversalTranslator />
        <Footer />

        <JsonLd
          data={[
            ilmaLinkOrganizationSchema,
            ilmaLinkWebsiteSchema,
            buildOrganizationSchema(),
            buildEducationalOrganizationSchema(),
            buildWebsiteSchema(),
            buildSiteNavigationSchema(),
            buildGuidanceDisclaimerSchema(),
            ...ilmaLinkEntityData.offices.map((office) =>
              buildLocalBusinessSchema(office)
            ),
          ]}
        />

        <FloatingContactButton />
        <NeetFloatingPopup />
        <div id="modal-root" />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
