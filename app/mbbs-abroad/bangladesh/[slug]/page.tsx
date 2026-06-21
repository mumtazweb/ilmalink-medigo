import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  MapPin,
  MessageCircle,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import CounsellingActionButton from "../../../components/CounsellingActionButton";
import JsonLd from "../../../components/JsonLd";
import Navbar from "../../../components/navbar";
import { whatsappCounsellingUrl } from "../../../data/exploreLinks";
import {
  bangladeshFinalDisclaimer,
  bangladeshUniversityDirectory,
  getBangladeshUniversityBySlug,
} from "../../../data/bangladeshUniversities";
import { BangladeshVerificationPills } from "../BangladeshUniversityCards";

export const dynamic = "force-static";

const countryPageUrl = "https://www.ilmalink.com/mbbs-abroad/bangladesh/";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return bangladeshUniversityDirectory.map((college) => ({
    slug: college.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const college = getBangladeshUniversityBySlug(slug);

  if (!college) {
    return {
      title: "Bangladesh Medical College | ILMALINK MEDIGO",
    };
  }

  const pageUrl = `${countryPageUrl}${college.slug}/`;

  return {
    title: `${college.name} Fees 2026 | Bangladesh MBBS Profile`,
    description: `${college.name} MBBS profile with 2026-2027 fee structure, payment schedule, FMGE reference, eligibility, documents and Bangladesh admission verification notes.`,
    keywords: [
      `${college.name} fee structure 2026`,
      `${college.name} MBBS Bangladesh`,
      `${college.name} FMGE 2025`,
      "Bangladesh MBBS fees 2026",
      "Bangladesh MBBS eligibility Indian students",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${college.name} | Fees, FMGE & Eligibility`,
      description: college.summary,
      url: pageUrl,
      siteName: "ILMALINK MEDIGO",
      locale: "en_IN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${college.name} | Bangladesh MBBS Profile`,
      description: college.summary,
    },
  };
}

function buildJsonLd(college: NonNullable<ReturnType<typeof getBangladeshUniversityBySlug>>) {
  const pageUrl = `${countryPageUrl}${college.slug}/`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.ilmalink.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "MBBS Abroad",
          item: "https://www.ilmalink.com/mbbs-abroad/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "MBBS in Bangladesh",
          item: countryPageUrl,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: college.name,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      name: college.name,
      url: pageUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: college.city,
        addressCountry: "Bangladesh",
      },
      description: college.summary,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `What is the 2026-2027 fee structure of ${college.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${college.name} currently has a listed fee headline of ${college.fees}. Students must verify the latest college-issued fee letter, inclusions, exclusions and payment schedule before admission.`,
          },
        },
        {
          "@type": "Question",
          name: `What is the FMGE 2025 reference for ${college.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text:
              college.fmge.appeared === null || college.fmge.passed === null
                ? "The provided Bangladesh FMGE 2025 entry does not separately list this college. Students should verify FMGE outcome references separately."
                : `${college.fmge.sourceName}: ${college.fmge.appeared} appeared, ${college.fmge.passed} passed, pass rate ${college.fmge.passRate}.`,
          },
        },
      ],
    },
  ];
}

function CtaButtons({ collegeName }: { collegeName: string }) {
  const url = `${whatsappCounsellingUrl}?text=${encodeURIComponent(
    `Hello ILMALINK MEDIGO, I want to verify ${collegeName} Bangladesh MBBS fees, eligibility and admission route.`,
  )}`;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#00B981] px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(0,185,129,0.26)] transition hover:bg-[#00A878]">
        Check Eligibility
        <ArrowRight size={16} />
      </CounsellingActionButton>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#0b4b7a] bg-white px-5 py-3 text-sm font-extrabold text-[#0b3a67] transition hover:border-[#00A878] hover:text-[#00A878]"
      >
        Talk to Expert
        <MessageCircle size={16} />
      </a>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00A878]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-[#071f3f] sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-4xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default async function BangladeshCollegeProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const college = getBangladeshUniversityBySlug(slug);

  if (!college) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] text-slate-950">
      <JsonLd data={buildJsonLd(college)} />
      <Navbar />

      <section className="relative overflow-hidden bg-[#031b35] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(0,211,155,0.18),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(15,76,255,0.18),transparent_30%),linear-gradient(110deg,#031b35,#063b70)]" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/mbbs-abroad/bangladesh/"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#7ff0ca] hover:text-white"
          >
            <ArrowLeft size={14} />
            Bangladesh colleges
          </Link>
          <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.6fr] lg:items-stretch">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7ff0ca]">
                Bangladesh MBBS College Profile
              </p>
              <h1 className="mt-2 max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {college.name}
              </h1>
              <p className="mt-3 flex flex-wrap items-center gap-2 text-sm font-bold text-blue-100">
                <MapPin size={16} className="text-[#51e6b3]" />
                {college.location}
              </p>
              <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-blue-50">
                {college.summary}
              </p>
              <div className="mt-5">
                <CtaButtons collegeName={college.name} />
              </div>
            </div>

            <aside className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <h2 className="text-sm font-black uppercase tracking-[0.15em] text-[#7ff0ca]">
                At a glance
              </h2>
              <div className="mt-4 grid gap-3">
                {[
                  ["Session", college.intake],
                  ["Total fee", college.totalCourseFeeLabel],
                  ["Duration", college.duration],
                  ["FMGE 2025", college.fmge.passRate],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-white/10 p-3">
                    <p className="text-[10px] font-black uppercase tracking-wide text-blue-100">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-black text-white">{value}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-4 py-7 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BangladeshVerificationPills university={college} />
        </div>
      </section>

      <section className="px-4 pb-7 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeading
              eyebrow="Fee structure"
              title={`${college.name} fees 2026-2027`}
              description={college.feeHeadline}
            />
            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[580px] border-collapse text-left text-xs">
                <thead className="bg-[#eef4fa] text-[#26394d]">
                  <tr>
                    {['Fee head', 'Amount', 'Note'].map((heading) => (
                      <th key={heading} className="px-3 py-3 font-black">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {college.feeRows.map((row) => (
                    <tr key={`${row.label}-${row.amount}`}>
                      <td className="px-3 py-3 font-bold text-[#071f3f]">{row.label}</td>
                      <td className="px-3 py-3 font-black text-[#00A878]">{row.amount}</td>
                      <td className="px-3 py-3 text-slate-600">{row.note ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeading
              eyebrow="Payment plan"
              title="Installments and payment checkpoints"
              description="Verify the latest college-issued schedule before transfer."
            />
            <div className="mt-5 grid gap-3">
              {college.paymentSchedule.map((row) => (
                <div
                  key={`${row.stage}-${row.amount}-${row.due}`}
                  className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4"
                >
                  <p className="text-sm font-black text-[#071f3f]">{row.stage}</p>
                  <p className="mt-1 text-sm font-black text-[#00A878]">{row.amount}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-600">{row.due}</p>
                  {row.note ? (
                    <p className="mt-2 text-xs font-semibold leading-5 text-amber-800">{row.note}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 pb-7 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-[#071f3f]">Additional fees and exclusions</h2>
            <div className="mt-4 grid gap-3">
              {college.additionalFees.map((fee) => (
                <div key={`${fee.label}-${fee.amount}`} className="rounded-xl bg-[#f4f7fb] p-3">
                  <p className="text-sm font-black text-[#071f3f]">{fee.label}</p>
                  <p className="mt-1 text-sm font-black text-[#00A878]">{fee.amount}</p>
                  {fee.note ? <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">{fee.note}</p> : null}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-[#071f3f]">Eligibility checklist</h2>
            <ul className="mt-4 grid gap-3">
              {college.eligibility.map((item) => (
                <li key={item} className="flex items-start gap-3 text-xs font-semibold leading-6 text-slate-700">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#00A878]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-[#071f3f]">Documents required</h2>
            <ul className="mt-4 grid gap-3">
              {college.documentChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-xs font-semibold leading-6 text-slate-700">
                  <FileCheck2 size={17} className="mt-0.5 shrink-0 text-[#0F4CFF]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="px-4 pb-7 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-[#071f3f]">FMGE 2025 reference</h2>
            <div className="mt-4 rounded-2xl bg-[linear-gradient(110deg,#031b35,#063b70)] p-5 text-white">
              <TrendingUp size={26} className="text-[#51e6b3]" />
              <p className="mt-3 text-xs font-black uppercase tracking-wide text-[#51e6b3]">
                {college.fmge.sourceName}
              </p>
              {college.fmge.appeared === null || college.fmge.passed === null ? (
                <p className="mt-2 text-2xl font-black">Verify separately</p>
              ) : (
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-xl font-black text-[#51e6b3]">{college.fmge.appeared}</p>
                    <p className="text-[10px] font-bold text-blue-100">Appeared</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-xl font-black text-[#51e6b3]">{college.fmge.passed}</p>
                    <p className="text-[10px] font-bold text-blue-100">Passed</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-xl font-black text-[#51e6b3]">{college.fmge.passRate}</p>
                    <p className="text-[10px] font-bold text-blue-100">Pass rate</p>
                  </div>
                </div>
              )}
            </div>
          </article>

          <article className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-black text-red-900">
              <ShieldAlert size={20} />
              Verification warning
            </h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-red-950">
              {bangladeshFinalDisclaimer}
            </p>
            <ul className="mt-4 grid gap-3">
              {college.warnings.map((warning) => (
                <li key={warning} className="flex items-start gap-3 text-xs font-semibold leading-6 text-red-950">
                  <ShieldCheck size={16} className="mt-0.5 shrink-0 text-red-700" />
                  {warning}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[linear-gradient(110deg,#031b35,#063b70)] p-5 text-white shadow-[0_24px_70px_rgba(3,27,53,0.2)] sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#51e6b3]">
                Need written verification?
              </p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Verify {college.name} before payment
              </h2>
              <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-blue-100">
                Check eligibility, GPA, NEET status, fee letter, payment recipient, refund terms, hostel terms and DGME/BM&DC route before processing admission.
              </p>
            </div>
            <CtaButtons collegeName={college.name} />
          </div>
        </div>
      </section>
    </main>
  );
}
