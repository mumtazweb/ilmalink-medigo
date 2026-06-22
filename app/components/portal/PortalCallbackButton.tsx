"use client";

import { Loader2, PhoneCall } from "lucide-react";
import { useState } from "react";

export default function PortalCallbackButton({ compact = false }: { compact?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function requestCallback() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/portal/student/callback", {
        method: "POST",
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Unable to request callback.");
      }
      setMessage(data.message ?? "Callback requested.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to request callback."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={requestCallback}
        disabled={busy}
        className={`inline-flex items-center justify-center gap-2 bg-[linear-gradient(105deg,#0B4AA2,#087F9F)] font-black text-white shadow-[0_8px_18px_rgba(11,74,162,.18)] ${
          compact
            ? "min-h-10 w-full rounded-lg px-3 text-xs"
            : "h-11 rounded-xl px-5 text-sm"
        }`}
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <PhoneCall className="h-4 w-4" />
        )}
        {compact ? "Request Call" : "Request Callback"}
      </button>
      {message ? (
        <p className="mt-2 text-xs font-semibold text-[#087B59]">{message}</p>
      ) : null}
    </div>
  );
}
