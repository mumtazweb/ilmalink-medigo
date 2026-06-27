import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  FileWarning,
  GraduationCap,
  Landmark,
  MapPin,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import VerificationCounsellingCard from "../../components/VerificationCounsellingCard";

export const dynamic = "force-static";

const canonicalUrl = "https://www.ilmalink.com/mbbs-abroad/nepal";
const counsellingHref = "/?counselling=open";

export const metadata: Metadata = {
  title:
    "MBBS in Nepal 2026 | Eligibility, MECEE-BL, NEET & Colleges | ilmaLink",
  description:
    "Study MBBS in Nepal with strict eligibility guidance for Indian students: individual PCB 50%, general NEET 50th percentile benchmark, MECEE-BL priority, limited foreign seats, MEC matching and college comparison.",
  keywords: [
    "MBBS in Nepal 2026",
    "Nepal MBBS eligibility for Indian students",
    "MECEE-BL Nepal MBBS",
    "Nepal MBBS NEET eligibility",
    "Nepal MBBS PCB 50 percent individual subjects",
    "Nepal MBBS colleges",
    "Medical Education Commission Nepal",
    "Nepal MBBS direct admission warning",
    "Nepal MBBS foreign seats",
    "Nepal MBBS for Indian students",
    "MBBS in Nepal from India",
    "MBBS in Nepal for West Bengal students",
    "Nepal medical colleges for Indian students",
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "MBBS in Nepal 2026 | Strict Eligibility & MECEE-BL Guidance",
    description:
      "Nepal MBBS is not a simple direct-admission route. Learn individual PCB 50%, general NEET 50th percentile benchmark, MECEE-BL priority, limited seats and college comparison.",
    url: canonicalUrl,
    siteName: "ilmaLink",
    type: "article",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "MBBS in Nepal 2026 | Eligibility, MECEE-BL & Colleges",
    description:
      "Strict Nepal MBBS eligibility guidance for Indian students by ilmalink.",
  },
};

const heroBadges = [
  "Strict MEC route",
  "Individual PCB 50%",
  "MECEE-BL priority",
  "Limited seats",
];

const pcbRequirements = [
  { subject: "Physics", requirement: "50% or above" },
  { subject: "Chemistry", requirement: "50% or above" },
  { subject: "Biology", requirement: "50% or above" },
];

const admissionFactors = [
  "MEC rules",
  "MECEE-BL route",
  "foreign seat availability",
  "merit position",
  "document verification",
  "university/institution matching",
  "official approval",
];

const keyInsights = [
  {
    title: "Not a simple direct-admission route",
    description:
      "Nepal MBBS should be planned through official MEC rules, entrance/matching updates and document checks.",
  },
  {
    title: "Individual PCB 50% safer benchmark",
    description:
      "ilmaLink checks Physics, Chemistry and Biology separately instead of relying only on aggregate marks.",
  },
  {
    title: "General NEET 50th percentile benchmark",
    description:
      "For Nepal, Indian students should not assume a reserved-category cutoff is safely accepted.",
  },
  {
    title: "MECEE-BL priority",
    description:
      "MECEE-BL appeared foreign candidates should be treated as the stronger Nepal route for matching.",
  },
  {
    title: "Limited foreign seats",
    description:
      "Foreign/Indian seat availability can change by program, category, institution and official notice.",
  },
  {
    title: "MEC matching and document verification",
    description:
      "Admission depends on merit, documents, seat category and official matching or approval.",
  },
  {
    title: "Higher eligibility risk than many MBBS abroad routes",
    description:
      "A student who looks eligible elsewhere may still be risky for Nepal if a strict MEC condition is not met.",
  },
  {
    title: "Close to India, but stricter admission route",
    description:
      "Geography is convenient for Indian families, but admission planning must stay MEC-controlled.",
  },
];

const nepalColleges = [
  {
    name: "B.P. Koirala Institute of Health Sciences (BPKIHS)",
    location: "Dharan",
  },
  {
    name: "Institute of Medicine (IOM), Maharajgunj Medical Campus",
    location: "Kathmandu",
  },
  {
    name: "Patan Academy of Health Sciences (PAHS)",
    location: "Lalitpur",
  },
  {
    name: "Kathmandu University School of Medical Sciences (KUSMS)",
    location: "Dhulikhel",
  },
  {
    name: "Nepalese Army Institute of Health Sciences (NAIHS)",
    location: "Kathmandu",
  },
  { name: "Kathmandu Medical College (KMC)", location: "Kathmandu" },
  { name: "Nepal Medical College", location: "Kathmandu/Jorpati" },
  {
    name: "Manipal College of Medical Sciences (MCOMS)",
    location: "Pokhara",
  },
  {
    name: "College of Medical Sciences (COMS)",
    location: "Bharatpur",
  },
  { name: "Nepalgunj Medical College", location: "Banke/Nepalgunj" },
  { name: "Lumbini Medical College", location: "Palpa" },
  { name: "Nobel Medical College", location: "Biratnagar" },
  { name: "Birat Medical College", location: "Biratnagar" },
  { name: "Chitwan Medical College", location: "Bharatpur" },
  {
    name: "Universal College of Medical Sciences (UCMS)",
    location: "Bhairahawa",
  },
  { name: "Gandaki Medical College", location: "Pokhara" },
  { name: "KIST Medical College", location: "Lalitpur" },
  { name: "Janaki Medical College", location: "Janakpur" },
  { name: "National Medical College", location: "Birgunj" },
  { name: "Devdaha Medical College", location: "Rupandehi" },
];

const riskTags = [
  "Verify MEC seat",
  "Entrance/matching required",
  "Limited foreign seat",
  "No guaranteed admission",
];

const complianceChecklist = [
  "NEET qualification for Indian students",
  "Minimum 54-month medical course requirement where applicable",
  "Internship structure and clinical training verification",
  "English-medium academic and clinical instruction",
  "WDOMS listing",
  "Local registration/licence eligibility in Nepal",
  "NMC/FMGL Regulation 2021 compliance",
  "University/college recognition and MEC status",
  "Latest admission letter, fee structure and document verification",
];

const officialSources = [
  {
    label: "MEC entrance portal",
    href: "https://entrance.mec.gov.np/",
  },
  {
    label: "MEC college seat distribution",
    href: "https://entrance.mec.gov.np/Report/CollegeSeatInfo/List",
  },
  {
    label: "Nepal Medical Council",
    href: "https://www.nmc.org.np/",
  },
];

const faqs = [
  {
    question: "Is Nepal MBBS direct admission possible for Indian students?",
    answer:
      "Practically, Nepal should not be treated as a direct-admission route. MECEE-BL appeared candidates get priority. NEET-only foreign consideration is conditional and seat-dependent.",
  },
  {
    question: "Does Nepal accept Indian reserved-category NEET cutoff?",
    answer:
      "Students should not assume that Nepal accepts only Indian reserved-category NEET qualification. Medigo, an extension/service line of ilmalink, uses the general NEET 50th percentile benchmark for Nepal's foreign NEET-based route unless MEC issues fresh official clarification.",
  },
  {
    question: "Is PCB aggregate 50% enough for Nepal MBBS?",
    answer:
      "For safe counselling, no. Medigo, an extension/service line of ilmalink, checks minimum 50% individually in Physics, Chemistry and Biology, along with any MEC/university aggregate or CGPA requirement.",
  },
  {
    question: "Are seats limited in Nepal?",
    answer:
      "Yes. Foreign/Indian seats are limited and depend on MEC rules, merit, documents, matching and university availability.",
  },
  {
    question: "Is Nepal easier than Kyrgyzstan?",
    answer:
      "No. Nepal is stricter because it is controlled by MEC entrance/matching. Kyrgyzstan is comparatively simpler if NEET, PCB, university accreditation and NMC/FMGL compliance are satisfied.",
  },
  {
    question: "Should Indian students sit for MECEE-BL?",
    answer:
      "For a realistic Nepal MBBS plan, Indian students should seriously consider the MECEE-BL route because MECEE-BL appeared foreign candidates get priority in matching. NEET-only consideration is conditional and limited.",
  },
];

const jsonLd = JSON.stringify([
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
        item: "https://www.ilmalink.com/mbbs-abroad",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "MBBS in Nepal",
        item: canonicalUrl,
      },
    ],
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
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    mainEntityOfPage: canonicalUrl,
    headline:
      "MBBS in Nepal 2026: Strict Eligibility, MECEE-BL, NEET and Colleges",
    description:
      "Strict Nepal MBBS guidance for Indian students covering individual PCB 50%, general NEET 50th percentile benchmark, MECEE-BL priority, limited foreign seats and MEC matching.",
    url: canonicalUrl,
    inLanguage: "en-IN",
    publisher: {
      "@id": "https://www.ilmalink.com/#organization",
    },
  },
]).replace(/</g, "\\u003c");

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#047857]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-[#031525] md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-4xl text-sm font-medium leading-7 text-slate-700 md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CtaLink({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={counsellingHref}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#00C896] px-5 py-3 text-sm font-extrabold text-[#031525] transition hover:bg-[#12dfad] ${className}`}
    >
      {children}
      <ArrowRight size={16} />
    </a>
  );
}

export default function NepalPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <section className="bg-[#031525] px-4 pb-12 pt-28 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Link
              href="/mbbs-abroad"
              className="inline-flex rounded-lg border border-white/15 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#5EEAD4] transition hover:border-[#5EEAD4]"
            >
              MBBS Abroad Guidance
            </Link>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-normal md:text-6xl">
              MBBS in Nepal 2026
            </h1>
            <p className="mt-5 max-w-4xl text-base font-medium leading-7 text-slate-200 md:text-lg md:leading-8">
              Nepal MBBS for Indian students is stricter than many MBBS-abroad
              destinations. It should be planned through the Nepal Medical
              Education Commission, MECEE-BL priority, limited foreign seats,
              MEC matching, document verification and a careful NEET/PCB
              eligibility check.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {heroBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-lg border border-[#00C896]/30 bg-[#00C896]/10 px-3 py-1.5 text-xs font-extrabold text-[#A7F3D0]"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink>Check Nepal Eligibility</CtaLink>
              <a
                href="#nepal-colleges"
                className="inline-flex items-center justify-center rounded-lg border border-white/25 px-5 py-3 text-sm font-extrabold text-white transition hover:border-[#00C896]"
              >
                Compare Colleges
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/10 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-20 overflow-hidden rounded-lg border border-white/20 bg-white">
                <img
                  src="https://flagcdn.com/w160/np.png"
                  alt="Nepal flag"
                  className="h-full w-full object-cover"
                />
              </span>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#5EEAD4]">
                  Route type
                </p>
                <h2 className="text-2xl font-extrabold tracking-normal">
                  MEC-controlled
                </h2>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                "NEET-only consideration is conditional, limited and seat-dependent.",
                "MECEE-BL appeared foreign candidates get priority in matching.",
                "Verify from latest MEC notice / official university source before admission.",
              ].map((item) => (
                <p
                  key={item}
                  className="rounded-lg border border-white/10 bg-white/10 p-3 text-sm font-semibold leading-6 text-slate-100"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border-2 border-red-300 bg-gradient-to-br from-red-50 via-amber-50 to-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-700">
              <AlertTriangle size={26} />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-red-700">
                Read before shortlisting
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-red-950 md:text-4xl">
                Important Nepal MBBS Warning for Indian Students
              </h2>
              <p className="mt-4 max-w-5xl text-sm font-semibold leading-7 text-red-950 md:text-base">
                Nepal MBBS should not be treated like a normal direct-admission
                MBBS-abroad route. Nepal does not safely work on only PCB
                aggregate 50%, and students should have minimum 50%
                individually in Physics, Chemistry and Biology. Nepal&apos;s foreign
                NEET-based route should be planned with the general NEET 50th
                percentile benchmark, not merely the Indian reserved-category
                cutoff. Seats are limited, MECEE-BL candidates get priority,
                and NEET-only admission is conditional and seat-dependent. For
                a realistic Nepal MBBS plan, students should verify current MEC
                rules and prepare for the Nepal entrance/matching route.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {[
                  "Do not rely on PCB aggregate alone.",
                  "Do not assume reserved-category NEET cutoff is enough.",
                  "Do not treat Nepal like a guaranteed direct-admission route.",
                  "Prepare for MEC rules, MECEE-BL priority and seat matching.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-lg border border-red-200 bg-white/75 p-3 text-sm font-bold leading-6 text-red-950"
                  >
                    <ShieldAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-700" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <CtaLink className="mt-6">Ask ilmaLink Counsellor</CtaLink>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#047857]">
              Short answer
            </p>
            <p className="mt-3 text-lg font-extrabold leading-7 text-[#031525]">
              Nepal MBBS is not a simple direct-admission route for Indian
              students. Students should plan with individual PCB 50%, general
              NEET 50th percentile benchmark, MECEE-BL priority, limited seats
              and MEC matching.
            </p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1D4ED8]">
              Eligibility snapshot
            </p>
            <p className="mt-3 text-lg font-extrabold leading-7 text-[#031525]">
              Physics 50%+, Chemistry 50%+, Biology 50%+, general NEET 50th
              percentile benchmark, MEC/MECEE-BL route, document verification
              and seat availability.
            </p>
          </div>
        </div>
      </section>

      <section id="eligibility" className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Eligibility"
            title="Nepal MBBS Eligibility for Indian Students"
            description="Nepal MBBS counselling from Kolkata, Bengaluru, West Bengal, Karnataka, Maharashtra and other Indian states should start with a stricter eligibility screen than many common MBBS abroad routes."
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-[#047857]">
                  <ClipboardCheck size={22} />
                </span>
                <h3 className="text-xl font-extrabold text-[#031525]">
                  Individual PCB 50%
                </h3>
              </div>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-700">
                For Nepal MBBS counselling, Medigo, an extension/service line of ilmalink, uses a safer
                eligibility benchmark of minimum 50% individually in Physics,
                Chemistry and Biology. Students should also satisfy the latest
                MEC/university aggregate or CGPA requirement where applicable.
              </p>
              <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-950">
                A student may become risky for Nepal even if PCB aggregate
                appears acceptable, if any one PCB subject is below 50%.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {pcbRequirements.map((item) => (
                <div
                  key={item.subject}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
                    {item.subject}
                  </p>
                  <p className="mt-3 text-3xl font-extrabold text-[#031525]">
                    {item.requirement}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <h3 className="text-xl font-extrabold text-[#031525]">
                NEET general 50th percentile benchmark
              </h3>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
                For Nepal&apos;s foreign NEET-based route, Indian students should
                not assume that reserved-category NEET qualification is enough.
                Medigo, an extension/service line of ilmalink, uses the general NEET qualifying benchmark /
                50th percentile and above as the safer standard, unless Nepal
                Medical Education Commission issues fresh official
                clarification.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-[#031525] p-5 text-white shadow-sm">
              <h3 className="text-xl font-extrabold">Limited seats</h3>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-200">
                Foreign/Indian seats in Nepal are limited. NEET qualification
                alone does not guarantee admission.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-red-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-extrabold text-[#031525]">
              Direct admission is practically not possible
            </h3>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
              Nepal should not be advertised as a simple direct-admission
              country. MECEE-BL appeared candidates get first priority.
              NEET-only foreign consideration is conditional and usually
              depends on seats remaining after the MECEE-BL foreign-candidate
              matching process.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {admissionFactors.map((factor) => (
                <div
                  key={factor}
                  className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700"
                >
                  <CheckCircle2 size={16} className="text-[#047857]" />
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Decision notes"
            title="Key Insights Before Choosing Nepal MBBS"
            description="Students planning MBBS in Nepal from India should compare eligibility risk, entrance priority, official seat category and documents before paying any admission amount."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {keyInsights.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#ECFDF5] text-[#047857]">
                  <ShieldCheck size={21} />
                </span>
                <h3 className="mt-4 text-base font-extrabold leading-6 text-[#031525]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeading
            eyebrow="Country comparison"
            title="Why Nepal is stricter than Kyrgyzstan"
          />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-5">
              <h3 className="text-xl font-extrabold text-[#031525]">
                Kyrgyzstan
              </h3>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
                Kyrgyzstan MBBS admission is comparatively simpler for Indian
                students: NEET qualification under Indian/NMC rules, PCB
                eligibility, university admission, accreditation, WDOMS listing,
                English-medium delivery, local licence eligibility and NMC/FMGL
                compliance checks.
              </p>
              <p className="mt-4 rounded-lg bg-white p-3 text-sm font-extrabold text-[#031525]">
                Kyrgyzstan = eligibility + compliant university route.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
              <h3 className="text-xl font-extrabold text-amber-950">Nepal</h3>
              <p className="mt-3 text-sm font-medium leading-7 text-amber-950">
                Nepal is different. Nepal is an MEC-controlled route where
                individual PCB 50%, general NEET 50th percentile benchmark,
                MECEE-BL priority, limited foreign seats and official matching
                make admission much stricter.
              </p>
              <p className="mt-4 rounded-lg bg-white p-3 text-sm font-extrabold text-[#031525]">
                Nepal = eligibility + MEC entrance/matching route + limited
                seats.
              </p>
            </div>
          </div>
          <Link
            href="/mbbs-abroad/kyrgyzstan"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-extrabold text-[#031525] transition hover:border-[#00C896] hover:text-[#047857]"
          >
            Compare MBBS in Kyrgyzstan
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section id="nepal-colleges" className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="College comparison"
            title="Nepal MBBS Colleges & Institutions to Compare"
            description="College availability, seat category, seat count, affiliation and foreign-candidate matching must be verified from the latest MEC seat distribution and university/institution notice before admission. Listing a college here does not mean guaranteed admission."
          />
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-950">
            Verify from latest MEC notice / official university source before
            admission. Do not treat this list as a seat confirmation, ranking,
            fee promise or admission guarantee.
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {nepalColleges.map((college) => (
              <article
                key={college.name}
                className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#1D4ED8]">
                  <GraduationCap size={22} />
                </span>
                <h3 className="mt-4 text-base font-extrabold leading-6 text-[#031525]">
                  {college.name}
                </h3>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <MapPin size={15} className="text-[#047857]" />
                  {college.location}
                </p>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                  Verify MEC seat category, latest institution notice and
                  foreign-candidate matching status before admission.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {riskTags.map((tag) => (
                    <span
                      key={`${college.name}-${tag}`}
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={counsellingHref}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-[#031525] px-3 py-2.5 text-xs font-extrabold text-[#031525] transition hover:border-[#00C896] hover:text-[#047857]"
                >
                  Ask Counsellor
                  <ArrowRight size={14} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.7fr]">
          <div className="rounded-lg border border-slate-200 bg-[#031525] p-6 text-white shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-[#5EEAD4]">
                <BookOpenCheck size={24} />
              </span>
              <h2 className="text-2xl font-extrabold tracking-normal md:text-3xl">
                NMC/FMGL Compliance Checklist for Nepal MBBS
              </h2>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {complianceChecklist.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-lg border border-white/10 bg-white/10 p-3 text-sm font-semibold leading-6 text-slate-100"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 flex-shrink-0 text-[#5EEAD4]"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-lg border border-white/10 bg-white/10 p-4 text-sm font-semibold leading-6 text-slate-200">
              This checklist supports admission due diligence only. It does not
              guarantee FMGE/NExT result, future registration, visa approval or
              admission.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#ECFDF5] text-[#047857]">
                <Landmark size={24} />
              </span>
              <h2 className="text-2xl font-extrabold tracking-normal text-[#031525]">
                Official sources to check
              </h2>
            </div>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-700">
              The MEC entrance portal publishes MECEE-BL notices and the college
              seat distribution page exposes foreign categories including
              MECEE-BL and conditional non-MECEE-BL routes. Nepal Medical
              Council should be checked for council notices, registration and
              licensing context.
            </p>
            <div className="mt-5 grid gap-3">
              {officialSources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-extrabold text-[#031525] transition hover:border-[#00C896] hover:bg-white"
                >
                  <span>{source.label}</span>
                  <ArrowRight size={16} />
                </a>
              ))}
            </div>
            <p className="mt-5 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-950">
              <FileWarning className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <span>
                If any requirement is unclear, write it down as: Verify from
                latest MEC notice / official university source before admission.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-[#00C896]/30 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.6fr] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#047857]">
                Regional counselling
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-[#031525] md:text-3xl">
                Nepal MBBS guidance from Kolkata, Bengaluru and across India
              </h2>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-700 md:text-base">
                Students from West Bengal, Karnataka, Maharashtra and other
                Indian states can request Medigo service-line counselling under ilmalink before
                choosing Nepal, because Nepal&apos;s route is stricter than many
                other MBBS abroad destinations.
              </p>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-700 md:text-base">
                Indian students planning MBBS in Nepal, NEET qualified Indian
                students for Nepal MBBS, and families comparing Medical
                Education Commission Nepal rules should verify eligibility
                before paying college or processing charges.
              </p>
            </div>
            <div className="rounded-lg bg-[#031525] p-5 text-white">
              <h3 className="text-xl font-extrabold">Counselling focus</h3>
              <ul className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-slate-200">
                <li>Individual PCB 50% check</li>
                <li>General NEET 50th percentile benchmark</li>
                <li>MECEE-BL and MEC matching plan</li>
                <li>College verification before admission</li>
              </ul>
              <CtaLink className="mt-5 w-full">Open Counselling</CtaLink>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
          />
          <div className="mt-6 grid gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-extrabold leading-6 text-[#031525]">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VerificationCounsellingCard
        countryName="Nepal MBBS"
        title="Check Nepal MBBS eligibility before choosing a college"
        description="Medigo, an extension/service line of ilmalink, can screen individual PCB marks, NEET benchmark, MECEE-BL planning, MEC matching risk, document readiness, and college verification before admission."
        buttonLabel="Get Nepal MBBS Counselling"
      />
    </main>
  );
}
