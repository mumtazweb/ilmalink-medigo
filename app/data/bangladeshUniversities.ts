export type BangladeshCollegeRecommendationLevel =
  | "Featured"
  | "Verify First";

export type BangladeshFeeRow = {
  label: string;
  amount: string;
  note?: string;
};

export type BangladeshPaymentRow = {
  stage: string;
  amount: string;
  due: string;
  note?: string;
};

export type BangladeshFmgePerformance = {
  sourceName: string;
  appeared: number | null;
  passed: number | null;
  passRate: string;
};

export type BangladeshCollegeProfile = {
  name: string;
  slug: string;
  image: string;
  imageAlt: string;
  city: string;
  location: string;
  program: string;
  intake: string;
  duration: string;
  ownership: string;
  universityAffiliation: string;
  website?: string;
  fees: string;
  feeHeadline: string;
  totalCourseFeeUsd?: number;
  totalCourseFeeLabel: string;
  hostelNote: string;
  summary: string;
  recommendationLevel: BangladeshCollegeRecommendationLevel;
  recommendationMessage: string;
  feeRows: BangladeshFeeRow[];
  paymentSchedule: BangladeshPaymentRow[];
  additionalFees: BangladeshFeeRow[];
  feeNotes: string[];
  eligibility: string[];
  documentChecklist: string[];
  highlights: string[];
  facts: { label: string; value: string }[];
  warnings: string[];
  fmge: BangladeshFmgePerformance;
  disclaimer: string;
  pageExists?: boolean;
};

export const bangladeshFinalDisclaimer =
  "Bangladesh MBBS eligibility, fees, route rules, DGME/BM&DC instructions, visa timelines, hostel terms, internship rules, refund rules, and college-specific payment schedules may change. Students must verify the latest official circulars, college-issued fee letter, eligibility certificate route, NEET qualification, WDOMS/NMC/FMGL compliance, and written payment instructions before admission or payment.";

export const bangladeshCountryStats = [
  { label: "Bangladesh FMGE 2025 appeared", value: "3,688" },
  { label: "Bangladesh FMGE 2025 passed", value: "1,222" },
  { label: "Bangladesh FMGE 2025 pass rate", value: "33.13%" },
  { label: "WDOMS-listed medical schools", value: "110" },
];

export const bangladeshEligibilityRequirements = [
  "NEET qualification is required for Indian citizens who want India-facing medical licensing eligibility after MBBS abroad.",
  "For the common private/non-government Bangladesh route, SSC/Class 10 average GPA should be at least 3.50 using the best five subjects.",
  "HSC/Class 12 Physics, Chemistry and Biology average GPA should be at least 3.50.",
  "Combined GPA should be at least 7.00 from SSC/Class 10 and HSC/Class 12 PCB calculation.",
  "Biology GP should be at least 3.50 wherever applicable under the current Bangladesh eligibility circular.",
  "English/pass-subject and passing-year conditions must be checked before processing admission.",
];

export const bangladeshGapRulePoints = [
  "Bangladesh route eligibility is passing-year sensitive; do not assume old academic-year eligibility without checking the latest circular.",
  "The HSC/Class 12 passing year should be checked against the SSC/Class 10 year and the current DGME/BM&DC rule for the admission session.",
  "No student should pay booking money if GPA, Biology GP, NEET status, or gap-year eligibility is doubtful.",
];

export const bangladeshDocumentChecklist = [
  "Class 10/SSC marksheet and certificate.",
  "Class 12/HSC marksheet and certificate with Physics, Chemistry and Biology.",
  "NEET scorecard / qualification proof for Indian students.",
  "Valid passport with required validity.",
  "Passport-size photographs.",
  "Eligibility certificate / equivalence / DGME/BM&DC route documents as applicable.",
  "Medical fitness, vaccination, visa and college-specific forms as requested.",
];

export const bangladeshFraudWarnings = [
  "Never use fake certificates, altered marksheets, forged NEET documents, or manipulated GPA papers.",
  "Do not rely on verbal promises about gap-rule bypass, quota conversion, or post-payment eligibility correction.",
  "Payments should be made only after receiving written fee schedule, payment recipient, refund rule and route responsibility details.",
];

export const bangladeshGovernmentQuotaPoints = [
  "Government medical college foreign quota is a separate and highly rule-bound route, not the same as private college admission.",
  "Eligibility, nomination, documentation, and seat allocation rules must be verified from the latest official Bangladesh-side circular.",
  "Most Indian counselling cases use private/non-government medical college comparison, where college-wise fee and eligibility verification is essential.",
];

export const bangladeshFaqs = [
  {
    question: "Is MBBS in Bangladesh valid for Indian students?",
    answer:
      "It can be valid only when the student satisfies current India-facing rules, including NEET qualification, NMC/FMGL conditions, WDOMS and recognition checks, internship/licence requirements, and the correct Bangladesh admission route.",
  },
  {
    question: "What is the main eligibility risk for Bangladesh MBBS?",
    answer:
      "The biggest risks are GPA calculation, Biology GP, passing-year/gap rule, NEET status, and route-specific DGME/BM&DC documentation. These should be checked before any payment.",
  },
  {
    question: "Are Bangladesh MBBS fees fixed for every student?",
    answer:
      "No. Fees vary by college, intake, hostel, food, university registration, internship terms, payment schedule, exchange rate and college-issued fee letter. Always use the latest written fee structure.",
  },
  {
    question: "Does FMGE data guarantee future results?",
    answer:
      "No. FMGE data is a comparison reference only. Future outcomes depend on the student, college academic quality, clinical exposure, exam preparation and future licensing rules.",
  },
];

const commonEligibility = bangladeshEligibilityRequirements;
const commonDocuments = bangladeshDocumentChecklist;
const commonWarning = [
  "Collect the latest college-issued fee letter before payment.",
  "Confirm DGME/BM&DC route, eligibility certificate requirement, visa timeline and refund terms in writing.",
  "Verify whether food, hostel, internship, university examination, registration, utility, VAT, books and travel are included or excluded.",
];

const fmgeNotAvailable: BangladeshFmgePerformance = {
  sourceName: "Not listed in provided Bangladesh FMGE 2025 entry",
  appeared: null,
  passed: null,
  passRate: "Not available",
};

export const bangladeshFeaturedUniversities: BangladeshCollegeProfile[] = [
  {
    name: "Anwer Khan Modern Medical College",
    slug: "anwer-khan-modern-medical-college",
    image:
      "/bangladesh/universities/anwer-khan-modern-medical-college.webp",
    imageAlt:
      "Students and faculty at Anwer Khan Modern Medical College in Dhaka",
    city: "Dhaka",
    location: "Dhanmondi, Dhaka, Bangladesh",
    program: "MBBS for international students",
    intake: "2026-2027",
    duration: "5 years + internship as applicable",
    ownership: "Private medical college",
    universityAffiliation: "University / regulatory affiliation to be verified from current college documents",
    website: "akmmc.edu.bd",
    fees: "US$45,000 course fee",
    feeHeadline: "AKMMC international student fee structure 2026-2027",
    totalCourseFeeUsd: 45000,
    totalCourseFeeLabel: "US$45,000",
    hostelNote: "Hostel, hostel security, clinical placement fee and food are outside the course fee.",
    summary:
      "Dhaka-based private medical college with a 2026-2027 international student fee structure showing US$45,000 course fee and separate hostel/food/clinical placement costs.",
    recommendationLevel: "Featured",
    recommendationMessage:
      "Featured for comparison because a current 2026-2027 fee letter and FMGE 2025 college reference are available. Verify all payment and eligibility details before admission.",
    feeRows: [
      { label: "1st installment", amount: "US$20,000", note: "During admission; non-refundable" },
      { label: "2nd installment", amount: "US$8,000", note: "August 2027; non-refundable" },
      { label: "3rd installment", amount: "US$7,000", note: "January 2028; non-refundable" },
      { label: "4th installment", amount: "US$5,000", note: "January 2029; non-refundable" },
      { label: "5th installment", amount: "US$5,000", note: "January 2030; non-refundable" },
      { label: "Grand total", amount: "US$45,000", note: "Course fee total" },
    ],
    paymentSchedule: [
      { stage: "During admission", amount: "US$20,000", due: "Admission time", note: "First installment" },
      { stage: "2nd installment", amount: "US$8,000", due: "August 2027" },
      { stage: "3rd installment", amount: "US$7,000", due: "January 2028" },
      { stage: "4th installment", amount: "US$5,000", due: "January 2029" },
      { stage: "5th installment", amount: "US$5,000", due: "January 2030" },
    ],
    additionalFees: [
      { label: "Non-AC hostel", amount: "BDT 7,000/month", note: "Excluding course fee" },
      { label: "AC hostel", amount: "BDT 12,000/month", note: "Excluding course fee" },
      { label: "Non-AC hostel security", amount: "BDT 30,000", note: "One-time, non-refundable" },
      { label: "AC hostel security", amount: "BDT 60,000", note: "One-time, non-refundable" },
      { label: "Clinical placement fee", amount: "BDT 50,000", note: "Additional to course fee; mentioned due date 30-11-2028" },
      { label: "Food cost", amount: "At actual cost", note: "Self/actual expense" },
      { label: "Late fine", amount: "US$20/day", note: "If course fee is not paid on schedule" },
    ],
    feeNotes: [
      "Students are asked to confirm eligibility by sending all academic documents before admission processing.",
      "The fee letter asks for US$10,000 advance tuition by TT/Swift for booking international student seat.",
      "A final confirmed admission letter is issued after total US$20,000 admission fee is received by the college.",
    ],
    eligibility: commonEligibility,
    documentChecklist: [
      "Eligibility certificate from Medical Council.",
      "Certified English-translated marks/grade sheet of qualifying examination.",
      "Certified copy of grade equivalence to marks by Boards/School.",
      "Copy of passport.",
      "Proof of NRI status of the student/parents/sponsor where applicable.",
      "Recent passport-size photographs.",
      "Nationality certificate.",
      "Resume with contact details of students and parents.",
    ],
    highlights: [
      "Dhaka location.",
      "Current 2026-2027 fee letter available.",
      "FMGE 2025 college-level record available.",
      "Separate hostel, clinical placement and food cost details shown.",
    ],
    facts: [
      { label: "City", value: "Dhaka" },
      { label: "Session", value: "2026-2027" },
      { label: "Course fee", value: "US$45,000" },
      { label: "FMGE 2025 pass rate", value: "51.72%" },
    ],
    warnings: commonWarning,
    fmge: {
      sourceName: "ANWER KHAN MODERN MEDICAL COLLEGE",
      appeared: 58,
      passed: 30,
      passRate: "51.72%",
    },
    disclaimer: bangladeshFinalDisclaimer,
    pageExists: true,
  },
  {
    name: "Green Life Medical College",
    slug: "green-life-medical-college",
    image: "/bangladesh/universities/green-life-medical-college.webp",
    imageAlt: "Green Life Medical College building in Dhaka",
    city: "Dhaka",
    location: "Green Road, Dhanmondi, Dhaka, Bangladesh",
    program: "MBBS Course",
    intake: "2026-2027",
    duration: "60 months + internship as applicable",
    ownership: "Private medical college",
    universityAffiliation: "University of Dhaka registration shown in fee letter",
    website: "greenlife.edu.bd",
    fees: "US$42,000 excluding food and accommodation",
    feeHeadline: "Green Life MBBS fee structure 2026-2027",
    totalCourseFeeUsd: 42000,
    totalCourseFeeLabel: "US$42,000",
    hostelNote: "Accommodation and food are excluded from the total fee.",
    summary:
      "Dhaka-based private medical college with a 2026-2027 fee letter showing US$42,000 total fee excluding food, accommodation and university professional examination fees.",
    recommendationLevel: "Featured",
    recommendationMessage:
      "Featured for comparison because a current fee letter and FMGE 2025 college-level reference are available. Verify hostel, food and examination costs separately.",
    feeRows: [
      { label: "Total fee", amount: "US$42,000", note: "Excluding food, accommodation and university professional examination fees" },
      { label: "Tuition & other academic fees", amount: "US$39,000" },
      { label: "Medical Council registration fee", amount: "US$1,000" },
      { label: "Ministry of Health & Family Welfare fee", amount: "US$1,000" },
      { label: "University of Dhaka registration fee", amount: "US$1,000" },
    ],
    paymentSchedule: [
      { stage: "First installment", amount: "US$20,000", due: "During admission" },
      { stage: "2nd installment", amount: "US$6,000", due: "April 30, 2028" },
      { stage: "3rd installment", amount: "US$6,000", due: "April 30, 2029" },
      { stage: "4th installment", amount: "US$6,000", due: "April 30, 2030" },
      { stage: "Final installment", amount: "US$4,000", due: "April 30, 2031" },
    ],
    additionalFees: [
      { label: "Accommodation", amount: "BDT 8,000/month", note: "Twin-sharing room; payable only if staying in college hostel" },
      { label: "Food cost", amount: "Approx. BDT 4,000/month" },
      { label: "Internship fee", amount: "US$2,000", note: "Payable during admission only if the student wants internship with monthly allowance" },
      { label: "After 60 months tuition", amount: "US$100/month", note: "If student fails to complete within 60 months until passing final professional examination" },
    ],
    feeNotes: [
      "All fees are mentioned as non-refundable in the uploaded fee letter.",
      "The total fee excludes accommodation, food and university professional examination fees.",
      "Any alteration by Ministry of Health and Family Welfare, Dhaka University or BM&DC will be applicable.",
    ],
    eligibility: commonEligibility,
    documentChecklist: commonDocuments,
    highlights: [
      "Dhaka / Dhanmondi location.",
      "Current 2026-2027 fee letter available.",
      "Total fee breakdown is clearly listed.",
      "FMGE 2025 college-level record available.",
    ],
    facts: [
      { label: "City", value: "Dhaka" },
      { label: "Session", value: "2026-2027" },
      { label: "Total fee", value: "US$42,000" },
      { label: "FMGE 2025 pass rate", value: "26.47%" },
    ],
    warnings: commonWarning,
    fmge: {
      sourceName: "GREEN LIFE MEDICAL COLLEGE AND HOSPITAL",
      appeared: 34,
      passed: 9,
      passRate: "26.47%",
    },
    disclaimer: bangladeshFinalDisclaimer,
    pageExists: true,
  },
  {
    name: "Jahurul Islam Medical College",
    slug: "jahurul-islam-medical-college",
    image:
      "/bangladesh/universities/jahurul-islam-medical-college.webp",
    imageAlt:
      "Jahurul Islam Medical College and Hospital campus in Bhagalpur, Bajitpur",
    city: "Bajitpur, Kishoreganj",
    location: "Bhagalpur, Bajitpur, Kishoreganj, Bangladesh",
    program: "MBBS for international students",
    intake: "2025-2026 (J-35)",
    duration: "5-year MBBS + compulsory internship as applicable",
    ownership: "Private medical college",
    universityAffiliation:
      "University of Dhaka; BM&DC approval shown by the college (verify current session)",
    website: "jimedcol.org",
    fees: "US$42,000 total for foreign students (2025-2026)",
    feeHeadline:
      "Official foreign-student fee structure for session 2025-2026",
    totalCourseFeeUsd: 42000,
    totalCourseFeeLabel: "US$42,000",
    hostelNote:
      "The listed total includes hostel seat rent; food and authority charges are separate.",
    summary:
      "Residential private medical college established in 1992 at Bhagalpur, Bajitpur, with a self-contained campus and a teaching hospital that the college describes as having more than 500 beds.",
    recommendationLevel: "Featured",
    recommendationMessage:
      "Featured because the college publishes a foreign-student fee structure and detailed campus information. Verify the latest session, eligibility circular, payment account and all additional charges before admission.",
    feeRows: [
      {
        label: "Admission fee",
        amount: "US$8,000",
        note: "Official 2025-2026 foreign-student fee structure",
      },
      { label: "Other fees", amount: "US$2,000" },
      { label: "Student welfare fee", amount: "US$2,000" },
      { label: "Session fee", amount: "US$900" },
      { label: "First-year tuition fee", amount: "US$4,200" },
      { label: "Hostel seat rent", amount: "US$500" },
      { label: "University registration fee", amount: "US$2,000" },
      {
        label: "Second- to fifth-year tuition",
        amount: "US$22,400",
        note: "US$5,600 per year for four years",
      },
      { label: "Grand total", amount: "US$42,000" },
    ],
    paymentSchedule: [
      {
        stage: "Admission / first year",
        amount: "US$19,600",
        due: "At admission",
        note: "Admission and first-year listed charges",
      },
      {
        stage: "Second year",
        amount: "US$5,600",
        due: "By 30 January of the second academic year",
      },
      {
        stage: "Third year",
        amount: "US$5,600",
        due: "By 30 January of the third academic year",
      },
      {
        stage: "Fourth year",
        amount: "US$5,600",
        due: "By 30 January of the fourth academic year",
      },
      {
        stage: "Fifth year",
        amount: "US$5,600",
        due: "By 30 January of the fifth academic year",
      },
    ],
    additionalFees: [
      {
        label: "Food",
        amount: "At actual cost",
        note: "Not included in the listed grand total",
      },
      {
        label: "University / examination / authority charges",
        amount: "At actual cost",
        note: "Payable when applicable",
      },
      {
        label: "Visa extension and related processing",
        amount: "At actual cost",
      },
      {
        label: "VAT or government charges",
        amount: "As applicable",
      },
    ],
    feeNotes: [
      "The published fee structure is for the 2025-2026 session and should not be assumed unchanged for a later intake.",
      "The college states that deposited fees are non-refundable.",
      "Obtain the latest signed fee letter and verified college bank details before transfer.",
    ],
    eligibility: [
      "NEET qualification is required for Indian students seeking India-facing medical licensing eligibility.",
      "Verify the latest DGME/BM&DC and University of Dhaka eligibility circular for the admission session.",
      "The college's 2025-2026 foreign-admission page states a combined SSC/HSC GPA requirement of 8.00 and a passing-year restriction; obtain written confirmation before payment.",
      "Confirm Biology, PCB, English, equivalence and gap-year requirements against the current official circular.",
    ],
    documentChecklist: commonDocuments,
    highlights: [
      "Established in 1992 under the Aftab Rahima Welfare Trust.",
      "Self-contained residential campus with separate student hostels, laboratories, library, museums, dissection hall and lecture theatres.",
      "Teaching hospital described by the college as having more than 500 beds.",
      "Located at Bhagalpur, about 110 km northeast of Dhaka.",
    ],
    facts: [
      { label: "Established", value: "1992" },
      { label: "Affiliation", value: "University of Dhaka" },
      { label: "Location", value: "Bajitpur, Kishoreganj" },
      { label: "Hospital", value: "More than 500 beds" },
    ],
    warnings: [
      ...commonWarning,
      "Confirm that the published 2025-2026 fee structure remains applicable to the student's actual intake.",
    ],
    fmge: fmgeNotAvailable,
    disclaimer: bangladeshFinalDisclaimer,
    pageExists: true,
  },
  {
    name: "Tairunnessa Memorial Medical College & Hospital",
    slug: "tairunnessa-memorial-medical-college",
    image:
      "/bangladesh/universities/tairunnessa-memorial-medical-college.webp",
    imageAlt:
      "Tairunnessa Memorial Medical College campus building in Gazipur",
    city: "Gazipur",
    location: "Konia, Board Bazar, Gazipur, Bangladesh",
    program: "MBBS",
    intake: "2026-2027 Batch TM-24",
    duration: "6 years: 5-year course + 1-year compulsory internship training",
    ownership: "Private medical college",
    universityAffiliation: "Affiliation / registration route to be verified from current college documents",
    website: "tmmch.com",
    fees: "US$42,000 without internship fee",
    feeHeadline: "Tairunnessa Memorial MBBS fee structure 2026-2027",
    totalCourseFeeUsd: 42000,
    totalCourseFeeLabel: "US$42,000 without internship fee",
    hostelNote: "Non-AC hostel accommodation and utility are shown as included; AC utility is extra.",
    summary:
      "Gazipur-based private medical college with a 2026-2027 fee structure showing US$42,000 total without internship fee and a clear installment schedule.",
    recommendationLevel: "Featured",
    recommendationMessage:
      "Featured for comparison because a current fee letter and FMGE 2025 college-level reference are available. Verify included/excluded costs and internship fee option before payment.",
    feeRows: [
      { label: "Grand total", amount: "US$42,000", note: "Without internship fee" },
      { label: "Seat reservation", amount: "US$4,000", note: "Non-refundable" },
      { label: "At admission", amount: "US$8,000", note: "Non-refundable" },
      { label: "Internship fee", amount: "US$2,000", note: "Optional; for intern allowance eligibility" },
    ],
    paymentSchedule: [
      { stage: "Seat reservation + admission", amount: "US$12,000", due: "At reservation/admission" },
      { stage: "1st year", amount: "US$4,500", due: "7 April 2027" },
      { stage: "1st year", amount: "US$4,500", due: "7 October 2027" },
      { stage: "2nd year", amount: "US$4,500", due: "7 April 2028" },
      { stage: "2nd year", amount: "US$4,500", due: "7 October 2028" },
      { stage: "3rd year", amount: "US$4,500", due: "7 April 2029" },
      { stage: "3rd year", amount: "US$4,500", due: "7 October 2029" },
      { stage: "4th year", amount: "US$3,000", due: "7 April 2030" },
    ],
    additionalFees: [
      { label: "Internship fee", amount: "US$2,000", note: "Optional; if paid, student becomes applicable for intern allowance as per fee note" },
      { label: "AC hostel utility", amount: "US$55/month", note: "For AC hostel accommodation and utility fees" },
      { label: "Excluded expenses", amount: "At actual cost", note: "Food, examination fee, books, study materials and travel fee" },
    ],
    feeNotes: [
      "The fee letter says admission fee, tuition fee, session fee, registration fee, non-AC hostel accommodation and utility fee, hostel security fee, laboratory fee and clinical fee are included.",
      "Food, examination fee, books, study materials and travel fee are excluded.",
      "The fee document marks payments as non-refundable.",
    ],
    eligibility: commonEligibility,
    documentChecklist: commonDocuments,
    highlights: [
      "Gazipur location near Dhaka.",
      "Current 2026-2027 fee letter available.",
      "Installment schedule is clearly listed.",
      "FMGE 2025 college-level record available.",
    ],
    facts: [
      { label: "City", value: "Gazipur" },
      { label: "Session", value: "2026-2027" },
      { label: "Total fee", value: "US$42,000" },
      { label: "FMGE 2025 pass rate", value: "32.42%" },
    ],
    warnings: commonWarning,
    fmge: {
      sourceName: "TAIRUNNESSA MEMORIAL MEDICAL COLLEGE AND HOSPITAL",
      appeared: 182,
      passed: 59,
      passRate: "32.42%",
    },
    disclaimer: bangladeshFinalDisclaimer,
    pageExists: true,
  },
  {
    name: "Sylhet Women's Medical College",
    slug: "sylhet-womens-medical-college",
    image: "/bangladesh/universities/sylhet-womens-medical-college.webp",
    imageAlt: "Sylhet Women's Medical College campus building in Sylhet",
    city: "Sylhet",
    location: "Mirboxtula, Sylhet, Bangladesh",
    program: "MBBS for overseas students",
    intake: "2026-2027",
    duration: "5 years academic period + internship as applicable",
    ownership: "Private medical college",
    universityAffiliation: "Affiliation / registration route to be verified from current college documents",
    website: "swmc.edu.bd",
    fees: "US$42,000 excluding food and internship fee",
    feeHeadline: "SWMC financial information for overseas students 2026-2027",
    totalCourseFeeUsd: 42000,
    totalCourseFeeLabel: "US$42,000",
    hostelNote: "Hostel rent is included in the listed total; food and internship fee are not included.",
    summary:
      "Sylhet-based private women's medical college with a 2026-2027 overseas student fee letter showing US$42,000 grand total excluding food and internship fee.",
    recommendationLevel: "Featured",
    recommendationMessage:
      "Featured for comparison because a current fee letter and FMGE 2025 college-level reference are available. Verify women-only admission context and all fee exclusions before payment.",
    feeRows: [
      { label: "One-time development fee", amount: "US$12,000" },
      { label: "Admission fee", amount: "US$4,300" },
      { label: "Tuition fee", amount: "US$21,000", note: "US$350 x 60 months" },
      { label: "Hostel establishment fee", amount: "US$700" },
      { label: "Hostel rent", amount: "US$3,900", note: "US$65 x 60 months" },
      { label: "Other fees", amount: "US$100" },
      { label: "Grand total", amount: "US$42,000" },
    ],
    paymentSchedule: [
      { stage: "Booking money", amount: "US$5,000", due: "Before admission" },
      { stage: "At admission", amount: "US$10,000", due: "Admission time" },
      { stage: "Within six months", amount: "US$6,350", due: "Within six months of admission" },
      { stage: "Remaining amount", amount: "US$20,650", due: "7 equal installments of US$2,950 after 6-month interval" },
    ],
    additionalFees: [
      { label: "Internship fee", amount: "US$2,000", note: "Not included in above fees" },
      { label: "Food and personal expenses", amount: "Not included" },
      { label: "If course exceeds 5 years", amount: "US$350/month tuition + US$65/month hostel" },
    ],
    feeNotes: [
      "Food and other personal expenses are not included.",
      "Intern fee of US$2,000 is not included and hostel rent during internship has to be paid as usual.",
      "Failed students needing more than 5 years must pay tuition and hostel fees monthly as stated in the fee letter.",
    ],
    eligibility: commonEligibility,
    documentChecklist: commonDocuments,
    highlights: [
      "Women's medical college in Sylhet.",
      "Current 2026-2027 overseas student financial information available.",
      "FMGE 2025 college-level record available.",
      "Fee breakup clearly includes tuition and hostel rent components.",
    ],
    facts: [
      { label: "City", value: "Sylhet" },
      { label: "Session", value: "2026-2027" },
      { label: "Grand total", value: "US$42,000" },
      { label: "FMGE 2025 pass rate", value: "45.45%" },
    ],
    warnings: commonWarning,
    fmge: {
      sourceName: "SYLHET WOMEN S MEDICAL COLLEGE AND HOSPITAL",
      appeared: 66,
      passed: 30,
      passRate: "45.45%",
    },
    disclaimer: bangladeshFinalDisclaimer,
    pageExists: true,
  },
  {
    name: "Ad-din Akij Medical College",
    slug: "ad-din-akij-medical-college",
    image: "/bangladesh/universities/ad-din-akij-medical-college.webp",
    imageAlt: "Ad-din Akij Medical College campus building in Khulna",
    city: "Khulna",
    location: "Khulna, Bangladesh",
    program: "Five-Year MBBS Program",
    intake: "2026-2027",
    duration: "5 years + internship as applicable",
    ownership: "Private medical college / Ad-din Foundation",
    universityAffiliation: "Khulna Medical University registration fee mentioned in fee letter",
    website: "ad-din.org",
    fees: "US$33,500 course fee + food/utility/internship extras",
    feeHeadline: "Ad-din Akij foreign students' course fee structure 2026-2027",
    totalCourseFeeUsd: 33500,
    totalCourseFeeLabel: "US$33,500",
    hostelNote: "Course fee includes hostel fee; food, utility, hostel security and internship fee are separate.",
    summary:
      "Khulna-based Ad-din Foundation medical college with a 2026-2027 foreign student course fee of US$33,500 plus monthly food and utility charges.",
    recommendationLevel: "Verify First",
    recommendationMessage:
      "Useful for fee comparison because a current fee letter is available. FMGE college-level entry was not separately found in the provided Bangladesh FMGE 2025 list, so verify outcome data separately.",
    feeRows: [
      { label: "Total course fee", amount: "US$33,500", note: "Includes admission, tuition, session and hostel fees" },
      { label: "Food charge", amount: "US$50/month" },
      { label: "Utility bill", amount: "US$25/month", note: "Electric, water, service charge etc." },
      { label: "Hostel security", amount: "US$120", note: "Non-refundable" },
      { label: "Internship fee", amount: "US$2,000", note: "Payable at admission; refundable in monthly installments over 12-month internship period" },
    ],
    paymentSchedule: [
      { stage: "Booking money", amount: "US$5,500", due: "Before admission", note: "Non-refundable" },
      { stage: "At admission", amount: "US$8,000", due: "Admission time", note: "Non-refundable" },
      { stage: "Remaining course fee", amount: "US$20,000", due: "4 installments of US$5,000 on 15 January 2028, 2029, 2030 and 2031" },
    ],
    additionalFees: [
      { label: "Food", amount: "US$50/month" },
      { label: "Utility", amount: "US$25/month" },
      { label: "Hostel security", amount: "US$120" },
      { label: "BM&DC / Khulna Medical University registration", amount: "As decided by authority" },
      { label: "VAT", amount: "As applicable" },
      { label: "Late fine", amount: "US$10/day", note: "Up to maximum 60 days" },
      { label: "Re-admission fee", amount: "US$100", note: "If applicable after cancellation" },
    ],
    feeNotes: [
      "All deposited money is stated as non-refundable.",
      "Only students and parents are permitted to make payments directly through bank; payments from agents are not allowed.",
      "The contract is stated as valid for 60 months from date of admission.",
    ],
    eligibility: commonEligibility,
    documentChecklist: commonDocuments,
    highlights: [
      "Khulna location.",
      "Ad-din Foundation fee letter available for 2026-2027.",
      "Lower listed course fee than several Dhaka options, but monthly extras apply.",
      "Direct bank-payment warning is included in the fee letter.",
    ],
    facts: [
      { label: "City", value: "Khulna" },
      { label: "Session", value: "2026-2027" },
      { label: "Course fee", value: "US$33,500" },
      { label: "FMGE 2025", value: "Not separately listed in provided entry" },
    ],
    warnings: commonWarning,
    fmge: fmgeNotAvailable,
    disclaimer: bangladeshFinalDisclaimer,
    pageExists: true,
  },
  {
    name: "Ad-din Momin Medical College",
    slug: "ad-din-momin-medical-college",
    image: "/bangladesh/universities/ad-din-momin-medical-college.webp",
    imageAlt: "Ad-din Momin Medical College campus building in Dhaka",
    city: "Dhaka",
    location: "Keraniaboutganj, Dhaka, Bangladesh",
    program: "Five-Year MBBS Program",
    intake: "2026-2027",
    duration: "5 years + internship as applicable",
    ownership: "Private medical college / Ad-din Foundation",
    universityAffiliation: "University of Dhaka registration fee mentioned in fee letter",
    website: "ad-din.org",
    fees: "US$35,500 course fee + food/utility/internship extras",
    feeHeadline: "Ad-din Momin foreign students' course fee structure 2026-2027",
    totalCourseFeeUsd: 35500,
    totalCourseFeeLabel: "US$35,500",
    hostelNote: "Course fee includes hostel fee; food is not included and utility/electricity/security are separate.",
    summary:
      "Keraniganj, Dhaka-based Ad-din Foundation medical college with a 2026-2027 foreign student course fee of US$35,500 and separate food, utility and internship terms.",
    recommendationLevel: "Verify First",
    recommendationMessage:
      "Useful for fee comparison because a current fee letter is available. FMGE college-level entry was not separately found in the provided Bangladesh FMGE 2025 list, so verify outcome data separately.",
    feeRows: [
      { label: "Total course fee", amount: "US$35,500", note: "Includes admission, tuition, session and hostel fees" },
      { label: "Food charge", amount: "Not included", note: "Student-managed hostel dining under supervision" },
      { label: "Utility bill", amount: "US$30/month" },
      { label: "AC electricity", amount: "At actual consumption" },
      { label: "Hostel security", amount: "US$150", note: "Non-refundable" },
      { label: "Internship fee", amount: "US$2,000", note: "Payable at admission; refundable in monthly installments over 12-month internship period" },
    ],
    paymentSchedule: [
      { stage: "Booking money", amount: "US$8,500", due: "Before admission", note: "Non-refundable" },
      { stage: "At admission", amount: "US$10,000", due: "Admission time", note: "Non-refundable" },
      { stage: "Remaining course fee", amount: "US$17,000", due: "4 installments of US$4,250 on 15 January 2028, 2029, 2030 and 2031" },
    ],
    additionalFees: [
      { label: "Food", amount: "Self / not included" },
      { label: "Utility", amount: "US$30/month" },
      { label: "AC electricity", amount: "Actual consumption" },
      { label: "Hostel security", amount: "US$150" },
      { label: "BM&DC / University of Dhaka registration", amount: "As decided by authority" },
      { label: "VAT", amount: "As applicable" },
      { label: "Late fine", amount: "US$10/day", note: "Up to maximum 60 days" },
    ],
    feeNotes: [
      "All deposited money is stated as non-refundable.",
      "Only students and parents are permitted to make payments directly through bank; payments from agents are not allowed.",
      "The contract is stated as valid for 60 months from date of admission.",
    ],
    eligibility: commonEligibility,
    documentChecklist: commonDocuments,
    highlights: [
      "Keraniganj, Dhaka location.",
      "Ad-din Foundation fee letter available for 2026-2027.",
      "Food is explicitly outside the course fee.",
      "Direct bank-payment warning is included in the fee letter.",
    ],
    facts: [
      { label: "City", value: "Dhaka" },
      { label: "Session", value: "2026-2027" },
      { label: "Course fee", value: "US$35,500" },
      { label: "FMGE 2025", value: "Not separately listed in provided entry" },
    ],
    warnings: commonWarning,
    fmge: fmgeNotAvailable,
    disclaimer: bangladeshFinalDisclaimer,
    pageExists: true,
  },
  {
    name: "Ad-din Sakina Women's Medical College",
    slug: "ad-din-sakina-womens-medical-college",
    image:
      "/bangladesh/universities/ad-din-sakina-womens-medical-college.webp",
    imageAlt:
      "Ad-din Sakina Women's Medical College campus building in Jashore",
    city: "Jashore",
    location: "Pulerhat, Jashore, Bangladesh",
    program: "Five-Year MBBS Program",
    intake: "2026-2027",
    duration: "5 years + internship as applicable",
    ownership: "Private women's medical college / Ad-din Foundation",
    universityAffiliation: "Khulna Medical University registration fee mentioned in fee letter",
    website: "ad-din.org",
    fees: "US$33,500 course fee + accommodation/food/internship extras",
    feeHeadline: "Ad-din Sakina foreign students' course fee structure 2026-2027",
    totalCourseFeeUsd: 33500,
    totalCourseFeeLabel: "US$33,500",
    hostelNote: "Accommodation and food charges are separate monthly charges.",
    summary:
      "Jashore-based Ad-din Foundation women's medical college with a 2026-2027 foreign student course fee of US$33,500 and separate accommodation/food monthly charges.",
    recommendationLevel: "Featured",
    recommendationMessage:
      "Featured for comparison because a current fee letter and FMGE 2025 college-level reference are available. Verify women-only route, monthly accommodation and eligibility before payment.",
    feeRows: [
      { label: "Total course fee", amount: "US$33,500", note: "Includes admission, tuition and session fees" },
      { label: "Premium room accommodation + food", amount: "US$150/month" },
      { label: "AC double/4-bed room accommodation + food", amount: "US$140/month" },
      { label: "Non-AC room accommodation + food", amount: "US$120/month" },
      { label: "Non-AC utility bill", amount: "US$20/month" },
      { label: "Hostel security", amount: "US$120", note: "Non-refundable" },
      { label: "Internship fee", amount: "US$2,000", note: "Payable at admission; refundable in monthly installments over 12-month internship period" },
    ],
    paymentSchedule: [
      { stage: "Booking money", amount: "US$5,500", due: "Before admission", note: "Non-refundable" },
      { stage: "At admission", amount: "US$8,000", due: "Admission time", note: "Non-refundable" },
      { stage: "Remaining course fee", amount: "US$20,000", due: "4 installments of US$5,000 on 15 January 2028, 2029, 2030 and 2031" },
    ],
    additionalFees: [
      { label: "Premium room", amount: "US$150/month" },
      { label: "AC double/4-bed room", amount: "US$140/month" },
      { label: "Non-AC room", amount: "US$120/month" },
      { label: "Non-AC utility", amount: "US$20/month" },
      { label: "AC electricity", amount: "Actual consumption" },
      { label: "Hostel security", amount: "US$120" },
      { label: "BM&DC / Khulna Medical University registration", amount: "As decided by authority" },
      { label: "VAT", amount: "As applicable" },
    ],
    feeNotes: [
      "All deposited money is stated as non-refundable.",
      "Accommodation and food are monthly charges separate from the course fee.",
      "Only students and parents are permitted to make payments directly through bank; payments from agents are not allowed.",
    ],
    eligibility: commonEligibility,
    documentChecklist: commonDocuments,
    highlights: [
      "Women's medical college in Jashore.",
      "Ad-din Foundation fee letter available for 2026-2027.",
      "FMGE 2025 college-level record available.",
      "Separate accommodation and food options are listed.",
    ],
    facts: [
      { label: "City", value: "Jashore" },
      { label: "Session", value: "2026-2027" },
      { label: "Course fee", value: "US$33,500" },
      { label: "FMGE 2025 pass rate", value: "33.33%" },
    ],
    warnings: commonWarning,
    fmge: {
      sourceName: "AD DIN SAKINA MEDICAL COLLEGE",
      appeared: 30,
      passed: 10,
      passRate: "33.33%",
    },
    disclaimer: bangladeshFinalDisclaimer,
    pageExists: true,
  },
];

const bangladeshCollegeCardPriority = [
  "green-life-medical-college",
  "jahurul-islam-medical-college",
] as const;

export const bangladeshUniversityDirectory = bangladeshFeaturedUniversities
  .filter(
    (college, index, list) =>
      college.pageExists !== false &&
      list.findIndex((item) => item.slug === college.slug) === index,
  )
  .sort((left, right) => {
    const leftPriority = bangladeshCollegeCardPriority.indexOf(
      left.slug as (typeof bangladeshCollegeCardPriority)[number],
    );
    const rightPriority = bangladeshCollegeCardPriority.indexOf(
      right.slug as (typeof bangladeshCollegeCardPriority)[number],
    );

    if (leftPriority === -1 && rightPriority === -1) return 0;
    if (leftPriority === -1) return 1;
    if (rightPriority === -1) return -1;
    return leftPriority - rightPriority;
  });

export const bangladeshHighlightedFeeRows = bangladeshUniversityDirectory
  .slice(0, 4)
  .map((college) => ({
    year: college.name,
    semester: "Total estimate",
    tuition: college.totalCourseFeeLabel,
    hostel: college.hostelNote,
    total: college.fees,
  }));

export function getBangladeshUniversityBySlug(slug: string) {
  return bangladeshUniversityDirectory.find((college) => college.slug === slug);
}
