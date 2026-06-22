"use client";

import { Download, Loader2, LockKeyhole, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { NeetAnswerKeyDownloadResource } from "../../data/neetAnswerKeyDownloads";

const RETURN_PATH = "/neet/answer-key#downloads";

export default function ProtectedNeetDownloadButton({
  resource,
  fileName,
  label = "Download PDF",
}: {
  resource: NeetAnswerKeyDownloadResource;
  fileName: string;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [accountRequired, setAccountRequired] = useState(false);
  const [message, setMessage] = useState("");

  async function downloadPdf() {
    setBusy(true);
    setMessage("");
    setAccountRequired(false);

    try {
      const response = await fetch(
        `/api/neet-answer-key-download?resource=${encodeURIComponent(resource)}`,
        {
          credentials: "same-origin",
          cache: "no-store",
        }
      );

      if (response.status === 401) {
        setAccountRequired(true);
        setMessage(
          "Create a verified free student profile or log in to download this PDF."
        );
        return;
      }

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(data?.message || "Unable to download the PDF.");
      }

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to download the PDF."
      );
    } finally {
      setBusy(false);
    }
  }

  const next = encodeURIComponent(RETURN_PATH);

  return (
    <div className="sm:min-w-[220px]">
      <button
        type="button"
        onClick={downloadPdf}
        disabled={busy}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(105deg,#0B4AA2,#07377E)] px-5 text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(11,74,162,.22)] disabled:cursor-wait disabled:opacity-70"
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {busy ? "Checking access..." : label}
      </button>

      {message ? (
        <div
          className={`mt-2 rounded-xl border px-3 py-2 text-xs font-semibold leading-5 ${
            accountRequired
              ? "border-[#BFD7F4] bg-[#F4F9FF] text-[#31577F]"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
          role="status"
        >
          <p className="flex items-start gap-2">
            <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {message}
          </p>
          {accountRequired ? (
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                href={`/portal/signup?next=${next}`}
                className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#08A776] px-2 py-2 font-black text-white"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Sign Up
              </Link>
              <Link
                href={`/portal/login?tab=student&next=${next}`}
                className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#AFC9E5] bg-white px-2 py-2 font-black text-[#0B4AA2]"
              >
                <LogIn className="h-3.5 w-3.5" />
                Student Login
              </Link>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="mt-2 text-center text-[10px] font-bold text-[#60738F]">
          Verified student profile required
        </p>
      )}
    </div>
  );
}
