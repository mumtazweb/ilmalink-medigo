import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../../components/navbar";
import {
  neet2026MccReservation,
  neet2026OfficialLinks,
} from "../../data/neet2026";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "NEET UG 2026 Counselling | MCC, State Routes & Reservation",
  description:
    "NEET UG 2026 counselling guide with MCC All India routes, state counselling, private/deemed pathways, reservation snapshot and official links.",
  alternates: {
    canonical: "https://www.ilmalink.com/neet/counselling",
  },
};

const links = [
  {
    label: "MCC UG current events",
    href: "https://mcc.nic.in/current-events-ug/",
  },
  {
    label: "MCC UG schedule",
    href: "https://mcc.nic.in/eservices-schedule-ug/",
  },
  {
    label: "West Bengal UG counselling notices",
    href: "https://wbmcc.nic.in/ug-medical-dental-notice-events/",
  },
] as const;

const counsellingRoutes = [
  {
    title: "MCC / DGHS counselling",
    description:
      "15% All India Quota and notified AIIMS, JIPMER, central university, deemed university, ESIC and other participating seats, subject to the current MCC scheme.",
  },
  {
    title: "State / UT counselling",
    description:
      "State quota, many private medical and dental seats, domicile rules, state reservation, bond and fee rules are handled by the designated state or UT authority.",
  },
  {
    title: "AFMC and institution-specific processes",
    description:
      "NEET rank may be used with additional registration, screening, medical fitness or institution-specific requirements.",
  },
] as const;

export default function NeetCounsellingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4F7FB] text-slate-950">
      <Navbar />

      <section className="bg-[#061D3F] px-4 py-9 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/neet"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#7FF0CA]"
          >
            <ArrowLeft className="h-4 w-4" />
            NEET UG 2026 hub
          </Link>
          <MapPin className="mt-6 h-9 w-9 text-[#51E6B3]" />
          <h1 className="mt-3 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">
            NEET UG 2026 Counselling Routes
          </h1>
          <p className="mt-4 max-w-4xl text-base font-medium leading-8 text-blue-100">
            Qualification and rank are followed by separate MCC and state
            counselling processes. Registration on one portal does not
            automatically register a candidate on another.
          </p>
          <a
            href={neet2026OfficialLinks.mcc}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#00B981] px-5 py-3 text-sm font-extrabold !text-white"
          >
            Open official MCC portal
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {counsellingRoutes.map((route) => (
              <article
                key={route.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h2 className="text-xl font-black text-[#061D3F]">
                  {route.title}
                </h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
                  {route.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-2xl border border-slate-200 p-5">
            <h2 className="text-2xl font-black text-[#061D3F]">
              MCC/DGHS reservation snapshot
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
              These bulletin percentages apply to the relevant central
              counselling framework. State reservation policies may differ.
            </p>
            <div className="mt-5 grid gap-3">
              {neet2026MccReservation.map((item) => (
                <div
                  key={item.category}
                  className="flex items-start justify-between gap-4 rounded-xl bg-[#F4F7FB] p-4"
                >
                  <p className="text-sm font-bold text-slate-700">
                    {item.category}
                  </p>
                  <p className="max-w-[55%] text-right text-sm font-black text-[#061D3F]">
                    {item.share}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 p-5">
            <h2 className="text-2xl font-black text-[#061D3F]">
              Prepare before registration
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                "NEET scorecard and admit card.",
                "Class 10 and Class 12 marksheets and certificates.",
                "Valid photo identity and recent photographs.",
                "Category, EWS, OBC-NCL or PwBD certificate in the prescribed current format, where applicable.",
                "Domicile, nationality, NRI or OCI documents required by the selected counselling route.",
                "A realistic choice list based on rank, category, domicile, fee, bond, location and seat type.",
                "Payment method and sufficient funds for registration, security deposit and reporting requirements.",
                "Separate tracking of MCC and every relevant state counselling schedule.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00A878]" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black text-[#061D3F]">
            Official counselling links
          </h2>
          <div className="mt-5 grid gap-3">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-bold !text-[#1D4ED8] shadow-sm hover:border-[#1D4ED8]/40"
              >
                <span>{item.label}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <p className="text-sm font-semibold leading-6 text-amber-950">
              Never pay an agent for a claimed direct MBBS seat outside the
              applicable official counselling and reporting process. Verify
              every allotment, fee recipient and reporting instruction on the
              competent authority&apos;s portal.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
