import type { BlogDatabase, BlogPost } from "./types";

// BLOG SYSTEM: Seed posts provide production-like content until a real database is attached.
export const blogCategories = [
  "MBBS India",
  "MBBS Abroad",
  "NEET",
  "Scholarships",
  "Career",
  "Loans",
  "University Reviews",
] as const;

const baseContent = (country: string, focus: string) => `
## Overview
${focus}

## Why it matters
Students and families need verified information before choosing a medical education pathway. This guide explains the core eligibility points, planning steps, and questions to ask before applying.

## Key points
- Check recognition, curriculum duration, and clinical exposure.
- Compare total cost, living expenses, visa rules, and exam requirements.
- Keep documents ready before the counselling or application timeline begins.
- Speak with an expert before making payments or selecting a university.

## ILMALINK MEDIGO guidance
ILMALINK MEDIGO helps students compare realistic options for ${country}, India, NEET counselling, scholarships, education loans, and career planning with transparent guidance.
`;

export const seedBlogs: BlogPost[] = [
  {
    id: "blog-001",
    title: "MBBS in Kyrgyzstan Guide for Indian Students",
    slug: "mbbs-in-kyrgyzstan-guide",
    featuredImage: "/blog/mbbs-kyrgyzstan.svg",
    imageAlt: "Medical university campus illustration for Kyrgyzstan MBBS guide",
    shortDescription:
      "A practical guide to eligibility, fees, admission planning and key checks before choosing MBBS in Kyrgyzstan.",
    category: "MBBS Abroad",
    country: "Kyrgyzstan",
    tags: ["MBBS Abroad", "Kyrgyzstan", "Admission"],
    authorId: "user-admin",
    authorName: "ILMALINK Editorial Team",
    publishDate: "2026-05-18",
    updatedAt: "2026-05-18",
    readTime: "5 min read",
    views: 1430,
    status: "published",
    seoTitle: "MBBS in Kyrgyzstan Guide for Indian Students | ILMALINK MEDIGO",
    metaDescription:
      "Explore MBBS in Kyrgyzstan for Indian students with eligibility, fees, admission planning, university checks and counselling guidance.",
    keywords: ["MBBS in Kyrgyzstan", "MBBS Abroad", "medical admission"],
    content: baseContent(
      "Kyrgyzstan",
      "Kyrgyzstan remains a popular MBBS abroad option for students looking for affordable medical education with English-medium pathways."
    ),
  },
  {
    id: "blog-002",
    title: "NEET Counselling Checklist Before Choice Filling",
    slug: "neet-counselling-checklist-before-choice-filling",
    featuredImage: "/blog/neet-counselling.svg",
    imageAlt: "NEET counselling checklist illustration",
    shortDescription:
      "Documents, rank analysis, budget mapping and choice filling tips every NEET aspirant should review early.",
    category: "NEET",
    country: "India",
    tags: ["NEET", "Counselling", "MBBS India"],
    authorId: "user-admin",
    authorName: "ILMALINK Editorial Team",
    publishDate: "2026-05-16",
    updatedAt: "2026-05-16",
    readTime: "4 min read",
    views: 2210,
    status: "published",
    seoTitle: "NEET Counselling Checklist Before Choice Filling",
    metaDescription:
      "Use this NEET counselling checklist to prepare documents, budget, rank analysis and choice filling strategy.",
    keywords: ["NEET counselling", "choice filling", "MBBS India"],
    content: baseContent(
      "India",
      "NEET counselling becomes easier when students prepare documents, category certificates, fee budgets, and realistic college preferences in advance."
    ),
  },
  {
    id: "blog-003",
    title: "MBBS India Admission Planning After NEET",
    slug: "mbbs-india-admission-planning-after-neet",
    featuredImage: "/blog/mbbs-india.svg",
    imageAlt: "Indian medical admission planning illustration",
    shortDescription:
      "Understand how to plan government, private, deemed and management quota options after NEET results.",
    category: "MBBS India",
    country: "India",
    tags: ["MBBS India", "NEET", "Admission"],
    authorId: "user-admin",
    authorName: "ILMALINK Editorial Team",
    publishDate: "2026-05-13",
    updatedAt: "2026-05-13",
    readTime: "6 min read",
    views: 1844,
    status: "published",
    seoTitle: "MBBS India Admission Planning After NEET | ILMALINK MEDIGO",
    metaDescription:
      "Plan MBBS India admission after NEET with guidance on government, private, deemed and management quota options.",
    keywords: ["MBBS India", "NEET result", "medical admission"],
    content: baseContent(
      "India",
      "A realistic MBBS India plan compares score, category, state quota, budget, college preference, and backup options."
    ),
  },
  {
    id: "blog-004",
    title: "Scholarships for Medical Students: What to Prepare",
    slug: "scholarships-for-medical-students-what-to-prepare",
    featuredImage: "/blog/scholarships.svg",
    imageAlt: "Scholarship planning for medical students illustration",
    shortDescription:
      "A clear preparation guide for scholarship documents, eligibility proof and application timelines.",
    category: "Scholarships",
    country: "India",
    tags: ["Scholarships", "Medical Education", "Documents"],
    authorId: "user-admin",
    authorName: "ILMALINK Editorial Team",
    publishDate: "2026-05-10",
    updatedAt: "2026-05-10",
    readTime: "4 min read",
    views: 990,
    status: "published",
    seoTitle: "Scholarships for Medical Students: What to Prepare",
    metaDescription:
      "Prepare for medical student scholarships with document checklists, eligibility proof and timeline planning.",
    keywords: ["medical scholarships", "MBBS scholarship", "student aid"],
    content: baseContent(
      "India",
      "Scholarship readiness starts with verified income documents, academic records, identity proofs, and application deadlines."
    ),
  },
  {
    id: "blog-005",
    title: "Education Loans for MBBS: Questions Parents Should Ask",
    slug: "education-loans-for-mbbs-questions-parents-should-ask",
    featuredImage: "/blog/loans.svg",
    imageAlt: "Education loan planning for MBBS illustration",
    shortDescription:
      "Know the loan questions families should ask before finalizing an MBBS admission budget.",
    category: "Loans",
    country: "India",
    tags: ["Loans", "MBBS Fees", "Parents"],
    authorId: "user-admin",
    authorName: "ILMALINK Editorial Team",
    publishDate: "2026-05-07",
    updatedAt: "2026-05-07",
    readTime: "5 min read",
    views: 812,
    status: "published",
    seoTitle: "Education Loans for MBBS: Questions Parents Should Ask",
    metaDescription:
      "Understand MBBS education loan planning, repayment questions, collateral, margin money and approval checks.",
    keywords: ["MBBS education loan", "medical college loan", "MBBS fees"],
    content: baseContent(
      "India",
      "Loan planning should include total course cost, living expenses, collateral, moratorium, repayment estimates, and bank timelines."
    ),
  },
  {
    id: "blog-006",
    title: "How to Review a Medical University Before Admission",
    slug: "how-to-review-a-medical-university-before-admission",
    featuredImage: "/blog/university-review.svg",
    imageAlt: "Medical university review checklist illustration",
    shortDescription:
      "A university review framework covering recognition, curriculum, hospital exposure, fees and student support.",
    category: "University Reviews",
    country: "Global",
    tags: ["University Reviews", "MBBS Abroad", "Safety"],
    authorId: "user-admin",
    authorName: "ILMALINK Editorial Team",
    publishDate: "2026-05-04",
    updatedAt: "2026-05-04",
    readTime: "6 min read",
    views: 1218,
    status: "published",
    seoTitle: "How to Review a Medical University Before Admission",
    metaDescription:
      "Review medical universities before admission with checks for recognition, clinical exposure, fees and student support.",
    keywords: ["medical university review", "MBBS abroad university", "NMC"],
    content: baseContent(
      "Global",
      "A good university review checks official recognition, practical training, hospital exposure, fee clarity, safety, and student outcomes."
    ),
  },
  {
    id: "blog-007",
    title: "Medical Career Options Beyond MBBS",
    slug: "medical-career-options-beyond-mbbs",
    featuredImage: "/blog/career.svg",
    imageAlt: "Medical career pathway illustration",
    shortDescription:
      "Explore career directions, specialization planning and long-term pathways for medical aspirants.",
    category: "Career",
    country: "India",
    tags: ["Career", "MBBS", "Medical Education"],
    authorId: "user-admin",
    authorName: "ILMALINK Editorial Team",
    publishDate: "2026-05-01",
    updatedAt: "2026-05-01",
    readTime: "5 min read",
    views: 740,
    status: "published",
    seoTitle: "Medical Career Options Beyond MBBS | ILMALINK MEDIGO",
    metaDescription:
      "Explore career options beyond MBBS including specialization, licensing pathways, public health and clinical careers.",
    keywords: ["medical career", "after MBBS", "doctor career"],
    content: baseContent(
      "India",
      "Medical careers can extend into clinical practice, postgraduate specialization, public health, research, teaching, and hospital administration."
    ),
  },
  {
    id: "blog-008",
    title: "MBBS Abroad Documents Indian Students Should Keep Ready",
    slug: "mbbs-abroad-documents-indian-students-should-keep-ready",
    featuredImage: "/blog/documents.svg",
    imageAlt: "MBBS abroad document checklist illustration",
    shortDescription:
      "A simple document readiness guide for passport, academic records, NEET proof and admission applications.",
    category: "MBBS Abroad",
    country: "Global",
    tags: ["MBBS Abroad", "Documents", "Admission"],
    authorId: "user-admin",
    authorName: "ILMALINK Editorial Team",
    publishDate: "2026-04-28",
    updatedAt: "2026-04-28",
    readTime: "4 min read",
    views: 1344,
    status: "published",
    seoTitle: "MBBS Abroad Documents Indian Students Should Keep Ready",
    metaDescription:
      "Prepare MBBS abroad documents including passport, academic records, NEET scorecard, medical documents and application files.",
    keywords: ["MBBS abroad documents", "medical admission documents", "NEET"],
    content: baseContent(
      "Global",
      "Document readiness helps avoid admission delays, visa issues, and payment pressure during the MBBS abroad application process."
    ),
  },
];

export const seedDatabase: BlogDatabase = {
  users: [
    {
      id: "user-admin",
      name: "ILMALINK Admin",
      email: "admin@ilmalink.com",
      password: "admin123",
      role: "admin",
      createdAt: "2026-04-01",
    },
    {
      id: "user-author",
      name: "Editorial Author",
      email: "author@ilmalink.com",
      password: "author123",
      role: "author",
      createdAt: "2026-04-01",
    },
  ],
  blogs: seedBlogs,
  categories: [...blogCategories],
  tags: Array.from(new Set(seedBlogs.flatMap((post) => post.tags))).map((name) => ({
    id: name.toLowerCase().replaceAll(" ", "-"),
    name,
    slug: name.toLowerCase().replaceAll(" ", "-"),
  })),
  comments: [],
  drafts: [],
  views: [],
};
