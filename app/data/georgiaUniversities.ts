export type GeorgiaFeeRow = {
  year: string;
  semester: string;
  tuitionFee: string;
  hostelAndMess: string;
  semesterTotal: string;
};

export type GeorgiaFmgePerformance = {
  sourceName: string;
  appeared: number;
  passed: number;
  passRate: string;
};

export type GeorgiaUniversityPageData = {
  name: string;
  shortName?: string;
  slug: string;
  city: string;
  location: string;
  program: string;
  intake: string;
  duration: string;
  medium: string;
  feeSummary: string;
  totalTuition?: string;
  annualTuition?: string;
  mandatoryHostelMess?: string;
  livingCost?: string;
  accreditationLabel: string;
  recommendationLabel: string;
  summary: string;
  feeRows: GeorgiaFeeRow[];
  additionalFees: { label: string; amount: string; note?: string }[];
  feeNotes: string[];
  paymentTerms: string[];
  entryRequirements: string[];
  documentChecklist: string[];
  oneTimeServiceItems: string[];
  highlights: string[];
  facts: { label: string; value: string }[];
  facilities: string[];
  supportServices: string[];
  clinicalCenters: string[];
  partnerHighlights: string[];
  fmgePerformance?: GeorgiaFmgePerformance[];
  heroImage?: string;
  detailImage?: string;
  pageExists?: boolean;
};

export const georgiaFinalDisclaimer =
  "Fees, admission requirements, recognition, WDOMS listing, NMC/FMGL compliance, internship rules, hostel terms, visa rules, and local licence eligibility can change. Students should verify the latest official university and regulatory position before final admission.";

export const georgiaCountryStats = [
  { label: "Georgia FMGE 2025 appeared", value: "5,103" },
  { label: "Georgia FMGE 2025 pass rate", value: "30.34%" },
  { label: "EEU annual tuition", value: "USD 5,500" },
  { label: "EEU total tuition", value: "USD 33,100" },
];

const eeuFeeRows: GeorgiaFeeRow[] = [
  {
    year: "Year 1",
    semester: "Semester 1",
    tuitionFee: "USD 2,850",
    hostelAndMess: "USD 1,500",
    semesterTotal: "USD 4,350",
  },
  {
    year: "Year 1",
    semester: "Semester 2",
    tuitionFee: "USD 2,750",
    hostelAndMess: "USD 1,500",
    semesterTotal: "USD 4,250",
  },
  {
    year: "Year 2",
    semester: "Semester 3",
    tuitionFee: "USD 2,750",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,750 tuition only",
  },
  {
    year: "Year 2",
    semester: "Semester 4",
    tuitionFee: "USD 2,750",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,750 tuition only",
  },
  {
    year: "Year 3",
    semester: "Semester 5",
    tuitionFee: "USD 2,750",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,750 tuition only",
  },
  {
    year: "Year 3",
    semester: "Semester 6",
    tuitionFee: "USD 2,750",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,750 tuition only",
  },
  {
    year: "Year 4",
    semester: "Semester 7",
    tuitionFee: "USD 2,750",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,750 tuition only",
  },
  {
    year: "Year 4",
    semester: "Semester 8",
    tuitionFee: "USD 2,750",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,750 tuition only",
  },
  {
    year: "Year 5",
    semester: "Semester 9",
    tuitionFee: "USD 2,750",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,750 tuition only",
  },
  {
    year: "Year 5",
    semester: "Semester 10",
    tuitionFee: "USD 2,750",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,750 tuition only",
  },
  {
    year: "Year 6",
    semester: "Semester 11",
    tuitionFee: "USD 2,750",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,750 tuition only",
  },
  {
    year: "Year 6",
    semester: "Semester 12",
    tuitionFee: "USD 2,750",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,750 tuition only",
  },
];

const eeuAdditionalFees = [
  {
    label: "Premium Training Program",
    amount: "INR 1,25,000",
  },
  {
    label: "One-time admission and processing",
    amount: "USD 1,500",
    note: "Payable in the first year.",
  },
  {
    label: "EQE and TRC charges",
    amount: "USD 300",
    note: "Temporary Residence Card and related processing.",
  },
  {
    label: "Air tickets",
    amount: "On actuals",
  },
  {
    label: "Hostel and mess",
    amount: "USD 1,500 per semester",
    note: "Mandatory for the first year; includes three meals a day and utilities.",
  },
];

const eeuFeeNotes = [
  "Six-year tuition total is USD 33,100 based on the listed semester tuition amounts.",
  "First-year hostel and mess is mandatory and totals USD 3,000 for two semesters.",
  "First semester tuition includes a USD 100 one-time registration fee payable to the university.",
  "Hostel and mess after the first year is optional as per the student's accommodation plan and latest university terms.",
  "Estimated living cost in Georgia, excluding tuition, is USD 2,000-3,000 per year.",
  "The MD program fee includes one academic year of tuition and health insurance when viewed annually at USD 5,500.",
];

const eeuPaymentTerms = [
  "Tuition and hostel-mess fees must be paid in advance according to the university schedule.",
  "Before each semester begins, students must settle tuition and semester fees to remain eligible for the next semester.",
  "First-year hostel and mess must be paid before arriving in Georgia.",
  "Students using education-loan support should complete the loan process before travel confirmation.",
  "Late payment may lead to penalties or additional charges.",
  "After a student receives a visa and officially starts classes, one semester fee becomes chargeable.",
  "Refunds are subject to the university refund policy and are calculated according to services already used.",
];

const eeuEntryRequirements = [
  "Completed intermediate / 12 years of schooling.",
  "High-school diploma or equivalent secondary education.",
  "Minimum 50% score in Biology, Physics, and Chemistry.",
  "NEET qualification for Indian students, or entrance exam where applicable.",
  "English language readiness at B2 level for the MD program.",
];

const eeuDocuments = [
  "High school certificate (10th grade).",
  "Secondary school certificate (12th grade).",
  "NEET passing certificate, where applicable.",
  "Passport and visa documents with at least 6 months validity.",
];

const eeuOneTimeServiceItems = [
  "RFID student ID card.",
  "Police registration.",
  "Document translation in Georgia.",
  "Ministry or related permissions.",
  "Local SIM card.",
  "Bank account opening assistance.",
  "Temporary Residence Card support.",
  "Airport pickup from airport to hostel in Georgia.",
];

const eeuHighlights = [
  "English-medium Medical Doctor (MD) program.",
  "6 academic years with 360 credits and a 12-month clerkship.",
  "Clinical rotations begin from the 4th year.",
  "NCEQE-accredited program framework in Georgia.",
  "Quality assurance and program development support connected with UCL Medical School.",
  "Simulation laboratories, anatomy room, OSCE stations, and practical skills training.",
  "Academic support for FMGE, USMLE, and PLAB-oriented preparation from the first year.",
  "Student support through orientation, scholarships, project grants, legal support, psychological support, and health insurance.",
];

const eeuFacts = [
  { label: "Established", value: "2012" },
  { label: "City", value: "Tbilisi" },
  { label: "Educational programs", value: "21" },
  { label: "Enrollment footprint", value: "20,000+" },
  { label: "Partner organizations", value: "310" },
  { label: "Positive feedback", value: "92%" },
  { label: "Student activity", value: "2,080" },
  { label: "Conferences and seminars", value: "400" },
  { label: "Partner universities", value: "40+" },
  { label: "Exchange universities", value: "24 in 17 countries" },
  { label: "International memberships", value: "16" },
  { label: "Affiliated hospitals", value: "17" },
];

const eeuFacilities = [
  "Two modern campuses in Tbilisi.",
  "Auditoriums and conference halls.",
  "Computer labs and smart-board classrooms.",
  "Clinical and Practical Skills Development Center.",
  "Simulation laboratories.",
  "Anatomy room.",
  "Chemistry and biochemistry laboratory.",
  "Microbiology laboratory.",
  "Histology and cell biology laboratory.",
  "OSCE stations.",
  "Library with digital and printed resources.",
  "Recreational spaces, sports facilities, cafeteria, and student activity areas.",
  "Hostel near campus with three meals a day and utilities included in the listed hostel-mess fee.",
];

const eeuSupportServices = [
  "Adaptation support and orientation days.",
  "Scholarships for excellent students.",
  "Grants for student projects.",
  "Student psychological support.",
  "Legal support.",
  "Health insurance and medical support.",
  "Excursions, sports tournaments, social events, and other extracurricular activities.",
  "Private accommodation assistance in Tbilisi when students do not choose hostel after the mandatory first year.",
];

const eeuClinicalCenters = [
  "Academician O. Gudushauri National Medical Center.",
  "Academician N. Kipshidze Central University Clinic.",
  "Tbilisi Central Hospital.",
  "MediClub Georgia.",
  "Academician Vakhtang Bochorishvili Clinic.",
  "Mardaleishvili Medical Center.",
  "Pineo Medical Ecosystem.",
  "Georgia-Israel Joint Clinic.",
  "Eye Clinic Akhali Mzera.",
  "Chachava Clinic.",
  "Curatio Clinic.",
];

const eeuPartnerHighlights = [
  "Exchange programs with 24 universities in 17 countries.",
  "International partner universities across Europe, Asia, the USA, and Africa.",
  "Double-degree possibilities with universities in Germany, Italy, and Poland.",
  "Foreign professors from the UK, Germany, Italy, Israel, and Austria.",
  "Scientific grant exposure through Erasmus+, Shota Rustaveli National Science Foundation, and U.S. Embassy in Georgia-supported opportunities.",
];

const eeuFmgePerformance: GeorgiaFmgePerformance[] = [
  {
    sourceName: "EAST EUROPEAN UNIVERSITY FACULTY OF HEALTHCARE SCIENCES",
    appeared: 135,
    passed: 34,
    passRate: "25.19%",
  },
];

const otherGeorgiaUniversities: GeorgiaUniversityPageData[] = [
  {
    name: "Tbilisi State Medical University",
    slug: "tbilisi-state-medical-university",
    city: "Tbilisi",
    location: "Tbilisi, Georgia",
    program: "Medicine / MD program",
    intake: "Contact for latest intake",
    duration: "Verify latest course structure",
    medium: "English-medium options available; verify current official program.",
    feeSummary: "Fee structure to be verified before admission.",
    accreditationLabel: "Recognition verification required",
    recommendationLabel: "Compare carefully",
    pageExists: true,
    summary:
      "A long-running public medical university option in Tbilisi. Students should verify fee schedule, English-medium delivery, WDOMS listing, clinical rotations, and NMC/FMGL fit before admission.",
    feeRows: [],
    additionalFees: [],
    feeNotes: ["Fees to be verified before admission."],
    paymentTerms: [],
    entryRequirements: [],
    documentChecklist: [],
    oneTimeServiceItems: [],
    highlights: ["Popular Georgia medical university option.", "Tbilisi location."],
    facts: [],
    facilities: [],
    supportServices: [],
    clinicalCenters: [],
    partnerHighlights: [],
    fmgePerformance: [
      {
        sourceName: "TBILISI STATE MEDICAL UNIVERSITY FACULTY OF MEDICINE",
        appeared: 638,
        passed: 148,
        passRate: "23.20%",
      },
    ],
  },
  {
    name: "Georgian National University SEU",
    slug: "georgian-national-university-seu",
    city: "Tbilisi",
    location: "Tbilisi, Georgia",
    program: "Medicine / MD program",
    intake: "Contact for latest intake",
    duration: "Verify latest course structure",
    medium: "English-medium options available; verify current official program.",
    feeSummary: "Fee structure to be verified before admission.",
    accreditationLabel: "Recognition verification required",
    recommendationLabel: "Compare carefully",
    pageExists: true,
    summary:
      "A commonly searched Georgia MBBS option for Indian students. Compare current fee, hostel terms, clinical exposure, and FMGE/NExT planning before admission.",
    feeRows: [],
    additionalFees: [],
    feeNotes: ["Fees to be verified before admission."],
    paymentTerms: [],
    entryRequirements: [],
    documentChecklist: [],
    oneTimeServiceItems: [],
    highlights: ["Tbilisi location.", "Frequently searched by Indian students."],
    facts: [],
    facilities: [],
    supportServices: [],
    clinicalCenters: [],
    partnerHighlights: [],
    fmgePerformance: [
      {
        sourceName: "GEORGIAN NATIONAL UNIVERSITY SEU FACULTY OF MEDICINE",
        appeared: 509,
        passed: 211,
        passRate: "41.45%",
      },
    ],
  },
  {
    name: "European University Georgia",
    slug: "european-university-georgia",
    city: "Tbilisi",
    location: "Tbilisi, Georgia",
    program: "Medicine / MD program",
    intake: "Contact for latest intake",
    duration: "Verify latest course structure",
    medium: "English-medium options available; verify current official program.",
    feeSummary: "Fee structure to be verified before admission.",
    accreditationLabel: "Recognition verification required",
    recommendationLabel: "Compare carefully",
    pageExists: true,
    summary:
      "A private university option in Tbilisi for medical studies. Students should compare official fees, hostel terms, hospital exposure, and NMC/FMGL compliance.",
    feeRows: [],
    additionalFees: [],
    feeNotes: ["Fees to be verified before admission."],
    paymentTerms: [],
    entryRequirements: [],
    documentChecklist: [],
    oneTimeServiceItems: [],
    highlights: ["Tbilisi location.", "English-medium medical route subject to verification."],
    facts: [],
    facilities: [],
    supportServices: [],
    clinicalCenters: [],
    partnerHighlights: [],
    fmgePerformance: [
      {
        sourceName: "EUROPEAN UNIVERSITY FACULTY OF MEDICINE",
        appeared: 315,
        passed: 76,
        passRate: "24.13%",
      },
    ],
  },
  {
    name: "David Tvildiani Medical University",
    slug: "david-tvildiani-medical-university",
    city: "Tbilisi",
    location: "Tbilisi, Georgia",
    program: "Medicine / MD program",
    intake: "Contact for latest intake",
    duration: "Verify latest course structure",
    medium: "English-medium options available; verify current official program.",
    feeSummary: "Fee structure to be verified before admission.",
    accreditationLabel: "Recognition verification required",
    recommendationLabel: "Compare carefully",
    pageExists: true,
    summary:
      "A known Georgia medicine option. Students should verify latest official recognition, fee schedule, clinical rotation terms, and Indian licensing fit.",
    feeRows: [],
    additionalFees: [],
    feeNotes: ["Fees to be verified before admission."],
    paymentTerms: [],
    entryRequirements: [],
    documentChecklist: [],
    oneTimeServiceItems: [],
    highlights: ["Tbilisi location.", "Known Georgia medical university option."],
    facts: [],
    facilities: [],
    supportServices: [],
    clinicalCenters: [],
    partnerHighlights: [],
    fmgePerformance: [
      {
        sourceName: "DAVID TVILDIANI MEDICAL UNIVERSITY AIETI MEDICAL SCHOOL",
        appeared: 104,
        passed: 41,
        passRate: "39.42%",
      },
    ],
  },
  {
    name: "Batumi Shota Rustaveli State University",
    slug: "batumi-shota-rustaveli-state-university",
    city: "Batumi",
    location: "Batumi, Georgia",
    program: "Medicine / health sciences route",
    intake: "Contact for latest intake",
    duration: "Verify latest course structure",
    medium: "Verify current official program.",
    feeSummary: "Fee structure to be verified before admission.",
    accreditationLabel: "Recognition verification required",
    recommendationLabel: "Compare carefully",
    pageExists: true,
    summary:
      "A Batumi-based public university option. Verify official fee, English-medium availability, clinical training, and NMC/FMGL fit before admission.",
    feeRows: [],
    additionalFees: [],
    feeNotes: ["Fees to be verified before admission."],
    paymentTerms: [],
    entryRequirements: [],
    documentChecklist: [],
    oneTimeServiceItems: [],
    highlights: ["Batumi location.", "Public university option."],
    facts: [],
    facilities: [],
    supportServices: [],
    clinicalCenters: [],
    partnerHighlights: [],
    fmgePerformance: [
      {
        sourceName:
          "BATUMI SHOTA RUSTAVELI STATE UNIVERSITY FACULTY OF NATURAL SCIENCES AND HEALTH CARE",
        appeared: 294,
        passed: 57,
        passRate: "19.39%",
      },
    ],
  },
  {
    name: "Akaki Tsereteli State University",
    slug: "akaki-tsereteli-state-university",
    city: "Kutaisi",
    location: "Kutaisi, Georgia",
    program: "Medicine / MD program",
    intake: "Contact for latest intake",
    duration: "Verify latest course structure",
    medium: "Verify current official program.",
    feeSummary: "Fee structure to be verified before admission.",
    accreditationLabel: "Recognition verification required",
    recommendationLabel: "Compare carefully",
    pageExists: true,
    summary:
      "A Kutaisi-based state university option. Students should verify current recognition, fee structure, and Indian licensing compatibility.",
    feeRows: [],
    additionalFees: [],
    feeNotes: ["Fees to be verified before admission."],
    paymentTerms: [],
    entryRequirements: [],
    documentChecklist: [],
    oneTimeServiceItems: [],
    highlights: ["Kutaisi location.", "State university option."],
    facts: [],
    facilities: [],
    supportServices: [],
    clinicalCenters: [],
    partnerHighlights: [],
    fmgePerformance: [
      {
        sourceName: "AKAKI TSERETELI STATE UNIVERSITY FACULTY OF MEDICINE",
        appeared: 216,
        passed: 56,
        passRate: "25.93%",
      },
    ],
  },
];

const gauFeeRows: GeorgiaFeeRow[] = Array.from({ length: 12 }, (_, index) => {
  const semesterNumber = index + 1;
  const firstYear = semesterNumber <= 2;

  return {
    year: `Year ${Math.floor(index / 2) + 1}`,
    semester: `Semester ${semesterNumber}`,
    tuitionFee: "USD 3,250",
    hostelAndMess: firstYear ? "USD 1,500" : "Optional",
    semesterTotal: firstYear
      ? "USD 4,750 listed fees"
      : "USD 3,250 tuition only",
  };
});

const gauAdditionalFees = [
  {
    label: "One-time admission and processing",
    amount: "USD 1,000",
    note: "Payable in the first year as stated in the 2026-2027 flyer.",
  },
  {
    label: "Premium Training Program",
    amount: "INR 1,25,000",
    note: "Flyer-listed training support for licensing-exam preparation.",
  },
  {
    label: "Visa and air-ticket fee",
    amount: "INR 75,000",
  },
  {
    label: "Medical assistance",
    amount: "USD 100 per year",
  },
  {
    label: "Hostel and mess",
    amount: "USD 1,500 per semester",
    note: "Mandatory in the first year and listed for a five-month term.",
  },
];

const gauFeeNotes = [
  "Tuition is listed at USD 3,250 per semester for each of the 12 semesters in the 2026-2027 flyer.",
  "The listed tuition across 12 semesters is USD 39,000 before accommodation, processing, training, visa, travel, medical assistance, and personal expenses.",
  "Accommodation is mandatory for the first year.",
  "Hostel accommodation and mess is USD 1,500 per semester during the first year.",
  "The flyer states that the hostel and mess fee includes charges for a five-month term.",
  "Hostel and mess is shown as optional from Semester 3 onward.",
  "Fees may change according to university policy, exchange rates, visa and travel costs, and official notification.",
];

const gauPaymentTerms = [
  "Tuition and hostel-mess fees must be paid in advance according to the schedule specified by the university.",
  "Students must settle tuition and semester fees before each semester begins.",
  "Failure to pay the required semester fees may make a student ineligible to proceed to the next semester.",
  "First-year hostel and mess is compulsory and must be paid before arrival in Georgia.",
  "Students using education-loan support should complete the loan process before travel confirmation.",
  "Late payment may lead to penalties or additional charges.",
  "After obtaining a visa and officially commencing classes, one semester fee becomes chargeable as stated in the flyer.",
  "Refunds are subject to the university refund policy and the services already used by the student.",
];

const gauEntryRequirements = [
  "Completed intermediate education or 12 years of schooling equivalent to secondary education.",
  "Minimum 50% score in Biology, Physics, and Chemistry.",
  "NEET qualification for Indian students, or an entrance examination where applicable.",
  "English-language readiness for the medical pathway; verify the latest official program and admission documents.",
];

const gauDocuments = [
  "High school certificate or 10th-grade certificate.",
  "Secondary school certificate or 12th-grade certificate.",
  "NEET passing certificate or applicable entrance certificate.",
  "Passport.",
  "Visa with six months validity, where applicable.",
];

const gauOneTimeServiceItems = [
  "RFID-enabled student ID card.",
  "Police registration support.",
  "Document translation in Georgia.",
  "Assistance with ministry or other related permissions.",
  "Local SIM card support.",
  "New bank account opening assistance.",
  "Temporary Residence Card (TRC) support.",
  "Airport pickup from the airport to the hostel in Georgia.",
];

const gauHighlights = [
  "Exposure to modern medical technologies.",
  "Internship opportunities in affiliated hospitals.",
  "Advanced simulation labs for practical learning.",
  "Strong emphasis on patient care and clinical skills.",
  "Special focus on FMGE, USMLE, and PLAB training from the first year as stated in the flyer.",
  "The flyer presents the curriculum as aligned with the latest National Medical Commission guidelines.",
  "The course includes a clinical rotatory internship as stated in the flyer.",
];

const gauFacts = [
  { label: "Institution type", value: "Private university" },
  { label: "City", value: "Tbilisi" },
  { label: "Academic year", value: "2026-2027" },
  { label: "Program", value: "Medical Doctor (MD)" },
  { label: "Course pattern", value: "12 semesters" },
  { label: "Tuition", value: "USD 3,250 / semester" },
  { label: "First-year hostel/mess", value: "USD 1,500 / semester" },
  { label: "Clinical internship", value: "Included per flyer" },
];

const gauFacilities = [
  "High-tech teaching methods.",
  "Modern medical research facilities.",
  "Advanced simulation laboratories.",
  "Practical-learning facilities focused on patient care and clinical skills.",
];

const gauSupportServices = [
  "Academic support.",
  "Strong alumni network highlighted in the flyer.",
  "Licensing-exam preparation focus for FMGE, USMLE, and PLAB from the first year.",
  "Student arrival and local setup assistance listed in the flyer.",
];

const alteFeeRows: GeorgiaFeeRow[] = [
  {
    year: "Year 1",
    semester: "Semester 1",
    tuitionFee: "USD 2,975",
    hostelAndMess: "USD 1,500",
    semesterTotal: "USD 4,475",
  },
  {
    year: "Year 1",
    semester: "Semester 2",
    tuitionFee: "USD 2,975",
    hostelAndMess: "USD 1,500",
    semesterTotal: "USD 4,475",
  },
  {
    year: "Year 2",
    semester: "Semester 3",
    tuitionFee: "USD 2,975",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,975 tuition only",
  },
  {
    year: "Year 2",
    semester: "Semester 4",
    tuitionFee: "USD 2,975",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,975 tuition only",
  },
  {
    year: "Year 3",
    semester: "Semester 5",
    tuitionFee: "USD 2,975",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,975 tuition only",
  },
  {
    year: "Year 3",
    semester: "Semester 6",
    tuitionFee: "USD 2,975",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,975 tuition only",
  },
  {
    year: "Year 4",
    semester: "Semester 7",
    tuitionFee: "USD 2,975",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,975 tuition only",
  },
  {
    year: "Year 4",
    semester: "Semester 8",
    tuitionFee: "USD 2,975",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,975 tuition only",
  },
  {
    year: "Year 5",
    semester: "Semester 9",
    tuitionFee: "USD 2,975",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,975 tuition only",
  },
  {
    year: "Year 5",
    semester: "Semester 10",
    tuitionFee: "USD 2,975",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,975 tuition only",
  },
  {
    year: "Year 6",
    semester: "Semester 11",
    tuitionFee: "USD 2,975",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,975 tuition only",
  },
  {
    year: "Year 6",
    semester: "Semester 12",
    tuitionFee: "USD 2,975",
    hostelAndMess: "Optional",
    semesterTotal: "USD 2,975 tuition only",
  },
];

const alteAdditionalFees = [
  {
    label: "Premium Training Program",
    amount: "INR 1,25,000",
    note: "FMGE/USMLE/PLAB-focused training support.",
  },
  {
    label: "Visa & air-ticket fee",
    amount: "INR 75,000",
  },
  {
    label: "One-time admission & processing",
    amount: "USD 1,000",
    note: "Payable in the first year.",
  },
  {
    label: "Medical assistance",
    amount: "USD 100 per year",
  },
  {
    label: "Hostel and mess",
    amount: "USD 1,500 per semester",
    note: "Mandatory for the first year; covers a 5-month term with meals.",
  },
];

const alteFeeNotes = [
  "Tuition is USD 2,975 per semester across all 12 semesters, so six-year tuition totals USD 35,700.",
  "Annual tuition works out to USD 5,950 for two semesters.",
  "Hostel accommodation and mess is mandatory for the first year (Semesters 1 and 2) at USD 1,500 per semester.",
  "First-year hostel and mess covers a 5-month term per semester and is optional from Year 2.",
  "Course duration follows NMC guidelines and includes a clinical rotatory internship.",
  "A one-time admission and processing fee of USD 1,000 is payable in the first year; medical assistance is USD 100 yearly.",
  "Living costs in Tbilisi are additional and should be budgeted separately before admission.",
];

const altePaymentTerms = [
  "Tuition and hostel-mess fees must be paid in advance, as per the schedule specified by the university.",
  "Before each semester begins, students must settle all tuition and semester fees to remain eligible for the next semester.",
  "Hostel stay is compulsory for the 1st and 2nd semester and must be paid before arriving in Georgia.",
  "Students opting for education-loan support should complete the process before travel confirmation.",
  "Late payment may lead to penalties or additional charges.",
  "After obtaining a visa and officially commencing classes, one semester's fee becomes chargeable.",
  "Refunds are subject to the university refund policy and are calculated on services already availed.",
];

const alteEntryRequirements = [
  "Completed intermediate / 12 years of schooling equivalent to secondary education.",
  "Minimum 50% score in Biology, Physics, and Chemistry.",
  "NEET qualification for Indian students, or entrance exam where applicable.",
  "High-school and secondary-school certificates.",
  "English-language readiness for the English-medium MD program.",
];

const alteDocuments = [
  "High school certificate (10th grade).",
  "Secondary school certificate (12th grade).",
  "NEET passing certificate, or as applicable.",
  "Passport and visa with at least 6 months validity.",
];

const alteOneTimeServiceItems = [
  "RFID-enabled student ID card.",
  "Police registration.",
  "Document translation in Georgia.",
  "Ministry or other related permissions.",
  "Local SIM card.",
  "New bank account opening assistance.",
  "Temporary Residence Card (TRC).",
  "Airport pickup from the airport to the hostel in Georgia.",
];

const alteHighlights = [
  "English-medium Medical Doctor (MD) program built on a latest NMC-compliant MBBS curriculum.",
  "6-year MD program (12 semesters) with Spring and Fall intakes and a clinical rotatory internship.",
  "Special FMGE, USMLE, and PLAB training from the first year.",
  "Clinical training at the affiliated Ivane Bokeria University Hospital, a leading EVEX Group clinic.",
  "Advanced simulation labs, OSCE training centres, and modern medical research facilities.",
  "Recognized and approved by WHO, WFME, and the Medical Council of India / NMC framework.",
  "Member of ENQA, AMEE, and ECFMG.",
  "Strong global recognition with students from 50 countries and international exchange programs.",
];

const alteFacts = [
  { label: "Established", value: "2001" },
  { label: "City", value: "Tbilisi" },
  { label: "Students", value: "2,917" },
  { label: "Countries represented", value: "50" },
  { label: "Partner organizations", value: "200" },
  { label: "Graduates", value: "3,210" },
  { label: "Academic programmes", value: "18" },
  { label: "Schools", value: "5" },
  { label: "FMGE 2025 pass rate", value: "46.40%" },
  { label: "MD duration", value: "6 years" },
  { label: "Intakes", value: "Spring & Fall" },
  { label: "EVEX hospital network", value: "Up to 100" },
];

const alteFacilities = [
  "Newly constructed modern campus in Tbilisi.",
  "High-tech teaching laboratories.",
  "Advanced medical simulation labs.",
  "OSCE training centres.",
  "Anatomy and clinical skills facilities.",
  "Modern medical research facilities.",
  "Library with digital and printed resources.",
  "Career & Student Success Center.",
  "Start-up Garage supporting student entrepreneurship.",
  "Clubs and societies across language, medical research, leadership, culture, and arts.",
  "Student Buddy Program to help freshmen adjust.",
  "Hostel with safe living spaces, hygienic meals, and 24/7 medical care.",
];

const alteSupportServices = [
  "Student Buddy Program for new students.",
  "Career and student success guidance.",
  "Thematic events, clubs, and societies.",
  "Hostel with hygienic and delicious meals.",
  "24/7 medical care at the hostel.",
  "Friendly staff and student activities.",
  "FMGE, USMLE, and PLAB academic support from year one.",
  "International exchange opportunities.",
];

const alteClinicalCenters = [
  "Ivane Bokeria University Hospital - the affiliated university clinic.",
  "Emergency care and neurosurgery.",
  "Cardiac surgery and minimally invasive heart surgery.",
  "General, thoracic, and vascular surgery.",
  "Maxillofacial surgery.",
  "Liver and kidney transplantation.",
  "Chronic dialysis service.",
  "Obstetric-gynecological, antenatal, and neonatal care.",
  "Trauma and orthopaedic surgery.",
  "Stroke treatment using the TPA method.",
  "Pediatrics, urology, cardiology, and arrhythmology.",
];

const altePartnerHighlights = [
  "Exclusive partner of EVEX Group, uniting up to 100 hospitals and clinics across Georgia.",
  "Erasmus+ fully funded exchange programs in Europe.",
  "Academic cooperation and joint projects with Northeastern University.",
  "Confucius Institute for free Chinese-language learning on campus.",
  "Exchange programs with Lanzhou University in China.",
  "Exchange programs with Bharat University in India for medical students and faculty.",
  "Strategic education partners: BAPIO Training Academy, Proceum, Center of Excellence, and DOC Tutorials.",
];

const alteFmgePerformance: GeorgiaFmgePerformance[] = [
  {
    sourceName: "ALTE UNIVERSITY SCHOOL OF MEDICINE",
    appeared: 222,
    passed: 103,
    passRate: "46.40%",
  },
];

export const georgianAmericanUniversity: GeorgiaUniversityPageData = {
  name: "Georgian American University",
  shortName: "GAU",
  slug: "georgian-american-university",
  city: "Tbilisi",
  location: "Tbilisi, Georgia",
  program: "Medical Doctor Program / MBBS equivalent",
  intake: "Academic year 2026-2027",
  duration:
    "6 years / 12 semesters as presented in the flyer, including a clinical rotatory internship",
  medium:
    "English-medium medical pathway; verify the latest official university program document",
  feeSummary:
    "Tuition USD 3,250 per semester; listed 12-semester tuition USD 39,000; first-year hostel and mess USD 3,000 mandatory.",
  totalTuition: "USD 39,000 listed tuition",
  annualTuition: "USD 6,500",
  mandatoryHostelMess: "USD 3,000 in the first year",
  livingCost: "Budget separately for personal and living costs in Tbilisi",
  accreditationLabel: "Private university; WDOMS and NMC/FMGL checks required",
  recommendationLabel: "2026-2027 private Georgia option",
  summary:
    "Georgian American University is a private university option in Tbilisi for Indian students planning MBBS abroad in 2026. Its Medical Doctor Program is presented with a 12-semester fee plan, clinical rotatory internship, simulation-based learning, affiliated-hospital exposure, academic support, and licensing-exam preparation from the first year. Students must independently verify the current WDOMS entry, NMC/FMGL compliance, medium of instruction, internship structure, and licensing pathway before admission.",
  feeRows: gauFeeRows,
  additionalFees: gauAdditionalFees,
  feeNotes: gauFeeNotes,
  paymentTerms: gauPaymentTerms,
  entryRequirements: gauEntryRequirements,
  documentChecklist: gauDocuments,
  oneTimeServiceItems: gauOneTimeServiceItems,
  highlights: gauHighlights,
  facts: gauFacts,
  facilities: gauFacilities,
  supportServices: gauSupportServices,
  clinicalCenters: [
    "Internship opportunities in affiliated hospitals are highlighted in the flyer; students should verify the current hospital list and rotation schedule.",
  ],
  partnerHighlights: [
    "The flyer presents global memberships, collaborations, and accredited global programs; students should verify the current official status directly.",
  ],
  heroImage: "/georgia/georgia-tbilisi-student-life.jpg",
  detailImage: "/georgia/georgia-tbilisi-student-life.jpg",
  pageExists: true,
};

export const alteUniversity: GeorgiaUniversityPageData = {
  name: "ALTE University",
  shortName: "ALTE",
  slug: "alte-university",
  city: "Tbilisi",
  location: "Tbilisi, Georgia",
  program: "International School of Medicine - Medical Doctor (MD)",
  intake: "2026-2027 fee structure, Spring and Fall intakes",
  duration: "6 years / 12 semesters as per NMC guidelines, including a clinical rotatory internship",
  medium: "English",
  feeSummary:
    "Annual tuition USD 5,950; six-year tuition USD 35,700; first-year hostel and mess USD 3,000 mandatory.",
  totalTuition: "USD 35,700",
  annualTuition: "USD 5,950",
  mandatoryHostelMess: "USD 3,000 in the first year",
  livingCost: "Budget separately for living costs in Tbilisi",
  accreditationLabel: "NMC-compliant, WHO & WFME recognized",
  recommendationLabel: "Top Georgia FMGE 2025 performer",
  summary:
    "ALTE University in Tbilisi runs an English-medium Medical Doctor (MD) program on a latest NMC-compliant MBBS curriculum, with FMGE, USMLE, and PLAB training from year one, clinical training at the affiliated Ivane Bokeria University Hospital, and a transparent 2026-2027 semester-wise fee plan for Indian students. ALTE recorded a 46.40% FMGE 2025 pass rate, among the strongest in Georgia.",
  feeRows: alteFeeRows,
  additionalFees: alteAdditionalFees,
  feeNotes: alteFeeNotes,
  paymentTerms: altePaymentTerms,
  entryRequirements: alteEntryRequirements,
  documentChecklist: alteDocuments,
  oneTimeServiceItems: alteOneTimeServiceItems,
  highlights: alteHighlights,
  facts: alteFacts,
  facilities: alteFacilities,
  supportServices: alteSupportServices,
  clinicalCenters: alteClinicalCenters,
  partnerHighlights: altePartnerHighlights,
  fmgePerformance: alteFmgePerformance,
  heroImage: "/georgia/alte-university-hero.jpg",
  detailImage: "/georgia/alte-clinical-students.jpg",
  pageExists: true,
};

export const eastEuropeanUniversity: GeorgiaUniversityPageData = {
  name: "East European University",
  shortName: "EEU",
  slug: "east-european-university",
  city: "Tbilisi",
  location: "Tbilisi, Georgia",
  program: "Undergraduate Medical Education - Medical Doctor (MD)",
  intake: "2025-2026 fee structure",
  duration: "6 academic years, 360 credits, including a 12-month clerkship",
  medium: "English",
  feeSummary:
    "Annual tuition USD 5,500; six-year tuition USD 33,100; first-year hostel and mess USD 3,000 mandatory.",
  totalTuition: "USD 33,100",
  annualTuition: "USD 5,500",
  mandatoryHostelMess: "USD 3,000 in the first year",
  livingCost: "USD 2,000-3,000 per year excluding tuition",
  accreditationLabel: "NCEQE-accredited Georgian university route",
  recommendationLabel: "Featured Georgia option",
  summary:
    "East European University in Tbilisi offers an English-medium MD route with a structured 6-year curriculum, clinical rotations from the 4th year, affiliated hospital exposure, modern practical-skills facilities, and a clearly listed 2025-2026 fee plan for Indian students comparing MBBS in Georgia.",
  feeRows: eeuFeeRows,
  additionalFees: eeuAdditionalFees,
  feeNotes: eeuFeeNotes,
  paymentTerms: eeuPaymentTerms,
  entryRequirements: eeuEntryRequirements,
  documentChecklist: eeuDocuments,
  oneTimeServiceItems: eeuOneTimeServiceItems,
  highlights: eeuHighlights,
  facts: eeuFacts,
  facilities: eeuFacilities,
  supportServices: eeuSupportServices,
  clinicalCenters: eeuClinicalCenters,
  partnerHighlights: eeuPartnerHighlights,
  fmgePerformance: eeuFmgePerformance,
  heroImage: "/georgia/east-european-university-hero.jpg",
  detailImage: "/georgia/eeu-labs-classroom.jpg",
  pageExists: true,
};

export const georgiaUniversities: GeorgiaUniversityPageData[] = [
  georgianAmericanUniversity,
  alteUniversity,
  eastEuropeanUniversity,
  ...otherGeorgiaUniversities,
];

export const featuredGeorgiaUniversities: GeorgiaUniversityPageData[] = [
  georgianAmericanUniversity,
  alteUniversity,
  eastEuropeanUniversity,
];

export function getGeorgiaUniversityBySlug(slug: string) {
  return georgiaUniversities.find((university) => university.slug === slug);
}
