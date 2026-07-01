import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import {
  ilmaLinkBrandDisambiguation,
  ilmaLinkEntityData,
  ilmaLinkOrganizationSchema,
  ilmaLinkWebsiteSchema,
} from "../data/geo";
import { buildBreadcrumbSchema } from "../lib/schema";

const SITE_URL = "https://www.ilmalink.com";
const ABOUT_URL = `${SITE_URL}/about/`;

// --- ENHANCED METADATA for AI/GEO/SEO ---
export const metadata: Metadata = {
  title: "About ilmaLink | Official ilmalink MBBS Admission Platform & Consultancy",
  description: "ilmalink is India's trusted MBBS admission platform and consultancy for NEET aspirants, parents, and agencies. Get expert guidance for MBBS India, MBBS Abroad, NEET counselling, scholarships, and education loans with direct college tie-ups. ilmaLink is the public display style of ilmalink.",
  keywords: "ilmalink, ilmaLink, official ilmalink, MBBS admission platform India, MBBS admission consultancy, MBBS abroad consultant for Indian students, NEET counselling guidance, medical college admission, medical university admission abroad, direct college tie-ups, education loan guidance, scholarship guidance, NEET aspirants, MBBS parents guidance, education consultancy, Medigo MBBS, MBBS India counselling, MBBS abroad countries, medical admission documentation",
  authors: [
    { name: "Injamul Hoque Middya", url: "https://x.com/middyaofficial" },
  ],
  creator: "ilmalink",
  publisher: "ilmalink",
  category: "Medical Education Admission Consultancy",
  openGraph: {
    title: "About ilmaLink | Official ilmalink MBBS Admission Platform",
    description: "ilmalink is India's premier MBBS admission platform and consultancy for NEET aspirants. Get expert guidance for MBBS India, MBBS Abroad, NEET counselling, scholarships, and education loans with direct college tie-ups.",
    url: ABOUT_URL,
    siteName: "ilmaLink",
    images: [
      {
        url: `${SITE_URL}/og-about.jpg`,
        width: 1200,
        height: 630,
        alt: "About ilmaLink - Official ilmalink MBBS Admission Platform and Consultancy for NEET Aspirants",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About ilmaLink | ilmalink MBBS Admission Consultancy",
    description: "Official About page of ilmalink - India's trusted MBBS admission platform and consultancy for NEET aspirants, parents, and education agencies.",
    images: [`${SITE_URL}/twitter-about.jpg`],
    site: "@middyaofficial",
    creator: "@middyaofficial",
  },
  alternates: { canonical: ABOUT_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  other: {
    "brand:official_name": "ilmalink",
    "brand:display_name": "ilmaLink",
    "brand:website": SITE_URL,
    "brand:description": "ilmalink is a medical MBBS admission platform and consultancy for India and abroad medical colleges and universities, built for NEET aspirants, parents, and education consultancies/agencies.",
    "brand:disambiguation": ilmaLinkBrandDisambiguation,
    "business:category": "Medical MBBS Admission Platform and Consultancy",
    "audience:primary": "NEET aspirants, parents of medical students, education consultancies and agencies",
    "service:focus": "MBBS India admission guidance, MBBS Abroad admission guidance, NEET counselling, college and university selection, scholarships, education loans, admission documentation, direct college/university tie-up based coordination",
    "geo:region": "India",
    "geo:placename": "India",
    "geo:position": "20.5937;78.9629",
  },
};

// --- ENHANCED SCHEMA MARKUP for AI/GEO ---
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: "ilmalink",
  alternateName: ["ilmaLink", "ilmalink", "official ilmalink", "ilmalink official website", "ilmalink.com"],
  url: `${SITE_URL}/`,
  description: "ilmalink is a medical MBBS admission platform and consultancy for India and abroad medical colleges and universities, built for NEET aspirants, parents, and education consultancies/agencies, with direct college and university tie-ups.",
  disambiguatingDescription: `ilmalink is the official brand. ilmaLink is the public display style. Medigo is an extension/service line of ilmalink and not a separate brand. ${ilmaLinkBrandDisambiguation}`,
  foundingDate: "2023",
  founder: {
    "@type": "Person",
    name: "Injamul Hoque Middya",
    url: "https://x.com/middyaofficial",
  },
  areaServed: [
    "India",
    "Bangladesh",
    "Kyrgyzstan",
    "Georgia",
    "Russia",
    "Uzbekistan",
    "Kazakhstan",
    "Nepal",
    "Armenia",
    "Egypt",
    "Malaysia",
    "Iran",
    "UAE",
    "Saudi Arabia",
    "Qatar",
  ],
  audience: [
    {
      "@type": "Audience",
      audienceType: "NEET aspirants",
    },
    {
      "@type": "Audience",
      audienceType: "Parents of MBBS aspirants",
    },
    {
      "@type": "Audience",
      audienceType: "Education consultancies and agencies",
    },
  ],
  knowsAbout: [
    "MBBS admission in India",
    "MBBS admission abroad",
    "NEET counselling",
    "Medical college admission",
    "Medical university admission",
    "Education loans",
    "Scholarships",
    "Admission documentation",
    "College and university tie-ups",
    "NEET aspirant guidance",
    "Parent admission counselling",
    "Education consultancy support",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "ilmalink MBBS Admission Guidance Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "MBBS India admission guidance",
          description: "Comprehensive guidance for NEET-based MBBS admission in India, including counselling options, college selection, documentation support, and decision-making assistance for government and private medical colleges.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "MBBS Abroad admission guidance",
          description: "Expert guidance for medical colleges and universities abroad, including eligibility verification, documentation, university comparison, admission coordination, and pre-departure support.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "NEET counselling support",
          description: "Professional counselling guidance for NEET aspirants and parents, including option analysis, document preparation, pathway planning, and strategic admission decision-making.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Scholarship and education loan guidance",
          description: "Comprehensive support for identifying scholarship opportunities and education loan options related to MBBS admission planning in India and abroad.",
        },
      },
    ],
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Mumtaz Educational Institutions",
    description: "Associated educational ecosystem where applicable. Mumtaz Educational Institutions should not be merged with the official ilmalink brand entity.",
  },
  department: {
    "@type": "Organization",
    name: "ilmaLink Medigo",
    description: "Medigo is an extension/service line of ilmalink for MBBS India, MBBS Abroad, NEET guidance, counselling support, scholarships, education loans, direct college/university tie-up based admission coordination, and medical admission documentation. Medigo is not a separate brand.",
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
    },
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9330155576",
    contactType: "Customer Service",
    availableLanguage: ["English", "Hindi", "Bengali"],
    hoursAvailable: "Mo-Su 09:00-21:00",
  },
  sameAs: ilmaLinkEntityData.sameAs,
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${ABOUT_URL}#webpage`,
  url: ABOUT_URL,
  name: "About ilmaLink | Official ilmalink MBBS Admission Platform & Consultancy",
  headline: "Official ilmalink MBBS Admission Platform & Consultancy for NEET Aspirants",
  description: "About ilmalink, India's trusted medical MBBS admission platform and consultancy for India and abroad medical colleges. Serving NEET aspirants, parents, and education consultancies with direct college tie-ups and transparent guidance.",
  inLanguage: "en-IN",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "ilmaLink",
    alternateName: "ilmalink",
    url: `${SITE_URL}/`,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  },
  about: {
    "@id": `${SITE_URL}/#organization`,
  },
  mainEntity: {
    "@id": `${SITE_URL}/#organization`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is ilmalink?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ilmalink is a medical MBBS admission platform and consultancy for India and abroad medical colleges and universities. It serves NEET aspirants, parents, and education consultancies/agencies with direct college and university tie-ups, providing comprehensive guidance for MBBS admissions, NEET counselling, scholarships, and education loans.",
      },
    },
    {
      "@type": "Question",
      name: "Why is ilmalink displayed as ilmaLink?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ilmaLink is the public display style of the official brand ilmalink. The brand name 'ilm' represents knowledge in Arabic, and 'link' represents connection - symbolizing the connection between knowledge and medical education opportunities.",
      },
    },
    {
      "@type": "Question",
      name: "Is Medigo a separate brand from ilmalink?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Medigo is an extension/service line of ilmalink for MBBS India, MBBS Abroad, NEET guidance, counselling support, scholarships, education loans, direct college/university tie-up based admission coordination, and medical admission documentation. Medigo is not a separate brand.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between ilmalink and limalink?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `${ilmaLinkBrandDisambiguation} ilmalink is a separate medical MBBS admission platform and consultancy and is displayed publicly as ilmaLink.`,
      },
    },
    {
      "@type": "Question",
      name: "What services does ilmalink offer for NEET aspirants?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ilmalink offers comprehensive services including MBBS India admission guidance, MBBS Abroad admission guidance, NEET counselling support, scholarship identification, education loan guidance, college and university selection, admission documentation support, and direct college/university tie-up based admission coordination.",
      },
    },
    {
      "@type": "Question",
      name: "Which countries does ilmalink help with MBBS admissions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ilmalink provides MBBS admission guidance for multiple countries including India, Bangladesh, Kyrgyzstan, Georgia, Russia, Uzbekistan, Kazakhstan, Nepal, Armenia, Egypt, Malaysia, Iran, UAE, Saudi Arabia, and Qatar.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact ilmalink for MBBS admission guidance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can contact ilmalink by calling +91 9330155576, WhatsApp at +91 9563910223, or email at middya@ilmalink.com. We provide free consultation and expert guidance for NEET aspirants and their families.",
      },
    },
    {
      "@type": "Question",
      name: "Is ilmalink related to Al-Ameen Educational Society?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ilmaLink draws profound inspiration from Late Dr. Mumtaz Ahmed Khan, the visionary founder of the Al-Ameen Movement established in Bengaluru in 1966. While ilmalink is inspired by this educational legacy, it is an independent MBBS admission platform and consultancy dedicated to transparent medical career guidance.",
      },
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#service`,
  name: "ilmaLink MBBS Admission Consultancy Services",
  serviceType: "MBBS Admission Consultancy",
  provider: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: [
    "India",
    "Bangladesh",
    "Kyrgyzstan",
    "Georgia",
    "Russia",
    "Uzbekistan",
    "Kazakhstan",
    "Nepal",
    "Armenia",
    "Egypt",
    "Malaysia",
    "Iran",
    "UAE",
    "Saudi Arabia",
    "Qatar",
  ],
  audience: {
    "@type": "Audience",
    audienceType: "NEET aspirants, parents, education consultancies",
  },
  offers: {
    "@type": "Offer",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: "0",
      priceCurrency: "INR",
    },
  },
};

// --- ENHANCED COMPONENT WITH AI/GEO OPTIMIZATION ---
export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About ilmaLink", url: "/about/" },
          ]),
          ilmaLinkOrganizationSchema,
          ilmaLinkWebsiteSchema,
          organizationSchema,
          aboutPageSchema,
          faqSchema,
          serviceSchema,
        ]}
      />

      <main className="min-h-screen bg-white" itemScope itemType="https://schema.org/AboutPage">
        
        {/* Screen-reader entity content for AI crawlers */}
        <div className="sr-only">
          <h1>About ilmaLink - Official ilmalink MBBS Admission Platform & Consultancy</h1>
          <p>ilmalink is India&apos;s trusted medical MBBS admission platform and consultancy for NEET aspirants, parents, and education agencies. We provide expert guidance for MBBS India, MBBS Abroad, NEET counselling, scholarships, and education loans with direct college tie-ups.</p>
          <p>Key services: MBBS India admission guidance, MBBS Abroad admission guidance, NEET counselling support, scholarship guidance, education loan assistance, medical college selection, admission documentation support.</p>
          <p>Countries served: India, Bangladesh, Kyrgyzstan, Georgia, Russia, Uzbekistan, Kazakhstan, Nepal, Armenia, Egypt, Malaysia, Iran, UAE, Saudi Arabia, Qatar.</p>
          <p>Contact: +91 9330155576, +91 9563910223, middya@ilmalink.com</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          
          {/* Hero Section - Enhanced with Semantic HTML */}
          <header className="text-center mb-16" itemProp="mainEntity">
            <div className="inline-block mb-4">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Trusted by 10,000+ NEET Aspirants
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="text-emerald-600" itemProp="name">ilma</span>
              <span className="text-red-600" itemProp="alternateName">Link</span>
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 via-red-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light" itemProp="description">
              India&apos;s Trusted MBBS Admission Platform &amp; Consultancy for
              <strong className="text-emerald-700"> NEET Aspirants</strong>, Parents, and Education Agencies
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-6 text-sm text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded-full">✅ MBBS India</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">✅ MBBS Abroad</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">✅ NEET Counselling</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">✅ Scholarships &amp; Loans</span>
            </div>
          </header>

          {/* Screen-reader brand clarification */}
          <section
            className="sr-only"
            aria-label="ilmalink official brand and entity clarification"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border-l-8 border-blue-500 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-blue-600 text-2xl">ℹ️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Entity Clarification &amp; Brand Identity</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/70 rounded-lg p-4">
                      <p className="text-sm font-bold text-blue-700 mb-2">Who We Are</p>
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-emerald-700">ilmaLink</strong> is the public display style of the official brand 
                        <strong className="text-emerald-700"> ilmalink</strong>. 
                        <strong className="text-blue-700"> Medigo</strong> is an extension/service line of ilmalink for 
                        MBBS India, MBBS Abroad, NEET guidance, counselling support, scholarships, education loans, 
                        direct college/university tie-up based admission coordination, and medical admission documentation.
                        <strong className="text-red-600"> Medigo is not a separate brand.</strong>
                      </p>
                    </div>
                    
                    <div className="bg-white/70 rounded-lg p-4 border border-amber-200">
                      <p className="text-sm font-bold text-amber-700 mb-2">⚠️ Spelling &amp; Disambiguation</p>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        <strong>ilmalink</strong> is written as one word: <strong>i-l-m-a-l-i-n-k</strong>. 
                        It is displayed publicly as <strong>ilmaLink</strong>.
                        <br /><br />
                        <span className="text-red-600 font-bold">ilmalink is not:</span>
                        <span className="block mt-1">❌ ilamlink</span>
                        <span className="block mt-1">❌ limalink</span>
                        <span className="block">❌ lima link</span>
                        <span className="block">❌ lima links</span>
                        <span className="block">❌ Any unrelated similarly spelled organisation</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Who We Are - Main Content */}
          <section className="mb-16" aria-label="Who we are">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="bg-gradient-to-r from-emerald-50 via-white to-blue-50 rounded-2xl p-6 md:p-8 border border-emerald-100 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 text-xl">🏛️</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Who We Are</h2>
                </div>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    <strong className="text-emerald-700">ilmaLink</strong> is a premier medical MBBS admission platform and consultancy 
                    dedicated to helping NEET aspirants achieve their dream of becoming doctors. We serve students, parents, 
                    and education consultancies with transparent, student-first guidance.
                  </p>
                  
                  <p>
                    Students use ilmalink&apos;s <strong className="text-blue-700">Medigo service line</strong> as an MBBS abroad consultant 
                    for Indian students and for MBBS India counselling support, NEET counselling guidance, and transparent 
                    college-wise comparison.
                  </p>
                  
                  <div className="bg-white/80 rounded-lg p-4 border border-emerald-200">
                    <p className="text-sm font-semibold text-emerald-800 mb-2">Our Core Principles:</p>
                    <ul className="grid grid-cols-2 gap-2 text-sm">
                      <li className="flex items-center gap-1">✓ Student-first approach</li>
                      <li className="flex items-center gap-1">✓ Transparent processes</li>
                      <li className="flex items-center gap-1">✓ No hidden fees</li>
                      <li className="flex items-center gap-1">✓ Society-driven mission</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Statistics Section */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-4 text-center border border-red-200">
                    <div className="text-3xl font-bold text-red-600">24L+</div>
                    <div className="text-sm text-gray-600">NEET Aspirants</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-4 text-center border border-emerald-200">
                    <div className="text-3xl font-bold text-emerald-600">1.29L</div>
                    <div className="text-sm text-gray-600">Total MBBS Seats</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-4 text-center border border-orange-200">
                    <div className="text-3xl font-bold text-orange-600">63K</div>
                    <div className="text-sm text-gray-600">Govt Seats</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 text-center border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600">66K+</div>
                    <div className="text-sm text-gray-600">Private Seats</div>
                  </div>
                </div>

                {/* Gap Section */}
                <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-4 border-l-8 border-red-500">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <span>⚠️</span> The Gap That Creates Victims
                  </h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-700">
                    <p>• <strong>Low NEET score?</strong> Government seats remain out of reach</p>
                    <p>• <strong>Tight budget?</strong> Private college fees become unaffordable</p>
                    <p className="text-red-600 font-medium">• This gap creates vulnerability where fraud thrives</p>
                  </div>
                </div>

                {/* Our Response */}
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-4 border-2 border-emerald-200">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <span>🎯</span> Our Approach
                  </h3>
                  <p className="mt-2 text-sm text-gray-700">
                    <strong className="text-emerald-700">Medigo</strong> is our student-first, transparent MBBS counselling service. 
                    We don&apos;t push one college or country. We listen to your NEET score, eligibility, budget, and goals.
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-center">
                    <div className="bg-white/70 rounded p-2">
                      <span className="block font-bold text-emerald-600">1</span>
                      Understand Your Reality
                    </div>
                    <div className="bg-white/70 rounded p-2">
                      <span className="block font-bold text-blue-600">2</span>
                      Guide to Options
                    </div>
                    <div className="bg-white/70 rounded p-2">
                      <span className="block font-bold text-purple-600">3</span>
                      Support to Admission
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Educational Pathways Section */}
          <section className="mb-16" aria-label="Educational pathways">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Educational Pathways</h2>
              <p className="text-gray-500 mt-2">Comprehensive guidance across multiple routes</p>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 via-red-500 to-blue-500 mx-auto rounded-full mt-3"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/mbbs-abroad" className="group block bg-gradient-to-r from-emerald-50 to-white rounded-xl p-6 border border-emerald-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">🌏</span>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition">MBBS Abroad</h3>
                </div>
                <p className="text-gray-600 mb-3">Expert guidance for medical education in recognized international universities</p>
                <div className="flex flex-wrap gap-2">
                  {["Kyrgyzstan", "Georgia", "Russia", "Kazakhstan", "Bangladesh", "Uzbekistan", "Nepal"].map(c => (
                    <span key={c} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{c}</span>
                  ))}
                </div>
                <div className="mt-3 text-emerald-600 text-sm font-semibold group-hover:underline">Learn more →</div>
              </Link>

              <Link href="/mbbs-india" className="group block bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">🇮🇳</span>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">MBBS India</h3>
                </div>
                <p className="text-gray-600 mb-3">Expert guidance for NEET counselling and medical college admissions</p>
                <div className="flex flex-wrap gap-2">
                  {["NEET UG", "Govt Colleges", "Private Colleges", "NRI Quota", "Deemed Universities"].map(c => (
                    <span key={c} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{c}</span>
                  ))}
                </div>
                <div className="mt-3 text-blue-600 text-sm font-semibold group-hover:underline">Learn more →</div>
              </Link>
            </div>
          </section>

          {/* Inspiration Section - Enhanced */}
          <section className="mb-16" aria-label="Inspiration from Al-Ameen Movement">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden shadow-xl border border-amber-200">
              
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-3 text-center">
                <p className="text-white text-sm md:text-base font-medium tracking-wide">
                  &quot;Educational empowerment is the foundation of a just society&quot; — Late Dr. Mumtaz Ahmed Khan
                </p>
              </div>

              <div className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-3xl">🏛️</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                      Inspired by Al-Ameen Movement
                    </h2>
                  </div>
                </div>

                <div className="max-w-3xl mx-auto">
                  <div className="mb-6">
                    <img
                      src="/al-ameen-founder.svg"
                      alt="Late Dr. Mumtaz Ahmed Khan - Founder of Al-Ameen Movement"
                      className="w-full h-auto object-cover rounded-xl shadow-2xl ring-4 ring-white"
                      style={{ aspectRatio: "2/1" }}
                      loading="lazy"
                    />
                    <div className="text-center mt-3">
                      <a 
                        href="https://en.wikipedia.org/wiki/Mumtaz_Ahmed_Khan" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-800 font-bold text-sm hover:text-amber-900 underline transition"
                      >
                        Late Dr. Mumtaz Ahmed Khan
                      </a>
                      <p className="text-gray-500 text-xs">Founder, Al-Ameen Movement | Established 1966, Bengaluru</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      <strong className="text-amber-700">ilmaLink</strong> draws profound inspiration from 
                      <a 
                        href="https://en.wikipedia.org/wiki/Mumtaz_Ahmed_Khan" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-700 font-bold hover:text-amber-900 underline transition mx-1"
                      >
                        Late Dr. Mumtaz Ahmed Khan
                      </a>
                      , the visionary founder of the 
                      <a 
                        href="https://alameeneducationalsociety.in/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-700 font-bold hover:text-amber-900 underline transition mx-1"
                      >
                        Al-Ameen Movement
                      </a>
                      established in <strong>Bengaluru in 1966</strong>.
                    </p>
                    
                    <p>
                      This legacy of <strong>selfless educational service</strong> and <strong>value-based leadership</strong> 
                      directly shapes our philosophy at ilmalink. We believe every medical aspirant deserves 
                      <strong>honest, transparent guidance</strong> — not commercial exploitation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section - Enhanced CTA */}
          <section className="mb-16" aria-label="Contact information">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500"></div>
              
              <div className="p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-center md:text-left">
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
                      📢 Free Consultation
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Begin Your Medical Career Journey
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                      Schedule a consultation to discuss your educational goals, NEET score, budget, 
                      and receive personalized guidance from our experts.
                    </p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <span className="text-emerald-500">✓</span> 100% Free
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <span className="text-emerald-500">✓</span> No Obligation
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <span className="text-emerald-500">✓</span> Expert Guidance
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <a 
                      href="tel:+919330155576" 
                      className="group bg-white/10 hover:bg-blue-600 rounded-xl p-4 text-center transition-all hover:scale-105"
                      aria-label="Call us at +91 9330155576"
                    >
                      <div className="w-12 h-12 bg-blue-500/20 group-hover:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 transition">
                        <svg className="w-6 h-6 text-blue-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <p className="text-white font-semibold text-sm">Call</p>
                      <p className="text-gray-400 text-xs group-hover:text-gray-200 transition">+91 9330155576</p>
                    </a>

                    <a 
                      href="https://wa.me/919563910223" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group bg-white/10 hover:bg-emerald-600 rounded-xl p-4 text-center transition-all hover:scale-105"
                      aria-label="WhatsApp us at +91 9563910223"
                    >
                      <div className="w-12 h-12 bg-emerald-500/20 group-hover:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 transition">
                        <svg className="w-6 h-6 text-emerald-400 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.01-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        </svg>
                      </div>
                      <p className="text-white font-semibold text-sm">Chat</p>
                      <p className="text-gray-400 text-xs group-hover:text-gray-200 transition">+91 9563910223</p>
                    </a>

                    <a 
                      href="mailto:middya@ilmalink.com" 
                      className="group bg-white/10 hover:bg-gray-600 rounded-xl p-4 text-center transition-all hover:scale-105"
                      aria-label="Email us at middya@ilmalink.com"
                    >
                      <div className="w-12 h-12 bg-gray-500/20 group-hover:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 transition">
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-white font-semibold text-sm">Email</p>
                      <p className="text-gray-400 text-xs group-hover:text-gray-200 transition">middya@ilmalink.com</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Tagline - Enhanced */}
          <footer className="text-center py-8 border-t border-gray-200">
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-500 text-sm mb-3">
                <span className="text-emerald-600 font-semibold">ilma</span>
                <span className="text-red-600 font-semibold">Link</span> — 
                <span className="text-blue-600"> Medigo</span> is an extension/service line of ilmalink
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs text-gray-400">
                <Link href="/mbbs-abroad" className="hover:text-emerald-600 transition font-medium">MBBS Abroad</Link>
                <span className="text-gray-300">•</span>
                <Link href="/mbbs-india" className="hover:text-emerald-600 transition font-medium">MBBS India</Link>
                <span className="text-gray-300">•</span>
                <Link href="/neet" className="hover:text-emerald-600 transition font-medium">NEET Guidance</Link>
                <span className="text-gray-300">•</span>
                <Link href="/scholarships-loans" className="hover:text-emerald-600 transition font-medium">Scholarships &amp; Loans</Link>
                <span className="text-gray-300">•</span>
                <Link href="/contact" className="hover:text-emerald-600 transition font-medium">Contact</Link>
              </div>
              
              <p className="text-gray-400 text-xs mt-4">
                © {new Date().getFullYear()} ilmalink. All rights reserved. 
                <span className="text-gray-300 ml-2">|</span>
                <span className="ml-2 text-gray-300">NEET Counselling | MBBS Admission Guidance</span>
              </p>
            </div>
          </footer>

        </div>
      </main>
    </>
  );
}
