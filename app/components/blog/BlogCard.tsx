import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { BlogSummaryPost } from "@/app/lib/blog/types";
import { isImageFile, isVideoFile } from "@/app/lib/blog/imageValidation";

export type BlogCardPost = Pick<
  BlogSummaryPost,
  | "id"
  | "title"
  | "slug"
  | "featuredImage"
  | "imageAlt"
  | "shortDescription"
  | "category"
  | "tags"
  | "publishDate"
  | "readTime"
>;

export default function BlogCard({ post }: { post: BlogCardPost }) {
  const featuredImage = post.featuredImage?.trim();
  const hasFeaturedMedia = Boolean(featuredImage);
  const hasFeaturedVideo = featuredImage ? isVideoFile(featuredImage) : false;
  const hasFeaturedImage = featuredImage ? isImageFile(featuredImage) : false;
  const cardTags = Array.from(
    new Set([post.category, ...post.tags])
  )
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <article className="group flex h-full min-h-[390px] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_16px_38px_rgba(8,27,53,0.08)] ring-1 ring-white transition duration-300 hover:-translate-y-1 hover:border-[#0F4CFF]/30 hover:shadow-[0_24px_60px_rgba(8,27,53,0.14)]">
      {hasFeaturedMedia && (hasFeaturedImage || hasFeaturedVideo) && (
        <div className="relative h-48 overflow-hidden bg-[#061733]">
          {hasFeaturedVideo ? (
            <video
              src={featuredImage}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <Image
              src={featuredImage}
              alt={post.imageAlt || post.title}
              fill
              sizes="(min-width: 1024px) 360px, 88vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,23,51,0.06)_0%,rgba(6,23,51,0.58)_100%)]" />
          <span className="absolute left-3 top-3 max-w-[85%] truncate rounded-full border border-white/40 bg-white/95 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#0F4CFF] shadow-sm">
            {post.category}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {(!hasFeaturedMedia || (!hasFeaturedImage && !hasFeaturedVideo)) && (
          <span className="mb-3 w-fit max-w-full truncate rounded-full bg-[#0F4CFF]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#0F4CFF]">
            {post.category}
          </span>
        )}
        <h3 className="line-clamp-2 text-xl font-black leading-snug text-[#0B2244]">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-600">
          {post.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
            <CalendarDays size={14} />
            {new Date(post.publishDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
            <Clock size={14} />
            {post.readTime}
          </span>

          {cardTags.map((tag) => (
            <span
              key={tag}
              className="max-w-[9rem] truncate rounded-full border border-[#0F4CFF]/10 bg-[#0F4CFF]/[0.08] px-3 py-1.5 font-extrabold text-[#0F4CFF]"
              title={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/blogs/${post.slug}`}
          prefetch
          className="mt-auto inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#0F4CFF]/20 bg-[#0F4CFF]/10 px-5 py-2.5 text-sm font-black text-[#0F4CFF] transition hover:border-[#0F4CFF] hover:bg-[#0F4CFF] hover:text-white"
        >
          Read article <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
