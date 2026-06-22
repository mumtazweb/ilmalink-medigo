"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Loader2,
  MessageCircle,
  Phone,
  Stethoscope,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { STUDENT_INTERESTS } from "../../lib/portal/constants";
import PortalAuthMessage from "./PortalAuthMessage";

type SignupState = {
  mobile: string;
  password: string;
  confirmPassword: string;
  whatsappAvailable: "same" | "different" | "none";
  whatsappNumber: string;
  interests: string[];
  name: string;
  email: string;
  className: string;
  neetYear: string;
  state: string;
  city: string;
  district: string;
  category: string;
  neetScore: string;
  neetRank: string;
  preferredCourse: string;
  preferredCountry: string;
};

const initialState: SignupState = {
  mobile: "",
  password: "",
  confirmPassword: "",
  whatsappAvailable: "same",
  whatsappNumber: "",
  interests: [],
  name: "",
  email: "",
  className: "",
  neetYear: "2026",
  state: "",
  city: "",
  district: "",
  category: "",
  neetScore: "",
  neetRank: "",
  preferredCourse: "MBBS",
  preferredCountry: "",
};

const stepNames = [
  "Mobile",
  "Password",
  "WhatsApp",
  "Interest",
  "Profile",
];

const interestIcons = {
  "NEET Coaching": GraduationCap,
  "MBBS India Counselling": Landmark,
  "MBBS Abroad Counselling": Stethoscope,
  "Scholarships / Education Support": HeartHandshake,
} as const;

export default function PortalSignupForm({
  nextPath = "",
}: {
  nextPath?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<SignupState>(initialState);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const progress = useMemo(() => `${(step / 5) * 100}%`, [step]);

  function update<K extends keyof SignupState>(
    key: K,
    value: SignupState[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    setMessage("");
    setSuccess(false);
  }

  async function post(url: string, payload: Record<string, unknown>) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as {
      ok?: boolean;
      message?: string;
      redirectTo?: string;
    };
    if (!response.ok || !data.ok) {
      throw new Error(data.message || "Unable to continue.");
    }
    return data;
  }

  function continueMobile() {
    if (form.mobile.length !== 10) {
      setMessage("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setStep(2);
    setMessage("");
  }

  function continuePassword() {
    if (form.password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }
    if (!/[A-Za-z]/.test(form.password) || !/\d/.test(form.password)) {
      setMessage("Password must include at least one letter and one number.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMessage("Password and confirm password do not match.");
      return;
    }
    setStep(3);
    setMessage("");
  }

  function continueWhatsapp() {
    if (
      form.whatsappAvailable === "different" &&
      form.whatsappNumber.replace(/\D/g, "").length < 10
    ) {
      setMessage("Enter a valid WhatsApp number.");
      return;
    }
    setStep(4);
    setMessage("");
  }

  function continueInterest() {
    if (!form.interests.length) {
      setMessage("Select at least one guidance interest.");
      return;
    }
    setStep(5);
    setMessage("");
  }

  async function completeSignup() {
    setBusy(true);
    setMessage("");
    try {
      const data = await post("/api/portal/auth/signup/complete", form);
      setSuccess(true);
      setMessage("Your student profile is ready.");
      router.push(
        nextPath || data.redirectTo || "/portal/student/dashboard"
      );
      router.refresh();
    } catch (error) {
      setSuccess(false);
      setMessage(
        error instanceof Error ? error.message : "Unable to create profile."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="mb-5">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[.12em] text-[#6A7F99]">
          <span>
            Step {step} of 5 · {stepNames[step - 1]}
          </span>
          <span>{Math.round((step / 5) * 100)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E6EEF6]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#1769E8,#00A88F)] transition-all"
            style={{ width: progress }}
          />
        </div>
      </div>

      {step === 1 ? (
        <Step title="Enter your mobile number" icon={Phone}>
          <Field label="Mobile number(Whatsapp preffered)">
            <div className="flex">
              <span className="flex h-12 items-center rounded-l-xl border border-r-0 border-[#CCD9E7] bg-[#F3F7FB] px-3 text-sm font-bold text-[#17396E]">
                +91
              </span>
              <input
                value={form.mobile}
                onChange={(event) =>
                  update(
                    "mobile",
                    event.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                placeholder="10-digit mobile number"
                className="h-12 w-full rounded-l-none rounded-r-xl border border-[#CCD9E7] px-3 text-sm font-semibold"
              />
            </div>
          </Field>
          <PrimaryButton
            onClick={continueMobile}
            disabled={form.mobile.length !== 10}
          >
            Continue
          </PrimaryButton>
        </Step>
      ) : null}

      {step === 2 ? (
        <Step title="Create your password" icon={CheckCircle2}>
          <Field label="Create password">
            <input
              type="password"
              value={form.password}
              onChange={(event) => update("password", event.target.value)}
              autoComplete="new-password"
              className="portal-input"
              placeholder="Minimum 8 characters"
            />
          </Field>
          <Field label="Confirm password">
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(event) =>
                update("confirmPassword", event.target.value)
              }
              autoComplete="new-password"
              className="portal-input"
            />
          </Field>
          <PrimaryButton onClick={continuePassword}>Continue</PrimaryButton>
        </Step>
      ) : null}

      {step === 3 ? (
        <Step title="WhatsApp preference" icon={MessageCircle}>
          <Choice
            selected={form.whatsappAvailable === "same"}
            onClick={() => update("whatsappAvailable", "same")}
            title="Yes, use this mobile number"
            description="Counselling updates may be shared on the verified number."
          />
          <Choice
            selected={form.whatsappAvailable === "different"}
            onClick={() => update("whatsappAvailable", "different")}
            title="No, add a different WhatsApp number"
            description="Your login mobile remains unchanged."
          />
          {form.whatsappAvailable === "different" ? (
            <input
              value={form.whatsappNumber}
              onChange={(event) =>
                update(
                  "whatsappNumber",
                  event.target.value.replace(/\D/g, "").slice(0, 10)
                )
              }
              inputMode="numeric"
              placeholder="Different 10-digit WhatsApp number"
              className="portal-input"
            />
          ) : null}
          <Choice
            selected={form.whatsappAvailable === "none"}
            onClick={() => update("whatsappAvailable", "none")}
            title="I don’t use WhatsApp"
            description="WhatsApp is optional and never required for login."
          />
          <PrimaryButton onClick={continueWhatsapp}>Continue</PrimaryButton>
        </Step>
      ) : null}

      {step === 4 ? (
        <Step title="What guidance do you need?" icon={GraduationCap}>
          <div className="grid gap-2 sm:grid-cols-2">
            {STUDENT_INTERESTS.map((interest) => {
              const Icon = interestIcons[interest];
              const selected = form.interests.includes(interest);

              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() =>
                    update(
                      "interests",
                      selected
                        ? form.interests.filter((item) => item !== interest)
                        : [...form.interests, interest]
                    )
                  }
                  className={`relative rounded-2xl border p-3 text-left transition ${
                    selected
                      ? "border-[#1769E8] bg-[#EEF5FF] shadow-[0_7px_18px_rgba(23,105,232,.12)]"
                      : "border-[#D9E3ED] bg-white"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      selected ? "text-[#1769E8]" : "text-[#60738F]"
                    }`}
                  />
                  <strong className="mt-2 block text-sm text-[#17396E]">
                    {interest}
                  </strong>
                  {selected ? (
                    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#1769E8] text-white">
                      <Check className="h-3 w-3" />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
          <PrimaryButton onClick={continueInterest}>Continue</PrimaryButton>
        </Step>
      ) : null}

      {step === 5 ? (
        <Step title="Complete your basic profile" icon={Stethoscope}>
          <div className="grid gap-3 sm:grid-cols-2">
            <TextInput
              label="Student name"
              value={form.name}
              onChange={(value) => update("name", value)}
              required
            />
            <TextInput
              label="Email (optional)"
              value={form.email}
              onChange={(value) => update("email", value)}
              type="email"
            />
            <TextInput
              label="Class"
              value={form.className}
              onChange={(value) => update("className", value)}
              placeholder="Class 12 / Dropper"
            />
            <TextInput
              label="NEET year"
              value={form.neetYear}
              onChange={(value) => update("neetYear", value)}
            />
            <TextInput
              label="State"
              value={form.state}
              onChange={(value) => update("state", value)}
            />
            <TextInput
              label="City"
              value={form.city}
              onChange={(value) => update("city", value)}
            />
            <TextInput
              label="District"
              value={form.district}
              onChange={(value) => update("district", value)}
            />
            <TextInput
              label="Category (optional)"
              value={form.category}
              onChange={(value) => update("category", value)}
            />
            <TextInput
              label="NEET score (optional)"
              value={form.neetScore}
              onChange={(value) => update("neetScore", value)}
            />
            <TextInput
              label="NEET rank (optional)"
              value={form.neetRank}
              onChange={(value) => update("neetRank", value)}
            />
            <TextInput
              label="Preferred course"
              value={form.preferredCourse}
              onChange={(value) => update("preferredCourse", value)}
            />
            <TextInput
              label="Preferred country"
              value={form.preferredCountry}
              onChange={(value) => update("preferredCountry", value)}
            />
          </div>
          <PrimaryButton
            onClick={completeSignup}
            busy={busy}
            disabled={form.name.trim().length < 2}
          >
            Create My Free Profile
          </PrimaryButton>
        </Step>
      ) : null}

      <PortalAuthMessage message={message} success={success} />

      {step > 1 ? (
        <button
          type="button"
          onClick={() => {
            setStep((current) => Math.max(1, current - 1));
            setMessage("");
          }}
          disabled={busy}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-black text-[#60738F] disabled:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous step
        </button>
      ) : null}
    </div>
  );
}

function Step({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Phone;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1769E8]">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-xl font-black text-[#082A62]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-black text-[#17396E]">
        {label}
      </span>
      {children}
    </label>
  );
}

function TextInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <Field label={`${label}${required ? " *" : ""}`}>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="portal-input"
      />
    </Field>
  );
}

function Choice({
  selected,
  onClick,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-2xl border p-3 text-left ${
        selected
          ? "border-[#1769E8] bg-[#EEF5FF]"
          : "border-[#D9E3ED] bg-white"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected
            ? "border-[#1769E8] bg-[#1769E8] text-white"
            : "border-[#9FB1C6]"
        }`}
      >
        {selected ? <Check className="h-3 w-3" /> : null}
      </span>
      <span>
        <strong className="block text-sm text-[#17396E]">{title}</strong>
        <span className="mt-0.5 block text-xs font-medium leading-5 text-[#60738F]">
          {description}
        </span>
      </span>
    </button>
  );
}

function PrimaryButton({
  onClick,
  children,
  busy = false,
  disabled = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  busy?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy || disabled}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(105deg,#0B4AA2,#087F9F)] px-5 text-sm font-black text-white shadow-[0_10px_22px_rgba(11,74,162,.22)] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
      {!busy ? <ArrowRight className="h-4 w-4" /> : null}
    </button>
  );
}
