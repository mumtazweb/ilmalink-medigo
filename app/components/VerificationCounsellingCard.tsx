"use client";

import { MessageCircle, ShieldCheck } from "lucide-react";

import CounsellingActionButton from "./CounsellingActionButton";
import TrustNote from "./TrustNote";

type VerificationCounsellingCardProps = {
  countryName?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  showTrustNote?: boolean;
};

export default function VerificationCounsellingCard({
  countryName = "MBBS admission",
  title,
  description,
  buttonLabel,
  showTrustNote = true,
}: VerificationCounsellingCardProps) {
  const cardTitle = title ?? `Need help checking ${countryName} eligibility?`;
  const cardDescription =
    description ??
    "Compare course duration, internship, English-medium teaching, WDOMS listing, local licence eligibility, fees, safety, and NMC/FMGL rules with an ILMALINK counsellor before final admission.";
  const ctaLabel = buttonLabel ?? `Check ${countryName} Eligibility`;

  return (
    <section className="px-6 pb-14">
      <div className="mx-auto max-w-7xl rounded-2xl border border-[#00C896]/30 bg-white p-5 text-slate-950 shadow-[0_18px_45px_rgba(15,23,42,0.10)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-3">
            <span className="mt-1 inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#00C896]/12 text-[#047857]">
              <ShieldCheck size={21} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold tracking-normal text-[#031525]">
                {cardTitle}
              </h2>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-600">
                {cardDescription}
              </p>
            </div>
          </div>
          <CounsellingActionButton className="inline-flex min-h-11 flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C896] to-[#0EA5A4] px-5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(0,200,150,0.24)] transition hover:-translate-y-0.5">
            <MessageCircle size={16} />
            {ctaLabel}
          </CounsellingActionButton>
        </div>
      </div>
      {showTrustNote ? (
        <div className="mx-auto mt-4 max-w-7xl">
          <TrustNote
            whatThisPageHelpsWith={[
              `Checking eligibility and documents for ${countryName}.`,
              "Understanding counselling, university, visa and licensing risks before payment.",
              "Preparing questions for a student-first admission guidance session.",
            ]}
          />
        </div>
      ) : null}
    </section>
  );
}
