"use client";

import { useActionState } from "react";

import { resetPasswordAction } from "../lib/blog/actions";

const initialState = {
  ok: false,
  message: "",
};

export default function ResetPasswordPage() {
  const [state, formAction, pending] =
    useActionState(
      resetPasswordAction,
      initialState
    );

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_54px_rgba(15,23,42,0.08)]">
        <h1 className="text-3xl font-bold text-[#0F172A]">
          Reset Password
        </h1>

        <form
          action={formAction}
          className="mt-6 space-y-4"
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4"
          />

          <input
            name="otp"
            type="text"
            placeholder="OTP"
            required
            className="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4"
          />

          <input
            name="password"
            type="password"
            placeholder="New Password"
            required
            className="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4"
          />

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
            className="h-12 w-full rounded-full bg-[#0F4CFF] text-sm font-bold text-white"
          >
            {pending
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>
      </div>
    </main>
  );
}