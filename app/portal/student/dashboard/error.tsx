"use client";

import { AlertTriangle, MessageCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function StudentDashboardError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[StudentDashboardError]", error);
  }, [error]);

  return (
    <section className="mx-auto max-w-xl rounded-2xl border border-[#F0C9CE] bg-white p-6 text-center shadow-[0_12px_35px_rgba(8,42,98,.08)] sm:p-8">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0F1] text-[#D83A4B]">
        <AlertTriangle className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-2xl font-black text-[#0A1020]">Dashboard could not load</h1>
      <p className="mt-2 text-sm font-medium leading-6 text-[#59667D]">
        Please refresh or login again. Your private student data has not been exposed.
      </p>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0F4CFF] px-4 text-sm font-black text-white"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Dashboard
        </button>
        <Link
          href="/portal/login?tab=student"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#CBD6E4] bg-white px-4 text-sm font-black text-[#0F4CFF]"
        >
          Login Again
        </Link>
      </div>
      <a
        href="https://wa.me/919563910223?text=My%20student%20dashboard%20could%20not%20load."
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 text-sm font-black text-[#079447]"
      >
        <MessageCircle className="h-4 w-4" />
        Contact WhatsApp Support
      </a>
    </section>
  );
}
