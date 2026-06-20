"use client";

import { useEffect, useMemo, useState } from "react";

const followLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ilmalinkeduprise/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ilmalinkmbbs/",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ilmaLinkFoundation",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@ilmalinkmbbs",
  },
  {
    label: "X",
    href: "https://x.com/middyaofficial",
  },
  {
    label: "Telegram",
    href: "https://t.me/+919563910223",
  },
];

export default function BlogShareFollow({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
  const timer = window.setTimeout(() => {
    setPageUrl(window.location.href);
  }, 0);

  return () => window.clearTimeout(timer);
}, []);

  const shareText = useMemo(() => {
    return description ? `${title} - ${description}` : title;
  }, [title, description]);

  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedText = encodeURIComponent(shareText);

  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      label: "Threads",
      href: `https://www.threads.net/intent/post?text=${encodedText}&url=${encodedUrl}`,
    },
  ];

  async function copyBlogLink() {
    if (!pageUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
          Share this blog
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {shareLinks.map((item) => (
            <a
              key={item.label}
              href={pageUrl ? item.href : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-extrabold text-red-600 underline decoration-red-400 decoration-2 underline-offset-4 transition hover:border-red-200 hover:bg-red-600 hover:text-white hover:decoration-white"
            >
              Share on {item.label}
            </a>
          ))}

          <button
            type="button"
            onClick={copyBlogLink}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-extrabold text-slate-700 underline decoration-slate-400 decoration-2 underline-offset-4 transition hover:bg-slate-900 hover:text-white hover:decoration-white"
          >
            {copied ? "Copied" : "Copy Link"}
          </button>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
          Follow ILMALINK
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {followLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#0F4CFF]/10 bg-[#EFF6FF] px-4 py-2 text-sm font-extrabold text-[#0F4CFF] underline decoration-[#0F4CFF]/50 decoration-2 underline-offset-4 transition hover:border-[#0F4CFF]/30 hover:bg-[#0F4CFF] hover:text-white hover:decoration-white"
            >
              Follow on {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}