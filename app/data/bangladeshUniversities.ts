export type BangladeshFmgePerformance = {
  sourceName: string;
  appeared: number;
  passed: number;
  passRate: string;
};

export type BangladeshUniversityCardData = {
  name: string;
  city: string;
  fees: string;
  summary: string;
  fmge: BangladeshFmgePerformance;
};

export const bangladeshCountryStats = [
  { label: "Bangladesh FMGE 2025 appeared", value: "3,688" },
  { label: "Bangladesh FMGE 2025 pass rate", value: "33.13%" },
  { label: "Featured private medical colleges", value: "6" },
  { label: "Private-route minimum combined GPA", value: "7.00" },
  { label: "Biology minimum GP", value: "3.50" },
  { label: "Typical 12/HSC passing years", value: "2024 / 2025" },
];

export const bangladeshFinalDisclaimer =
  "Bangladesh MBBS admission criteria, DGME and BM&DC rules, equivalence guidance, foreign quota conditions, fee structures, hostel terms, visa timelines, and India-facing NMC/FMGL rules may change. Students must verify the latest official route before paying booking money, processing charges, or university fees.";

export const bangladeshFeaturedUniversities: BangladeshUniversityCardData[] = [
  {
    name: "Dhaka National Medical College and Hospital",
    city: "Dhaka",
    fees: "₹25–40 Lakhs Total",
    summary:
      "Popular Dhaka option often compared for clinical exposure, city access, and Indian-student familiarity.",
    fmge: {
      sourceName: "DHAKA NATIONAL MEDICAL COLLEGE AND HOSPITAL",
      appeared: 153,
      passed: 73,
      passRate: "47.71%",
    },
  },
  {
    name: "Tairunnessa Memorial Medical College and Hospital",
    city: "Gazipur",
    fees: "₹28–40 Lakhs Total",
    summary:
      "Frequently shortlisted by students comparing private Bangladesh MBBS options with lower total fee pressure.",
    fmge: {
      sourceName: "TAIRUNNESSA MEMORIAL MEDICAL COLLEGE AND HOSPITAL",
      appeared: 182,
      passed: 59,
      passRate: "32.42%",
    },
  },
  {
    name: "Holy Family Red Crescent Medical College",
    city: "Dhaka",
    fees: "₹35–45 Lakhs Total",
    summary:
      "Recognized Dhaka-based option often checked for hospital-linked training and English-medium delivery.",
    fmge: {
      sourceName: "HOLY FAMILY RED CRESCENT MEDICAL COLLEGE",
      appeared: 65,
      passed: 28,
      passRate: "43.08%",
    },
  },
  {
    name: "Jahurul Islam Medical College and Hospital",
    city: "Kishoreganj",
    fees: "₹30–40 Lakhs Total",
    summary:
      "Students often compare this college for campus environment, fee range, and FMGE pass-rate reference.",
    fmge: {
      sourceName: "JAHURUL ISLAM MEDICAL COLLEGE AND HOSPITAL",
      appeared: 61,
      passed: 35,
      passRate: "57.38%",
    },
  },
  {
    name: "Anwer Khan Modern Medical College",
    city: "Dhaka",
    fees: "₹30–45 Lakhs Total",
    summary:
      "Commonly compared by students seeking a central Dhaka private-college route with visible FMGE data.",
    fmge: {
      sourceName: "ANWER KHAN MODERN MEDICAL COLLEGE",
      appeared: 58,
      passed: 30,
      passRate: "51.72%",
    },
  },
  {
    name: "Green Life Medical College and Hospital",
    city: "Dhaka",
    fees: "₹35–45 Lakhs Total",
    summary:
      "Often checked for metro location, private-college fee range, and current verification requirements.",
    fmge: {
      sourceName: "GREEN LIFE MEDICAL COLLEGE AND HOSPITAL",
      appeared: 34,
      passed: 9,
      passRate: "26.47%",
    },
  },
];

export const bangladeshWhyCountry = [
  {
    title: "Indian curriculum similarity",
    body:
      "Bangladesh MBBS remains popular because many students find the teaching pattern and syllabus flow closer to the Indian medical education model.",
  },
  {
    title: "SAARC fee advantage",
    body:
      "Indian students often compare Bangladesh because SAARC-category fee structures can be lower than many other foreign private MBBS routes.",
  },
  {
    title: "English-medium pathways",
    body:
      "Selected colleges market English-medium instruction, but students should verify lecture, exam, ward, and clinical-language conditions before admission.",
  },
  {
    title: "Hospital-linked private colleges",
    body:
      "Students can compare hospitals, city access, hostel conditions, and real clinical exposure across Dhaka and non-Dhaka private medical colleges.",
  },
  {
    title: "Country-wise FMGE references",
    body:
      "Bangladesh has visible country-level and college-level FMGE 2025 data that can be used as one comparison input, not a guarantee.",
  },
  {
    title: "Verification-first admission",
    body:
      "Students must verify DGME, BM&DC, equivalence, gap-year, fee, refund, and India-facing NMC/FMGL checkpoints before paying.",
  },
] as const;

export const bangladeshEligibilityRequirements = [
  "Private/non-government route is the main Bangladesh MBBS pathway for most Indian students.",
  "Minimum aggregate GPA 7.00 in Class 10/SSC/O-Level equivalent plus Class 12/HSC/A-Level equivalent.",
  "Minimum Biology GP 3.50 at Class 12/HSC/A-Level equivalent.",
  "GPA below 3.50 in a single exam is generally not considered for the private route.",
  "English should be passed in both Class 10 and Class 12 equivalents.",
  "Indian students must qualify NEET-UG as per India-facing NMC/FMGL requirements.",
];

export const bangladeshDocumentChecklist = [
  "Class 10 / SSC / O-Level marksheets for top-five GPA calculation where applicable.",
  "Class 12 / HSC / A-Level Physics, Chemistry and Biology marksheets.",
  "NEET qualification proof for Indian-student admission planning.",
  "Passport, recent photographs, medical fitness documents and basic ID papers.",
  "Equivalence or supporting academic documents required by DGME/BM&DC or the college route.",
  "Signed fee, hostel, refund, and admission-processing documents before transfer.",
];

export const bangladeshGapRulePoints = [
  "Bangladesh private-route admission follows a strict passing-year rule and should be checked before any payment.",
  "For the 2025–26 private/non-government foreign-student route, Class 10 / SSC / O-Level equivalent should not be before 2022.",
  "Class 12 / HSC / A-Level equivalent should be 2024 or 2025 unless a fresh official circular says otherwise.",
  "Students with more than one year gap after Class 12 are generally not eligible or are high-risk for Bangladesh private admission.",
];

export const bangladeshFraudWarnings = [
  "Do not use fake, altered, or managed Class 10/Class 12 certificates, marksheets, or equivalence papers.",
  "Old-passout or gap-rule cases should never proceed on verbal promises of managed eligibility.",
  "Fake documents can lead to admission rejection, visa problems, BM&DC registration issues, licensing problems, and legal consequences.",
];

export const bangladeshGovernmentQuotaPoints = [
  "Government medical college foreign quota is separate, limited, and stricter than the private/non-government route.",
  "For 2025–26, the government foreign quota used higher GPA thresholds including aggregate GPA 8.50.",
  "Students must not confuse the government quota with mainstream private-college admission guidance.",
];

export const bangladeshFaqs = [
  {
    question: "Is MBBS in Bangladesh valid in India?",
    answer:
      "Bangladesh can fit Indian-student planning when the university, course duration, internship, English-medium delivery, local recognition, and current NMC/FMGL conditions are verified before admission.",
  },
  {
    question: "Is NEET compulsory for MBBS in Bangladesh?",
    answer:
      "Yes. Indian students should qualify NEET-UG before taking Bangladesh MBBS admission if they want the India-facing registration pathway later.",
  },
  {
    question: "What is the main Bangladesh MBBS risk that students miss?",
    answer:
      "Many students miss the strict passing-year and GPA rule. Parents should verify eligibility and document validity before paying any booking or processing amount.",
  },
  {
    question: "Do FMGE percentages guarantee future licensing results?",
    answer:
      "No. FMGE numbers are only reference indicators for comparison. Final outcomes depend on the student, the college, the course structure, and later licensing performance.",
  },
] as const;
