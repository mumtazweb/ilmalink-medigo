"use client";

import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Check,
  CircleUserRound,
  GraduationCap,
  Loader2,
  LockKeyhole,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { PORTAL_AUDIENCE_TYPES } from "../../lib/portal/constants";
import PortalAuthMessage from "./PortalAuthMessage";

const serviceMessage = "Personalised NEET and medical admission guidance, clearly explained.";

type SignupResponse = {
  ok?: boolean;
  message?: string;
  code?: string;
  redirectTo?: string;
};

export default function PortalSignupForm({
  nextPath = "",
}: {
  nextPath?: string;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [audienceType, setAudienceType] = useState("");
  const [otherAudience, setOtherAudience] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const firstName = useMemo(
    () => name.trim().split(/\s+/)[0] || "your first name",
    [name]
  );
  const formReady =
    name.trim().length >= 2 &&
    mobile.length === 10 &&
    Boolean(audienceType) &&
    (audienceType !== "Other" || otherAudience.trim().length >= 2);

  async function submitSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formReady || busy) return;

    setBusy(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetch("/api/portal/auth/signup/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          audienceType,
          otherAudience,
        }),
      });
      const responseText = await response.text();
      let data: SignupResponse = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        throw new Error(
          "The signup service returned an unexpected response. Please try again."
        );
      }

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Unable to create your profile.");
      }

      setSuccess(true);
      setMessage(
        `Profile created. Login ID: ${mobile} · Password: ${firstName}`
      );
      window.setTimeout(() => {
        router.push(
          nextPath || data.redirectTo || "/portal/student/dashboard"
        );
        router.refresh();
      }, 1200);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to create your profile."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="portal-signup-stage">
      <div className="portal-signup-orb portal-signup-orb-one" />
      <div className="portal-signup-orb portal-signup-orb-two" />
      <div className="portal-signup-grid" />

      <section className="portal-signup-shell">
        <div className="portal-signup-benefits">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[.16em] text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[#7FFFE1]" />
              One profile. Smarter guidance.
            </div>

            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[.98] tracking-[-.055em] text-white sm:text-5xl lg:text-6xl">
              Your education journey,
              <span className="portal-signup-shimmer block">
                brilliantly connected.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm font-semibold leading-7 text-[#D6E8FF] sm:text-base">
              Join ILMALINK MEDIGO for practical, student-first support across
              NEET, counselling, medical admissions, scholarships and important
              education updates.
            </p>

            <ServiceSummary />

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Benefit
                icon={BookOpenCheck}
                title="Clear pathways"
                text="Understand options without confusing jargon."
              />
              <Benefit
                icon={ShieldCheck}
                title="Student-first safety"
                text="Verified guidance with no seat-selling promises."
              />
              <Benefit
                icon={GraduationCap}
                title="Personal support"
                text="Guidance shaped around your education goal."
              />
              <Benefit
                icon={BadgeCheck}
                title="Free profile"
                text="Get started in less than one minute."
              />
            </div>
          </div>

          <div className="portal-signup-depth-card portal-signup-depth-card-one">
            NEET
          </div>
          <div className="portal-signup-depth-card portal-signup-depth-card-two">
            MBBS
          </div>
        </div>

        <div className="portal-signup-form-panel">
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[.16em] text-[#078A78]">
                  Free registration
                </p>
                <h2 className="mt-1 text-3xl font-black tracking-[-.04em] text-[#082A62] sm:text-4xl">
                  Create your profile
                </h2>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#E3F5FF,#D9FFF4)] text-[#087D78] shadow-[0_12px_28px_rgba(8,125,120,.18)]">
                <CircleUserRound className="h-6 w-6" />
              </span>
            </div>

            <p className="mt-3 text-sm font-semibold leading-6 text-[#60738F]">
              Only three details are needed. Every field is compulsory.
            </p>

            <form onSubmit={submitSignup} className="mt-6 space-y-4">
              <PremiumField
                icon={UserRound}
                label="Your name"
                hint="Your first name becomes your initial password"
              >
                <input
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value.slice(0, 120));
                    setMessage("");
                  }}
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className="portal-signup-input"
                />
              </PremiumField>

              <PremiumField
                icon={Phone}
                label="Mobile number"
                hint="This will be your login ID"
              >
                <div className="flex">
                  <span className="portal-signup-prefix">+91</span>
                  <input
                    value={mobile}
                    onChange={(event) => {
                      setMobile(
                        event.target.value.replace(/\D/g, "").slice(0, 10)
                      );
                      setMessage("");
                    }}
                    required
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    className="portal-signup-input rounded-l-none"
                  />
                </div>
              </PremiumField>

              <PremiumField
                icon={GraduationCap}
                label="You are a"
                hint="Choose the option that describes you"
              >
                <select
                  value={audienceType}
                  onChange={(event) => {
                    setAudienceType(event.target.value);
                    if (event.target.value !== "Other") setOtherAudience("");
                    setMessage("");
                  }}
                  required
                  className="portal-signup-input appearance-none"
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {PORTAL_AUDIENCE_TYPES.map((audience) => (
                    <option key={audience} value={audience}>
                      {audience}
                    </option>
                  ))}
                </select>
              </PremiumField>

              {audienceType === "Other" ? (
                <label className="block">
                  <span className="mb-2 block text-xs font-black text-[#17396E]">
                    Please describe yourself
                  </span>
                  <input
                    value={otherAudience}
                    onChange={(event) => {
                      setOtherAudience(event.target.value.slice(0, 40));
                      setMessage("");
                    }}
                    required
                    autoFocus
                    placeholder="Type here"
                    className="portal-signup-input"
                  />
                </label>
              ) : null}

              <div className="rounded-2xl border border-[#CFE2F4] bg-[linear-gradient(135deg,#F4F9FF,#ECFFFA)] p-4 shadow-[inset_0_1px_0_white]">
                <div className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0B63CE] shadow-sm">
                    <LockKeyhole className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[.08em] text-[#0B4AA2]">
                      Your login details
                    </p>
                    <p className="mt-1 text-sm font-bold leading-6 text-[#31577F]">
                      Login ID:{" "}
                      <strong className="text-[#082A62]">
                        {mobile || "your mobile number"}
                      </strong>
                      <br />
                      Initial password:{" "}
                      <strong className="text-[#082A62]">{firstName}</strong>
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-[#6D829A]">
                      Password is case-sensitive. You can reset it later for
                      better security.
                    </p>
                  </div>
                </div>
              </div>

              <PortalAuthMessage message={message} success={success} />

              <button
                type="submit"
                disabled={!formReady || busy || success}
                className="portal-signup-submit"
              >
                {busy ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : success ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Sparkles className="h-5 w-5" />
                )}
                {success ? "Profile Created" : "Create My Free Profile"}
                {!busy && !success ? <ArrowRight className="h-5 w-5" /> : null}
              </button>
            </form>

            <p className="mt-5 text-center text-sm font-semibold text-[#60738F]">
              Already registered?{" "}
              <Link
                href={
                  nextPath
                    ? `/portal/login?tab=student&next=${encodeURIComponent(nextPath)}`
                    : "/portal/login?tab=student"
                }
                className="font-black text-[#0B4AA2] hover:text-[#008F7C]"
              >
                Student Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceSummary() {
  return (
    <div className="mt-6 flex min-h-20 items-center gap-3 rounded-2xl border border-white/20 bg-[#041D49]/40 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-xl">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#37E2BA]/15 text-[#76FFDC]">
        <Sparkles className="h-5 w-5" />
      </span>
      <p className="text-sm font-black leading-6 text-white sm:text-base">
        {serviceMessage}
      </p>
    </div>
  );
}

function Benefit({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof ShieldCheck;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[.08] p-3.5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/[.12]">
      <Icon className="h-5 w-5 text-[#73FFDC]" />
      <strong className="mt-2 block text-sm text-white">{title}</strong>
      <span className="mt-1 block text-xs font-semibold leading-5 text-[#C7DDF6]">
        {text}
      </span>
    </div>
  );
}

function PremiumField({
  icon: Icon,
  label,
  hint,
  children,
}: {
  icon: typeof UserRound;
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-xs font-black text-[#17396E]">
          <Icon className="h-4 w-4 text-[#078A78]" />
          {label} <span className="text-[#DB3D4B]">*</span>
        </span>
        <span className="text-[10px] font-bold text-[#7890A8]">{hint}</span>
      </span>
      {children}
    </label>
  );
}
