import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  FileCheck2,
  FileText,
  GraduationCap,
  MapPin,
  MessageCircle,
  Microscope,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react";

import CounsellingActionButton from "../../components/CounsellingActionButton";
import JsonLd from "../../components/JsonLd";
import Navbar from "../../components/navbar";
import { whatsappCounsellingUrl } from "../../data/exploreLinks";

export const dynamic = "force-static";

const pageUrl = "https://www.ilmalink.com/mbbs-abroad/uzbekistan/";
const uzbekistanWhatsappUrl = `${whatsappCounsellingUrl}?text=${encodeURIComponent(
  "Hello ILMALINK MEDIGO, I want to talk to an Uzbekistan MBBS admission expert.",
)}`;

export const metadata: Metadata = {
  title: "MBBS in Uzbekistan 2026 | 39 Medical Universities, Fees & FMGE",
  description:
    "Compare all 39 WDOMS-listed Uzbekistan medical schools including Tashkent State Medical University, Samarkand State Medical University, Bukhara State Medical Institute, Andizhan State Medical Institute, Fergana Medical Institute of Public Health and others. Review fees, NEET, documents, WDOMS verification, NMC/FMGL checks and FMGE 2025 guidance.",
  keywords: [
    "MBBS in Uzbekistan",
    "Uzbekistan MBBS fees 2026",
    "Uzbekistan medical universities",
    "39 medical schools Uzbekistan WDOMS",
    "Andizhan State Medical Institute",
    "Bukhara State Medical Institute",
    "Samarkand State Medical University",
    "Tashkent State Medical University",
    "Tashkent Pediatric Medical Institute",
    "Tashkent State Dental Institute Faculty of Medicine",
    "Fergana Medical Institute of Public Health",
    "Medical Institute of Karakalpakstan",
    "NEET required for Indian students",
    "NMC FMGL compliance check",
    "WDOMS listing verification",
    "Uzbekistan FMGE performance",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "MBBS in Uzbekistan 2026 | 39 Universities, Fees & FMGE",
    description:
      "Uzbekistan MBBS university comparison with all 39 WDOMS records, fees, eligibility, documents, FMGE references, WDOMS and verification-first admission guidance.",
    url: pageUrl,
    siteName: "ILMALINK MEDIGO",
    images: [
      {
        url: "/images/mbbs-abroad/uzbekistan.jpg",
        width: 1800,
        height: 506,
        alt: "Uzbekistan MBBS guide for Indian students",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MBBS in Uzbekistan 2026 | 39 Universities, Fees & FMGE",
    description:
      "Uzbekistan MBBS university comparison with all 39 WDOMS records, FMGE data awareness, eligibility, documents and verification guidance.",
    images: ["/images/mbbs-abroad/uzbekistan.jpg"],
  },
};

const uzbekistanCountryStats = [
  {
    label: "WDOMS records shown",
    value: "39",
  },
  {
    label: "FMGE 2025 reference rows",
    value: "8",
  },
  {
    label: "Typical course duration",
    value: "6 years",
  },
  {
    label: "Admission approach",
    value: "Verify first",
  },
];

const universities = [
  {
    slug: "alfraganus-university-faculty-of-medicine",
    name: "Alfraganus University Faculty of Medicine",
    city: "Tashkent",
    type: "University Faculty of Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Alfraganus University Faculty of Medicine appears in the Uzbekistan WDOMS search records. Indian students should verify the exact medical programme, course duration, medium of instruction, internship route and NMC/FMGL suitability before admission.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found. Treat FMGE status as verification-needed.",
    caution:
      "Do not accept admission based only on agent claims. Collect official admission letter, fee structure, medium certificate and course-duration confirmation.",
  },
  {
    slug: "andizhan-state-medical-institute",
    name: "Andizhan State Medical Institute",
    city: "Andizhan",
    type: "State Medical Institute",
    feeRange: "Fee must be verified from official documents",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Andizhan State Medical Institute is listed in the Uzbekistan WDOMS records and appears in the attached FMGE 2025 institute-wise data. It should be checked for current intake, teaching medium, internship route and Indian licensing suitability.",
    fmgeSummary:
      "FMGE 2025 attached PDF: June 4 appeared, 0 passed; December 4 appeared, 1 passed. Combined 8 appeared, 1 passed, approx. 12.50% pass rate.",
    caution:
      "Verify current admission status, English-medium teaching, hospital training, local registration eligibility and latest NMC/FMGL compliance before payment.",
  },
  {
    slug: "angren-university-faculty-of-medicine",
    name: "Angren University Faculty of Medicine",
    city: "Tashkent",
    type: "University Faculty of Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Angren University Faculty of Medicine appears in the Uzbekistan WDOMS search records. Students should verify whether the exact programme is suitable for Indian licensing requirements and future FMGE/NExT pathway.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Verify WDOMS details, official status, clinical exposure, internship and all fee terms before admission.",
  },
  {
    slug: "asia-international-university-faculty-of-medicine",
    name: "Asia International University Faculty of Medicine",
    city: "Bukhara",
    type: "University Faculty of Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Asia International University Faculty of Medicine appears in the Uzbekistan WDOMS search records. Indian students should compare it carefully with older state medical institutes and verify all official documents before admission.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Do not treat WDOMS listing as approval. Verify recognition, medium, duration, internship and local licence eligibility.",
  },
  {
    slug: "bukhara-innovative-education-and-medical-university",
    name: "Bukhara Innovative Education and Medical University",
    city: "Bukhara",
    type: "Medical University",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Bukhara Innovative Education and Medical University appears in the Uzbekistan WDOMS search records. It should be treated as verification-needed until official academic, clinical and licensing documents are checked.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Check university-side documents, fee invoice, hostel terms, hospital attachment and NMC/FMGL suitability before payment.",
  },
  {
    slug: "bukhara-state-medical-institute-named-after-abu-ali-ibn-sino",
    name: "Bukhara State Medical Institute named after Abu Ali Ibn Sino",
    city: "Bukhara",
    type: "State Medical Institute",
    feeRange: "Fee must be verified from official documents",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Bukhara State Medical Institute named after Abu Ali Ibn Sino is a major Uzbekistan medical institute in the WDOMS list and appears in the attached FMGE 2025 institute-wise data.",
    fmgeSummary:
      "FMGE 2025 attached PDF: June 188 appeared, 53 passed; December 316 appeared, 113 passed. Combined 504 appeared, 166 passed, approx. 32.94% pass rate.",
    caution:
      "Verify course duration, English-medium route, internship, local registration eligibility and updated fee schedule before admission.",
  },
  {
    slug: "central-asian-medical-university",
    name: "Central Asian Medical University",
    city: "Ferghana",
    type: "Medical University",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Central Asian Medical University appears in the Uzbekistan WDOMS records. Students should verify its current academic status, programme recognition and clinical training arrangements before admission.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Verify WDOMS listing, FMGE history, course details, hostel and hospital exposure before admission.",
  },
  {
    slug: "central-asian-university-medical-school",
    name: "Central Asian University Medical School",
    city: "Tashkent",
    type: "Medical School",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Central Asian University Medical School is listed in the Uzbekistan WDOMS search results. Indian students must verify whether the exact medical programme meets Indian licensing requirements.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Check official course name, medium, degree route, local registration and NMC/FMGL suitability.",
  },
  {
    slug: "chirchik-branch-of-tashkent-state-medical-university",
    name: "Chirchik Branch of Tashkent State Medical University",
    city: "Chirchik City",
    type: "Branch of State Medical University",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Chirchik Branch of Tashkent State Medical University appears in the Uzbekistan WDOMS records. Branch-campus admission needs extra verification of degree-awarding authority and clinical training location.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Verify whether the branch issues the degree, where clinical training happens and whether the course is suitable for Indian students.",
  },
  {
    slug: "emu-university-faculty-of-medicine",
    name: "EMU University Faculty of Medicine",
    city: "Tashkent",
    type: "University Faculty of Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "EMU University Faculty of Medicine appears in the Uzbekistan WDOMS search records. Students should check current status and official medical programme documents before considering admission.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Verify WDOMS details, clinical training, student visa route, hostel and fee terms before payment.",
  },
  {
    slug: "fergana-medical-institute-of-public-health",
    name: "Fergana Medical Institute of Public Health",
    city: "Fergana",
    type: "Medical Institute",
    feeRange: "Fee must be verified from official documents",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Fergana Medical Institute of Public Health appears in the Uzbekistan WDOMS list and also appears in the attached FMGE 2025 institute-wise data.",
    fmgeSummary:
      "FMGE 2025 attached PDF: December 123 appeared, 63 passed, 51.22% pass rate. No June row found in the attached extracted match.",
    caution:
      "Verify whether the current programme, medium, internship and licensing route remain suitable for Indian students.",
  },
  {
    slug: "fergana-state-university-medical-centre",
    name: "Fergana State University Medical Centre",
    city: "Fergana",
    type: "State University Medical Centre",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Fergana State University Medical Centre appears in the Uzbekistan WDOMS list and has a small FMGE 2025 row in the attached PDF.",
    fmgeSummary:
      "FMGE 2025 attached PDF: December 1 appeared, 0 passed, 0.00% pass rate. Sample size is too small for decision-making.",
    caution:
      "Because the FMGE sample is extremely small, it should not be used alone. Verify official course and clinical details.",
  },
  {
    slug: "first-tashkent-state-medical-institute",
    name: "First Tashkent State Medical Institute",
    city: "Tashkent",
    type: "State Medical Institute",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "First Tashkent State Medical Institute appears in the Uzbekistan WDOMS search records. Students should verify the exact current institutional structure, degree route and admission status.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Confirm whether admission is under this exact listed name, current university structure, medium and licensing eligibility.",
  },
  {
    slug: "gulistan-state-university-faculty-of-medicine",
    name: "Gulistan State University Faculty of Medicine",
    city: "Gulistan City",
    type: "State University Faculty of Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Gulistan State University Faculty of Medicine appears in the Uzbekistan WDOMS records. It requires full document verification before being recommended to Indian students.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Verify the programme, medium, hospital exposure, fee terms and Indian licensing suitability before payment.",
  },
  {
    slug: "impuls-medical-institute",
    name: "Impuls Medical Institute",
    city: "Namangan",
    type: "Medical Institute",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Impuls Medical Institute appears in the Uzbekistan WDOMS list. Students should verify official recognition documents, academic pathway and clinical arrangements.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Check WDOMS, admission status, fee invoice, hostel, clinical exposure and NMC/FMGL suitability.",
  },
  {
    slug: "impuls-medical-institute-chirchiq-branch",
    name: "Impuls Medical Institute, Chirchiq Branch",
    city: "Chirchik City",
    type: "Branch Medical Institute",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Impuls Medical Institute, Chirchiq Branch appears in the Uzbekistan WDOMS list. Branch-campus admission should be verified more carefully than standard main-campus admission.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Confirm branch approval, degree-awarding authority, internship route and clinical hospital linkage.",
  },
  {
    slug: "institute-of-pharmaceutical-education-and-research",
    name: "Institute of Pharmaceutical Education and Research",
    city: "Tashkent",
    type: "Institute",
    feeRange: "Fee not verified — official invoice required",
    duration: "Course suitability must be verified",
    medium: "English-medium route must be verified",
    description:
      "Institute of Pharmaceutical Education and Research appears in the Uzbekistan WDOMS list. Students must verify whether the listed programme is suitable for MBBS-equivalent admission and Indian licensing route.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Do not assume MBBS equivalence only from the institution name. Verify exact degree, curriculum and licensing eligibility.",
  },
  {
    slug: "karshi-state-university-faculty-of-medicine",
    name: "Karshi State University Faculty of Medicine",
    city: "Karshi",
    type: "State University Faculty of Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Karshi State University Faculty of Medicine appears in the Uzbekistan WDOMS records. It should be compared through official documents and not through promotional claims only.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Verify medical programme status, clinical exposure, local licence eligibility and Indian compliance before payment.",
  },
  {
    slug: "kimyo-international-university-school-of-medicine",
    name: "Kimyo International University School of Medicine",
    city: "Tashkent",
    type: "School of Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Kimyo International University School of Medicine appears in the Uzbekistan WDOMS list. Students should verify official academic documents, fee plan and clinical training route.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Avoid unsupported claims of approval or guaranteed FMGE. Verify everything from official sources.",
  },
  {
    slug: "kokand-university-andijan-branch-faculty-of-medicine",
    name: "Kokand University Andijan Branch Faculty of Medicine",
    city: "Andijan",
    type: "Branch Faculty of Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Kokand University Andijan Branch Faculty of Medicine appears in the Uzbekistan WDOMS list. Branch faculty details must be checked carefully before admission.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Verify branch approval, degree-awarding institution, hospital training and licensing route before paying fees.",
  },
  {
    slug: "mamun-university-faculty-of-medicine",
    name: "Ma'mun University Faculty of Medicine",
    city: "Khiva",
    type: "University Faculty of Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Ma'mun University Faculty of Medicine appears in the Uzbekistan WDOMS search records. Students should verify the exact medical programme, WDOMS page and Indian licensing suitability.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Check official course name, medium, duration, internship and all fee terms before admission.",
  },
  {
    slug: "medical-institute-of-karakalpakstan",
    name: "Medical Institute of Karakalpakstan",
    city: "Nukus",
    type: "Medical Institute",
    feeRange: "Official tuition USD ~3,500/yr — verify hostel and extras",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Medical Institute of Karakalpakstan appears in the Uzbekistan WDOMS list. Detailed verification, decision matrix and risk analysis are covered in the dedicated KMI research page.",
    fmgeSummary:
      "KMI-specific FMGE outcome data not found in official NBEMS data checked.",
    caution:
      "Verify clinical exposure, internship, hostel, WDOMS details and Indian licensing pathway before admission.",
  },
  {
    slug: "namangan-state-university-faculty-of-medicine",
    name: "Namangan State University Faculty of Medicine",
    city: "Namangan",
    type: "State University Faculty of Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Namangan State University Faculty of Medicine appears in the Uzbekistan WDOMS list. Students should check current programme status, official documents and clinical pathway.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Verify medical faculty status, teaching medium, internship, fee schedule and student visa route.",
  },
  {
    slug: "navoi-state-university-faculty-of-natural-sciences-and-medicine",
    name: "Navoi State University Faculty of Natural Sciences and Medicine",
    city: "Navoi",
    type: "State University Faculty",
    feeRange: "Fee not verified — official invoice required",
    duration: "Course suitability must be verified",
    medium: "English-medium route must be verified",
    description:
      "Navoi State University Faculty of Natural Sciences and Medicine appears in the Uzbekistan WDOMS list. Students must verify whether the exact medical course fits MBBS-equivalent and licensing needs.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Verify the exact degree, medical curriculum, course duration and Indian licensing suitability before payment.",
  },
  {
    slug: "profi-university-faculty-of-medicine",
    name: "Profi University Faculty of Medicine",
    city: "Tashkent",
    type: "University Faculty of Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Profi University Faculty of Medicine appears in the Uzbekistan WDOMS list. Students should verify programme details, official admission status and clinical training pathway.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Verify recognition, WDOMS details, medium, duration, internship and fee invoice before admission.",
  },
  {
    slug: "samarkand-state-medical-university",
    name: "Samarkand State Medical University",
    city: "Samarkand",
    type: "State Medical University",
    feeRange: "Fee must be verified from official documents",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Samarkand State Medical University appears in the Uzbekistan WDOMS records. The attached FMGE 2025 PDF uses the close institute-wise name Samarkand State Medical Institute, so the data should be treated as a close-name reference unless official continuity is confirmed.",
    fmgeSummary:
      "FMGE 2025 attached PDF close-name row: June 101 appeared, 43 passed; December 68 appeared, 15 passed. Combined 169 appeared, 58 passed, approx. 34.32% pass rate.",
    caution:
      "Because the FMGE row name is not exactly the same as the WDOMS display name, verify official continuity, renaming and current status before using the data.",
  },
  {
    slug: "second-tashkent-state-medical-institute",
    name: "Second Tashkent State Medical Institute",
    city: "Tashkent",
    type: "State Medical Institute",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Second Tashkent State Medical Institute appears in the Uzbekistan WDOMS list. Students should verify the current institution structure and admission pathway.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Check exact university identity, official course details, internship and local licence eligibility.",
  },
  {
    slug: "tashkent-pediatric-medical-institute",
    name: "Tashkent Pediatric Medical Institute",
    city: "Tashkent",
    type: "Medical Institute",
    feeRange: "Fee must be verified from official documents",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Tashkent Pediatric Medical Institute appears in the Uzbekistan WDOMS list. Students must verify whether the exact General Medicine or MBBS-equivalent route is suitable for Indian students.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Confirm the exact course name, degree route, medium, internship and Indian licensing suitability before admission.",
  },
  {
    slug: "tashkent-pharmaceutical-institute-faculty-of-general-medicine",
    name: "Tashkent Pharmaceutical Institute Faculty of General Medicine",
    city: "Tashkent",
    type: "Faculty of General Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Course suitability must be verified",
    medium: "English-medium route must be verified",
    description:
      "Tashkent Pharmaceutical Institute Faculty of General Medicine appears in the Uzbekistan WDOMS list. Students should carefully verify the exact medical degree and licensing route.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Do not assume MBBS equivalence only from the faculty name. Verify curriculum, duration, internship and Indian eligibility.",
  },
  {
    slug: "tashkent-state-dental-institute-faculty-of-medicine",
    name: "Tashkent State Dental Institute Faculty of Medicine",
    city: "Tashkent",
    type: "Faculty of Medicine",
    feeRange: "Fee must be verified from official documents",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Tashkent State Dental Institute Faculty of Medicine appears in the Uzbekistan WDOMS list and also appears in the attached FMGE 2025 institute-wise data.",
    fmgeSummary:
      "FMGE 2025 attached PDF: June 23 appeared, 3 passed; December 57 appeared, 18 passed. Combined 80 appeared, 21 passed, approx. 26.25% pass rate.",
    caution:
      "Verify whether admission is for the medical faculty, exact degree route, medium, internship and Indian licensing suitability.",
  },
  {
    slug: "tashkent-state-medical-university",
    name: "Tashkent State Medical University",
    city: "Tashkent",
    type: "State Medical University",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Tashkent State Medical University appears in the Uzbekistan WDOMS list. Students should verify current status, official admission route and whether any older-name FMGE records apply.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name row found. Do not merge automatically with Tashkent Medical Academy without official confirmation.",
    caution:
      "Verify current university identity, WDOMS page, degree route, clinical training and NMC/FMGL suitability before payment.",
  },
  {
    slug: "termez-branch-of-tashkent-state-medical-university",
    name: "Termez Branch of Tashkent State Medical University",
    city: "Termez",
    type: "Branch of State Medical University",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Termez Branch of Tashkent State Medical University appears in the Uzbekistan WDOMS list. Branch admission requires careful verification of degree-awarding authority and hospital training.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Verify branch approval, clinical exposure, internship location, fee terms and local licence eligibility.",
  },
  {
    slug: "termez-university-of-economics-and-services",
    name: "Termez University of Economics and Services",
    city: "Termez",
    type: "University",
    feeRange: "Fee not verified — official invoice required",
    duration: "Course suitability must be verified",
    medium: "English-medium route must be verified",
    description:
      "Termez University of Economics and Services appears in the Uzbekistan WDOMS list. Students should carefully verify the exact listed medical programme before considering admission.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Verify exact degree, medical faculty status, curriculum, hospital exposure and Indian licensing suitability.",
  },
  {
    slug: "turon-university-faculty-of-medicine",
    name: "Turon University Faculty of Medicine",
    city: "Karshi",
    type: "University Faculty of Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Turon University Faculty of Medicine appears in the Uzbekistan WDOMS list. Students should verify official documents and current medical programme status.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Check WDOMS, admission status, hospital linkage, medium and NMC/FMGL suitability before payment.",
  },
  {
    slug: "university-of-business-and-science",
    name: "University of Business and Science",
    city: "Namangan",
    type: "University",
    feeRange: "Fee not verified — official invoice required",
    duration: "Course suitability must be verified",
    medium: "English-medium route must be verified",
    description:
      "University of Business and Science appears in the Uzbekistan WDOMS list. Because the name is broad, students must verify the exact medical school or faculty and degree pathway.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Do not assume MBBS suitability from name alone. Verify the exact medical programme, duration, internship and licensing route.",
  },
  {
    slug: "urgench-ranch-university-of-technology-faculty-of-medical-sciences",
    name: "Urgench Ranch University of Technology Faculty of Medical Sciences",
    city: "Urgench",
    type: "Faculty of Medical Sciences",
    feeRange: "Fee not verified — official invoice required",
    duration: "Course suitability must be verified",
    medium: "English-medium route must be verified",
    description:
      "Urgench Ranch University of Technology Faculty of Medical Sciences appears in the Uzbekistan WDOMS list. Students should verify the exact name, spelling, WDOMS page and degree pathway.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name row found. The PDF separately has Urgench Branch of Tashkent Medical Academy data, but it should not be merged without official confirmation.",
    caution:
      "Verify exact university identity, degree, hospital exposure, internship and Indian licensing suitability before admission.",
  },
  {
    slug: "urgench-state-medical-institute",
    name: "Urgench State Medical Institute",
    city: "Urgench",
    type: "State Medical Institute",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Urgench State Medical Institute appears in the Uzbekistan WDOMS list. Students should verify whether any FMGE data under similar Urgench names applies to this exact institute.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found. Do not merge automatically with Urgench Branch of Tashkent Medical Academy.",
    caution:
      "Do not mix this with another Urgench-named institution without official confirmation. Verify WDOMS and university-side documents.",
  },
  {
    slug: "zarmed-university-faculty-of-medicine",
    name: "Zarmed University Faculty of Medicine",
    city: "Bukhara",
    type: "University Faculty of Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Zarmed University Faculty of Medicine appears in the Uzbekistan WDOMS list. Students should verify the exact Bukhara campus, programme, fee and clinical training pathway.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Verify WDOMS details, official admission letter, medium certificate, fee invoice and NMC/FMGL suitability before payment.",
  },
  {
    slug: "zarmed-university-faculty-of-medicine-samarkand",
    name: "Zarmed University Faculty of Medicine Samarkand",
    city: "Samarkand",
    type: "University Faculty of Medicine",
    feeRange: "Fee not verified — official invoice required",
    duration: "Usually 6 years; verify officially",
    medium: "English-medium route must be verified",
    description:
      "Zarmed University Faculty of Medicine Samarkand appears in the Uzbekistan WDOMS list. Students should verify whether the Samarkand campus has separate admission, hostel, hospital and degree details.",
    fmgeSummary:
      "FMGE 2025 attached PDF: no exact same-name institute-wise row found.",
    caution:
      "Verify campus-specific approval, clinical exposure, medium, duration, internship and licensing pathway before admission.",
  },
];

const mainFaqs = [
  {
    question: "Is NEET required for Indian students planning MBBS in Uzbekistan?",
    answer:
      "Indian students should treat NEET qualification as a mandatory checkpoint for the MBBS abroad and Indian licensing pathway. Students must verify current Indian eligibility and NMC/FMGL rules before final admission.",
  },
  {
    question: "What should students verify before choosing MBBS in Uzbekistan?",
    answer:
      "Students must verify the exact WDOMS listing, NMC/FMGL compliance, medium of instruction, internship structure, recognition status, hostel terms, official fee invoice, visa rules and latest admission status.",
  },
  {
    question: "What are the estimated Uzbekistan MBBS fees for 2026?",
    answer:
      "The Uzbekistan page uses indicative fee guidance only. Actual tuition, hostel, mess, visa, documentation and yearly payment terms must be verified from official university invoices before admission.",
  },
  {
    question: "Does WDOMS listing guarantee NMC approval or Indian practice?",
    answer:
      "No. WDOMS listing is only one verification point. It is not NMC approval, WHO approval, FAIMER approval or a guarantee of FMGE/NExT success or Indian medical practice eligibility.",
  },
];

const quickLinks = [
  { label: "Quick Jump", href: "#overview", icon: SearchCheck },
  { label: "Universities", href: "#universities", icon: Building2 },
  { label: "Fees & Cost", href: "#fees", icon: CircleDollarSign },
  { label: "Eligibility", href: "#eligibility", icon: ClipboardCheck },
  { label: "Documents", href: "#documents", icon: FileText },
  { label: "Why Uzbekistan", href: "#why-uzbekistan", icon: MapPin },
  { label: "FMGE Path", href: "#fmge", icon: TrendingUp },
  { label: "FAQ", href: "#faq", icon: BookOpen },
];

const whyUzbekistan = [
  {
    title: "All 39 WDOMS records",
    body:
      "The page lists all 39 Uzbekistan medical school records visible in the WDOMS search screenshots shared for comparison and verification.",
    icon: Building2,
    tone: "green",
  },
  {
    title: "FMGE data awareness",
    body:
      "FMGE/NBEMS institute-wise rows are shown where exact or close-name matches are available, but they are never treated as guarantee.",
    icon: TrendingUp,
    tone: "purple",
  },
  {
    title: "English-medium checks",
    body:
      "Students must verify the latest English-medium programme document before admission, especially for new faculties and branch campuses.",
    icon: BookOpen,
    tone: "blue",
  },
  {
    title: "Fee invoice first",
    body:
      "Fees should be compared only after collecting official university invoices, hostel terms, yearly payment schedule and refund rules.",
    icon: CircleDollarSign,
    tone: "amber",
  },
  {
    title: "Clinical training checks",
    body:
      "Students should verify hospital attachment, patient exposure, clerkship and internship structure before paying fees.",
    icon: Stethoscope,
    tone: "blue",
  },
  {
    title: "Verification-first guidance",
    body:
      "Every Uzbekistan option requires a current check of WDOMS, NMC/FMGL rules, recognition, medium, fees, hostel and admission status.",
    icon: ShieldCheck,
    tone: "green",
  },
] as const;

const feeRows = [
  {
    year: "Year 1",
    tuitionFee: "University-wise",
    hostelAndLiving: "City-wise",
    notes: "Admission, visa and travel extra",
  },
  {
    year: "Year 2–5",
    tuitionFee: "University-wise",
    hostelAndLiving: "City-wise",
    notes: "Verify annual increase and payment terms",
  },
  {
    year: "Final Year",
    tuitionFee: "University-wise",
    hostelAndLiving: "City-wise",
    notes: "Check internship and clinical rules",
  },
  {
    year: "Total estimate",
    tuitionFee: "Official invoice required",
    hostelAndLiving: "Variable",
    notes: "Do not rely on agent-only fee sheets",
  },
];

const eligibilityItems = [
  "NEET qualification should be treated as mandatory for Indian students.",
  "PCB eligibility must be checked according to applicable Indian and university rules.",
  "Valid passport is required before visa and final travel planning.",
  "Admission letter and official fee structure must be collected from the university side.",
  "English-medium teaching must be confirmed in writing.",
  "Course duration, internship and local registration eligibility must be verified.",
];

const documents = [
  "10th marksheet and certificate",
  "12th marksheet and certificate",
  "NEET scorecard",
  "Valid passport",
  "Passport-size photographs",
  "Official admission letter",
  "University fee structure",
  "Student visa documents",
  "Medical fitness documents",
  "English-medium confirmation where applicable",
  "Course duration and internship confirmation",
];

const uzbekistanFinalDisclaimer =
  "Uzbekistan MBBS admission information, fees, university status, hostel terms, visa rules, NMC/FMGL criteria, WDOMS information and FMGE/NBEMS references can change. Students must verify the latest official documents and applicable Indian and Uzbekistan regulations before admission, payment or travel commitment.";

function buildJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.ilmalink.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "MBBS Abroad",
          item: "https://www.ilmalink.com/mbbs-abroad/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "MBBS in Uzbekistan",
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Uzbekistan medical universities and medical schools",
      numberOfItems: universities.length,
      itemListElement: universities.map((university, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: university.name,
        url: `${pageUrl}#${university.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "MBBS in Uzbekistan guide sections",
      itemListElement: quickLinks.map((link, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: link.label,
        url: `${pageUrl}${link.href}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: mainFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : ""}>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00A878]">
        {eyebrow}
      </p>
      <h2
        className={`mt-2 text-2xl font-black tracking-tight text-[#071f3f] sm:text-3xl lg:text-4xl ${
          centered ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 text-sm font-medium leading-7 text-slate-600 sm:text-base ${
            centered ? "mx-auto max-w-3xl" : "max-w-4xl"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CtaButtons({
  dark = false,
  compact = false,
  primaryLabel = "Check Eligibility",
}: {
  dark?: boolean;
  compact?: boolean;
  primaryLabel?: string;
}) {
  return (
    <div
      className={
        compact
          ? "grid w-full grid-cols-1 gap-1.5 min-[340px]:grid-cols-[1.18fr_1fr]"
          : "flex flex-col gap-3 sm:flex-row sm:flex-wrap"
      }
    >
      <CounsellingActionButton
        className={`inline-flex min-w-0 items-center justify-center rounded-lg bg-[#00B981] font-extrabold text-white shadow-[0_12px_30px_rgba(0,185,129,0.26)] transition hover:bg-[#00A878] ${
          compact
            ? "min-h-8 whitespace-nowrap px-1 py-1 !text-[10px] tracking-[-0.025em] min-[360px]:!text-xs sm:min-h-9 sm:gap-1 sm:px-2 sm:!text-sm"
            : "min-h-11 gap-2 px-5 py-3 text-sm"
        }`}
      >
        {primaryLabel}
        {compact ? null : <ArrowRight size={16} />}
      </CounsellingActionButton>
      <a
        href={uzbekistanWhatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Talk to an Uzbekistan admission expert on WhatsApp"
        className={`inline-flex min-w-0 items-center justify-center border font-extrabold transition ${
          dark
            ? "border-white/30 bg-white/10 text-white hover:border-[#51e6b3] hover:text-[#51e6b3]"
            : "border-[#0b4b7a] bg-white text-[#0b3a67] hover:border-[#00A878] hover:text-[#00A878]"
        } ${
          compact
            ? "min-h-8 whitespace-nowrap rounded-lg px-1 py-1 !text-[10px] tracking-[-0.025em] min-[360px]:!text-xs sm:min-h-9 sm:gap-1 sm:px-2 sm:!text-sm"
            : "min-h-11 gap-2 rounded-xl px-5 py-3 text-sm"
        }`}
      >
        Talk to Expert
        {compact ? null : <MessageCircle size={16} />}
      </a>
    </div>
  );
}

function UzbekistanHero() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden bg-[#031b35] px-4 py-7 text-white sm:px-6 sm:py-9 lg:px-8 lg:py-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(0,211,155,0.28),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(15,76,255,0.26),transparent_26%),linear-gradient(90deg,rgba(3,27,53,0.99)_0%,rgba(3,39,72,0.94)_45%,rgba(3,27,53,0.74)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,27,53,0.42),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(102px,0.36fr)] gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(210px,0.48fr)] sm:gap-6 lg:grid-cols-[1.2fr_0.52fr] lg:items-stretch">
          <div className="min-w-0">
            <div className="inline-block max-w-full">
              <h1 className="max-w-3xl text-4xl font-black uppercase leading-[0.94] tracking-tight sm:text-6xl lg:text-7xl">
                MBBS in
                <span className="block text-[#00D39B]">Uzbekistan</span>
              </h1>
              <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#7ff0ca] sm:text-xs">
                (2026 MBBS Admissions)
              </p>
            </div>
            <p className="mt-3 max-w-2xl text-base font-bold leading-5 text-white sm:text-xl">
              39 WDOMS-listed records,
              <br />
              FMGE 2025 awareness
              <br />
              and verification guidance
            </p>
            <div className="mt-4 grid w-full max-w-[61vw] grid-cols-3 gap-0.5 sm:max-w-md sm:gap-3">
              {[
                ["NMC/FMGL", "Check", ShieldCheck],
                ["English", "Verify", BookOpen],
                ["FMGE/NExT", "Pathway", TrendingUp],
              ].map(([label, value, Icon]) => {
                const IconComponent = Icon as typeof ShieldCheck;

                return (
                  <div
                    key={label as string}
                    className="flex min-w-0 items-center gap-0 sm:gap-2"
                  >
                    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#c7fff0]/90 bg-[linear-gradient(145deg,rgba(255,255,255,0.2),rgba(5,97,112,0.28))] text-white shadow-[0_6px_15px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-5px_10px_rgba(0,55,91,0.28)] min-[360px]:h-7 min-[360px]:w-7 sm:h-9 sm:w-9">
                      <span className="absolute inset-[3px] rounded-full border border-white/20" />
                      <span className="absolute -right-px top-0 h-1.5 w-1.5 rounded-full bg-[#51e6b3] shadow-[0_0_8px_rgba(81,230,179,1)] ring-1 ring-[#07345d]" />
                      <IconComponent
                        size={12}
                        strokeWidth={1.7}
                        className="relative h-3 w-3 drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)] min-[360px]:h-[13px] min-[360px]:w-[13px] sm:h-[18px] sm:w-[18px]"
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="whitespace-nowrap text-[6px] font-black leading-none tracking-[-0.04em] text-white min-[360px]:text-[8px] sm:text-xs">
                        {label as string}
                      </p>
                      <p className="mt-0.5 whitespace-nowrap text-[6px] font-bold leading-none text-[#b8ffea] min-[360px]:text-[8px] sm:text-xs">
                        {value as string}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <CtaButtons dark compact primaryLabel="Admission Desk" />
            </div>
          </div>

          <aside className="flex min-w-0 flex-col self-stretch rounded-xl bg-white px-1.5 py-2.5 text-[#071f3f] shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-4">
            <h2 className="text-[8px] font-black uppercase leading-tight tracking-[0.05em] sm:text-xs sm:tracking-[0.08em]">
              Uzbekistan at a glance
            </h2>
            <div className="mt-1.5 flex flex-1 flex-col justify-center divide-y divide-slate-200 sm:mt-2">
              {uzbekistanCountryStats.map((stat) => (
                <div
                  key={stat.label}
                  className="py-2 text-center sm:flex sm:items-center sm:justify-between sm:gap-3 sm:py-2.5 sm:text-left"
                >
                  <p className="text-[7px] font-bold leading-3 text-slate-500 sm:max-w-[68%] sm:text-[10px] sm:leading-4">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 shrink-0 text-xs font-black text-[#071f3f] sm:mt-0 sm:text-base">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function QuickNavigation() {
  return (
    <nav
      aria-label="MBBS in Uzbekistan page sections"
      className="border-y border-white/10 bg-[#031b35] px-3 py-1 shadow-[0_8px_24px_rgba(3,27,53,0.16)] sm:px-6 lg:px-8"
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2 lg:justify-between">
        {quickLinks.map(({ label, href, icon: Icon }, index) => (
          <a
            key={href}
            href={href}
            itemProp="url"
            aria-label={`Jump to ${label}`}
            className={`inline-flex h-6 shrink-0 items-center justify-center gap-1.5 rounded-full border px-2.5 text-[9px] font-bold leading-none transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51e6b3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#031b35] sm:px-3 sm:text-[10px] lg:text-[11px] ${
              index === 0
                ? "border-[#00d39b]/70 bg-[#073b50] !text-[#d9fff2] shadow-[inset_0_0_0_1px_rgba(0,211,155,0.08)] hover:bg-[#0a4a60]"
                : "border-transparent !text-[#edf7ff] hover:border-white/15 hover:bg-white/10 hover:!text-[#62f1c7]"
            }`}
          >
            <Icon
              aria-hidden="true"
              size={11}
              strokeWidth={2}
              className={index === 0 ? "text-[#00d39b]" : "text-[#b9d8ee]"}
            />
            <span itemProp="name">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

function AdmissionUpdate() {
  return (
    <section className="px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 rounded-2xl border border-red-200 bg-[#fff8f8] p-4 sm:flex-row sm:items-center sm:p-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#cf1731] text-white">
          <ShieldAlert size={19} />
        </span>
        <div className="flex-1">
          <h2 className="text-sm font-black uppercase text-[#b8172f]">
            Important admission update
          </h2>
          <p className="mt-1 text-sm font-medium leading-6 text-[#26394d]">
            Uzbekistan admission rules, university intake, fee terms, document
            criteria and visa requirements are dynamic and may change. WDOMS
            listing does not mean NMC approval, WHO approval, FAIMER approval or
            guaranteed Indian practice.
          </p>
        </div>
        <a
          href="#verification"
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#cf1731] px-4 py-2.5 text-sm font-extrabold text-white hover:bg-[#ad1027]"
        >
          Read verification note
          <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}

function UzbekistanUniversityRail({ labelledBy }: { labelledBy: string }) {
  return (
    <div
      aria-labelledby={labelledBy}
      className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {universities.map((university) => (
        <Link
          id={university.slug}
          key={university.slug}
          href={`/mbbs-abroad/uzbekistan/${university.slug}/`}
          className="group w-[82vw] shrink-0 scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#00A878]/45 hover:shadow-[0_16px_40px_rgba(8,45,67,0.12)] sm:w-[360px]"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="rounded-full bg-[#effbf7] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#00A878]">
              WDOMS Record
            </span>
            <Building2 size={18} className="shrink-0 text-[#0F4CFF]" />
          </div>

          <h3 className="mt-3 text-lg font-black leading-6 text-[#071f3f]">
            {university.name}
          </h3>

          <div className="mt-3 grid gap-2 text-xs font-semibold leading-5 text-slate-600">
            <p>📍 {university.city}</p>
            <p>🏛️ {university.type}</p>
            <p>💰 {university.feeRange}</p>
            <p>⏳ {university.duration}</p>
            <p>🗣️ {university.medium}</p>
          </div>

          <p className="mt-3 rounded-xl border border-blue-100 bg-[#f2f7ff] p-3 text-xs font-medium leading-6 text-slate-700">
            {university.description}
          </p>

          <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold leading-6 text-emerald-950">
            📊 {university.fmgeSummary}
          </p>

          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-semibold leading-6 text-amber-950">
            ⚠️ {university.caution}
          </p>

          <span className="mt-4 inline-flex items-center gap-2 text-xs font-black text-[#0F4CFF] group-hover:text-[#00A878]">
            Open university details
            <ArrowRight size={14} />
          </span>
        </Link>
      ))}
    </div>
  );
}

function UniversitiesSection() {
  return (
    <section
      id="universities"
      className="scroll-mt-24 px-4 pb-3 pt-4 sm:px-6 sm:pt-5 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-center">
          <h2
            id="uzbekistan-universities-heading"
            className="inline-flex max-w-full items-center justify-center gap-1.5 rounded-lg border border-[#00A878]/20 bg-white/90 px-2.5 py-2 text-center text-[13px] font-black leading-none tracking-normal text-[#071f3f] shadow-[0_10px_30px_rgba(8,45,67,0.08)] min-[360px]:text-sm min-[420px]:text-base sm:gap-2 sm:px-4 sm:py-3 sm:text-3xl sm:leading-tight lg:text-4xl"
          >
            <Building2 className="hidden h-4 w-4 shrink-0 text-[#00A878] min-[380px]:block sm:h-7 sm:w-7" />
            <span className="whitespace-nowrap">
              39 Medical Schools in Uzbekistan
            </span>
          </h2>
        </div>
        <p className="mx-auto mt-3 max-w-4xl text-center text-xs font-semibold leading-6 text-slate-600 sm:text-sm">
          These are WDOMS-search records for Uzbekistan shared for student
          comparison. Listing in WDOMS does not denote approval, recognition,
          accreditation or endorsement. Every record must be verified before
          admission.
        </p>
        <div className="mt-4">
          <UzbekistanUniversityRail labelledBy="uzbekistan-universities-heading" />
        </div>
      </div>
    </section>
  );
}

function WhyUzbekistanSection() {
  const toneStyles = {
    blue: "bg-[#f2f7ff] text-[#0F4CFF]",
    green: "bg-[#effbf7] text-[#00A878]",
    amber: "bg-[#fff8ec] text-[#e58a00]",
    purple: "bg-[#f7f3ff] text-[#7254d8]",
  };

  return (
    <section
      id="why-uzbekistan"
      className="scroll-mt-24 bg-white px-4 py-7 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Decision support"
          title="Why compare MBBS in Uzbekistan?"
          description="The Uzbekistan page supports a verification-led comparison of WDOMS records, fee guidance, English-medium route checks, clinical details, FMGE awareness and NMC/FMGL checkpoints."
          centered
        />
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-6">
          {whyUzbekistan.map(({ title, body, icon: Icon, tone }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-3.5 text-center shadow-sm sm:p-4"
            >
              <span
                className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${
                  toneStyles[tone]
                }`}
              >
                <Icon size={20} />
              </span>
              <h3 className="mt-3 text-xs font-black leading-5 text-[#071f3f] sm:text-sm">
                {title}
              </h3>
              <p className="mt-2 text-[10px] font-medium leading-5 text-slate-600 sm:text-xs sm:leading-6">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeeEligibilityDocuments() {
  return (
    <section className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-w-0 max-w-7xl gap-5 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
        <article
          id="fees"
          className="min-w-0 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-lg font-black text-[#071f3f]">
            Uzbekistan MBBS fees 2026: verify official invoice
          </h2>
          <p className="mt-2 text-xs font-medium leading-5 text-slate-600">
            Fees are not uniform across the 39 records. Actual tuition, hostel,
            mess, visa, insurance, documentation and payment schedule must be
            checked from official university documents.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[520px] border-collapse text-left text-xs">
              <thead className="bg-[#eef4fa] text-[#26394d]">
                <tr>
                  {["Stage", "Tuition", "Hostel & living", "Important note"].map(
                    (heading) => (
                      <th key={heading} className="px-3 py-3 font-black">
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {feeRows.map((row) => (
                  <tr key={row.year}>
                    <td className="px-3 py-3 font-bold">{row.year}</td>
                    <td className="px-3 py-3">{row.tuitionFee}</td>
                    <td className="px-3 py-3">{row.hostelAndLiving}</td>
                    <td className="px-3 py-3 font-bold text-[#00A878]">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-4 grid gap-2">
            {[
              "Fee range differs by university, city, hostel and exchange rate.",
              "Do not pay major fees without official invoice and receipt.",
              "Ask for full yearly payment schedule before admission.",
            ].map((note) => (
              <li
                key={note}
                className="flex items-start gap-2 text-xs font-semibold leading-5 text-slate-600"
              >
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-[#00A878]"
                />
                {note}
              </li>
            ))}
          </ul>
        </article>

        <article
          id="eligibility"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-lg font-black text-[#071f3f]">
            Eligibility criteria
          </h2>
          <ul className="mt-4 grid gap-3">
            {eligibilityItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-xs font-semibold leading-6 text-slate-700"
              >
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-[#00A878]"
                />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#verification"
            className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[#0F4CFF] hover:text-[#00A878]"
          >
            Check detailed eligibility
            <ArrowRight size={14} />
          </a>
        </article>

        <article
          id="documents"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-lg font-black text-[#071f3f]">
            Documents required
          </h2>
          <ul className="mt-4 grid gap-3">
            {documents.slice(0, 8).map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-xs font-semibold leading-6 text-slate-700"
              >
                <FileCheck2
                  size={17}
                  className="mt-0.5 shrink-0 text-[#0F4CFF]"
                />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#verification"
            className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[#0F4CFF] hover:text-[#00A878]"
          >
            View verification note
            <ArrowRight size={14} />
          </a>
        </article>
      </div>
    </section>
  );
}

function FmgeAndCounselling() {
  return (
    <section
      id="fmge"
      className="scroll-mt-24 px-4 pb-7 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[linear-gradient(110deg,#031b35,#063b70)] text-white shadow-[0_24px_70px_rgba(3,27,53,0.2)]">
        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {[
            [universities.length.toString(), "WDOMS records shown", Building2],
            ["8", "FMGE 2025 matched rows", Users],
            ["NMC/FMGL", "Compliance verification", ShieldCheck],
            ["6 years", "Typical medical course duration", GraduationCap],
            ["FMGE/NExT", "Indian practice pathway", Microscope],
          ].map(([value, label, Icon]) => {
            const IconComponent = Icon as typeof Building2;

            return (
              <div
                key={label as string}
                className="flex items-center gap-3 bg-[#052b54]/85 p-4"
              >
                <IconComponent
                  size={24}
                  className="shrink-0 text-[#51e6b3]"
                />
                <div>
                  <p className="text-xl font-black text-[#51e6b3]">
                    {value as string}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-blue-100">
                    {label as string}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#51e6b3]">
              Need a university comparison?
            </p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              Get Uzbekistan admission guidance from ILMALINK MEDIGO
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-blue-100">
              Compare all 39 records, fees, eligibility, documents, FMGE
              references, WDOMS, NMC/FMGL checkpoints, hostel terms and current
              university admission status before payment.
            </p>
          </div>
          <CtaButtons dark />
        </div>
      </div>
    </section>
  );
}

function VerificationAndFaq() {
  return (
    <section
      id="verification"
      className="scroll-mt-24 bg-white px-4 py-7 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00A878]">
            Verification disclaimer
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#071f3f]">
            Rules and criteria can change
          </h2>
          <p className="mt-4 text-sm font-medium leading-7 text-slate-700">
            {uzbekistanFinalDisclaimer}
          </p>
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-7 text-amber-950">
            Final admission depends on eligibility, documents, university
            approval, visa approval and applicable Uzbekistan and Indian
            regulations. Contact ILMALINK MEDIGO for current guidance before
            making a payment or travel commitment.
          </p>

          <h3 className="mt-5 text-sm font-black uppercase tracking-wide text-[#071f3f]">
            Popular Uzbekistan sections
          </h3>
          <div className="mt-3 grid gap-2">
            {[
              ["Compare all 39 Uzbekistan records", "#universities"],
              ["Check Uzbekistan MBBS fees", "#fees"],
              ["Verify eligibility and documents", "#eligibility"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-[#173452] transition hover:border-[#00A878] hover:text-[#00A878]"
              >
                {label}
                <ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </div>

        <div id="faq" className="scroll-mt-24">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00A878]">
            Top FAQ
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#071f3f]">
            MBBS in Uzbekistan questions
          </h2>
          <div className="mt-4 grid gap-3">
            {mainFaqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4"
              >
                <h3 className="text-sm font-black leading-6 text-[#071f3f]">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function UzbekistanPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] text-slate-950">
      <JsonLd data={buildJsonLd()} />
      <Navbar />
      <UzbekistanHero />
      <QuickNavigation />
      <UniversitiesSection />
      <AdmissionUpdate />
      <WhyUzbekistanSection />
      <FeeEligibilityDocuments />
      <FmgeAndCounselling />
      <VerificationAndFaq />
    </main>
  );
}