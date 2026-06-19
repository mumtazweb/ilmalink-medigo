import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronLeft, ChevronRight, MessageCircle, Send, Share2, ShieldCheck } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import Navbar from "@/app/components/navbar";
import BlogCard from "@/app/components/blog/BlogCard";
import BlogCommentSubmittedNotice from "@/app/components/blog/BlogCommentSubmittedNotice";
import BlogContent from "@/app/components/blog/BlogContent";
import BlogImageRenderer from "@/app/components/blog/BlogImageRenderer";
import { submitBlogCommentAction } from "@/app/lib/blog/actions";
import { isImageFile, isVideoFile } from "@/app/lib/blog/imageValidation";
import {
  getBlogBySlug,
  getBlogArticleData,
  getPublishedBlogs,
} from "@/app/lib/blog/store";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

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

  const url = `https://www.ilmalink.com/blogs/${post.slug}/`;
  const featuredImage = post.featuredImage?.trim();
  const hasSocialImage = Boolean(featuredImage && isImageFile(featuredImage));

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
      ...(hasSocialImage && featuredImage
        ? {
            images: [
              {
                url: featuredImage,
                alt: post.imageAlt || post.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: hasSocialImage ? "summary_large_image" : "summary",
      title: post.seoTitle,
      description: post.metaDescription,
      ...(hasSocialImage && featuredImage ? { images: [featuredImage] } : {}),
    },
  };
}

export default async function SingleBlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const { post, related, adjacent, comments } = await getBlogArticleData(slug);

  if (!post) {
    notFound();
  }

  const articleUrl = `https://www.ilmalink.com/blogs/${post.slug}/`;
  const encodedArticleUrl = encodeURIComponent(articleUrl);
  const encodedShareText = encodeURIComponent(`${post.title} - ${post.shortDescription}`);

  const featuredImage = post.featuredImage?.trim();
  const hasFeaturedVideo = featuredImage ? isVideoFile(featuredImage) : false;
  const hasFeaturedImage = featuredImage ? isImageFile(featuredImage) : false;
  const imagePositionClass =
    post.imagePosition === "top"
      ? "object-top"
      : post.imagePosition === "bottom"
        ? "object-bottom"
        : post.imagePosition === "left"
          ? "object-left"
          : post.imagePosition === "right"
            ? "object-right"
            : "object-center";

  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedArticleUrl}`,
      icon: FaFacebookF,
      className: "text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white",
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedArticleUrl}`,
      icon: FaXTwitter,
      className: "text-[#101010] hover:border-[#101010] hover:bg-[#101010] hover:text-white",
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedShareText}%20${encodedArticleUrl}`,
      icon: FaWhatsapp,
      className: "text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366] hover:text-white",
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodedArticleUrl}&text=${encodedShareText}`,
      icon: FaTelegramPlane,
      className: "text-[#229ED9] hover:border-[#229ED9] hover:bg-[#229ED9] hover:text-white",
    },
    {
      label: "Threads",
      href: `https://www.threads.net/intent/post?text=${encodedShareText}%20${encodedArticleUrl}`,
      icon: FaThreads,
      className: "text-[#101010] hover:border-[#101010] hover:bg-[#101010] hover:text-white",
    },
  ];

  const followLinks = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/ilmalinkeduprise/",
      icon: FaFacebookF,
      className: "text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/ilmalinkmbbs/",
      icon: FaInstagram,
      className: "text-[#D62976] hover:border-[#D62976] hover:bg-[#D62976] hover:text-white",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@ilmaLinkFoundation",
      icon: FaYoutube,
      className: "text-[#FF0000] hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white",
    },
    {
      label: "Threads",
      href: "https://www.threads.com/@ilmalinkmbbs",
      icon: FaThreads,
      className: "text-[#101010] hover:border-[#101010] hover:bg-[#101010] hover:text-white",
    },
    {
      label: "X",
      href: "https://x.com/middyaofficial",
      icon: FaXTwitter,
      className: "text-[#101010] hover:border-[#101010] hover:bg-[#101010] hover:text-white",
    },
    {
      label: "Telegram",
      href: "https://t.me/+919563910223",
      icon: FaTelegramPlane,
      className: "text-[#229ED9] hover:border-[#229ED9] hover:bg-[#229ED9] hover:text-white",
    },
  ];

  const socialGroups = [
    {
      label: "Share",
      ariaPrefix: "Share on",
      links: shareLinks,
    },
    {
      label: "Follow",
      ariaPrefix: "Follow ILMALINK on",
      links: followLinks,
    },
  ];

  const articleTags = Array.from(
    new Set([post.category, ...post.tags])
  )
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 6);
  const primaryTag = articleTags[0] ?? post.category;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    inLanguage: "en-IN",
    ...(hasFeaturedImage && featuredImage ? { image: featuredImage } : {}),
    datePublished: post.publishDate,
    dateModified: post.updatedAt,
    about: articleTags.map((tag) => ({
      "@type": "Thing",
      name: tag,
    })),
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "ILMALINK MEDIGO",
      logo: {
        "@type": "ImageObject",
        url: "https://www.ilmalink.com/logoimage.svg",
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
        item: "https://www.ilmalink.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://www.ilmalink.com/blogs",
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
    <main className="min-h-screen bg-[#F5F8FC] pb-14 text-[#0F172A] sm:pb-0">
      <Navbar />
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
  }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
  }}
/>

      {/* BLOG SYSTEM: Single blog article layout. */}
      <article className="mx-auto max-w-5xl px-3 pb-12 pt-5 sm:px-6 sm:pb-16 md:pt-8 lg:px-8">
        <div className="relative">
          <aside className="fixed left-3 top-36 z-30 hidden xl:block 2xl:left-[calc((100vw-64rem)/2-5rem)]">
            <div className="flex flex-col items-center gap-3">
              {socialGroups.map((group) => (
                <div
                  key={group.label}
                  className="flex flex-col items-center gap-1.5 rounded-full border border-slate-200 bg-white p-1.5 shadow-[0_12px_28px_rgba(15,23,42,0.16)]"
                >
                  <span className="px-1 text-[10px] font-black uppercase leading-none tracking-[0.08em] text-slate-600">
                    {group.label}
                  </span>

                  {group.links.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={`${group.label}-${item.label}`}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${group.ariaPrefix} ${item.label}`}
                        title={`${group.ariaPrefix} ${item.label}`}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-sm shadow-sm transition hover:-translate-y-0.5 ${item.className}`}
                      >
                        <Icon aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              ))}
            </div>
          </aside>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_28px_80px_rgba(8,27,53,0.12)] ring-1 ring-white">
          {featuredImage && (hasFeaturedImage || hasFeaturedVideo) && (
            <div className="relative h-[22vh] min-h-[160px] max-h-[300px] bg-[#061733] md:h-[28vh]">
              {hasFeaturedVideo ? (
                <video
                  src={featuredImage}
                  className={`h-full w-full object-cover ${imagePositionClass}`}
                  controls
                  preload="metadata"
                />
              ) : (
                <Image
                  src={featuredImage}
                  alt={post.imageAlt || post.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 960px, 100vw"
                  className={`object-cover ${imagePositionClass}`}
                />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#061733]/55 to-transparent" />
            </div>
          )}

          <div className="p-5 sm:p-7 md:p-12">
            <div className="hidden flex-wrap items-center gap-2 sm:flex">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00C896]/25 bg-[#00C896]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#047857]">
                <ShieldCheck size={14} /> Verified ILMALINK update
              </span>
              <span className="w-fit rounded-full border border-[#0F4CFF]/15 bg-[#0F4CFF]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#0F4CFF]">
                {post.category}
              </span>
            </div>

            <h1 className="text-[2rem] font-black leading-tight text-[#081B35] sm:mt-5 md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 max-w-3xl border-l-4 border-[#00C896] pl-4 text-base font-semibold leading-7 text-slate-600 md:text-xl md:leading-8">
              {post.shortDescription}
            </p>

            <div className="mt-5 flex h-10 items-center gap-1.5 overflow-x-auto rounded-full border border-slate-200 bg-white px-2 shadow-[0_10px_26px_rgba(8,27,53,0.08)] sm:hidden">
              <span className="flex h-7 shrink-0 items-center gap-1 rounded-full bg-slate-100 px-2.5 text-[11px] font-extrabold text-slate-600">
                <CalendarDays size={12} />{" "}
                {new Date(post.publishDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              <span
                className="flex h-7 max-w-[7.5rem] shrink-0 items-center truncate rounded-full bg-[#0F4CFF]/10 px-2.5 text-[11px] font-black text-[#0F4CFF]"
                title={primaryTag}
              >
                {primaryTag}
              </span>

              <span className="h-5 w-px shrink-0 bg-slate-200" />

              {shareLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={`mobile-share-${item.label}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share on ${item.label}`}
                    title={`Share on ${item.label}`}
                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-xs shadow-sm transition ${item.className}`}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>

            <div className="mt-6 hidden flex-wrap items-center gap-2 text-sm font-medium text-slate-500 sm:flex">
              <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                <CalendarDays size={16} />{" "}
                {new Date(post.publishDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              {articleTags.map((tag) => (
                <span
                  key={tag}
                  className="max-w-[12rem] truncate rounded-full bg-[#0F4CFF]/10 px-3 py-1.5 text-xs font-extrabold text-[#0F4CFF]"
                  title={tag}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 hidden flex-nowrap items-center gap-3 overflow-x-auto border-y border-slate-200 py-2 sm:flex xl:hidden">
              {socialGroups.map((group) => (
                <div
                  key={group.label}
                  className="flex shrink-0 items-center gap-1.5"
                >
                  <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase leading-none tracking-[0.08em] text-slate-600">
                    {group.label === "Share" && <Share2 size={12} />}
                    {group.label}
                  </span>

                  {group.links.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={`${group.label}-${item.label}`}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${group.ariaPrefix} ${item.label}`}
                        title={`${group.ariaPrefix} ${item.label}`}
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-xs shadow-sm transition hover:-translate-y-0.5 ${item.className}`}
                      >
                        <Icon aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-slate-200 pt-8">
              {post.images && post.images.length > 0 && (
                <div className="mb-8 space-y-5">
                  <BlogImageRenderer images={post.images} />
                </div>
              )}

              <BlogContent content={post.content} />
            </div>
          </div>
          </div>
        </div>
      </article>

      <section className="mx-auto max-w-5xl px-3 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {adjacent.previous && (
            <Link
              href={`/blogs/${adjacent.previous.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(8,27,53,0.06)] transition hover:-translate-y-0.5 hover:border-[#0F4CFF]/30 hover:shadow-[0_18px_44px_rgba(8,27,53,0.10)]"
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
              className="rounded-2xl border border-slate-200 bg-white p-5 text-right shadow-[0_14px_34px_rgba(8,27,53,0.06)] transition hover:-translate-y-0.5 hover:border-[#0F4CFF]/30 hover:shadow-[0_18px_44px_rgba(8,27,53,0.10)]"
            >
              <span className="flex items-center justify-end gap-2 text-sm font-bold text-slate-500">
                Next article <ChevronRight size={16} />
              </span>

              <p className="mt-2 font-bold text-[#0F172A]">{adjacent.next.title}</p>
            </Link>
          )}
        </div>

        <section
          id="comments"
          className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(8,27,53,0.10)] ring-1 ring-white"
        >
          <div className="border-b border-slate-100 bg-[#061733] p-5 text-white sm:p-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#00C896]/30 bg-[#00C896]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#BFFFF0]">
              <MessageCircle size={14} /> Student discussion
            </p>

            <h2 className="mt-4 text-2xl font-black sm:text-3xl">
              Write a comment
            </h2>

            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-200">
              Ask a question or share a useful note. Keep it clear, respectful, and helpful for other students.
            </p>

            <Suspense fallback={null}>
              <BlogCommentSubmittedNotice />
            </Suspense>
          </div>

          <form action={submitBlogCommentAction} className="grid gap-4 p-5 sm:p-7">
            <input type="hidden" name="blogId" value={post.id} />
            <input type="hidden" name="blogSlug" value={post.slug} />

            <label className="block">
              <span className="text-sm font-bold text-[#0F172A]">Name</span>
              <input
                name="authorName"
                required
                maxLength={80}
                placeholder="Your name"
                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-[#F6F9FC] px-4 text-sm font-semibold outline-none transition focus:border-[#0F4CFF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(15,76,255,0.08)]"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-[#0F172A]">Comment</span>
              <textarea
                name="message"
                required
                maxLength={1000}
                rows={4}
                placeholder="Write your question or comment"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#F6F9FC] px-4 py-3 text-sm font-medium leading-6 outline-none transition focus:border-[#0F4CFF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(15,76,255,0.08)]"
              />
            </label>

            <button className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-[#0F4CFF] px-6 text-sm font-black text-white shadow-[0_14px_30px_rgba(15,76,255,0.24)] transition hover:bg-[#0b3fd6]">
              <Send size={16} /> Submit comment
            </button>
          </form>

          <div className="border-t border-slate-100 p-5 sm:p-7">
            <h3 className="text-lg font-black text-[#0F172A]">
              Comments
            </h3>

            {comments.length > 0 ? (
              <div className="mt-4 space-y-3">
                {comments.map((comment) => (
                  <article
                    key={comment.id}
                    className="rounded-2xl border border-slate-200 bg-[#F6F9FC] p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-black text-[#0F172A]">
                        {comment.authorName}
                      </p>
                      <time className="text-xs font-bold text-slate-500">
                        {new Date(comment.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
                      {comment.message}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-slate-500">
                No comments yet. Be the first to start the discussion.
              </p>
            )}
          </div>
        </section>

        {related.length > 0 && (
          <div className="mt-12 border-t border-slate-200 pt-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0F4CFF]">
              Continue reading
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#081B35]">Related blogs</h2>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        )}
      </section>

      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 py-1.5 shadow-[0_-14px_30px_rgba(15,23,42,0.16)] backdrop-blur sm:hidden"
        aria-label="Follow ILMALINK"
      >
        <div className="mx-auto flex h-9 max-w-md items-center justify-center gap-2 overflow-x-auto">
          <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.12em] text-slate-600">
            Follow
          </span>
          {followLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={`bottom-follow-${item.label}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow ILMALINK on ${item.label}`}
                title={`Follow ILMALINK on ${item.label}`}
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm shadow-sm transition ${item.className}`}
              >
                <Icon aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
