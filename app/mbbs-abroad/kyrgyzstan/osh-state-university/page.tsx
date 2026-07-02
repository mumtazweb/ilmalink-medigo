import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  ExternalLink,
  GraduationCap,
  Plane,
  ShieldCheck,
  Stethoscope,
  WalletCards,
} from "lucide-react";

import CounsellingActionButton from "../../../components/CounsellingActionButton";
import JsonLd from "../../../components/JsonLd";
import Navbar from "../../../components/navbar";
import {
  getKyrgyzUniversityBySlug,
  type KyrgyzUniversityPageData,
} from "../../../data/kyrgyzstanUniversities";
import { kyrgyzstanUniversityImage } from "../../../data/kyrgyzstanUniversityMedia";

const universityRecord = getKyrgyzUniversityBySlug("osh-state-university");

if (!universityRecord) {
  throw new Error("Osh State University Medical Faculty data is missing.");
}

const university: KyrgyzUniversityPageData = universityRecord;
const canonical =
  "https://www.ilmalink.com/mbbs-abroad/kyrgyzstan/osh-state-university/";
const officialFacultyWebsite = "https://medical.oshsu.kg/";
const officialUniversityFacultyPage = "https://www.oshsu.kg/en/page/174";
const wdomsUrl = "https://search.wdoms.org/home/schooldetail/F0000578";
const iaarUrl =
  "https://iaar.agency/registry/en?accr_type=2&country_id=8&page=2&univer_type_id=1";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "Osh State University Medical Faculty | Fees, WDOMS & Accreditation",
  description:
    "Osh State University Medical Faculty profile using official university, WDOMS and IAAR information, with a cautious USD 1,700 per semester working estimate and contractor verification warning.",
  alternates: { canonical },
  openGraph: {
    title: "Osh State University Medical Faculty",
    description:
      "Public university profile with WDOMS program facts, IAAR accreditation dates, fee uncertainty and admission-contractor cautions.",
    url: canonical,
    type: "article",
    images: [kyrgyzstanUniversityImage(university.slug)],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osh State University Medical Faculty",
    description:
      "Official-source profile, accreditation dates and cautious fee guidance.",
    images: [kyrgyzstanUniversityImage(university.slug)],
  },
};

const sourceLinks = [
  {
    label: "Official medical faculty website",
    href: officialFacultyWebsite,
    note: "Osh State University domain",
  },
  {
    label: "Official International Medical Faculty page",
    href: officialUniversityFacultyPage,
    note: "OshSU institutional page",
  },
  {
    label: "World Directory of Medical Schools",
    href: wdomsUrl,
    note: "FAIMER School ID F0000578",
  },
  {
    label: "IAAR accreditation registry",
    href: iaarUrl,
    note: "Independent accreditation record",
  },
  {
    label: "Final June 2026 state-results report",
    href: "https://24.kg/english/376610_Thirteen_schools_in_Kyrgyzystan_fail_state_accreditation/",
    note: "Four institutions received six-year accreditation",
  },
];

const programFacts = [
  { label: "School type", value: "Public", icon: Building2 },
  { label: "School instruction started", value: "1993", icon: CalendarDays },
  { label: "Program", value: "International Medical Faculty", icon: Stethoscope },
  { label: "Program began", value: "2015", icon: CalendarDays },
  { label: "Qualification", value: "Doctor of Medicine (M.D.)", icon: GraduationCap },
  { label: "WDOMS curriculum", value: "5 years", icon: CalendarDays },
  { label: "Instruction language", value: "English", icon: GraduationCap },
  { label: "Foreign students", value: "Admitted", icon: CheckCircle2 },
];

const faqs = [
  {
    question: "Is USD 1,700 per semester the official OshSU fee?",
    answer:
      "No. ilmaLink, is showing USD 1,700 only as an unconfirmed working estimate. Students must obtain a current written invoice from the university or a verified authorized entity.",
  },
  {
    question: "Does Osh State University have one exclusive Indian contractor?",
    answer:
      "ilmaLink, has not yet confirmed one exclusive or universal India-side contractor. Agency fees, inclusions, payment recipients and responsibilities may differ.",
  },
  {
    question: "What does WDOMS report for the English program?",
    answer:
      "WDOMS lists the International Medical Faculty program as an English-medium Doctor of Medicine program begun in 2015, with a five-year curriculum and admission of foreign students.",
  },
  {
    question: "Is an additional internship required?",
    answer:
      "The admission plan should account for an additional internship year, but its exact duration, location, supervision and Indian regulatory acceptability must be confirmed in writing before admission.",
  },
];

function Section({
  id,
  eyebrow,
  title,
  children,
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-4 py-9 sm:px-6 lg:px-8 ${
        dark ? "bg-[#062b55] text-white" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <p
          className={`text-xs font-black uppercase tracking-[0.18em] ${
            dark ? "text-[#6ff0c6]" : "text-[#00A878]"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-2 text-2xl font-black tracking-tight sm:text-4xl ${
            dark ? "text-white" : "text-[#071f3f]"
          }`}
        >
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function OfficialSourceBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-900 ring-1 ring-emerald-200">
      <ShieldCheck size={14} />
      Official-source profile
    </span>
  );
}

function buildJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      name: "Osh State University Medical Faculty",
      url: canonical,
      sameAs: [officialFacultyWebsite, officialUniversityFacultyPage, wdomsUrl],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Zholon Mamytov Street",
        postalCode: "723500",
        addressLocality: "Osh",
        addressCountry: "KG",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "International Medical Faculty â€” Doctor of Medicine (M.D.)",
      provider: {
        "@type": "CollegeOrUniversity",
        name: "Osh State University Medical Faculty",
      },
      inLanguage: "English",
      courseMode: "On campus",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];
}

export default function OshStateUniversityMedicalFacultyPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] text-slate-950">
      <JsonLd data={buildJsonLd()} />
      <Navbar />

      <section className="relative overflow-hidden bg-[#031b35] px-4 py-9 text-white sm:px-6 lg:px-8 lg:py-12">
        <Image
          src={kyrgyzstanUniversityImage(university.slug)}
          alt="Osh State University International Medical Faculty"
          fill
          preload
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(3,27,53,0.99)_0%,rgba(3,39,73,0.93)_55%,rgba(3,27,53,0.55)_100%)]" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/mbbs-abroad/kyrgyzstan/"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-100 hover:text-white"
          >
            Back to Kyrgyzstan universities
          </Link>

          <div className="mt-6 grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-2">
                <OfficialSourceBadge />
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-black text-white ring-1 ring-white/20">
                  Public government university
                </span>
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-[#6ff0c6]">
                Osh, Kyrgyzstan
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                Osh State University Medical Faculty
              </h1>
              <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-blue-50 sm:text-lg">
                Public medical school profile based on Osh State University,
                WDOMS and IAAR recordsâ€”separated clearly from private agency
                fee packages and contractor claims.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={officialFacultyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#00B981] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#00A878]"
                >
                  Official faculty website
                  <ExternalLink size={16} />
                </a>
                <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-extrabold text-white transition hover:border-[#6ff0c6] hover:text-[#6ff0c6]">
                  Verify admission route
                  <ArrowRight size={16} />
                </CounsellingActionButton>
              </div>
            </div>

            <aside className="rounded-2xl border border-amber-300/40 bg-[#fff8e7] p-5 text-[#442b00] shadow-[0_24px_70px_rgba(0,0,0,0.25)]">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={23}
                  className="mt-0.5 shrink-0 text-amber-600"
                />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
                    Admission responsibility warning
                  </p>
                  <h2 className="mt-2 text-xl font-black">
                    Main contractor not yet confirmed
                  </h2>
                  <p className="mt-3 text-sm font-semibold leading-7 text-amber-950">
                    ilmaLink, is in contact with the medical faculty, but
                    has not yet confirmed one exclusive or universal contractor
                    for Indian admissions. Fees, inclusions and responsibility
                    can differ between agencies.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-red-200 bg-red-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start gap-4 rounded-2xl border border-red-300 bg-white p-5 shadow-sm">
            <AlertTriangle
              size={26}
              className="mt-1 shrink-0 text-red-600"
            />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-red-700">
                Do not confuse two different universities
              </p>
              <h2 className="mt-2 text-xl font-black text-red-950 sm:text-2xl">
                Osh State University Medical Faculty is not Osh International
                Medical University
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-red-950">
                This page covers the accredited public Osh State University
                Medical Faculty. Osh International Medical University is a
                separate private institution, WDOMS school ID F0006391, and it
                did not pass the May 2026 state accreditation.
              </p>
              <p className="mt-3 text-sm font-black leading-7 text-red-950">
                Check the exact legal university name and WDOMS school ID on
                the offer letter, admission letter, invoice and payment
                instructions.
              </p>
              <Link
                href="/mbbs-abroad/kyrgyzstan/osh-international-medical-university/"
                className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-xs font-extrabold text-red-800 hover:border-red-500"
              >
                See the Osh International Medical University warning
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="wdoms"
        eyebrow="Directory record"
        title="WDOMS school and program information"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {programFacts.map(({ label, value, icon: Icon }) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Icon size={20} className="text-[#00A878]" />
              <p className="mt-4 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                {label}
              </p>
              <p className="mt-2 text-base font-black leading-6 text-[#071f3f]">
                {value}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#00A878]">
                Main address in WDOMS
              </p>
              <p className="mt-2 font-bold leading-7 text-[#071f3f]">
                Zholon Mamytov Street
                <br />
                723500 Osh
                <br />
                Kyrgyzstan
              </p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#00A878]">
                Program structure caution
              </p>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">
                WDOMS lists a five-year curriculum for the International
                Medical Faculty. The admission plan should also verify the
                additional internship year, making its location, supervision,
                documentation and licensing relevance explicit.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="accreditation"
        eyebrow="State and program accreditation"
        title="Six-year state accreditation confirmed in May 2026"
        dark
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
          <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
            <p className="text-base font-semibold leading-8 text-blue-50">
              The final Kyrgyz state results reported Osh State University
              among four institutions receiving six-year accreditation.
              Separately, WDOMS reports that the International Medical Faculty
              program received IAAR accreditation on May 30, 2025 through May
              29, 2030.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white p-4 text-[#071f3f]">
              <dt className="text-[10px] font-black uppercase text-slate-500">
                State accreditation
              </dt>
              <dd className="mt-2 text-lg font-black text-[#00A878]">
                Accredited 6Y
              </dd>
            </div>
            <div className="rounded-2xl bg-white p-4 text-[#071f3f]">
              <dt className="text-[10px] font-black uppercase text-slate-500">
                IAAR program term
              </dt>
              <dd className="mt-2 text-lg font-black text-[#00A878]">
                To 29 May 2030
              </dd>
            </div>
          </dl>
        </div>
        <p className="mt-4 text-xs font-semibold leading-6 text-blue-100">
          State and program accreditation are separate layers. Recheck the
          latest Kyrgyz result, WDOMS and IAAR records before admission.
        </p>
      </Section>

      <Section
        id="fees"
        eyebrow="Fee caution"
        title="Osh State University fee estimate"
      >
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <CircleDollarSign
              size={24}
              className="mt-0.5 shrink-0 text-amber-700"
            />
            <div>
              <h3 className="text-xl font-black text-amber-950">
                USD 1,700 per semester is not an official published fee
              </h3>
              <p className="mt-2 text-sm font-semibold leading-7 text-amber-950">
                No reliable public fee schedule has been found on the official
                university or medical-faculty website. The amount below is an
                unconfirmed working estimate from a source considered reliable
                by ilmalink. Obtain a written university invoice before
                payment.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <p className="border-b border-slate-200 bg-[#f4f7fa] px-4 py-2 text-xs font-bold text-slate-500 sm:hidden">
            Swipe horizontally to view all columns.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-[#062b55] text-white">
                <tr>
                  {[
                    "Year",
                    "Semester",
                    "Working tuition estimate",
                    "Hostel / accommodation",
                    "Other costs",
                  ].map((heading) => (
                    <th key={heading} className="px-4 py-4 font-black">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {university.feeRows.map((row, index) => (
                  <tr
                    key={row.semester}
                    className={index % 2 === 0 ? "bg-[#f8fafc]" : "bg-white"}
                  >
                    <td className="px-4 py-3 font-black text-[#071f3f]">
                      {row.year}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-600">
                      {row.semester}
                    </td>
                    <td className="px-4 py-3 font-black text-[#00A878]">
                      USD 1,700*
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-600">
                      At actual cost
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-600">
                      At actual cost
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Visa & invitation", "At actual cost", Plane],
            ["Hostel & accommodation", "At actual cost", Building2],
            ["Flight ticket", "At actual cost", Plane],
            ["Registration & insurance", "At actual cost", WalletCards],
          ].map(([label, value, Icon]) => {
            const CostIcon = Icon as typeof Plane;

            return (
              <article
                key={label as string}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <CostIcon size={19} className="text-[#0F4CFF]" />
                <p className="mt-3 text-xs font-black uppercase leading-5 text-slate-500">
                  {label as string}
                </p>
                <p className="mt-2 text-lg font-black text-[#071f3f]">
                  {value as string}
                </p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section
        id="contractor"
        eyebrow="Before paying"
        title="Agency and contractor verification"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <h3 className="text-lg font-black text-red-950">
              Do not assume every agency package is the same
            </h3>
            <ul className="mt-4 space-y-3 text-sm font-semibold leading-7 text-red-950">
              {[
                "Confirm whether the agency is authorized for the current intake.",
                "Verify the exact payee for tuition, hostel, visa, invitation and service fees.",
                "Demand a written list of included and excluded services.",
                "Confirm refund responsibility if admission, invitation or visa fails.",
                "Do not rely on an agency website as proof of the university's official fee.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <AlertTriangle
                    size={17}
                    className="mt-1 shrink-0 text-red-600"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="text-lg font-black text-emerald-950">
              Documents to obtain before payment
            </h3>
            <ul className="mt-4 space-y-3 text-sm font-semibold leading-7 text-emerald-950">
              {[
                "Current university admission or eligibility confirmation.",
                "Written semester-wise tuition invoice.",
                "Authorized representative or contractor evidence.",
                "Hostel and accommodation terms.",
                "Internship and clinical-training structure.",
                "Signed payment and refund responsibility matrix.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2
                    size={17}
                    className="mt-1 shrink-0 text-emerald-600"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <Section
        id="sponsor-notes"
        eyebrow="WDOMS sponsor information"
        title="Canada and ECFMG notes"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-black text-[#071f3f]">Canada</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
              The WDOMS sponsor note states that, unless otherwise indicated,
              medical degrees from this school are acceptable to Canadian
              provincial and territorial medical regulators. Applicants must
              still meet every regulator&apos;s current registration requirements.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-black text-[#071f3f]">
              ECFMG, United States
            </h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
              WDOMS reports ECFMG application eligibility for qualifying
              students and graduates, with graduation years listed from 1993
              to current. Degree-title, graduation-year and all other ECFMG
              requirements still apply.
            </p>
          </article>
        </div>
        <p className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold leading-7 text-blue-950">
          WDOMS listing and sponsor notes do not by themselves guarantee NMC
          compliance, Indian registration, admission suitability, visa
          approval, ECFMG certification or licensing in any country.
        </p>
      </Section>

      <Section
        id="sources"
        eyebrow="Primary references"
        title="Verify using official and independent sources"
        dark
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {sourceLinks.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 transition hover:bg-white/15"
            >
              <span>
                <span className="block font-black text-white">
                  {source.label}
                </span>
                <span className="mt-1 block text-xs font-semibold text-blue-100">
                  {source.note}
                </span>
              </span>
              <ExternalLink
                size={18}
                className="shrink-0 text-[#6ff0c6] transition group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>
      </Section>

      <Section id="faq" eyebrow="Common questions" title="OshSU admission FAQ">
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-black leading-7 text-[#071f3f]">
                {faq.question}
              </h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}




