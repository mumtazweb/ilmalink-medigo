"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, BarChart3, FileCheck2, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ilmalink_neet_popup_closed";

const hiddenRoutePrefixes = [
  "/portal/login",
  "/portal/signup",
  "/portal/student",
  "/portal/admin",
  "/portal/counsellor",
  "/portal/management",
];

function shouldHideForPath(pathname: string | null) {
  if (!pathname) return true;

  if (pathname === "/neet" || pathname === "/neet/") return true;

  return hiddenRoutePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function isPopupClosedForSession() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function NeetFloatingPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const hiddenForPath = shouldHideForPath(pathname);

  useEffect(() => {
    if (hiddenForPath || isPopupClosedForSession()) return undefined;

    const timeoutId = window.setTimeout(() => {
      setVisible(true);
    }, 180);

    return () => window.clearTimeout(timeoutId);
  }, [hiddenForPath]);

  if (!visible || hiddenForPath) return null;

  const closePopup = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Session storage can be unavailable in strict privacy contexts.
    }

    setVisible(false);
  };

  return (
    <aside
      aria-label="NEET 2026 updates"
      className="fixed left-1/2 top-1/2 z-[9000] w-[calc(100vw-24px)] max-w-[420px] -translate-x-1/2 -translate-y-1/2 sm:w-[420px]"
    >
      <div className="neet-floating-popup group relative rounded-[24px] bg-[linear-gradient(135deg,rgba(255,255,255,.94),rgba(235,249,255,.86)_48%,rgba(224,255,248,.82))] p-[1px] shadow-[0_20px_58px_rgba(5,35,82,.22),0_0_34px_rgba(0,200,150,.18)] ring-1 ring-white/70 backdrop-blur-xl">
        <div className="pointer-events-none absolute -inset-1 rounded-[26px] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(0,200,150,.0),rgba(0,200,150,.32),rgba(245,158,11,.26),rgba(23,105,232,.3),rgba(0,200,150,.0))] opacity-60 blur-xl" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
          <span className="neet-floating-popup__shine absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/55 blur-md" />
        </div>

        <Link
          href="/neet/"
          className="relative block overflow-hidden rounded-[23px] border border-white/75 bg-white/76 px-4 py-3 pr-12 text-[#082A62] shadow-[inset_0_1px_0_rgba(255,255,255,.95),inset_0_-18px_38px_rgba(23,105,232,.04)] transition hover:border-cyan-200 hover:bg-white/90 sm:px-5 sm:py-4 sm:pr-14"
        >
          <div className="absolute right-4 top-4 hidden h-16 w-16 rounded-full bg-cyan-300/16 blur-2xl sm:block" />
          <div className="relative flex items-center gap-2">
            <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-amber-200 bg-[linear-gradient(135deg,#FFF7D6,#FFE8A3)] px-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#8A5200] shadow-[0_7px_16px_rgba(245,158,11,.16),inset_0_1px_0_rgba(255,255,255,.9)]">
              <Sparkles className="h-3.5 w-3.5" />
              NEET 2026 LIVE
            </span>
            <span className="hidden items-center gap-1 rounded-full bg-[#E8F8F5] px-2.5 py-1 text-[10px] font-extrabold text-[#04756D] sm:inline-flex">
              <FileCheck2 className="h-3.5 w-3.5" />
              Answer keys
            </span>
          </div>

          <h2 className="relative mt-2 text-[14px] font-black leading-[1.25] tracking-[0] text-[#082A62] sm:text-lg">
            If you appeared in NEET-2026 or you are a NEET aspirant, visit this
            page
          </h2>
          <p className="relative mt-1.5 line-clamp-2 text-[11px] font-semibold leading-[1.45] text-[#31486F] sm:line-clamp-none sm:text-sm sm:leading-5">
            Check RE-NEET 2026 answer keys, paper analysis, expected cut-off,
            rank guidance, counselling updates and next-step admission support
            in one place.
          </p>

          <div className="relative mt-2.5 flex items-center justify-end gap-3">
            <span className="hidden items-center gap-1.5 rounded-full bg-[#EEF5FF] px-2.5 py-1 text-[10px] font-extrabold text-[#0B4AA2] sm:inline-flex">
              <BarChart3 className="h-3.5 w-3.5" />
              Rank predictor
            </span>

            <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#0B4AA2] sm:text-sm">
              Open NEET Updates
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0B4AA2,#009C95)] text-white shadow-[0_8px_16px_rgba(11,74,162,.26)]">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </span>
          </div>
        </Link>

        <button
          type="button"
          aria-label="Close NEET 2026 updates popup"
          onClick={closePopup}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/92 text-[#12345F] shadow-[0_8px_18px_rgba(8,42,98,.14)] transition hover:bg-[#082A62] hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200/70"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <style jsx>{`
        .neet-floating-popup {
          animation: neet-popup-enter 520ms cubic-bezier(0.2, 0.85, 0.2, 1)
              both,
            neet-popup-float 5.8s ease-in-out 900ms infinite;
          transform-style: preserve-3d;
        }

        .neet-floating-popup:hover {
          transform: perspective(900px) translateY(-3px) rotateX(1deg)
            rotateY(-1deg);
        }

        .neet-floating-popup__shine {
          animation: neet-popup-shine 4.4s ease-in-out 1s infinite;
        }

        @keyframes neet-popup-enter {
          from {
            opacity: 0;
            transform: perspective(900px) translateY(28px) rotateX(8deg)
              scale(0.96);
            filter: blur(8px) saturate(0.85);
          }
          to {
            opacity: 1;
            transform: perspective(900px) translateY(0) rotateX(0deg)
              scale(1);
            filter: blur(0) saturate(1);
          }
        }

        @keyframes neet-popup-float {
          0%,
          100% {
            transform: perspective(900px) translateY(0) rotateX(0deg);
          }
          50% {
            transform: perspective(900px) translateY(-4px) rotateX(0.6deg);
          }
        }

        @keyframes neet-popup-shine {
          0% {
            transform: translateX(-120%) skewX(-18deg);
            opacity: 0;
          }
          18% {
            opacity: 0.7;
          }
          52%,
          100% {
            transform: translateX(440%) skewX(-18deg);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .neet-floating-popup,
          .neet-floating-popup:hover,
          .neet-floating-popup__shine {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </aside>
  );
}
