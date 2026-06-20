export type KyrgyzAccreditationStatus =
  | "6-Year Accredited"
  | "Accredited until 29 May 2030"
  | "Not Subject to 2026 State Accreditation"
  | "1-Year Conditional Accreditation"
  | "Did Not Pass State Accreditation"
  | "Did Not Participate / Not Verified"
  | "Needs Official Re-verification";

export type KyrgyzRecommendationLevel =
  | "Recommended"
  | "Recommended — Separate Verification Required"
  | "Not Recommended"
  | "No Admission";

export type KyrgyzFeeRow = {
  year: string;
  semester: string;
  tuitionFee: string;
  hostelAccommodation: string;
  mess: string;
  totalCost: string;
};

export type KyrgyzFmgePerformance = {
  sourceName: string;
  appeared: number;
  passed: number;
  passRate: string;
};

export type KyrgyzCampusData = {
  name: string;
  location: string;
  address: string;
  program: string;
  intake: string;
  feeRows: KyrgyzFeeRow[];
  additionalFees: { label: string; amount: string }[];
  feeNotes: string[];
  paymentTerms: string[];
  entryRequirements: string[];
  documentChecklist: string[];
  highlights: string[];
  facts: { label: string; value: string }[];
  facilities: string[];
  clinicalCenters?: string[];
  history?: { year: string; text: string }[];
  studentExamples?: string[];
  fmgePassedExamples?: string[];
  disclaimer?: string;
};

export type KyrgyzUniversityPageData = {
  name: string;
  slug: string;
  location: string;
  program: string;
  intake: string;
  officialWebsiteName?: string;
  overview?: string[];
  accreditationStatus: KyrgyzAccreditationStatus;
  accreditationLabel: string;
  recommendationLevel: KyrgyzRecommendationLevel;
  recommendationMessage: string;
  feeRows: KyrgyzFeeRow[];
  additionalFees: { label: string; amount: string }[];
  feeNotes: string[];
  paymentTerms: string[];
  entryRequirements: string[];
  documentChecklist: string[];
  highlights: string[];
  facts: { label: string; value: string }[];
  facilities: string[];
  clinicalCenters?: string[];
  fmgePerformance?: KyrgyzFmgePerformance[];
  campuses?: KyrgyzCampusData[];
  history: { year: string; text: string }[];
  studentExamples?: string[];
  fmgePassedExamples?: string[];
  disclaimer: string;
  pageExists?: boolean;
};

export const kyrgyzAccreditationStats = [
  { label: "Medical Training Institutions", value: "34" },
  { label: "Public Institutions", value: "12" },
  { label: "Private Institutions", value: "22" },
  { label: "Applied for Accreditation", value: "24" },
  { label: "Received 6-Year Accreditation", value: "4" },
  { label: "Received 1-Year Accreditation", value: "7" },
  { label: "Did Not Pass Accreditation", value: "13" },
  { label: "Did Not Participate on Time", value: "7" },
  { label: "Not Subject to State Accreditation", value: "3" },
];

export const kyrgyzEvaluationCriteria = [
  "Staffing",
  "Clinical facilities",
  "Material and technical resources",
  "Educational programs",
  "Organization of the educational process",
  "Other quality indicators",
];

export const kyrgyzFinalDisclaimer =
  "Accreditation and fee details may change. Students must verify the latest university-wise accreditation, fee structure, course duration, internship, English medium instruction, WDOMS listing, local licence eligibility, and NMC/FMGL compliance before admission.";

const toBeUpdatedFeeRows: KyrgyzFeeRow[] = [
  {
    year: "To be updated",
    semester: "To be updated",
    tuitionFee: "To be updated",
    hostelAccommodation: "To be updated",
    mess: "To be updated",
    totalCost: "To be updated",
  },
];

const defaultAccreditationOnlyFields = {
  location: "To be updated",
  program: "Medical program details to be updated",
  intake: "Contact for latest details",
  overview: [],
  feeRows: toBeUpdatedFeeRows,
  additionalFees: [],
  feeNotes: ["Fees: To be updated"],
  paymentTerms: ["Contact for latest details"],
  entryRequirements: ["Contact for latest details"],
  documentChecklist: ["Contact for latest details"],
  highlights: [],
  facts: [],
  facilities: [],
  history: [],
  disclaimer: kyrgyzFinalDisclaimer,
  pageExists: false,
};

const recommendedMessage =
  "Recommended for consideration, subject to latest NMC/FMGL, WDOMS, course duration, internship, English medium, local licence eligibility, and fee verification.";

const statutoryExemptionMessage =
  "This institution was legally not subject to the May 2026 state accreditation procedure under its regulatory, intergovernmental, or special state status. This is not a failed-accreditation result. Students must still verify the exact medical program, WDOMS listing, course and internship structure, local licence eligibility, and NMC/FMGL compliance before admission.";

const ksmaRegulatorMessage =
  "KSMA was legally not subject to the May 2026 state accreditation procedure because the final government update identified it as a regulating body for medical-education quality. This is not a failed or pending accreditation result. Students must still verify the exact program, WDOMS listing, course and internship structure, local licence eligibility, and NMC/FMGL compliance.";

const conditionalMessage =
  "This university currently has only 1-year conditional accreditation. ILMALINK MEDIGO does not recommend it as a first-choice option unless a fresh long-term official accreditation update is available.";

const didNotPassMessage =
  "This institution is not suitable for new admission recommendation because it did not pass state accreditation. New admission should not be considered unless fresh official clarification is issued.";

const didNotParticipateMessage =
  "This institution is not suitable for new admission recommendation because it did not participate in the state accreditation process within the required deadline. New admission should not be considered unless fresh official clarification is issued.";

function accreditationOnlyUniversity(
  data: Pick<
    KyrgyzUniversityPageData,
    | "name"
    | "slug"
    | "accreditationStatus"
    | "accreditationLabel"
    | "recommendationLevel"
    | "recommendationMessage"
  > &
    Partial<KyrgyzUniversityPageData>,
): KyrgyzUniversityPageData {
  const hasAccreditedProfile =
    data.accreditationStatus === "6-Year Accredited" ||
    data.accreditationStatus === "1-Year Conditional Accreditation";

  return {
    ...defaultAccreditationOnlyFields,
    ...data,
    pageExists: data.pageExists ?? hasAccreditedProfile,
  };
}

const notSpecifiedInBrochure = "Not specified in brochure";

const ihsmCentralCampusFeeRows: KyrgyzFeeRow[] = [
  {
    year: "Year 1",
    semester: "Semester 1*",
    tuitionFee: "$5000",
    hostelAccommodation: "$0",
    mess: "$750",
    totalCost: notSpecifiedInBrochure,
  },
  {
    year: "Year 1",
    semester: "Semester 2",
    tuitionFee: "$3000",
    hostelAccommodation: "Included in tuition fee",
    mess: "$750",
    totalCost: notSpecifiedInBrochure,
  },
  {
    year: "Year 2**",
    semester: "Semester 3",
    tuitionFee: "$3000",
    hostelAccommodation: "$0",
    mess: "Optional",
    totalCost: notSpecifiedInBrochure,
  },
  {
    year: "Year 2**",
    semester: "Semester 4",
    tuitionFee: "$3000",
    hostelAccommodation: "Included in tuition fee",
    mess: "Optional",
    totalCost: notSpecifiedInBrochure,
  },
  {
    year: "Year 3**",
    semester: "Semester 5",
    tuitionFee: "$3000",
    hostelAccommodation: "$0",
    mess: "Optional",
    totalCost: notSpecifiedInBrochure,
  },
  {
    year: "Year 3**",
    semester: "Semester 6",
    tuitionFee: "$3000",
    hostelAccommodation: "Included in tuition fee",
    mess: "Optional",
    totalCost: notSpecifiedInBrochure,
  },
  {
    year: "Year 4",
    semester: "Semester 7",
    tuitionFee: "$2750",
    hostelAccommodation: "$325",
    mess: "Optional",
    totalCost: notSpecifiedInBrochure,
  },
  {
    year: "Year 4",
    semester: "Semester 8",
    tuitionFee: "$2750",
    hostelAccommodation: "$325",
    mess: "Optional",
    totalCost: notSpecifiedInBrochure,
  },
  {
    year: "Year 5",
    semester: "Semester 9",
    tuitionFee: "$2750",
    hostelAccommodation: "$325",
    mess: "Optional",
    totalCost: notSpecifiedInBrochure,
  },
  {
    year: "Year 5",
    semester: "Semester 10",
    tuitionFee: "$2750",
    hostelAccommodation: "$325",
    mess: "Optional",
    totalCost: notSpecifiedInBrochure,
  },
  {
    year: "Year 6",
    semester: "Semester 11",
    tuitionFee: "$2750",
    hostelAccommodation: "$325",
    mess: "Optional",
    totalCost: notSpecifiedInBrochure,
  },
];

const ihsmEliteCampusFeeRows: KyrgyzFeeRow[] = [
  {
    year: "Year 1",
    semester: "Semester 1",
    tuitionFee: "$5200",
    hostelAccommodation: "$0",
    mess: "$0",
    totalCost: "$5200",
  },
  {
    year: "Year 1",
    semester: "Semester 2",
    tuitionFee: "$3000",
    hostelAccommodation: "$0",
    mess: "$0",
    totalCost: "$3000",
  },
  {
    year: "Year 2",
    semester: "Semester 3",
    tuitionFee: "$1900",
    hostelAccommodation: "$325",
    mess: "$750",
    totalCost: "$2975",
  },
  {
    year: "Year 2",
    semester: "Semester 4",
    tuitionFee: "$1900",
    hostelAccommodation: "$325",
    mess: "$750",
    totalCost: "$2975",
  },
  {
    year: "Year 3",
    semester: "Semester 5",
    tuitionFee: "$1900",
    hostelAccommodation: "$325",
    mess: "$750",
    totalCost: "$2975",
  },
  {
    year: "Year 3",
    semester: "Semester 6",
    tuitionFee: "$1900",
    hostelAccommodation: "$325",
    mess: "$750",
    totalCost: "$2975",
  },
  {
    year: "Year 4",
    semester: "Semester 7",
    tuitionFee: "$1900",
    hostelAccommodation: "Optional",
    mess: "Optional",
    totalCost: "$1900",
  },
  {
    year: "Year 4",
    semester: "Semester 8",
    tuitionFee: "$1900",
    hostelAccommodation: "Optional",
    mess: "Optional",
    totalCost: "$1900",
  },
  {
    year: "Year 5",
    semester: "Semester 9",
    tuitionFee: "$1900",
    hostelAccommodation: "Optional",
    mess: "Optional",
    totalCost: "$1900",
  },
  {
    year: "Year 5",
    semester: "Semester 10",
    tuitionFee: "$1900",
    hostelAccommodation: "Optional",
    mess: "Optional",
    totalCost: "$1900",
  },
  {
    year: "Year 6",
    semester: "Semester 11",
    tuitionFee: "$1900",
    hostelAccommodation: "Optional",
    mess: "Optional",
    totalCost: "$1900",
  },
];

const ihsmCommonEntryRequirements = [
  "Completed intermediate",
  "Education (12 years) equivalent to secondary education",
  "50% scores in Biology, Physics, and Chemistry",
  "NEET qualification / entrance exam as applicable",
];

const ihsmCommonPaymentTerms = [
  "Tuition fees and Hostel-Mess fees must be paid in advance, as per the schedule specified by University.",
  "Prior to the commencement of each semester, students are required to settle all tuition and semester fees.",
  "Failure to settle semester fees may make the student ineligible to proceed to the next semester.",
  "Students opting for financial loan services shall ensure the process is completed prior to their travel confirmation.",
  "Failure to meet payment deadlines may result in late payment penalties or additional charges.",
  "Upon obtaining a visa and officially commencing classes, students will be charged for one semester's fee.",
  "Refunds for tuition fees and other charges are subject to the university's refund policy and calculated based on services availed by the student.",
];

const ihsmCommonClinicalCenters = [
  "National Hospital clinical facilities",
  "Leading research institutions",
  "Bishkek municipal in-patient settings",
  "Morphological Center for practical classes",
  "Clinical Simulation Center with two floors and 2400 m2 total area",
  "Vedanta Net of Hospitals",
];

const ihsmCentralStudentExamples = [
  "Tajorshee Bala",
  "SK Kasmin Tamanna",
  "Rick Pal",
  "MD Muaaz",
  "SK Aftab Buddin",
  "Shubham Raj Mandal",
  "MD Farhan",
  "Sneha Mandal",
  "Momin Molla",
  "Swastika Das",
];

const ihsmCentralFmgePassedExamples = [
  "Dr. Arnab Datta - MD PGT, Anesthesia Branch, Lalbagh Subdivision Hospital",
  "Dr. Enjamul Sarkar - Medical Officer at DESUN Hospital",
  "Dr. Sahensha Seikh - JR Resident, Kalyani AIIMS",
  "Dr. Golam Sarower - Internship in Kolkata Medical College",
  "Dr. Neha Nusrat - Medical Officer at FORT HILL Hospital Siliguri",
  "Dr. Mainak Chowdhury - MD PGT, R G Kar Medical College & Hospital",
  "Dr. MD Mafik Seikh - FMGE Passed Dec 2025, FMGE Score: 235",
  "Dr. MD Hares Rasel - FMGE Passed Dec 2025, FMGE Score: 164",
  "Dr. Najmin Khatun - FMGE Passed Dec 2025, FMGE Score: 163",
  "Dr. Sarwat Tahera Chaman - FMGE Passed Dec 2025, FMGE Score: 164",
  "Dr. Priyanka Sarkar - FMGE Passed Jun 2025, FMGE Score: 180",
  "Dr. Abdul Azad Saikh - FMGE Passed Dec 2025, FMGE Score: 162",
];

const ihsmEliteStudentExamples = [
  "Lara Sharma",
  "Asfakuddin Ahmed",
  "Hasim Khan",
  "Morium Khatun",
  "Sumit Saha",
  "Sirin Ebadi",
  "Mahfooz Hashim Haldar",
  "MD Najimul Islam",
  "Yasir Hossain",
  "SK Nouman",
];

const ihsmEliteFmgePassedExamples = [
  "Dr. Sarfaz Hossain - Medical Officer, YUVAN Hospital Siliguri",
  "Dr. Pronab Kumar Sarkar - Internship completed from Jalpaiguri Medical College",
  "Dr. Meem Akkash - Junior Resident at J.R. Deben Mahato Medical College, Purulia",
  "Dr. Raja Sekh - Internship at NRS Medical College & Hospital",
  "Dr. Masud Hasan - Internship at Calcutta National Medical College & Hospital",
  "Dr. Rajibul Islam - Internship at Rampurhat Government Medical College",
  "Dr. Vani Oleti - FMGE Passed Dec 2025, FMGE Score: 215",
  "Dr. Javed Khan - FMGE Passed Dec 2025, FMGE Score: 210",
  "Dr. Arjun - FMGE Passed Dec 2025, FMGE Score: 201",
  "Dr. Roshini - FMGE Passed Dec 2025",
  "Dr. Susmita Mishra - FMGE Passed Dec 2025",
  "Dr. Ranjit - FMGE Passed Dec 2025",
];

const ihsmCampuses: KyrgyzCampusData[] = [
  {
    name: "Central Campus",
    location: "Bishkek, Kyrgyzstan",
    address: "1F, Intergelpo st., Bishkek, Kyrgyzstan, 720054",
    program: "MD Program (MBBS) - General Medicine",
    intake: "2026-2027",
    feeRows: ihsmCentralCampusFeeRows,
    additionalFees: [
      { label: "Premium Training Program", amount: "₹1,25,000" },
      { label: "Visa & Air-ticket Fee", amount: "₹75,000" },
    ],
    feeNotes: [
      "Duration of course: as per NMC guidelines.",
      "Includes 1 year of rotatory clinical internship.",
      "Monthly stipend of 100 USD shall be paid during internship for 10 months.",
      "Mess fee is $750/sem.",
      "Accommodation is mandatory for 3 years. T&C Apply.",
      "Tuition fee includes accommodation fee for complete academic year.",
      "1st semester tuition fee includes admission charges, hostel for full academic year, invitation charges, translation charges into local language, and Immigration Approval.",
    ],
    paymentTerms: [
      ...ihsmCommonPaymentTerms,
      "Hostel and Mess fee is compulsory for the 1st year and must be paid before arriving to the destination country.",
      "In case a student wants to opt out of hostel from 2nd to 3rd year, after availing guardian's or parents' NOC a defined amount shall be refunded.",
    ],
    entryRequirements: [
      "Completed intermediate",
      "Education (12 years) equivalent to secondary education",
      "50% scores in Biology, Physics, and Chemistry",
      "NEET qualification",
    ],
    documentChecklist: [
      "High school certificate (10th Grade)",
      "Secondary School (12th Grade)",
      "NEET Passing Certificate or as applicable",
      "Passport Visa (6 month of validity)",
      "Aadhar Card & PAN Card",
    ],
    highlights: [
      "Central Campus in Bishkek, Kyrgyzstan",
      "Global Recognition",
      "Diverse Student Community",
      "Comprehensive Clinical Training",
      "Medical Research Exposure",
      "Strong Alumni Network",
      "Special focus on FMGE, USMLE, and PLAB training from 1st year",
      "Latest NMC compliant MBBS curriculum",
    ],
    facts: [
      { label: "Total students", value: "4432+" },
      { label: "Alumni", value: "7000+" },
      { label: "Faculty", value: "350+" },
      { label: "International projects", value: "10+" },
      { label: "Affiliated state hospitals", value: "20+" },
      { label: "Vedanta Net of Hospitals", value: "10+" },
      { label: "General Medicine study duration", value: "5.5 years" },
      { label: "Instruction medium", value: "English medium" },
    ],
    facilities: [
      "Hostel & mess",
      "Campuses & divisions",
      "Food & accommodation",
      "Health & security",
      "Sports and leisure facilities",
      "Sports areas, theatres, libraries, and internet rooms",
      "Hostels with modern facilities and internet services",
    ],
    clinicalCenters: ihsmCommonClinicalCenters,
    history: [
      {
        year: "2003",
        text: "IHSM was established on a special resolution of the Kyrgyz Government.",
      },
      {
        year: "Brochure note",
        text: "The brochure states that the first 13 students were enrolled eighteen years ago and about 3500 students study in the school.",
      },
    ],
    studentExamples: ihsmCentralStudentExamples,
    fmgePassedExamples: ihsmCentralFmgePassedExamples,
    disclaimer: kyrgyzFinalDisclaimer,
  },
  {
    name: "Elite Campus",
    location: "Issyk-Kul, Kyrgyzstan",
    address: "Issyk-Kul Campus, 3V Sovetskaya street, Cholpon-Ata",
    program: "MD Program (MBBS) - General Medicine",
    intake: "2026-2027",
    feeRows: ihsmEliteCampusFeeRows,
    additionalFees: [
      { label: "Premium Training Program", amount: "₹1,25,000" },
      { label: "Visa & Air-ticket Fee", amount: "₹75,000" },
    ],
    feeNotes: [
      "Duration of course: as per NMC guidelines.",
      "Includes 1 year of rotatory clinical internship.",
      "Accommodation is mandatory for all 3 years.",
      "1st semester tuition fee includes admission charges, hostel & mess for full 1st academic year, invitation charges, translation into local language documents, and Immigration Approval.",
    ],
    paymentTerms: [
      ...ihsmCommonPaymentTerms,
      "Hostel and mess is compulsory for 3 years and 1st year's hostel mess fees must be paid before arriving the destination country.",
    ],
    entryRequirements: ihsmCommonEntryRequirements,
    documentChecklist: [
      "High school certificate (10th Grade)",
      "Secondary School (12th Grade)",
      "NEET Passing Certificate or as applicable",
      "Passport with Visa (6 month of validity)",
      "Aadhar card",
    ],
    highlights: [
      "Elite Campus in Issyk-Kul, Kyrgyzstan",
      "Special campus for only Indian students",
      "Global Recognition",
      "Diverse Student Community",
      "Comprehensive Clinical Training",
      "Medical Research Exposure",
      "Strong Alumni Network",
      "Brochure claim: FMGE pass rate above 60%; verify latest official basis before admission",
      "Special focus on FMGE, USMLE, and PLAB training from 1st year",
      "Latest NMC compliant MBBS curriculum",
    ],
    facts: [
      { label: "Total students", value: "4300+" },
      { label: "Alumni", value: "7000+" },
      { label: "Faculty", value: "350+" },
      { label: "International projects", value: "10+" },
      { label: "Affiliated state hospitals", value: "20+" },
      { label: "Vedanta Net of Hospitals", value: "10+" },
      { label: "General Medicine study duration", value: "5.5 years" },
      { label: "Instruction medium", value: "English medium" },
    ],
    facilities: [
      "Hostel & mess",
      "Food & accommodation",
      "Health & security",
      "Campus and facilities at Issyk-Kul / Cholpon-Ata",
      "Sports and leisure facilities",
      "Hostels with modern facilities and internet services",
    ],
    clinicalCenters: ihsmCommonClinicalCenters,
    history: [
      {
        year: "2003",
        text: "IHSM was established on a special resolution of the Kyrgyz Government.",
      },
    ],
    studentExamples: ihsmEliteStudentExamples,
    fmgePassedExamples: ihsmEliteFmgePassedExamples,
    disclaimer: kyrgyzFinalDisclaimer,
  },
];

export const kyrgyzstanUniversities: KyrgyzUniversityPageData[] = [
  {
    name: "Kyrgyz State Medical Academy",
    slug: "kyrgyz-state-medical-academy",
    location: "Bishkek, Kyrgyzstan",
    program: "Medical Doctor Program (MBBS)",
    intake: "2026 Intake",
    accreditationStatus: "Not Subject to 2026 State Accreditation",
    accreditationLabel: "Not Subject to 2026 State Accreditation",
    recommendationLevel: "Recommended",
    recommendationMessage: ksmaRegulatorMessage,
    feeRows: [
      {
        year: "Year 1*",
        semester: "Semester 1*",
        tuitionFee: "$5500",
        hostelAccommodation: "$0*",
        mess: "$750",
        totalCost: "$6250",
      },
      {
        year: "Year 1",
        semester: "Semester 2",
        tuitionFee: "$3000",
        hostelAccommodation: "$0*",
        mess: "$750",
        totalCost: "$3750",
      },
      {
        year: "Year 2",
        semester: "Semester 3",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 2",
        semester: "Semester 4",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 3",
        semester: "Semester 5",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 3",
        semester: "Semester 6",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 4",
        semester: "Semester 7",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 4",
        semester: "Semester 8",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 5",
        semester: "Semester 9",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 5",
        semester: "Semester 10",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 6",
        semester: "Semester 11",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
    ],
    additionalFees: [
      { label: "Premium Training Program", amount: "₹1,25,000" },
      { label: "Visa & Air-ticket Fee", amount: "₹75,000" },
    ],
    feeNotes: [
      "Duration of course: As per NMC guidelines.",
      "Course includes clinical rotatory internship.",
      "Tuition fee includes invitation fee, admission fee and hostel fee, for first year.",
      "Mess fee is $750/sem.",
      "Accommodation is mandatory for first year.",
      "1st semester tuition fee, admission charges, hostel full academic year, invitation charges, translation into local language documents and immigration approval are included as noted in the brochure.",
      "Hostel stay is compulsory for 1st and 2nd semester and must be paid before arriving the destination country.",
    ],
    paymentTerms: [
      "Tuition fees and hostel-mess fees must be paid in advance, as per the schedule specified by University.",
      "Prior to the commencement of each semester, students are required to settle all tuition and semester fees.",
      "Failure to make payment will result in the student being ineligible to proceed to the next semester.",
      "Students opting for financial loan services shall ensure the process is completed prior to their travel confirmation.",
      "Failure to meet payment deadlines may result in late payment penalties or additional charges.",
      "Upon obtaining a visa and officially commencing classes, students will be charged for one semester's fee.",
      "Refunds for tuition fees and other charges are subject to the university's refund policy and will be calculated based on the services availed by the student.",
    ],
    entryRequirements: [
      "Completed intermediate education (12 years) equivalent to secondary education.",
      "50% scores in Biology, Physics, Chemistry, and English.",
      "NEET qualification / entrance exam, if applicable.",
    ],
    documentChecklist: [
      "High school certificate (10th Grade) and marksheet.",
      "Secondary School (12th Grade) marksheet.",
      "NEET passing certificate.",
      "Passport with 6 months of validity.",
      "Aadhar Card & PAN Card.",
    ],
    highlights: [
      "Global recognition.",
      "Diverse student community.",
      "Comprehensive clinical training.",
      "Medical research exposure.",
      "Strong alumni network.",
      "Exposure to modern medical technologies.",
      "Internship opportunities in affiliated hospitals.",
      "Advanced simulation labs for practical learning.",
      "Strong emphasis on patient care and clinical skills.",
      "Special focus on FMGE, USMLE, and PLAB training from 1st year.",
      "Latest National Medical Commission (NMC) compliant MBBS curriculum.",
    ],
    facts: [
      { label: "Total number of students", value: "11778+" },
      { label: "International students", value: "3744" },
      { label: "Residents", value: "2046" },
      { label: "Postgraduate students", value: "173" },
      { label: "Total staff", value: "1600" },
      { label: "Teaching staff", value: "973" },
      { label: "Staff with academic degrees", value: "492" },
      { label: "Academicians-members of National Academy of Science", value: "6" },
      { label: "Inclusive educational program", value: "1" },
      { label: "Pre-university preparatory course", value: "2" },
      { label: "Undergraduate educational programs", value: "7" },
      { label: "Residency programs", value: "112" },
      { label: "Advanced learning programs", value: "43" },
      { label: "Postgraduate programs", value: "80" },
      { label: "Academic buildings", value: "5" },
      { label: "Academic clinics", value: "4" },
      { label: "Learning, scientific & research centers", value: "9" },
      { label: "State-based clinical bases", value: "285" },
      { label: "Copies of information and library resources", value: "620 000" },
      { label: "Books in English", value: "8000" },
      { label: "E-resources", value: "4431" },
      { label: "Reading halls", value: "7" },
      { label: "Total seats in reading halls", value: "300" },
      { label: "E-readers", value: "500" },
      { label: "E-resources halls", value: "3" },
      { label: "Interinstitutional agreements", value: "168" },
      { label: "Partners from countries", value: "30" },
      { label: "Membership in international organizations", value: "12" },
      { label: "Outgoing academic mobilities of students and staff", value: "200" },
    ],
    facilities: [
      "Hostel and mess.",
      "Indian food shown in brochure.",
      "WiFi and learning materials in hostels.",
      "Security and health services.",
      "Hospitals, clinics, and medical centers.",
      "Libraries and reading halls.",
      "Academic facilities.",
      "Advanced learning labs.",
      "Sports and leisure facilities.",
    ],
    fmgePerformance: [
      {
        sourceName: "I K AKHUNBAEV KYRGYZ STATE MEDICAL ACADEMY FACULTY OF GENERAL MEDICINE",
        appeared: 1038,
        passed: 237,
        passRate: "22.83%",
      },
    ],
    history: [
      {
        year: "1992",
        text: "The Kyrgyz Republic gained independence.",
      },
      {
        year: "1995",
        text: "By decree of the President of the Kyrgyz Republic, the Kyrgyz State Medical Institute was transformed into the Kyrgyz State Medical Academy.",
      },
      {
        year: "1999",
        text: "The Kyrgyz State Medical Academy was named after the great Kyrgyz cardio surgeon Isa Akhunbaev.",
      },
      {
        year: "2001",
        text: 'Kyrgyz State Medical Academy was awarded with the national significant "Dank" award for special services to the state.',
      },
      {
        year: "2001",
        text: "By decree of the President of the Kyrgyz Republic, the Kyrgyz State Medical Academy was granted a Special Status.",
      },
      {
        year: "2004",
        text: "KSMA undertakes its own development strategy and action plan for the implementation of this strategy.",
      },
    ],
    studentExamples: [
      "ANUSHKA GOLUI - KSMA 2025-26",
      "DHRUBA MONDAL - KSMA 2025-26",
      "ABDUL HAKIM SK - KSMA 2025-26",
      "KINGSUKH JANA - KSMA 2025-26",
      "NAJNIN PARVIN - KSMA 2025-26",
      "RUPESH KUMAR - KSMA 2025-26",
      "SAYAN NASKAR - KSMA 2025-26",
      "MD Saabit Al Fasal Khan - KSMA 2025-26",
      "JASMIN KHATUN - KSMA 2025-26",
      "RABIA HASHMI - KSMA 2025-26",
    ],
    fmgePassedExamples: [
      "Dr. Roni Akhter - Medical Officer at Shantipur Municipality",
      "Dr. PRITISH KANSARY - Medical Officer at Erashal Rural Hospital, Nandigram",
      "Dr. Utsab Sanbighna - Medical Officer at Renaissance Hospital, Rajarhat",
      "Dr. Fateha Khatun - Internship at North Bengal Medical College",
      "Dr. Habibur Rahaman - Internship at NRS Medical College",
      "Dr. Anjuman Yeasmin - Internship at Burdwan Medical College Hospital",
      "Dr. SHABNAM AKTAR - FMGE Passed Dec'2025, FMGE Score: 191",
      "Dr. DEBARGHYA GHOSH - FMGE Passed Dec'2025, FMGE Score: 214",
      "Dr. SHOAIB ANJUM - FMGE Passed Dec'2025, FMGE Score: 218",
      "Dr. SUSMITA BALMIKI - FMGE Passed Dec'2025, FMGE Score: 160",
      "Dr. SEKENDER SEIKH - FMGE Passed Dec'2025, FMGE Score: 199",
      "Dr. RAKIB HOSSAIN MOLLA - FMGE Passed Dec'2025, FMGE Score: 187",
    ],
    disclaimer: kyrgyzFinalDisclaimer,
    pageExists: true,
  },
  {
    name: "International Higher School of Medicine (IHSM) - Elite Campus",
    slug: "international-higher-school-of-medicine-elite",
    location: "Issyk-Kul, Kyrgyzstan",
    program: "MD Program (MBBS) - General Medicine",
    intake: "2026-2027",
    accreditationStatus: "6-Year Accredited",
    accreditationLabel: "6-Year Accredited",
    recommendationLevel: "Recommended",
    recommendationMessage: recommendedMessage,
    feeRows: ihsmEliteCampusFeeRows,
    additionalFees: [
      { label: "Premium Training Program", amount: "₹1,25,000" },
      { label: "Visa & Air-ticket Fee", amount: "₹75,000" },
    ],
    feeNotes: [
      "Duration of course: as per NMC guidelines.",
      "Includes 1 year of rotatory clinical internship.",
      "Accommodation is mandatory for all 3 years.",
      "1st semester tuition fee includes admission charges, hostel & mess for full 1st academic year, invitation charges, translation into local language documents, and Immigration Approval.",
    ],
    paymentTerms: [
      ...ihsmCommonPaymentTerms,
      "Hostel and mess is compulsory for 3 years and 1st year's hostel mess fees must be paid before arriving the destination country.",
    ],
    entryRequirements: ihsmCommonEntryRequirements,
    documentChecklist: [
      "High school certificate (10th Grade)",
      "Secondary School (12th Grade)",
      "NEET Passing Certificate or as applicable",
      "Passport with Visa (6 month of validity)",
      "Aadhar card",
    ],
    highlights: [
      "Elite Campus in Issyk-Kul, Kyrgyzstan",
      "Special campus for only Indian students",
      "Global Recognition",
      "Diverse Student Community",
      "Comprehensive Clinical Training",
      "Medical Research Exposure",
      "Strong Alumni Network",
      "Brochure claim: FMGE pass rate above 60%; verify latest official basis before admission",
      "Special focus on FMGE, USMLE, and PLAB training from 1st year",
      "Latest NMC compliant MBBS curriculum",
    ],
    facts: [
      { label: "Total students", value: "4300+" },
      { label: "Alumni", value: "7000+" },
      { label: "Faculty", value: "350+" },
      { label: "International projects", value: "10+" },
      { label: "Affiliated state hospitals", value: "20+" },
      { label: "Vedanta Net of Hospitals", value: "10+" },
      { label: "General Medicine study duration", value: "5.5 years" },
      { label: "Instruction medium", value: "English medium" },
    ],
    facilities: [
      "Hostel & mess",
      "Food & accommodation",
      "Health & security",
      "Campus and facilities at Issyk-Kul / Cholpon-Ata",
      "Sports and leisure facilities",
      "Hostels with modern facilities and internet services",
    ],
    clinicalCenters: ihsmCommonClinicalCenters,
    fmgePerformance: [
      {
        sourceName: "INTERNATIONAL HIGHER SCHOOL OF MEDICINE",
        appeared: 3816,
        passed: 698,
        passRate: "18.29%",
      },
    ],
    campuses: [ihsmCampuses[1]],
    history: [
      {
        year: "2003",
        text: "IHSM was established on a special resolution of the Kyrgyz Government.",
      },
    ],
    studentExamples: ihsmEliteStudentExamples,
    fmgePassedExamples: ihsmEliteFmgePassedExamples,
    disclaimer: kyrgyzFinalDisclaimer,
    pageExists: true,
  },
  {
    name: "International Higher School of Medicine (IHSM) - Central Campus",
    slug: "international-higher-school-of-medicine-central",
    location: "Bishkek, Kyrgyzstan",
    program: "MD Program (MBBS) - General Medicine",
    intake: "2026-2027",
    accreditationStatus: "6-Year Accredited",
    accreditationLabel: "6-Year Accredited",
    recommendationLevel: "Recommended",
    recommendationMessage: recommendedMessage,
    feeRows: ihsmCentralCampusFeeRows,
    additionalFees: [
      { label: "Premium Training Program", amount: "₹1,25,000" },
      { label: "Visa & Air-ticket Fee", amount: "₹75,000" },
    ],
    feeNotes: [
      "Duration of course: as per NMC guidelines.",
      "Includes 1 year of rotatory clinical internship.",
      "Monthly stipend of 100 USD shall be paid during internship for 10 months.",
      "Mess fee is $750/sem.",
      "Accommodation is mandatory for 3 years. T&C Apply.",
      "Tuition fee includes accommodation fee for complete academic year.",
      "1st semester tuition fee includes admission charges, hostel for full academic year, invitation charges, translation charges into local language, and Immigration Approval.",
    ],
    paymentTerms: [
      ...ihsmCommonPaymentTerms,
      "Hostel and Mess fee is compulsory for the 1st year and must be paid before arriving to the destination country.",
      "In case a student wants to opt out of hostel from 2nd to 3rd year, after availing guardian's or parents' NOC a defined amount shall be refunded.",
    ],
    entryRequirements: [
      "Completed intermediate",
      "Education (12 years) equivalent to secondary education",
      "50% scores in Biology, Physics, and Chemistry",
      "NEET qualification",
    ],
    documentChecklist: [
      "High school certificate (10th Grade)",
      "Secondary School (12th Grade)",
      "NEET Passing Certificate or as applicable",
      "Passport Visa (6 month of validity)",
      "Aadhar Card & PAN Card",
    ],
    highlights: [
      "Central Campus in Bishkek, Kyrgyzstan",
      "Global Recognition",
      "Diverse Student Community",
      "Comprehensive Clinical Training",
      "Medical Research Exposure",
      "Strong Alumni Network",
      "Special focus on FMGE, USMLE, and PLAB training from 1st year",
      "Latest NMC compliant MBBS curriculum",
    ],
    facts: [
      { label: "Total students", value: "4432+" },
      { label: "Alumni", value: "7000+" },
      { label: "Faculty", value: "350+" },
      { label: "International projects", value: "10+" },
      { label: "Affiliated state hospitals", value: "20+" },
      { label: "Vedanta Net of Hospitals", value: "10+" },
      { label: "General Medicine study duration", value: "5.5 years" },
      { label: "Instruction medium", value: "English medium" },
    ],
    facilities: [
      "Hostel & mess",
      "Campuses & divisions",
      "Food & accommodation",
      "Health & security",
      "Sports and leisure facilities",
      "Sports areas, theatres, libraries, and internet rooms",
      "Hostels with modern facilities and internet services",
    ],
    clinicalCenters: ihsmCommonClinicalCenters,
    fmgePerformance: [
      {
        sourceName: "INTERNATIONAL HIGHER SCHOOL OF MEDICINE",
        appeared: 3816,
        passed: 698,
        passRate: "18.29%",
      },
    ],
    campuses: [ihsmCampuses[0]],
    history: [
      {
        year: "2003",
        text: "IHSM was established on a special resolution of the Kyrgyz Government.",
      },
      {
        year: "Brochure note",
        text: "The brochure states that the first 13 students were enrolled eighteen years ago and about 3500 students study in the school.",
      },
    ],
    studentExamples: ihsmCentralStudentExamples,
    fmgePassedExamples: ihsmCentralFmgePassedExamples,
    disclaimer: kyrgyzFinalDisclaimer,
    pageExists: true,
  },
  {
    name: "International Higher School of Medicine (IHSM)",
    slug: "international-higher-school-of-medicine",
    location: "Central Campus: Bishkek; Elite Campus: Issyk-Kul, Kyrgyzstan",
    program: "MD Program (MBBS) - General Medicine",
    intake: "2026-2027",
    accreditationStatus: "6-Year Accredited",
    accreditationLabel: "6-Year Accredited",
    recommendationLevel: "Recommended",
    recommendationMessage: recommendedMessage,
    feeRows: toBeUpdatedFeeRows,
    additionalFees: [
      { label: "Premium Training Program", amount: "₹1,25,000" },
      { label: "Visa & Air-ticket Fee", amount: "₹75,000" },
    ],
    feeNotes: [
      "IHSM has separate Central Campus and Elite Campus fee tables in the uploaded 2026-2027 brochures.",
      "Central Campus total costs are not specified in the brochure table.",
      "Elite Campus total costs are specified semester-wise in the brochure table.",
    ],
    paymentTerms: ihsmCommonPaymentTerms,
    entryRequirements: ihsmCommonEntryRequirements,
    documentChecklist: [
      "High school certificate (10th Grade)",
      "Secondary School (12th Grade)",
      "NEET Passing Certificate or as applicable",
      "Passport with Visa / passport visa validity as applicable",
      "Aadhar Card",
      "PAN Card where applicable",
    ],
    highlights: [
      "Two campus options: Central Campus and Elite Campus",
      "Central Campus: Bishkek, Kyrgyzstan",
      "Elite Campus: Issyk-Kul, Kyrgyzstan",
      "MD Program (MBBS) 2026-2027",
      "English medium undergraduate General Medicine program",
      "General Medicine study duration: 5.5 years",
      "Clinical training exposure through National Hospital, leading research institutions, and Bishkek municipal in-patient settings",
    ],
    facts: [
      { label: "Campuses", value: "Central Campus and Elite Campus" },
      { label: "Program", value: "MD Program (MBBS) - General Medicine" },
      { label: "Central Campus location", value: "Bishkek, Kyrgyzstan" },
      { label: "Elite Campus location", value: "Issyk-Kul / Cholpon-Ata, Kyrgyzstan" },
      { label: "General Medicine study duration", value: "5.5 years" },
      { label: "Instruction medium", value: "English medium" },
      { label: "Alumni", value: "7000+" },
      { label: "Faculty", value: "350+" },
    ],
    facilities: [
      "Hostel & mess",
      "Food & accommodation",
      "Health & security",
      "Sports and leisure facilities",
      "Libraries and internet rooms",
      "Morphological Center",
      "Clinical Simulation Center",
    ],
    clinicalCenters: ihsmCommonClinicalCenters,
    fmgePerformance: [
      {
        sourceName: "INTERNATIONAL HIGHER SCHOOL OF MEDICINE",
        appeared: 3816,
        passed: 698,
        passRate: "18.29%",
      },
    ],
    campuses: ihsmCampuses,
    history: [
      {
        year: "2003",
        text: "IHSM was established on a special resolution of the Kyrgyz Government.",
      },
    ],
    studentExamples: [...ihsmCentralStudentExamples, ...ihsmEliteStudentExamples],
    fmgePassedExamples: [
      ...ihsmCentralFmgePassedExamples,
      ...ihsmEliteFmgePassedExamples,
    ],
    disclaimer: kyrgyzFinalDisclaimer,
    pageExists: true,
  },
  {
    name: "Osh State University Medical Faculty",
    slug: "osh-state-university",
    location: "Osh, Kyrgyzstan",
    program: "International Medical Faculty — Doctor of Medicine (M.D.)",
    intake: "Verify directly with Osh State University",
    accreditationStatus: "6-Year Accredited",
    accreditationLabel: "State Accredited 6Y · May 2026",
    recommendationLevel: "Recommended — Separate Verification Required",
    recommendationMessage:
      "Osh State University is a public government university with an accredited medical program. ILMALINK MEDIGO has not yet confirmed a single exclusive or universal India-side contractor. Students must verify the current university invoice, authorized representative, included services, payment recipient, internship structure, and responsibility matrix before paying.",
    feeRows: Array.from({ length: 11 }, (_, index) => ({
      year: `Year ${Math.floor(index / 2) + 1}`,
      semester: `Semester ${index + 1}`,
      tuitionFee: "$1700",
      hostelAccommodation: "At actual cost",
      mess: "At actual cost",
      totalCost: "$1700 tuition only",
    })),
    additionalFees: [
      { label: "Visa and invitation", amount: "At actual cost" },
      { label: "Hostel and accommodation", amount: "At actual cost" },
      { label: "Flight ticket", amount: "At actual cost" },
      { label: "Insurance, registration and local services", amount: "At actual cost" },
    ],
    feeNotes: [
      "No official or reliable public fee structure is currently published by Osh State University or its medical faculty.",
      "USD 1,700 per semester is shown only as an unconfirmed working estimate from a source considered reliable by ILMALINK MEDIGO. It is not presented as an official university fee.",
      "The estimate is displayed across 11 semesters. Students must reconcile this with the official curriculum and internship structure in a written university document before admission.",
      "Visa, invitation, hostel, accommodation, food, flight ticket, insurance, registration, translation, local transport, and agency support are payable at actual cost unless a written invoice states otherwise.",
      "Different agencies in India may quote different tuition and service packages because no single exclusive or universal contractor has been confirmed by ILMALINK MEDIGO.",
    ],
    paymentTerms: [
      "Do not pay tuition or service charges without a written invoice naming the receiving institution or authorized entity.",
      "Verify whether each payment goes directly to Osh State University, a hostel provider, a government authority, an airline, or an agency.",
      "Demand a written responsibility matrix covering admission, invitation, visa, travel, hostel, registration, insurance, refunds, and post-arrival support.",
      "Confirm refund rules, exchange-rate treatment, payment deadlines, and receipts before transferring funds.",
    ],
    entryRequirements: [
      "Completion of secondary education / 12 years of schooling.",
      "NEET qualification for Indian students, subject to current Indian regulations.",
      "Biology, Physics and Chemistry eligibility must be verified for the current intake.",
      "University admission and document approval are required.",
    ],
    documentChecklist: [
      "Passport with required validity.",
      "10th and 12th certificates and marksheets.",
      "NEET scorecard / qualification certificate where applicable.",
      "Passport photographs and medical fitness documents.",
      "Apostille, translation and other documents requested in the official admission letter.",
    ],
    highlights: [
      "Public medical school in Osh, Kyrgyzstan.",
      "Medical instruction at the school began in 1993.",
      "International Medical Faculty program began in 2015.",
      "English is listed as the language of instruction for the International Medical Faculty program.",
      "Foreign students are admitted.",
      "IAAR reports five-year program accreditation from 30 May 2025 to 29 May 2030.",
      "Official university and WDOMS verification should be completed before admission.",
    ],
    facts: [
      { label: "School type", value: "Public" },
      { label: "City", value: "Osh" },
      { label: "School instruction started", value: "1993" },
      { label: "International program began", value: "2015" },
      { label: "Qualification", value: "Doctor of Medicine (M.D.)" },
      { label: "WDOMS curriculum duration", value: "5 years" },
      { label: "Language", value: "English" },
      { label: "Foreign students", value: "Admitted" },
    ],
    facilities: [
      "International Medical Faculty academic facilities.",
      "Clinical teaching and university-affiliated training facilities.",
      "Student services and accommodation require current written verification.",
    ],
    clinicalCenters: [
      "Clinical facilities and rotation arrangements must be confirmed directly with Osh State University for the student's intake.",
      "The additional internship year and its location, supervision, licence eligibility, and documentation must be verified in writing.",
    ],
    fmgePerformance: [
      {
        sourceName: "OSH STATE UNIVERSITY MEDICAL FACULTY",
        appeared: 2664,
        passed: 542,
        passRate: "20.35%",
      },
    ],
    history: [
      {
        year: "1993",
        text: "WDOMS reports that medical instruction at the school started in 1993.",
      },
      {
        year: "2015",
        text: "The English-medium International Medical Faculty program began.",
      },
      {
        year: "30 May 2025",
        text: "IAAR reports reaccreditation of General Medicine for five years.",
      },
      {
        year: "29 May 2030",
        text: "The current IAAR registry entry is scheduled to expire on this date.",
      },
      {
        year: "May 2026",
        text: "The final Kyrgyz state accreditation result granted Osh State University a six-year accreditation term.",
      },
    ],
    disclaimer:
      "Osh State University is public, but public-university status does not validate any private agency quotation or contractor claim. Fees, service responsibility, internship, NMC/FMGL compliance, WDOMS details, visa, hostel, and payment instructions must be verified directly before admission.",
    pageExists: true,
  },
  accreditationOnlyUniversity({
    name: "Asian International University named after S. Tentishev",
    slug: "asian-international-university-named-after-s-tentishev",
    location: "Kant, Chuy Region, Kyrgyzstan",
    program:
      "General Medicine (MD): 5-year and 6-year English-medium programs",
    intake: "Current intake and admission dates to be verified",
    officialWebsiteName: "asmi.edu.kg",
    overview: [
      "The institution's official website identifies it as Asian International University named after Satkynbai Tentishev and also uses the name Tentishev Asian Medical Institute. The university reports that it was established in 2004 in Kant, Kyrgyzstan.",
      "The official academic information lists 5-year and 6-year General Medicine (MD) programs taught in English, a 5-year Dentistry program taught in English or Russian, and postgraduate programs. This page focuses on the medical program; the exact course structure for an international applicant must be confirmed in the current university curriculum.",
      "The university describes clinical teaching in Kant and Bishkek, medical-science teaching staff, hospital-based training, subject departments, and a simulation center for practical clinical skills.",
    ],
    accreditationStatus: "6-Year Accredited",
    accreditationLabel: "6-Year Accredited",
    recommendationLevel: "Recommended",
    recommendationMessage: recommendedMessage,
    feeNotes: [
      "The verified university fee structure is not yet published on this page and will be updated later.",
      "Students should obtain a current university-issued fee schedule before paying any tuition, hostel, admission, visa, or service charge.",
    ],
    highlights: [
      "Established in 2004 according to the institution's official website.",
      "General Medicine (MD) is listed in 5-year and 6-year English-medium formats.",
      "The academic structure includes therapeutic, surgical, morphological, obstetrics, pediatrics, interprofessional, natural and human sciences, and dentistry disciplines.",
      "The official website describes clinical teaching at hospitals and medical institutions in Kant and Bishkek.",
    ],
    facts: [
      { label: "Established", value: "2004" },
      { label: "City", value: "Kant" },
      { label: "Medical program", value: "MD: 5 or 6 years" },
      { label: "Instruction", value: "English listed" },
    ],
    facilities: [
      "Simulation center with high-fidelity mannequins, medical phantoms, anatomical models, virtual simulators, and clinical task trainers.",
      "Specialized simulation rooms for ultrasound, ECG, CPR and emergency care, gynecology, pediatrics, surgery, dentistry, pharmacology, injections, and procedural skills.",
      "Clinical-skills training with audio-video monitoring, debriefing, and OSCE-oriented assessment.",
      "Hospital and clinical training bases described by the institution in Kant and Bishkek.",
    ],
    history: [
      {
        year: "2004",
        text: "The institution reports that Asian Medical Institute was established in Kant.",
      },
      {
        year: "May 2026",
        text: "The final Kyrgyz state accreditation results placed the institution in the six-year accredited group.",
      },
    ],
    fmgePerformance: [
      {
        sourceName: "S TENTISHEV ASIAN MEDICAL INSTITUTE",
        appeared: 2223,
        passed: 352,
        passRate: "15.83%",
      },
      {
        sourceName: "TENTISHEV SATKYNBAY MEMORIAL ASAIN MEDICAL INSTITUTE",
        appeared: 3,
        passed: 1,
        passRate: "33.33%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name:
      "Educational, Scientific and Production Complex International University of Kyrgyzstan",
    slug: "international-university-of-kyrgyzstan",
    location: "Bishkek, Kyrgyzstan",
    program:
      "International School of Medicine medical program — verify current official title",
    accreditationStatus: "6-Year Accredited",
    accreditationLabel: "6-Year Accredited",
    recommendationLevel: "Recommended",
    recommendationMessage: recommendedMessage,
    highlights: [
      "Listed in the final June 2026 report among four institutions receiving six-year state accreditation.",
      "Not the same institution as Kyrgyz International University NRZ, which was listed among institutions that did not participate before the deadline.",
    ],
    facts: [
      { label: "State accreditation", value: "6 years" },
      { label: "City", value: "Bishkek" },
      { label: "Medical school", value: "International School of Medicine" },
    ],
    history: [
      {
        year: "May 2026",
        text: "Received six-year state accreditation in the final Kyrgyz medical-education accreditation results.",
      },
    ],
    disclaimer:
      "Verify the exact legal institution name on the offer letter. Educational, Scientific and Production Complex International University of Kyrgyzstan is distinct from Kyrgyz International University NRZ.",
    pageExists: true,
  }),
  {
    name: "Kyrgyz State Medical Academy",
    slug: "kyrgyz-state-medical-academy",
    location: "Bishkek, Kyrgyzstan",
    program: "Medical Doctor Program (MBBS)",
    intake: "2026 Intake",
    accreditationStatus: "Not Subject to 2026 State Accreditation",
    accreditationLabel: "Not Subject to 2026 State Accreditation",
    recommendationLevel: "Recommended",
    recommendationMessage: ksmaRegulatorMessage,
    feeRows: [
      {
        year: "Year 1*",
        semester: "Semester 1*",
        tuitionFee: "$5500",
        hostelAccommodation: "$0*",
        mess: "$750",
        totalCost: "$6250",
      },
      {
        year: "Year 1",
        semester: "Semester 2",
        tuitionFee: "$3000",
        hostelAccommodation: "$0*",
        mess: "$750",
        totalCost: "$3750",
      },
      {
        year: "Year 2",
        semester: "Semester 3",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 2",
        semester: "Semester 4",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 3",
        semester: "Semester 5",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 3",
        semester: "Semester 6",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 4",
        semester: "Semester 7",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 4",
        semester: "Semester 8",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 5",
        semester: "Semester 9",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 5",
        semester: "Semester 10",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
      {
        year: "Year 6",
        semester: "Semester 11",
        tuitionFee: "$2100",
        hostelAccommodation: "$300",
        mess: "Optional",
        totalCost: "$2400",
      },
    ],
    additionalFees: [
      { label: "Premium Training Program", amount: "₹1,25,000" },
      { label: "Visa & Air-ticket Fee", amount: "₹75,000" },
    ],
    feeNotes: [
      "Duration of course: As per NMC guidelines.",
      "Course includes clinical rotatory internship.",
      "Tuition fee includes invitation fee, admission fee and hostel fee, for first year.",
      "Mess fee is $750/sem.",
      "Accommodation is mandatory for first year.",
      "1st semester tuition fee, admission charges, hostel full academic year, invitation charges, translation into local language documents and immigration approval are included as noted in the brochure.",
      "Hostel stay is compulsory for 1st and 2nd semester and must be paid before arriving the destination country.",
    ],
    paymentTerms: [
      "Tuition fees and hostel-mess fees must be paid in advance, as per the schedule specified by University.",
      "Prior to the commencement of each semester, students are required to settle all tuition and semester fees.",
      "Failure to make payment will result in the student being ineligible to proceed to the next semester.",
      "Students opting for financial loan services shall ensure the process is completed prior to their travel confirmation.",
      "Failure to meet payment deadlines may result in late payment penalties or additional charges.",
      "Upon obtaining a visa and officially commencing classes, students will be charged for one semester's fee.",
      "Refunds for tuition fees and other charges are subject to the university's refund policy and will be calculated based on the services availed by the student.",
    ],
    entryRequirements: [
      "Completed intermediate education (12 years) equivalent to secondary education.",
      "50% scores in Biology, Physics, Chemistry, and English.",
      "NEET qualification / entrance exam, if applicable.",
    ],
    documentChecklist: [
      "High school certificate (10th Grade) and marksheet.",
      "Secondary School (12th Grade) marksheet.",
      "NEET passing certificate.",
      "Passport with 6 months of validity.",
      "Aadhar Card & PAN Card.",
    ],
    highlights: [
      "Global recognition.",
      "Diverse student community.",
      "Comprehensive clinical training.",
      "Medical research exposure.",
      "Strong alumni network.",
      "Exposure to modern medical technologies.",
      "Internship opportunities in affiliated hospitals.",
      "Advanced simulation labs for practical learning.",
      "Strong emphasis on patient care and clinical skills.",
      "Special focus on FMGE, USMLE, and PLAB training from 1st year.",
      "Latest National Medical Commission (NMC) compliant MBBS curriculum.",
    ],
    facts: [
      { label: "Total number of students", value: "11778+" },
      { label: "International students", value: "3744" },
      { label: "Residents", value: "2046" },
      { label: "Postgraduate students", value: "173" },
      { label: "Total staff", value: "1600" },
      { label: "Teaching staff", value: "973" },
      { label: "Staff with academic degrees", value: "492" },
      { label: "Academicians-members of National Academy of Science", value: "6" },
      { label: "Inclusive educational program", value: "1" },
      { label: "Pre-university preparatory course", value: "2" },
      { label: "Undergraduate educational programs", value: "7" },
      { label: "Residency programs", value: "112" },
      { label: "Advanced learning programs", value: "43" },
      { label: "Postgraduate programs", value: "80" },
      { label: "Academic buildings", value: "5" },
      { label: "Academic clinics", value: "4" },
      { label: "Learning, scientific & research centers", value: "9" },
      { label: "State-based clinical bases", value: "285" },
      { label: "Copies of information and library resources", value: "620 000" },
      { label: "Books in English", value: "8000" },
      { label: "E-resources", value: "4431" },
      { label: "Reading halls", value: "7" },
      { label: "Total seats in reading halls", value: "300" },
      { label: "E-readers", value: "500" },
      { label: "E-resources halls", value: "3" },
      { label: "Interinstitutional agreements", value: "168" },
      { label: "Partners from countries", value: "30" },
      { label: "Membership in international organizations", value: "12" },
      { label: "Outgoing academic mobilities of students and staff", value: "200" },
    ],
    facilities: [
      "Hostel and mess.",
      "Indian food shown in brochure.",
      "Computer lab.",
      "Study rooms.",
      "Gym.",
      "Sports ground.",
      "Campus buildings and landscaped student areas.",
      "Library and e-resource halls.",
    ],
    clinicalCenters: [
      "Center for Clinical Skills Development and Knowledge Assessment, established in 2013 with financial and technical support of the Swiss Embassy in Kyrgyzstan, where students, residents and interns train clinical skills on simulators and dummies and pass computer testing and OSCE.",
      "Intersectoral Educational and Scientific Center for Biomedical Research, integrating university and academic science with PCR, biochemical and pathomorphology labs.",
      "Educational, medical and scientific Medical Center providing surgical operations, internal organ diagnostics and dentistry services.",
      "Diagnostic Medical Center providing diagnostic services including ultrasound, REG, gastroscopy, colonoscopy and X-ray examination, with services of optometrist, ENT, gastroenterologist, dermatologist, endocrinologist and physiotherapist.",
      "Dental Educational, Scientific and Clinical Center for professional training of dentistry students and postgraduate dentists.",
      "Center for Distance Learning and Advanced Training for clinical residents and medical teachers.",
      "Pre-University Training Center.",
      "Foreign Language Learning Center established in 2016 with support of the European TEMPUS program.",
    ],
    fmgePerformance: [
      {
        sourceName:
          "I K AKHUNBAEV KYRGYZ STATE MEDICAL ACADEMY FACULTY OF GENERAL MEDICINE",
        appeared: 1038,
        passed: 237,
        passRate: "22.83%",
      },
    ],
    history: [
      {
        year: "1939",
        text: "The first Kyrgyz medical institution was established by Resolution No. 517 dated April 16, 1939 of the Council of People's Commissars of the Kyrgyz SSR.",
      },
      {
        year: "1996",
        text: "By decree of the President of the Kyrgyz Republic, the Kyrgyz State Medical Institute was transformed into the Kyrgyz State Medical Academy.",
      },
      {
        year: "2008",
        text: "The Kyrgyz State Medical Academy was named after the great Kyrgyz cardio surgeon Isa Akhunbaev.",
      },
      {
        year: "2021",
        text: 'Kyrgyz State Medical Academy was awarded with the national significant "Dank" award for special services to the state.',
      },
      {
        year: "2022",
        text: "By decree of the President of the Kyrgyz Republic, the Kyrgyz State Medical Academy was granted a Special Status.",
      },
      {
        year: "2023-2027",
        text: "KSMA undertakes its own development strategy and action plan for the implementation of this strategy.",
      },
    ],
    studentExamples: [
      "ANUSHKA GOLUI - KSMA 2025-26",
      "DHRUBA MONDAL - KSMA 2025-26",
      "ABDUL HAKIM SK - KSMA 2025-26",
      "KINGSUKH JANA - KSMA 2025-26",
      "NAJNIN PARVIN - KSMA 2025-26",
      "RUPESH KUMAR - KSMA 2025-26",
      "SAYAN NASKAR - KSMA 2025-26",
      "MD Saabit Al Fasal Khan - KSMA 2025-26",
      "JASMIN KHATUN - KSMA 2025-26",
      "RABIA HASHMI - KSMA 2025-26",
    ],
    fmgePassedExamples: [
      "Dr. Roni Akhter - Medical Officer at Shantipur Municipality",
      "Dr. PRITISH KANSARY - Medical Officer at Erashal Rural Hospital, Nandigram",
      "Dr. Utsab Sanbighna - Medical Officer at Renaissance Hospital, Rajarhat",
      "Dr. Fateha Khatun - Internship at North Bengal Medical College",
      "Dr. Habibur Rahaman - Internship at NRS Medical College",
      "Dr. Anjuman Yeasmin - Internship at Burdwan Medical College Hospital",
      "Dr. SHABNAM AKTAR - FMGE Passed Dec'2025, FMGE Score: 191",
      "Dr. DEBARGHYA GHOSH - FMGE Passed Dec'2025, FMGE Score: 214",
      "Dr. SHOAIB ANJUM - FMGE Passed Dec'2025, FMGE Score: 218",
      "Dr. SUSMITA BALMIKI - FMGE Passed Dec'2025, FMGE Score: 160",
      "Dr. SEKENDER SEIKH - FMGE Passed Dec'2025, FMGE Score: 199",
      "Dr. RAKIB HOSSAIN MOLLA - FMGE Passed Dec'2025, FMGE Score: 187",
    ],
    disclaimer: kyrgyzFinalDisclaimer,
    pageExists: true,
  },
  accreditationOnlyUniversity({
    name: "Kyrgyz-Russian Slavic University",
    slug: "kyrgyz-russian-slavic-university",
    accreditationStatus: "Not Subject to 2026 State Accreditation",
    accreditationLabel: "Not Subject to 2026 State Accreditation",
    recommendationLevel: "Recommended",
    recommendationMessage: statutoryExemptionMessage,
    fmgePerformance: [
      {
        sourceName: "KYRGYZ RUSSIAN SLAVIC STATE UNIVERSITY KRSU MEDICAL FACULTY",
        appeared: 176,
        passed: 45,
        passRate: "25.57%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "Kyrgyz-Turkish Manas University",
    slug: "kyrgyz-turkish-manas-university",
    accreditationStatus: "Not Subject to 2026 State Accreditation",
    accreditationLabel: "Not Subject to 2026 State Accreditation",
    recommendationLevel: "Recommended",
    recommendationMessage: statutoryExemptionMessage,
  }),
  accreditationOnlyUniversity({
    name: "Jusup Balasagyn Kyrgyz National University",
    slug: "jusup-balasagyn-kyrgyz-national-university",
    location: "Bishkek, Kyrgyzstan",
    program: "Medical program details to be updated",
    overview: [
      "Jusup Balasagyn Kyrgyz National University is listed here as a Bishkek higher-education institution with a medical program requiring applicant-level verification.",
      "Its May 2026 result was a one-year conditional accreditation rather than a six-year accreditation. Fees, curriculum, English-medium delivery, clinical training, and internship details will be added after official verification.",
    ],
    accreditationStatus: "1-Year Conditional Accreditation",
    accreditationLabel: "1-Year Conditional Accreditation",
    recommendationLevel: "Not Recommended",
    recommendationMessage: conditionalMessage,
    fmgePerformance: [
      {
        sourceName: "KYRGYZ NATIONAL UNIVERSITY NAMED AFTER JUSUP BALASAGYN",
        appeared: 1,
        passed: 0,
        passRate: "0.00%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "Jalal-Abad State University",
    slug: "jalal-abad-state-university",
    location: "Jalal-Abad, Kyrgyzstan",
    program:
      "General Medicine, Pharmacy, and General Medicine for foreign students with 12-year prior education",
    intake: "Current intake and admission dates to be verified",
    officialWebsiteName: "jasu.kg",
    overview: [
      "Jalal-Abad State University named after B. Osmonov is a state university founded in 1993. Its official medical-faculty website presents General Medicine and Pharmacy education and a General Medicine pathway for foreign students who completed 12 years of prior education.",
      "The medical faculty describes competency-based teaching that integrates biomedical, clinical, behavioral, and social sciences with research and clinical practice. The official site also lists theoretical and clinical departments, laboratories, practical-learning centers, and hospital-based training.",
      "The official faculty information says that clinical departments use regional hospitals, family-medicine centers, territorial hospitals, maternity services, and other medical institutions as training bases. Applicants must verify the current English-medium curriculum, duration, internship arrangement, and clinical-rotation schedule in writing.",
    ],
    accreditationStatus: "1-Year Conditional Accreditation",
    accreditationLabel: "1-Year Conditional Accreditation",
    recommendationLevel: "Not Recommended",
    recommendationMessage: conditionalMessage,
    feeNotes: [
      "The verified university fee structure is not yet published on this page and will be updated later.",
      "Students should obtain a current university-issued fee schedule before paying any tuition, hostel, admission, visa, or service charge.",
    ],
    highlights: [
      "State university founded in 1993.",
      "The official medical-faculty site lists General Medicine, Pharmacy, and a General Medicine pathway for foreign students.",
      "The medical faculty describes theoretical and clinical departments, practical-learning centers, and multiple scientific and teaching laboratories.",
      "Clinical training is described across regional hospitals, family-medicine centers, territorial hospitals, and specialist medical institutions.",
    ],
    facts: [
      { label: "University founded", value: "1993" },
      { label: "Medical faculty", value: "Founded 1994" },
      { label: "City", value: "Jalal-Abad" },
      { label: "Status", value: "Public university" },
    ],
    facilities: [
      "Centers for integrative and practical learning.",
      "Scientific, clinical-biochemistry, pharmaceutical, morphological, toxicological-chemistry, drug-technology, and experimental-modeling laboratories.",
      "Lecture halls, library facilities, computer rooms, educational and laboratory rooms, an anatomical hall, and 3D anatomy tables described by the medical faculty.",
      "Clinical-skills centers with demonstration and assessment mannequins.",
      "Separate student hostel arrangements and a student canteen are described by the faculty website.",
    ],
    history: [
      {
        year: "2 April 1993",
        text: "Jalal-Abad State University was founded as a state educational institution.",
      },
      {
        year: "1994",
        text: "The official site reports the establishment of the Faculty of Medicine.",
      },
      {
        year: "May 2026",
        text: "The final Kyrgyz state accreditation results placed the university in the one-year conditional accreditation group.",
      },
    ],
    fmgePerformance: [
      {
        sourceName: "JALAL ABAD STATE UNIVERSITY MEDICAL FACULTY",
        appeared: 1863,
        passed: 354,
        passRate: "19.00%",
      },
      {
        sourceName: "JALAL ABAD STATE UNIVERSITY NAMED AFTER B OSMONOV",
        appeared: 7,
        passed: 2,
        passRate: "28.57%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "Kyrgyz-Uzbek International University",
    slug: "kyrgyz-uzbek-international-university",
    location: "Osh, Kyrgyzstan",
    program: "Medical program details to be updated",
    overview: [
      "Kyrgyz-Uzbek International University named after B. Sydykov is located in Osh. Its medical-program curriculum, language, duration, internship, and current admission terms will be added after official verification.",
      "The university received one-year conditional accreditation in the May 2026 medical-education review. This page therefore records the institution separately from universities holding six-year accreditation.",
    ],
    accreditationStatus: "1-Year Conditional Accreditation",
    accreditationLabel: "1-Year Conditional Accreditation",
    recommendationLevel: "Not Recommended",
    recommendationMessage: conditionalMessage,
    fmgePerformance: [
      {
        sourceName: "KYRGYZ UZBEK UNIVERSITY MEDICAL FACULTY",
        appeared: 1,
        passed: 0,
        passRate: "0.00%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "Issyk-Kul State University",
    slug: "issyk-kul-state-university",
    location: "Karakol, Kyrgyzstan",
    program: "Medical program details to be updated",
    overview: [
      "Issyk-Kul State University is a public higher-education institution in Karakol. Verified medical-program, fee, language, clinical-training, and internship details will be added after review of current official documents.",
      "The institution was placed in the one-year conditional accreditation group in the May 2026 medical-education review.",
    ],
    accreditationStatus: "1-Year Conditional Accreditation",
    accreditationLabel: "1-Year Conditional Accreditation",
    recommendationLevel: "Not Recommended",
    recommendationMessage: conditionalMessage,
  }),
  accreditationOnlyUniversity({
    name: "Jalal-Abad International University",
    slug: "jalal-abad-international-university",
    location: "Jalal-Abad, Kyrgyzstan",
    program: "Medical program details to be updated",
    overview: [
      "Jalal-Abad International University is a separate institution in Jalal-Abad and must not be confused with the public Jalal-Abad State University named after B. Osmonov.",
      "The university received one-year conditional accreditation in the May 2026 medical-education review. Fees and complete academic details will be added after official verification.",
    ],
    accreditationStatus: "1-Year Conditional Accreditation",
    accreditationLabel: "1-Year Conditional Accreditation",
    recommendationLevel: "Not Recommended",
    recommendationMessage: conditionalMessage,
    fmgePerformance: [
      {
        sourceName: "JALAL ABAD INTERNATIONAL UNIVERSITY",
        appeared: 1,
        passed: 1,
        passRate: "100.00%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "University of South Asia",
    slug: "university-of-south-asia",
    location: "Tokmok, Kyrgyzstan",
    program: "Medical program details to be updated",
    overview: [
      "University of South Asia is located in Tokmok, Kyrgyzstan. Its current medical curriculum, teaching language, duration, internship, clinical bases, and fee structure will be added after official verification.",
      "The institution received one-year conditional accreditation in the May 2026 medical-education review.",
    ],
    accreditationStatus: "1-Year Conditional Accreditation",
    accreditationLabel: "1-Year Conditional Accreditation",
    recommendationLevel: "Not Recommended",
    recommendationMessage: conditionalMessage,
  }),
  accreditationOnlyUniversity({
    name: "International European University",
    slug: "international-european-university",
    location: "Bishkek, Kyrgyzstan",
    program: "Medical program details to be updated",
    overview: [
      "International European University is located in Bishkek. Verified information about its medical curriculum, course duration, teaching language, internship, clinical training, and fees will be added later.",
      "The institution received one-year conditional accreditation in the May 2026 medical-education review and should be evaluated separately from universities holding six-year accreditation.",
    ],
    accreditationStatus: "1-Year Conditional Accreditation",
    accreditationLabel: "1-Year Conditional Accreditation",
    recommendationLevel: "Not Recommended",
    recommendationMessage: conditionalMessage,
    fmgePerformance: [
      {
        sourceName: "INTERNATIONAL EUROPEAN UNIVERSITY FACULTY OF MEDICINE",
        appeared: 4,
        passed: 0,
        passRate: "0.00%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "Avicenna International Medical University",
    slug: "avicenna-international-medical-university",
    accreditationStatus: "Did Not Pass State Accreditation",
    accreditationLabel: "Did Not Pass State Accreditation",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotPassMessage,
    fmgePerformance: [
      {
        sourceName: "AVICENNA INTERNATIONAL MEDICAL UNIVERSITY",
        appeared: 33,
        passed: 7,
        passRate: "21.21%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "ADAM University",
    slug: "adam-university",
    accreditationStatus: "Did Not Pass State Accreditation",
    accreditationLabel: "Did Not Pass State Accreditation",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotPassMessage,
  }),
  accreditationOnlyUniversity({
    name: "Royal Metropolitan University",
    slug: "royal-metropolitan-university",
    accreditationStatus: "Did Not Pass State Accreditation",
    accreditationLabel: "Did Not Pass State Accreditation",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotPassMessage,
    fmgePerformance: [
      {
        sourceName: "ROYAL METROPOLITAN UNIVERSITY",
        appeared: 87,
        passed: 6,
        passRate: "6.90%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "Altamimi International University",
    slug: "altamimi-international-university",
    accreditationStatus: "Did Not Pass State Accreditation",
    accreditationLabel: "Did Not Pass State Accreditation",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotPassMessage,
    fmgePerformance: [
      {
        sourceName: "ALTAMIMI INTERNATIONAL UNIVERSITY",
        appeared: 1,
        passed: 0,
        passRate: "0.00%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "Ala-Too International University",
    slug: "ala-too-international-university",
    accreditationStatus: "Did Not Pass State Accreditation",
    accreditationLabel: "Did Not Pass State Accreditation",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotPassMessage,
  }),
  accreditationOnlyUniversity({
    name: "International Medical University",
    slug: "international-medical-university",
    accreditationStatus: "Did Not Pass State Accreditation",
    accreditationLabel: "Did Not Pass State Accreditation",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotPassMessage,
    fmgePerformance: [
      {
        sourceName: "INTERNATIONAL MEDICAL UNIVERSITY",
        appeared: 868,
        passed: 135,
        passRate: "15.55%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "Kyrgyz Medical and Dental Institute",
    slug: "kyrgyz-medical-and-dental-institute",
    accreditationStatus: "Did Not Pass State Accreditation",
    accreditationLabel: "Did Not Pass State Accreditation",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotPassMessage,
  }),
  accreditationOnlyUniversity({
    name: "Salymbekov University",
    slug: "salymbekov-university",
    accreditationStatus: "Did Not Pass State Accreditation",
    accreditationLabel: "Did Not Pass State Accreditation",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotPassMessage,
    fmgePerformance: [
      {
        sourceName: "SALYMBEKOV UNIVERSITY FACULTY OF MEDICINE",
        appeared: 29,
        passed: 13,
        passRate: "44.83%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "Eurasian International University",
    slug: "eurasian-international-university",
    accreditationStatus: "Did Not Pass State Accreditation",
    accreditationLabel: "Did Not Pass State Accreditation",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotPassMessage,
    fmgePerformance: [
      {
        sourceName: "EURASIAN INTERNATIONAL MEDICAL UNIVERSITY FACULTY OF MEDICINE",
        appeared: 55,
        passed: 4,
        passRate: "7.27%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "Bishkek International Medical Institute",
    slug: "bishkek-international-medical-institute",
    accreditationStatus: "Did Not Pass State Accreditation",
    accreditationLabel: "Did Not Pass State Accreditation",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotPassMessage,
    fmgePerformance: [
      {
        sourceName: "BISHKEK INTERNATIONAL MEDICAL INSTITUTE",
        appeared: 168,
        passed: 27,
        passRate: "16.07%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "International University of Medicine and Science",
    slug: "international-university-of-medicine-and-science",
    accreditationStatus: "Did Not Pass State Accreditation",
    accreditationLabel: "Did Not Pass State Accreditation",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotPassMessage,
    fmgePerformance: [
      {
        sourceName: "INTERNATIONAL UNIVERSITY OF SCIENCE AND MEDICINE IUSM",
        appeared: 253,
        passed: 18,
        passRate: "7.11%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "Central Asian International Medical University",
    slug: "central-asian-international-medical-university",
    accreditationStatus: "Did Not Pass State Accreditation",
    accreditationLabel: "Did Not Pass State Accreditation",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotPassMessage,
    fmgePerformance: [
      {
        sourceName: "CENTRAL ASIAN INTERNATIONAL MEDICAL UNIVERSITY",
        appeared: 47,
        passed: 9,
        passRate: "19.15%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "Osh International Medical University",
    slug: "osh-international-medical-university",
    location: "Osh, Kyrgyzstan",
    program: "General Medicine in English — Doctor of Medicine (M.D.)",
    intake: "Verify directly before admission",
    accreditationStatus: "Did Not Pass State Accreditation",
    accreditationLabel: "Did Not Pass State Accreditation",
    recommendationLevel: "No Admission",
    recommendationMessage:
      "Do not confuse this private institution with Osh State University Medical Faculty. Osh International Medical University is a separate WDOMS-listed private university and was listed among the institutions that did not pass the May 2026 state accreditation. ILMALINK MEDIGO does not recommend new admission unless a fresh official accreditation decision supersedes that result. Verify that every offer letter states the exact university name.",
    entryRequirements: [
      "Completion of secondary education.",
      "An entrance examination is required.",
      "Foreign students are admitted.",
      "Both men and women are admitted.",
    ],
    highlights: [
      "Separate private university; not part of Osh State University.",
      "WDOMS program: General Medicine in English.",
      "Qualification: Doctor of Medicine (M.D.).",
      "English-medium program instruction began in 2020.",
      "WDOMS curriculum duration: 5 years.",
      "Did not pass the May 2026 Kyrgyz state accreditation.",
    ],
    facts: [
      { label: "School type", value: "Private" },
      { label: "WDOMS school ID", value: "F0006391" },
      { label: "Program began", value: "2020" },
      { label: "Curriculum duration", value: "5 years" },
      { label: "Language", value: "English" },
      { label: "Qualification", value: "Doctor of Medicine (M.D.)" },
      { label: "Foreign students", value: "Admitted" },
      { label: "Entrance exam", value: "Required" },
    ],
    history: [
      {
        year: "2020",
        text: "WDOMS reports that instruction for the General Medicine in English program began in 2020.",
      },
      {
        year: "May 2026",
        text: "The Kyrgyz Ministry of Health listed Osh International Medical University among the medical institutions that did not pass state accreditation.",
      },
    ],
    disclaimer:
      "Identity warning: Osh International Medical University is a separate private institution and must not be confused with the accredited public Osh State University Medical Faculty. Check the exact legal university name, WDOMS school ID, accreditation status, program, and payment recipient on every offer letter and invoice.",
    pageExists: true,
    fmgePerformance: [
      {
        sourceName: "OSH INTERNATIONAL MEDICAL UNIVERSITY",
        appeared: 162,
        passed: 13,
        passRate: "8.02%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "Ishenaly Arabaev Kyrgyz State University",
    slug: "ishenaly-arabaev-kyrgyz-state-university",
    accreditationStatus: "Did Not Participate / Not Verified",
    accreditationLabel: "Did Not Participate / Not Verified",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotParticipateMessage,
  }),
  accreditationOnlyUniversity({
    name: "Batken State University",
    slug: "batken-state-university",
    accreditationStatus: "Did Not Participate / Not Verified",
    accreditationLabel: "Did Not Participate / Not Verified",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotParticipateMessage,
  }),
  accreditationOnlyUniversity({
    name: "Satybaldy Naamatov Naryn State University",
    slug: "satybaldy-naamatov-naryn-state-university",
    accreditationStatus: "Did Not Participate / Not Verified",
    accreditationLabel: "Did Not Participate / Not Verified",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotParticipateMessage,
  }),
  accreditationOnlyUniversity({
    name: "Kyrgyz National Agrarian University",
    slug: "kyrgyz-national-agrarian-university",
    accreditationStatus: "Did Not Participate / Not Verified",
    accreditationLabel: "Did Not Participate / Not Verified",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotParticipateMessage,
  }),
  accreditationOnlyUniversity({
    name: "International University of Science and Business",
    slug: "international-university-of-science-and-business",
    accreditationStatus: "Did Not Participate / Not Verified",
    accreditationLabel: "Did Not Participate / Not Verified",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotParticipateMessage,
    fmgePerformance: [
      {
        sourceName:
          "INTERNATIONAL MEDICAL INSTITUTE INTERNATIONAL UNIVERSITY OF SCIENCE AND BUSINESS",
        appeared: 3,
        passed: 0,
        passRate: "0.00%",
      },
    ],
  }),
  accreditationOnlyUniversity({
    name: "Kyrgyz International University NRZ",
    slug: "kyrgyz-international-university-nrz",
    accreditationStatus: "Did Not Participate / Not Verified",
    accreditationLabel: "Did Not Participate / Not Verified",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotParticipateMessage,
  }),
  accreditationOnlyUniversity({
    name: "Zamanbap Medical Institute",
    slug: "zamanbap-medical-institute",
    accreditationStatus: "Did Not Participate / Not Verified",
    accreditationLabel: "Did Not Participate / Not Verified",
    recommendationLevel: "No Admission",
    recommendationMessage: didNotParticipateMessage,
  }),
];

export const kyrgyzstanUniversityDirectory = kyrgyzstanUniversities.filter(
  (university, index, universities) =>
    university.slug !== "international-higher-school-of-medicine" &&
    universities.findIndex((item) => item.slug === university.slug) === index,
);

export function getKyrgyzUniversityBySlug(slug: string) {
  return kyrgyzstanUniversities.find((university) => university.slug === slug);
}
