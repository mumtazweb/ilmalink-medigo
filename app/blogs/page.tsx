import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/navbar";
import BlogsDirectory from "../components/blog/BlogsDirectory";
import { blogCategories } from "../lib/blog/seed";
import { BLOGS_PAGE_SIZE } from "../lib/blog/pagination";

import { getCountries, getPublishedBlogSummaries } from "../lib/blog/store";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "ILMALINK MEDIGO Blogs | MBBS, NEET & Medical Admission Updates",
  description:
    "Medical education updates, MBBS guidance, NEET insights and career resources from ILMALINK MEDIGO.",
  alternates: {
    canonical: "https://www.ilmalink.com/blogs",
  },
  openGraph: {
    title: "ILMALINK MEDIGO Blogs",
    description:
      "Medical education updates, MBBS guidance, NEET insights and career resources.",
    url: "https://www.ilmalink.com/blogs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ILMALINK MEDIGO Blogs",
    description:
      "Medical education updates, MBBS guidance, NEET insights and career resources.",
  },
};

export default async function BlogsPage() {
  const posts = await getPublishedBlogSummaries();
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
        item: "https://www.ilmalink.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://www.ilmalink.com/blogs",
      },
    ],
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ILMALINK MEDIGO Blogs",
    description:
      "Published ILMALINK MEDIGO medical education updates, MBBS guidance, NEET insights and career resources.",
    url: "https://www.ilmalink.com/blogs",
    inLanguage: "en-IN",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.slice(0, 50).map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        description: post.shortDescription,
        url: `https://www.ilmalink.com/blogs/${post.slug}`,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#0F172A]">
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

      {/* BLOG SYSTEM: Dedicated blog listing hero. */}
      <section className="border-b border-[#0B2244]/20 bg-[#061733] px-4 py-7 text-white sm:px-6 md:py-9 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00C896]">
              Medical education insights
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-normal md:text-5xl">
              ILMALINK MEDIGO Blogs
            </h1>

            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-200 md:text-base md:leading-7">
              Trusted MBBS, NEET, admission and career updates for students planning medical education in India and abroad.
              Read concise guidance, official-alert explainers and practical planning notes.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-[0.12em]">
            <span className="rounded-full border border-[#00C896]/35 bg-[#00C896]/10 px-3 py-1.5 text-[#BFFFF0]">
              Verified guidance
            </span>
            <span className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-slate-100">
              MBBS India & abroad
            </span>
            <span className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-slate-100">
              NEET updates
            </span>
          </div>
        </div>
      </section>

      <BlogsDirectory
        posts={posts}
        categories={[...blogCategories]}
        countries={countries}
      />

      {archivePages.length > 0 && (
        <section className="pb-10">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#047857]">
                Crawlable blog archive
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Browse older server-rendered archive pages:
              </p>
              <nav aria-label="Blog archive pagination" className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="/blogs/"
                  className="rounded-full border border-[#0F4CFF]/20 bg-[#0F4CFF]/10 px-3 py-1.5 text-xs font-black text-[#0F4CFF]"
                >
                  Page 1
                </Link>
                {archivePages.map((pageNumber) => (
                  <Link
                    key={`archive-page-${pageNumber}`}
                    href={`/blogs/page/${pageNumber}/`}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-700 transition hover:border-[#0F4CFF]/40 hover:text-[#0F4CFF]"
                  >
                    Page {pageNumber}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
