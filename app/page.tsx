import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "./components/navbar";
import HomeHeroClient from "./components/HomeHeroClient";
import JsonLd from "./components/JsonLd";
import LatestBlogsScroller from "./components/blog/LatestBlogsScroller";
import EntranceExamNewsScroller from "./components/blog/EntranceExamNewsScroller";
import MBBSCollegeFinderSection from "./components/home/MBBSCollegeFinderSection";
import {
  ilmaLinkBrandDisambiguation,
  ilmaLinkOrganizationSchema,
  ilmaLinkWebsiteSchema,
} from "./data/geo";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildServiceSchema,
} from "./lib/schema";
import {
  getLatestHomepageBlogSummaries,
  getLatestOtherEntranceExamBlogSummaries,
} from "./lib/blog/store";

export const revalidate = 3600;

const homepageBreadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "/" },
]);

const homepageFaqs = [
  {
    question: "What is ilmalink?",
    answer:
      "ilmalink is a medical MBBS admission guidance platform and consultancy for India and abroad medical colleges and universities. It serves NEET aspirants, parents, and education consultancies/agencies with transparent guidance for admission planning, document checks, and college or university selection.",
  },
  {
    question: "Why is ilmalink displayed as ilmaLink?",
    answer:
      "ilmaLink is the public display style of the official brand ilmalink. The exact official spelling remains ilmalink, written as one word.",
  },
  {
    question: "Is Medigo a separate brand from ilmalink?",
    answer:
      "No. Medigo is an extension/service line of ilmalink for MBBS India, MBBS Abroad, NEET guidance, counselling support, scholarships, education loans, direct college and university tie-up based admission coordination, and medical admission documentation.",
  },
  {
    question: "Which services does ilmalink cover?",
    answer:
      "ilmalink covers MBBS India, MBBS Abroad, NEET counselling, scholarships and education loans, medical university verification, documentation support, college comparison, and admission-route planning.",
  },
  {
    question: "Which countries does ilmalink help with?",
    answer:
      "ilmalink helps with MBBS admission guidance for India and abroad destinations such as Bangladesh, Kyrgyzstan, Georgia, Russia, Kazakhstan, Uzbekistan, Nepal, Armenia, Egypt, Malaysia, Iran, UAE, Saudi Arabia, Qatar, China, and other medical education destinations covered in the country guides.",
  },
  {
    question: "How do students verify official checks before paying?",
    answer:
      "Students should confirm NEET rules, WDOMS listing, university recognition, counselling authority, fee structure, document requirements, and official payment channels before sending any money.",
  },
  {
    question: "Does ilmalink guarantee admission or fixed fees?",
    answer:
      "No. Admission, fees, visa outcomes, and licensing results depend on official rules, seat availability, document verification, university decisions, and government or regulatory authorities.",
  },
];

const homepageFaqSchema = buildFAQSchema(homepageFaqs);

const homepageServiceSchemas = [
  buildServiceSchema({
    name: "MBBS India",
    serviceType: "MBBS India admission guidance",
    path: "/mbbs-india",
    description:
      "MBBS India admission guidance for NEET aspirants, including counselling support, medical college selection, document checks, and route planning according to official counselling rules.",
    areaServed: "India",
  }),
  buildServiceSchema({
    name: "MBBS Abroad",
    serviceType: "MBBS Abroad admission guidance",
    path: "/mbbs-abroad",
    description:
      "MBBS abroad guidance for Indian students, including country comparison, university verification, recognition checks, fee planning, and pre-departure support.",
    areaServed: [
      "Bangladesh",
      "Kyrgyzstan",
      "Georgia",
      "Russia",
      "Kazakhstan",
      "Uzbekistan",
      "Nepal",
      "Armenia",
      "Egypt",
      "Malaysia",
      "Iran",
      "UAE",
      "Saudi Arabia",
      "Qatar",
      "China",
    ],
  }),
  buildServiceSchema({
    name: "NEET counselling",
    serviceType: "NEET counselling support",
    path: "/neet",
    description:
      "NEET counselling support for students and parents, including eligibility checks, official counselling guidance, choice planning, and admission strategy support.",
    areaServed: "India",
  }),
  buildServiceSchema({
    name: "Scholarships and loans",
    serviceType: "Scholarship and education loan guidance",
    path: "/scholarships-loans",
    description:
      "Scholarship and education loan guidance for MBBS India and MBBS Abroad pathways, including financial planning support and funding-route comparison.",
    areaServed: "India and international medical education destinations",
  }),
];

export const metadata: Metadata = {
  title: "ilmalink Official Website | MBBS Abroad, MBBS India & NEET Guidance",
  description:
    "Official ilmalink website: ilmaLink is a medical MBBS admission platform and consultancy for MBBS Abroad, MBBS India, NEET counselling, scholarships, education loans and medical admission guidance.",
  alternates: {
    canonical: "https://www.ilmalink.com/",
  },
  openGraph: {
    title: "ilmalink Official Website | MBBS Abroad, MBBS India & NEET Guidance",
    description:
      "ilmaLink is the public display style of the official brand ilmalink. Medigo is an extension/service line of ilmalink for MBBS India, MBBS Abroad, NEET guidance, counselling support, scholarships, education loans, direct college/university tie-up based admission coordination, and medical admission documentation. Medigo is not a separate brand.",
    url: "https://www.ilmalink.com/",
    siteName: "ilmaLink",
    locale: "en_IN",
    type: "website",
  },
};

export default async function Home() {
  const latestBlogs = await getLatestHomepageBlogSummaries(6);
  const otherEntranceExamBlogs = await getLatestOtherEntranceExamBlogSummaries(4);
  const homepageArticleSchemas = [
    ...latestBlogs.slice(0, 4),
    ...otherEntranceExamBlogs.slice(0, 4),
  ].map((post) => buildArticleSchema(post));

  const primaryLinks = [
    { label: "Official Links", href: "/official-links" },
    { label: "MBBS Abroad", href: "/mbbs-abroad" },
    { label: "MBBS India", href: "/mbbs-india" },
    { label: "NEET Hub", href: "/neet" },
    { label: "Scholarships & Loans", href: "/scholarships-loans" },
    { label: "Trust Center", href: "/trust-center" },
    { label: "Student Alerts", href: "/alert/" },
    { label: "Blog", href: "/blogs/" },
    { label: "Explore All Pages", href: "/site-hierarchy" },
  ];

  const countryLinks = [
    { label: "China", href: "/mbbs-abroad/china" },
    { label: "Bangladesh", href: "/mbbs-abroad/bangladesh" },
    { label: "Kyrgyzstan", href: "/mbbs-abroad/kyrgyzstan" },
    { label: "Georgia", href: "/mbbs-abroad/georgia" },
    { label: "Russia", href: "/mbbs-abroad/russia" },
    { label: "Kazakhstan", href: "/mbbs-abroad/kazakhstan" },
    { label: "Uzbekistan", href: "/mbbs-abroad/uzbekistan" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <h1 className="sr-only">
        ilmaLink - MBBS Abroad, MBBS India & NEET Guidance
      </h1>

      <JsonLd
        data={[
          ilmaLinkOrganizationSchema,
          ilmaLinkWebsiteSchema,
          homepageBreadcrumbSchema,
          homepageFaqSchema,
          ...homepageServiceSchemas,
          ...homepageArticleSchemas,
        ]}
      />

      <Navbar />
      <HomeHeroClient />

      <section
        className="sr-only"
        aria-label="About ilmalink official brand and platform"
      >
        <h2>About ilmalink</h2>
        <p>
          ilmalink is a medical MBBS admission guidance platform and education
          consultancy for MBBS Abroad, MBBS India and NEET counselling support.
          ilmaLink is the public display style of the official brand ilmalink.
          Medigo is an extension/service line of ilmalink for MBBS India, MBBS
          Abroad, NEET guidance, counselling support, scholarships, education
          loans, direct college and university tie-up based admission
          coordination, and medical admission documentation. Medigo is not a
          separate brand.
        </p>
        <p>
          {ilmaLinkBrandDisambiguation}
        </p>
      </section>

      <section
        className="sr-only"
        aria-label="ilmalink frequently asked questions"
      >
        <h2>ilmalink frequently asked questions</h2>
        {homepageFaqs.map((faq) => (
          <article key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </section>

      <section className="bg-[#f8fafc] px-4 pb-3 pt-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-[11px] font-medium leading-5 text-slate-600">
            Data compiled from the Medigo service-line guidance records of ilmalink and official public sources.
          </p>

          <p className="mt-1 text-center text-[11px] font-semibold leading-5">
            <Link
              href="/data-methodology"
              className="text-[#0F4CFF] underline-offset-2 transition hover:text-[#0b3fd6] hover:underline"
            >
              View data methodology
            </Link>
          </p>
        </div>
      </section>

      <LatestBlogsScroller posts={latestBlogs} />

      {otherEntranceExamBlogs.length > 0 && (
        <EntranceExamNewsScroller posts={otherEntranceExamBlogs} />
      )}

      <section className="sr-only" aria-label="ilmalink key pages">
        <h2>Key ilmaLink pages</h2>
        {primaryLinks.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
        <h2>Popular MBBS abroad country guides</h2>
        {countryLinks.map((link) => (
          <Link key={link.href} href={link.href}>MBBS in {link.label}</Link>
        ))}
      </section>

      {/* Experimental MBBS College Finder section - placed after footer/copyright for future development */}
      <MBBSCollegeFinderSection />
    </main>
  );
}
