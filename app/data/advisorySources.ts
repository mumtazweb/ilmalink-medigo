export type AdvisorySource = {
  id: string;
  country: string;
  sourceName: string;
  sourceType:
    | "NMC"
    | "MCC"
    | "State Counselling Committee"
    | "Indian Embassy"
    | "NBEMS"
    | "Foreign Ministry"
    | "Health Ministry"
    | "Education Ministry"
    | "Accreditation Authority"
    | "University"
    | "Other";
  url: string;
  priority: "High" | "Medium" | "Low";
  monitorFrequency: "Daily" | "Weekly" | "Monthly";
  category:
    | "MBBS India"
    | "MBBS Abroad"
    | "Counselling"
    | "Seat Matrix"
    | "FMGE"
    | "NMC/FMGL"
    | "Embassy Advisory"
    | "Accreditation"
    | "University Fee"
    | "Other";
  keywords: string[];
  notes?: string;
};

const embassyPlaceholderKeywords = [
  "Indian students",
  "medical education",
  "MBBS",
  "advisory",
  "study in",
  "university",
  "admission",
  "fees",
  "hostel",
  "visa",
  "safety",
  "NMC",
  "FMGL",
];

const embassyPlaceholderCountries = [
  "Kyrgyzstan",
  "Georgia",
  "Russia",
  "Kazakhstan",
  "Bangladesh",
  "Uzbekistan",
  "Tajikistan",
  "Malaysia",
  "Egypt",
  "Saudi Arabia",
  "UAE",
  "Iran",
  "Philippines",
  "Armenia",
  "China",
  "Nepal",
] as const;

function createEmbassyPlaceholder(country: string): AdvisorySource {
  return {
    id: `embassy-india-${country
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-advisory`,
    country,
    sourceName: `Embassy of India - ${country} student advisory`,
    sourceType: "Indian Embassy",
    category: "Embassy Advisory",
    url: "PASTE_OFFICIAL_EMBASSY_ADVISORY_URL_HERE",
    priority: "Medium",
    monitorFrequency: "Weekly",
    keywords: embassyPlaceholderKeywords,
    notes:
      "Placeholder for future Embassy of India student advisory monitoring. Replace the URL only with an official embassy advisory page.",
  };
}

export const advisorySources: AdvisorySource[] = [
  {
    id: "nmc-india-mbbs-college-list",
    country: "India",
    sourceName:
      "National Medical Commission - List of College Teaching MBBS",
    sourceType: "NMC",
    category: "MBBS India",
    url: "https://www.nmc.org.in/information-desk/for-students-to-study-in-india/list-of-college-teaching-mbbs/",
    priority: "High",
    monitorFrequency: "Daily",
    keywords: [
      "List of College Teaching MBBS",
      "Annual Intake",
      "Seats",
      "Medical College",
      "Recognition",
      "LOP",
      "State",
      "Management",
      "MBBS",
    ],
    notes:
      "This source is important because MBBS India college count, seat capacity, permission status, recognition status, and annual intake may change over time. Existing data has already been added to the website, but future changes should be detected and versioned.",
  },
  {
    id: "wbmcc-ug-medical-dental-counselling",
    country: "India",
    sourceName:
      "West Bengal Medical Counselling Committee - UG Medical/Dental Counselling",
    sourceType: "State Counselling Committee",
    category: "Counselling",
    url: "https://wbmcc.nic.in/ug-medical-dental-counselling/",
    priority: "High",
    monitorFrequency: "Daily",
    keywords: [
      "UG Medical",
      "Dental Counselling",
      "NEET UG",
      "Seat Matrix",
      "Round 1",
      "Round 2",
      "Mop-Up",
      "Stray Vacancy",
      "Allotment",
      "Schedule",
      "Notice",
      "Information Bulletin",
      "Reporting",
      "Document Verification",
      "Fees",
      "Domicile",
      "Bond",
    ],
    notes:
      "Track West Bengal UG medical/dental counselling updates, notices, seat matrix rounds, allotment results, schedules, rules, document verification, fees, domicile, and bond updates.",
  },
  {
    id: "nmc-study-abroad-fmgl",
    country: "India",
    sourceName:
      "National Medical Commission - For Students to Study Abroad",
    sourceType: "NMC",
    category: "NMC/FMGL",
    url: "PASTE_NMC_STUDY_ABROAD_URL_HERE",
    priority: "High",
    monitorFrequency: "Weekly",
    keywords: [
      "Foreign Medical Graduate",
      "FMGL",
      "NMC",
      "MBBS Abroad",
      "Foreign Medical Institution",
      "Course Duration",
      "Internship",
      "Medium of Instruction",
      "License",
      "Advisory",
    ],
    notes:
      "Monitor NMC/FMGL rules and advisories for Indian students planning MBBS abroad.",
  },
  {
    id: "nbems-fmge-reports",
    country: "India",
    sourceName: "NBEMS - FMGE Reports",
    sourceType: "NBEMS",
    category: "FMGE",
    url: "PASTE_NBEMS_FMGE_REPORTS_URL_HERE",
    priority: "High",
    monitorFrequency: "Daily",
    keywords: [
      "FMGE",
      "Country-wise",
      "Institute-wise",
      "Performance",
      "Pass",
      "Appeared",
      "NBEMS",
      "Foreign Medical Graduate Examination",
    ],
    notes:
      "Monitor FMGE country-wise and institute-wise performance reports.",
  },
  {
    id: "embassy-india-tashkent-student-advisory",
    country: "Uzbekistan",
    sourceName:
      "Embassy of India, Tashkent - Information for Students Seeking Admission in Uzbek Medical Institutions",
    sourceType: "Indian Embassy",
    category: "Embassy Advisory",
    url: "PASTE_EMBASSY_OF_INDIA_TASHKENT_ADVISORY_URL_HERE",
    priority: "High",
    monitorFrequency: "Weekly",
    keywords: [
      "Indian students",
      "Uzbek medical institutions",
      "admission",
      "medical university",
      "English",
      "consultants",
      "fees",
      "hostel",
      "insurance",
      "Andijan",
      "Bukhara",
      "Samarkand",
      "Tashkent",
      "Urgench",
      "Ferghana",
      "Karakalpakstan",
    ],
    notes:
      "Track Embassy advisory for Indian students seeking medical education in Uzbekistan.",
  },
  ...embassyPlaceholderCountries.map(createEmbassyPlaceholder),
];
