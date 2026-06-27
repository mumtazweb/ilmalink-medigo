import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCheck2 } from "lucide-react";

import CounsellingActionButton from "../components/CounsellingActionButton";
import Navbar from "../components/navbar";
import { documentsChecklist } from "../data/scholarshipsLoans";
import ScholarshipsLoansFinder from "./ScholarshipsLoansFinder";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "MBBS Scholarships & Education Loans in India & Abroad | ilmaLink",
  description:
    "Find MBBS scholarships, education loans, merit-based and category-based funding, student credit cards, minority finance, charitable support and ilmaLink fee support for medical students in India and abroad.",
  alternates: {
    canonical: "https://www.ilmalink.com/scholarships-loans",
  },
  openGraph: {
    title: "MBBS Scholarships & Education Loans | ilmaLink",
    description:
      "Find MBBS scholarships, education loans, merit scholarships, category support, student credit cards, charitable routes and ilmaLink fee support.",
    url: "https://www.ilmalink.com/scholarships-loans",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MBBS Scholarships & Education Loans | ilmaLink",
    description:
      "A practical MBBS funding finder for merit scholarships, category support, education loans and charitable routes in India and abroad.",
  },
};

const faqs = [
  {
    question: "Are scholarships available for MBBS abroad?",
    answer:
      "Full scholarships for MBBS abroad are limited. Some students may get university fee discounts, community support, education loans, minority finance loans, or ilmaLink fee support subject to verification.",
  },
  {
    question: "Can I get an education loan for MBBS abroad?",
    answer:
      "Yes, eligible students may apply through bank education loans, state student credit card schemes, minority finance loans, or private loan-scholarship options depending on state, income, documents, university and lender rules.",
  },
  {
    question: "Which loan is best for minority or state-finance eligible MBBS students?",
    answer:
      "WBMDFC/NMDFC Minority Education Loan may be one of the most relevant options for eligible minority students in West Bengal and other states, subject to income, documents, course, admission and official approval.",
  },
  {
    question: "Can WBMDFC/NMDFC loan be used for MBBS abroad?",
    answer:
      "The NMDFC education loan scheme includes support for eligible professional courses in India and abroad, but students must verify current rules through WBMDFC/NMDFC/MILAN official route.",
  },
  {
    question: "Does ilmaLink provide scholarships?",
    answer:
      "ilmaLink may provide admission-linked scholarship or fee support up to INR 3,00,000 when admission is processed through ilmaLink, subject to verification, approval and availability.",
  },
  {
    question: "How does ilmaLink Scholarship & Fee Support work?",
    answer:
      "ilmaLink reviews the student's profile, admission route, fee structure and available support scope. Any scholarship or fee support is conditional and may be lower than the maximum.",
  },
  {
    question: "What affects scholarship or loan approval?",
    answer:
      "Final approval depends on scheme rules, documents, income, category, institution, fund availability, lender rules and official verification. ilmaLink helps students prepare the route properly.",
  },
  {
    question: "What documents are needed for MBBS education loan?",
    answer:
      "Usually Class 10/12 marksheets, NEET score, admission letter, fee structure, income proof, identity proof, domicile, category/minority certificate if applicable, co-applicant documents and bank-specific documents are needed.",
  },
  {
    question: "Can I apply for both ilmaLink support and external loan?",
    answer:
      "Yes. Students may request ilmaLink support review and also apply for eligible external loans/scholarships through official portals.",
  },
  {
    question: "What if no government scholarship is available?",
    answer:
      "Students may check merit scholarships, category-based scholarships, education loans, student credit cards, charitable support, Zakat funds and ilmaLink fee support.",
  },
];

type FundingGuideSection = {
  anchor?: string;
  title: string;
  intro: string;
  items: {
    name: string;
    text: string;
    href: string;
  }[];
};

const fundingGuideSections: FundingGuideSection[] = [
  {
    anchor: "scholarships",
    title: "Central Government MBBS Scholarship & Loan Routes",
    intro:
      "Start with national portals because they cover central schemes, student verification, institute verification and education-loan routing for eligible medical aspirants.",
    items: [
      {
        name: "PM Vidyalaxmi Education Loan",
        text:
          "A central education-loan route for eligible students through participating banks, with official credit-guarantee and interest-support rules where applicable.",
        href: "https://pmvidyalaxmi.co.in/",
      },
      {
        name: "National Scholarship Portal",
        text:
          "The main Government of India portal for central and state scholarship applications, renewals and institute verification.",
        href: "https://scholarships.gov.in/",
      },
      {
        name: "Central sector medical scholarship checks",
        text:
          "MBBS students should check NSP scheme dates, institute eligibility, Aadhaar/bank validation, income certificate and category rules before applying.",
        href: "https://scholarships.gov.in/",
      },
    ],
  },
  {
    title: "Category, Minority & Welfare Routes",
    intro:
      "Eligible students should compare category-based, minority and welfare routes with state and national scholarship or loan portals.",
    items: [
      {
        name: "NMDFC / WBMDFC Minority Education Loan",
        text:
          "Education finance for eligible minority students can support professional courses in India and abroad, subject to income, documents and channelising-agency approval.",
        href: "https://milannmdfc.org/EL_SCHEME.aspx",
      },
      {
        name: "NMDFC official credit schemes",
        text:
          "NMDFC publishes income-linked credit lines and education-loan details that students should verify before admission-fee planning.",
        href: "https://nmdfc.org/",
      },
      {
        name: "Aikyashree West Bengal Minority Scholarship",
        text:
          "West Bengal minority students can check post-matric and merit-cum-means scholarship components where medical/professional education may be relevant.",
        href: "https://wbmdfcscholarship.in/",
      },
    ],
  },
  {
    title: "SC, ST, OBC & PwD Department Scholarship Routes",
    intro:
      "Category-based scholarships usually require correct certificate, income proof, course/institute eligibility, bank validation and timely renewal.",
    items: [
      {
        name: "SC Post-Matric and Top Class Education",
        text:
          "Eligible SC students should check Social Justice department and NSP routes for post-matric and top-class higher education support.",
        href: "https://socialjustice.gov.in/",
      },
      {
        name: "ST Post-Matric and Higher Education Scholarships",
        text:
          "Eligible ST students should verify Ministry of Tribal Affairs and NSP scholarship windows for higher education and professional courses.",
        href: "https://tribal.nic.in/",
      },
      {
        name: "OBC / EBC / DNT Scholarship Routes",
        text:
          "OBC, EBC and DNT students should check PM YASASVI, state scholarship portals and NSP notifications for medical-course eligibility.",
        href: "https://scholarships.gov.in/",
      },
      {
        name: "Scholarships for Students with Disabilities",
        text:
          "PwD students should verify DEPwD and NSP routes including post-matric and top-class education components.",
        href: "https://depwd.gov.in/",
      },
      {
        name: "OASIS West Bengal",
        text:
          "West Bengal SC, ST and OBC students should check OASIS for state scholarship applications, renewals and status.",
        href: "https://oasis.wb.gov.in/",
      },
    ],
  },
  {
    anchor: "education-loans",
    title: "Banks, Student Credit Card & Education Loan Routes",
    intro:
      "When scholarship eligibility is limited, bank education loans, PM Vidyalaxmi and state student credit-card routes become important for MBBS India and MBBS abroad planning.",
    items: [
      {
        name: "West Bengal Student Credit Card",
        text:
          "Eligible West Bengal students can check the official student credit-card route for higher education in India or abroad.",
        href: "https://wbscc.wb.gov.in/",
      },
      {
        name: "Bank education loans through official portals",
        text:
          "Students should compare margin money, collateral, moratorium, co-applicant profile, country/course recognition and repayment terms directly with banks.",
        href: "https://pmvidyalaxmi.co.in/",
      },
      {
        name: "MBBS abroad loan preparation",
        text:
          "For MBBS abroad, banks usually check admission letter, fee structure, passport, NEET details, university recognition, co-applicant income and repayment capacity.",
        href: "https://pmvidyalaxmi.co.in/",
      },
    ],
  },
  {
    anchor: "community-support",
    title: "Other Institutions, Zakat & Charitable Support",
    intro:
      "Community and charitable support can reduce pressure on families when used along with official loans or scholarships.",
    items: [
      {
        name: "G.D. Study Circle / G.D. Charitable Society",
        text:
          "Students can check G.D. Study Circle scholarship and education-support routes, especially for need-based professional-course assistance.",
        href: "https://gdstudycircle.org/",
      },
      {
        name: "West Bengal Zakat Fund",
        text:
          "Need-based Zakat support may be relevant for eligible students pursuing professional education, subject to scrutiny.",
        href: "https://wbzf.org/Scholarship",
      },
      {
        name: "AMP Scholarship / IndiaZakat",
        text:
          "AMP and IndiaZakat routes may help eligible students through scholarship drives or crowdfunding support.",
        href: "https://ampindia.org/amp_scholarship_fund",
      },
      {
        name: "R.D. Sethna Loan Scholarship",
        text:
          "A loan-scholarship option open to deserving Indian students across communities, subject to trustees' assessment and guarantor rules.",
        href: "https://www.rdsethnascholarships.org/",
      },
      {
        name: "IsDB Scholarship",
        text:
          "Eligible students can check Islamic Development Bank scholarship calls and programme rules for professional education support.",
        href: "https://www.isdb.org/scholarships",
      },
    ],
  },
];

const faqJsonLd = {
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
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.ilmalink.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Scholarships & Loans",
      item: "https://www.ilmalink.com/scholarships-loans",
    },
  ],
};

const faqJsonLdString = JSON.stringify(faqJsonLd).replace(/</g, "\\u003c");
const breadcrumbJsonLdString = JSON.stringify(breadcrumbJsonLd).replace(
  /</g,
  "\\u003c"
);

export default function ScholarshipsLoansPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLdString }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLdString }}
      />

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#EAF7FF_0%,#F7FFFC_52%,#EEF2FF_100%)] px-4 pb-6 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-10">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00C896]/50 to-transparent" />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <h1 className="max-w-4xl text-3xl font-extrabold tracking-normal text-[#061D3F] sm:text-4xl md:text-5xl">
              MBBS Scholarships & Education Loan Finder
            </h1>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-700 md:text-base md:leading-7">
              Check possible MBBS scholarship, education loan, merit-based support,
              category and community finance, student credit cards, Zakat,
              charitable support and ilmaLink admission-linked fee support routes
              in one compact profile tool.
            </p>

            <div className="mt-5 grid max-w-xl grid-cols-2 gap-2 sm:gap-3">
              <a
                href="#finder"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#061D3F,#0B315F)] px-4 py-2.5 text-sm font-extrabold !text-white shadow-[0_14px_28px_rgba(6,29,63,0.24)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(6,29,63,0.28)]"
              >
                <span className="!text-white">Find My Support</span>
                <ArrowRight size={16} className="text-white" />
              </a>
              <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#00C896]/45 bg-white px-4 py-2.5 text-sm font-extrabold text-[#047857] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#ECFDF5]">
                Request Guidance
                <ArrowRight size={16} />
              </CounsellingActionButton>
            </div>
          </div>
        </div>
      </section>

      <ScholarshipsLoansFinder />

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#047857]">
              MBBS Funding Details
            </p>
            <h2 className="mt-1 text-xl font-extrabold tracking-normal text-slate-950 md:text-2xl">
              Scholarship, loan, category support and charitable funding routes
            </h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-600">
              Use this ordered guide after checking your profile match. ilmaLink
              helps students compare official portals, prepare documents and move
              through the application route with end-to-end guidance.
              Education loans, merit scholarships, category-based support and
              community funding are all presented with official checks first.
            </p>
          </div>

          <div className="grid gap-4">
            {fundingGuideSections.map((section, index) => (
              <article
                key={section.title}
                id={section.anchor}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#1D4ED8]">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-extrabold text-slate-950 md:text-xl">
                      {section.title}
                    </h3>
                  </div>
                  <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-600">
                    Official checks first
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {section.intro}
                </p>
                <div className="mt-4 grid gap-3 lg:grid-cols-3">
                  {section.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:-translate-y-0.5 hover:border-[#00C896]/50 hover:bg-white hover:shadow-sm"
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-sm font-extrabold leading-5 text-slate-950">
                          {item.name}
                        </span>
                        <ArrowRight
                          size={15}
                          className="mt-0.5 shrink-0 text-slate-400 transition group-hover:text-[#047857]"
                        />
                      </span>
                      <span className="mt-2 block text-sm font-semibold leading-6 text-slate-600">
                        {item.text}
                      </span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#047857]">
                  <FileCheck2 size={16} />
                  Documents Checklist
                </p>
                <h2 className="mt-2 text-xl font-extrabold tracking-normal text-slate-950 md:text-2xl">
                  Keep these MBBS funding documents ready
                </h2>
              </div>
              <p className="max-w-2xl text-sm font-semibold leading-6 text-slate-600">
                Exact documents vary by portal, lender, trust, university and
                student profile. This list helps you prepare before applying.
              </p>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {documentsChecklist.map((document) => (
                <div
                  key={document}
                  className="flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <CheckCircle2 size={16} className="shrink-0 text-[#00A876]" />
                  <span className="text-sm font-semibold leading-5 text-slate-700">
                    {document}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#047857]">
              MBBS Funding FAQ
            </p>
            <h2 className="mt-2 text-xl font-extrabold tracking-normal text-slate-950 md:text-2xl">
              Scholarship and education-loan questions students ask most
            </h2>
          </div>

          <div className="grid gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-slate-200 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
                  <h3 className="text-base font-extrabold leading-6 text-slate-950">
                    {faq.question}
                  </h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition group-open:rotate-90">
                    <ArrowRight size={16} />
                  </span>
                </summary>
                <p className="border-t border-slate-100 px-4 py-4 text-sm font-semibold leading-6 text-slate-700">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 shadow-sm sm:p-5">
            <h2 className="text-xl font-extrabold text-amber-950">
              Important Disclaimer
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-amber-900">
              Scholarships, education loans, Zakat support, charitable support,
              student credit card support and ilmaLink support require official
              eligibility, document verification, fund availability, institution
              recognition, bank/NBFC rules, government rules, university/college
              rules, admission route, student profile and ilmaLink approval.
              Medigo, an extension/service line of ilmalink, guides students end-to-end and may offer
              admission-linked fee support up to INR 3,00,000 after
              verification.
            </p>
          </div>

          <div className="mt-5 rounded-lg border border-[#00C896]/30 bg-[#061D3F] p-4 text-white shadow-[0_18px_44px_rgba(6,29,63,0.16)] sm:p-5">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-2xl font-extrabold">
                  Need help finding the right MBBS scholarship or loan?
                </h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
                  Request a profile review, talk to a counsellor, or compare MBBS
                  country options before taking the next step.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[520px]">
                <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#00C896] px-4 py-3 text-sm font-extrabold text-[#061D3F] transition hover:bg-[#12dfad]">
                  Request Scholarship Review
                  <ArrowRight size={16} />
                </CounsellingActionButton>
                <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-white/15">
                  Talk to Counsellor
                  <ArrowRight size={16} />
                </CounsellingActionButton>
                <Link
                  href="/mbbs-abroad"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-extrabold text-[#061D3F] transition hover:bg-slate-100"
                >
                  Check MBBS Countries
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
