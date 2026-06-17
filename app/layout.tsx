import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Footer from "./components/Footer";
import FloatingContactButton from "./components/FloatingContactButton";
import JsonLd from "./components/JsonLd";
import UniversalTranslator from "./components/UniversalTranslator";
import { ilmaLinkEntityData } from "./data/geo";
import {
  buildEducationalOrganizationSchema,
  buildLocalBusinessSchema,
  buildOrganizationSchema,
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
  title: "ILMALINK MEDIGO | Global Medical Education Platform",
  description:
    "ILMALINK MEDIGO is a premium medical education platform for MBBS admissions, university discovery, NEET intelligence, and global student support.",
  keywords: [
    "ILMALINK MEDIGO",
    "MBBS Abroad",
    "MBBS India",
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
    title: "ILMALINK MEDIGO | Global Medical Education Platform",
    description:
      "Premium MBBS admission guidance, NEET intelligence, university discovery, FMGE data, scholarships and student support.",
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
            ...ilmaLinkEntityData.offices.map((office) =>
              buildLocalBusinessSchema(office)
            ),
          ]}
        />

        <FloatingContactButton />
        <div id="modal-root" />
      </body>
    </html>
  );
}
