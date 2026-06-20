import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/navbar";
import HomeHeroClient from "./components/HomeHeroClient";
import BlogCard from "./components/blog/BlogCard";
import LatestBlogsScroller from "./components/blog/LatestBlogsScroller";
import {
  getLatestHomepageBlogSummaries,
  getLatestOtherEntranceExamBlogSummaries,
} from "./lib/blog/store";

export const metadata: Metadata = {
  title: "Student-First MBBS Admission Consultancy in India | ILMALINK MEDIGO",
  description:
    "ILMALINK MEDIGO is a student-first MBBS admission consultancy in India for MBBS Abroad, MBBS India, NEET counselling, eligibility, documents, scholarships and loans.",
  alternates: {
    canonical: "https://www.ilmalink.com/",
  },
  openGraph: {
    title: "Student-First MBBS Admission Consultancy in India | ILMALINK MEDIGO",
    description:
      "Transparent MBBS consultancy and medical education guidance for Indian students comparing MBBS India and MBBS Abroad options.",
    url: "https://www.ilmalink.com/",
    siteName: "ILMALINK MEDIGO",
    locale: "en_IN",
    type: "website",
  },
};

export default async function Home() {
  const latestBlogs = await getLatestHomepageBlogSummaries(8);
  const otherEntranceExamBlogs = await getLatestOtherEntranceExamBlogSummaries(4);
  const primaryLinks = [
    { label: "GEO Profile", href: "/geo-profile" },
    { label: "MBBS Abroad", href: "/mbbs-abroad" },
    { label: "MBBS India", href: "/mbbs-india" },
    { label: "NEET Hub", href: "/neet" },
    { label: "MBBS Decision Intelligence", href: "/mbbs-decision-intelligence" },
    { label: "Scholarships & Loans", href: "/scholarships-loans" },
    { label: "Trust Center", href: "/trust-center" },
    { label: "Student Alerts", href: "/alert/" },
    { label: "Blog", href: "/blogs" },
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
        ILMALINK MEDIGO by ilmaLink - MBBS Admission and NEET Counselling Guidance
      </h1>
      <Navbar />
      <HomeHeroClient />
      <section className="bg-[#f8fafc] px-4 pb-3 pt-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-[11px] font-medium leading-5 text-slate-600">
            Data compiled from ILMALINK MEDIGO student guidance records and official public sources.
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
        <section className="bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0F4CFF]">
                Other Entrance Exam Updates
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-[#081B35] md:text-4xl">
                Stay current on WBJEE and other non-MBBS entrance exam news.
              </h2>
              <p className="mt-4 text-base font-medium leading-8 text-slate-700">
                Find the latest exam alerts, counselling updates and strategic guidance for alternate entrance exams.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {otherEntranceExamBlogs.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0F4CFF]">
              Platform Overview
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-[#081B35] md:text-4xl">
              ILMALINK MEDIGO is a student-first MBBS admission consultancy and
              medical education guidance platform for Indian students.
            </h2>
            <p className="mt-4 text-base font-medium leading-8 text-slate-700">
              As an MBBS abroad consultant for Indian students, ILMALINK MEDIGO
              combines MBBS India counselling support, NEET counselling
              guidance, MBBS abroad eligibility and document support,
              scholarships, loans and transparent college-wise and country-wise
              comparison before admission decisions.
            </p>
            <p className="mt-4 text-base font-medium leading-8 text-slate-700">
              Unlike commission-first agencies, this transparent MBBS
              counselling platform helps families choose colleges based on fit,
              rules, budget and long-term safety, with best available
              consultancy support for college-wise guidance.
            </p>
            <p className="mt-4 text-sm font-black leading-7 text-[#081B35]">
              Student-first MBBS consultancy • NEET counselling • MBBS abroad
              guidance • Scholarship and loan support
            </p>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
              Student decisions should be guided by fit, rules, budget and
              transparency — not only by admission pressure.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-black text-[#081B35]">
                Key ILMALINK MEDIGO pages
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
    </main>
  );
}
