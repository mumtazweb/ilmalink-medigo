import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  MessageCircle,
  SearchCheck,
  ShieldCheck,
  ShieldQuestion,
  Stethoscope,
  TrendingUp,
  UserCheck,
  Users,
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  Scale,
  Newspaper,
  Target,
  Verified,
} from "lucide-react";
import CounsellingActionButton from "../../../components/CounsellingActionButton";
import JsonLd from "../../../components/JsonLd";
import Navbar from "../../../components/navbar";
import { whatsappCounsellingUrl } from "../../../data/exploreLinks";

export const dynamic = "force-static";

const pageUrl =
  "https://www.ilmalink.com/mbbs-abroad/uzbekistan/medical-institute-of-karakalpakstan/";
const kmiWhatsappUrl = `${whatsappCounsellingUrl}?text=${encodeURIComponent(
  "Hello ilmaLink, I want to discuss Karakalpakstan Medical Institute admissions.",
)}`;

export const metadata: Metadata = {
  title:
    "Karakalpakstan Medical Institute 2026 | Full Decision Research for Indian Students",
  description:
    "Comprehensive evidence-based decision-making research on Karakalpakstan Medical Institute (Medical Institute of Karakalpakstan), Nukus, Uzbekistan. Verified facts on 6-year English General Medicine, WDOMS, ECAQA, NMC/FMGL, FMGE data, fees, documents and risk analysis for Indian MBBS students, parents and consultants.",
  keywords: [
    "Karakalpakstan Medical Institute",
    "Medical Institute of Karakalpakstan",
    "KMI Nukus",
    "MBBS in Karakalpakstan",
    "KMI fees 2026",
    "KMI WDOMS",
    "KMI FMGE",
    "Karakalpakstan Medical Institute NMC",
    "KMI English medium",
    "KMI General Medicine",
    "Uzbekistan MBBS Karakalpakstan",
    "KMI Indian students",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Karakalpakstan Medical Institute | Full Decision Research",
    description:
      "Verified research report on KMI: 6-year English General Medicine programme, WDOMS listing F0000700, ECAQA accreditation, NMC/FMGL compliance check, FMGE data analysis, fees and complete risk assessment for Indian students.",
    url: pageUrl,
    siteName: "ilmaLink",
    images: [{ url: "/images/mbbs-abroad/uzbekistan.jpg", width: 1800, height: 506, alt: "Karakalpakstan Medical Institute research report" }],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karakalpakstan Medical Institute | Decision Research for Indian Students",
    description: "Evidence-based research: KMI General Medicine 60910200, WDOMS, ECAQA, FMGE data, NMC compliance and risk analysis.",
    images: ["/images/mbbs-abroad/uzbekistan.jpg"],
  },
};

/* ============================================================
   DATA
   ============================================================ */

const decisionTable = [
  { area: "Real public institution", status: "Green", meaning: "Verified" },
  { area: "2020 Presidential transformation", status: "Green", meaning: "Verified" },
  { area: "6-year General Medicine", status: "Green", meaning: "Verified" },
  { area: "English General Medicine listing", status: "Green/Yellow", meaning: "Listed by official portal, but full clinical/internship English needs confirmation" },
  { area: "WDOMS / FAIMER listing", status: "Green", meaning: "Verified listing, but not 'approval'" },
  { area: "ECAQA accreditation", status: "Yellow", meaning: "KMI accredited, but public entry mentions Uzbek/Russian General Medicine, not English" },
  { area: "NMC eligibility", status: "Yellow", meaning: "Possible only if FMGL conditions are satisfied" },
  { area: "FMGE data for KMI", status: "Red/Unknown", meaning: "Not found in official NBEMS data checked" },
  { area: "Indian student numbers", status: "Unknown", meaning: "Official number not publicly verified" },
  { area: "Public reviews", status: "Weak", meaning: "Mostly promotional; direct student verification needed" },
];

const colourStyles: Record<string, string> = {
  Green: "bg-emerald-100 text-emerald-900 border-emerald-300",
  "Green/Yellow": "bg-lime-100 text-lime-900 border-lime-300",
  Yellow: "bg-amber-100 text-amber-900 border-amber-300",
  "Red/Unknown": "bg-red-100 text-red-900 border-red-300",
  Unknown: "bg-slate-100 text-slate-800 border-slate-300",
  Weak: "bg-orange-100 text-orange-900 border-orange-300",
};

const sections = [
  {
    id: "what-is-kmi", number: "1",
    question: "What is Karakalpakstan Medical Institute?",
    answer: "Is KMI a real university or only a consultant-marketed college? Answer: KMI is real.",
    verdict: "KMI is not fake. It is a real public medical institute.",
    points: [
      "Karakalpakstan Medical Institute is a public medical institute located in Nukus, Republic of Karakalpakstan, Uzbekistan.",
      "The official KMI website says the institute was organized in 1991 to train medical personnel for the Aral Sea region.",
      "The institution was later transformed into the Medical Institute of Karakalpakstan by Presidential Decree dated 14 February 2020, No. 4598.",
      "The Uzbek legal portal shows Resolution of the President of Uzbekistan No. RP-4598 dated 14 February 2020, titled 'On the establishment of the Medical Institute of Karakalpakstan.'",
    ],
    sources: ["KMI official general information — kkmi.uz/en/about_institute/general-information/", "Uzbek legal portal, Presidential Resolution RP-4598 — lex.uz/en/docs/7602093"],
    icon: Building2, tone: "green" as const,
  },
  {
    id: "2020-transformation", number: "2",
    question: "What happened in 2020?",
    answer: "Was KMI newly created in 2020? Answer: Not exactly. KMI has older roots.",
    verdict: "KMI is not a brand-new medical teaching unit from zero. It has older medical education roots, but its current independent identity as Medical Institute of Karakalpakstan is from 2020.",
    points: [
      "WDOMS shows that instruction began in 1990, and the school had previous names connected to the Nukus/Karakalpak branch of Tashkent Pediatric Medical Institute.",
      "The 2020 Presidential Decree transformed the earlier TashPMI-related structure into the present Medical Institute of Karakalpakstan.",
      "If the English-medium international track started recently after the 2020 transformation, Indian students may not have yet graduated in large numbers. This may explain why KMI-specific FMGE data is not visible.",
    ],
    sources: ["KMI official general information — kkmi.uz", "WDOMS school listing F0000700 — search.wdoms.org", "Uzbek legal portal RP-4598 — lex.uz"],
    icon: TrendingUp, tone: "blue" as const,
  },
  {
    id: "six-year-gm", number: "3",
    question: "Does KMI have a 6-year General Medicine / MBBS-equivalent course?",
    answer: "Question: Is there a 6-year General Medicine course? Answer: Yes. This is verified.",
    verdict: "KMI has a 6-year General Medicine programme. This is the usual MBBS-equivalent pathway in Uzbekistan.",
    points: [
      "KMI's official foreign-student admission page lists General Medicine with a duration of 6 years.",
      "The Study in Uzbekistan official portal lists: General Medicine, Programme code: 60910200, Form of study: Full-time, Level: Bachelor, Language of instruction: English, Duration: 6 years.",
    ],
    sources: ["KMI official foreign-student admission page — kkmi.uz/en/foreign-students/admission-procedure/", "Study in Uzbekistan KMI profile — studyin-uzbekistan.uz/universities/117"],
    icon: GraduationCap, tone: "green" as const,
  },
  {
    id: "english-medium", number: "4",
    question: "Is the 6-year General Medicine course in English?",
    answer: "Question: Is English-medium General Medicine officially shown? Answer: Yes, but with an important caution.",
    verdict: "KMI has an official English General Medicine listing. But students should still ask for a written certificate saying that the full course, including clinical training and exams, is in English.",
    points: [
      "The official Study in Uzbekistan portal lists KMI General Medicine 60910200 as English and 6 years.",
      "KMI's official website says the institute provides education in Karakalpak, Uzbek and Russian, and also has academic groups with English as the language of instruction.",
      "WDOMS also lists English among the languages of instruction for KMI.",
    ],
    sources: ["Study in Uzbekistan KMI profile", "Study in Uzbekistan KMI programmes page", "KMI official general information", "WDOMS school listing F0000700"],
    icon: BookOpen, tone: "yellow" as const,
  },
  {
    id: "fully-english", number: "5",
    question: "Is the entire 6-year course fully English?",
    answer: "Question: Can we say the full 6 years, including clinicals and internship, is English? Answer: Not yet fully proved from public sources.",
    verdict: "Partly verified, but not fully proved. Written confirmation required.",
    points: [
      "Official/authorized sources show that English General Medicine exists. But the exact NMC-safe wording is not found publicly.",
      "The required wording should be: 'The entire General Medicine 60910200 programme is conducted in English for all years, including lectures, practicals, examinations, clinical postings, bedside teaching and internship/clinical clerkship.'",
      "This exact public statement was not found.",
      "Students must ask KMI directly: Is General Medicine 60910200 fully English for all 6 years? Will KMI issue a Medium of Instruction certificate after graduation?",
    ],
    sources: ["KMI official website", "Study in Uzbekistan portal"],
    icon: ShieldQuestion, tone: "yellow" as const,
  },
  {
    id: "russian-pediatrics", number: "6",
    question: "Why is the Russian Pediatrics notice important?",
    answer: "Question: Does the Russian 3+3 notice affect General Medicine? Answer: It does not directly affect General Medicine, but it gives an important warning.",
    verdict: "This proves that KMI runs different programmes in different languages. Students must not assume every programme is English.",
    points: [
      "KMI's official website published a notice about a Pediatrics programme in collaboration with Saint Petersburg State Pediatric Medical University.",
      "That programme follows a 3+3 model: 1st to 3rd courses in Karakalpakstan, 4th to 6th courses in St. Petersburg, all classes conducted exclusively in Russian.",
      "Students must confirm: exact programme name, exact programme code, language of instruction, full duration, country of study, internship structure.",
    ],
    sources: ["KMI official Russia Pediatrics notice — kkmi.uz/en/235237/"],
    icon: AlertTriangle, tone: "amber" as const,
  },
  {
    id: "wdoms", number: "7",
    question: "What is WDOMS / FAIMER status?",
    answer: "Question: Is KMI listed in WDOMS? Answer: Yes.",
    verdict: "KMI is listed in WDOMS with FAIMER School ID F0000700. But WDOMS listing does not mean automatic recognition, approval or accreditation.",
    points: [
      "WDOMS lists Medical Institute of Karakalpakstan with FAIMER School ID F0000700. It shows the school as public and operational, with instruction beginning in 1990 and a 6-year curriculum.",
      "Important caution: WDOMS listing does not denote recognition, accreditation or endorsement unless expressly stated.",
      'Safe wording: "KMI is listed in WDOMS with FAIMER School ID F0000700." Unsafe wording: "KMI is WHO/FAIMER/NMC approved."',
    ],
    sources: ["WDOMS KMI school listing — search.wdoms.org/home/SchoolDetail/F0000700", "WDOMS disclaimer — search.wdoms.org/"],
    icon: Globe, tone: "green" as const,
  },
  {
    id: "ecaqa", number: "8",
    question: "Is KMI ECAQA / WFME-recognized accredited?",
    answer: "Question: Is KMI accredited? Answer: Yes, but the English-medium General Medicine track is not clearly shown in the public ECAQA entry.",
    verdict: "KMI has ECAQA accreditation evidence, but students should not assume the English-medium General Medicine track is covered unless KMI or ECAQA gives written proof.",
    points: [
      "ECAQA's Accreditation Council page states that KMI educational programmes were accredited for 5 years from 20 November 2025 to 19 November 2030.",
      "The public ECAQA entry lists General Medicine, code 5510100/60910200 — Uzbek and Russian mediums of instruction.",
      "The same ECAQA page separately mentions English-medium General Medicine for some other Uzbek medical universities.",
    ],
    sources: ["ECAQA Accreditation Council meetings — ecaqa.org/en/about-ecaqa/accreditation-council/ac-meetings"],
    icon: Verified, tone: "yellow" as const,
  },
  {
    id: "nmc-approval", number: "9",
    question: 'Is KMI "NMC approved"?',
    answer: "Question: Is KMI NMC approved? Answer: NMC does not approve foreign universities by a simple list.",
    verdict: 'The correct question is not "Is this university NMC approved?" but rather "Does this course satisfy NMC Foreign Medical Graduate Licentiate Regulations?"',
    points: [
      "NMC states that it does not endorse any list of foreign medical institutions or universities for MBBS or equivalent courses.",
      "For Indian students, the correct question is whether the course satisfies NMC FMGL Regulations.",
    ],
    sources: ["NMC page for students studying abroad — nmc.org.in/information-desk/for-students-to-study-in-abroad/"],
    icon: Scale, tone: "yellow" as const,
  },
  {
    id: "nmc-conditions", number: "10",
    question: "What are the main NMC conditions for Indian students?",
    answer: "Question: What must an Indian student check before joining a foreign MBBS course? Answer: The student must check FMGL compliance.",
    verdict: "Even if KMI is real and English General Medicine is listed, Indian students must verify whether the exact course satisfies these NMC conditions.",
    points: [
      "Course leading to foreign medical degree must be minimum 54 months.",
      "Student should undergo internship for minimum 12 months in the same foreign medical institution.",
      "Medium of instruction should be English.",
      "Mandatory medical subjects should be studied.",
      "Graduate should be eligible for registration/licence to practise medicine in the country where the degree is awarded.",
      "Student must clear FMGE/NExT or the applicable screening test in India.",
      "Student will also need to complete required supervised internship in India as per applicable rules.",
    ],
    sources: ["NMC FMGL Regulations, 2021 — nmc.org.in"],
    icon: ClipboardCheck, tone: "blue" as const,
  },
  {
    id: "uzbekistan-model", number: "11",
    question: "Does Uzbekistan's 6-year General Medicine model support NMC requirements?",
    answer: "Question: Does Uzbekistan's 6-year medical programme generally satisfy NMC duration and practice-period requirements? Answer: Embassy-level source gives positive support for Uzbekistan generally.",
    verdict: "This is Uzbekistan-level support. It is not a KMI-specific certificate.",
    points: [
      "The Embassy of India in Tashkent says Indian students are enrolled in 6-year 'Therapeutic Work' programmes in Uzbekistan.",
      "The 6-year programme meets NMC requirements regarding duration of training and periods allotted for practice.",
      "The Embassy also states that after completing the programme, the graduate will have the right to practise medicine in Uzbekistan.",
    ],
    sources: ["Embassy of India, Tashkent advisory — eoitashkent.gov.in"],
    icon: ShieldCheck, tone: "green" as const,
  },
  {
    id: "clinical-bases", number: "12",
    question: "Does KMI have clinical bases?",
    answer: "Question: Does KMI have hospitals/clinical bases for practical training? Answer: KMI official site says it has more than 20 clinical bases.",
    verdict: "Clinical-base presence is verified from KMI official site. But verify hospital details, language of clinical discussions, and internship acceptance for NMC-FMGL.",
    points: [
      "KMI's official website says that more than 20 treatment and preventive institutions in Nukus city serve as clinical bases.",
      "What still needs checking: Which hospitals are used for English-medium students? From which year do clinical postings start? Are clinical discussions and case presentations in English? Is internship done in these clinical bases?",
    ],
    sources: ["KMI official general information — kkmi.uz"],
    icon: Stethoscope, tone: "blue" as const,
  },
  {
    id: "official-fee", number: "13",
    question: "What is the official fee for foreign students?",
    answer: "Question: What fee is officially listed by KMI? Answer: KMI official foreign-student page lists USD 3,500 for undergraduate foreign students.",
    verdict: "This is the official annual tuition/contract amount. Students must separately verify hostel, food, visa, insurance and other charges.",
    points: [
      "KMI's foreign-student admission page shows paid-contract education cost for foreign students. Undergraduate: USD 3,500.",
      "What is not included publicly: hostel fee, food/mess fee, visa fee, health insurance, medical checkup, registration charges, translation/notary charges, airport pickup, exam fees, agent service charge, yearly fee increase policy.",
      "If a consultant gives a package higher than the official tuition, they must show a full breakup. Pay official fees directly to the university wherever possible.",
    ],
    sources: ["KMI foreign-student admission page — kkmi.uz/en/foreign-students/admission-procedure/"],
    icon: CircleDollarSign, tone: "green" as const,
  },
  {
    id: "documents", number: "14",
    question: "What documents are required for foreign admission?",
    answer: "Question: What documents does KMI officially ask from foreign applicants? Answer: KMI official page lists education certificate, passport, medical certificate and other documents.",
    verdict: "Students should compare consultant-provided document lists with KMI's official list. If an agent asks for extra charges, confirm directly with KMI.",
    points: [
      "KMI's official foreign-student admission page asks for: high school certificate/diploma, notarized/apostilled translation into Russian, passport copy, medical certificate, HIV certificate, COVID vaccination certificate, application documents, photographs.",
    ],
    sources: ["KMI foreign-student admission page"],
    icon: FileText, tone: "blue" as const,
  },
  {
    id: "study-data", number: "15",
    question: "What does official Study in Uzbekistan data show about programmes and teachers?",
    answer: "Question: Does the official portal show 8 international students? Answer: No.",
    verdict: "The number 8 refers to foreign teachers and bachelor programmes, not international students.",
    points: [
      "Official Study in Uzbekistan data shows: Professors: 12, Associate Professors: 26, Doctors of Science: 22, Candidates of Science: 56, Foreign teachers: 8.",
      "Basic educational programmes for foreign citizens: 8. Bachelor programmes for foreign citizens: 8.",
      "What is not verified: total international students, total Indian students, year-wise batch strength, number of Indian graduates, FMGE-qualified KMI graduates.",
    ],
    sources: ["Study in Uzbekistan KMI profile — studyin-uzbekistan.uz/universities/117"],
    icon: Users, tone: "yellow" as const,
  },
  {
    id: "indian-students", number: "16",
    question: "Are Indian students studying at KMI?",
    answer: "Question: Is there evidence of Indian students at KMI? Answer: Embassy of India in Tashkent lists KMI among Uzbek medical institutions where Indian students are enrolled.",
    verdict: "Presence of Indian students is likely, but scale and outcome are not verified.",
    points: [
      "This means KMI is not completely unknown to Indian students.",
      "But the Embassy source does not give exact KMI-specific numbers, batch details, graduates, or FMGE passes.",
    ],
    sources: ["Embassy of India, Tashkent — eoitashkent.gov.in"],
    icon: UserCheck, tone: "yellow" as const,
  },
  {
    id: "fmge-data", number: "17",
    question: "Is FMGE data available for KMI?",
    answer: "Question: Is KMI shown in official FMGE data? Answer: KMI-specific FMGE data was not found in the official NBEMS 2025 report.",
    verdict: "Uzbekistan country-level performance is available. KMI-specific is not visible.",
    points: [
      "NBEMS FMGE Performance Report 2025: Uzbekistan FMGE December 2025 had 976 appeared, 394 passed (40.37%).",
      "FMGE June 2025: Uzbekistan had 429 appeared, 139 passed (32.40%).",
      "Search within the report did not find 'Karakalpak' as a university name.",
    ],
    sources: ["NBEMS FMGE Performance Report 2025 — natboard.edu.in", "NBEMS official website — natboard.edu.in/"],
    icon: TrendingUp, tone: "red" as const,
  },
  {
    id: "missing-fmge", number: "18",
    question: "Why might KMI FMGE data be missing?",
    answer: "Question: Is absence of FMGE data a red flag? Answer: It is a caution, but not final proof of poor quality.",
    verdict: "KMI may be an early-stage international option. Outcome risk is higher than older universities with many years of FMGE data.",
    points: [
      "KMI's current independent identity is from 2020. If English/Indian track started then, first meaningful FMGE outcomes appear after the first batches complete 6 years.",
      "Example: Batch started 2020 → graduation 2026 → FMGE visibility 2026/2027.",
      "Batch started 2021 → FMGE visibility 2027/2028. Batch 2022 → 2028/2029.",
    ],
    sources: ["NBEMS FMGE reports", "WDOMS KMI listing"],
    icon: HelpCircle, tone: "amber" as const,
  },
  {
    id: "nmc-safe", number: "19",
    question: "Is KMI safe for Indian students under NMC rules?",
    answer: "Question: Can we say KMI is fully NMC-safe? Answer: Not yet from public sources.",
    verdict: "KMI has several positive points, but full NMC safety needs direct written confirmation from KMI.",
    points: [
      "Positive: real public institute, 6-year GM, English listing, WDOMS listing, ECAQA evidence, Embassy support.",
      "Documents needed from KMI: Medium of Instruction certificate, English confirmation for all years, full curriculum, internship structure, 12-month internship confirmation, local licence letter, ECAQA English-track certificate, Indian student data.",
    ],
    sources: ["NMC FMGL Regulations", "KMI official site", "Study in Uzbekistan"],
    icon: ShieldCheck, tone: "yellow" as const,
  },
  {
    id: "strengths", number: "20",
    question: "What are the main strengths of KMI?",
    answer: "Question: What are the positive points? Answer: KMI has several real strengths.",
    verdict: "KMI has 8 verified positive points that make it a genuine option.",
    points: [
      "Strength 1: Real public institution with government and WDOMS presence.",
      "Strength 2: Historical roots — medical instruction from around 1990/1991.",
      "Strength 3: 6-year General Medicine confirmed on official page.",
      "Strength 4: English General Medicine listing on Study in Uzbekistan.",
      "Strength 5: Affordable official tuition — USD 3,500.",
      "Strength 6: More than 20 clinical bases.",
      "Strength 7: WDOMS listing — FAIMER School ID F0000700.",
      "Strength 8: ECAQA accreditation evidence, 2025–2030.",
    ],
    sources: ["KMI official site", "WDOMS", "ECAQA", "Study in Uzbekistan"],
    icon: Lightbulb, tone: "green" as const,
  },
  {
    id: "risks", number: "21",
    question: "What are the main risks?",
    answer: "Question: What should students worry about? Answer: The biggest risks are proof-related and outcome-related.",
    verdict: "Six major risks require careful attention.",
    points: [
      "Risk 1: No KMI-specific FMGE data in official NBEMS 2025 report.",
      "Risk 2: ECAQA public page lists KMI General Medicine in Uzbek/Russian, not English.",
      "Risk 3: Full English delivery not publicly proved for clinicals, exams, internship.",
      "Risk 4: Student numbers unclear from official portal.",
      "Risk 5: Public reviews are mostly promotional, not independent.",
      "Risk 6: Internship details not KMI-specific — only Uzbekistan-level support available.",
    ],
    sources: ["NBEMS", "ECAQA", "Study in Uzbekistan"],
    icon: AlertTriangle, tone: "red" as const,
  },
  {
    id: "reviews", number: "22",
    question: "Public reviews and student feedback",
    answer: "Question: Are student reviews reliable? Answer: Not enough reliable independent reviews were found.",
    verdict: "Speak directly with current Indian students, senior clinical students, hostel residents, and any Indian graduates before admission.",
    points: [
      "Many online reviews are from consultants or promotional channels — useful but not strong proof.",
      "Ask current students: Are classes actually in English? Are teachers fluent? Are exams in English? Are hospital postings in English? Is hostel safe and clean? Is Indian food available? Any hidden charges?",
    ],
    sources: ["Independent verification recommended"],
    icon: MessageCircle, tone: "amber" as const,
  },
  {
    id: "embassy-advice", number: "23",
    question: "Embassy advice for Indian students",
    answer: "Question: What does the Embassy advise? Answer: The Embassy advises students to verify carefully and not rely blindly on consultants.",
    verdict: "This supports a careful approach. Do not join only because an agent says it is safe.",
    points: [
      "Embassy guidance: check university credentials, verify medium of instruction, clarify fees, avoid cash payments, keep receipts, check hostel/food conditions, understand the contract.",
    ],
    sources: ["Embassy of India, Tashkent — eoitashkent.gov.in"],
    icon: Newspaper, tone: "blue" as const,
  },
  {
    id: "verify-before-paying", number: "24",
    question: "What should students verify before paying?",
    answer: "Question: What are the must-check items? Answer: Verify these before paying even one major instalment.",
    verdict: "20+ verification items across academic, internship, licence, accreditation, student and financial categories.",
    points: [
      "Academic: Is programme exactly General Medicine 60910200? 6 years full-time? Full English? Are NMC Schedule-I subjects covered?",
      "Internship: 12-month internship/clerkship? In same institution? Separate from 54-month academic period?",
      "Licence: Eligible for local registration/right to practise in Uzbekistan?",
      "Accreditation: Is English-medium GM included in ECAQA accreditation?",
      "Student: How many Indian students? Any Indian batch graduated? Anyone cleared FMGE?",
      "Financial: Is tuition USD 3,500? Hostel fee? Direct payment to KMI possible?",
    ],
    sources: ["KMI official site", "NMC FMGL", "ECAQA"],
    icon: SearchCheck, tone: "blue" as const,
  },
  {
    id: "consultants", number: "25",
    question: "What should consultants verify before sending students?",
    answer: "Question: What should education consultants do? Answer: Consultants should do due diligence before recommending KMI.",
    verdict: "Collect official documents and never make unverified claims.",
    points: [
      "Collect: admission confirmation, English-medium certificate, curriculum, internship structure, licence letter, ECAQA English-track clarification, hostel/mess confirmation, fee breakup, Indian student data, senior contacts, FMGE proof if claimed.",
      'Safe wording: "KMI is a real public medical institute. Official sources show 6-year GM, Study in Uzbekistan lists it as English. KMI-specific FMGE outcomes not visible in NBEMS data."',
      "Do not say: 'NMC approved', 'WHO approved', 'Guaranteed FMGE', 'High FMGE pass rate', 'Fully proven English MBBS'.",
    ],
    sources: ["KMI official site", "NBEMS", "ECAQA"],
    icon: UserCheck, tone: "purple" as const,
  },
  {
    id: "final-students", number: "26",
    question: "Final decision for Indian students",
    answer: "Question: Should a student choose KMI? Answer: Choose only if written documents are provided.",
    verdict: "KMI can be kept in the 'possible but verify deeply' category.",
    points: [
      "KMI is not fake. It has official existence, government status, 6-year GM, English listing, WDOMS listing, official foreign-student admission details.",
      "But: KMI-specific FMGE data not found, English-medium ECAQA not clearly shown, Indian student strength not verified, full English clinical/internship delivery not publicly proved.",
    ],
    sources: ["All sources above"],
    icon: Target, tone: "green" as const,
  },
  {
    id: "final-parents", number: "27",
    question: "Final decision for parents",
    answer: "Question: What should parents ask before paying? Answer: Parents should ask for proof, not promises.",
    verdict: "If these proofs are not provided, admission should be postponed.",
    points: [
      "Show me official KMI page where General Medicine is 6 years.",
      "Show me Study in Uzbekistan page where General Medicine is English.",
      "Show me written KMI letter saying the full course is English.",
      "Show me internship structure.",
      "Show me proof graduates can practise/register in Uzbekistan.",
      "Show me ECAQA certificate for English-medium General Medicine.",
      "Show me Indian student batch-wise numbers.",
      "Show me FMGE result proof if claimed.",
      "Show me official fee breakup.",
      "Give me current Indian student phone numbers.",
    ],
    sources: ["All sources above"],
    icon: ShieldCheck, tone: "amber" as const,
  },
];

const sourceList = [
  "KMI official general information — kkmi.uz/en/about_institute/general-information/",
  "KMI foreign-student admission procedure and fee — kkmi.uz/en/foreign-students/admission-procedure/",
  "Study in Uzbekistan KMI profile — studyin-uzbekistan.uz/universities/117",
  "Study in Uzbekistan KMI programmes — studyin-uzbekistan.uz/universities/117/programs",
  "WDOMS KMI school listing — search.wdoms.org/home/SchoolDetail/F0000700",
  "WDOMS disclaimer — search.wdoms.org/",
  "ECAQA Accreditation Council meetings — ecaqa.org/en/about-ecaqa/accreditation-council/ac-meetings",
  "NMC FMGL Regulations, 2021 — nmc.org.in",
  "NMC page for students studying abroad — nmc.org.in",
  "Embassy of India, Tashkent advisory — eoitashkent.gov.in",
  "Embassy of India, Tashkent student information — eoitashkent.gov.in",
  "Uzbek legal portal RP-4598 — lex.uz/en/docs/7602093",
  "KMI 3+3 Pediatrics Russia notice — kkmi.uz/en/235237/",
  "NBEMS FMGE Performance Report 2025 — natboard.edu.in",
  "NBEMS official website — natboard.edu.in/",
];

/* ============================================================
   COMPONENTS
   ============================================================ */

function SectionIcon({ icon: Icon, tone }: { icon: LucideIcon; tone: string }) {
  const toneMap: Record<string, string> = {
    green: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-amber-100 text-amber-700",
    amber: "bg-orange-100 text-orange-700",
    red: "bg-red-100 text-red-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneMap[tone] || toneMap.blue}`}>
      <Icon size={20} />
    </span>
  );
}

function ColourBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold leading-5 ${colourStyles[status] || "bg-slate-100 text-slate-800"}`}>
      {status}
    </span>
  );
}

function VerdictBox({ children, tone = "blue" }: { children: React.ReactNode; tone?: string }) {
  const borders: Record<string, string> = {
    green: "border-emerald-300 bg-emerald-50 text-emerald-900",
    blue: "border-blue-300 bg-blue-50 text-blue-900",
    yellow: "border-amber-300 bg-amber-50 text-amber-900",
    amber: "border-orange-300 bg-orange-50 text-orange-900",
    red: "border-red-300 bg-red-50 text-red-900",
    purple: "border-purple-300 bg-purple-50 text-purple-900",
  };
  return (
    <div className={`mt-4 rounded-xl border-2 p-4 text-sm font-bold leading-6 ${borders[tone] || borders.blue}`}>
      <span className="flex items-center gap-2">
        <Verified size={16} className="shrink-0" />
        {children}
      </span>
    </div>
  );
}

function SourceChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
      <ExternalLink size={10} />
      {label.length > 50 ? label.slice(0, 50) + "…" : label}
    </span>
  );
}

/* ============================================================
   HERO
   ============================================================ */

function KMIHero() {
  return (
    <section className="relative overflow-hidden bg-[#02162e] px-3 py-6 text-white sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(0,211,155,0.22),transparent_40%),radial-gradient(ellipse_at_90%_30%,rgba(15,76,255,0.18),transparent_40%),radial-gradient(ellipse_at_50%_100%,rgba(0,120,90,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(3,27,53,0.96)_0%,rgba(3,39,72,0.88)_40%,rgba(2,22,46,0.92)_100%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#00d39b]/10 blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-[#0F4CFF]/10 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00d39b]/30 bg-[#00d39b]/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#51e6b3] sm:text-xs">
              <Verified size={12} /> Decision Research Report
            </div>
            <h1 className="mt-4 text-3xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              Karakalpakstan<br /><span className="text-[#00D39B]">Medical Institute</span>
            </h1>
            <p className="mt-2 text-sm font-extrabold uppercase tracking-[0.12em] text-[#7ff0ca] sm:text-base">
              Uzbekistan — Detailed Decision-Making Research for Indian MBBS Students
            </p>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-blue-100 sm:text-base">
              Prepared for Indian students, parents and admission consultants who want to decide whether Karakalpakstan Medical Institute, Nukus, Uzbekistan, is suitable for MBBS-equivalent / General Medicine admission. Based solely on official, authorized and public sources.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 text-[11px] font-bold text-emerald-300"><CheckCircle2 size={13} /> Real Public Institute</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-950/40 px-3 py-1.5 text-[11px] font-bold text-blue-300"><GraduationCap size={13} /> 6-Year GM</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-950/40 px-3 py-1.5 text-[11px] font-bold text-amber-300"><ShieldQuestion size={13} /> FMGE Data Pending</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-950/40 px-3 py-1.5 text-[11px] font-bold text-purple-300"><Verified size={13} /> WDOMS Listed</span>
            </div>
            <div className="mt-6">
              <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#00B981] px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(0,185,129,0.26)] transition hover:bg-[#00A878]">
                Get Personal Guidance <ArrowRight size={16} />
              </CounsellingActionButton>
            </div>
          </div>
          <div className="w-full shrink-0 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-5 lg:w-80">
            <h2 className="text-[10px] font-black uppercase tracking-[0.12em] text-[#51e6b3]">Decision Colour Code</h2>
            <div className="mt-3 space-y-2">
              {decisionTable.slice(0, 6).map((row) => (
                <div key={row.area} className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-3 py-2">
                  <span className="text-[11px] font-bold leading-tight text-blue-100">{row.area}</span>
                  <ColourBadge status={row.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border-2 border-[#00d39b]/30 bg-[linear-gradient(135deg,rgba(0,211,155,0.12),rgba(0,90,70,0.08))] p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#51e6b3]">Final Short Verdict</p>
          <p className="mt-2 text-lg font-black leading-7 text-white sm:text-xl">Should Indian students take admission at KMI?</p>
          <p className="mt-2 text-base font-bold leading-7 text-[#51e6b3]">Answer: Admission can be considered, but only after written verification.</p>
          <p className="mt-2 text-sm font-semibold leading-7 text-blue-100">
            Karakalpakstan Medical Institute is a real public medical institute in Uzbekistan. Official and authorized sources show that it has a 6-year General Medicine programme. The Study in Uzbekistan official portal lists General Medicine 60910200 as English medium and 6 years. But for Indian students, NMC eligibility depends on the full course structure, English medium throughout, internship/clinical practice, local licence eligibility and FMGE/NExT pathway. So: KMI is real and has an authorized 6-year English General Medicine listing, but it is not yet a fully proven FMGE-outcome university. Proceed only after written confirmation from KMI.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DECISION TABLE
   ============================================================ */

function DecisionTableSection() {
  return (
    <section className="bg-white px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#00A878]">At a Glance</h2>
        <p className="mt-2 text-2xl font-black text-[#071f3f] sm:text-3xl">Complete Decision Matrix</p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[600px] border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#071f3f] text-white">
                <th className="px-4 py-3 font-black">Area</th>
                <th className="px-4 py-3 font-black">Status</th>
                <th className="px-4 py-3 font-black">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {decisionTable.map((row) => (
                <tr key={row.area} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-[#071f3f]">{row.area}</td>
                  <td className="px-4 py-3"><ColourBadge status={row.status} /></td>
                  <td className="px-4 py-3 text-slate-600">{row.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   RESEARCH SECTIONS
   ============================================================ */

function ResearchSection({ section }: { section: (typeof sections)[0] }) {
  const toneBorders: Record<string, string> = {
    green: "border-l-emerald-500",
    blue: "border-l-blue-500",
    yellow: "border-l-amber-500",
    amber: "border-l-orange-500",
    red: "border-l-red-500",
    purple: "border-l-purple-500",
  };
  return (
    <article id={section.id} className={`scroll-mt-20 border-l-4 bg-white ${toneBorders[section.tone] || "border-l-blue-500"} rounded-r-2xl px-4 py-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] sm:px-6 sm:py-6`}>
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#071f3f] text-[11px] font-black text-white sm:h-10 sm:w-10 sm:text-sm">{section.number}</span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start gap-2 sm:items-center">
            <h2 className="text-base font-black leading-6 text-[#071f3f] sm:text-lg">{section.question}</h2>
            <SectionIcon icon={section.icon} tone={section.tone} />
          </div>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{section.answer}</p>
          <ul className="mt-3 space-y-2">
            {section.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm font-medium leading-6 text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00A878]" />
                {point}
              </li>
            ))}
          </ul>
          <VerdictBox tone={section.tone}>{section.verdict}</VerdictBox>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {section.sources.map((src) => (
              <SourceChip key={src} label={src} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   FINAL CONCLUSION
   ============================================================ */

function FinalConclusion() {
  return (
    <section className="scroll-mt-20 bg-white px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-[linear-gradient(135deg,#02162e,#063b70)] p-6 shadow-[0_24px_70px_rgba(3,27,53,0.2)] sm:p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00d39b]/20 text-[#51e6b3]"><Target size={20} /></span>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#51e6b3]">Section 28 — Final Overall Conclusion</p>
          </div>
          <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">Karakalpakstan Medical Institute: Final Verdict</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-blue-100">
            Karakalpakstan Medical Institute is a genuine public medical institute in Nukus, Uzbekistan. It has a recognized public identity, older medical education roots, a 2020 Presidential transformation, WDOMS listing, FAIMER School ID F0000700, official foreign-student admission page, and a 6-year General Medicine programme.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4">
              <p className="text-sm font-black text-emerald-300">Strongest Positive Point</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-emerald-100">
                The official Study in Uzbekistan portal lists KMI General Medicine 60910200 as English medium and 6 years.
              </p>
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-4">
              <p className="text-sm font-black text-amber-300">Strongest Caution</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-amber-100">
                ECAQA&apos;s public accreditation entry for KMI lists General Medicine in Uzbek/Russian medium. KMI-specific FMGE data not found in official NBEMS data checked.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-xl border-2 border-[#00d39b]/30 bg-[linear-gradient(135deg,rgba(0,211,155,0.12),rgba(0,90,70,0.08))] p-5">
            <p className="text-sm font-black text-[#51e6b3]">Final Decision</p>
            <p className="mt-2 text-base font-bold leading-7 text-white">
              KMI is real and likely has a 6-year English General Medicine track, but it should be treated as an early-stage / unproven Indian-FMGE option until KMI provides written proof of full English medium, internship, local licence eligibility, English-track accreditation and Indian student outcomes.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#00B981] px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(0,185,129,0.26)] transition hover:bg-[#00A878]">
              Talk to an Expert <MessageCircle size={16} />
            </CounsellingActionButton>
            <a href={kmiWhatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-extrabold text-white transition hover:border-[#51e6b3] hover:text-[#51e6b3]">
              WhatsApp Query <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SOURCE LIST
   ============================================================ */

function SourceList() {
  return (
    <section className="bg-[#f6f8fb] px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#00A878]">Non-Clickable Source List</h2>
        <p className="mt-2 text-2xl font-black text-[#071f3f] sm:text-3xl">Official & Authorized Sources</p>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
          This report is prepared using official, authorized and public sources only. Promotional brochure information is excluded. Consultant websites and agent claims are not treated as verified proof unless supported by official sources.
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {sourceList.map((src, i) => (
            <div key={i} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00A878]/10 text-[10px] font-black text-[#00A878]">{i + 1}</span>
              <p className="text-xs font-medium leading-5 text-slate-700">{src}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-7 text-amber-950">
          ⚠️ This report is for informational and decision-support purposes only. It does not constitute admission guarantee, NMC approval, or a recommendation to join. Students must verify all details directly with KMI, NMC, and relevant authorities before making any payment or admission commitment.
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BREADCRUMB / NAV
   ============================================================ */

function KMIBreadcrumb() {
  return (
    <nav className="border-y border-white/10 bg-[#02162e] px-3 py-2 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto text-[11px] font-semibold [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Link href="/" className="shrink-0 text-blue-200 hover:text-white transition-colors">Home</Link>
        <span className="shrink-0 text-white/30">/</span>
        <Link href="/mbbs-abroad/" className="shrink-0 text-blue-200 hover:text-white transition-colors">MBBS Abroad</Link>
        <span className="shrink-0 text-white/30">/</span>
        <Link href="/mbbs-abroad/uzbekistan/" className="shrink-0 text-blue-200 hover:text-white transition-colors">Uzbekistan</Link>
        <span className="shrink-0 text-white/30">/</span>
        <span className="shrink-0 text-white">Karakalpakstan Medical Institute</span>
      </div>
    </nav>
  );
}

function SectionNavigator() {
  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-3 py-1.5 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.slice(0, 12).map((s) => (
          <a key={s.id} href={`#${s.id}`} className="inline-flex h-7 shrink-0 items-center rounded-full border border-slate-200 bg-white px-2.5 text-[9px] font-bold text-slate-600 hover:border-[#00A878] hover:text-[#00A878] whitespace-nowrap sm:text-[10px]">
            Q{s.number}
          </a>
        ))}
        <span className="shrink-0 text-[9px] font-bold text-slate-400">+{sections.length - 12} more</span>
      </div>
    </nav>
  );
}

/* ============================================================
   JSON-LD
   ============================================================ */

function buildJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ilmalink.com/" },
        { "@type": "ListItem", position: 2, name: "MBBS Abroad", item: "https://www.ilmalink.com/mbbs-abroad/" },
        { "@type": "ListItem", position: 3, name: "MBBS in Uzbekistan", item: "https://www.ilmalink.com/mbbs-abroad/uzbekistan/" },
        { "@type": "ListItem", position: 4, name: "Karakalpakstan Medical Institute", item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Report",
      name: "Karakalpakstan Medical Institute Decision Research Report",
      description: "Detailed evidence-based decision-making research on Karakalpakstan Medical Institute for Indian MBBS students, parents and education consultants.",
      numberOfPages: sections.length + 2,
      about: {
        "@type": "CollegeOrUniversity",
        name: "Medical Institute of Karakalpakstan",
        alternateName: "Karakalpakstan Medical Institute",
        location: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Nukus", addressRegion: "Karakalpakstan", addressCountry: "UZ" } },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: sections.slice(0, 10).map((s) => ({
        "@type": "Question",
        name: s.question,
        acceptedAnswer: { "@type": "Answer", text: s.answer },
      })),
    },
  ];
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function KMIPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] text-slate-950">
      <JsonLd data={buildJsonLd()} />
      <Navbar />
      <KMIBreadcrumb />
      <KMIHero />
      <DecisionTableSection />
      <SectionNavigator />
      <div className="mx-auto max-w-7xl space-y-4 px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
        {sections.map((section) => (
  <ResearchSection key={section.id} section={section} />
))}
      </div>
      <FinalConclusion />
      <SourceList />
    </main>
  );
}