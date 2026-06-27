"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Loader2,
  LockKeyhole,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import PortalAuthMessage from "./PortalAuthMessage";

export default function PortalLoginForm({
  initialTab = "student",
  nextPath = "",
}: {
  initialTab?: "student" | "staff";
  nextPath?: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState(initialTab);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function login() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/portal/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: tab, identifier, password }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        redirectTo?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Unable to log in.");
      }
      router.push(
        tab === "student" && nextPath
          ? nextPath
          : data.redirectTo ?? "/portal/student/dashboard"
      );
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to log in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 rounded-xl bg-[#EEF3F8] p-1">
        <TabButton
          active={tab === "student"}
          onClick={() => {
            setTab("student");
            setIdentifier("");
            setMessage("");
          }}
          icon={GraduationCap}
          label="Student Login"
        />
        <TabButton
          active={tab === "staff"}
          onClick={() => {
            setTab("staff");
            setIdentifier("");
            setMessage("");
          }}
          icon={BriefcaseBusiness}
          label="Staff Login"
        />
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-black text-[#082A62]">
          {tab === "student"
            ? "Login with Mobile/Email and Password"
            : "Admin / Counsellor / Management Login"}
        </h2>
        <p className="mt-1 text-sm font-medium leading-6 text-[#60738F]">
          {tab === "student"
            ? "For newly created profiles, use your mobile number and your first name as the initial password."
            : "Education Portal access must be enabled separately on your existing staff account."}
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-black text-[#17396E]">
            {tab === "student" ? "Mobile number or email" : "Staff email"}
          </span>
          <input
            type={tab === "staff" ? "email" : "text"}
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            autoComplete={tab === "staff" ? "email" : "username"}
            className="portal-input"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-black text-[#17396E]">
            Password
          </span>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7C91AA]" />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="portal-input pl-10"
            />
          </div>
        </label>

        <PortalAuthMessage message={message} />

        <button
          type="button"
          onClick={login}
          disabled={busy || !identifier.trim() || !password}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(105deg,#0B4AA2,#087F9F)] px-5 text-sm font-black text-white shadow-[0_10px_22px_rgba(11,74,162,.22)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {tab === "student"
            ? "Login to Student Dashboard"
            : "Login to Staff Dashboard"}
          {!busy ? <ArrowRight className="h-4 w-4" /> : null}
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-2 text-center text-sm font-semibold">
        {tab === "student" ? (
          <>
            <Link
              href="/portal/forgot-password"
              className="text-[#0B4AA2] hover:text-[#009C95]"
            >
              Forgot Password?
            </Link>
            <p className="text-[#60738F]">
              New student?{" "}
              <Link
                href={
                  nextPath
                    ? `/portal/signup?next=${encodeURIComponent(nextPath)}`
                    : "/portal/signup"
                }
                className="font-black text-[#0B4AA2]"
              >
                Create free profile
              </Link>
            </p>
          </>
        ) : (
          <p className="text-xs leading-5 text-[#60738F]">
            Staff access is limited to approved education portal accounts.
          </p>
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof GraduationCap;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg text-xs font-black transition sm:text-sm ${
        active
          ? "bg-white text-[#0B4AA2] shadow-sm"
          : "text-[#60738F]"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
