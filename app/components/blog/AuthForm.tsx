"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { createAccountAction, signInAction, forgotPasswordAction, resetPasswordAction } from "@/app/lib/blog/actions";

const initialState = {
  ok: false,
  message: "",
};

type ResetStep = "emailEntry" | "otpEntry" | "passwordEntry" | "success";

// BLOG SYSTEM: Shared login/create-account form for blog authors and admins.
// Now includes inline forgot password flow with multi-step OTP verification.
export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const action = mode === "login" ? signInAction : createAccountAction;
  const [state, formAction, pending] = useActionState(action, initialState);

  // Forgot password state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState<ResetStep>("emailEntry");
  const [resetEmail, setResetEmail] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetPasswordConfirm, setResetPasswordConfirm] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMessage(null);

    try {
      const formData = new FormData();
      formData.set("email", resetEmail);

      const result = await forgotPasswordAction(initialState, formData);

      if (result.ok) {
        setResetMessage({ type: "success", text: "OTP sent to your email" });
        setResetStep("otpEntry");
      } else {
        setResetMessage({ type: "error", text: result.message });
      }
    } catch {
      setResetMessage({ type: "error", text: "Something went wrong" });
    } finally {
      setResetLoading(false);
    }
  };

  const handleSubmitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage(null);

    if (!resetOtp || resetOtp.length !== 6) {
      setResetMessage({ type: "error", text: "Please enter a valid 6-digit OTP" });
      return;
    }

    setResetStep("passwordEntry");
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMessage(null);

    try {
      if (resetPassword.length < 6) {
        setResetMessage({ type: "error", text: "Password must be at least 6 characters" });
        setResetLoading(false);
        return;
      }

      if (resetPassword !== resetPasswordConfirm) {
        setResetMessage({ type: "error", text: "Passwords do not match" });
        setResetLoading(false);
        return;
      }

      const formData = new FormData();
      formData.set("email", resetEmail);
      formData.set("otp", resetOtp);
      formData.set("password", resetPassword);

      const result = await resetPasswordAction(initialState, formData);

      if (result.ok) {
        setResetMessage({ type: "success", text: "Password reset successful!" });
        setResetStep("success");
        
        // Auto-reset after 2 seconds
        setTimeout(() => {
          setShowForgotPassword(false);
          setResetStep("emailEntry");
          setResetEmail("");
          setResetOtp("");
          setResetPassword("");
          setResetPasswordConfirm("");
          setResetMessage(null);
        }, 2000);
      } else {
        setResetMessage({ type: "error", text: result.message });
      }
    } catch {
      setResetMessage({ type: "error", text: "Something went wrong" });
    } finally {
      setResetLoading(false);
    }
  };

  // If forgot password flow is active, show it instead
  if (showForgotPassword) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#0F172A]">Reset Password</h2>
          <button
            type="button"
            onClick={() => {
              setShowForgotPassword(false);
              setResetStep("emailEntry");
              setResetEmail("");
              setResetOtp("");
              setResetPassword("");
              setResetPasswordConfirm("");
              setResetMessage(null);
            }}
            className="text-2xl text-slate-400 hover:text-slate-600 transition"
          >
            ×
          </button>
        </div>

        {/* Step 1: Email Entry */}
        {resetStep === "emailEntry" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <label className="block">
              <span className="text-sm font-bold text-[#0F172A]">Enter your email</span>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
                placeholder="your@email.com"
              />
            </label>

            {resetMessage && (
              <p className={`rounded-xl px-4 py-3 text-sm font-medium ${
                resetMessage.type === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}>
                {resetMessage.text}
              </p>
            )}

            <button
              type="submit"
              disabled={resetLoading}
              className="h-12 w-full rounded-full bg-[#0F4CFF] px-5 text-sm font-bold text-white shadow-[0_14px_28px_rgba(15,76,255,0.22)] transition hover:bg-[#0b3fd6] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resetLoading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2: OTP Entry */}
        {resetStep === "otpEntry" && (
          <form onSubmit={handleSubmitOtp} className="space-y-4">
            <div className="rounded-xl bg-blue-50 px-4 py-3">
              <p className="text-xs text-blue-700">
                ✓ OTP sent to {resetEmail}
              </p>
            </div>

            <label className="block">
              <span className="text-sm font-bold text-[#0F172A]">Enter OTP code</span>
              <input
                type="text"
                value={resetOtp}
                onChange={(e) => setResetOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                required
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-center text-lg font-bold letter-spacing tracking-wider outline-none transition focus:border-[#0F4CFF] focus:bg-white"
                placeholder="000000"
              />
              <p className="mt-2 text-xs text-slate-500">6-digit code from your email</p>
            </label>

            {resetMessage && (
              <p className={`rounded-xl px-4 py-3 text-sm font-medium ${
                resetMessage.type === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}>
                {resetMessage.text}
              </p>
            )}

            <button
              type="submit"
              disabled={resetLoading || resetOtp.length !== 6}
              className="h-12 w-full rounded-full bg-[#0F4CFF] px-5 text-sm font-bold text-white shadow-[0_14px_28px_rgba(15,76,255,0.22)] transition hover:bg-[#0b3fd6] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resetLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={() => {
                setResetStep("emailEntry");
                setResetOtp("");
                setResetMessage(null);
              }}
              className="text-center text-sm text-slate-600 hover:text-[#0F4CFF] transition w-full"
            >
              ← Back to email
            </button>
          </form>
        )}

        {/* Step 3: Password Entry */}
        {resetStep === "passwordEntry" && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="rounded-xl bg-blue-50 px-4 py-3">
              <p className="text-xs text-blue-700">
                ✓ OTP verified
              </p>
            </div>

            <label className="block">
              <span className="text-sm font-bold text-[#0F172A]">New password</span>
              <input
                type="password"
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                required
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
                placeholder="At least 6 characters"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-[#0F172A]">Confirm password</span>
              <input
                type="password"
                value={resetPasswordConfirm}
                onChange={(e) => setResetPasswordConfirm(e.target.value)}
                required
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
                placeholder="Confirm password"
              />
            </label>

            {resetMessage && (
              <p className={`rounded-xl px-4 py-3 text-sm font-medium ${
                resetMessage.type === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}>
                {resetMessage.text}
              </p>
            )}

            <button
              type="submit"
              disabled={resetLoading}
              className="h-12 w-full rounded-full bg-[#0F4CFF] px-5 text-sm font-bold text-white shadow-[0_14px_28px_rgba(15,76,255,0.22)] transition hover:bg-[#0b3fd6] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resetLoading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={() => {
                setResetStep("otpEntry");
                setResetPassword("");
                setResetPasswordConfirm("");
                setResetMessage(null);
              }}
              className="text-center text-sm text-slate-600 hover:text-[#0F4CFF] transition w-full"
            >
              ← Back to OTP
            </button>
          </form>
        )}

        {/* Step 4: Success */}
        {resetStep === "success" && (
          <div className="space-y-4 text-center">
            <div className="rounded-xl bg-green-50 px-4 py-3">
              <p className="text-sm font-bold text-green-700">✓ Password reset successful!</p>
            </div>
            <p className="text-sm text-slate-600">Redirecting to login...</p>
          </div>
        )}
      </div>
    );
  }

  // Normal login/signup form
  return (
    <form action={formAction} className="space-y-4">
      {mode === "signup" && (
        <label className="block">
          <span className="text-sm font-bold text-[#0F172A]">Name</span>
          <input
            name="name"
            required
            className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
          />
        </label>
      )}

      <label className="block">
        <span className="text-sm font-bold text-[#0F172A]">ID / Email</span>
        <input
          name="email"
          type="email"
          required
          className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
        />
      </label>

      <div className="space-y-2">
        <label className="block">
          <span className="text-sm font-bold text-[#0F172A]">Password</span>
          <input
            name="password"
            type="password"
            required
            className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
          />
        </label>

        {mode === "login" && (
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-right text-xs font-semibold text-[#0F4CFF] hover:text-[#0b3fd6] transition"
          >
            Forgot Password?
          </button>
        )}
      </div>

      {state.message && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-full bg-[#0F4CFF] px-5 text-sm font-bold text-white shadow-[0_14px_28px_rgba(15,76,255,0.22)] transition hover:bg-[#0b3fd6] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
      </button>

      <p className="text-center text-sm text-slate-600">
        {mode === "login" ? "Need an author account?" : "Already have an account?"}{" "}
        <Link
          href={mode === "login" ? "/create-account" : "/login"}
          className="font-bold text-[#0F4CFF]"
        >
          {mode === "login" ? "Create account" : "Sign in"}
        </Link>
      </p>
    </form>
  );
}
