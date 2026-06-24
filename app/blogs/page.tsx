import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Building2,
  ClipboardList,
  GraduationCap,
  ShieldCheck,
  Stethoscope,
  Target,
} from "lucide-react";

import Navbar from "../components/navbar";
import BlogsDirectory from "../components/blog/BlogsDirectory";
import { blogCategories } from "../lib/blog/seed";
import { BLOGS_PAGE_SIZE } from "../lib/blog/pagination";
import { getCountries, getPublishedBlogSummaries } from "../lib/blog/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL = "https://www.ilmalink.com";
const BLOGS_URL = `${SITE_URL}/blogs/`;

export const metadata: Metadata = {
  title: "MBBS & NEET Aspirants News Blogs | ILMALINK MEDIGO",
  description:
    "Latest MBBS admission news, NEET updates, counselling alerts, college guidance, scholarships, loans and medical education insights for students and parents.",
  alternates: {
    canonical: BLOGS_URL,
  },
  openGraph: {
    title: "MBBS & NEET Aspirants News Blogs | ILMALINK MEDIGO",
    description:
      "Latest MBBS admission news, NEET updates, counselling alerts, college guidance, scholarships, loans and medical education insights.",
    url: BLOGS_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MBBS & NEET Aspirants News Blogs | ILMALINK MEDIGO",
    description:
      "Latest MBBS admission news, NEET updates, counselling alerts, college guidance, scholarships, loans and medical education insights.",
  },
};

export default async function BlogsPage() {
  const posts = await getPublishedBlogSummaries();
  const firstPagePosts = posts.slice(0, BLOGS_PAGE_SIZE);
  const countries = getCountries(posts);
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOGS_PAGE_SIZE));
  const archivePages = Array.from(
    { length: Math.max(0, totalPages - 1) },
    (_, index) => index + 2
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: BLOGS_URL,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "MBBS & NEET Aspirants News Blogs",
    description:
      "Published ILMALINK MEDIGO MBBS admission news, NEET updates, counselling alerts, college guidance, scholarships, loans and medical education insights.",
    url: BLOGS_URL,
    inLanguage: "en-IN",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: firstPagePosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        description: post.shortDescription,
        url: `${SITE_URL}/blogs/${post.slug}/`,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#F8FBFF_0%,#EEF8FF_45%,#FFFFFF_100%)] text-[#0F172A]">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />

      <section className="relative overflow-hidden px-4 pb-7 pt-8 sm:px-6 md:pb-10 md:pt-12 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(15,76,255,0.12),transparent_28%),radial-gradient(circle_at_88%_5%,rgba(0,200,150,0.16),transparent_30%)]" />
        <div className="pointer-events-none absolute right-0 top-0 hidden h-[420px] w-[520px] rounded-bl-[12rem] bg-[linear-gradient(135deg,rgba(15,76,255,0.12),rgba(0,200,150,0.20))] lg:block" />
        <div className="pointer-events-none absolute right-16 top-10 hidden h-40 w-40 rounded-full border-[28px] border-[#0F4CFF]/10 lg:block" />
        <div className="pointer-events-none absolute left-4 top-6 hidden text-[#0F4CFF]/10 md:block">
          <Stethoscope size={92} />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-[#0F4CFF]/20 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#0F4CFF] shadow-sm">
                <ShieldCheck size={15} />
                ILMALINK MEDIGO Updates
              </div>

              <h1 className="mt-5 whitespace-nowrap text-[1.9rem] font-black leading-[0.98] tracking-tight text-[#061733] min-[390px]:text-[2.15rem] sm:text-5xl lg:text-[4.15rem]">
                MBBS &amp; NEET{" "}
                <span className="bg-[linear-gradient(90deg,#0F4CFF,#00A986)] bg-clip-text text-transparent">
                  Aspirants News Blogs
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[#344766] sm:text-lg sm:leading-8">
                Latest MBBS admission news, NEET updates, counselling alerts,
                college guidance, scholarships, loans and medical education
                insights for students and parents.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#blog-list"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-[#0F4CFF] px-6 text-base font-black text-white shadow-[0_20px_40px_rgba(15,76,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#061733]"
                >
                  <BookOpen size={20} />
                  Explore Blogs
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/neet/"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-[#00A986]/35 bg-white px-6 text-base font-black text-[#008A73] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#EFFFFA]"
                >
                  <Bell size={18} />
                  NEET Updates
                </Link>
              </div>
            </div>

            <div className="relative hidden min-h-[330px] lg:block">
              <div className="absolute right-0 top-0 h-[330px] w-[420px] overflow-hidden rounded-bl-[8rem] rounded-tl-[8rem] bg-[linear-gradient(135deg,#EAF3FF,#CFF8F0)] shadow-[0_30px_90px_rgba(8,27,53,0.12)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(255,255,255,0.95),transparent_34%),linear-gradient(135deg,rgba(15,76,255,0.16),rgba(0,200,150,0.22))]" />
                <div className="absolute left-16 top-16 flex h-44 w-44 items-center justify-center rounded-full bg-white/80 text-[#0F4CFF] shadow-[0_18px_50px_rgba(15,76,255,0.12)]">
                  <Stethoscope size={92} />
                </div>
                <div className="absolute bottom-8 right-8 rounded-3xl bg-white p-5 text-center shadow-[0_20px_55px_rgba(8,27,53,0.14)]">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0F4CFF]">
                    Guidance
                  </p>
                  <p className="text-5xl font-black text-[#061733]">
                    {posts.length}+
                  </p>
                  <p className="text-xs font-bold text-slate-600">
                    Published Updates
                  </p>
                  <p className="mt-2 text-[#00A986]">★★★★★</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-3 rounded-[1.6rem] border border-slate-200/80 bg-white/90 p-4 shadow-[0_20px_60px_rgba(8,27,53,0.08)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 lg:p-5">
            {[
              {
                title: "Latest Updates",
                text: "NEET, counselling & admission news",
                Icon: GraduationCap,
                bg: "bg-[#EAF1FF]",
                color: "text-[#0F4CFF]",
              },
              {
                title: "College Guidance",
                text: "Find the best medical colleges",
                Icon: Building2,
                bg: "bg-[#DFFAF3]",
                color: "text-[#008A73]",
              },
              {
                title: "Counselling Alerts",
                text: "Dates, documents & process updates",
                Icon: ClipboardList,
                bg: "bg-[#F0E8FF]",
                color: "text-[#6D28D9]",
              },
              {
                title: "Scholarships & Loans",
                text: "Explore financial support",
                Icon: GraduationCap,
                bg: "bg-[#FFF4D8]",
                color: "text-[#B7791F]",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
                >
                  <item.Icon size={26} />
                </span>
                <div>
                  <p className="text-base font-black text-[#061733]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-5 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog-list" className="relative">
        <BlogsDirectory
          posts={firstPagePosts}
          categories={[...blogCategories]}
          countries={countries}
        />
      </section>

      {archivePages.length > 0 && (
        <section className="px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-[1.35rem] bg-[linear-gradient(100deg,#073BCE_0%,#061733_48%,#00A986_100%)] p-5 text-white shadow-[0_22px_60px_rgba(15,76,255,0.18)] sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                    <BookOpen size={25} />
                  </span>

                  <div>
                    <h2 className="text-2xl font-black leading-tight">
                      Browse Older MBBS &amp; NEET Updates
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm font-semibold leading-6 text-white/85">
                      Continue reading older server-rendered archive pages for
                      admission news, counselling alerts and college guidance.
                    </p>
                  </div>
                </div>

                <nav
                  aria-label="Blog archive pagination"
                  className="flex flex-wrap gap-2"
                >
                  <Link
                    href="/blogs/"
                    className="rounded-2xl bg-white px-4 py-2 text-xs font-black text-[#061733] transition hover:-translate-y-0.5"
                  >
                    Page 1
                  </Link>

                  {archivePages.map((pageNumber) => (
                    <Link
                      key={`archive-page-${pageNumber}`}
                      href={`/blogs/page/${pageNumber}/`}
                      className="rounded-2xl border border-white/25 bg-white/10 px-4 py-2 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                    >
                      Page {pageNumber}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}