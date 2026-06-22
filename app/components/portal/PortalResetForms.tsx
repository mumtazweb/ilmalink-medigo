"use client";

import { ArrowRight, Loader2, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import PortalAuthMessage from "./PortalAuthMessage";

export function PortalForgotPasswordForm() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function send() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/portal/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        resetMobile?: string;
        destination?: string;
        method?: string;
      };
      if (!response.ok || !data.ok || !data.resetMobile) {
        throw new Error(data.message || "Unable to send reset code.");
      }
      const query = new URLSearchParams({
        mobile: data.resetMobile,
        destination: data.destination ?? "",
        method: data.method ?? "",
      });
      router.push(`/portal/reset-password?${query.toString()}`);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to send reset code."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-xs font-black text-[#17396E]">
          Registered mobile number or email
        </span>
        <input
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          className="portal-input"
          autoComplete="username"
        />
      </label>
      <PortalAuthMessage message={message} />
      <button
        type="button"
        onClick={send}
        disabled={busy || !identifier.trim()}
        className="portal-primary-button"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Send 4-digit Reset Code
        {!busy ? <ArrowRight className="h-4 w-4" /> : null}
      </button>
    </div>
  );
}

export function PortalResetPasswordForm({
  mobile,
  destination,
  method,
}: {
  mobile: string;
  destination: string;
  method: string;
}) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!("OTPCredential" in window)) return;
    const controller = new AbortController();
    const credentials = navigator.credentials as CredentialsContainer & {
      get(options: {
        otp: { transport: string[] };
        signal: AbortSignal;
      }): Promise<{ code?: string } | null>;
    };
    credentials
      .get({
        otp: { transport: ["sms"] },
        signal: controller.signal,
      })
      .then((credential) => {
        const code = credential?.code?.replace(/\D/g, "").slice(0, 4);
        if (code) setOtp(code);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  async function reset() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/portal/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile,
          otp,
          password,
          confirmPassword,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        redirectTo?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Unable to reset password.");
      }
      setSuccess(true);
      setMessage(data.message ?? "Password reset successful.");
      window.setTimeout(() => {
        router.push(data.redirectTo ?? "/portal/login?tab=student");
      }, 900);
    } catch (error) {
      setSuccess(false);
      setMessage(
        error instanceof Error ? error.message : "Unable to reset password."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <p className="rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-semibold leading-5 text-[#31577F]">
        Code sent by {method || "SMS"} to {destination || "your registered contact"}.
      </p>
      <input
        value={otp}
        onChange={(event) =>
          setOtp(event.target.value.replace(/\D/g, "").slice(0, 4))
        }
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={4}
        placeholder="4-digit code"
        className="h-14 w-full rounded-xl border border-[#B9CEE5] text-center text-2xl font-black tracking-[.6em] text-[#0B4AA2]"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="new-password"
        placeholder="New password"
        className="portal-input"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        autoComplete="new-password"
        placeholder="Confirm new password"
        className="portal-input"
      />
      <PortalAuthMessage message={message} success={success} />
      <button
        type="button"
        onClick={reset}
        disabled={busy || otp.length !== 4 || !password || !confirmPassword}
        className="portal-primary-button"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Reset Password
        {!busy ? <RotateCw className="h-4 w-4" /> : null}
      </button>
    </div>
  );
}
