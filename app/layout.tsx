import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Footer from "./components/Footer";
import FloatingContactButton from "./components/FloatingContactButton";
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

const officialSocialProfiles = [
  "https://www.facebook.com/ilmalinkeduprise/",
  "https://www.instagram.com/ilmalinkmbbs/",
  "https://www.youtube.com/@ilmaLinkFoundation",
  "https://www.threads.com/@ilmalinkmbbs",
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@id": "https://www.ilmalink.com/#organization",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: "ILMALINK MEDIGO",
  alternateName: ["ilmaLink", "ilmalink", "ILMALINK", "ilmalink.com"],
  url: "https://www.ilmalink.com",
  email: "middya@ilmalink.com",
  telephone: "+91 9330155576",
  sameAs: officialSocialProfiles,
  address: [
    {
      "@type": "PostalAddress",
      name: "Headquarters - Bengaluru",
      streetAddress: "Near Lalbagh Main Gate, Hosur Road, Bangalore-27",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      name: "Main Office - Kolkata, West Bengal",
      streetAddress:
        "MUMTAZ Campus, Kamrbari, Basina, Rajarhat-Newtown, Kolkata-135",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      name: "R&D Branch - Mumbai",
      streetAddress: "M.A.K Azad Road, Sector 8B, Belapur",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400614",
      addressCountry: "IN",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91 9330155576",
      contactType: "student counselling",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Bengali"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+91 9563910223",
      contactType: "WhatsApp counselling",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Bengali"],
    },
  ],
  areaServed: [
    "India",
    "Bangladesh",
    "Kyrgyzstan",
    "Georgia",
    "Russia",
    "Kazakhstan",
    "Uzbekistan",
    "Tajikistan",
    "Malaysia",
    "Egypt",
    "UAE",
    "USA",
    "Canada",
    "Australia",
  ],
  knowsAbout: [
    "MBBS Abroad",
    "MBBS India",
    "NEET UG counselling",
    "FMGE data",
    "NMC FMGL compliance",
    "Medical university selection",
    "Scholarships for medical students",
    "Education loans for MBBS",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.ilmalink.com/#website",
  name: "ILMALINK MEDIGO",
  url: "https://www.ilmalink.com",
  publisher: {
    "@id": "https://www.ilmalink.com/#organization",
  },
  inLanguage: "en-IN",
};

const organizationJsonLdString = JSON.stringify(organizationJsonLd).replace(
  /</g,
  "\\u003c"
);

const websiteJsonLdString = JSON.stringify(websiteJsonLd).replace(
  /</g,
  "\\u003c"
);

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
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLdString }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteJsonLdString }}
        />

        <FloatingContactButton />
        <div id="modal-root" />
      </body>
    </html>
  );
}
