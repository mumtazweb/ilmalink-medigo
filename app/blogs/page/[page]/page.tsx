import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import Navbar from "@/app/components/navbar";
import BlogCard from "@/app/components/blog/BlogCard";
import { BLOGS_PAGE_SIZE } from "@/app/lib/blog/pagination";
import { getPublishedBlogSummaries } from "@/app/lib/blog/store";

type BlogArchivePageProps = {
  params: Promise<{ page: string }>;
};

export const revalidate = 3600;

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

export async function generateMetadata({ params }: BlogArchivePageProps): Promise<Metadata> {
  const { page } = await params;
  const parsedPage = parsePage(page);

  if (!parsedPage || parsedPage === 1) {
    return {
      title: "ILMALINK MEDIGO Blogs | Archive",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    title: `ILMALINK MEDIGO Blogs | Archive Page ${parsedPage}`,
    description:
      "Server-rendered archive pages for older ILMALINK MEDIGO MBBS, NEET and medical admission updates.",
    alternates: {
      canonical: `https://www.ilmalink.com/blogs/page/${parsedPage}/`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogArchivePage({ params }: BlogArchivePageProps) {
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
        item: "https://www.ilmalink.com/blogs/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Archive Page ${parsedPage}`,
        item: `https://www.ilmalink.com/blogs/page/${parsedPage}/`,
      },
    ],
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

      <section className="border-b border-[#0B2244]/20 bg-[#061733] px-4 py-7 text-white sm:px-6 md:py-9 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00C896]">Blog archive</p>
          <h1 className="mt-2 text-3xl font-black tracking-normal md:text-5xl">
            ILMALINK MEDIGO Blogs Archive - Page {parsedPage}
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-200 md:text-base md:leading-7">
            Older server-rendered posts for MBBS, NEET and medical admission guidance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pagePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <nav aria-label="Blogs archive pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {parsedPage > 2 ? (
            <Link
              href={`/blogs/page/${parsedPage - 1}/`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 transition hover:border-[#0F4CFF]/40 hover:text-[#0F4CFF]"
            >
              Previous
            </Link>
          ) : parsedPage === 2 ? (
            <Link
              href="/blogs/"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 transition hover:border-[#0F4CFF]/40 hover:text-[#0F4CFF]"
            >
              Previous
            </Link>
          ) : null}

          <Link
            href="/blogs/"
            className={`rounded-full border px-3 py-2 text-xs font-black transition ${
              parsedPage === 1
                ? "border-[#0F4CFF]/20 bg-[#0F4CFF]/10 text-[#0F4CFF]"
                : "border-slate-200 bg-white text-slate-700 hover:border-[#0F4CFF]/40 hover:text-[#0F4CFF]"
            }`}
          >
            1
          </Link>

          {Array.from({ length: totalPages - 1 }, (_, index) => index + 2).map((pageNumber) => (
            <Link
              key={`archive-nav-${pageNumber}`}
              href={`/blogs/page/${pageNumber}/`}
              className={`rounded-full border px-3 py-2 text-xs font-black transition ${
                pageNumber === parsedPage
                  ? "border-[#0F4CFF]/20 bg-[#0F4CFF]/10 text-[#0F4CFF]"
                  : "border-slate-200 bg-white text-slate-700 hover:border-[#0F4CFF]/40 hover:text-[#0F4CFF]"
              }`}
            >
              {pageNumber}
            </Link>
          ))}

          {parsedPage < totalPages && (
            <Link
              href={`/blogs/page/${parsedPage + 1}/`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 transition hover:border-[#0F4CFF]/40 hover:text-[#0F4CFF]"
            >
              Next
            </Link>
          )}
        </nav>
      </section>
    </main>
  );
}
