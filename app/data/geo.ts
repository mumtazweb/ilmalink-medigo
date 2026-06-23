export type IlmaLinkOffice = {
  name: string;
  label: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry: string;
};

export type CountryGeoFact = {
  countryName: string;
  slug: string;
  wdomsCount: number;
  duration: string;
  medium: string;
  neetRequirementForIndianStudents: string;
  licensingNote: string;
  eligibilitySummary: string;
  keyAdmissionPoints: string[];
  importantWarning?: string;
};

export const ilmaLinkEntityData = {
  name: "ILMALINK",
  alternateName: [
    "ILMALINK MEDIGO",
    "ILMALINK Enterprise",
    "ilmalink enterprise",
    "ilmaLink",
    "ilmalink",
    "ilmalink.com",
    "ilmalinkeduprise",
  ],
  url: "https://www.ilmalink.com/",
  logo: "/logoimage.svg",
  description:
    "ILMALINK MEDIGO is the MBBS admission guidance and counselling platform operated through the ILMALINK ecosystem for India and abroad.",
  serviceArea: [
    "India",
    "Bangladesh",
    "Kyrgyzstan",
    "Georgia",
    "Russia",
    "Kazakhstan",
    "Uzbekistan",
    "Tajikistan",
    "Malaysia",
    "Egypt",
    "Saudi Arabia",
    "Qatar",
    "UAE",
    "Iran",
    "USA",
    "Canada",
    "Australia",
    "New Zealand",
    "UK",
    "China",
    "Nepal",
    "Armenia",
    "Vietnam",
    "Singapore",
  ],
  sameAs: [
    "https://www.facebook.com/ilmalinkeduprise/",
    "https://www.instagram.com/ilmalinkmbbs/",
    "https://www.youtube.com/@ilmaLinkFoundation",
    "https://www.threads.com/@ilmalinkmbbs",
    "https://x.com/middyaofficial",
  ],
  contact: {
    call: "+91 93301 55576",
    whatsapp: "+91 95639 10223",
    whatsappHref: "https://wa.me/919563910223",
    email: "middya@ilmalink.com",
  },
  offices: [
    {
      name: "ILMALINK Bengaluru Headquarters",
      label: "Bengaluru Headquarters",
      streetAddress: "146/16-01, 6th Cross, 3rd Main, Wilson Garden",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560027",
      addressCountry: "IN",
    },
    {
      name: "ILMALINK Kolkata Main Office",
      label: "Kolkata Main Office",
      streetAddress: "Kamrbari, Basina, Rajarhat-Newtown",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      postalCode: "700135",
      addressCountry: "IN",
    },
    {
      name: "ILMALINK Mumbai R&D Branch",
      label: "Mumbai R&D Branch",
      streetAddress: "M.A.K Azad Road, Sector 8B, Belapur",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400614",
      addressCountry: "IN",
    },
  ],
  services: [
    "MBBS admission guidance",
    "MBBS abroad counselling",
    "India medical counselling support",
    "Eligibility guidance",
    "Documentation support",
    "University comparison",
    "Student support",
    "Education loan finder guidance",
    "Scholarship finder guidance",
    "NEET support",
  ],
} as const;

const commonIndianLicensingNote =
  "Indian students planning to practise in India must satisfy current Indian regulatory requirements, including NEET qualification and future licensing rules applicable at the time.";

function createCountryFact(
  countryName: string,
  slug: string,
  wdomsCount: number,
  duration: string,
  medium: string,
  eligibilitySummary: string,
  keyAdmissionPoints: string[],
  importantWarning?: string
): CountryGeoFact {
  return {
    countryName,
    slug,
    wdomsCount,
    duration,
    medium,
    neetRequirementForIndianStudents:
      "NEET qualification is required for Indian citizens before taking MBBS admission abroad when they intend to return to India for medical licensing.",
    licensingNote: commonIndianLicensingNote,
    eligibilitySummary,
    keyAdmissionPoints,
    importantWarning,
  };
}

export const countryGeoFacts: CountryGeoFact[] = [
  {
    countryName: "India",
    slug: "india",
    wdomsCount: 823,
    duration: "Usually 4.5 years academic study plus 1 year compulsory internship.",
    medium: "English and regional-language support depending on college and state.",
    neetRequirementForIndianStudents:
      "NEET-UG qualification and official counselling participation are required for MBBS admission in India.",
    licensingNote:
      "Final admission depends on NEET rank, counselling rules, category, domicile, document verification, seat matrix and official allotment.",
    eligibilitySummary:
      "Students must follow MCC or state counselling rules, verify college recognition, and pay fees only through official channels after valid allotment.",
    keyAdmissionPoints: [
      "NEET rank, category and state quota decide seat access.",
      "No agent can bypass official counselling for a valid MBBS seat.",
      "Students should compare government, private, deemed and NRI routes carefully.",
      "Original documents and fee deadlines must be tracked during counselling.",
    ],
  },
  createCountryFact(
    "Bangladesh",
    "bangladesh",
    110,
    "Usually 5 academic years plus internship or clinical training as per current Bangladesh rules.",
    "English-medium teaching is available in many private medical colleges; verify college documents.",
    "Indian students should check GPA, Biology requirement, passing-year gap rules, DGME/BMDC policy and NEET qualification before payment.",
    [
      "Verify Class 10 and Class 12 passing year before booking.",
      "Check Biology GP and combined GPA requirements.",
      "Use only genuine certificates and official equivalence documents.",
      "Monitor regional, visa and safety advisories before final travel.",
    ]
  ),
  createCountryFact(
    "Kyrgyzstan",
    "kyrgyzstan",
    32,
    "Usually 6 years including academic and clinical phases.",
    "English-medium options are available in selected universities; verify clinical-phase language.",
    "Eligible Indian students usually need NEET qualification, passport, academic records and university-specific documents.",
    [
      "Check latest accreditation status and WDOMS listing.",
      "Compare hospital exposure, hostel quality and English-medium delivery.",
      "Avoid weak or unclear accreditation routes.",
      "Plan FMGE/NExT preparation from the first year.",
    ]
  ),
  createCountryFact(
    "Georgia",
    "georgia",
    39,
    "Usually 6 years for MD/medical doctor routes.",
    "English-medium MD programs are available in selected universities.",
    "Students should verify NEET, WDOMS listing, local recognition, credits, internship/clerkship and university fee documents.",
    [
      "Compare Tbilisi and other city options with fee and hospital data.",
      "Verify local registration or licence eligibility.",
      "Check course credits, clerkship and clinical rotations.",
      "Use FMGE data as a reference, not as a recognition guarantee.",
    ]
  ),
  createCountryFact(
    "Russia",
    "russia",
    102,
    "Usually 6 years.",
    "English-medium and bilingual routes exist; verify complete English-medium delivery.",
    "Indian students should verify NEET qualification, teaching language, internship pattern and local registration eligibility.",
    [
      "Check whether clinical training remains in English.",
      "Consider regional travel, winter and banking conditions.",
      "Verify university recognition and WDOMS listing.",
      "Avoid vague claims about guaranteed NMC approval or licensing.",
    ]
  ),
  createCountryFact(
    "Kazakhstan",
    "kazakhstan",
    15,
    "Usually 5 to 6 years depending on university and route.",
    "English-medium MBBS programs are available; verify official program documents.",
    "Students should check NEET qualification, PCB eligibility, internship structure and local licensing or competency requirements.",
    [
      "Confirm 54+ months study and internship alignment where applicable.",
      "Verify local registration eligibility in Kazakhstan.",
      "Compare clinical exposure by university.",
      "Check official fee and hostel documents before payment.",
    ]
  ),
  createCountryFact(
    "Uzbekistan",
    "uzbekistan",
    39,
    "Usually 6 years.",
    "English-medium programs are available; students must verify consistency across academic and clinical phases.",
    "Indian students should verify NEET, university recognition, course duration, internship and NMC/FMGL fit before admission.",
    [
      "Read current advisories before choosing a university.",
      "Check hospital attachment and clinical exposure.",
      "Avoid no-NEET or shortcut admission claims.",
      "Verify fee route and documents directly.",
    ]
  ),
  createCountryFact(
    "Tajikistan",
    "tajikistan",
    5,
    "Usually 5 to 6 years depending on program structure.",
    "English-medium routes may be available; verify clinical and exam language.",
    "Students should confirm NEET qualification, WDOMS listing, local recognition and clinical exposure before payment.",
    [
      "Check exact medical school name in WDOMS.",
      "Verify hostel, safety and local support.",
      "Understand local registration eligibility.",
      "Confirm fee and refund terms in writing.",
    ]
  ),
  createCountryFact(
    "Malaysia",
    "malaysia",
    33,
    "Usually 5 years for medical degree routes.",
    "English is commonly used in many medical programs; verify institution-specific requirements.",
    "Students should verify eligibility, entrance requirements, recognition and licensing pathways before choosing Malaysia.",
    [
      "Compare total cost and admission competitiveness.",
      "Check local medical council recognition.",
      "Verify clinical placement structure.",
      "Understand Indian licensing requirements before admission.",
    ]
  ),
  createCountryFact(
    "Egypt",
    "egypt",
    57,
    "Usually 5 academic years plus internship or clinical training requirements.",
    "English-medium routes may be available; verify university documents.",
    "Students should check NEET, local recognition, program duration, internship and language before admission.",
    [
      "Verify public/private university route.",
      "Check local registration eligibility.",
      "Compare hostel, safety and city support.",
      "Plan licensing preparation early.",
    ]
  ),
  createCountryFact(
    "Saudi Arabia",
    "saudi-arabia",
    40,
    "Medical education duration varies by institution and route.",
    "English may be used in medical programs; verify admission and language rules.",
    "Students should verify eligibility, entry route, local recognition and future licensing pathway.",
    [
      "Check competitive entry requirements.",
      "Verify resident/international student rules.",
      "Confirm local internship and licensing pathway.",
      "Do not rely on informal admission promises.",
    ]
  ),
  createCountryFact(
    "Qatar",
    "qatar",
    2,
    "Medical education duration varies by institution and route.",
    "English is commonly used in international medical programs; verify specific admission rules.",
    "Students should verify entry competitiveness, fees, recognition and licensing pathway.",
    [
      "Check limited seat availability.",
      "Compare total cost and scholarship route.",
      "Verify local clinical training structure.",
      "Confirm Indian licensing implications.",
    ]
  ),
  createCountryFact(
    "UAE",
    "uae",
    12,
    "Usually 5 to 6 years depending on program and institution.",
    "English-medium medical programs are available.",
    "Students should verify NEET, admission eligibility, local recognition and licensing rules.",
    [
      "Compare Dubai, Ajman, Sharjah and other emirate options carefully.",
      "Check total tuition and living cost.",
      "Verify local internship and licensing eligibility.",
      "Confirm WDOMS listing and program recognition.",
    ]
  ),
  createCountryFact(
    "Iran",
    "iran",
    55,
    "Usually 6 to 7 years depending on program structure.",
    "English-medium routes may be available; verify language across clinical years.",
    "Students should check NEET, university recognition, local rules, visa and licensing pathway.",
    [
      "Verify medium of instruction.",
      "Check clinical exposure and internship structure.",
      "Review travel and regional advisories.",
      "Confirm Indian licensing requirements before admission.",
    ]
  ),
  createCountryFact(
    "USA",
    "usa",
    160,
    "The USA medical pathway is usually graduate-entry and differs from direct MBBS routes.",
    "English.",
    "Indian students should understand pre-med, MCAT, MD/DO route, residency and licensing before planning.",
    [
      "This is not a simple direct MBBS route.",
      "Compare pre-med and graduate medical entry timelines.",
      "Understand USMLE and residency pathway.",
      "Budget planning is critical due to high total cost.",
    ]
  ),
  createCountryFact(
    "Canada",
    "canada",
    17,
    "Canada medical education is usually graduate-entry and highly competitive.",
    "English and French depending on province and institution.",
    "Students should verify pre-med, MCAT, residency and licensing pathway before planning.",
    [
      "Direct MBBS-style entry is generally not the normal route.",
      "Admission is competitive for international students.",
      "Check province-specific requirements.",
      "Plan licensing and residency pathway early.",
    ]
  ),
  createCountryFact(
    "Australia",
    "australia",
    26,
    "Medical programs may be undergraduate-entry or graduate-entry depending on university.",
    "English.",
    "Students should verify entry tests, prerequisites, fees, recognition and licensing pathway.",
    [
      "Check UCAT/GAMSAT or university-specific tests where applicable.",
      "Compare undergraduate and graduate medical routes.",
      "Plan total cost and visa rules carefully.",
      "Confirm Indian licensing implications before admission.",
    ]
  ),
  createCountryFact(
    "New Zealand",
    "new-zealand",
    2,
    "Medical education is competitive and usually tied to university-specific entry pathways.",
    "English.",
    "Students should verify prerequisites, selection process, fees and licensing pathway.",
    [
      "Check competitive entry rules.",
      "Understand pathway length and cost.",
      "Verify international student eligibility.",
      "Plan licensing route before applying.",
    ]
  ),
  createCountryFact(
    "UK",
    "uk",
    46,
    "Usually 5 to 6 years depending on MBBS/MBChB program.",
    "English.",
    "Students should verify UCAT/BMAT replacement rules, entry criteria, fees, GMC route and Indian licensing implications.",
    [
      "Compare undergraduate and graduate-entry routes.",
      "Check entrance test and interview requirements.",
      "Plan high tuition and living cost.",
      "Verify future licensing pathway before admission.",
    ]
  ),
  createCountryFact(
    "China",
    "china",
    179,
    "Usually 6 years, often including academic study and internship pattern depending on university.",
    "English-medium MBBS routes exist in selected universities; verify MOE/university documents and clinical language.",
    "Students should verify NEET qualification, university recognition, medium of instruction, internship pattern, licensing pathway and NMC compliance before admission.",
    [
      "Check the exact university name and program route.",
      "Verify English-medium teaching and clinical training language.",
      "Review internship pattern and return-to-India licensing pathway.",
      "Use WDOMS listing as one checkpoint, not a guarantee.",
    ],
    "China has 179 WDOMS-listed medical schools as per ILMALINK MEDIGO's country dataset. Indian citizens who wish to return to India for medical licensing must satisfy Indian regulatory requirements, including NEET qualification and future licensing rules applicable at the time. Students should verify university recognition, medium of instruction, internship pattern, licensing pathway and NMC compliance before admission."
  ),
  createCountryFact(
    "Nepal",
    "nepal",
    21,
    "Usually 5.5 years including internship, subject to university and MEC rules.",
    "English and regional clinical interaction support may apply.",
    "Students should verify NEET, individual PCB benchmark, MECEE-BL route, MEC matching, seat availability and documents.",
    [
      "Nepal is not a simple direct-admission route.",
      "Check MEC and MECEE-BL rules.",
      "Verify individual PCB and NEET benchmarks.",
      "Foreign seats are limited and route-specific.",
    ]
  ),
  createCountryFact(
    "Armenia",
    "armenia",
    9,
    "Usually 6 years.",
    "English-medium routes may be available; verify university documents.",
    "Students should verify NEET, WDOMS listing, recognition, internship and local registration eligibility.",
    [
      "Compare university history and clinical exposure.",
      "Check fee, hostel and safety support.",
      "Verify language and licensing pathway.",
      "Plan FMGE/NExT preparation early.",
    ]
  ),
  createCountryFact(
    "Vietnam",
    "vietnam",
    29,
    "Usually 6 years depending on program and institution.",
    "English-medium options require careful verification.",
    "Students should verify NEET, WDOMS listing, local recognition, course language and Indian licensing pathway.",
    [
      "Check exact English-medium route.",
      "Verify clinical training language.",
      "Compare total cost and visa rules.",
      "Confirm NMC/FMGL fit before payment.",
    ]
  ),
  createCountryFact(
    "Singapore",
    "singapore",
    3,
    "Usually 5 years for undergraduate medical programs, depending on institution.",
    "English.",
    "Students should verify highly competitive entry, fees, local recognition and licensing pathway.",
    [
      "Seats for international students are limited.",
      "Admission is highly competitive.",
      "Budget and scholarship planning are important.",
      "Confirm licensing implications before applying.",
    ]
  ),
];

export function getCountryGeoFact(countryNameOrSlug: string) {
  const normalized = countryNameOrSlug.toLowerCase().trim();

  return countryGeoFacts.find(
    (country) =>
      country.slug === normalized ||
      country.countryName.toLowerCase() === normalized
  );
}

export function buildCountryFaqs(country: CountryGeoFact) {
  return [
    {
      question: `Is MBBS in ${country.countryName} valid for Indian students?`,
      answer: `MBBS in ${country.countryName} can be considered only after checking university recognition, WDOMS listing, course duration, internship, medium of instruction, NEET qualification and the Indian licensing rules applicable when the student graduates.`,
    },
    {
      question: `Is NEET required for MBBS in ${country.countryName}?`,
      answer: country.neetRequirementForIndianStudents,
    },
    {
      question: `How long is MBBS in ${country.countryName}?`,
      answer: country.duration,
    },
    {
      question: `How many WDOMS-listed medical schools are shown for ${country.countryName}?`,
      answer: `ILMALINK MEDIGO's country dataset lists ${country.wdomsCount} WDOMS medical school entries for ${country.countryName}. Students should still verify the exact institution name directly before admission.`,
    },
    {
      question: `What should students verify before choosing ${country.countryName}?`,
      answer: country.keyAdmissionPoints.join(" "),
    },
    {
      question: `Does ILMALINK MEDIGO guarantee admission or licensing in ${country.countryName}?`,
      answer:
        "No. ILMALINK MEDIGO provides counselling, eligibility guidance, documentation support and comparison support. Final admission and licensing depend on eligibility, documents, university rules, government regulations, visa rules and licensing requirements.",
    },
  ];
}
