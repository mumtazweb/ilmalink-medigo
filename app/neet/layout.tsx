import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export default function NeetLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav
        aria-label="NEET page return links"
        className="border-b border-[#D8E6F3] bg-[linear-gradient(90deg,#F8FBFF,#EEF7FF_55%,#EBFAF7)] px-3 py-2"
      >
        <div className="mx-auto flex max-w-[1180px] items-center gap-2 sm:px-3">
          <Link
            href="/"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#C7DAEC] bg-white px-3 text-[11px] font-extrabold text-[#17396E] shadow-sm transition hover:border-[#1769E8] hover:text-[#1769E8] sm:text-xs"
          >
            <Home className="h-3.5 w-3.5" />
            Return Home
          </Link>
          <Link
            href="/neet"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#BDE4DE] bg-white px-3 text-[11px] font-extrabold text-[#087F78] shadow-sm transition hover:border-[#009C95] hover:text-[#006E69] sm:text-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            NEET Hub
          </Link>
        </div>
      </nav>
      {children}
    </>
  );
}
