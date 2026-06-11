import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Share2, UserRound } from "lucide-react";
import Navbar from "@/app/components/navbar";
import BlogCard from "@/app/components/blog/BlogCard";
import BlogContent from "@/app/components/blog/BlogContent";
import {
  getAdjacentBlogs,
  getBlogBySlug,
  getPublishedBlogs,
  getRelatedBlogs,
} from "@/app/lib/blog/store";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedBlogs();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found | ILMALINK MEDIGO",
    };
  }

  const url = `https://ilmalink.com/blogs/${post.slug}`;

  return {
    title: post.seoTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url,
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
      images: [
        {
          url: post.featuredImage,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.metaDescription,
      images: [post.featuredImage],
    },
  };
}

export default async function SingleBlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = await getRelatedBlogs(post);
  const adjacent = await getAdjacentBlogs(post);
  const articleUrl = `https://ilmalink.com/blogs/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: post.featuredImage,
    datePublished: post.publishDate,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "ILMALINK MEDIGO",
      logo: {
        "@type": "ImageObject",
        url: "https://ilmalink.com/logoimage.svg",
      },
    },
    mainEntityOfPage: articleUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ilmalink.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://ilmalink.com/blogs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* BLOG SYSTEM: Single blog article layout. */}
      <article className="mx-auto max-w-5xl px-4 pb-16 pt-36 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.10)]">
          <div className="relative h-[20vh] min-h-[140px] max-h-[220px] bg-[#EFF6FF] md:h-[22vh]">
            <Image
              src={post.featuredImage}
              alt={post.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              className={`object-cover ${
  post.imagePosition === "top"
    ? "object-top"
    : post.imagePosition === "bottom"
      ? "object-bottom"
      : post.imagePosition === "left"
        ? "object-left"
        : post.imagePosition === "right"
          ? "object-right"
          : "object-center"
}`}
            />
          </div>

          <div className="p-6 md:p-10">
            <span className="rounded-full bg-[#0F4CFF]/10 px-3 py-1 text-xs font-bold text-[#0F4CFF]">
              {post.category}
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-[#0F172A] md:text-5xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-2">
                <UserRound size={16} /> {post.authorName}
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays size={16} />{" "}
                {new Date(post.publishDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} /> {post.readTime}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-[#0F4CFF] transition hover:border-[#0F4CFF]/30"
              >
                <Share2 size={15} /> Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${articleUrl}&text=${post.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-[#0F4CFF] transition hover:border-[#0F4CFF]/30"
              >
                <Share2 size={15} /> X
              </a>
              <a
                href={`https://wa.me/?text=${post.title}%20${articleUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-[#16A34A] transition hover:border-[#16A34A]/30"
              >
                <Share2 size={15} /> WhatsApp
              </a>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <BlogContent content={post.content} />
            </div>
          </div>
        </div>
      </article>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {adjacent.previous && (
            <Link
              href={`/blogs/${adjacent.previous.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#0F4CFF]/30"
            >
              <span className="flex items-center gap-2 text-sm font-bold text-slate-500">
                <ChevronLeft size={16} /> Previous article
              </span>
              <p className="mt-2 font-bold text-[#0F172A]">{adjacent.previous.title}</p>
            </Link>
          )}
          {adjacent.next && (
            <Link
              href={`/blogs/${adjacent.next.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-right shadow-sm transition hover:border-[#0F4CFF]/30"
            >
              <span className="flex items-center justify-end gap-2 text-sm font-bold text-slate-500">
                Next article <ChevronRight size={16} />
              </span>
              <p className="mt-2 font-bold text-[#0F172A]">{adjacent.next.title}</p>
            </Link>
          )}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-6">
          <h2 className="text-xl font-bold text-[#0F172A]">Comments</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Comment section placeholder for moderated student questions and counsellor replies.
          </p>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#0F172A]">Related blogs</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
