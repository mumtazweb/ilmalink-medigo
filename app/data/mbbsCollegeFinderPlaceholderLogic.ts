export type MbbsFinderPathway = "india" | "abroad";

export type MbbsFinderCountry = "Kyrgyzstan" | "Bangladesh" | "Georgia";

export type FinderOption = {
  label: string;
  value: string;
};

export type IndiaTopResult = {
  title: string;
  fit: string;
  reason: string;
};

export type CountryMatch = {
  country: MbbsFinderCountry;
  fitLevel: string;
  budgetFit: string;
  neetStatus: string;
  reason: string;
  imageSrc: string;
};

export type CollegeCard = {
  name: string;
  reason: string;
  imageSrc: string;
};

export type CollegeRecommendation = {
  country: MbbsFinderCountry;
  bestFit: CollegeCard[];
  backup: CollegeCard[];
};

export const indiaBudgetOptions: FinderOption[] = [
  {
    label: "Budget not important / Rank within 30,000",
    value: "rank-under-30000",
  },
  { label: "Below Rs. 20 lakh", value: "below-20" },
  { label: "Rs. 20-30 lakh", value: "20-30" },
  { label: "Rs. 30-50 lakh", value: "30-50" },
  { label: "Rs. 50-75 lakh", value: "50-75" },
  { label: "Above Rs. 75 lakh", value: "above-75" },
];

export const abroadBudgetOptions: FinderOption[] = [
  { label: "Rs. 10-15 lakh", value: "10-15" },
  { label: "Rs. 15-20 lakh", value: "15-20" },
  { label: "Rs. 20-25 lakh", value: "20-25" },
  { label: "Rs. 25-30 lakh", value: "25-30" },
  { label: "Rs. 30-35 lakh", value: "30-35" },
  { label: "Rs. 35-40 lakh", value: "35-40" },
  { label: "Rs. 40-45 lakh", value: "40-45" },
  { label: "Rs. 45-50 lakh", value: "45-50" },
  { label: "Rs. 50-60 lakh", value: "50-60" },
  { label: "Rs. 60 lakh+", value: "60-plus" },
];

export const domicileStateOptions: FinderOption[] = [
  { label: "West Bengal", value: "west-bengal" },
  { label: "Karnataka", value: "karnataka" },
  { label: "Maharashtra", value: "maharashtra" },
  { label: "Kerala", value: "kerala" },
  { label: "Telangana", value: "telangana" },
  { label: "Tamil Nadu", value: "tamil-nadu" },
  { label: "Delhi", value: "delhi" },
  { label: "Uttar Pradesh", value: "uttar-pradesh" },
  { label: "Bihar", value: "bihar" },
  { label: "Other State", value: "other" },
];

export const indiaTopResults: IndiaTopResult[] = [
  {
    title: "Government MBBS",
    fit: "Very High Possibility",
    reason:
      "Your rank may fall in a strong range and your domicile state may support counselling possibilities.",
  },
  {
    title: "Semi-Government / Private MBBS",
    fit: "Good Backup Option",
    reason: "Useful as a backup if government allotment does not happen.",
  },
];

export const indiaBackupOptions = [
  "BDS / AYUSH",
  "Private MBBS Counselling",
  "Management Quota Route",
  "Abroad Backup Comparison",
];

export const indiaImportantLogicNote =
  "Rank within 35000 generally means government MBBS should be explored first. Budget is not the main deciding factor in this case. Focus on MCC and state counselling strategy.";

export const abroadCountryMatches: CountryMatch[] = [
  {
    country: "Kyrgyzstan",
    fitLevel: "95%",
    budgetFit: "Best value for your budget",
    neetStatus: "NEET qualification accepted",
    reason:
      "Best value for budget, NEET qualified route, lower cost of living and tuition.",
    imageSrc: "/home/mbbs-college-finder/country-kyrgyzstan-premium.webp",
  },
  {
    country: "Bangladesh",
    fitLevel: "87%",
    budgetFit: "Affordable clinical route",
    neetStatus: "NEET qualification accepted",
    reason:
      "Affordable tuition with strong clinical exposure and familiar academic environment.",
    imageSrc: "/home/mbbs-college-finder/country-bangladesh-premium.webp",
  },
  {
    country: "Georgia",
    fitLevel: "80%",
    budgetFit: "Premium budget route",
    neetStatus: "NEET qualification accepted",
    reason:
      "Good quality education and safer premium environment within higher budget range.",
    imageSrc: "/home/mbbs-college-finder/country-georgia-premium.webp",
  },
];

const collegeImage = "/home/mbbs-college-finder/college-campus-premium.webp";

export const abroadCollegeRecommendations: Record<
  MbbsFinderCountry,
  CollegeRecommendation
> = {
  Kyrgyzstan: {
    country: "Kyrgyzstan",
    bestFit: [
      {
        name: "Kyrgyz State Medical Academy",
        reason:
          "Best fit for your budget, NEET qualified route and established medical pathway.",
        imageSrc: collegeImage,
      },
      {
        name: "International Higher School of Medicine",
        reason:
          "Strong English-medium backup with good FMGE-focused student support.",
        imageSrc: collegeImage,
      },
    ],
    backup: [
      {
        name: "Asian Medical Institute",
        reason: "Good infrastructure and affordable fees.",
        imageSrc: collegeImage,
      },
      {
        name: "Jalal-Abad State University",
        reason: "Budget friendly with decent clinical exposure.",
        imageSrc: collegeImage,
      },
      {
        name: "Osh State University",
        reason: "Reliable option within your budget.",
        imageSrc: collegeImage,
      },
    ],
  },
  Bangladesh: {
    country: "Bangladesh",
    bestFit: [
      {
        name: "Green Life Medical College",
        reason:
          "Strong clinical exposure and familiar academic environment for Indian students.",
        imageSrc: collegeImage,
      },
      {
        name: "Tairunnessa Memorial Medical College",
        reason:
          "Balanced tuition, hospital exposure and practical admission pathway.",
        imageSrc: collegeImage,
      },
    ],
    backup: [
      {
        name: "Holy Family Red Crescent Medical College",
        reason: "Recognized backup route with clinical exposure.",
        imageSrc: collegeImage,
      },
      {
        name: "Jahurul Islam Medical College",
        reason: "Backup choice for budget and seat availability comparison.",
        imageSrc: collegeImage,
      },
    ],
  },
  Georgia: {
    country: "Georgia",
    bestFit: [
      {
        name: "Georgian American University",
        reason:
          "Premium route with a safer study environment and international exposure.",
        imageSrc: collegeImage,
      },
      {
        name: "Alte University",
        reason:
          "Good fit for higher budget planning and English-medium medical study.",
        imageSrc: collegeImage,
      },
    ],
    backup: [
      {
        name: "East European University",
        reason: "Backup option for premium Georgia comparison.",
        imageSrc: collegeImage,
      },
      {
        name: "European University",
        reason: "Useful backup for eligibility and budget review.",
        imageSrc: collegeImage,
      },
      {
        name: "Tbilisi State Medical University",
        reason: "Established backup choice subject to final eligibility checks.",
        imageSrc: collegeImage,
      },
    ],
  },
};

export const futureIndiaLogicNotes = [
  "NEET rank/score interpretation",
  "Domicile state and category analysis",
  "Budget versus seat type analysis",
  "MCC counselling and state counselling route mapping",
  "Government, semi-government, private, BDS, AYUSH, management and NRI quota pathways",
  "Special rule: rank within 30,000 means government MBBS should be explored first and budget matters less than counselling strategy",
];

export const futureAbroadLogicNotes = [
  "NEET qualification status",
  "Budget range and country preference",
  "University recognition and verification",
  "Tuition, living cost, Indian food, hostel and community support",
  "FMGE/NExT support, visa complexity and admission possibility",
  "Country shortlist, top two recommended colleges and backup colleges per country",
  "Final counsellor verification flow",
];
