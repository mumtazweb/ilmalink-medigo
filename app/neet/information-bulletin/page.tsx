import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Leaf,
  Medal,
  MessageCircle,
  Microscope,
  Phone,
  ScrollText,
  Search,
  ShieldCheck,
  ShieldPlus,
  Shirt,
  Sparkles,
  Stethoscope,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import JsonLd from "../../components/JsonLd";
import Navbar from "../../components/navbar";
import {
  admitDayRules,
  applicationRules,
  authorityCards,
  ayushRules,
  barredItems,
  bulletinNavigation,
  bulletinQuickFacts,
  bulletinSectionCards,
  collegeCategories,
  counsellingCards,
  counsellingComparison,
  dressCodeRules,
  eligibilityCards,
  eligibilityComparison,
  examPattern,
  importantDates,
  meritRules,
  miscellaneousRules,
  nriDocumentCards,
  nriDocumentComparison,
  officialBulletinLinks,
  relatedLinks,
  resultProcess,
  syllabusTopics,
  trustItems,
} from "../../data/neetInformationBulletin2026";
import { neetInformationBulletinFaq2026 } from "../../data/neetInformationBulletinFaq2026";
import { neetStateCounsellingDirectorates2026 } from "../../data/neetInformationBulletinStateDirectorates2026";
import { neet2026OfficialLinks } from "../../data/neet2026";
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildOrganizationSchema,
} from "../../lib/schema";

const pageTitle =
  "NEET UG 2026 Information Bulletin | Eligibility, Exam Pattern, Syllabus, Counselling & NRI Rules";
const pageDescription =
  "Read the NEET UG 2026 Information Bulletin in a student-friendly format with exam pattern, eligibility, counselling rules, reservation, merit criteria, dress code, barred items, result process, syllabus, NRI/OCI/foreign candidate documents and state counselling contacts.";
const canonical = "https://www.ilmalink.com/neet/information-bulletin/";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "NEET UG 2026 information bulletin",
    "NEET 2026 bulletin",
    "NEET UG eligibility 2026",
    "NEET 2026 exam pattern",
    "NEET UG syllabus 2026",
    "NEET counselling 2026",
    "NEET NRI documents",
    "NEET OCI foreign candidate documents",
    "NEET dress code 2026",
    "NEET barred items 2026",
    "NEET merit list 2026",
    "NEET result rules 2026",
    "NEET state counselling directorates",
  ],
  alternates: { canonical },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    type: "article",
    images: [
      {
        url: "/images/neet-hub-male-student.webp",
        alt: "NEET UG 2026 student information guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/images/neet-hub-male-student.webp"],
  },
  other: { "geo.region": "IN", "geo.placename": "India" },
};

const cardIcons: Record<string, LucideIcon> = {
  book: BookOpen,
  clipboard: ClipboardCheck,
  eligibility: UserCheck,
  users: Users,
  medal: Medal,
  leaf: Leaf,
  shirt: Shirt,
  chart: BarChart3,
  syllabus: ScrollText,
  building: Building2,
  college: GraduationCap,
  passport: FileCheck2,
};

const factIcons: Record<string, LucideIcon> = {
  calendar: CalendarDays,
  clock: Clock3,
  questions: CircleHelp,
  award: Award,
  pen: FileText,
  subjects: Microscope,
};

const cardTone: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  teal: "bg-teal-50 text-teal-700 border-teal-100",
  green: "bg-emerald-50 text-emerald-700 border-emerald-100",
  orange: "bg-orange-50 text-orange-700 border-orange-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
  pink: "bg-pink-50 text-pink-700 border-pink-100",
  red: "bg-red-50 text-red-600 border-red-100",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${canonical}#webpage`,
  url: canonical,
  name: pageTitle,
  description: pageDescription,
  dateModified: "2026-06-22",
  inLanguage: "en-IN",
  isPartOf: { "@id": "https://www.ilmalink.com/#website" },
  publisher: { "@id": "https://www.ilmalink.com/#organization" },
  about: [
    "NEET UG 2026 information bulletin",
    "NEET eligibility",
    "NEET exam pattern",
    "NEET counselling",
    "NEET syllabus",
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "NEET UG 2026 Information Bulletin sections",
  numberOfItems: bulletinSectionCards.length,
  itemListElement: bulletinSectionCards.map((section, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: section.title,
    url: `${canonical}#${section.id}`,
  })),
};

export default function NeetInformationBulletinPage() {
  return (
    <>
      <JsonLd
        data={[
          pageSchema,
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "NEET", url: "/neet" },
            { name: "NEET UG 2026 Information Bulletin", url: "/neet/information-bulletin" },
          ]),
          buildFAQSchema([...neetInformationBulletinFaq2026]),
          itemListSchema,
          buildOrganizationSchema(),
        ]}
      />
      <Navbar />
      <main className="bg-[radial-gradient(circle_at_8%_8%,rgba(23,105,232,.06),transparent_24%),radial-gradient(circle_at_92%_22%,rgba(0,156,149,.07),transparent_24%),#FBFDFF] text-[#092A60]">
        <Hero />
        <div className="mx-auto max-w-[1240px] px-3 pb-12 sm:px-6 lg:px-8">
          <QuickFacts />
          <SectionExplorer />
          <div className="mt-8 lg:grid lg:grid-cols-[235px_minmax(0,1fr)] lg:items-start lg:gap-5">
            <OnThisPage />
            <div className="min-w-0 space-y-5">
              <MobileSectionNav />
              <AboutSection />
              <ImportantDatesSection />
              <ExamSchemeSection />
              <EligibilitySection />
              <CounsellingSection />
              <MeritSection />
              <AyushSection />
              <DressCodeSection />
              <ResultSection />
              <SyllabusSection />
              <StateDirectoratesSection />
              <CollegeDetailsSection />
              <NriDocumentsSection />
              <ApplicationSection />
              <AdmitCardSection />
              <MiscellaneousSection />
            </div>
          </div>
          <TrustStrip />
          <FaqAndCta />
          <ImportantLinks />
          <Disclaimer />
        </div>
      </main>
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-blue-100 bg-white/85">
      <div className="mx-auto grid max-w-[1240px] gap-7 px-4 pb-14 pt-5 sm:px-7 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:px-8 lg:pb-20 lg:pt-8">
        <div className="relative z-10">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-[#537092] sm:text-xs">
            <Link href="/" className="hover:text-[#1769E8]">Home</Link><ChevronRight className="h-3.5 w-3.5" />
            <Link href="/neet" className="hover:text-[#1769E8]">NEET</Link><ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1769E8]">NEET UG 2026 Information Bulletin</span>
          </nav>
          <span className="mt-6 inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-[linear-gradient(90deg,#EEF5FF,#F0FAF8)] px-3 py-2 text-xs font-black text-[#0B4AA2] shadow-sm">
            <span className="rounded bg-white px-2 py-0.5">NEET UG 2026</span>
            Official Bulletin Guide
          </span>
          <h1 className="mt-5 max-w-[760px] text-[39px] font-black leading-[.98] tracking-[-.045em] text-[#0A3FA8] sm:text-[58px] lg:text-[67px]">
            NEET UG 2026
            <span className="mt-2 block text-[#071A45]">Information Bulletin</span>
          </h1>
          <p className="mt-3 text-2xl font-black italic text-[#009C95] sm:text-3xl">Explained for Students</p>
          <p className="mt-4 max-w-[690px] text-sm font-semibold leading-6 text-[#304B70] sm:text-base sm:leading-7">
            Exam pattern, eligibility, counselling, syllabus, NRI/OCI documents, reservation, dress code and result rules in one searchable guide.
          </p>
          <div className="mt-5 flex max-w-[680px] items-start gap-3 rounded-xl border border-violet-100 bg-violet-50/75 p-3.5 text-xs font-semibold leading-5 text-[#273B68] sm:text-sm">
            <CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
            <p><strong className="text-[#172C64]">Based on the NEET UG 2026 Information Bulletin.</strong> Students must verify final notices from NTA, MCC, NMC, AACCC and respective State counselling authorities.</p>
          </div>
          <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
            <HeroAction href={neet2026OfficialLinks.bulletin} external icon={Download} title="Download Official Bulletin" note="NTA source" tone="blue" />
            <HeroAction href="/?rank-predictor=open" icon={Clock3} title="Check Rank Predictor" note="Estimate your rank" tone="teal" />
            <HeroAction href="https://wa.me/919563910223?text=I%20need%20help%20understanding%20NEET%20UG%202026%20eligibility%20and%20counselling." external icon={MessageCircle} title="Ask ilmaLink Counsellor" note="Chat with an expert" tone="violet" />
          </div>
        </div>
        <BulletinIllustration />
      </div>
    </section>
  );
}

function HeroAction({ href, icon: Icon, title, note, tone, external = false }: { href: string; icon: LucideIcon; title: string; note: string; tone: "blue" | "teal" | "violet"; external?: boolean }) {
  const styles = { blue: "from-[#0B4AA2] to-[#155DD1]", teal: "from-[#008E8A] to-[#00A88F]", violet: "from-[#7136D7] to-[#A43CE5]" };
  return (
    <Link href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={`flex min-h-14 items-center gap-2.5 rounded-lg bg-gradient-to-r ${styles[tone]} px-3 py-2 text-white shadow-[0_9px_20px_rgba(11,74,162,.18)] transition hover:-translate-y-0.5`}>
      <Icon className="h-6 w-6 shrink-0" />
      <span><strong className="block text-xs leading-4 sm:text-[13px]">{title}</strong><span className="block text-[9px] font-semibold text-white/80 sm:text-[10px]">{note}</span></span>
    </Link>
  );
}

function BulletinIllustration() {
  return (
    <div className="relative mx-auto hidden h-[460px] w-full max-w-[490px] lg:block" aria-label="Illustration of a medical information bulletin">
      <div className="absolute inset-8 rounded-[44%_56%_48%_52%/45%_38%_62%_55%] bg-[linear-gradient(145deg,#E1F2FF,#D5F7F3)]" />
      <div className="absolute left-1/2 top-1/2 h-[335px] w-[255px] -translate-x-1/2 -translate-y-1/2 rotate-[5deg] rounded-[22px] border-[9px] border-[#1769E8] bg-white p-7 shadow-[0_35px_60px_rgba(18,78,145,.25)]">
        <FileText className="h-9 w-9 text-[#1769E8]" />
        <p className="mt-5 text-center text-xl font-black text-[#0B4AA2]">NEET UG 2026</p>
        <p className="text-center text-sm font-bold text-[#31577F]">Information Bulletin</p>
        <div className="mt-6 space-y-3">{["w-full", "w-11/12", "w-full", "w-4/5", "w-10/12", "w-3/4"].map((width, index) => <span key={index} className={`block h-2 rounded-full bg-blue-100 ${width}`} />)}</div>
      </div>
      <Stethoscope className="absolute left-8 top-12 h-64 w-64 -rotate-12 text-[#0C6780] drop-shadow-xl" strokeWidth={1.5} />
      <div className="absolute bottom-12 right-5 flex h-28 w-28 items-center justify-center rounded-[30px] border-8 border-white bg-[linear-gradient(145deg,#02B7C5,#0870C8)] text-white shadow-[0_22px_35px_rgba(0,102,153,.3)] rotate-6">
        <ShieldPlus className="h-20 w-20" />
      </div>
      <Sparkles className="absolute right-4 top-12 h-7 w-7 text-[#1769E8]" />
      <Sparkles className="absolute bottom-16 left-4 h-5 w-5 text-[#009C95]" />
    </div>
  );
}

function QuickFacts() {
  return (
    <section aria-label="NEET UG 2026 quick facts" className="relative -mt-7 grid overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_16px_36px_rgba(8,42,98,.11)] sm:grid-cols-2 lg:grid-cols-6">
      {bulletinQuickFacts.map((fact) => { const Icon = factIcons[fact.icon]; return <div key={fact.label} className="flex min-h-[92px] items-center gap-3 border-b border-blue-50 p-3 sm:border-r lg:border-b-0"><Icon className="h-8 w-8 shrink-0 text-[#1769E8]" /><span><span className="block text-[10px] font-bold text-[#4D6686]">{fact.label}</span><strong className="block text-sm text-[#0A244F]">{fact.value}</strong><span className="block text-[9px] font-semibold text-[#60738F]">{fact.detail}</span></span></div>; })}
    </section>
  );
}

function SectionExplorer() {
  return (
    <section className="pt-12" aria-labelledby="bulletin-explore-title">
      <div className="text-center"><h2 id="bulletin-explore-title" className="text-2xl font-black tracking-[-.025em] text-[#071A45] sm:text-3xl">Explore NEET UG 2026 Information Bulletin</h2><p className="mt-2 text-sm font-semibold text-[#58708E]">Click any section to read detailed information</p></div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {bulletinSectionCards.map((card) => { const Icon = cardIcons[card.icon]; return <a key={card.id} href={`#${card.id}`} className="group flex min-h-[225px] flex-col items-center rounded-2xl border border-[#DDE8F4] bg-white p-5 text-center shadow-[0_9px_24px_rgba(8,42,98,.055)] transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_18px_32px_rgba(8,42,98,.10)]"><span className={`flex h-14 w-14 items-center justify-center rounded-xl border ${cardTone[card.tone]}`}><Icon className="h-8 w-8" /></span><span className="mt-3 text-[11px] font-black text-[#1769E8]">{card.tag}</span><h3 className="mt-1 text-base font-black leading-5 text-[#071A45]">{card.title}</h3><p className="mt-2 text-xs font-semibold leading-5 text-[#506989]">{card.description}</p><span className="mt-auto pt-3 text-xs font-black text-[#008F8B]">View Section <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></span></a>; })}
      </div>
    </section>
  );
}

function OnThisPage() {
  return (
    <aside className="sticky top-3 hidden overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-[0_12px_30px_rgba(8,42,98,.08)] lg:block">
      <h2 className="bg-[linear-gradient(100deg,#0B4AA2,#164FD0)] px-4 py-3 text-sm font-black text-white">On This Page</h2>
      <nav aria-label="Bulletin section navigation" className="max-h-[calc(100vh-90px)] overflow-y-auto p-2.5">
        {bulletinNavigation.map(([id, label]) => <a key={id} href={`#${id}`} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] font-bold leading-4 text-[#294A75] hover:bg-blue-50 hover:text-[#1769E8]"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1769E8]" />{label}</a>)}
      </nav>
    </aside>
  );
}

function MobileSectionNav() {
  return <nav aria-label="Bulletin section navigation" className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-2 lg:hidden">{bulletinNavigation.map(([id, label]) => <a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-blue-200 bg-white px-3 py-2 text-[11px] font-black text-[#17477D] shadow-sm">{label}</a>)}</nav>;
}

function SectionShell({ id, eyebrow, title, icon: Icon, children }: { id: string; eyebrow: string; title: string; icon: LucideIcon; children: ReactNode }) {
  return <section id={id} className="scroll-mt-5 rounded-2xl border border-[#DDE8F4] bg-white p-4 shadow-[0_10px_28px_rgba(8,42,98,.06)] sm:p-6"><div className="flex items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#EAF3FF,#E7F9F5)] text-[#1769E8]"><Icon className="h-6 w-6" /></span><div><span className="text-[10px] font-black uppercase tracking-[.13em] text-[#009C95]">{eyebrow}</span><h2 className="mt-1 text-xl font-black tracking-[-.025em] text-[#071A45] sm:text-2xl">{title}</h2></div></div><div className="mt-5 text-sm font-medium leading-7 text-[#334F73]">{children}</div></section>;
}

function Note({ children, warning = false }: { children: ReactNode; warning?: boolean }) {
  return <div className={`mt-4 flex items-start gap-2.5 rounded-xl border p-3.5 text-xs font-bold leading-5 sm:text-sm ${warning ? "border-amber-200 bg-amber-50 text-amber-950" : "border-blue-100 bg-blue-50/75 text-[#20446F]"}`}>{warning ? <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /> : <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#1769E8]" />}{children}</div>;
}

function BulletList({ items }: { items: readonly string[] }) {
  return <ul className="mt-3 grid gap-2">{items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#00A88F]" /><span>{item}</span></li>)}</ul>;
}

function SimpleCards({ items, columns = 2 }: { items: readonly (readonly [string, string])[]; columns?: 2 | 3 }) {
  return <div className={`mt-4 grid gap-3 ${columns === 3 ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2"}`}>{items.map(([title, text]) => <article key={title} className="rounded-xl border border-[#DCE7F2] bg-[linear-gradient(145deg,#fff,#F8FBFF)] p-4"><h3 className="font-black text-[#123768]">{title}</h3><p className="mt-1 text-xs font-semibold leading-5 text-[#516987] sm:text-sm sm:leading-6">{text}</p></article>)}</div>;
}

function DataTable({ headers, rows }: { headers: readonly string[]; rows: readonly (readonly (string | ReactNode)[])[] }) {
  return <div className="mt-4 overflow-x-auto rounded-xl border border-[#D8E4EF]"><table className="w-full min-w-[720px] border-collapse text-left text-xs"><thead className="bg-[#EAF3FF] text-[#123768]"><tr>{headers.map((header) => <th key={header} className="border-b border-[#D8E4EF] px-3 py-3 font-black">{header}</th>)}</tr></thead><tbody className="divide-y divide-[#E6EEF6]">{rows.map((row, index) => <tr key={index} className="align-top odd:bg-white even:bg-[#FAFCFF]">{row.map((cell, cellIndex) => <td key={cellIndex} className="px-3 py-3 font-semibold leading-5 text-[#385371]">{cell}</td>)}</tr>)}</tbody></table></div>;
}

function AboutSection() {
  return <SectionShell id="about-neet-ug-2026" eyebrow="Start reading" title="Chapter 2: About NEET UG 2026" icon={BookOpen}><p>NEET UG is the common national entrance and qualifying examination used for admission to MBBS, BDS, BAMS, BUMS, BSMS and BHMS courses under the applicable laws and regulations. NTA conducts the test; the relevant regulators and counselling authorities control eligibility, quotas, counselling and admission.</p><SimpleCards items={authorityCards} /><Note warning>NEET is an entrance and qualifying examination. Admission depends on rank, eligibility, counselling rules, category, domicile, documents and seat availability.</Note></SectionShell>;
}

function ImportantDatesSection() {
  return <SectionShell id="neet-2026-important-dates" eyebrow="At a glance" title="NEET UG 2026 Important Dates and Quick Facts" icon={CalendarDays}><DataTable headers={["Event", "Bulletin date / status"]} rows={importantDates} /><Note warning>These are the dates printed in the uploaded bulletin. Dates may be extended, changed or superseded by later official notices; check the NTA websites regularly.</Note></SectionShell>;
}

function ExamSchemeSection() {
  return <SectionShell id="neet-2026-examination-scheme" eyebrow="Chapter 4" title="NEET UG 2026 Examination Scheme" icon={ClipboardCheck}><p>The test covers Physics, Chemistry and Biology (Botany and Zoology) from the official NMC-notified syllabus. The uploaded bulletin specifies a pen-and-paper OMR examination of 180 compulsory MCQs in 180 minutes.</p><DataTable headers={["Subject", "Questions", "Marks", "Question type"]} rows={examPattern} /><div className="mt-4 grid gap-3 sm:grid-cols-4">{[["Duration","180 minutes"],["Total Marks","720"],["Mode","Pen & paper"],["Medium","Official language options"]].map(([a,b]) => <div key={a} className="rounded-xl bg-[#F1F7FF] p-3 text-center"><span className="text-[10px] font-black uppercase text-[#59718E]">{a}</span><strong className="mt-1 block text-sm text-[#123768]">{b}</strong></div>)}</div><Note>Marking: +4 for the correct/best answer, -1 for an incorrect answer and 0 for an unanswered question. Special treatment of dropped or multiple-correct questions follows the final key rules.</Note></SectionShell>;
}

function EligibilitySection() {
  return <SectionShell id="neet-2026-eligibility-mbbs-bds" eyebrow="Chapter 6" title="NEET UG 2026 Eligibility for MBBS and BDS" icon={UserCheck}><p>A candidate must complete 17 years on or before 31 December 2026. The bulletin states no upper age limit. Eligibility also depends on the recognized qualifying examination, the required Physics, Chemistry, Biology/Biotechnology and English subjects, and correct qualifying-code selection.</p><SimpleCards items={eligibilityCards} columns={3} /><DataTable headers={["Candidate type", "Key requirement", "Document / caution", "Counselling note"]} rows={eligibilityComparison} /><Note warning>Eligibility to sit NEET is provisional. A wrong qualifying code, missing subject/equivalence proof or unmet counselling rule can still make a candidate ineligible for admission.</Note></SectionShell>;
}

function CounsellingSection() {
  return <SectionShell id="neet-2026-counselling-reservation" eyebrow="Chapter 7" title="NEET UG 2026 Counselling and Reservation" icon={Users}><p>NTA supplies the result and All India Rank. Seat allotment happens only through the competent counselling authority. Students often need separate registrations for MCC, AACCC or State routes and must follow each authority&apos;s rules.</p><SimpleCards items={counsellingCards} columns={3} /><DataTable headers={["Route", "Authority", "Seat type", "Student action", "Notes"]} rows={counsellingComparison} /><Note warning>Central reservation percentages do not automatically apply to every State/private seat. State quota reservation follows the concerned State/UT policy.</Note></SectionShell>;
}

function MeritSection() {
  return <SectionShell id="neet-2026-merit-list-qualifying-criteria" eyebrow="Chapter 8" title="NEET UG 2026 Merit List and Qualifying Criteria" icon={Medal}><BulletList items={meritRules} /><Note warning>Qualifying NEET does not guarantee MBBS admission. Admission depends on rank, category, State quota, seat matrix, choices, documents and counselling participation.</Note></SectionShell>;
}

function AyushSection() {
  return <SectionShell id="neet-2026-ayush-admission-rules" eyebrow="Chapter 9" title="NEET UG 2026 AYUSH Admission Rules for BAMS, BSMS, BUMS and BHMS" icon={Leaf}><BulletList items={ayushRules} /><div className="mt-4 flex flex-wrap gap-2">{["BAMS", "BSMS", "BUMS", "BHMS", "AACCC AIQ", "State AYUSH"].map((item) => <span key={item} className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">{item}</span>)}</div></SectionShell>;
}

function DressCodeSection() {
  return <SectionShell id="neet-2026-dress-code-barred-items" eyebrow="Chapter 11" title="NEET UG 2026 Dress Code and Barred Items" icon={Shirt}><div className="grid gap-4 md:grid-cols-2"><article className="rounded-xl border border-red-200 bg-red-50/70 p-4"><h3 className="flex items-center gap-2 font-black text-red-800"><AlertTriangle className="h-5 w-5" />Barred Items</h3><BulletList items={barredItems} /></article><article className="rounded-xl border border-blue-200 bg-blue-50/70 p-4"><h3 className="flex items-center gap-2 font-black text-[#0B4AA2]"><Shirt className="h-5 w-5" />Dress Code</h3><BulletList items={dressCodeRules} /></article></div><Note warning>The current admit card and latest NTA public notice control exam-day entry. When the two differ from an older summary, follow the latest official instruction.</Note></SectionShell>;
}

function ResultSection() {
  return <SectionShell id="neet-2026-post-exam-result-answer-key" eyebrow="Chapter 15" title="NEET UG 2026 Answer Key, OMR, Result and Post-Exam Process" icon={BarChart3}><DataTable headers={["Stage", "What happens", "Student action", "Important caution"]} rows={resultProcess} /><div className="mt-4 rounded-xl bg-[linear-gradient(100deg,#0B4AA2,#008E8A)] p-4 text-white sm:flex sm:items-center sm:justify-between"><div><h3 className="font-black">Plan the next step after NEET</h3><p className="mt-1 text-xs font-semibold text-white/80">Compare the answer key, estimate rank and start counselling planning early.</p></div><div className="mt-3 flex flex-wrap gap-2 sm:mt-0"><Link href="/neet/answer-key" className="rounded-lg bg-white px-3 py-2 text-xs font-black text-[#0B4AA2]">Answer Key</Link><Link href="/?rank-predictor=open" className="rounded-lg border border-white/50 px-3 py-2 text-xs font-black text-white">Rank Predictor</Link></div></div></SectionShell>;
}

function SyllabusSection() {
  return <SectionShell id="neet-ug-2026-syllabus" eyebrow="Appendix III" title="NEET UG 2026 Syllabus" icon={ScrollText}><p>The official syllabus is notified by NMC and reproduced/referenced through the NTA bulletin. The visible topic map below helps students and search systems understand the subject coverage; it is a summary, not a replacement for the official syllabus.</p><div className="mt-4 grid gap-4 md:grid-cols-2">{syllabusTopics.map((subject) => <article key={subject.subject} className="rounded-xl border border-[#DCE7F2] bg-[#FAFCFF] p-4"><h3 className="text-lg font-black text-[#123768]">{subject.subject}</h3><ul className="mt-3 grid gap-1.5 sm:grid-cols-2">{subject.topics.map((topic) => <li key={topic} className="flex gap-2 text-xs font-semibold leading-5 text-[#496481]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00A88F]" />{topic}</li>)}</ul></article>)}</div><Note warning>Students should cross-check every unit and topic against Appendix III and the current NTA/NMC syllabus before final preparation.</Note></SectionShell>;
}

function StateDirectoratesSection() {
  const rows = neetStateCounsellingDirectorates2026.map((item) => [item.state, item.authority, <a key={item.website} href={item.website} target="_blank" rel="noopener noreferrer" className="font-black text-[#1769E8] underline decoration-blue-200 underline-offset-2">Official portal</a>, item.useCase, item.note]);
  return <SectionShell id="neet-2026-state-counselling-directorates" eyebrow="Appendix II" title="State Medical Education Directorates and Offices for NEET Counselling" icon={Building2}><p>This crawlable State/UT directory helps students locate the relevant authority. Counselling URLs, annual portals and committee names can change, so verify the current notice before paying or uploading documents.</p><DataTable headers={["State / UT", "Directorate / authority", "Official website", "Use case", "Notes"]} rows={rows} /><Note warning>The uploaded bulletin&apos;s Appendix II provides authority contacts, but candidates must use the latest State/UT notice for the live 2026 registration URL and schedule.</Note></SectionShell>;
}

function CollegeDetailsSection() {
  return <SectionShell id="neet-2026-college-details" eyebrow="Appendix IV" title="Details of Medical, Dental, Ayurveda, Siddha, Unani and Homoeopathy Colleges" icon={GraduationCap}><div className="grid gap-3 sm:grid-cols-3">{collegeCategories.map(([category, authority]) => <article key={category} className="rounded-xl border border-[#DCE7F2] bg-white p-4 text-center"><Landmark className="mx-auto h-7 w-7 text-[#1769E8]" /><h3 className="mt-2 font-black text-[#123768]">{category}</h3><p className="mt-1 text-xs font-bold text-[#009C95]">{authority}</p></article>)}</div><DataTable headers={["College category", "Related authority", "Student use", "Verification note"]} rows={collegeCategories} /><Note warning>College recognition, permitted intake, seat matrix and counselling availability can change. Verify the exact course and college with NMC, DCI, NCISM, NCH, MCC, AACCC and the State portal.</Note></SectionShell>;
}

function NriDocumentsSection() {
  return <SectionShell id="neet-2026-nri-oci-foreign-candidate-documents" eyebrow="Appendix VI & VII" title="NRI, OCI and Foreign Candidate Documents for NEET UG 2026" icon={FileCheck2}><p>Appendix VI provides the embassy-certificate format for an NRI claim; Appendix VII lists documentary proof of citizenship/nationality for foreign and OCI candidates. Counselling authorities may ask for additional relationship, sponsorship, residence, equivalence or visa documents.</p><SimpleCards items={nriDocumentCards} /><DataTable headers={["Candidate type", "Document focus", "When needed", "Important caution"]} rows={nriDocumentComparison} /><Note warning>Keep originals. Acceptance at the NTA application stage does not guarantee acceptance by MCC, State, university or college document-verification teams.</Note></SectionShell>;
}

function ApplicationSection() {
  return <SectionShell id="neet-2026-application-process" eyebrow="Chapter 3" title="NEET UG 2026 Application Process and Form Filling Instructions" icon={FileText}><BulletList items={applicationRules} /><Note warning>This section describes the official NTA application flow. It is separate from ilmaLink&apos;s optional student-profile signup.</Note></SectionShell>;
}

function AdmitCardSection() {
  return <SectionShell id="neet-2026-admit-card-exam-day" eyebrow="Chapters 10, 12, 13 & 14" title="NEET UG 2026 Admit Card and Exam Day Instructions" icon={ShieldCheck}><BulletList items={admitDayRules} /><div className="mt-4"><Link href="/neet/admit-card" className="inline-flex items-center gap-2 rounded-lg bg-[#0B4AA2] px-4 py-2.5 text-xs font-black text-white">Open Admit Card & Exam Day Guide <ArrowRight className="h-4 w-4" /></Link></div></SectionShell>;
}

function MiscellaneousSection() {
  return <SectionShell id="neet-2026-miscellaneous-provisions" eyebrow="Chapter 16 & remaining appendices" title="Other Important NEET UG 2026 Rules" icon={ScrollText}><SimpleCards items={miscellaneousRules} /><Note>For payment procedure, replica application form, scribe certificates and undertakings, use the exact official appendix/annexure format rather than a recreated template.</Note></SectionShell>;
}

function TrustStrip() {
  const icons = [HeartHandshake, Search, Phone, ShieldCheck];
  return <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Guide quality features">{trustItems.map(([title, text], index) => { const Icon = icons[index]; return <article key={title} className="flex items-start gap-3 rounded-2xl border border-[#DCE7F2] bg-white p-4 shadow-sm"><Icon className="h-8 w-8 shrink-0 text-[#1769E8]" /><div><h2 className="text-sm font-black text-[#123768]">{title}</h2><p className="mt-1 text-[11px] font-semibold leading-4 text-[#58708E]">{text}</p></div></article>; })}</section>;
}

function FaqAndCta() {
  return <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_.95fr]"><section id="neet-2026-faq" className="scroll-mt-5 rounded-2xl border border-[#DCE7F2] bg-white p-4 shadow-sm sm:p-5"><h2 className="text-xl font-black text-[#071A45]">Frequently Asked Questions</h2><div className="mt-4 divide-y divide-[#E5EDF5] rounded-xl border border-[#DCE7F2]">{neetInformationBulletinFaq2026.map((faq) => <details key={faq.question} className="group p-3"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-black text-[#193B68] sm:text-sm">{faq.question}<span className="text-lg text-[#1769E8] group-open:rotate-45">+</span></summary><p className="mt-2 pr-6 text-xs font-semibold leading-5 text-[#56708F] sm:text-sm sm:leading-6">{faq.answer}</p></details>)}</div></section><section className="rounded-2xl border border-[#DCE7F2] bg-[linear-gradient(145deg,#F7FBFF,#F1FAF8)] p-5 text-center shadow-sm"><h2 className="text-2xl font-black text-[#0B4AA2]">Need Help with NEET 2026?</h2><p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-[#46617F]">Get expert guidance for eligibility, counselling, documents and admission process.</p><div className="mt-5 grid gap-2 sm:grid-cols-2"><CtaLink href="https://wa.me/919563910223" external icon={MessageCircle} label="WhatsApp Chat" /><CtaLink href="/best-available-counselling" icon={HeartHandshake} label="Book Counselling" /><CtaLink href="tel:+919330155576" external icon={Phone} label="Call Helpline" /><CtaLink href="/?rank-predictor=open" icon={BarChart3} label="Check Rank Predictor" /><CtaLink href="/portal/signup" icon={UserCheck} label="Create Student Profile" wide /></div></section></div>;
}

function CtaLink({ href, icon: Icon, label, external = false, wide = false }: { href: string; icon: LucideIcon; label: string; external?: boolean; wide?: boolean }) {
  return <Link href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-3 text-xs font-black text-[#0B4AA2] shadow-sm hover:border-blue-300 ${wide ? "sm:col-span-2" : ""}`}><Icon className="h-5 w-5 text-[#00A88F]" />{label}</Link>;
}

function ImportantLinks() {
  return <section id="neet-2026-important-links" className="mt-5 scroll-mt-5 rounded-2xl border border-[#DCE7F2] bg-white p-5"><div className="grid gap-5 lg:grid-cols-2"><div><h2 className="text-lg font-black text-[#071A45]">Official NEET UG 2026 Links</h2><div className="mt-3 flex flex-wrap gap-2">{officialBulletinLinks.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-black text-[#1769E8]">{label}</a>)}</div></div><div><h2 className="text-lg font-black text-[#071A45]">Related ilmaLink Guides</h2><div className="mt-3 flex flex-wrap gap-2">{relatedLinks.map(([label, href]) => <Link key={href} href={href} className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-black text-[#087F78]">{label}</Link>)}</div></div></div></section>;
}

function Disclaimer() {
  return <section className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs font-semibold leading-5 text-amber-950"><p><strong>Disclaimer:</strong> This ilmaLink page is a student-friendly guide based on the NEET UG 2026 Information Bulletin. For final and legally binding instructions, candidates must rely on NTA, MCC, NMC, NCISM, NCH, AACCC and respective State counselling authorities.</p><div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-amber-200 pt-3"><span>Always verify updates on official websites.</span><span className="font-black">Last updated: 22 June 2026</span></div></section>;
}



