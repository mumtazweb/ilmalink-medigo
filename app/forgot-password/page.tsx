"use client";

import { useActionState } from "react";

import { forgotPasswordAction } from "../lib/blog/actions";

const initialState = {
  ok: false,
  message: "",
};

export default function ForgotPasswordPage() {
  const [state, formAction, pending] =
    useActionState(
      forgotPasswordAction,
      initialState
    );

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_54px_rgba(15,23,42,0.08)]">
        <h1 className="text-3xl font-bold text-[#0F172A]">
          Forgot Password
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Enter your email to receive OTP.
        </p>

        <form
          action={formAction}
          className="mt-6 space-y-4"
        >
          <label className="block">
            <span className="text-sm font-bold text-[#0F172A]">
              Email
            </span>

            <input
              name="email"
              type="email"
              required
              className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm outline-none transition focus:border-[#0F4CFF] focus:bg-white"
            />
          </label>

          {state.message && (
            <p
              className={`rounded-xl px-4 py-3 text-sm font-medium ${
                state.ok
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="h-12 w-full rounded-full bg-[#0F4CFF] px-5 text-sm font-bold text-white shadow-[0_14px_28px_rgba(15,76,255,0.22)] transition hover:bg-[#0b3fd6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending
              ? "Sending OTP..."
              : "Send OTP"}
          </button>
        </form>
      </div>
    </main>
  );
}