"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { BellRing, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

type AnnouncementItem = {
  id: string;
  title: string;
  href: string;
  tickerText?: string | null;
};

const MARQUEE_DURATION_SECONDS = 52;

const fallbackAnnouncements: AnnouncementItem[] = [
  {
    id: "fallback-latest-mbbs",
    title: "Latest MBBS Updates",
    href: "/blogs",
  },
  {
    id: "fallback-neet-alerts",
    title: "NEET & MBBS Alerts",
    href: "/blogs",
  },
  {
    id: "fallback-admission-news",
    title: "Admission News Live",
    href: "/blogs",
  },
];

function getFirstWords(value: string, count = 4) {
  return value.trim().split(/\s+/).filter(Boolean).slice(0, count).join(" ");
}

function getTickerLabel(item: AnnouncementItem) {
  const tickerText = item.tickerText?.trim();

  return tickerText || getFirstWords(item.title);
}

function TickerItems({
  items,
  prefix,
  decorative = false,
}: {
  items: AnnouncementItem[];
  prefix: string;
  decorative?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-4 px-3 py-1.5 text-sm font-semibold text-white/95 md:text-base lg:text-[13px]"
      aria-hidden={decorative ? "true" : undefined}
    >
      <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#00F0A8]/35 bg-[linear-gradient(135deg,rgba(0,240,168,0.24),rgba(15,76,255,0.18))] shadow-[0_0_18px_rgba(0,240,168,0.28)]">
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-[#081B35] bg-[#FFD166]" />
        <BellRing size={14} className="text-[#BFFFF0]" aria-hidden="true" />
      </div>

      <div className="flex items-center gap-4">
        {items.map((item, index) => (
          <span key={`${prefix}-${item.id}-${index}`} className="flex items-center gap-4">
            <Link
              href={item.href}
              prefetch={item.href.startsWith("/") ? undefined : false}
              className="shrink-0 transition-colors duration-300 hover:text-[#00C896]"
            >
              {getTickerLabel(item)}
            </Link>
            {index < items.length - 1 && (
              <span className="shrink-0 text-white/50">&bull;</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AnnouncementTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [items, setItems] = useState<AnnouncementItem[]>(fallbackAnnouncements);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let active = true;

    async function loadTickerBlogs() {
      try {
        const response = await fetch("/api/blog/ticker", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as {
          items?: AnnouncementItem[];
        };

        if (active && Array.isArray(data.items) && data.items.length > 0) {
          setItems(
            data.items.map((item) => ({
              ...item,
              tickerText: item.tickerText?.trim() || null,
              href: item.href || `/blogs/${item.id}`,
            }))
          );
        }
      } catch {
        // Keep the safe fallback announcements if live ticker data is unavailable.
      }
    }

    loadTickerBlogs();

    return () => {
      active = false;
    };
  }, []);

  const semanticItems = useMemo(() => {
    const unique = new Map<string, AnnouncementItem>();

    for (const item of items) {
      if (!unique.has(item.id)) {
        unique.set(item.id, item);
      }
    }

    return Array.from(unique.values());
  }, [items]);
  const marqueeItems = semanticItems;

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  function pauseThenResume() {
    setIsPaused(true);

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2800);
  }

  function scrollTicker(direction: -1 | 1) {
    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    pauseThenResume();
    container.scrollBy({
      left: direction * Math.min(320, container.clientWidth * 0.72),
      behavior: "smooth",
    });
  }

  return (
    <nav
      className="w-full border-b border-white/10 bg-[linear-gradient(90deg,#061733_0%,#081B35_46%,#06284A_100%)] shadow-[0_8px_24px_rgba(2,11,32,0.18)]"
      aria-label="Announcement ticker"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .ticker-content {
          animation: ticker-scroll ${MARQUEE_DURATION_SECONDS}s linear infinite;
          animation-play-state: ${isPaused ? "paused" : "running"};
        }

        .ticker-content:hover {
          animation-play-state: paused;
        }

        .ticker-scrollbar {
          scrollbar-width: none;
        }

        .ticker-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="flex min-w-0 items-center overflow-hidden">
        <button
          type="button"
          aria-label="Scroll announcements left"
          onClick={() => scrollTicker(-1)}
          className="group flex h-8 w-8 shrink-0 items-center justify-center border-r border-white/10 bg-white/5 text-white/75 transition hover:bg-white/12 hover:text-[#00F0A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0A8]"
        >
          <ChevronLeft size={16} className="transition group-hover:-translate-x-0.5" />
        </button>

        <div
          ref={scrollContainerRef}
          className="ticker-scrollbar relative h-10 min-w-0 flex-1 overflow-hidden"
          onTouchStart={pauseThenResume}
          onWheel={pauseThenResume}
        >
          <div className="ticker-content absolute left-0 top-0 flex w-max whitespace-nowrap">
            <TickerItems items={marqueeItems} prefix="visible" />
          </div>
        </div>

        <button
          type="button"
          aria-label="Scroll announcements right"
          onClick={() => scrollTicker(1)}
          className="group flex h-8 w-8 shrink-0 items-center justify-center border-l border-white/10 bg-white/5 text-white/75 transition hover:bg-white/12 hover:text-[#00F0A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0A8]"
        >
          <ChevronRight size={16} className="transition group-hover:translate-x-0.5" />
        </button>

        <div className="hidden h-8 items-center gap-1 border-l border-white/10 bg-white/[0.04] px-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#BFFFF0] md:flex">
          <Sparkles size={12} aria-hidden="true" />
          Live
        </div>
      </div>
    </nav>
  );
}
