"use client";

import { useSearchParams } from "next/navigation";

export default function BlogCommentSubmittedNotice() {
  const searchParams = useSearchParams();

  if (searchParams.get("comment") !== "submitted") {
    return null;
  }

  return (
    <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
      Comment submitted and added below.
    </p>
  );
}
