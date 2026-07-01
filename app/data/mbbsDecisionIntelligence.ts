export type MbbsBudgetBand = "all" | "under-25" | "25-40" | "40-plus";

export type MbbsCostInsight = {
  id: string;
  label: string;
  href: string;
  region: "India" | "Abroad";
  tuition: string;
  hostel: string;
  living: string;
  estimatedTotal: string;
  estimatedTotalMinLakh: number;
  budgetBand: Exclude<MbbsBudgetBand, "all">;
  planningNote: string;
};

export const mbbsBudgetFilters: {
  id: MbbsBudgetBand;
  label: string;
}[] = [
  { id: "all", label: "All budgets" },
  { id: "under-25", label: "Around ₹25L" },
  { id: "25-40", label: "₹25L–₹40L" },
  { id: "40-plus", label: "₹40L+" },
];

export const mbbsCostInsights: MbbsCostInsight[] = [
  {
    id: "india-private-management",
    label: "India Private Management",
    href: "/mbbs-india",
    region: "India",
    tuition: "₹70L+",
    hostel: "Around ₹5L",
    living: "Around ₹5L",
    estimatedTotal: "Around ₹80L+",
    estimatedTotalMinLakh: 80,
    budgetBand: "40-plus",
    planningNote:
      "Compare state quota, management, deemed-university fees, bonds and counselling rules before payment.",
  },
  {
    id: "georgia",
    label: "Georgia",
    href: "/mbbs-abroad/georgia",
    region: "Abroad",
    tuition: "Around ₹28L",
    hostel: "Around ₹2.6L",
    living: "Around ₹10L–₹15L",
    estimatedTotal: "Around ₹40.6L–₹45.6L",
    estimatedTotalMinLakh: 40.6,
    budgetBand: "40-plus",
    planningNote:
      "Compare the exact university, clinical pathway, annual living budget and current exchange rate.",
  },
  {
    id: "kyrgyzstan",
    label: "Kyrgyzstan",
    href: "/mbbs-abroad/kyrgyzstan",
    region: "Abroad",
    tuition: "Around ₹16L",
    hostel: "Around ₹4L",
    living: "Around ₹4L",
    estimatedTotal: "Around ₹24L",
    estimatedTotalMinLakh: 24,
    budgetBand: "under-25",
    planningNote:
      "Verify the selected university, accreditation, internship structure, hostel and NMC/FMGL fit.",
  },
  {
    id: "bangladesh",
    label: "Bangladesh",
    href: "/mbbs-abroad/bangladesh",
    region: "Abroad",
    tuition: "Around ₹30L",
    hostel: "Around ₹3.5L",
    living: "Around ₹3.5L",
    estimatedTotal: "Around ₹37L",
    estimatedTotalMinLakh: 37,
    budgetBand: "25-40",
    planningNote:
      "Check DGME/BM&DC eligibility, passing-year rules, college hospital exposure and the written fee schedule.",
  },
  {
    id: "russia",
    label: "Russia",
    href: "/mbbs-abroad/russia",
    region: "Abroad",
    tuition: "Around ₹18L",
    hostel: "Around ₹5L",
    living: "Around ₹5L",
    estimatedTotal: "Around ₹28L",
    estimatedTotalMinLakh: 28,
    budgetBand: "25-40",
    planningNote:
      "Compare university recognition, English-medium delivery, clinical exposure, climate and local-language needs.",
  },
  {
    id: "uzbekistan",
    label: "Uzbekistan",
    href: "/mbbs-abroad/uzbekistan",
    region: "Abroad",
    tuition: "Around ₹16L",
    hostel: "Around ₹4L",
    living: "Around ₹4L",
    estimatedTotal: "Around ₹24L",
    estimatedTotalMinLakh: 24,
    budgetBand: "under-25",
    planningNote:
      "Verify the medical university, internship, language, local licence pathway and complete written cost.",
  },
];

export type MbbsCountryInsight = {
  id: string;
  label: string;
  flag: string;
  href: string;
  estimatedBudget: string;
  medicalInstitutions: string;
  fmgeReference: string;
  practicalFit: string;
  checks: string[];
};

export const mbbsCountryInsights: MbbsCountryInsight[] = [
  {
    id: "kyrgyzstan",
    label: "Kyrgyzstan",
    flag: "kg",
    href: "/mbbs-abroad/kyrgyzstan",
    estimatedBudget: "Around ₹24L in the current planning dataset",
    medicalInstitutions: "32 university options referenced",
    fmgeReference: "Use country and university FMGE appeared/pass data as one comparison input.",
    practicalFit: "Lower-budget MBBS Abroad planning with university-level verification.",
    checks: [
      "Current accreditation and legal university status",
      "Course duration, internship and English-medium delivery",
      "WDOMS entry, local licence eligibility and NMC/FMGL fit",
    ],
  },
  {
    id: "georgia",
    label: "Georgia",
    flag: "ge",
    href: "/mbbs-abroad/georgia",
    estimatedBudget: "Around ₹40.6L–₹45.6L in the current planning dataset",
    medicalInstitutions: "39 university options referenced",
    fmgeReference: "Compare appeared volume and pass rate at university level where data exists.",
    practicalFit: "Structured private-university options with higher overall living-cost planning.",
    checks: [
      "Exact MD program, duration, clerkship and internship structure",
      "Official tuition, hostel terms and annual living budget",
      "Recognition, WDOMS and NMC/FMGL compliance",
    ],
  },
  {
    id: "bangladesh",
    label: "Bangladesh",
    flag: "bd",
    href: "/mbbs-abroad/bangladesh",
    estimatedBudget: "Around ₹37L in the current planning dataset",
    medicalInstitutions: "110 medical-college options referenced",
    fmgeReference: "Country and college FMGE references are available for comparison.",
    practicalFit: "Nearby private-college route with strict academic and passing-year eligibility.",
    checks: [
      "DGME/BM&DC eligibility and passing-year rules",
      "College hospital, clinical exposure and written fee structure",
      "NEET qualification and current NMC/FMGL conditions",
    ],
  },
  {
    id: "russia",
    label: "Russia",
    flag: "ru",
    href: "/mbbs-abroad/russia",
    estimatedBudget: "Around ₹28L in the current planning dataset",
    medicalInstitutions: "102 university options referenced",
    fmgeReference: "Use institution-wise appeared/pass data with curriculum and language checks.",
    practicalFit: "Broad university choice requiring careful course and clinical-language comparison.",
    checks: [
      "English-medium claim across academic and clinical years",
      "Internship, local licence eligibility and hospital exposure",
      "Climate, travel, hostel and complete annual budget",
    ],
  },
];

export const mbbsDecisionIntelligenceDisclaimer =
  "These figures are indicative planning estimates from the current ilmalink service-line dataset of ilmalink, not a university quotation. Tuition, hostel, living costs, exchange rates, counselling fees and official rules can change. Verify the latest written fee structure and authority rules before payment.";

export const mbbsDecisionSupportSummary = {
  heading: "Student-first MBBS decision intelligence and admission support",
  description:
    "ilmalink, an extension/service line of ilmalink, combines NEET score pathways, MBBS India counselling, MBBS Abroad country comparison, indicative budget planning, eligibility checks, documents, scholarships, loans and post-admission support so Indian students can compare options using fit, rules, budget and long-term career safety.",
  india:
    "For MBBS India, support covers NEET score and rank analysis, domicile and budget review, MCC or state counselling registration, choice filling, official allotment, document verification, college reporting, fee payment guidance, on-campus support and a NEET PG/NExT-I preparation helpline.",
  abroad:
    "For MBBS Abroad, support covers eligibility and budget analysis, country and university comparison, application, offer letter, visa and required permission guidance, pre-departure, travel and college-reaching support, academic observation, Indian-faculty add-ons, FMGE/NExT-I/NEET PG preparation support and assistance throughout the foreign medical course.",
};
