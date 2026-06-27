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
  applicationName: "ilmaLink",
  title: {
    default: "ilmaLink | MBBS Abroad, MBBS India & NEET Guidance",
    template: "%s | ilmaLink",
  },
  description:
    "ilmalink is a medical MBBS admission platform and consultancy for India and abroad medical colleges and universities, built for NEET aspirants, parents, and education consultancies/agencies, with direct college and university tie-ups.",
  keywords: [
    "ilmaLink",
    "ilmalink",
    "ilmaLink",
    "ilmalink.com",
    "Medigo service line of ilmalink",
    "ilmaLink education consultancy",
    "ilmaLink MBBS guidance",
    "MBBS Abroad",
    "MBBS India",
    "MBBS admission consultancy in India",
    "MBBS abroad consultant for Indian students",
    "student-first medical admission consultancy",
    "transparent MBBS counselling platform",
    "MBBS admission guidance",
    "medical university verification",
    "WDOMS verification",
    "FMGE data",
    "NMC guidelines",
    "FMGL compliance",
    "NEET UG counselling",
    "NEET guidance",
    "medical colleges in India",
    "MBBS in Uzbekistan",
    "MBBS in Kyrgyzstan",
    "MBBS in Georgia",
    "MBBS in Russia",
    "MBBS in Bangladesh",
    "MBBS education loan guidance",
    "scholarship guidance for MBBS",
  ],
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
    title: "ilmaLink | MBBS Abroad, MBBS India & NEET Guidance",
    description:
      "ilmaLink helps Indian students with MBBS abroad, MBBS India, NEET guidance, university verification, counselling, scholarships and education loans.",
    url: "https://www.ilmalink.com/",
    siteName: "ilmaLink",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ilmaLink | MBBS Abroad, MBBS India & NEET Guidance",
    description:
      "Indian education consultancy platform for MBBS abroad, MBBS India, NEET guidance, medical university verification and admission counselling.",
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "Kolkata, Bengaluru, Mumbai",
    "application-name": "ilmaLink",
    "apple-mobile-web-app-title": "ilmaLink",
    "brand": "ilmaLink",
    "subject":
      "MBBS abroad, MBBS India, NEET guidance, medical admission counselling and university verification",
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
