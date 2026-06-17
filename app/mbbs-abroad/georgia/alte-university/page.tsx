import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  Globe2,
  GraduationCap,
  HeartPulse,
  Languages,
  MessageCircle,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";

import CounsellingActionButton from "../../../components/CounsellingActionButton";
import {
  georgiaFinalDisclaimer,
  getGeorgiaUniversityBySlug,
  type GeorgiaFeeRow,
  type GeorgiaUniversityPageData,
} from "../../../data/georgiaUniversities";

const alteData = getGeorgiaUniversityBySlug("alte-university");

if (!alteData) {
  throw new Error("ALTE University Georgia data is missing.");
}

const university: GeorgiaUniversityPageData = alteData;
const pageUrl = "https://www.ilmalink.com/mbbs-abroad/georgia/alte-university";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "ALTE University Georgia Fee Structure 2026 | MBBS (MD) Fees, FMGE 46.40% | ILMALINK MEDIGO",
  description:
    "ALTE University Tbilisi MBBS guide with 2026-2027 fee structure: annual tuition USD 5,950, six-year tuition USD 35,700, hostel and mess, NMC-compliant MD program, Ivane Bokeria University Hospital training, admission requirements, documents, and a 46.40% FMGE 2025 pass rate.",
  keywords: [
    "ALTE University Georgia fee structure",
    "ALTE University Tbilisi MBBS",
    "ALTE University MBBS fees 2026",
    "ALTE University Medical Doctor MD program",
    "ALTE University Georgia FMGE pass rate",
    "ALTE University hostel fees",
    "MBBS in Georgia ALTE University",
    "ALTE University NMC compliant MBBS",
    "ALTE University admission requirements",
    "ALTE University Ivane Bokeria hospital",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "ALTE University Georgia Fee Structure 2026 | MBBS (MD) Fees",
    description:
      "Semester-wise ALTE University Tbilisi fee table, hostel and mess, NMC-compliant MD program, Ivane Bokeria hospital training, and a 46.40% FMGE 2025 pass rate.",
    url: pageUrl,
    siteName: "ILMALINK MEDIGO",
    images: [
      {
        url: "/georgia/alte-university-hero.jpg",
        width: 1730,
        height: 1120,
        alt: "ALTE University Georgia medical students with a clinical instructor",
      },
    ],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALTE University Georgia Fee Structure 2026 | MBBS (MD) Fees",
    description:
      "ALTE University Tbilisi MBBS fees, hostel and mess, NMC-compliant MD program, and 46.40% FMGE 2025 pass rate.",
    images: ["/georgia/alte-university-hero.jpg"],
  },
  other: {
    "geo.region": "GE-TB",
    "geo.placename": "Tbilisi, Georgia",
    "geo.position": "41.7497;44.7714",
    ICBM: "41.7497, 44.7714",
    "content-language": "en-IN",
  },
};

const courseHighlights = [
  {
    icon: Microscope,
    title: "Advanced simulation labs",
    body: "High-tech teaching labs, OSCE training centres, and modern medical research facilities for practical learning.",
  },
  {
    icon: Stethoscope,
    title: "Clinical exposure from day one",
    body: "Strong emphasis on patient care and clinical skills, with internships in affiliated hospitals.",
  },
  {
    icon: GraduationCap,
    title: "FMGE / USMLE / PLAB training",
    body: "Special licensing-exam coaching from the first year, mapped to a latest NMC-compliant MBBS curriculum.",
  },
  {
    icon: Globe2,
    title: "Globally recognized",
    body: "Accredited global programs with exposure to modern medical technologies and 50 nationalities on campus.",
  },
];

const accreditations = [
  { label: "World Health Organization", short: "WHO" },
  { label: "World Federation for Medical Education", short: "WFME" },
  { label: "Medical Council of India / NMC framework", short: "NMC / MCI" },
  { label: "European Quality Assurance Register", short: "ENQA" },
  { label: "Association for Medical Education in Europe", short: "AMEE" },
  { label: "Educational Commission for Foreign Medical Graduates", short: "ECFMG" },
];

const hospitalStats = [
  { value: "6,000+", label: "Unique medical services" },
  { value: "800+", label: "Hospital employees" },
  { value: "1,200+", label: "General surgery cases / year" },
  { value: "500+", label: "Maxillofacial surgeries / year" },
  { value: "350+", label: "Cardiac surgery cases / year" },
  { value: "250+", label: "Neurosurgery cases / year" },
];

const gallery = [
  { src: "/georgia/alte-classroom.jpg", alt: "ALTE University seminar classroom in Tbilisi" },
  { src: "/georgia/alte-library.jpg", alt: "ALTE University medical students studying in the library" },
  { src: "/georgia/alte-campus-life.jpg", alt: "ALTE University students on campus" },
  { src: "/georgia/alte-bookshelf.jpg", alt: "ALTE University library and reading resources" },
  { src: "/georgia/alte-study.jpg", alt: "ALTE University students preparing for exams" },
  { src: "/georgia/alte-tbilisi.jpg", alt: "Tbilisi old town, Georgia, where ALTE University is located" },
];

const faqs = [
  {
    question: "What is the ALTE University Georgia fee structure for MBBS?",
    answer:
      "Tuition is USD 2,975 per semester for all 12 semesters, so six-year tuition totals USD 35,700 (about USD 5,950 per year). First-year hostel and mess is mandatory at USD 1,500 per semester (USD 3,000 for the first year).",
  },
  {
    question: "What is the ALTE University FMGE pass rate?",
    answer:
      "As per FMGE 2025 (NBEMS) data, ALTE University School of Medicine recorded 222 appeared, 103 passed, and a 46.40% pass rate - among the strongest in Georgia, where the country average was 30.34%.",
  },
  {
    question: "How long is the MD program at ALTE University?",
    answer:
      "The Medical Doctor (MD) program runs 6 years / 12 semesters as per NMC guidelines and includes a clinical rotatory internship. Intakes are available in Spring and Fall.",
  },
  {
    question: "Where do ALTE University students get clinical training?",
    answer:
      "Clinical training is delivered at the affiliated Ivane Bokeria University Hospital, a leading member of the Georgian Healthcare Group / EVEX Group, which unites up to 100 hospitals and clinics across Georgia.",
  },
  {
    question: "Is ALTE University MBBS valid in India?",
    answer:
      "ALTE University runs an English-medium, NMC-compliant MBBS curriculum and lists WHO and WFME recognition. Indian students should still verify current NMC/FMGL rules, NEET qualification, WDOMS listing, course duration, internship, and recognition before admission.",
  },
];

function JsonLdScript() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      name: "ALTE University",
      alternateName: "ALTE University Georgia",
      url: pageUrl,
      foundingDate: "2001",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tbilisi",
        addressCountry: "GE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 41.7497,
        longitude: 44.7714,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Medical Doctor (MD) Program at ALTE University",
      description: university.summary,
      provider: {
        "@type": "CollegeOrUniversity",
        name: university.name,
        sameAs: pageUrl,
      },
      educationalCredentialAwarded: "Medical Doctor (MD)",
      courseMode: "On campus",
      inLanguage: university.medium,
      timeRequired: "P6Y",
      offers: {
        "@type": "Offer",
        price: "5950",
        priceCurrency: "USD",
        category: "Annual tuition",
        url: pageUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "MBBS Abroad",
          item: "https://www.ilmalink.com/mbbs-abroad",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "MBBS in Georgia",
          item: "https://www.ilmalink.com/mbbs-abroad/georgia",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "ALTE University",
          item: pageUrl,
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
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  dark = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`px-4 py-12 sm:px-6 lg:px-8 ${
        dark ? "bg-[#0c3a37] text-white" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <p
          className={`text-xs font-extrabold uppercase tracking-[0.2em] ${
            dark ? "text-[#ff8b6f]" : "text-[#ec5a3d]"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-2 text-3xl font-extrabold tracking-tight md:text-[2.6rem] md:leading-[1.1] ${
            dark ? "text-white" : "text-[#0c3a37]"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-3 max-w-3xl text-sm font-medium leading-7 md:text-base ${
              dark ? "text-teal-50/85" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        ) : null}
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}

function CheckList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 rounded-xl px-4 py-3 text-sm font-semibold leading-6 ${
            dark
              ? "bg-white/10 text-teal-50 ring-1 ring-white/10"
              : "bg-white text-slate-700 shadow-sm ring-1 ring-slate-200/80"
          }`}
        >
          <CheckCircle2
            size={18}
            className={`mt-0.5 shrink-0 ${dark ? "text-[#ff8b6f]" : "text-[#0f766e]"}`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FeeMobileCard({ row }: { row: GeorgiaFeeRow }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-extrabold text-[#0c3a37]">{row.year}</h3>
        <span className="rounded-full bg-[#e6f4f1] px-2.5 py-1 text-xs font-bold text-[#0f766e]">
          {row.semester}
        </span>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs font-bold uppercase text-slate-500">Tuition</dt>
          <dd className="font-semibold text-slate-800">{row.tuitionFee}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase text-slate-500">Hostel/Mess</dt>
          <dd className="font-semibold text-slate-800">{row.hostelAndMess}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs font-bold uppercase text-slate-500">Estimated due</dt>
          <dd className="font-extrabold text-[#0f766e]">{row.semesterTotal}</dd>
        </div>
      </dl>
    </div>
  );
}

function FeeTable() {
  return (
    <div>
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead className="bg-gradient-to-r from-[#0c3a37] to-[#12514c] text-white">
              <tr>
                {[
                  "Year",
                  "Semester",
                  "Tuition fees",
                  "Hostel accommodation & mess",
                  "Estimated semester due",
                ].map((heading) => (
                  <th key={heading} className="px-5 py-4 font-extrabold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {university.feeRows.map((row, index) => (
                <tr
                  key={`${row.year}-${row.semester}`}
                  className={index % 2 === 0 ? "bg-[#f3f9f8]" : "bg-white"}
                >
                  <td className="px-5 py-3.5 font-extrabold text-[#0c3a37]">
                    {row.year}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-slate-700">
                    {row.semester}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-slate-700">
                    {row.tuitionFee}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-slate-700">
                    {row.hostelAndMess}
                  </td>
                  <td className="px-5 py-3.5 font-extrabold text-[#0f766e]">
                    {row.semesterTotal}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#0c3a37]/15 bg-[#e6f4f1]">
                <td className="px-5 py-4 font-extrabold text-[#0c3a37]" colSpan={2}>
                  Six-year tuition total
                </td>
                <td className="px-5 py-4 font-extrabold text-[#0c3a37]">
                  USD 35,700
                </td>
                <td className="px-5 py-4 font-semibold text-slate-600">
                  + USD 3,000 first-year hostel/mess
                </td>
                <td className="px-5 py-4 font-extrabold text-[#0f766e]">
                  ~ USD 5,950 / year
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {university.feeRows.map((row) => (
          <FeeMobileCard key={`${row.year}-${row.semester}`} row={row} />
        ))}
      </div>
    </div>
  );
}

function CounsellingCta() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0c3a37] to-[#12514c] p-6 text-white shadow-sm">
      <h2 className="text-2xl font-extrabold tracking-tight">
        Verify ALTE University before admission
      </h2>
      <p className="mt-3 text-sm font-medium leading-7 text-teal-50/90">
        Compare the latest official fee invoice, hostel term, eligibility,
        clinical exposure, WDOMS entry, NMC/FMGL rule fit, and document plan
        before any payment.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#ec5a3d] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#ff6f52]">
          <MessageCircle size={16} />
          Connect ILMALINK
        </CounsellingActionButton>
        <Link
          href="/mbbs-abroad/georgia"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-extrabold text-white transition hover:border-[#ff8b6f] hover:text-[#ff8b6f]"
        >
          Georgia overview
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function AlteUniversityPage() {
  const fmge = university.fmgePerformance?.[0];

  const heroStats = [
    { label: "Annual tuition", value: university.annualTuition ?? "Verify", icon: Wallet },
    { label: "Six-year tuition", value: university.totalTuition ?? "Verify", icon: FileText },
    { label: "First-year hostel/mess", value: university.mandatoryHostelMess ?? "Verify", icon: Building2 },
    { label: "MD duration", value: "6 years / 12 sem", icon: CalendarDays },
  ];

  const heroBadges = [
    "NMC-compliant MBBS curriculum",
    "WHO & WFME recognized",
    fmge ? `FMGE 2025: ${fmge.passRate}` : "FMGE data inside",
    "Established 2001",
  ];

  const quickStats = [
    { value: "2,917", label: "Students", icon: Users },
    { value: "50", label: "Countries", icon: Globe2 },
    { value: "18", label: "Programmes", icon: BookOpen },
    { value: "3,210", label: "Graduates", icon: GraduationCap },
    { value: fmge?.passRate ?? "46.40%", label: "FMGE 2025 pass rate", icon: Trophy },
  ];

  return (
    <main className="min-h-screen bg-[#f7faf9] text-slate-950">
      <JsonLdScript />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0c3a37] px-4 pb-14 pt-28 text-white sm:px-6 lg:px-8">
        <img
          src={university.heroImage}
          alt="ALTE University Georgia medical students with a clinical instructor"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(12,58,55,0.97),rgba(12,58,55,0.82),rgba(12,58,55,0.45))]" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#ec5a3d]/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/mbbs-abroad/georgia"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-xs font-extrabold text-teal-50 transition hover:border-[#ff8b6f] hover:text-[#ff8b6f]"
          >
            <ArrowLeft size={15} />
            Back to MBBS in Georgia
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.24em] text-[#ff8b6f]">
                <Sparkles size={14} />
                ALTE University · Tbilisi, Georgia
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl md:leading-[1.05]">
                ALTE University Georgia: MBBS (MD) fees &amp; admission 2026
              </h1>
              <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-teal-50/90 md:text-lg md:leading-8">
                {university.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {heroBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-teal-50 ring-1 ring-white/15 backdrop-blur"
                  >
                    <ShieldCheck size={13} className="text-[#ff8b6f]" />
                    {badge}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#fee-structure"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#ec5a3d] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#ff6f52]"
                >
                  <FileText size={16} />
                  See Fee Table
                </a>
                <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-extrabold text-white transition hover:border-[#ff8b6f] hover:text-[#ff8b6f]">
                  <MessageCircle size={16} />
                  Verify Admission
                </CounsellingActionButton>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ff8b6f]">
                Cost snapshot 2026-2027
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {heroStats.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-white/10 p-4"
                  >
                    <Icon size={18} className="text-[#ff8b6f]" />
                    <p className="mt-2 text-xs font-bold uppercase text-teal-50/70">
                      {label}
                    </p>
                    <p className="mt-0.5 text-lg font-extrabold text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stat strip */}
      <section className="border-b border-slate-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {quickStats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl bg-[#f3f9f8] px-4 py-3 ring-1 ring-slate-200/70"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0c3a37] text-[#ff8b6f]">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-xl font-extrabold leading-none text-[#0c3a37]">
                  {value}
                </p>
                <p className="mt-1 text-[0.7rem] font-bold uppercase leading-tight text-slate-500">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why ALTE */}
      <Section
        eyebrow="Why ALTE University"
        title="A premium English-medium MD route in Tbilisi"
        description="ALTE University (founded 2001) unites 5 schools and 18 programmes. Its International School of Medicine delivers an English-medium Medical Doctor program built on a latest NMC-compliant MBBS curriculum, with FMGE/USMLE/PLAB training from the first year."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <CheckList items={university.highlights} />
          <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-200">
            <img
              src={university.detailImage}
              alt="ALTE University medical students in clinical training"
              className="h-72 w-full object-cover sm:h-96"
            />
          </div>
        </div>
      </Section>

      {/* Course highlights */}
      <section className="px-4 pb-2 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {courseHighlights.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fdece7] text-[#ec5a3d]">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-base font-extrabold text-[#0c3a37]">
                {title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Fee structure */}
      <Section
        id="fee-structure"
        eyebrow="Fee structure 2026-2027"
        title="ALTE University fee structure"
        description="The MD program fee plan below separates tuition from hostel and mess. Tuition is USD 2,975 per semester for all 12 semesters; hostel and mess is mandatory in the first year and optional after that as per the latest university terms."
      >
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Annual tuition", university.annualTuition ?? "Verify"],
            ["Six-year tuition", university.totalTuition ?? "Verify"],
            ["First-year hostel/mess", university.mandatoryHostelMess ?? "Verify"],
            ["One-time admission", "USD 1,000"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-[#cfe6e1] bg-[#e6f4f1] p-4"
            >
              <p className="text-xs font-bold uppercase text-[#0f766e]">{label}</p>
              <p className="mt-1 text-xl font-extrabold text-[#0c3a37]">{value}</p>
            </div>
          ))}
        </div>

        <FeeTable />

        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {university.additionalFees.map((fee) => (
            <div
              key={fee.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-xs font-extrabold uppercase text-slate-500">
                {fee.label}
              </p>
              <p className="mt-1 text-lg font-extrabold text-[#ec5a3d]">
                {fee.amount}
              </p>
              {fee.note ? (
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                  {fee.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-extrabold text-[#0c3a37]">Fee notes</h3>
            <div className="mt-3">
              <CheckList items={university.feeNotes} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#0c3a37]">Payment terms</h3>
            <div className="mt-3">
              <CheckList items={university.paymentTerms} />
            </div>
          </div>
        </div>
      </Section>

      {/* Program details */}
      <Section
        eyebrow="Program details"
        title="Medical Doctor program for Indian students"
        description="The ALTE MD route is a long-form English-medium medical education pathway with classroom, laboratory, clinical, and internship components mapped to NMC guidelines."
      >
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-200">
            <img
              src="/georgia/alte-classroom.jpg"
              alt="ALTE University classroom and teaching facilities"
              className="h-72 w-full object-cover sm:h-96"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Qualification", "Medical Doctor (MD)", GraduationCap],
              ["Duration", "6 years / 12 semesters", CalendarDays],
              ["Medium", university.medium, Languages],
              ["Intakes", "Spring & Fall", CalendarDays],
              ["Annual tuition", university.annualTuition ?? "Verify", Wallet],
              ["FMGE 2025", fmge ? fmge.passRate : "Updating", Trophy],
            ].map(([label, value, Icon]) => {
              const IconComp = Icon as typeof GraduationCap;
              return (
                <div
                  key={label as string}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <IconComp size={18} className="text-[#ec5a3d]" />
                  <p className="mt-2 text-xs font-bold uppercase text-slate-500">
                    {label as string}
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-[#0c3a37]">
                    {value as string}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Eligibility & documents */}
      <Section
        eyebrow="Eligibility and documents"
        title="Admission requirements and documents"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <h3 className="text-xl font-extrabold text-[#0c3a37]">
              Entry requirements
            </h3>
            <div className="mt-3">
              <ul className="grid gap-2.5">
                {university.entryRequirements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-700 shadow-sm ring-1 ring-slate-200/80"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#0f766e]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#0c3a37]">
              Required documents
            </h3>
            <div className="mt-3">
              <ul className="grid gap-2.5">
                {university.documentChecklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-700 shadow-sm ring-1 ring-slate-200/80"
                  >
                    <FileText size={18} className="mt-0.5 shrink-0 text-[#ec5a3d]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#0c3a37]">
              Arrival support
            </h3>
            <div className="mt-3">
              <ul className="grid gap-2.5">
                {university.oneTimeServiceItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-700 shadow-sm ring-1 ring-slate-200/80"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#0f766e]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Affiliated hospital spotlight */}
      <Section
        eyebrow="Best clinical experience in the country"
        title="Ivane Bokeria University Hospital"
        description="ALTE University is the exclusive partner of EVEX Group, the biggest healthcare provider in Georgia, uniting up to 100 hospitals and clinics. Its affiliated university clinic - Ivane Bokeria University Hospital - gives ALTE students daily, hands-on practical training."
        dark
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
            <img
              src="/georgia/alte-hospital.jpg"
              alt="Ivane Bokeria University Hospital affiliated with ALTE University"
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {hospitalStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/10 p-4"
              >
                <p className="text-2xl font-extrabold text-[#ff8b6f]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-semibold leading-5 text-teal-50/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-7">
          <h3 className="flex items-center gap-2 text-lg font-extrabold text-white">
            <HeartPulse size={18} className="text-[#ff8b6f]" />
            Clinical services students are exposed to
          </h3>
          <div className="mt-3">
            <CheckList items={university.clinicalCenters} dark />
          </div>
        </div>
      </Section>

      {/* Facilities & student life + gallery */}
      <Section
        eyebrow="Campus and student life"
        title="Facilities, hostel, and student support"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-extrabold text-[#0c3a37]">
              Campus facilities
            </h3>
            <div className="mt-3">
              <CheckList items={university.facilities} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#0c3a37]">
              Student support
            </h3>
            <div className="mt-3">
              <CheckList items={university.supportServices} />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {gallery.map((image) => (
            <div
              key={image.src}
              className="group overflow-hidden rounded-xl ring-1 ring-slate-200"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-32 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-36"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Accreditation & partnerships */}
      <Section
        eyebrow="Recognition and global profile"
        title="Accreditation and international partnerships"
        description="ALTE University's International Medical School and its programs are recognized and approved by leading bodies, with active membership in global medical-education networks."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {accreditations.map((item) => (
            <div
              key={item.short}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f1] text-[#0f766e]">
                <Award size={20} />
              </span>
              <div>
                <p className="text-base font-extrabold text-[#0c3a37]">
                  {item.short}
                </p>
                <p className="text-xs font-semibold leading-5 text-slate-500">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {university.facts.map((fact) => (
            <div
              key={`${fact.label}-${fact.value}`}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-2xl font-extrabold text-[#ec5a3d]">
                {fact.value}
              </p>
              <p className="mt-1 text-xs font-bold uppercase leading-5 text-slate-500">
                {fact.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="flex items-center gap-2 text-xl font-extrabold text-[#0c3a37]">
            <Globe2 size={20} className="text-[#ec5a3d]" />
            International partnerships
          </h3>
          <div className="mt-3">
            <CheckList items={university.partnerHighlights} />
          </div>
        </div>
      </Section>

      {/* FMGE reference */}
      <Section
        eyebrow="FMGE reference data"
        title="ALTE University FMGE 2025 performance"
        description="FMGE data is useful for comparison, but it does not guarantee recognition, approval, admission suitability, or future exam outcomes."
      >
        {fmge ? (
          <div className="grid gap-3 md:grid-cols-4">
            {[
              ["Appeared", fmge.appeared.toLocaleString("en-IN")],
              ["Passed", fmge.passed.toLocaleString("en-IN")],
              ["Pass rate", fmge.passRate],
              ["Georgia average", "30.34%"],
            ].map(([label, value], index) => (
              <div
                key={label}
                className={`rounded-2xl border p-5 shadow-sm ${
                  index === 2
                    ? "border-[#0f766e]/30 bg-[#e6f4f1]"
                    : "border-slate-200 bg-white"
                }`}
              >
                <p className="text-xs font-bold uppercase text-slate-500">
                  {label}
                </p>
                <p
                  className={`mt-2 text-3xl font-extrabold ${
                    index === 2 ? "text-[#0f766e]" : "text-[#0c3a37]"
                  }`}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-600">
            FMGE match is being updated.
          </p>
        )}
        <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
          Source: FMGE 2025 (NBEMS) college-wise data for &quot;ALTE University
          School of Medicine&quot;. ALTE&apos;s 46.40% pass rate is well above
          the Georgia country average of 30.34%.
        </p>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Questions students ask" title="ALTE University MBBS FAQs">
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-extrabold text-[#0c3a37]">
                {faq.question}
              </h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Final disclaimer + CTA */}
      <section className="px-4 pb-16 pt-2 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#0c3a37]">
              Final verification note
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
              {georgiaFinalDisclaimer}
            </p>
          </div>
          <CounsellingCta />
        </div>
      </section>
    </main>
  );
}
