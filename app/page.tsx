import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "./components/navbar";
import HomeHeroClient from "./components/HomeHeroClient";
import JsonLd from "./components/JsonLd";
import LatestBlogsScroller from "./components/blog/LatestBlogsScroller";
import EntranceExamNewsScroller from "./components/blog/EntranceExamNewsScroller";
import MBBSCollegeFinderSection from "./components/home/MBBSCollegeFinderSection";
import {
  ilmaLinkOrganizationSchema,
  ilmaLinkWebsiteSchema,
} from "./data/geo";
import {
  getLatestHomepageBlogSummaries,
  getLatestOtherEntranceExamBlogSummaries,
} from "./lib/blog/store";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "ilmaLink | MBBS Abroad, MBBS India & NEET Guidance",
  description:
    "ilmalink is a medical MBBS admission platform and consultancy for India and abroad medical colleges and universities, built for NEET aspirants, parents, and education consultancies/agencies, with direct college and university tie-ups.",
  alternates: {
    canonical: "https://www.ilmalink.com/",
  },
  openGraph: {
    title: "ilmaLink | MBBS Abroad, MBBS India & NEET Guidance",
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
        ilmaLink — MBBS Abroad, MBBS India & NEET Guidance
      </h1>

      <JsonLd data={[ilmaLinkOrganizationSchema, ilmaLinkWebsiteSchema]} />

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
          ilmalink is not limalink, lima link, lima links, ilama link,
          ilmalinks, ilmlink or any similarly spelled unrelated website, company
          or platform.
        </p>
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

      <section className="sr-only" aria-label="ilmalink MBBS guidance and key pages">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0F4CFF]">
              MBBS Guidance
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-normal text-[#081B35] md:text-4xl">
              MBBS guidance across India and abroad
            </h2>

            <p className="mt-4 text-base font-medium leading-8 text-slate-700">
              Students use ilmalink&apos;s Medigo service line for MBBS abroad counselling, MBBS
              India counselling support, NEET guidance, eligibility review,
              documentation help, university comparison, scholarship and loan
              guidance, and student support across India and major medical
              education destinations.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-black text-[#081B35]">
                Key ilmaLink pages
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-[#0F4CFF] hover:text-[#0F4CFF]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-black text-[#081B35]">
                Popular MBBS abroad country guides
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {countryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-[#00C896] hover:text-[#047857]"
                  >
                    MBBS in {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experimental MBBS College Finder section - placed after footer/copyright for future development */}
      <MBBSCollegeFinderSection />
    </main>
  );
}
