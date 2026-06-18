import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  Download,
  FileCheck2,
  FileText,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Languages,
  Landmark,
  MessageCircle,
  Microscope,
  Plane,
  ShieldCheck,
  Stethoscope,
  Wallet,
} from "lucide-react";

import CounsellingActionButton from "../../../components/CounsellingActionButton";
import JsonLd from "../../../components/JsonLd";
import {
  georgianAmericanUniversity,
  georgiaFinalDisclaimer,
} from "../../../data/georgiaUniversities";

const university = georgianAmericanUniversity;
const pageUrl =
  "https://www.ilmalink.com/mbbs-abroad/georgia/georgian-american-university";
const flyerUrl = "/georgia/gau-flyer-2026-2027.pdf";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "Georgian American University MBBS 2026–2027 | GAU Georgia Fees",
  description:
    "Georgian American University MBBS 2026-2027 guide for Indian students: GAU Medical Doctor Program, USD 3,250 semester fee, first-year hostel, eligibility, documents, clinical internship, and NMC/FMGL checks.",
  keywords: [
    "Georgian American University MBBS 2026",
    "GAU Georgia MBBS fees 2026-2027",
    "Georgian American University fee structure for Indian students",
    "MBBS in Georgia for Indian students",
    "GAU Medical Doctor Program Georgia",
    "private medical universities in Georgia for Indian students",
    "NMC compliant MBBS in Georgia",
    "FMGE focused MBBS abroad Georgia",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Georgian American University MBBS 2026–2027",
    description:
      "GAU Georgia Medical Doctor Program fees, hostel, eligibility, documents, clinical learning, and admission checks for Indian students.",
    url: pageUrl,
    siteName: "ILMALINK MEDIGO",
    images: [
      {
        url: "/georgia/georgia-tbilisi-student-life.jpg",
        width: 1800,
        height: 1200,
        alt: "Tbilisi, Georgia, location of Georgian American University",
      },
    ],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Georgian American University MBBS 2026–2027",
    description:
      "GAU Georgia fee structure, first-year hostel, eligibility, documents and NMC/FMGL checkpoints.",
    images: ["/georgia/georgia-tbilisi-student-life.jpg"],
  },
  other: {
    "geo.region": "GE-TB",
    "geo.placename": "Tbilisi, Georgia",
    "geo.position": "41.7151;44.8271",
    ICBM: "41.7151, 44.8271",
    "content-language": "en-IN",
  },
};

const quickFacts = [
  ["University", "Georgian American University"],
  ["Country", "Georgia"],
  ["City", "Tbilisi"],
  ["Program", "Medical Doctor Program / MBBS equivalent"],
  ["Academic Year", "2026–2027"],
  ["Tuition Fee", "$3,250 per semester"],
  ["Hostel & Mess", "$1,500 per semester in first year"],
  ["Course Pattern", "12 semesters"],
  ["NEET", "Required for Indian students under current Indian rules"],
  ["Medium", "English-medium pathway; verify official program document"],
  ["Institution Type", "Private university"],
] as const;

const whyGau = [
  {
    title: "Global recognition positioning",
    body:
      "The GAU flyer highlights global recognition while presenting Georgian American University as a modern private university for an internationally oriented Medical Doctor Program. Indian students should still verify the exact WDOMS school entry, local recognition, NMC/FMGL requirements and licensing pathway before admission.",
  },
  {
    title: "High-tech teaching methods",
    body:
      "The GAU 2026–2027 flyer highlights high-tech teaching methods intended to connect classroom learning with practical medical education. Students should ask for the latest curriculum, teaching plan and laboratory schedule while comparing GAU Georgia MBBS options.",
  },
  {
    title: "Accredited global programs",
    body:
      "The flyer presents GAU as offering accredited global programs. This should be treated as a point for documentary verification, not as a guarantee of approval in every country. Indian applicants must independently check current Georgian accreditation and Indian regulatory requirements.",
  },
  {
    title: "Modern medical research facilities",
    body:
      "Modern medical research facilities are listed among GAU’s key features. These facilities can support scientific learning, laboratory exposure and evidence-based thinking when they are integrated into the current Medical Doctor curriculum.",
  },
  {
    title: "Strong alumni network",
    body:
      "The flyer highlights a strong alumni network. A useful alumni ecosystem can help international students understand campus life, academic expectations and career planning, although individual outcomes depend on performance and licensing requirements.",
  },
  {
    title: "Academic support",
    body:
      "Academic support is positioned as a core feature of Georgian American University. Students should confirm the current mentoring, remediation, language, examination and clinical-support services available to international medical students.",
  },
] as const;

const courseHighlights = [
  {
    icon: Microscope,
    title: "Modern medical technologies",
    body:
      "The flyer highlights exposure to modern medical technologies so students can connect foundational knowledge with current diagnostic and treatment environments.",
  },
  {
    icon: Building2,
    title: "Affiliated-hospital opportunities",
    body:
      "Internship opportunities in affiliated hospitals are listed as part of the GAU pathway. Applicants should verify the current hospital network, rotation schedule, patient exposure and internship documentation.",
  },
  {
    icon: Stethoscope,
    title: "Advanced simulation laboratories",
    body:
      "Advanced simulation labs are presented as a practical-learning resource for developing clinical reasoning, procedural familiarity and safer early-stage skills practice.",
  },
  {
    icon: HeartHandshake,
    title: "Patient care and clinical skills",
    body:
      "The program places a stated emphasis on patient care and clinical skills. Students should review how bedside exposure, supervised practice and clinical assessment progress across the 12 semesters.",
  },
  {
    icon: GraduationCap,
    title: "FMGE, USMLE and PLAB focus",
    body:
      "The flyer states that focused preparation for FMGE, USMLE and PLAB begins from the first year. This is academic support only and does not guarantee any examination or licensing outcome.",
  },
  {
    icon: ShieldCheck,
    title: "NMC-aware curriculum planning",
    body:
      "The flyer describes the curriculum as compliant with the latest National Medical Commission framework. Indian students must still verify current FMGL rules, course duration, internship, medium and licensing eligibility before admission.",
  },
] as const;

const faqs = [
  {
    question: "Is Georgian American University private?",
    answer:
      "Yes. Georgian American University is presented here as a private university in Tbilisi, Georgia. Students should verify the latest official institutional and program status before applying.",
  },
  {
    question: "What is the GAU MBBS fee for 2026–2027?",
    answer:
      "The flyer lists tuition at USD 3,250 per semester for 12 semesters. The listed tuition across 12 semesters is USD 39,000, excluding hostel, processing, training, visa, travel, medical assistance, living and other applicable costs.",
  },
  {
    question: "Is hostel mandatory at GAU?",
    answer:
      "The flyer states that hostel accommodation and mess is mandatory for the first year at USD 1,500 per semester. It is shown as optional from Semester 3 onward and covers a five-month term per semester.",
  },
  {
    question: "Is NEET required for GAU Georgia?",
    answer:
      "For Indian students, NEET qualification is required for eligibility to return to India and pursue the Indian medical licensing pathway, subject to current NMC/FMGL rules.",
  },
  {
    question: "What documents are required for GAU admission?",
    answer:
      "The flyer lists the 10th-grade certificate, 12th-grade certificate, NEET passing or applicable entrance certificate, passport and visa documentation with the applicable validity.",
  },
  {
    question: "Are Georgian state-funded medical colleges accepting foreign students?",
    answer:
      "Admission availability can vary by year, university policy and Georgian regulatory instructions. Students must verify the latest official admission position directly before applying to any state-funded university.",
  },
  {
    question: "Are GAU, EEU and Alte safer private options?",
    answer:
      "GAU, East European University and Alte University are private options and may offer greater admission-continuity confidence than routes affected by state-funded intake decisions. This is not a guarantee; final admission depends on current university confirmation, eligibility, documents, visa and applicable regulations.",
  },
  {
    question: "Does ILMALINK guarantee admission or visa?",
    answer:
      "No. ILMALINK MEDIGO provides counselling, comparison and student-support information. Admission and visa decisions are made by the university and relevant authorities under applicable rules.",
  },
] as const;

const importantSections = [
  ["Quick facts", "#quick-facts"],
  ["Why Georgian American University", "#why-gau"],
  ["Course highlights", "#course-highlights"],
  ["GAU fee structure 2026-2027", "#fee-structure"],
  ["Eligibility", "#eligibility"],
  ["Documents required", "#documents"],
  ["Student support", "#student-support"],
  ["Payment terms", "#payment-terms"],
  ["Georgia admission update", "#georgia-admission-update"],
  ["Frequently asked questions", "#faqs"],
] as const;

function buildJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      "@id": `${pageUrl}#university`,
      name: "Georgian American University",
      alternateName: ["GAU", "Georgian American University Georgia"],
      url: pageUrl,
      description:
        "Private university option in Tbilisi offering a Medical Doctor Program for international students.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tbilisi",
        addressCountry: "GE",
      },
      mainEntityOfPage: pageUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": `${pageUrl}#medical-doctor-program`,
      name: "Medical Doctor Program at Georgian American University",
      description:
        "A 6-year, 12-semester Medical Doctor pathway with a clinical rotatory internship as presented in the GAU 2026-2027 flyer.",
      provider: {
        "@id": `${pageUrl}#university`,
      },
      educationalCredentialAwarded: "Medical Doctor (MD)",
      courseMode: "On campus",
      inLanguage: "English",
      timeRequired: "P6Y",
      offers: {
        "@type": "Offer",
        price: "3250",
        priceCurrency: "USD",
        category: "Semester tuition",
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
          name: "Georgian American University",
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
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Georgian American University MBBS guide sections",
      itemListElement: importantSections.map(([name, href], index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: `${pageUrl}${href}`,
      })),
    },
  ];
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  tone = "light",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  tone?: "light" | "blue";
}) {
  const blue = tone === "blue";

  return (
    <section
      id={id}
      className={`scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 ${
        blue ? "bg-[#0b294f] text-white" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <p
          className={`text-xs font-extrabold uppercase tracking-[0.2em] ${
            blue ? "text-cyan-200" : "text-[#1769aa]"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-2 text-3xl font-extrabold tracking-tight md:text-[2.6rem] md:leading-[1.1] ${
            blue ? "text-white" : "text-[#092543]"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-3 max-w-4xl text-sm font-medium leading-7 md:text-base ${
              blue ? "text-blue-50/85" : "text-slate-600"
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

function Checklist({
  items,
  tone = "light",
}: {
  items: readonly string[];
  tone?: "light" | "blue";
}) {
  const blue = tone === "blue";

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 rounded-2xl p-4 text-sm font-semibold leading-6 ${
            blue
              ? "bg-white/10 text-blue-50 ring-1 ring-white/10"
              : "bg-white text-slate-700 shadow-sm ring-1 ring-slate-200"
          }`}
        >
          <CheckCircle2
            size={18}
            className={`mt-0.5 shrink-0 ${
              blue ? "text-cyan-200" : "text-[#1769aa]"
            }`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FeeTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <p className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500 md:hidden">
        Swipe horizontally to view the complete fee table.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead className="bg-[#0b294f] text-white">
            <tr>
              {["Year", "Semester", "Tuition Fee", "Hostel & Mess"].map(
                (heading) => (
                  <th key={heading} className="px-4 py-4 font-extrabold">
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {university.feeRows.map((row, index) => (
              <tr
                key={`${row.year}-${row.semester}`}
                className={index % 2 === 0 ? "bg-[#f4f8fc]" : "bg-white"}
              >
                <td className="px-4 py-3.5 font-extrabold text-[#092543]">
                  {row.year}
                </td>
                <td className="px-4 py-3.5 font-semibold text-slate-700">
                  {row.semester}
                </td>
                <td className="px-4 py-3.5 font-extrabold text-[#1769aa]">
                  $3250
                </td>
                <td className="px-4 py-3.5 font-semibold text-slate-700">
                  {row.hostelAndMess === "USD 1,500" ? "$1500" : row.hostelAndMess}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SupportCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f3fb] text-[#1769aa]">
        {icon}
      </span>
      <h3 className="mt-4 text-lg font-extrabold text-[#092543]">{title}</h3>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{body}</p>
    </article>
  );
}

export default function GeorgianAmericanUniversityPage() {
  const heroFacts = [
    ["Program", "Medical Doctor / MBBS equivalent", GraduationCap],
    ["Tuition", "$3250 per semester", Wallet],
    ["First-year hostel & mess", "$1500 per semester", Building2],
    ["Duration", "6 years / 12 semesters", CalendarDays],
  ] as const;

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <JsonLd data={buildJsonLd()} />

      <section className="relative overflow-hidden bg-[#071d38] px-4 pb-14 pt-28 text-white sm:px-6 lg:px-8">
        <img
          src="/georgia/georgia-tbilisi-student-life.jpg"
          alt="Tbilisi, Georgia, location of Georgian American University"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,29,56,0.99),rgba(11,57,99,0.88),rgba(7,29,56,0.62))]" />
        <div className="absolute -right-28 -top-24 h-96 w-96 rounded-full bg-[#288cd7]/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/mbbs-abroad/georgia"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-xs font-extrabold text-blue-50 transition hover:border-cyan-200 hover:text-cyan-100"
          >
            <ArrowLeft size={15} />
            Back to MBBS in Georgia
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-200">
                GAU · Tbilisi, Georgia · Academic year 2026–2027
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl md:leading-[1.04]">
                Georgian American University MBBS 2026–2027
              </h1>
              <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-blue-50/90 md:text-lg md:leading-8">
                Study the Medical Doctor Program in Georgia with a
                student-focused, NMC-aware and globally oriented academic
                pathway.
              </p>
              <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-blue-100/80">
                Georgian American University is one of the private university
                options in Georgia for Indian students planning MBBS abroad in
                2026. The flyer presents a 12-semester pathway with a clinical
                rotatory internship, simulation-based learning and
                licensing-exam preparation.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#fee-structure"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#288cd7] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#3ca5ef]"
                >
                  <FileText size={16} />
                  View GAU Fee Structure
                </a>
                <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-extrabold text-white transition hover:border-cyan-200 hover:text-cyan-100">
                  <MessageCircle size={16} />
                  Ask ILMALINK MEDIGO
                </CounsellingActionButton>
                <a
                  href={flyerUrl}
                  download
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-extrabold text-white transition hover:border-cyan-200 hover:text-cyan-100"
                >
                  <Download size={16} />
                  Download GAU Flyer 2026–2027
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-sm">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">
                GAU trust summary
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {heroFacts.map(([label, value, Icon]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-white/10 p-4"
                  >
                    <Icon size={18} className="text-cyan-200" />
                    <p className="mt-2 text-xs font-bold uppercase text-blue-100/70">
                      {label}
                    </p>
                    <p className="mt-1 text-base font-extrabold text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs font-semibold leading-5 text-blue-100/75">
                Course duration is presented as per NMC guidelines, with a
                clinical rotatory internship included in the flyer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="quick-facts"
        eyebrow="GAU at a glance"
        title="Georgian American University quick facts"
        description="A clear snapshot of the GAU Medical Doctor Program for students comparing private medical universities in Georgia for 2026 admissions."
      >
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickFacts.map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <dt className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#1769aa]">
                {label}
              </dt>
              <dd className="mt-2 text-base font-extrabold leading-6 text-[#092543]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        id="why-gau"
        eyebrow="Why GAU"
        title="Why Georgian American University"
        description="GAU is presented in the 2026–2027 flyer as a modern private university option with technology-supported learning, international orientation and structured academic support."
        tone="blue"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyGau.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/10 p-5"
            >
              <h3 className="text-lg font-extrabold text-white">{item.title}</h3>
              <p className="mt-3 text-sm font-medium leading-7 text-blue-50/85">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="course-highlights"
        eyebrow="Medical Doctor Program"
        title="GAU course highlights for Indian students"
        description="GAU’s Medical Doctor Program is presented for students who want an English-medium medical pathway with clinical exposure, simulation-based learning and licensing-exam preparation."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courseHighlights.map(({ icon: Icon, title, body }) => (
            <SupportCard
              key={title}
              icon={<Icon size={20} />}
              title={title}
              body={body}
            />
          ))}
        </div>
      </Section>

      <Section
        id="fee-structure"
        eyebrow="Fee structure 2026–2027"
        title="GAU Georgia MBBS fee structure"
        description="The flyer lists tuition at USD 3,250 per semester across 12 semesters. Hostel and mess is mandatory during the first year at USD 1,500 per semester and shown as optional afterward."
      >
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Semester tuition", "$3,250"],
            ["Listed annual tuition", "$6,500"],
            ["Listed 12-semester tuition", "$39,000"],
            ["First-year hostel & mess", "$3,000"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-[#cfe3f2] bg-[#eaf4fb] p-4"
            >
              <p className="text-xs font-bold uppercase text-[#1769aa]">{label}</p>
              <p className="mt-1 text-xl font-extrabold text-[#092543]">{value}</p>
            </div>
          ))}
        </div>

        <FeeTable />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {university.additionalFees.map((fee) => (
            <article
              key={fee.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-xs font-extrabold uppercase leading-5 text-slate-500">
                {fee.label}
              </h3>
              <p className="mt-1 text-lg font-extrabold text-[#1769aa]">
                {fee.amount}
              </p>
              {fee.note ? (
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                  {fee.note}
                </p>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="text-lg font-extrabold text-amber-950">Visible fee notes</h3>
          <div className="mt-4">
            <Checklist items={university.feeNotes} />
          </div>
          <p className="mt-4 text-sm font-bold leading-6 text-amber-950">
            Fees may change as per university policy, exchange rate,
            visa/travel cost and official notification.
          </p>
        </div>
      </Section>

      <Section
        id="eligibility"
        eyebrow="Admission requirements"
        title="Eligibility for Georgian American University MBBS Admission"
        description="Applicants should confirm the final admission standard directly from the university before submitting documents or making payment."
        tone="blue"
      >
        <Checklist items={university.entryRequirements} tone="blue" />
        <div className="mt-5 rounded-2xl border border-cyan-200/30 bg-cyan-100/10 p-5">
          <h3 className="text-lg font-extrabold text-white">
            India-specific NEET clarification
          </h3>
          <p className="mt-2 text-sm font-medium leading-7 text-blue-50/90">
            For Indian students, NEET qualification is required for eligibility
            to return to India and pursue the Indian medical licensing pathway,
            subject to current NMC/FMGL rules. Indian students must treat NEET
            qualification, NMC/FMGL compliance, WDOMS listing and licensing
            rules as mandatory checkpoints before admission.
          </p>
        </div>
      </Section>

      <Section
        id="documents"
        eyebrow="Application checklist"
        title="Documents required for GAU admission"
        description="Keep clear, valid and correctly translated documents ready. Final document requirements can change by university, visa and regulatory process."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {university.documentChecklist.map((item) => (
            <article
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <FileCheck2 size={20} className="mt-0.5 shrink-0 text-[#1769aa]" />
              <p className="text-sm font-semibold leading-6 text-slate-700">
                {item}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="student-support"
        eyebrow="Arrival and local setup"
        title="One-time charges and student-support services"
        description="The flyer lists these onboarding and local-support items. They should be understood as assistance services, not guarantees of approval by police, ministry, bank or residence authorities."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {university.oneTimeServiceItems.map((item, index) => {
            const icons = [
              FileText,
              ShieldCheck,
              Languages,
              Landmark,
              Globe2,
              Wallet,
              FileCheck2,
              Plane,
            ];
            const Icon = icons[index] ?? FileText;

            return (
              <article
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <Icon size={19} className="text-[#1769aa]" />
                <h3 className="mt-3 text-sm font-extrabold leading-6 text-[#092543]">
                  {item}
                </h3>
              </article>
            );
          })}
        </div>
      </Section>

      <Section
        id="payment-terms"
        eyebrow="Plain-language payment guidance"
        title="GAU fee payment terms and conditions"
        description="Students and parents should read the official university invoice and refund policy before transferring any tuition, hostel, service or travel amount."
        tone="blue"
      >
        <Checklist items={university.paymentTerms} tone="blue" />
      </Section>

      <Section
        id="georgia-admission-update"
        eyebrow="Important Georgia admission update"
        title="Verify current admission availability before applying"
      >
        <div className="rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 shadow-sm">
          <p className="text-base font-semibold leading-8 text-amber-950">
            Some state-funded or public medical universities in Georgia may not
            be open for fresh foreign Medical Doctor admissions depending on
            the current admission year, university policy and
            government/regulatory instructions. Students must verify the latest
            official admission status before applying.
          </p>
          <p className="mt-4 text-sm font-medium leading-7 text-amber-900">
            GAU, East European University and Alte University are private
            Georgian universities, so they are not positioned in the same risk
            category as state-funded Georgian medical colleges. However, final
            admission always depends on university approval, student
            eligibility, documentation, visa approval and applicable Georgian
            and Indian regulations.
          </p>
        </div>
      </Section>

      <Section
        eyebrow="Private university planning"
        title="Why Private Georgian Universities Matter in 2026"
        description="Institution type is one of several checks students should complete before choosing an MBBS in Georgia pathway."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Checklist
              items={[
                "Check whether the chosen university is private or state-funded.",
                "For 2026 admissions, private universities such as GAU, EEU and Alte can be comparatively safer options from an admission-continuity perspective, subject to official university confirmation.",
                "Verify the exact WDOMS listing, current NMC/FMGL compliance, medium of instruction, internship structure, clinical training and licensing pathway before final admission.",
                "Do not treat private status as a guarantee of admission, visa approval, recognition or licensing outcome.",
              ]}
            />
          </div>
          <div className="rounded-2xl bg-[#092543] p-6 text-white shadow-sm">
            <h3 className="text-xl font-extrabold">
              Compare the three private Georgia pages
            </h3>
            <div className="mt-4 grid gap-2">
              {[
                ["Georgian American University", pageUrl.replace("https://www.ilmalink.com", "")],
                [
                  "East European University",
                  "/mbbs-abroad/georgia/east-european-university",
                ],
                ["Alte University", "/mbbs-abroad/georgia/alte-university"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="inline-flex min-h-11 items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-extrabold text-white transition hover:border-cyan-200 hover:text-cyan-100"
                >
                  {label}
                  <ArrowRight size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Continue your research"
        title="Internal guides for Georgia admission planning"
        tone="blue"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["MBBS in Georgia", "/mbbs-abroad/georgia"],
            ["MBBS Abroad", "/mbbs-abroad"],
            ["East European University", "/mbbs-abroad/georgia/east-european-university"],
            ["Alte University", "/mbbs-abroad/georgia/alte-university"],
            ["Scholarships & Loans", "/scholarships-loans"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="inline-flex min-h-12 items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-extrabold text-white transition hover:border-cyan-200 hover:text-cyan-100"
            >
              {label}
              <ArrowRight size={16} />
            </Link>
          ))}
          <CounsellingActionButton className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#288cd7] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#3ca5ef]">
            <MessageCircle size={16} />
            Ask ILMALINK MEDIGO
          </CounsellingActionButton>
        </div>
      </Section>

      <Section
        id="faqs"
        eyebrow="Student questions"
        title="Georgian American University FAQs"
        description="Visible answers to the questions Indian students and parents commonly ask while comparing GAU Georgia MBBS fees and admission requirements."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-extrabold leading-7 text-[#092543]">
                {faq.question}
              </h3>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <BookOpen size={21} className="mt-1 shrink-0 text-[#1769aa]" />
            <div>
              <h2 className="text-xl font-extrabold text-[#092543]">
                Final verification note
              </h2>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                {georgiaFinalDisclaimer} GAU fee and program information on this
                page is summarized from the supplied 2026–2027 flyer and should
                be matched against the latest official university invoice and
                admission documents before payment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
