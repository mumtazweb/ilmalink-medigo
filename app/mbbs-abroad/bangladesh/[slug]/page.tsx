import type { Metadata } from "next";
import Image from "next/image";
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
      title: "Bangladesh Medical College | ilmaLink",
    };
  }

  const pageUrl = `${countryPageUrl}${college.slug}/`;

  return {
    title: `${college.name} Fees | Bangladesh MBBS Profile`,
    description: `${college.name} MBBS profile with ${college.intake} fee structure, payment schedule, FMGE reference, eligibility, documents and Bangladesh admission verification notes.`,
    keywords: [
      `${college.name} fee structure`,
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
      siteName: "ilmaLink",
      images: [
        {
          url: college.image,
          alt: college.imageAlt,
        },
      ],
      locale: "en_IN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${college.name} | Bangladesh MBBS Profile`,
      description: college.summary,
      images: [college.image],
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
          name: `What is the current fee structure of ${college.name}?`,
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
    `Hello ilmaLink, I want to verify ${collegeName} Bangladesh MBBS fees, eligibility and admission route.`,
  )}`;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      <CounsellingActionButton className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#00B981] px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(0,185,129,0.24)] transition hover:bg-[#00A878]">
        Check Eligibility
        <ArrowRight size={16} />
      </CounsellingActionButton>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#0b4b7a] bg-white px-4 py-2.5 text-sm font-extrabold !text-[#0b3a67] transition hover:border-[#00A878] hover:!text-[#00A878]"
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
      <h2 className="mt-1.5 text-xl font-black tracking-tight text-[#071f3f] sm:text-2xl lg:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-4xl text-sm font-medium leading-6 text-slate-600">
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

      <section className="relative overflow-hidden bg-[#031b35] px-4 py-6 text-white sm:px-6 sm:py-7 lg:px-8">
        <Image
          src={college.image}
          alt={college.imageAlt}
          fill
          preload
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(0,211,155,0.22),transparent_28%),linear-gradient(100deg,rgba(3,27,53,0.99)_0%,rgba(6,59,112,0.94)_57%,rgba(3,27,53,0.64)_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/mbbs-abroad/bangladesh/"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#7ff0ca] hover:text-white"
          >
            <ArrowLeft size={14} />
            Bangladesh colleges
          </Link>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.12fr_0.56fr] lg:items-stretch">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7ff0ca]">
                Bangladesh MBBS College Profile
              </p>
              <h1 className="mt-1.5 max-w-5xl text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-[3.6rem]">
                {college.name}
              </h1>
              <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-bold text-blue-100">
                <MapPin size={16} className="text-[#51e6b3]" />
                {college.location}
              </p>
              <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-blue-50 sm:text-base">
                {college.summary}
              </p>
              <div className="mt-4">
                <CtaButtons collegeName={college.name} />
              </div>
            </div>

            <aside className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <h2 className="text-xs font-black uppercase tracking-[0.15em] text-[#7ff0ca]">
                At a glance
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  ["Session", college.intake],
                  ["Total fee", college.totalCourseFeeLabel],
                  ["Duration", college.duration],
                  ["FMGE 2025", college.fmge.passRate],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="min-w-0 rounded-xl border border-white/10 bg-white/10 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                  >
                    <p className="text-[10px] font-black uppercase tracking-wide text-blue-100">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-black leading-5 text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-3 px-4 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BangladeshVerificationPills university={college} />
        </div>
      </section>

      <section className="px-4 pb-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="rounded-2xl border border-white bg-white/95 p-4 shadow-[0_16px_42px_rgba(8,45,67,0.08)] ring-1 ring-slate-100 sm:p-5">
            <SectionHeading
              eyebrow="College overview"
              title={`About ${college.name}`}
              description={college.summary}
            />
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {college.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-[#f8fafc] p-2.5 text-xs font-semibold leading-5 text-slate-700"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-[#00A878]"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </article>

          <aside className="rounded-2xl border border-white bg-[linear-gradient(145deg,#ffffff,#f3faf8)] p-4 shadow-[0_16px_42px_rgba(8,45,67,0.08)] ring-1 ring-slate-100 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-black text-[#071f3f]">
                Essential facts
              </h2>
              {college.website ? (
                <a
                  href={`https://${college.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#0b4b7a] bg-white px-3 py-2 text-xs font-extrabold !text-[#0b3a67] shadow-sm transition hover:border-[#00A878] hover:!text-[#00A878]"
                >
                  Website
                  <ArrowRight size={14} />
                </a>
              ) : null}
            </div>
            <dl className="mt-3 grid grid-cols-4 gap-2">
              {college.facts.map((fact) => (
                <div
                  key={`${fact.label}-${fact.value}`}
                  className="min-w-0 rounded-xl border border-slate-200 bg-white px-1.5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,1)] sm:px-2.5"
                >
                  <dt className="line-clamp-2 min-h-8 text-[9px] font-black uppercase leading-4 tracking-wide text-slate-500 sm:text-[10px]">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-[9px] font-black leading-4 text-[#071f3f] min-[360px]:text-[10px] sm:text-sm" title={fact.value}>
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="px-4 pb-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.14fr_0.86fr]">
          <article className="rounded-2xl border border-white bg-white p-4 shadow-[0_16px_42px_rgba(8,45,67,0.08)] ring-1 ring-slate-100 sm:p-5">
            <SectionHeading
              eyebrow="Fee structure"
              title={`${college.name} fee structure`}
              description={college.feeHeadline}
            />
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
              <table className="w-full min-w-[560px] border-collapse text-left text-xs">
                <thead className="bg-[linear-gradient(90deg,#eef8f5,#eef4ff)] text-[#26394d]">
                  <tr>
                    {['Fee head', 'Amount', 'Note'].map((heading) => (
                      <th key={heading} className="px-3 py-2.5 font-black">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {college.feeRows.map((row) => (
                    <tr key={`${row.label}-${row.amount}`} className="odd:bg-white even:bg-[#f8fafc]">
                      <td className="px-3 py-2.5 font-bold text-[#071f3f]">{row.label}</td>
                      <td className="px-3 py-2.5 font-black text-[#00A878]">{row.amount}</td>
                      <td className="px-3 py-2.5 font-medium leading-5 text-slate-600">{row.note ?? "--"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-2xl border border-white bg-[linear-gradient(145deg,#ffffff,#f5f8fc)] p-4 shadow-[0_16px_42px_rgba(8,45,67,0.08)] ring-1 ring-slate-100 sm:p-5">
            <SectionHeading
              eyebrow="Payment plan"
              title="Installments and payment checkpoints"
              description="Verify the latest college-issued schedule before transfer."
            />
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {college.paymentSchedule.map((row) => (
                <div
                  key={`${row.stage}-${row.amount}-${row.due}`}
                  className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <p className="text-xs font-black uppercase tracking-wide text-[#071f3f]">{row.stage}</p>
                  <p className="mt-1 text-sm font-black text-[#00A878]">{row.amount}</p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-600">{row.due}</p>
                  {row.note ? (
                    <p className="mt-1.5 text-xs font-semibold leading-5 text-amber-800">{row.note}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 pb-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-white bg-white p-4 shadow-[0_14px_36px_rgba(8,45,67,0.07)] ring-1 ring-slate-100">
            <h2 className="text-lg font-black text-[#071f3f]">Additional fees and exclusions</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {college.additionalFees.map((fee) => (
                <div key={`${fee.label}-${fee.amount}`} className="rounded-xl border border-slate-100 bg-[#f8fafc] p-2.5">
                  <p className="text-xs font-black uppercase tracking-wide text-[#071f3f]">{fee.label}</p>
                  <p className="mt-1 text-sm font-black text-[#00A878]">{fee.amount}</p>
                  {fee.note ? <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">{fee.note}</p> : null}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white bg-white p-4 shadow-[0_14px_36px_rgba(8,45,67,0.07)] ring-1 ring-slate-100">
            <h2 className="text-lg font-black text-[#071f3f]">Eligibility checklist</h2>
            <ul className="mt-3 grid gap-2">
              {college.eligibility.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-lg bg-[#f8fafc] p-2 text-xs font-semibold leading-5 text-slate-700">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#00A878]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-white bg-white p-4 shadow-[0_14px_36px_rgba(8,45,67,0.07)] ring-1 ring-slate-100">
            <h2 className="text-lg font-black text-[#071f3f]">Documents required</h2>
            <ul className="mt-3 grid gap-2">
              {college.documentChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-lg bg-[#f8fafc] p-2 text-xs font-semibold leading-5 text-slate-700">
                  <FileCheck2 size={15} className="mt-0.5 shrink-0 text-[#0F4CFF]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="px-4 pb-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-2xl border border-white bg-white p-4 shadow-[0_14px_36px_rgba(8,45,67,0.07)] ring-1 ring-slate-100">
            <h2 className="text-lg font-black text-[#071f3f]">FMGE 2025 reference</h2>
            <div className="mt-3 rounded-2xl bg-[linear-gradient(110deg,#031b35,#063b70)] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#51e6b3]">
                  <TrendingUp size={22} />
                </span>
                <p className="text-xs font-black uppercase tracking-wide text-[#51e6b3]">
                  {college.fmge.sourceName}
                </p>
              </div>
              {college.fmge.appeared === null || college.fmge.passed === null ? (
                <p className="mt-2 text-2xl font-black">Verify separately</p>
              ) : (
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-white/10 p-2.5">
                    <p className="text-xl font-black text-[#51e6b3]">{college.fmge.appeared}</p>
                    <p className="text-[10px] font-bold text-blue-100">Appeared</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-2.5">
                    <p className="text-xl font-black text-[#51e6b3]">{college.fmge.passed}</p>
                    <p className="text-[10px] font-bold text-blue-100">Passed</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-2.5">
                    <p className="text-xl font-black text-[#51e6b3]">{college.fmge.passRate}</p>
                    <p className="text-[10px] font-bold text-blue-100">Pass rate</p>
                  </div>
                </div>
              )}
            </div>
          </article>

          <article className="rounded-2xl border border-red-200 bg-[linear-gradient(145deg,#fff7f7,#fff)] p-4 shadow-[0_14px_36px_rgba(127,29,29,0.06)]">
            <h2 className="flex items-center gap-2 text-lg font-black text-red-900">
              <ShieldAlert size={20} />
              Verification warning
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-red-950">
              {bangladeshFinalDisclaimer}
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {college.warnings.map((warning) => (
                <li key={warning} className="flex items-start gap-2 rounded-xl border border-red-100 bg-white/70 p-2 text-xs font-semibold leading-5 text-red-950">
                  <ShieldCheck size={15} className="mt-0.5 shrink-0 text-red-700" />
                  {warning}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl bg-[linear-gradient(110deg,#031b35,#063b70)] p-4 text-white shadow-[0_20px_56px_rgba(3,27,53,0.18)] sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#51e6b3]">
                Need written verification?
              </p>
              <h2 className="mt-1.5 text-xl font-black sm:text-2xl">
                Verify {college.name} before payment
              </h2>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-blue-100">
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
