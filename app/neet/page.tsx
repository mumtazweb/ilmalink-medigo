import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  FileDown,
  FileQuestion,
  GraduationCap,
  Headphones,
  Landmark,
  LockKeyhole,
  MessageSquareText,
  Search,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

import JsonLd from "../components/JsonLd";
import Navbar from "../components/navbar";
import { neet2026CurrentStatus, neet2026OfficialLinks } from "../data/neet2026";
import { buildBreadcrumbSchema, buildFAQSchema } from "../lib/schema";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "NEET UG 2026 Hub: Exam, Answer Key, Preparation & Counselling",
  description:
    "Explore NEET UG 2026 exam information, question-paper analysis, answer keys, previous papers, preparation institutes, counselling and MBBS admission guidance.",
  alternates: { canonical: "https://www.ilmalink.com/neet" },
  keywords: [
    "NEET UG 2026",
    "NEET 2026 answer key",
    "NEET previous year questions",
    "NEET preparation institutes",
    "NEET counselling",
    "MBBS admission guidance",
  ],
  openGraph: {
    title: "NEET UG 2026 Student Hub | ILMALINK MEDIGO",
    description:
      "NEET 2026 exam information, questions, answer keys, preparation, counselling and MBBS admission support in one hub.",
    url: "https://www.ilmalink.com/neet",
    type: "website",
  },
  robots: { index: true, follow: true },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
  },
};

const hubCards = [
  {
    title: "NEET 2026 Information Bulletin",
    description: "Check NEET UG 2026 dates, eligibility, subjects, exam pattern and marks.",
    href: "/neet/information-bulletin",
    icon: ClipboardCheck,
    iconClass: "bg-[#EAF3FF] text-[#1769E8]",
  },
  {
    title: "NEET 2026 Question Paper Analysis & Students Discussion Centre",
    description: "Review the NEET 2026 question paper analysis and student discussions.",
    href: "/neet/discussion-centre",
    icon: MessageSquareText,
    iconClass: "bg-[#F3EBFF] text-[#7837DE]",
  },
  {
    title: "Download Answer Key",
    description: "Find NEET 2026 provisional and final answer-key resources.",
    href: "/neet/answer-key",
    icon: FileDown,
    iconClass: "bg-[#E6F8EF] text-[#18A86B]",
  },
  {
    title: "Search Questions",
    description: "Search NEET questions by topic, subject or question.",
    href: "/neet/questions",
    icon: Search,
    iconClass: "bg-[#E9F8FA] text-[#029BB5]",
  },
  {
    title: "NEET-UG Preparation Institutes",
    description: "Compare NEET coaching and residential preparation institutes.",
    href: "/neet/preparation-institutes",
    icon: Landmark,
    iconClass: "bg-[#FFF1E7] text-[#F06422]",
  },
  {
    title: "Previous Years Questions Hub",
    description: "Practice previous NEET question papers by year and subject.",
    href: "/neet/previous-year-questions",
    icon: BookOpen,
    iconClass: "bg-[#EDF2FF] text-[#2464DC]",
  },
  {
    title: "NEET Decision Centre",
    description: "Use NEET score, rank and admission decision tools.",
    href: "/neet/decision-centre",
    icon: BarChart3,
    iconClass: "bg-[#F5ECFF] text-[#8433E7]",
  },
  {
    title: "Counselling, Loan & Scholarships",
    description: "Explore NEET counselling, education loan and scholarship guidance.",
    href: "/neet/counselling-loan-scholarships",
    icon: GraduationCap,
    iconClass: "bg-[#FFF0F4] text-[#E33D69]",
  },
  {
    title: "MBBS Admission Centre",
    description: "Plan MBBS admission in India or abroad after NEET.",
    href: "/neet/mbbs-admission-centre",
    icon: Stethoscope,
    iconClass: "bg-[#E8F8F5] text-[#009B91]",
  },
] as const;

const paths = [
  {
    title: "Admit Card & Exam Day",
    description: "Download admit card, exam-day guidelines and important instructions.",
    href: "/neet/admit-card",
    icon: FileQuestion,
    cardClass: "border-[#BCD5FF] bg-[#F2F7FF]",
    iconClass: "bg-[#DFEBFF] text-[#1769E8]",
  },
  {
    title: "Results & Answer Key",
    description: "Check results, cut-offs and official answer-key updates.",
    href: "/neet/result",
    icon: ClipboardCheck,
    cardClass: "border-[#BFE9E1] bg-[#F0FBF8]",
    iconClass: "bg-[#DDF5EF] text-[#009B86]",
  },
  {
    title: "Counselling Guidance",
    description: "Follow counselling steps, documents and choice filling.",
    href: "/neet/counselling",
    icon: Users,
    cardClass: "border-[#F6D8C5] bg-[#FFF8F3]",
    iconClass: "bg-[#FFEAD9] text-[#F06422]",
  },
  {
    title: "MBBS Abroad / India",
    description: "Explore medical colleges and admission options in India and abroad.",
    href: "/mbbs-abroad",
    icon: Landmark,
    cardClass: "border-[#DED0F7] bg-[#FAF6FF]",
    iconClass: "bg-[#EEE3FF] text-[#6734C2]",
  },
] as const;

const tools = [
  { title: "Question Search", description: "Search topic-wise or question-wise NEET content.", href: "/neet/questions", icon: Search, tone: "text-[#0D4BA3] bg-[#EEF5FF]" },
  { title: "Previous Year Papers", description: "Access and practise past NEET question papers.", href: "/neet/previous-year-questions", icon: FileQuestion, tone: "text-[#6931CB] bg-[#F3EDFF]" },
  { title: "Discussion Hub", description: "Join student discussions and expert insights.", href: "/neet/discussion-centre", icon: MessageSquareText, tone: "text-[#1769E8] bg-[#EDF4FF]" },
  { title: "Scholarships", description: "Find scholarships and financial support options.", href: "/neet/counselling-loan-scholarships", icon: GraduationCap, tone: "text-[#6531BC] bg-[#F4EEFF]" },
  { title: "Decision Centre", description: "Use tools for rank, college and branch decisions.", href: "/neet/decision-centre", icon: BarChart3, tone: "text-[#7E31DC] bg-[#F5EDFF]" },
] as const;

const faqs = [
  {
    question: "Who is eligible for NEET UG 2026?",
    answer:
      "Students must meet the age, qualifying-examination, subject and document requirements in the latest official NEET UG 2026 notice.",
  },
  {
    question: "What subjects are included in NEET UG 2026?",
    answer: "Physics, Chemistry and Biology, including Botany and Zoology, are included in the NEET UG paper.",
  },
  {
    question: "How can I download the NEET UG 2026 admit card?",
    answer: "Sign in through the official NTA NEET candidate portal and follow the current admit-card notice.",
  },
  {
    question: "When will the NEET UG 2026 answer key be released?",
    answer: "Check the latest NTA public notice for the provisional answer-key and recorded-response schedule.",
  },
  {
    question: "How does NEET counselling process work?",
    answer:
      "Register with the applicable counselling authority, verify documents, fill choices, follow allotment rounds and complete reporting.",
  },
] as const;

const trustItems = [
  { title: "Trusted by Thousands", note: "Students across India", icon: ShieldCheck },
  { title: "Official & Updated", note: "Accurate information only", icon: CheckCircle2 },
  { title: "Secure & Reliable", note: "Your privacy is our priority", icon: LockKeyhole },
  { title: "Student Support", note: "We’re here to help", icon: Headphones },
] as const;

const hubItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://www.ilmalink.com/neet#student-resources",
  name: "NEET UG 2026 student resources",
  numberOfItems: hubCards.length,
  itemListElement: hubCards.map((card, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "WebPage",
      name: card.title,
      description: card.description,
      url: `https://www.ilmalink.com${card.href}`,
    },
  })),
};

const neetHubSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.ilmalink.com/neet#webpage",
  url: "https://www.ilmalink.com/neet",
  name: "NEET UG 2026 Student Hub",
  description:
    "NEET UG 2026 exam information, answer keys, questions, preparation, counselling and MBBS admission guidance.",
  inLanguage: "en-IN",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    geographicArea: { "@type": "Country", name: "India" },
  },
  about: [
    "NEET UG 2026",
    "NEET question papers",
    "NEET answer key",
    "NEET preparation",
    "NEET counselling",
    "MBBS admission",
  ],
  hasPart: { "@id": "https://www.ilmalink.com/neet#student-resources" },
};

export default function NeetHubPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "NEET UG 2026 Hub", url: "/neet" },
          ]),
          buildFAQSchema([...faqs]),
          neetHubSchema,
          hubItemListSchema,
        ]}
      />

      <style>{`
        body:has(.neet-reference-page) > div[class~="z-[2147483647]"] {
          display: none !important;
        }
        body:has(.neet-reference-page) button[class*="top-1/2"][class*="right-0"] {
          display: none !important;
        }
        body:has(.neet-reference-page) > footer:not(.neet-reference-footer) {
          display: none !important;
        }
        .neet-reference-page .neet-depth-panel {
          background: linear-gradient(145deg, rgba(255,255,255,.99), rgba(247,251,255,.97));
          box-shadow: 0 -7px 24px rgba(8,42,98,.06), 0 22px 55px rgba(18,78,145,.08);
        }
        .neet-reference-page .neet-depth-card {
          position: relative;
          isolation: isolate;
          transform-style: preserve-3d;
          background: linear-gradient(145deg, #ffffff 0%, #fbfdff 68%, #f5f9ff 100%);
          box-shadow:
            0 7px 15px rgba(8,42,98,.055),
            0 2px 3px rgba(8,42,98,.035),
            inset 0 1px 0 rgba(255,255,255,1);
        }
        .neet-reference-page .neet-depth-card::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: inherit;
          background: linear-gradient(115deg, rgba(255,255,255,.7), transparent 38%);
          pointer-events: none;
        }
        .neet-reference-page .neet-icon-cube {
          box-shadow:
            0 6px 12px rgba(8,42,98,.10),
            inset 0 1px 0 rgba(255,255,255,.92),
            inset 0 -2px 4px rgba(8,42,98,.06);
        }
        .neet-reference-page .neet-soft-card {
          box-shadow: 0 5px 12px rgba(8,42,98,.045), inset 0 1px 0 rgba(255,255,255,.9);
        }
        .neet-reference-page .neet-primary-button {
          box-shadow: 0 8px 17px rgba(11,74,162,.22), inset 0 1px 0 rgba(255,255,255,.24);
        }
        @media (hover: hover) {
          .neet-reference-page .neet-depth-card,
          .neet-reference-page .neet-soft-card,
          .neet-reference-page .neet-primary-button {
            transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
          }
          .neet-reference-page .neet-depth-card:hover {
            transform: perspective(900px) translateY(-3px) rotateX(1.2deg);
            box-shadow: 0 14px 26px rgba(8,42,98,.12), inset 0 1px 0 #fff;
          }
          .neet-reference-page .neet-soft-card:hover,
          .neet-reference-page .neet-primary-button:hover {
            transform: translateY(-2px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .neet-reference-page * {
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>
      <main className="neet-reference-page overflow-x-hidden bg-[radial-gradient(circle_at_12%_38%,rgba(22,105,232,.05),transparent_28%),radial-gradient(circle_at_88%_62%,rgba(0,156,149,.055),transparent_30%),#F9FCFF] text-[#082A62]">
        <Navbar />

        <section className="relative h-[287px] overflow-hidden border-b border-cyan-100/70 bg-[linear-gradient(104deg,#F9FCFF_0%,#ECF7FF_57%,#CFF5F3_100%)] sm:h-[330px] lg:h-[280px]">
          <div className="absolute inset-y-0 right-0 w-[58%] overflow-hidden border-l border-white/70 bg-[#DDF5F3] shadow-[-18px_0_38px_rgba(8,76,130,.10)] sm:w-[56%] lg:hidden">
            <Image
              src="/images/neet-hub-male-student.webp"
              alt="Young male medical student holding blue study books"
              fill
              priority
              sizes="(max-width: 639px) 58vw, 56vw"
              className="object-cover object-[72%_top]"
            />
            <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[#EDF8FF] via-[#EDF8FF]/55 to-transparent sm:w-20" />
          </div>
          <div className="absolute inset-y-0 left-[28%] hidden w-[56%] lg:block">
            <Image
              src="/images/neet-hub-male-student.webp"
              alt=""
              fill
              priority
              sizes="56vw"
              className="object-cover object-top"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,250,255,.98)_0%,rgba(239,248,255,.93)_45%,rgba(226,247,247,.08)_74%)] lg:bg-[linear-gradient(90deg,rgba(245,250,255,.97)_0%,rgba(239,248,255,.88)_44%,rgba(226,247,247,.04)_70%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[72%] opacity-35 [background-image:linear-gradient(30deg,rgba(23,105,232,.20)_1px,transparent_1px),linear-gradient(150deg,rgba(0,156,149,.16)_1px,transparent_1px),radial-gradient(circle,rgba(23,105,232,.25)_1px,transparent_1.5px)] [background-position:0_0,0_0,4px_4px] [background-size:42px_72px,42px_72px,42px_42px] [mask-image:linear-gradient(to_left,black,transparent_88%)]" />
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-[30%] h-28 w-28 rounded-full bg-blue-300/15 blur-2xl" />
          <div className="relative mx-auto h-full max-w-[1180px] px-5 pt-7 sm:px-8 sm:pt-9 lg:px-0 lg:pt-8">
            <h1 className="whitespace-nowrap text-[27px] font-black leading-[1.05] tracking-[-.035em] text-[#082A62] [text-shadow:0_2px_0_rgba(255,255,255,.75)] min-[430px]:text-[30px] sm:text-[45px] lg:text-[52px]">
              NEET <span className="text-[#009C95]">UG 2026</span> Hub
            </h1>
            <p className="mt-2 max-w-[255px] text-[16px] font-semibold leading-[1.45] text-[#172E58] sm:max-w-[410px] sm:text-[19px] lg:max-w-[590px] lg:text-[20px]">
              Your one-stop destination for everything NEET 2026.
            </p>
            <p className="max-w-[275px] text-[14px] font-medium leading-6 text-[#243A64] sm:max-w-[430px] sm:text-[17px] lg:max-w-none">
              Quickly enter the exact section you need.
            </p>

            <div className="mt-6 hidden items-center gap-6 lg:flex">
              <a href="#neet-sections" className="neet-primary-button inline-flex h-11 items-center gap-3 rounded-lg bg-[linear-gradient(105deg,#0B4AA2,#08377D)] px-5 text-sm font-extrabold !text-white">
                Explore All Sections
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0B4AA2]"><ArrowRight className="h-4 w-4" /></span>
              </a>
              <div className="flex items-center gap-3">
                <span className="neet-icon-cube flex h-10 w-10 items-center justify-center rounded-full bg-[#E9F3FF] text-[#0B4AA2]"><ShieldCheck className="h-5 w-5" /></span>
                <p className="text-xs font-semibold leading-5 text-[#30466C]"><strong className="block text-[#082A62]">Trusted. Updated. Student First.</strong>Everything you need for NEET success.</p>
              </div>
            </div>

            <div className="absolute bottom-3 left-5 flex h-[84px] w-[282px] overflow-hidden rounded-[17px] border border-white/90 bg-white/92 shadow-[0_15px_32px_rgba(8,42,98,.17),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-sm sm:bottom-6 sm:left-8 sm:w-[468px] lg:hidden">
              <div className="flex w-[68%] flex-col justify-center bg-[linear-gradient(115deg,#087B99,#13AAA2_68%,#20B9AD)] px-3.5 text-white shadow-[inset_-8px_0_18px_rgba(0,71,97,.10),inset_0_1px_0_rgba(255,255,255,.22)] sm:px-5">
                <span className="flex items-center gap-1.5 text-[12px] font-extrabold sm:text-sm"><Bell className="h-3.5 w-3.5" fill="currentColor" /> Announcement</span>
                <span className="mt-1 text-[12px] font-medium sm:text-sm">NEET UG 2026 Exam update</span>
                <strong className="text-[19px] leading-6 sm:text-[22px]">{neet2026CurrentStatus.date}</strong>
              </div>
              <a href={neet2026OfficialLinks.publicNotices} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 px-2 text-center text-[12px] font-extrabold leading-4 !text-[#082A62] sm:text-sm">
                <CalendarDays className="h-4 w-4 shrink-0 text-[#1769E8]" />
                <span>View<br />Important<br className="sm:hidden" /> Dates</span>
              </a>
            </div>

            <aside className="absolute right-0 top-5 hidden h-[220px] w-[230px] flex-col overflow-hidden rounded-[16px] border border-white/70 bg-white/95 shadow-[0_18px_40px_rgba(8,42,98,.16)] backdrop-blur lg:flex" aria-label="NEET UG 2026 exam announcement">
              <div className="relative flex flex-1 flex-col justify-center bg-[linear-gradient(135deg,#138EA5,#16AAA3)] px-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.22)]">
                <span className="absolute left-0 top-0 inline-flex items-center gap-1.5 rounded-br-xl bg-[#087D92] px-4 py-2 text-xs font-extrabold"><Bell className="h-3.5 w-3.5" fill="currentColor" /> Announcement</span>
                <p className="mt-6 text-sm font-semibold leading-5">NEET UG 2026<br />Exam update</p>
                <strong className="mt-1 text-xl leading-6">{neet2026CurrentStatus.date}</strong>
                <a href={neet2026OfficialLinks.publicNotices} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex h-8 items-center justify-center gap-2 rounded-full border border-white/65 px-3 text-[11px] font-extrabold !text-white">View Important Dates <CalendarDays className="h-3.5 w-3.5" /></a>
              </div>
              <div className="grid h-[58px] grid-cols-3 divide-x divide-slate-100 bg-white">
                <span className="flex flex-col items-center justify-center gap-1 text-center text-[9px] font-bold leading-3 text-[#31486F]"><ShieldCheck className="h-4 w-4 text-[#1769E8]" />Official<br />Updates</span>
                <span className="flex flex-col items-center justify-center gap-1 text-center text-[9px] font-bold leading-3 text-[#31486F]"><CheckCircle2 className="h-4 w-4 text-[#00A88F]" />Latest<br />News</span>
                <span className="flex flex-col items-center justify-center gap-1 text-center text-[9px] font-bold leading-3 text-[#31486F]"><Bell className="h-4 w-4 text-[#009C95]" />Important<br />Alerts</span>
              </div>
            </aside>
          </div>
        </section>

        <div className="neet-depth-panel relative z-10 -mt-3 rounded-t-[28px] px-3 pb-4 pt-2.5 sm:px-6 lg:mx-auto lg:-mt-6 lg:max-w-[1370px] lg:px-6 lg:pb-3 lg:pt-4">
          <section id="neet-sections" aria-labelledby="neet-sections-title">
            <h2 id="neet-sections-title" className="sr-only">NEET UG 2026 student information, tools and admission resources</h2>
            <div className="grid gap-1.5 lg:grid-cols-3 lg:gap-2.5">
              {hubCards.map((card, index) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="neet-depth-card group grid min-h-[58px] grid-cols-[40px_1fr_16px] items-center gap-2 rounded-[12px] border border-[#DDE7F2] px-2 py-1.5 hover:border-[#9DC6F4] sm:min-h-[64px] sm:grid-cols-[44px_1fr_18px] sm:px-2.5 lg:min-h-[88px] lg:p-3"
                >
                  <span className={`neet-icon-cube flex h-10 w-10 items-center justify-center rounded-[10px] sm:h-11 sm:w-11 ${card.iconClass}`}>
                    <card.icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={2.15} />
                  </span>
                  <span className="min-w-0">
                    <h3 className={`font-extrabold text-[#082A62] sm:text-[14px] sm:leading-[18px] lg:text-[13.5px] ${index === 1 ? "text-[11.5px] leading-[14px]" : "text-[12.5px] leading-4"}`}>
                      {index + 1}. {card.title}
                    </h3>
                    <p className="mt-0.5 text-[10px] font-medium leading-[13px] text-[#344B70] sm:text-[11.5px] sm:leading-[15px]">
                      {card.description}
                    </p>
                  </span>
                  <ChevronRight className="h-4 w-4 text-[#0B4AA2] transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-3" aria-labelledby="popular-paths-title">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3"><h2 id="popular-paths-title" className="text-[17px] font-extrabold tracking-[-.01em] text-[#082A62] sm:text-xl">Popular Student Paths</h2><span className="hidden rounded-full bg-[#E9F3FF] px-3 py-1 text-[10px] font-extrabold text-[#0B4AA2] lg:inline-flex">Handpicked for your NEET journey</span></div>
              <a href="#neet-sections" className="inline-flex shrink-0 items-center gap-1 text-[11px] font-extrabold text-[#0B4AA2] sm:text-sm">View All <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {paths.map((path) => (
                <Link key={path.title} href={path.href} className={`neet-soft-card flex min-h-[56px] items-center gap-1.5 rounded-[11px] border px-1.5 py-1.5 sm:min-h-[68px] sm:gap-2 sm:p-2.5 lg:min-h-[78px] lg:px-3 ${path.cardClass}`}>
                  <span className={`neet-icon-cube flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] sm:h-9 sm:w-9 lg:h-11 lg:w-11 ${path.iconClass}`}><path.icon className="h-4 w-4 sm:h-[18px] sm:w-[18px] lg:h-5 lg:w-5" /></span>
                  <span className="min-w-0"><h3 className="text-[9px] font-extrabold leading-[11px] text-[#082A62] sm:text-[12px] sm:leading-[15px] lg:text-[13px]">{path.title}</h3><p className="mt-1 hidden text-[11px] font-medium leading-4 text-[#344B70] lg:block">{path.description}</p></span>
                </Link>
              ))}
            </div>
          </section>

          <section id="featured-tools" className="mt-4" aria-labelledby="featured-tools-title">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3"><h2 id="featured-tools-title" className="text-[17px] font-extrabold tracking-[-.01em] text-[#082A62] sm:text-xl">Featured Tools & Resources</h2><span className="hidden rounded-full bg-[#EEF5FF] px-3 py-1 text-[10px] font-extrabold text-[#0B4AA2] lg:inline-flex">Smart tools for faster preparation</span></div>
              <a href="#neet-sections" className="inline-flex shrink-0 items-center gap-1 text-[11px] font-extrabold text-[#0B4AA2] sm:text-sm">View All <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {tools.map((tool) => (
                <Link key={tool.title} href={tool.href} className="neet-soft-card flex min-h-[56px] items-center gap-1 rounded-[11px] border border-[#DDE7F2] bg-white px-1 py-1.5 hover:border-blue-300 sm:min-h-[68px] sm:gap-2 sm:p-2.5 lg:min-h-[72px] lg:px-3">
                  <span className={`neet-icon-cube flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] sm:h-8 sm:w-8 lg:h-10 lg:w-10 ${tool.tone}`}><tool.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-[18px] lg:w-[18px]" /></span>
                  <span className="min-w-0"><h3 className="text-[8px] font-extrabold leading-[9.5px] text-[#082A62] sm:text-[11px] sm:leading-[14px] lg:text-[12px]">{tool.title}</h3><p className="mt-1 hidden text-[10.5px] font-medium leading-[14px] text-[#344B70] lg:block">{tool.description}</p></span>
                </Link>
              ))}
            </div>
          </section>

          <section className="neet-soft-card mt-3 rounded-[15px] border border-[#DDE7F2] bg-[linear-gradient(145deg,#FFFFFF,#F8FBFF)] p-2.5 sm:p-3.5 lg:hidden" aria-labelledby="faq-title">
            <h2 id="faq-title" className="px-1 text-[17px] font-extrabold text-[#082A62] sm:text-xl">Frequently Asked Questions</h2>
            <div className="mt-1.5 grid gap-1">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-[10px] border border-[#DFE8F2] bg-white shadow-[0_2px_5px_rgba(8,42,98,.025),inset_0_1px_0_#fff]">
                  <summary className="flex min-h-[33px] cursor-pointer list-none items-center justify-between gap-2 px-2.5 py-1.5 text-[10.5px] font-extrabold text-[#082A62] sm:min-h-[38px] sm:px-3 sm:text-sm [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 transition group-open:rotate-180" />
                  </summary>
                  <p className="border-t border-[#E6ECF3] px-3 py-2 text-[11px] font-medium leading-4 text-slate-600 sm:text-xs">{faq.answer}</p>
                </details>
              ))}
            </div>

            <a href="#neet-sections" className="neet-primary-button mt-2.5 flex min-h-[40px] items-center justify-center gap-2.5 rounded-[11px] bg-[linear-gradient(105deg,#0B4AA2,#08377D_62%,#0B4AA2)] text-[13px] font-extrabold !text-white sm:text-[15px]">
              Explore All Sections <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#0B4AA2] shadow-sm"><ArrowRight className="h-3.5 w-3.5" /></span>
            </a>
            <Link href="/best-available-counselling" className="neet-soft-card mt-2 flex min-h-[44px] items-center justify-center gap-2.5 rounded-[11px] border border-[#0B4AA2] bg-[linear-gradient(145deg,#fff,#f8fbff)] text-[#082A62]">
              <Headphones className="h-5 w-5" />
              <span><strong className="block text-[14px] leading-4 sm:text-base">Book Counselling</strong><span className="block text-[10px] font-medium text-[#30456D] sm:text-xs">Get expert guidance for your NEET journey</span></span>
            </Link>
          </section>

          <section className="neet-soft-card mt-3 grid grid-cols-4 gap-0 rounded-[13px] border border-[#D5E3F0] bg-[linear-gradient(135deg,#F5F9FD,#EAF4FC)] px-1 py-2 lg:hidden" aria-label="Why students trust ILMALINK MEDIGO">
            {trustItems.map((item, index) => (
              <div key={item.title} className={`flex min-w-0 items-center gap-1 px-1.5 ${index ? "border-l border-[#CBD8E6]" : ""}`}>
                <item.icon className="h-4 w-4 shrink-0 text-[#0B4AA2] sm:h-5 sm:w-5" />
                <span className="min-w-0"><strong className="block text-[8.5px] font-extrabold leading-[10px] text-[#082A62] sm:text-[11px] sm:leading-4">{item.title}</strong><span className="mt-0.5 block text-[7px] font-medium leading-[9px] text-[#31486F] sm:text-[9px] sm:leading-3">{item.note}</span></span>
              </div>
            ))}
          </section>
        </div>

        <section className="hidden border-y border-[#D7E7F5] bg-[linear-gradient(90deg,#E9F4FF,#F5FAFF,#E9F7F6)] px-8 py-3 lg:block" aria-label="Why students trust ILMALINK MEDIGO">
          <div className="mx-auto grid max-w-[1180px] grid-cols-4">
            {trustItems.map((item, index) => (
              <div key={item.title} className={`flex items-center justify-center gap-3 px-5 ${index ? "border-l border-[#BDD0E2]" : ""}`}>
                <item.icon className="h-6 w-6 shrink-0 text-[#0B4AA2]" />
                <span><strong className="block text-sm font-extrabold leading-4 text-[#082A62]">{item.title}</strong><span className="mt-1 block text-[11px] font-medium text-[#31486F]">{item.note}</span></span>
              </div>
            ))}
          </div>
        </section>

        <footer className="neet-reference-footer hidden bg-[linear-gradient(115deg,#073B7A,#064B91_48%,#06366F)] text-white lg:block">
          <div className="mx-auto grid max-w-[1180px] grid-cols-[1.45fr_.8fr_.8fr_.8fr_1.1fr] gap-10 px-2 py-2">
            <div>
              <Link href="/" className="flex items-center gap-2 !text-white">
                <Image src="/logoimage.svg" alt="" width={40} height={40} className="h-10 w-10 rounded-lg bg-white p-1 object-contain" />
                <span><strong className="block text-lg tracking-wide">ILMALINK MEDIGO</strong><span className="block text-[10px] font-semibold">Global Medical Education</span></span>
              </Link>
              <p className="mt-3 max-w-[230px] text-[11px] font-medium leading-4 text-blue-100">Empowering future doctors with trusted guidance and resources.</p>
            </div>

            <nav aria-label="NEET footer quick links">
              <h2 className="text-xs font-extrabold">Quick Links</h2>
              <div className="mt-2 grid gap-1 text-[11px] font-medium text-blue-100"><Link href="/neet/information-bulletin" className="!text-blue-100">NEET 2026 Info</Link><Link href="/neet/preparation-institutes" className="!text-blue-100">Preparation</Link><Link href="/neet/questions" className="!text-blue-100">Question Search</Link><Link href="/neet/previous-year-questions" className="!text-blue-100">Previous Papers</Link></div>
            </nav>

            <nav aria-label="NEET footer resources">
              <h2 className="text-xs font-extrabold">Resources</h2>
              <div className="mt-2 grid gap-1 text-[11px] font-medium"><Link href="/neet/answer-key" className="!text-blue-100">Answer Key</Link><Link href="/neet/result" className="!text-blue-100">Cut Offs</Link><Link href="/neet/counselling" className="!text-blue-100">Counselling</Link><Link href="/neet/counselling-loan-scholarships" className="!text-blue-100">Scholarships</Link></div>
            </nav>

            <nav aria-label="Company links">
              <h2 className="text-xs font-extrabold">Company</h2>
              <div className="mt-2 grid gap-1 text-[11px] font-medium"><Link href="/about" className="!text-blue-100">About Us</Link><Link href="/about" className="!text-blue-100">Contact Us</Link><Link href="/trust-center" className="!text-blue-100">Privacy Policy</Link><Link href="/trust-center" className="!text-blue-100">Terms & Conditions</Link></div>
            </nav>

            <div>
              <h2 className="text-xs font-extrabold">Connect With Us</h2>
              <div className="mt-2 flex gap-2">
                {[
                  { label: "Facebook", href: "https://www.facebook.com/ilmalinkeduprise/", icon: FaFacebookF },
                  { label: "Instagram", href: "https://www.instagram.com/ilmalinkmbbs/", icon: FaInstagram },
                  { label: "YouTube", href: "https://www.youtube.com/@ilmaLinkFoundation", icon: FaYoutube },
                  { label: "Telegram", href: "https://t.me/+919563910223", icon: FaTelegramPlane },
                ].map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="flex h-7 w-7 items-center justify-center rounded-full bg-white !text-[#0B4AA2]"><social.icon className="h-3.5 w-3.5" /></a>)}
              </div>
              <div className="mt-2 rounded-lg border border-white/35 px-2 py-1.5 text-[9px] leading-3.5 text-blue-100"><strong className="block text-white">Need Help?</strong>support@ilmalinkmedigo.com<br />+91 98765 43210</div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
