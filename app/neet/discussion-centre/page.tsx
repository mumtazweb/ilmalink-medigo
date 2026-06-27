import type { Metadata } from "next";
import Link from "next/link";
import {
  Atom,
  BarChart3,
  Beaker,
  BookOpenCheck,
  Bookmark,
  ChevronRight,
  CircleUserRound,
  Download,
  FileSearch,
  FlaskConical,
  Leaf,
  MessageCircleMore,
  MessagesSquare,
  Search,
  Sparkles,
} from "lucide-react";

import JsonLd from "../../components/JsonLd";
import Navbar from "../../components/navbar";
import NeetFaq, { type NeetFaqItem } from "../../components/neet/NeetFaq";
import NeetQuestionSearch from "../../components/neet/NeetQuestionSearch";
import {
  NeetBottomCta,
  NeetDownloadCard,
  NeetPageFrame,
  NeetQuickActionCard,
  NeetSectionHeading,
  NeetSubpageHero,
} from "../../components/neet/NeetSubpageUi";
import { neet2026Questions } from "../../data/neet2026Questions";
import { buildBreadcrumbSchema, buildFAQSchema } from "../../lib/schema";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "NEET 2026 Question Paper Analysis & Students Discussion Centre",
  description:
    "Read NEET 2026 paper analysis, search questions, compare supplied answer markers and explore moderated student discussion topics.",
  alternates: {
    canonical: "https://www.ilmalink.com/neet/discussion-centre",
  },
  keywords: [
    "NEET 2026 question paper analysis",
    "NEET student discussion centre",
    "NEET 2026 questions answers",
    "Re-NEET 2026 question paper",
    "NEET Physics Chemistry Biology analysis",
  ],
  openGraph: {
    title: "NEET 2026 Analysis & Discussion Centre | ilmaLink",
    description:
      "Question search, supplied answer-key PDF, subject review and student discussion topics for NEET 2026.",
    url: "https://www.ilmalink.com/neet/discussion-centre",
    type: "website",
  },
};

const quickActions = [
  {
    title: "Search Questions",
    href: "/neet/questions",
    icon: Search,
    iconClass: "bg-[#EAF3FF] text-[#0A69E8]",
  },
  {
    title: "Download Answer Key",
    href: "/neet/answer-key",
    icon: Download,
    iconClass: "bg-[#E7F8F2] text-[#08A776]",
  },
  {
    title: "Topic-wise Analysis",
    href: "#topic-analysis",
    icon: BarChart3,
    iconClass: "bg-[#F3EBFF] text-[#7837DE]",
  },
  {
    title: "Student Discussions",
    href: "#student-discussions",
    icon: MessageCircleMore,
    iconClass: "bg-[#FFF0E6] text-[#F47A20]",
  },
] as const;

const subjectAnalysis = [
  {
    subject: "Biology",
    icon: Leaf,
    iconClass: "bg-[#19AD72] text-white",
    borderClass: "border-[#9BDCC3]",
    titleClass: "text-[#079C62]",
    tagClass: "bg-[#E5F8EF] text-[#087B59]",
  },
  {
    subject: "Physics",
    icon: Atom,
    iconClass: "bg-[#087AF0] text-white",
    borderClass: "border-[#AED2F9]",
    titleClass: "text-[#0870DE]",
    tagClass: "bg-[#E8F3FF] text-[#0963C2]",
  },
  {
    subject: "Chemistry",
    icon: FlaskConical,
    iconClass: "bg-[#8038E8] text-white",
    borderClass: "border-[#D8C1F7]",
    titleClass: "text-[#7631DA]",
    tagClass: "bg-[#F2E9FF] text-[#7431D2]",
  },
] as const;

const discussions = [
  {
    title: "Biology Section Discussion",
    text: "Discuss questions from Botany and Zoology sections.",
    icon: Leaf,
    tone: "bg-[#E5F8EF] text-[#08A776]",
  },
  {
    title: "Expected Cutoff Talk",
    text: "Compare student impressions without treating estimates as official.",
    icon: BarChart3,
    tone: "bg-[#E8F3FF] text-[#087AF0]",
  },
  {
    title: "Doubt on Physics Question",
    text: "Review source diagrams, formulas and answer markers.",
    icon: Atom,
    tone: "bg-[#F2E9FF] text-[#8038E8]",
  },
  {
    title: "Chemistry Question Review",
    text: "Discuss reactions, statements and calculation-based items.",
    icon: Beaker,
    tone: "bg-[#FFF0E6] text-[#F47A20]",
  },
  {
    title: "Paper Difficulty Discussion",
    text: "Share section-wise observations for moderated review.",
    icon: MessagesSquare,
    tone: "bg-[#EAF8F7] text-[#009C95]",
  },
] as const;

const resources = [
  {
    title: "Answer Key PDF",
    text: "Open both protected NEET 2026 PDF download options.",
    href: "/neet/answer-key#downloads",
    icon: BookOpenCheck,
    tone: "bg-[#E5F8EF] text-[#08A776]",
  },
  {
    title: "Question Search",
    text: "Search questions by text, option, answer or question number.",
    href: "/neet/questions",
    icon: Search,
    tone: "bg-[#EAF3FF] text-[#087AF0]",
  },
  {
    title: "Paper Pattern Review",
    text: "Explore the supplied Physics, Chemistry and Biology set.",
    href: "/neet/re-neet-2026-questions",
    icon: FileSearch,
    tone: "bg-[#F2E9FF] text-[#8038E8]",
  },
  {
    title: "Expert Insights",
    text: "Academic explanations will be added after review.",
    href: "#topic-analysis",
    icon: CircleUserRound,
    tone: "bg-[#FFF0E6] text-[#F47A20]",
  },
] as const;

const faqs: NeetFaqItem[] = [
  {
    question: "How do I search a question?",
    answer:
      "Enter a keyword, topic, option text, answer text or question number. You can also narrow results by subject and the available review fields.",
  },
  {
    question: "Where can I download answer keys?",
    answer:
      "Use the PDF download card on this page, the Answer Key page or the Question Search page.",
  },
  {
    question: "Can students ask doubts here?",
    answer:
      "The discussion cards currently organise common doubt topics. A public forum backend is not active in this phase.",
  },
  {
    question: "How is the analysis organised?",
    answer:
      "The page is divided into Biology, Physics and Chemistry. Detailed chapter, topic and difficulty analysis will be added after academic review.",
  },
  {
    question: "Will every question get a separate page?",
    answer:
      "Yes. Every extracted question has its own page with the source crop, supplied answer marker, review note and related questions.",
  },
];

export default function NeetDiscussionCentrePage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "NEET Hub", url: "/neet" },
            {
              name: "Analysis & Discussion",
              url: "/neet/discussion-centre",
            },
          ]),
          buildFAQSchema(faqs),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Question Paper Analysis & Students Discussion Centre",
            url: "https://www.ilmalink.com/neet/discussion-centre",
            description:
              "NEET 2026 question search, subject review, supplied answer markers and moderated discussion topics.",
            about: ["NEET 2026", "Question paper analysis", "Student discussion"],
          },
        ]}
      />

      <main className="overflow-x-hidden">
        <Navbar />
        <NeetSubpageHero
          breadcrumb={[
            { label: "NEET Hub", href: "/neet" },
            { label: "Analysis & Discussion" },
          ]}
          title={
            <>
              Question Paper Analysis & Students{" "}
              <span className="text-[#009C95]">Discussion Centre</span>
            </>
          }
          subtitle="Read paper analysis, search questions, compare answers and join moderated student discussions."
        />

        <NeetPageFrame>
          <div className="relative z-10 -mt-11 space-y-5 sm:-mt-12 sm:space-y-7">
            <section
              aria-label="NEET analysis quick actions"
              className="grid grid-cols-4 overflow-hidden rounded-2xl border border-[#DDE6F0] bg-white shadow-[0_12px_28px_rgba(8,42,98,.10)]"
            >
              {quickActions.map((action) => (
                <NeetQuickActionCard key={action.title} {...action} />
              ))}
            </section>

            <section aria-labelledby="discussion-search-title">
              <h2
                id="discussion-search-title"
                className="mb-3 text-xl font-black text-[#082A62]"
              >
                Search NEET Questions
              </h2>
              <NeetQuestionSearch
                questions={neet2026Questions}
                variant="preview"
              />
            </section>

            <NeetDownloadCard />

            <section id="topic-analysis" className="scroll-mt-24">
              <NeetSectionHeading
                icon={BarChart3}
                title="Question Paper Analysis"
                action={
                  <Link
                    href="/neet/re-neet-2026-questions"
                    className="inline-flex items-center gap-1 text-xs font-black text-[#0B4AA2]"
                  >
                    View All Analysis
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                }
              />
              <div className="mt-3 grid gap-2.5">
                {subjectAnalysis.map((item) => (
                  <article
                    key={item.subject}
                    className={`rounded-2xl border bg-white p-3 shadow-[0_7px_18px_rgba(8,42,98,.045)] ${item.borderClass}`}
                  >
                    <div className="grid grid-cols-[48px_1fr] gap-3">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full shadow-[0_7px_14px_rgba(8,42,98,.12)] ${item.iconClass}`}
                      >
                        <item.icon className="h-6 w-6" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3
                            className={`text-lg font-black ${item.titleClass}`}
                          >
                            {item.subject}
                          </h3>
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-black ${item.tagClass}`}
                          >
                            Review in progress
                          </span>
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold text-[#3F577A]">
                          <span className="flex items-center gap-1.5">
                            <i className="h-2 w-2 rounded-full bg-[#12AD76]" />
                            Easy: review pending
                          </span>
                          <span className="flex items-center gap-1.5">
                            <i className="h-2 w-2 rounded-full bg-[#F58220]" />
                            Moderate: review pending
                          </span>
                          <span className="flex items-center gap-1.5">
                            <i className="h-2 w-2 rounded-full bg-[#D91F36]" />
                            Tough: review pending
                          </span>
                        </div>
                        <p className="mt-2 text-xs font-semibold leading-5 text-[#405779]">
                          <strong className="text-[#17396E]">
                            High-weightage chapters:
                          </strong>{" "}
                          Analysis will be updated after complete question
                          review.
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#60738F]">
                          Question trend and chapter summary will be updated
                          after review.
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section
              id="student-discussions"
              className="scroll-mt-24"
              aria-labelledby="student-discussions-title"
            >
              <NeetSectionHeading
                icon={MessagesSquare}
                title="Student Discussions"
                action={
                  <span className="text-xs font-black text-[#0B4AA2]">
                    Moderated topics
                  </span>
                }
              />
              <div className="mt-3 overflow-hidden rounded-2xl border border-[#D8E3EE] bg-white shadow-[0_7px_18px_rgba(8,42,98,.05)]">
                {discussions.map((discussion) => (
                  <a
                    key={discussion.title}
                    id={discussion.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")}
                    href={`#${discussion.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")}`}
                    className="grid grid-cols-[38px_1fr_auto] items-center gap-2.5 border-b border-[#E1E8F0] px-3 py-2.5 last:border-b-0 hover:bg-[#F8FBFF]"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${discussion.tone}`}
                    >
                      <discussion.icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <strong className="block text-sm text-[#17396E]">
                        {discussion.title}
                      </strong>
                      <span className="block truncate text-[11px] font-medium text-[#5A708E] sm:text-xs">
                        {discussion.text}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-[#0B4AA2]" />
                  </a>
                ))}
              </div>
            </section>

            <section aria-labelledby="trending-resources-title">
              <NeetSectionHeading
                icon={Bookmark}
                title="Trending Resources"
              />
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {resources.map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.href}
                    className="grid min-h-[92px] grid-cols-[48px_1fr_auto] items-center gap-3 rounded-2xl border border-[#DCE5EF] bg-white p-3 shadow-[0_7px_18px_rgba(8,42,98,.045)] hover:border-[#A9CBEF]"
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${resource.tone}`}
                    >
                      <resource.icon className="h-6 w-6" />
                    </span>
                    <span>
                      <strong className="block text-sm text-[#17396E]">
                        {resource.title}
                      </strong>
                      <span className="mt-1 block text-xs font-medium leading-5 text-[#5A708E]">
                        {resource.text}
                      </span>
                    </span>
                    <ChevronRight className="h-5 w-5 text-[#0B4AA2]" />
                  </a>
                ))}
              </div>
            </section>

            <NeetFaq items={faqs} />

            <section className="rounded-2xl border border-[#C7E4DF] bg-[linear-gradient(115deg,#F5FCFA,#EFF8FF)] p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#009C95] shadow-sm">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-black text-[#082A62]">
                    Academic review note
                  </h2>
                  <p className="mt-1 text-sm font-medium leading-6 text-[#526985]">
                    Question pages preserve the supplied booklet’s answer
                    markers and source images. Detailed explanations, chapter
                    tags, topic tags and difficulty labels are being reviewed.
                  </p>
                </div>
              </div>
            </section>

            <NeetBottomCta />
          </div>
        </NeetPageFrame>
      </main>
    </>
  );
}
