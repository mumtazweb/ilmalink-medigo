import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileCheck2,
  GraduationCap,
  Languages,
  Layers3,
  Link as LinkIcon,
  MapPin,
  Route,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TableProperties,
  Trophy,
  UsersRound,
} from "lucide-react";

import JsonLd from "../components/JsonLd";
import Navbar from "../components/navbar";
import {
  neet2026Courses,
  neet2026CurrentStatus,
  neet2026Eligibility,
  neet2026ExamDayDocuments,
  neet2026Fees,
  neet2026KolkataResidentialInstitute,
  neet2026Languages,
  neet2026MccReservation,
  neet2026OfficialLinks,
  neet2026Pattern,
  neet2026ProhibitedItems,
  neet2026QualifyingPercentiles,
  neet2026ResultProcess,
  neet2026ScoringRules,
  neet2026StudentFlow,
  neet2026Timeline,
} from "../data/neet2026";
import { buildBreadcrumbSchema, buildFAQSchema } from "../lib/schema";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "NEET UG 2026 Bulletin Hub | Subjects, Courses, Reservation & Kolkata Institute",
  description:
    "Crawlable NEET UG 2026 guide with re-exam update, subjects, 720-mark pattern, courses offered, eligibility, fees, qualifying percentiles, SC/ST/OBC/EWS/PwBD reservation, admit card, result and a separate Kolkata residential NEET institute link.",
  keywords: [
    "NEET UG 2026",
    "NEET subjects Physics Chemistry Biology",
    "NEET courses offered MBBS BDS BAMS BHMS BUMS BSMS",
    "NEET SC reservation 15%",
    "NEET OBC reservation 27%",
    "NEET EWS reservation 10%",
    "NEET UG Kolkata residential institute",
    "Best NEET-UG preparation Institute in Kolkata residential",
  ],
  alternates: {
    canonical: "https://www.ilmalink.com/neet",
  },
  openGraph: {
    title: "NEET UG 2026 Bulletin Hub | ILMALINK MEDIGO",
    description:
      "Official-data NEET UG 2026 hub with small crawlable sections for subjects, courses, eligibility, reservation, result, counselling and Kolkata residential preparation.",
    url: "https://www.ilmalink.com/neet",
    type: "article",
  },
  other: {
    "geo.region": "IN-WB",
    "geo.placename": "Kolkata, West Bengal, India",
    "content-topic":
      "NEET UG 2026, medical entrance exam, Kolkata residential NEET preparation",
  },
};

const routes = [
  {
    title: "Admit Card & Exam Day",
    href: "/neet/admit-card",
    description:
      "Current admit-card status, reporting time, documents, dress code and permitted items.",
    icon: FileCheck2,
  },
  {
    title: "Result & Answer Key",
    href: "/neet/result",
    description:
      "Understand OMR display, answer-key challenge, rank preparation and official result access.",
    icon: GraduationCap,
  },
  {
    title: "Counselling",
    href: "/neet/counselling",
    description:
      "Follow MCC and state counselling routes, reservation rules, notices and schedules.",
    icon: MapPin,
  },
] as const;

const heroStats = [
  {
    icon: CalendarDays,
    label: "Re-examination",
    value: neet2026CurrentStatus.date,
  },
  {
    icon: Clock3,
    label: "Exam window",
    value: neet2026CurrentStatus.examWindow,
  },
  {
    icon: TableProperties,
    label: "Total marks",
    value: "720 marks",
  },
  {
    icon: MapPin,
    label: "Coverage",
    value: neet2026CurrentStatus.reach,
  },
] as const;

const quickAnswerLinks = [
  {
    label: "NEET subjects",
    href: "#neet-subjects-and-marks",
    detail: "Physics, Chemistry, Biology",
  },
  {
    label: "Courses offered",
    href: "#neet-courses-offered",
    detail: "MBBS, BDS, BAMS, BSMS, BUMS, BHMS",
  },
  {
    label: "SC reservation",
    href: "#neet-reservation",
    detail: "SC / Scheduled Caste: 15%",
  },
  {
    label: "Qualifying percentile",
    href: "#neet-qualifying-percentiles",
    detail: "General 50th, reserved 40th",
  },
  {
    label: "Kolkata residential institute",
    href: "#neet-kolkata-residential-institute",
    detail: "Separate Mumtaz link",
  },
  {
    label: "Admit-card documents",
    href: "#neet-admit-card-documents",
    detail: "NTA portal, ID, photos, certificates",
  },
] as const;

const faqs = [
  {
    question: "What is the current NEET UG 2026 examination date?",
    answer:
      "The February 2026 information bulletin originally listed 3 May 2026. Subsequent NTA notices scheduled the NEET UG 2026 re-examination for 21 June 2026 from 2:00 PM to 5:15 PM IST, including 15 minutes for formalities.",
  },
  {
    question: "What are the NEET UG 2026 subjects and marks?",
    answer:
      "NEET UG 2026 has Physics with 45 questions for 180 marks, Chemistry with 45 questions for 180 marks, and Biology with 90 questions for 360 marks. The total is 180 compulsory questions for 720 marks.",
  },
  {
    question: "What is the SC reservation percentage in NEET counselling?",
    answer:
      "The MCC/DGHS reservation snapshot listed on this page shows Scheduled Caste or SC reservation as 15% under the relevant central counselling framework.",
  },
  {
    question: "Which courses are listed for NEET-based undergraduate admission?",
    answer:
      "The NEET-based course section lists MBBS, BDS, BAMS, BSMS, BUMS and BHMS. Students must verify the current counselling authority and participating institution rules before applying.",
  },
  {
    question: "Does NEET qualification alone guarantee an MBBS seat?",
    answer:
      "No. Admission depends on rank, category, domicile, counselling authority, seat matrix, document eligibility, choice filling, round and institutional rules.",
  },
] as const;

function absoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  return `https://www.ilmalink.com${pathOrUrl}`;
}

function SectionHeading({
  eyebrow,
  id,
  title,
  description,
}: {
  eyebrow: string;
  id: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-4xl">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0F766E]">
        {eyebrow}
      </p>
      <h2 id={id} className="mt-2 text-3xl font-black text-[#061D3F] md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 md:text-base">
        {description}
      </p>
    </div>
  );
}

function reservationLabel(category: string) {
  if (category === "Scheduled Caste") return "SC / Scheduled Caste";
  if (category === "Scheduled Tribe") return "ST / Scheduled Tribe";
  return category;
}

export default function NeetHubPage() {
  const totalQuestions = neet2026Pattern.reduce(
    (sum, item) => sum + item.questions,
    0,
  );
  const totalMarks = neet2026Pattern.reduce(
    (sum, item) => sum + item.marks,
    0,
  );
  const totalCourses = neet2026Courses.length;
  const totalLanguages = neet2026Languages.length;
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://www.ilmalink.com/neet#neet-courses-offered",
    name: "NEET UG courses offered and counselling routes",
    itemListElement: neet2026Courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: `${course.code} - ${course.name}`,
        description: course.counsellingRoute,
        provider: {
          "@id": "https://www.ilmalink.com/#educationalorganization",
        },
      },
    })),
  };
  const instituteSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://www.ilmalink.com/neet#neet-kolkata-residential-institute",
    name: neet2026KolkataResidentialInstitute.name,
    url: neet2026KolkataResidentialInstitute.href,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
    description: neet2026KolkataResidentialInstitute.description,
    knowsAbout: neet2026KolkataResidentialInstitute.searchPhrases,
  };
  const bulletinSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": "https://www.ilmalink.com/neet#neet-ug-2026-bulletin-data",
    name: "NEET UG 2026 bulletin data summary",
    url: "https://www.ilmalink.com/neet",
    isBasedOn: absoluteUrl(neet2026OfficialLinks.bulletin),
    about: [
      "NEET UG 2026 subjects",
      "NEET UG 2026 courses offered",
      "NEET UG 2026 qualifying percentiles",
      "NEET UG 2026 MCC reservation",
      "NEET UG 2026 result process",
    ],
  };

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "NEET UG 2026", url: "/neet" },
          ]),
          buildFAQSchema([...faqs]),
          courseSchema,
          instituteSchema,
          bulletinSchema,
        ]}
      />

      <main className="min-h-screen overflow-x-hidden bg-[#F5F7FB] text-slate-950">
        <Navbar />

        <section
          id="neet-official-update"
          className="relative isolate overflow-hidden bg-[#061D3F] px-4 py-10 text-white sm:px-6 lg:px-8"
        >
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#061D3F_0%,#0B3B5D_46%,#103D4A_100%)]" />
          <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/25 bg-emerald-200/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#BFFFF0]">
                <SearchCheck className="h-4 w-4" />
                Official bulletin + later NTA notices
              </span>
              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight md:text-6xl">
                NEET UG 2026 Information Hub for Students
              </h1>
              <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-200 md:text-lg">
                Small, searchable sections for the exact NEET facts students ask
                about: subjects, marks, courses offered, age eligibility,
                application fees, qualifying percentile, SC/ST/OBC/EWS/PwBD
                reservation, admit-card documents, result process and official
                links.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={neet2026OfficialLinks.portal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#00C896] px-5 py-3 text-sm font-extrabold !text-[#031525] shadow-[0_16px_38px_rgba(0,200,150,0.24)] transition hover:-translate-y-0.5 hover:bg-[#12dfad]"
                >
                  Open official NTA portal
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={neet2026OfficialLinks.bulletin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-extrabold !text-white transition hover:border-[#BFFFF0]"
                >
                  View official bulletin
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="[perspective:1200px]">
              <div className="grid gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.22)] backdrop-blur [transform:rotateX(4deg)_rotateY(-5deg)] sm:grid-cols-2">
                {heroStats.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="min-h-36 rounded-xl border border-white/15 bg-white/[0.09] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                  >
                    <Icon className="h-6 w-6 text-[#7FF0CA]" />
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-blue-100">
                      {label}
                    </p>
                    <p className="mt-1 text-lg font-black leading-6 text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
              <p className="text-sm font-semibold leading-7 text-amber-950">
                The original bulletin date of 3 May 2026 was superseded by
                later NTA re-examination notices. For any live action, follow the
                latest dated notice and the details printed on the current admit
                card.
              </p>
            </div>
          </div>
        </section>

        <section
          id="neet-quick-answer-map"
          className="px-4 py-10 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Exact-answer map"
              id="neet-small-search-units"
              title="Every major NEET fact has a small crawlable unit"
              description="These anchor links are built for students, SEO, GEO, AI summaries and ILMALINK global search. Each link opens the exact section instead of a generic NEET page."
            />
            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {quickAnswerLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-28 items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(8,27,53,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#00C896]/60 hover:shadow-[0_18px_40px_rgba(8,27,53,0.10)]"
                >
                  <span>
                    <span className="block text-sm font-black text-[#061D3F]">
                      {item.label}
                    </span>
                    <span className="mt-2 block text-xs font-semibold leading-5 text-slate-600">
                      {item.detail}
                    </span>
                  </span>
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#0F766E] transition group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          id="neet-kolkata-residential-institute"
          className="border-y border-slate-200 bg-[#FFF8EA] px-4 py-10 sm:px-6 lg:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Kolkata residential preparation"
                id="best-neet-ug-preparation-institute-in-kolkata-residential"
                title={neet2026KolkataResidentialInstitute.heading}
                description="The old navbar link has been removed from the NEET menu and placed here as a separate, clear institute reference. The rest of this page remains ILMALINK's NEET UG 2026 bulletin-data hub."
              />
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={neet2026KolkataResidentialInstitute.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#8B5CF6] px-5 py-3 text-sm font-extrabold !text-white shadow-[0_16px_34px_rgba(139,92,246,0.22)] transition hover:-translate-y-0.5 hover:bg-[#7C3AED]"
                >
                  Visit Mumtaz Education
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="#neet-subjects-and-marks"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#8B5CF6]/25 bg-white px-5 py-3 text-sm font-extrabold text-[#5B21B6] transition hover:bg-violet-50"
                >
                  Continue NEET bulletin guide
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="[perspective:1000px]">
              <article className="rounded-2xl border border-amber-200 bg-white p-5 shadow-[0_24px_60px_rgba(120,53,15,0.14)] transition duration-300 hover:[transform:rotateX(2deg)_rotateY(2deg)_translateY(-4px)]">
                <Sparkles className="h-8 w-8 text-[#8B5CF6]" />
                <h3 className="mt-4 text-2xl font-black text-[#061D3F]">
                  {neet2026KolkataResidentialInstitute.name}
                </h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">
                  {neet2026KolkataResidentialInstitute.description}
                </p>
                <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-violet-50 p-4">
                    <dt className="text-xs font-black uppercase tracking-[0.12em] text-violet-700">
                      Location intent
                    </dt>
                    <dd className="mt-1 text-sm font-black text-[#061D3F]">
                      {neet2026KolkataResidentialInstitute.location}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-4">
                    <dt className="text-xs font-black uppercase tracking-[0.12em] text-amber-700">
                      Search intent
                    </dt>
                    <dd className="mt-1 text-sm font-black text-[#061D3F]">
                      Residential NEET-UG preparation
                    </dd>
                  </div>
                </dl>
              </article>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Student visual flow"
              id="neet-visual-flow"
              title="NEET UG 2026 preparation-to-counselling flow"
              description="A simple student-friendly journey from eligibility to counselling, with every stage connected to a deeper section on this page."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-5">
              {neet2026StudentFlow.map((item, index) => (
                <article
                  key={item.step}
                  className="relative min-h-52 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(8,27,53,0.07)] transition hover:-translate-y-1"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#061D3F] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-base font-black text-[#061D3F]">
                    {item.step}
                  </h3>
                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                    {item.detail}
                  </p>
                  {index < neet2026StudentFlow.length - 1 ? (
                    <Route className="absolute -right-3 top-8 hidden h-6 w-6 text-[#00A878] md:block" />
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Official timeline"
              id="neet-timeline"
              title="NEET UG 2026 dates and current status"
              description="Timeline facts are separated into rows so search engines and site search can associate each event with the exact date and status."
            />
            <div className="mt-6 grid gap-3">
              {neet2026Timeline.map((item) => (
                <article
                  key={item.event}
                  className="grid gap-3 rounded-lg border border-slate-200 bg-[#F8FAFC] p-4 md:grid-cols-[1fr_1fr_160px] md:items-center"
                >
                  <div>
                    <h3 className="font-black text-[#061D3F]">{item.event}</h3>
                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                      {item.note}
                    </p>
                  </div>
                  <p className="text-sm font-extrabold text-slate-800">
                    {item.date}
                  </p>
                  <span className="w-fit rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-slate-700">
                    {item.status}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <BookOpenCheck className="h-7 w-7 text-[#0F766E]" />
              <h2
                id="neet-subjects-and-marks"
                className="mt-3 text-3xl font-black text-[#061D3F]"
              >
                NEET subjects and marks: {totalQuestions} questions for{" "}
                {totalMarks} marks
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                Exact NEET UG subject split for search: Physics, Chemistry and
                Biology. Biology includes Botany and Zoology.
              </p>
              <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                  <thead className="bg-[#061D3F] text-white">
                    <tr>
                      <th className="px-4 py-3 font-black">Subject</th>
                      <th className="px-4 py-3 font-black">Questions</th>
                      <th className="px-4 py-3 font-black">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {neet2026Pattern.map((item) => (
                      <tr key={item.subject} className="border-t border-slate-200">
                        <td className="px-4 py-3 font-extrabold text-[#061D3F]">
                          {item.subject}
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-700">
                          {item.questions}
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-700">
                          {item.marks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {neet2026ScoringRules.map((item) => (
                  <div key={item.label} className="rounded-lg bg-[#EEF6FF] p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xl font-black text-[#061D3F]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-slate-200 bg-[#061D3F] p-5 text-white shadow-sm sm:p-6">
              <Languages className="h-7 w-7 text-[#7FF0CA]" />
              <h2 id="neet-languages" className="mt-3 text-2xl font-black">
                {totalLanguages} NEET question-paper media
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-blue-100">
                English-only papers are provided for English selection. Hindi
                and regional-language choices are bilingual with English. The
                English version is final if a translation is ambiguous.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {neet2026Languages.map((language) => (
                  <span
                    key={language}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Courses offered"
              id="neet-courses-offered"
              title={`${totalCourses} NEET-based undergraduate course routes`}
              description="This section gives exact course names and abbreviations so queries such as MBBS, BDS, BAMS, BSMS, BUMS or BHMS can land here."
            />
            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {neet2026Courses.map((course) => (
                <article
                  key={course.code}
                  id={`neet-course-${course.code.toLowerCase()}`}
                  className="min-h-48 rounded-lg border border-slate-200 bg-[#F8FAFC] p-5 transition hover:-translate-y-1 hover:border-[#00C896]/60 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-2xl font-black text-[#061D3F]">
                      {course.code}
                    </h3>
                    <Stethoscope className="h-5 w-5 text-[#0F766E]" />
                  </div>
                  <p className="mt-2 text-sm font-black leading-6 text-slate-800">
                    {course.name}
                  </p>
                  <p className="mt-3 text-xs font-semibold leading-5 text-slate-600">
                    {course.counsellingRoute}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Eligibility"
              id="neet-eligibility"
              title="Core NEET UG 2026 eligibility points"
              description="Age, qualifying subjects, result-awaited status and foreign medical study requirements are split into individual readable units."
            />
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {neet2026Eligibility.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00A878]" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <Layers3 className="h-6 w-6 text-[#0F766E]" />
              <h2 id="neet-application-fees" className="mt-3 text-xl font-black text-[#061D3F]">
                NEET UG 2026 application fee
              </h2>
              <div className="mt-4 grid gap-3">
                {neet2026Fees.map((item) => (
                  <div
                    key={item.category}
                    className="flex items-center justify-between gap-3 rounded-lg bg-[#F4F7FB] p-3"
                  >
                    <p className="text-xs font-bold leading-5 text-slate-700">
                      {item.category}
                    </p>
                    <p className="shrink-0 font-black text-[#047857]">
                      {item.india}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <Trophy className="h-6 w-6 text-[#1D4ED8]" />
              <h2 id="neet-qualifying-percentiles" className="mt-3 text-xl font-black text-[#061D3F]">
                Minimum qualifying percentile
              </h2>
              <div className="mt-4 grid gap-3">
                {neet2026QualifyingPercentiles.map((item) => (
                  <div
                    key={item.category}
                    className="rounded-lg border border-slate-200 p-3"
                  >
                    <p className="text-xs font-bold text-slate-600">
                      {item.category}
                    </p>
                    <p className="mt-1 font-black text-[#1D4ED8]">
                      {item.percentile}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <UsersRound className="h-6 w-6 text-[#8B5CF6]" />
              <h2 id="neet-reservation" className="mt-3 text-xl font-black text-[#061D3F]">
                MCC/DGHS reservation snapshot
              </h2>
              <div className="mt-4 grid gap-3">
                {neet2026MccReservation.map((item) => (
                  <div
                    key={item.category}
                    className="flex items-start justify-between gap-3 rounded-lg bg-[#F4F7FB] p-3"
                  >
                    <p className="text-xs font-bold text-slate-700">
                      {reservationLabel(item.category)}
                    </p>
                    <p className="max-w-[55%] text-right text-xs font-black text-[#061D3F]">
                      {item.share}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <FileCheck2 className="h-7 w-7 text-[#0F766E]" />
              <h2
                id="neet-admit-card-documents"
                className="mt-3 text-2xl font-black text-[#061D3F]"
              >
                NEET admit-card documents and exam-day items
              </h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-black text-[#061D3F]">
                    Documents to carry
                  </h3>
                  <ul className="mt-3 grid gap-2">
                    {neet2026ExamDayDocuments.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs font-semibold leading-5 text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00A878]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#061D3F]">
                    Prohibited items
                  </h3>
                  <ul className="mt-3 grid gap-2">
                    {neet2026ProhibitedItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs font-semibold leading-5 text-slate-700"
                      >
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link
                href="/neet/admit-card"
                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#0F766E]"
              >
                Open full admit-card guide
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <GraduationCap className="h-7 w-7 text-[#1D4ED8]" />
              <h2
                id="neet-result-process"
                className="mt-3 text-2xl font-black text-[#061D3F]"
              >
                NEET result, OMR and answer-key process
              </h2>
              <ol className="mt-5 grid gap-3">
                {neet2026ResultProcess.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-lg bg-[#EEF6FF] p-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm font-semibold leading-6 text-slate-700">
                      {item}
                    </p>
                  </li>
                ))}
              </ol>
              <Link
                href="/neet/result"
                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#1D4ED8]"
              >
                Open full result guide
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Related NEET guides"
              id="neet-related-guides"
              title="Open the exact NEET sub-page"
              description="Admit card, result and counselling have their own pages so students and search engines can reach the exact task."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#00C896]/60 hover:shadow-lg"
                >
                  <route.icon className="h-7 w-7 text-[#047857]" />
                  <h3 className="mt-4 text-xl font-black text-[#061D3F]">
                    {route.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    {route.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#047857]">
                    Open guide
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="neet-official-links" className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-2xl bg-[linear-gradient(110deg,#061D3F,#0B4775)] p-5 text-white shadow-xl sm:p-7">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <ShieldCheck className="h-8 w-8 text-[#7FF0CA]" />
                <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                  Use NTA and MCC as the final authority
                </h2>
                <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-blue-100">
                  This page summarizes the NEET UG 2026 information bulletin and
                  subsequent NTA notices available through{" "}
                  {neet2026CurrentStatus.updated}. Candidate-specific
                  instructions, centre details, revised notices and counselling
                  rules on official portals take precedence.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={neet2026OfficialLinks.publicNotices}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-extrabold !text-[#061D3F]"
                >
                  Current NTA notices
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={neet2026OfficialLinks.mcc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-extrabold !text-white"
                >
                  MCC counselling portal
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={neet2026OfficialLinks.bulletin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-extrabold !text-white"
                >
                  Bulletin source
                  <LinkIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
