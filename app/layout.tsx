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
import { ilmaLinkEntityData } from "./data/geo";
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
  title: "ILMALINK MEDIGO | Student-First MBBS Admission Consultancy",
  description:
    "Student-first MBBS admission consultancy in India for MBBS Abroad, MBBS India, NEET counselling, eligibility, documents, scholarships and loans.",
  keywords: [
    "ILMALINK MEDIGO",
    "MBBS Abroad",
    "MBBS India",
    "MBBS admission consultancy in India",
    "MBBS abroad consultant for Indian students",
    "student-first medical admission consultancy",
    "transparent MBBS counselling platform",
    "MBBS admission guidance",
    "FMGE data",
    "NMC guidelines",
    "FMGL compliance",
    "NEET UG counselling",
    "medical colleges in India",
    "MBBS in Kyrgyzstan",
    "MBBS in Georgia",
    "MBBS in Russia",
    "MBBS in Bangladesh",
    "MBBS education loan guidance",
    "scholarship guidance for MBBS",
  ],
  openGraph: {
    title: "ILMALINK MEDIGO | Student-First MBBS Admission Consultancy",
    description:
      "Transparent MBBS consultancy for Indian students planning MBBS India, MBBS Abroad, NEET counselling, eligibility, documents, scholarships and loans.",
    url: "https://www.ilmalink.com",
    siteName: "ILMALINK MEDIGO",
    type: "website",
    locale: "en_IN",
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "Kolkata, Bengaluru, Mumbai",
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
