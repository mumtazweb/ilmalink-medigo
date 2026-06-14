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

const vijayNeetAbolitionContent = `
Tamil Nadu Chief Minister and TVK leader C. Joseph Vijay has again placed the NEET debate at the centre of national politics by demanding that the Union Government abolish NEET-UG and allow states to admit medical students through Class 12 marks or state-decided admission systems.

His demand is not new in Tamil Nadu politics. For more than a decade, Tamil Nadu has argued that NEET is not merely an entrance exam, but a larger question of educational justice, federal rights, rural access, language equality, and the future of poor students who dream of becoming doctors.

The debate is simple but serious: should India have one common medical entrance exam for all, or should states have the right to decide medical admissions based on their own school education system?

## What Vijay Has Demanded
Vijay's stand is that NEET should be abolished because it places poor, rural, government-school and first-generation learners at a disadvantage. According to this argument, NEET rewards students who can afford long-term private coaching, repeated attempts, English-medium exposure and expensive preparation ecosystems.

Tamil Nadu's alternative demand is that MBBS admissions should be based on Class 12 marks, with proper normalisation if needed. The state's position is that board examination performance reflects a student's consistent academic journey, while a single high-pressure national exam can destroy years of effort in one afternoon.

This is why Vijay's demand is politically powerful. It connects with students, parents, rural families and social justice groups who believe that medical education should not become a coaching-market competition.

## Why Tamil Nadu Opposes NEET So Strongly
Tamil Nadu's opposition to NEET is rooted in its long history of social justice in education. Before NEET became compulsory across India, Tamil Nadu followed an admission model based largely on Class 12 marks. The state believed this gave better opportunity to students from different backgrounds, including rural areas and state-board schools.

The main arguments from Tamil Nadu are:

- NEET increases dependence on private coaching.
- Rural and government-school students may not get the same preparation support as urban private-school students.
- State-board students can face difficulty when the exam pattern is closer to CBSE-style preparation.
- A single national exam may ignore regional educational differences.
- Medical admission is linked to public health, so states should have a say in how doctors are selected.

Tamil Nadu's argument is not that merit should be ignored. Its argument is that merit should be measured fairly, considering unequal school systems, unequal coaching access and unequal family income.

## Know the Entire History of NEET: How the Controversy Started
NEET was first conducted in 2013 as a national-level entrance examination for medical and dental admissions. The idea was to replace multiple entrance exams with one common test. Supporters said this would reduce confusion, stop capitation-fee manipulation, improve transparency and create one national merit list.

But in July 2013, the Supreme Court quashed NEET, holding that the Medical Council of India could not impose such a single test in that form. This was a major setback for the centralised entrance system.

The story did not end there. In 2016, NEET returned after the Supreme Court recalled its earlier judgment. From that point, NEET gradually became the main gateway for MBBS and BDS admission across India.

## NEET Timeline
| Year | Major Development |
| --- | --- |
| 2013 | NEET was conducted for the first time. |
| July 2013 | Supreme Court quashed the implementation of NEET. |
| 2016 | NEET was restored after the Supreme Court recalled its earlier decision. |
| 2017 onwards | NEET became the common route for medical admissions across India. |
| 2021 | Tamil Nadu passed a Bill seeking exemption from NEET and restoration of Class 12 marks-based admission. |
| 2024 | NEET faced nationwide controversy after allegations of irregularities, paper leak concerns and result-related confusion. |
| 2026 | Vijay again raised the demand to abolish NEET and return admission power to states. |

## The Size of NEET: Why the Exam Affects So Many Families
NEET is not a small exam. It is one of the biggest entrance examinations in India. In NEET-UG 2024, more than 24 lakh candidates registered and more than 23 lakh appeared. Around 13 lakh candidates qualified, but the number of government MBBS seats remained far lower than the number of aspirants.

This creates extreme pressure. For lakhs of students, NEET is not just an exam; it is the single gate between their dream and failure. Many students repeat the exam for one or more years. Many families spend large amounts on coaching, test series, hostel stays and online platforms.

This is where the criticism becomes stronger: when an exam becomes so coaching-dependent, poor families feel the system is not equal.

## NEET and the Coaching Economy
One of the strongest criticisms of NEET is that it has created a massive coaching culture. Students often begin preparation from Class 9, Class 10 or Class 11. Coaching centres advertise rank-focused packages, residential programmes and repeaters' batches.

For rich and urban families, this may be manageable. But for poor students, farmers' children, daily-wage families and many rural households, the cost becomes a huge burden.

Tamil Nadu's anti-NEET argument says: if a student studies honestly for 12 years in school, why should a separate coaching-driven exam decide everything?

This is why Vijay's statement connects emotionally with many families. It is not only about Tamil Nadu; many students across India silently feel the pressure of a one-shot national exam.

## Supporters of NEET: What They Say
To understand the debate fairly, we must also look at the other side.

Supporters of NEET argue that one national exam brings transparency. Earlier, India had many entrance exams by states, private colleges and deemed universities. Students had to apply separately, travel to different exam centres, pay multiple fees and face different admission systems.

Supporters also say NEET reduces donation-based admissions and brings a common standard for medical education. According to this view, a national exam protects merit and prevents manipulation in private medical admissions.

So the real debate is not simply "NEET good" or "NEET bad". The real question is: can one exam be fair in a country where school education, language, income, coaching access and rural infrastructure are deeply unequal?

## Tamil Nadu's Legal and Political Battle
Tamil Nadu has repeatedly tried to get exemption from NEET. The state passed anti-NEET Bills and argued that medical admission should be decided through Class 12 marks. The state's position is that education and health have strong federal dimensions, and state governments understand local realities better.

The issue has moved between the Assembly, Governor, President, Union Government and courts. This shows how serious the conflict is. It is not only an education issue; it is also a federal issue between state power and central control.

## The 2024 NEET Controversy Made the Debate Stronger
The NEET-UG 2024 controversy gave fresh energy to anti-NEET voices. Allegations of paper leak, grace marks, unusual scoring patterns and confusion over results damaged public trust in the exam system.

Even if reforms are introduced, the trust question remains. A national exam must not only be fair; it must also be seen as fair by students and parents. When lakhs of students feel uncertainty, the emotional and social cost becomes huge.

This is why Tamil Nadu leaders, including Vijay, argue that a single centralised exam is too risky for such a life-changing admission process.

## What Should Be the Way Forward?
India needs doctors. India also needs fairness. The solution should not punish poor students in the name of merit, and it should not allow corruption in the name of state rights.

A balanced reform may include:

- Stronger protection for government-school and rural students.
- Serious review of coaching dependence.
- More medical seats in government colleges.
- Transparent exam security and accountability.
- State-specific admission flexibility where justified.
- Better bridge courses for state-board students.
- Strong counselling support for students under pressure.

## Conclusion: Vijay Has Reopened a National Question
Vijay's demand to abolish NEET is not just a Tamil Nadu headline. It raises a national question: what is true merit in an unequal society?

Is merit only the mark scored in one national exam? Or is merit also the struggle of a rural student who studied without coaching, without English-medium advantage, without private tutors, and still performed well in school?

Tamil Nadu says the second student must not be pushed out of the medical dream. Vijay's stand continues that long political and social justice argument.

NEET was created to bring uniformity. But uniformity without equality can become unfair. That is why the NEET debate will not end easily. Until India finds a system that is transparent, inclusive and trusted by students, the demand to abolish or reform NEET will continue to grow louder.
`;

export const seedBlogs: BlogPost[] = [
  {
    id: "blog-vijay-neet-abolition-history",
    title: "Vijay's NEET Abolition Demand: Know the Entire History of NEET and Tamil Nadu's Long Battle",
    slug: "vijay-neet-abolition-demand-entire-history-of-neet",
    featuredImage: "/blog/mbbs-india.svg",
    imageAlt: "Vijay NEET abolition demand and entire history of NEET",
    shortDescription:
      "Tamil Nadu Chief Minister Vijay has renewed the demand to abolish NEET, raising serious questions about coaching inequality, state rights, rural students and the future of MBBS admissions in India.",
    category: "MBBS India",
    country: "India, Tamil Nadu, MBBS India, NEET",
    tags: [
      "NEET",
      "MBBS India",
      "Tamil Nadu",
      "Vijay",
      "Medical Admission",
      "Education Policy",
      "NEET Controversy",
    ],
    authorId: "user-admin",
    authorName: "ILMALINK Editorial Team",
    publishDate: "2026-06-14",
    updatedAt: "2026-06-14",
    readTime: "7 min read",
    views: 0,
    status: "published",
    seoTitle: "Vijay's NEET Abolition Demand: Know the Entire History of NEET",
    metaDescription:
      "Know the entire history of NEET, Vijay's demand to abolish NEET, Tamil Nadu's long opposition, NEET history since 2013, coaching inequality, legal battle and the future of MBBS admissions in India.",
    keywords: [
      "Vijay NEET abolition",
      "entire history of NEET",
      "NEET history since 2013",
      "Tamil Nadu NEET exemption",
      "NEET controversy",
      "MBBS admission India",
      "Class 12 marks MBBS admission",
      "NEET coaching inequality",
      "medical admission India",
      "NEET Tamil Nadu",
      "Vijay TVK NEET",
    ],
    images: [],
    content: vijayNeetAbolitionContent,
  },
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
