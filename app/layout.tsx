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

const brandOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization"],
  "@id": "https://www.ilmalink.com/#organization",
  name: "ILMALINK",
  alternateName: [
    "ILMALINK MEDIGO",
    "ilmalink",
    "ilmaLink",
    "ilmalink.com",
    "ILMALINK Education Consultancy",
  ],
  legalName: "ILMALINK",
  url: "https://www.ilmalink.com/",
  description:
    "ILMALINK is an Indian education consultancy and MBBS admission guidance platform for MBBS abroad, MBBS India, NEET guidance, medical university verification, counselling, scholarships and education loans.",
  slogan: "Student-first MBBS admission guidance for Indian students.",
  areaServed: [
    {
      "@type": "Country",
      name: "India",
    },
    {
      "@type": "Place",
      name: "Global MBBS abroad destinations",
    },
  ],
  knowsAbout: [
    "ILMALINK",
    "ILMALINK MEDIGO",
    "MBBS Abroad",
    "MBBS in India",
    "NEET Guidance",
    "NEET UG Counselling",
    "Medical Admission Counselling",
    "Medical University Verification",
    "FMGE",
    "NMC FMGL",
    "WDOMS Verification",
    "Education Loans",
    "Scholarships",
    "MBBS in Uzbekistan",
    "MBBS in Georgia",
    "MBBS in Bangladesh",
    "MBBS in Kyrgyzstan",
  ],
  brand: {
    "@type": "Brand",
    "@id": "https://www.ilmalink.com/#brand",
    name: "ILMALINK",
    alternateName: ["ILMALINK MEDIGO", "ilmalink", "ilmaLink", "ilmalink.com"],
  },
};

const brandWebsiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.ilmalink.com/#website",
  name: "ILMALINK",
  alternateName: ["ILMALINK MEDIGO", "ilmalink", "ilmaLink", "ilmalink.com"],
  url: "https://www.ilmalink.com/",
  publisher: {
    "@id": "https://www.ilmalink.com/#organization",
  },
  inLanguage: "en-IN",
  description:
    "Official website of ILMALINK, an Indian education consultancy platform for MBBS abroad, MBBS India, NEET guidance, counselling, medical university verification, scholarships and education loans.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ilmalink.com"),
  applicationName: "ILMALINK",
  title: {
    default: "ILMALINK | MBBS Abroad, MBBS India & NEET Guidance",
    template: "%s | ILMALINK",
  },
  description:
    "ILMALINK is an Indian education consultancy platform for MBBS abroad, MBBS India, NEET guidance, medical university verification, counselling, scholarships and education loans.",
  keywords: [
    "ILMALINK",
    "ilmalink",
    "ilmaLink",
    "ilmalink.com",
    "ILMALINK MEDIGO",
    "ILMALINK education consultancy",
    "ILMALINK MBBS guidance",
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
  authors: [{ name: "ILMALINK" }],
  creator: "ILMALINK",
  publisher: "ILMALINK",
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
    title: "ILMALINK | MBBS Abroad, MBBS India & NEET Guidance",
    description:
      "ILMALINK helps Indian students with MBBS abroad, MBBS India, NEET guidance, university verification, counselling, scholarships and education loans.",
    url: "https://www.ilmalink.com/",
    siteName: "ILMALINK",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ILMALINK | MBBS Abroad, MBBS India & NEET Guidance",
    description:
      "Indian education consultancy platform for MBBS abroad, MBBS India, NEET guidance, medical university verification and admission counselling.",
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "Kolkata, Bengaluru, Mumbai",
    "application-name": "ILMALINK",
    "apple-mobile-web-app-title": "ILMALINK",
    "brand": "ILMALINK",
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
            brandOrganizationSchema,
            brandWebsiteSchema,
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