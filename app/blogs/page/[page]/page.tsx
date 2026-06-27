import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import Navbar from "@/app/components/navbar";
import BlogCard from "@/app/components/blog/BlogCard";
import { BLOGS_PAGE_SIZE } from "@/app/lib/blog/pagination";
import { getPublishedBlogSummaries } from "@/app/lib/blog/store";

type BlogArchivePageProps = {
  params: Promise<{ page: string }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL = "https://www.ilmalink.com";
const BLOGS_URL = `${SITE_URL}/blogs/`;
const BLOG_HERO_IMAGE = "/blog/blog-hero-mbbs-neet-doctor.webp";

function parsePage(value: string) {
  const page = Number.parseInt(value, 10);

  if (!Number.isFinite(page) || page < 1) {
    return null;
  }

  return page;
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogSummaries();
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOGS_PAGE_SIZE));

  if (totalPages <= 1) {
    return [];
  }

  return Array.from({ length: totalPages - 1 }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({
  params,
}: BlogArchivePageProps): Promise<Metadata> {
  const { page } = await params;
  const parsedPage = parsePage(page);

  if (!parsedPage || parsedPage === 1) {
    return {
      title: "MBBS & NEET Aspirants News Blogs | Archive",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const canonicalUrl = `${SITE_URL}/blogs/page/${parsedPage}/`;

  return {
    title: `MBBS & NEET Aspirants News Blogs Archive Page ${parsedPage} | ilmaLink`,
    description:
      "Browse older MBBS admission news, NEET updates, counselling alerts, college guidance, scholarships, loans and medical education insights from ilmalink.",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `MBBS & NEET Aspirants News Blogs Archive Page ${parsedPage}`,
      description:
        "Older ilmaLink MBBS admission news, NEET updates, counselling alerts and college guidance articles.",
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `MBBS & NEET Aspirants News Blogs Archive Page ${parsedPage}`,
      description:
        "Older ilmaLink MBBS admission news, NEET updates, counselling alerts and college guidance articles.",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogArchivePage({
  params,
}: BlogArchivePageProps) {
  const { page } = await params;
  const parsedPage = parsePage(page);

  if (!parsedPage) {
    notFound();
  }

  if (parsedPage === 1) {
    redirect("/blogs/");
  }

  const posts = await getPublishedBlogSummaries();
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOGS_PAGE_SIZE));

  if (parsedPage > totalPages) {
    notFound();
  }

  const start = (parsedPage - 1) * BLOGS_PAGE_SIZE;
  const pagePosts = posts.slice(start, start + BLOGS_PAGE_SIZE);

  const currentUrl = `${SITE_URL}/blogs/page/${parsedPage}/`;
  const previousUrl =
    parsedPage === 2 ? BLOGS_URL : `${SITE_URL}/blogs/page/${parsedPage - 1}/`;
  const nextUrl =
    parsedPage < totalPages
      ? `${SITE_URL}/blogs/page/${parsedPage + 1}/`
      : undefined;

  const visiblePageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ).filter((pageNumber) => {
    if (pageNumber === 1 || pageNumber === totalPages) return true;
    return Math.abs(pageNumber - parsedPage) <= 2;
  });

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
      {
        "@type": "ListItem",
        position: 3,
        name: `Archive Page ${parsedPage}`,
        item: currentUrl,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `MBBS & NEET Aspirants News Blogs Archive Page ${parsedPage}`,
    description:
      "Older ilmaLink MBBS admission news, NEET updates, counselling alerts, college guidance, scholarships, loans and medical education insights.",
    url: currentUrl,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "Blog",
      name: "MBBS & NEET Aspirants News Blogs",
      url: BLOGS_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: pagePosts.map((post, index) => ({
        "@type": "ListItem",
        position: start + index + 1,
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
        <div className="pointer-events-none absolute left-4 top-6 hidden text-[#0F4CFF]/10 md:block">
          <Stethoscope size={92} />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div>
              <Link
                href="/blogs/"
                className="inline-flex items-center gap-2 rounded-2xl border border-[#0F4CFF]/20 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#0F4CFF] shadow-sm transition hover:-translate-y-0.5 hover:border-[#0F4CFF]/40"
              >
                <ArrowLeft size={15} />
                Back to latest blogs
              </Link>

              <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-[#00A986]/25 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#008A73] shadow-sm">
                <ShieldCheck size={15} />
                ilmaLink Archive
              </div>

              <h1 className="mt-5 text-[1.85rem] font-black leading-[0.98] tracking-tight text-[#061733] min-[390px]:text-[2.1rem] sm:text-5xl lg:text-[4rem]">
                MBBS &amp; NEET{" "}
                <span className="bg-[linear-gradient(90deg,#0F4CFF,#00A986)] bg-clip-text text-transparent">
                  News Archive
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[#344766] sm:text-lg sm:leading-8">
                Page {parsedPage} of {totalPages} — older MBBS admission news,
                NEET updates, counselling alerts, college guidance and medical
                education insights.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#archive-list"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-[#0F4CFF] px-6 text-base font-black text-white shadow-[0_20px_40px_rgba(15,76,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#061733]"
                >
                  <BookOpen size={20} />
                  Read Archive
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

            <div className="relative hidden min-h-[350px] lg:block">
              <div className="absolute right-0 top-0 h-[350px] w-[460px] overflow-hidden rounded-bl-[8rem] rounded-tl-[8rem] bg-[linear-gradient(135deg,#EAF3FF,#CFF8F0)] shadow-[0_30px_90px_rgba(8,27,53,0.12)]">
                <Image
                  src={BLOG_HERO_IMAGE}
                  alt="MBBS and NEET aspirants archive by ilmalink"
                  fill
                  priority
                  sizes="460px"
                  className="object-cover object-center"
                />
              </div>

              <div className="absolute bottom-8 right-8 rounded-3xl bg-white p-5 text-center shadow-[0_20px_55px_rgba(8,27,53,0.14)]">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0F4CFF]">
                  Archive
                </p>
                <p className="text-5xl font-black text-[#061733]">
                  {parsedPage}
                </p>
                <p className="text-xs font-bold text-slate-600">
                  of {totalPages} Pages
                </p>
                <p className="mt-2 text-[#00A986]">★★★★★</p>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-3 rounded-[1.6rem] border border-slate-200/80 bg-white/90 p-4 shadow-[0_20px_60px_rgba(8,27,53,0.08)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 lg:p-5">
            {[
              {
                title: "Older Updates",
                text: "Past NEET & admission news",
                Icon: GraduationCap,
                bg: "bg-[#EAF1FF]",
                color: "text-[#0F4CFF]",
              },
              {
                title: "College Guidance",
                text: "Archived college insights",
                Icon: Building2,
                bg: "bg-[#DFFAF3]",
                color: "text-[#008A73]",
              },
              {
                title: "Counselling Alerts",
                text: "Previous dates & process notes",
                Icon: ClipboardList,
                bg: "bg-[#F0E8FF]",
                color: "text-[#6D28D9]",
              },
              {
                title: "SEO Crawlable",
                text: "Server-rendered archive page",
                Icon: ShieldCheck,
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

      <section
        id="archive-list"
        className="mx-auto max-w-7xl px-4 pb-10 pt-2 sm:px-6 md:pb-12 lg:px-8"
      >
        <div className="mb-5 overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white/90 p-4 shadow-[0_20px_60px_rgba(8,27,53,0.08)] backdrop-blur-xl sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0F4CFF]">
                Archive Page {parsedPage}
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-[#061733] sm:text-3xl">
                Older MBBS &amp; NEET Blog Updates
              </h2>
              <p className="mt-1 text-sm font-semibold leading-6 text-[#50617A]">
                Showing {pagePosts.length} articles from this archive page.
              </p>
            </div>

            <Link
              href="/blogs/"
              className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-2xl bg-[#0F4CFF] px-5 text-sm font-black text-white shadow-[0_16px_34px_rgba(15,76,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#061733]"
            >
              Latest Blogs
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pagePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <nav
          aria-label="Blogs archive pagination"
          className="mt-8 overflow-hidden rounded-[1.35rem] bg-[linear-gradient(100deg,#073BCE_0%,#061733_48%,#00A986_100%)] p-4 text-white shadow-[0_22px_60px_rgba(15,76,255,0.18)] sm:p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-lg font-black">Browse Archive Pages</p>
              <p className="mt-1 text-sm font-semibold text-white/80">
                Continue reading older MBBS admission and NEET blog updates.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={previousUrl}
                aria-label="Previous blog archive page"
                className="inline-flex items-center gap-1.5 rounded-2xl border border-white/25 bg-white/10 px-4 py-2 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                <ChevronLeft size={14} />
                Previous
              </Link>

              {visiblePageNumbers.map((pageNumber, index) => {
                const previousVisible = visiblePageNumbers[index - 1];
                const shouldShowGap =
                  index > 0 && pageNumber - previousVisible > 1;

                return (
                  <span
                    key={`archive-nav-wrap-${pageNumber}`}
                    className="inline-flex items-center gap-2"
                  >
                    {shouldShowGap && (
                      <span className="px-1 text-xs font-black text-white/60">
                        ...
                      </span>
                    )}

                    <Link
                      href={
                        pageNumber === 1
                          ? "/blogs/"
                          : `/blogs/page/${pageNumber}/`
                      }
                      aria-current={
                        pageNumber === parsedPage ? "page" : undefined
                      }
                      className={`rounded-2xl px-4 py-2 text-xs font-black transition ${
                        pageNumber === parsedPage
                          ? "bg-white text-[#061733]"
                          : "border border-white/25 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/15"
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  </span>
                );
              })}

              {nextUrl && (
                <Link
                  href={nextUrl}
                  aria-label="Next blog archive page"
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-white/25 bg-white/10 px-4 py-2 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Next
                  <ChevronRight size={14} />
                </Link>
              )}
            </div>
          </div>
        </nav>
      </section>
    </main>
  );
}