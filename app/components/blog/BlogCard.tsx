import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, UserRound } from "lucide-react";
import type { BlogPost } from "@/app/lib/blog/types";
import { isImageFile, isVideoFile } from "@/app/lib/blog/imageValidation";

export default function BlogCard({ post }: { post: BlogPost }) {
  const featuredImage = post.featuredImage?.trim();
  const hasFeaturedMedia = Boolean(featuredImage);
  const hasFeaturedVideo = featuredImage ? isVideoFile(featuredImage) : false;
  const hasFeaturedImage = featuredImage ? isImageFile(featuredImage) : false;

  return (
    <article className="group flex h-full min-h-[430px] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(15,23,42,0.12)]">
      {hasFeaturedMedia && (hasFeaturedImage || hasFeaturedVideo) && (
        <div className="relative h-56 overflow-hidden bg-[var(--brand-blue-soft)]">
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
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F4CFF] shadow-sm">
            {post.category}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {(!hasFeaturedMedia || (!hasFeaturedImage && !hasFeaturedVideo)) && (
          <span className="mb-4 w-fit rounded-full bg-[#0F4CFF]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#0F4CFF]">
            {post.category}
          </span>
        )}
        <h3 className="line-clamp-2 text-2xl font-semibold leading-snug text-[#0F172A]">
          {post.title}
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
          {post.shortDescription}
        </p>

        <div className="mt-6 grid gap-3 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-2">
            <UserRound size={14} /> {post.authorName}
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays size={14} />
            {new Date(post.publishDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={14} /> {post.readTime}
          </span>
        </div>

        <Link
          href={`/blogs/${post.slug}`}
          className="mt-auto inline-flex w-fit items-center justify-center rounded-full bg-[#c8102e] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(200,16,46,0.22)] transition hover:bg-[#a50b27]"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
