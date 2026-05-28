"use client";

import { useActionState, useMemo, useRef, useState } from "react";
import { Eye, FileText, Heading2, ImageIcon, Italic, LinkIcon, List, Table2, Type } from "lucide-react";
import { saveBlogAction } from "@/app/lib/blog/actions";
import { blogCategories } from "@/app/lib/blog/seed";
import type { BlogPost, BlogImage } from "@/app/lib/blog/types";
import BlogContent from "./BlogContent";
import ImageUploader from "./ImageUploader";

const initialState = {
  ok: false,
  message: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

// BLOG SYSTEM: Rich blog editor with markdown helpers, SEO fields, preview, editorial image system, and submit workflow.
export default function BlogEditorForm({
  canPublish,
  initialBlog,
}: {
  canPublish: boolean;
  initialBlog?: BlogPost;
}) {
  const [state, formAction, pending] = useActionState(saveBlogAction, initialState);
  const [title, setTitle] = useState(initialBlog?.title ?? "");
  const [slug, setSlug] = useState(initialBlog?.slug ?? "");
  const [content, setContent] = useState(initialBlog?.content ?? "");
  const [preview, setPreview] = useState(false);
  const [images, setImages] = useState<BlogImage[]>(initialBlog?.images ?? []);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const estimatedReadTime = useMemo(() => readTime(content), [content]);

  function insertSnippet(snippet: string) {
    const textarea = textareaRef.current;

    if (!textarea) {
      setContent((current) => `${current}\n${snippet}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const next = `${content.slice(0, start)}${snippet}${content.slice(end)}`;
    setContent(next);
    requestAnimationFrame(() => textarea.focus());
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="blogId" value={initialBlog?.id ?? ""} />
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-[#0F172A]">Title</span>
          <input
            name="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setSlug(slugify(event.target.value));
            }}
            required
            className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-[#0F172A]">Slug auto-generation</span>
          <input
            name="slug"
            value={slug}
            onChange={(event) => setSlug(slugify(event.target.value))}
            required
            className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-[#0F172A]">Featured image upload</span>
          <input
            name="featuredImage"
            defaultValue={initialBlog?.featuredImage}
            placeholder="/blog/mbbs-india.svg or uploaded image URL"
            className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-[#0F172A]">Category</span>
          <select
            name="category"
            defaultValue={initialBlog?.category}
            required
            className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
          >
            {blogCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-bold text-[#0F172A]">Short description</span>
        <textarea
          name="shortDescription"
          defaultValue={initialBlog?.shortDescription}
          required
          rows={3}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="text-sm font-bold text-[#0F172A]">Country tags</span>
          <input
            name="country"
            defaultValue={initialBlog?.country}
            placeholder="India, Kyrgyzstan, Global"
            className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-[#0F172A]">SEO title</span>
          <input
            name="seoTitle"
            defaultValue={initialBlog?.seoTitle}
            className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-[#0F172A]">Keywords</span>
          <input
            name="keywords"
            defaultValue={initialBlog?.keywords.join(", ")}
            placeholder="MBBS, NEET, Admission"
            className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-bold text-[#0F172A]">Meta description</span>
        <textarea
          name="metaDescription"
          defaultValue={initialBlog?.metaDescription}
          rows={2}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
        />
      </label>

      {/* Editorial Media System */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-bold text-[#0F172A]">Editorial Images</h3>
        <ImageUploader images={images} onImagesChange={setImages} />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          {[
            { label: "Heading", icon: Heading2, snippet: "\n## Heading\n" },
            { label: "Bold", icon: Type, snippet: "**Bold text**" },
            { label: "Italic", icon: Italic, snippet: "_Italic text_" },
            { label: "List", icon: List, snippet: "\n- List item\n- List item\n" },
            { label: "Image", icon: ImageIcon, snippet: "\n![Image alt](/blog/mbbs-india.svg)\n" },
            { label: "Link", icon: LinkIcon, snippet: "[Link text](https://example.com)" },
            { label: "Table", icon: Table2, snippet: "\n| Column | Value |\n| --- | --- |\n| Item | Detail |\n" },
          ].map((tool) => (
            <button
              key={tool.label}
              type="button"
              onClick={() => insertSnippet(tool.snippet)}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 px-3 text-xs font-bold text-slate-700 transition hover:border-[#0F4CFF]/30 hover:text-[#0F4CFF]"
            >
              <tool.icon size={14} /> {tool.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPreview((current) => !current)}
            className="ml-auto inline-flex h-9 items-center gap-2 rounded-full bg-[#0F4CFF] px-3 text-xs font-bold text-white"
          >
            <Eye size={14} /> Preview
          </button>
        </div>

        <textarea
          ref={textareaRef}
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
          rows={14}
          placeholder="Write blog content with headings, lists, images, links and tables..."
          className="mt-4 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#0F4CFF] focus:bg-white"
        />

        <div className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-600">
          <FileText size={16} /> Estimated read time: {estimatedReadTime}
        </div>
      </div>

      {preview && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-5 text-xl font-bold text-[#0F172A]">Preview</h2>
          <BlogContent content={content || "## Preview\nStart writing to preview content."} />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          name="status"
          value="draft"
          className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-[#0F172A] transition hover:border-[#0F4CFF]/30"
        >
          Save draft
        </button>
        <button
          name="status"
          value="pending"
          className="rounded-full border border-[#16A34A]/30 bg-[#16A34A]/10 px-6 py-3 text-sm font-bold text-[#16A34A] transition hover:bg-[#16A34A] hover:text-white"
        >
          Submit for approval
        </button>
        {canPublish && (
          <button
            name="status"
            value="published"
            disabled={pending}
            className="rounded-full bg-[#0F4CFF] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(15,76,255,0.22)] transition hover:bg-[#0b3fd6]"
          >
            Publish
          </button>
        )}
      </div>

      {state.message && (
        <p
          className={`rounded-xl px-4 py-3 text-sm font-bold ${
            state.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
