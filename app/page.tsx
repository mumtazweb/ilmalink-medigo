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
  title: "ILMALINK MEDIGO by ilmaLink | MBBS Abroad, MBBS India & NEET Guidance",
  description:
    "Official medical education platform of ilmaLink for MBBS Abroad, MBBS India, NEET counselling, scholarships and university guidance.",
  alternates: {
    canonical: "https://www.ilmalink.com/",
  },
  openGraph: {
    title: "ILMALINK MEDIGO by ilmaLink | MBBS Abroad, MBBS India & NEET Guidance",
    description:
      "Official medical education platform of ilmaLink for MBBS Abroad, MBBS India, NEET counselling, scholarships and university guidance.",
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
              ILMALINK MEDIGO is the MBBS counselling and medical admission
              guidance platform of ILMALINK.
            </h2>
            <p className="mt-4 text-base font-medium leading-8 text-slate-700">
              Students use ILMALINK MEDIGO for MBBS abroad counselling, MBBS
              India counselling support, NEET guidance, eligibility review,
              documentation help, university comparison, scholarship and loan
              guidance, and student support across India and major medical
              education destinations.
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
