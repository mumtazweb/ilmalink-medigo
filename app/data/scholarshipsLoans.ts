export type StudyDestination = "India" | "Abroad";

export type StudentState =
  | "West Bengal"
  | "Bihar"
  | "Delhi"
  | "Karnataka"
  | "Kerala"
  | "Maharashtra"
  | "Uttar Pradesh"
  | "Other State";

export type CommunityCategory =
  | "All"
  | "General"
  | "Muslim Minority"
  | "Other Minority"
  | "SC"
  | "ST"
  | "OBC"
  | "EWS"
  | "PwD";

export type Gender = "Male" | "Female" | "Other";

export type IncomeBand =
  | "Below ₹1 lakh"
  | "₹1-2.5 lakh"
  | "₹2.5-4.5 lakh"
  | "₹4.5-8 lakh"
  | "Above ₹8 lakh";

export type AdmissionType =
  | "Government MBBS India"
  | "Private MBBS India"
  | "MBBS Abroad"
  | "Counselling not completed yet";

export type SupportType =
  | "scholarship"
  | "loan"
  | "interest subsidy"
  | "minority finance"
  | "community support"
  | "charitable support"
  | "student credit card"
  | "bank loan"
  | "ILMALINK support";

export type SourceType = "official" | "verified" | "needs-check";

export type ApplicableFor = "India" | "Abroad" | "Both";

export type ScholarshipLoanScheme = {
  id: string;
  title: string;
  shortTitle: string;
  type: SupportType;
  applicableFor: ApplicableFor;
  eligibleStates: Array<StudentState | "All India">;
  eligibleCommunities: CommunityCategory[];
  incomeLimit: {
    label: string;
    maxAnnualIncome: number | null;
  };
  marksRequirement: {
    minimumPercentage: number | null;
    note: string;
  };
  genderEligibility: "All" | "Female" | "Female concession may apply";
  destinationEligibility: StudyDestination[];
  admissionTypeEligibility: AdmissionType[];
  maxAmount: string;
  interestRate: string;
  repayment: string;
  moratorium: string;
  benefitDescription: string;
  whyUsefulForMBBS: string;
  officialWebsite: string;
  applyRoute: string;
  documents: string[];
  importantNotes: string[];
  priorityScore: number;
  sourceType: SourceType;
  lastVerifiedDate: string;
  tags: string[];
  isInternalIlmalinkSupport: boolean;
};

export const lastScholarshipsLoansVerificationDate = "2026-06-13";

export const documentsChecklist = [
  "Class 10 marksheet",
  "Class 12 marksheet",
  "NEET score/rank",
  "NEET admit card",
  "Admission letter",
  "Allotment letter if applicable",
  "Fee structure",
  "Fee receipt",
  "Bonafide certificate",
  "Income certificate",
  "Domicile certificate",
  "Caste/category certificate if applicable",
  "Minority/religion certificate if applicable",
  "Disability certificate if applicable",
  "Aadhaar / ID proof",
  "Passport for abroad",
  "Student bank details",
  "Parent/co-applicant PAN/Aadhaar",
  "Parent/co-applicant income proof",
  "Property/collateral documents if required by lender",
  "Passport-size photo",
];

const baseAcademicDocuments = [
  "Class 10 marksheet",
  "Class 12 marksheet",
  "NEET score/rank if applicable",
  "Admission letter or allotment letter",
  "Fee structure",
  "Income certificate",
  "Identity proof",
  "Bank account details",
];

const categoryDocuments = [
  "Domicile certificate if applicable",
  "Caste/category/minority/disability certificate if applicable",
  "Passport-size photo",
];

export const scholarshipLoanSchemes: ScholarshipLoanScheme[] = [
  {
    id: "ilmalink-fee-support",
    title: "ILMALINK Scholarship & Fee Support",
    shortTitle: "ILMALINK Support",
    type: "ILMALINK support",
    applicableFor: "Both",
    eligibleStates: ["All India"],
    eligibleCommunities: ["All"],
    incomeLimit: {
      label: "No fixed public income limit; profile review is required.",
      maxAnnualIncome: null,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "No public marks cut-off; admission fit and documentation are reviewed case by case.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India", "Abroad"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "MBBS Abroad",
      "Counselling not completed yet",
    ],
    maxAmount: "Up to INR 3,00,000, subject to ILMALINK verification and approval.",
    interestRate: "Not a loan",
    repayment: "No repayment if approved as support or fee discount.",
    moratorium: "Not applicable",
    benefitDescription:
      "Admission-linked scholarship, fee discount, counselling support, documentation support or loan-guidance support may be reviewed by ILMALINK up to INR 3,00,000.",
    whyUsefulForMBBS:
      "It keeps ILMALINK support visible for every MBBS aspirant while clearly marking the estimate as subject to verification and approval.",
    officialWebsite: "https://www.ilmalink.com",
    applyRoute: "/",
    documents: [...baseAcademicDocuments, "Annual tuition fee estimate", "Admission processing details through ILMALINK"],
    importantNotes: [
      "ILMALINK will assist end-to-end after profile verification.",
      "Applicable only when admission is processed through ILMALINK MEDIGO.",
      "Subject to university/college/institute approval.",
      "Subject to available partner benefit, document verification and ILMALINK approval.",
      "Final amount is confirmed after profile and document review.",
    ],
    priorityScore: 1000,
    sourceType: "verified",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["ILMALINK", "Fee Support", "India", "Abroad", "Counselling"],
    isInternalIlmalinkSupport: true,
  },
  {
    id: "bank-education-loan-options",
    title: "Bank Education Loan Options",
    shortTitle: "Bank Education Loan",
    type: "bank loan",
    applicableFor: "Both",
    eligibleStates: ["All India"],
    eligibleCommunities: ["All"],
    incomeLimit: {
      label: "No single public income limit; depends on bank, co-applicant and credit profile.",
      maxAnnualIncome: null,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Banks usually review admission, course recognition, prior academics and repayment capacity.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India", "Abroad"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "MBBS Abroad",
      "Counselling not completed yet",
    ],
    maxAmount: "Depends on bank/NBFC rules, collateral, course, country and repayment capacity.",
    interestRate: "Bank-specific floating or fixed rate; check official bank portal.",
    repayment: "Depends on lender rules, co-applicant profile, moratorium and sanctioned loan terms.",
    moratorium: "Usually course period plus lender-defined grace period; check official sanction terms.",
    benefitDescription:
      "Students may apply through recognised bank education-loan routes, PM Vidyalaxmi where applicable, or official bank portals.",
    whyUsefulForMBBS:
      "A practical route for high-fee MBBS India or abroad plans when scholarship eligibility is limited or partial.",
    officialWebsite: "https://pmvidyalaxmi.co.in/",
    applyRoute: "https://pmvidyalaxmi.co.in/",
    documents: [
      ...baseAcademicDocuments,
      "Co-applicant PAN/Aadhaar",
      "Co-applicant income proof",
      "Collateral/property documents if required by lender",
      "Passport and visa documents for abroad if applicable",
    ],
    importantNotes: [
      "Approval depends on lender rules and document verification.",
      "Collateral, margin money, interest, moratorium and disbursement depend on the lender.",
      "Students must verify university recognition, country rules and bank policy.",
    ],
    priorityScore: 74,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["Bank Loan", "Education Loan", "India", "Abroad", "High Fee"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "pm-vidyalaxmi",
    title: "PM Vidyalaxmi Education Loan Route",
    shortTitle: "PM Vidyalaxmi",
    type: "interest subsidy",
    applicableFor: "India",
    eligibleStates: ["All India"],
    eligibleCommunities: ["All"],
    incomeLimit: {
      label: "Interest subvention may apply up to official income limits; check portal.",
      maxAnnualIncome: 800000,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Eligibility depends on the listed institution, loan product and official portal rules.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount:
      "Portal states credit guarantee support up to the official limit and interest subvention where applicable; students must check institution coverage.",
    interestRate:
      "Bank-specific education-loan interest; portal mentions interest support where eligible.",
    repayment: "As per bank sanction and PM Vidyalaxmi product terms.",
    moratorium: "As per bank sanction and official interest subvention rules.",
    benefitDescription:
      "A central digital route for eligible students to apply for education loans and claim interest support where applicable.",
    whyUsefulForMBBS:
      "Useful for India MBBS students only if the institution and loan product are covered by the current official rules.",
    officialWebsite: "https://pmvidyalaxmi.co.in/",
    applyRoute: "https://pmvidyalaxmi.co.in/",
    documents: [...baseAcademicDocuments, "Institution details", "Loan application documents required by selected bank"],
    importantNotes: [
      "Do not assume every MBBS college is covered.",
      "Students must check official portal eligibility, institution listing and bank rules.",
      "Subvention and guarantee support are subject to official limits and approval.",
    ],
    priorityScore: 67,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["PM Vidyalaxmi", "Education Loan", "Interest Support", "India"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "west-bengal-student-credit-card",
    title: "West Bengal Student Credit Card",
    shortTitle: "WBSCC",
    type: "student credit card",
    applicableFor: "Both",
    eligibleStates: ["West Bengal"],
    eligibleCommunities: ["All"],
    incomeLimit: {
      label: "No income cap shown on the main portal; domicile and official rules apply.",
      maxAnnualIncome: null,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "No general percentage criterion shown in official FAQ; course and institution recognition must be checked.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India", "Abroad"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "MBBS Abroad",
      "Counselling not completed yet",
    ],
    maxAmount: "Up to ₹10 lakh, subject to official rules.",
    interestRate: "4% simple annual interest, subject to official scheme rules.",
    repayment: "As per WBSCC and lending bank terms.",
    moratorium: "As per official scheme and bank rules.",
    benefitDescription:
      "Government-backed education-loan route for eligible West Bengal students studying in India or outside India.",
    whyUsefulForMBBS:
      "One of the most practical external loan routes for West Bengal MBBS aspirants, including abroad plans subject to official eligibility.",
    officialWebsite: "https://wbscc.wb.gov.in/",
    applyRoute: "https://wbscc.wb.gov.in/",
    documents: [
      ...baseAcademicDocuments,
      "Proof of West Bengal residence/domicile as required",
      "Parent/co-borrower documents",
      "Course and institution recognition documents",
    ],
    importantNotes: [
      "Approval is subject to domicile, age, course, institution, documents and lender verification.",
      "The official FAQ indicates outside-India study may be eligible, but students must verify current rules.",
      "Not a scholarship; repayment obligations apply.",
    ],
    priorityScore: 86,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["West Bengal", "Student Credit Card", "Loan", "India", "Abroad"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "wbmdfc-nmdfc-minority-education-loan",
    title: "WBMDFC / NMDFC Minority Education Loan",
    shortTitle: "WBMDFC / NMDFC Loan",
    type: "minority finance",
    applicableFor: "Both",
    eligibleStates: ["West Bengal", "All India"],
    eligibleCommunities: ["Muslim Minority", "Other Minority"],
    incomeLimit: {
      label: "Credit Line-1 up to ₹3 lakh family income; Credit Line-2 up to ₹8 lakh family income.",
      maxAnnualIncome: 800000,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Professional/job-oriented course admission and official verification are required.",
    },
    genderEligibility: "Female concession may apply",
    destinationEligibility: ["India", "Abroad"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "MBBS Abroad",
      "Counselling not completed yet",
    ],
    maxAmount: "Up to ₹20 lakh for India and up to ₹30 lakh for abroad, subject to NMDFC rules.",
    interestRate:
      "Credit Line-1 around 3% p.a.; Credit Line-2 around 8% p.a. with female concession where officially applicable.",
    repayment: "Maximum repayment after course completion is subject to official NMDFC/MILAN/WBMDFC terms.",
    moratorium: "Check official NMDFC/MILAN/WBMDFC route for current moratorium rules.",
    benefitDescription:
      "Concessional education loan for notified minority students pursuing technical and professional courses, including medical education where eligible.",
    whyUsefulForMBBS:
      "This loan is often a strong external route for eligible minority students from West Bengal and beyond. Final eligibility depends on income, documents and official verification.",
    officialWebsite: "https://nmdfc.org/credit-1",
    applyRoute: "https://milannmdfc.org/EL_SCHEME.aspx",
    documents: [
      ...baseAcademicDocuments,
      "Residence proof",
      "Minority/religion certificate if required",
      "Guarantor/security documents if required",
      "Any WBMDFC/MILAN/NMDFC documents requested by the official route",
    ],
    importantNotes: [
      "Approval depends on income, minority status, documents and official route verification.",
      "Depends on income, minority status, documents, course, fund availability and security/guarantee rules.",
      "West Bengal students should check WBMDFC as the state route and NMDFC/MILAN as the national/channel route.",
    ],
    priorityScore: 95,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["West Bengal", "Muslim Minority", "Minority", "NMDFC", "WBMDFC", "Loan", "Abroad"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "isdb-scholarship",
    title: "Islamic Development Bank Scholarship Programme, Jeddah",
    shortTitle: "IsDB Scholarship",
    type: "scholarship",
    applicableFor: "Both",
    eligibleStates: ["All India"],
    eligibleCommunities: ["Muslim Minority"],
    incomeLimit: {
      label: "Financial need and programme-specific rules apply; check official IsDB call.",
      maxAnnualIncome: null,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Academically meritorious students must meet current IsDB programme criteria.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India", "Abroad"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "MBBS Abroad",
      "Counselling not completed yet",
    ],
    maxAmount: "Programme benefits vary by scholarship stream; check the current IsDB booklet.",
    interestRate: "Not a conventional bank loan; programme obligations may apply.",
    repayment: "Check official IsDB scholarship agreement and service/community obligations.",
    moratorium: "Check official IsDB rules.",
    benefitDescription:
      "Highly competitive scholarship support for eligible Muslim students under IsDB programme rules.",
    whyUsefulForMBBS:
      "Relevant for meritorious Muslim MBBS aspirants because IsDB has historically supported fields including medicine, subject to the current call.",
    officialWebsite: "https://www.isdb.org/scholarships",
    applyRoute: "https://www.isdb.org/scholarships",
    documents: [
      ...baseAcademicDocuments,
      "Proof of community eligibility if required",
      "Admission/registration evidence",
      "Passport or national ID",
      "Medical fitness certificate if required",
    ],
    importantNotes: [
      "Highly competitive and subject to programme approval.",
      "Application windows change.",
      "Students must verify whether India, undergraduate medicine and the chosen institution are eligible in the current call.",
    ],
    priorityScore: 62,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["Muslim Minority", "IsDB", "Scholarship", "Medical", "Competitive"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "west-bengal-zakat-fund",
    title: "West Bengal Zakat Fund Scholarship",
    shortTitle: "WB Zakat Fund",
    type: "community support",
    applicableFor: "India",
    eligibleStates: ["West Bengal"],
    eligibleCommunities: ["Muslim Minority"],
    incomeLimit: {
      label: "Need-based Zakat verification; no fixed public income cap found.",
      maxAnnualIncome: null,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Preference may be given to higher/professional education including medical, subject to verification.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount: "Sanctioned as per scrutiny recommendation and availability of Zakat funds.",
    interestRate: "Not a loan if approved as Zakat support.",
    repayment: "No repayment if approved as charitable/Zakat support.",
    moratorium: "Not applicable",
    benefitDescription:
      "Community-funded support for needy students, with preference noted for professional disciplines including medical education.",
    whyUsefulForMBBS:
      "Useful as partial support for eligible West Bengal students who can document financial need and admission expenses.",
    officialWebsite: "https://wbzf.org/Scholarship",
    applyRoute: "https://wbzf.org/CommonRegitrationForm?scheme_id=1",
    documents: [...baseAcademicDocuments, ...categoryDocuments, "Need verification documents requested by WBZF"],
    importantNotes: [
      "Partial support depends on scrutiny and available funds.",
      "Amount depends on scrutiny committee recommendation and available Zakat funds.",
      "Students should check current application form and document rules.",
    ],
    priorityScore: 64,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["West Bengal", "Muslim Minority", "Zakat", "Charitable Support", "Medical"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "amp-indiazakat",
    title: "AMP Scholarship / IndiaZakat Higher Education Support",
    shortTitle: "AMP / IndiaZakat",
    type: "community support",
    applicableFor: "India",
    eligibleStates: ["All India"],
    eligibleCommunities: ["Muslim Minority"],
    incomeLimit: {
      label: "Need-based and Zakat-eligibility based; check current AMP/IndiaZakat cycle.",
      maxAnnualIncome: null,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Merit and need are reviewed by AMP/IndiaZakat selection or verification teams.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount: "AMP has announced minimum scholarship support in some cycles; crowdfunding amount varies by case.",
    interestRate: "Not a bank loan.",
    repayment: "No repayment if approved as scholarship/crowdfunding support.",
    moratorium: "Not applicable",
    benefitDescription:
      "Community scholarship and crowdfunding route for eligible higher education students seeking partial support.",
    whyUsefulForMBBS:
      "Can work as partial support for MBBS India students who meet the current cycle's eligibility and need criteria.",
    officialWebsite: "https://ampindia.org/amp_scholarship_fund",
    applyRoute: "https://indiazakat.com/",
    documents: [...baseAcademicDocuments, ...categoryDocuments, "Zakat eligibility or need documents requested by AMP/IndiaZakat"],
    importantNotes: [
      "Cause approval or scholarship application does not guarantee funding.",
      "Support is partial and depends on verification, selection and donors/fund availability.",
      "Students must check the current scholarship cycle.",
    ],
    priorityScore: 57,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["Muslim Minority", "AMP", "IndiaZakat", "Community Support", "Medical"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "gd-study-circle",
    title: "G.D. Charitable Society / G.D. Study Circle Education Support",
    shortTitle: "G.D. Study Circle",
    type: "charitable support",
    applicableFor: "India",
    eligibleStates: ["West Bengal"],
    eligibleCommunities: ["All"],
    incomeLimit: {
      label: "Need-based support; check official contact/source.",
      maxAnnualIncome: null,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Merit and financial hardship are reviewed during eligibility screening.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount: "Check official route; amount depends on eligibility rules and availability.",
    interestRate: "Check official source.",
    repayment: "Check official source.",
    moratorium: "Check official source.",
    benefitDescription:
      "Charitable education support network associated with G.D. Study Circle and G.D. Charitable Society.",
    whyUsefulForMBBS:
      "May be useful for financially weak and meritorious West Bengal students seeking partial education support.",
    officialWebsite: "https://gdstudycircle.org/",
    applyRoute: "https://gdstudycircle.org/",
    documents: [...baseAcademicDocuments, "Financial hardship documents", "Recommendation or contact documents if requested"],
    importantNotes: [
      "Official criteria and amount must be checked directly.",
      "Do not assume fixed MBBS scholarship amount.",
      "Support depends on eligibility verification and availability.",
    ],
    priorityScore: 43,
    sourceType: "needs-check",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["West Bengal", "Charitable Support", "Needs Verification"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "al-ameen-support",
    title: "Al-Ameen Educational Society / Al-Ameen Scholarship Support",
    shortTitle: "Al-Ameen Support",
    type: "charitable support",
    applicableFor: "India",
    eligibleStates: ["All India", "West Bengal", "Karnataka"],
    eligibleCommunities: ["All", "Muslim Minority"],
    incomeLimit: {
      label: "Need/merit/institution-based support; check official Al-Ameen source.",
      maxAnnualIncome: null,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Meritorious and economically disadvantaged students may be considered by relevant Al-Ameen institutions or networks.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount: "Check official source; no fixed MBBS amount should be assumed.",
    interestRate: "Check official source.",
    repayment: "Check official source.",
    moratorium: "Check official source.",
    benefitDescription:
      "Institutional or charitable education support that may be available through Al-Ameen education networks.",
    whyUsefulForMBBS:
      "Useful to check for students connected to Al-Ameen institutions, scholarship networks or minority education support channels.",
    officialWebsite: "https://alameeneducationalsociety.in/",
    applyRoute: "https://alameeneducationalsociety.in/",
    documents: [...baseAcademicDocuments, "Institution connection details if applicable", "Financial need documents"],
    importantNotes: [
      "Official criteria are not uniform across every Al-Ameen institution.",
      "Students must verify support availability directly.",
      "Do not assume a fixed scholarship amount.",
    ],
    priorityScore: 42,
    sourceType: "needs-check",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["Al-Ameen", "Charitable Support", "Minority Support", "Needs Verification"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "rd-sethna-loan-scholarship",
    title: "R.D. Sethna Loan Scholarship",
    shortTitle: "R.D. Sethna",
    type: "loan",
    applicableFor: "Both",
    eligibleStates: ["All India"],
    eligibleCommunities: ["All"],
    incomeLimit: {
      label: "Merit and need reviewed by trustees; guarantor rules apply.",
      maxAnnualIncome: null,
    },
    marksRequirement: {
      minimumPercentage: 50,
      note: "Official eligibility mentions academic requirements and trustee assessment.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India", "Abroad"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "MBBS Abroad",
      "Counselling not completed yet",
    ],
    maxAmount: "Amount is decided by trustees after assessment.",
    interestRate: "2% per annum on the loan scholarship, subject to official terms.",
    repayment: "Official FAQ says total loan scholarship is repayable within 3 years after course completion.",
    moratorium: "Repayment after course completion per official FAQ; verify current terms.",
    benefitDescription:
      "One of India's older loan scholarship funds, available to deserving Indian students of all communities.",
    whyUsefulForMBBS:
      "May provide partial support for higher education in India or abroad when the student can satisfy guarantor and document rules.",
    officialWebsite: "https://www.rdsethnascholarships.org/",
    applyRoute: "https://www.rdsethnascholarships.org/application-form/",
    documents: [
      ...baseAcademicDocuments,
      "Two recommendation letters",
      "Two reference letters",
      "Guarantor documents",
      "Life insurance policy if sanctioned",
    ],
    importantNotes: [
      "Loan scholarship, not a grant.",
      "Guarantor, reference and insurance rules are strict.",
      "Amount and approval are at trustee discretion.",
    ],
    priorityScore: 58,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["Loan Scholarship", "India", "Abroad", "All Communities", "Partial Support"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "cmrf-nabanna-education-assistance",
    title: "Chief Minister Relief Fund / Nabanna Education Assistance, West Bengal",
    shortTitle: "CMRF Nabanna",
    type: "charitable support",
    applicableFor: "India",
    eligibleStates: ["West Bengal"],
    eligibleCommunities: ["All"],
    incomeLimit: {
      label: "Case-based financial assistance; official education-assistance rules apply.",
      maxAnnualIncome: null,
    },
    marksRequirement: {
      minimumPercentage: 50,
      note: "Official education-assistance page lists percentage bands and professional course rank/allotment documents; verify current rules.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount: "Case-based; check CMRF portal.",
    interestRate: "Not a loan if approved as assistance.",
    repayment: "No repayment if approved as assistance.",
    moratorium: "Not applicable",
    benefitDescription:
      "Case-based education assistance through West Bengal Chief Minister's Relief Fund / Discretionary Fund route.",
    whyUsefulForMBBS:
      "May help West Bengal students with documented need and professional-course admission or allotment documents.",
    officialWebsite: "https://cmrf.wb.gov.in/",
    applyRoute: "https://cmrf.wb.gov.in/",
    documents: [
      ...baseAcademicDocuments,
      "Professional course entrance rank card if applicable",
      "Allotment letter if applicable",
      "Recommendation/income documents requested by portal",
    ],
    importantNotes: [
      "Case-based support depends on current route and documents.",
      "Students must verify current online/offline route and documents.",
      "Support may not apply to every MBBS fee scenario.",
    ],
    priorityScore: 52,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["West Bengal", "Nabanna", "CMRF", "Case Based Assistance"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "nsp-post-matric-sc",
    title: "NSP Post-Matric Scholarship for SC Students",
    shortTitle: "NSP SC Post-Matric",
    type: "scholarship",
    applicableFor: "India",
    eligibleStates: ["All India"],
    eligibleCommunities: ["SC"],
    incomeLimit: {
      label: "Income ceiling generally up to ₹2.5 lakh; verify state/NSP rules.",
      maxAnnualIncome: 250000,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Post-matric study in India and state/UT verification rules apply.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount: "Tuition/non-refundable fees and academic allowance as per scheme/state rules.",
    interestRate: "Not a loan.",
    repayment: "No repayment if approved as scholarship.",
    moratorium: "Not applicable",
    benefitDescription:
      "Category-based government scholarship route for eligible SC students pursuing post-matric studies in India.",
    whyUsefulForMBBS:
      "Relevant for SC MBBS India students, subject to income, caste certificate, institution and official portal verification.",
    officialWebsite: "https://socialjustice.gov.in/schemes/25",
    applyRoute: "https://scholarships.gov.in/",
    documents: [...baseAcademicDocuments, "SC certificate", "Domicile certificate", "NSP One-Time Registration details"],
    importantNotes: [
      "Does not apply to MBBS abroad.",
      "Final eligibility depends on NSP/state portal, institution and income verification.",
      "Students should check the current academic-year application window.",
    ],
    priorityScore: 78,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["SC", "NSP", "Post-Matric", "Government Scholarship", "India"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "nsp-post-matric-st",
    title: "NSP Post-Matric Scholarship for ST Students",
    shortTitle: "NSP ST Post-Matric",
    type: "scholarship",
    applicableFor: "India",
    eligibleStates: ["All India"],
    eligibleCommunities: ["ST"],
    incomeLimit: {
      label: "Income ceiling is scheme/state specific; commonly check ₹2.5 lakh rules on official portal.",
      maxAnnualIncome: 250000,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Post-matric study in India and ST certificate verification are required.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount: "Fees and academic allowance as per Ministry/State/NSP rules.",
    interestRate: "Not a loan.",
    repayment: "No repayment if approved as scholarship.",
    moratorium: "Not applicable",
    benefitDescription:
      "Government post-matric scholarship route for eligible ST students pursuing higher studies in India.",
    whyUsefulForMBBS:
      "Relevant for ST MBBS India students where course, institution, income and documents meet official rules.",
    officialWebsite: "https://tribal.nic.in/Scholarship.aspx",
    applyRoute: "https://scholarships.gov.in/",
    documents: [...baseAcademicDocuments, "ST certificate", "Domicile certificate", "NSP OTR details"],
    importantNotes: [
      "Does not apply to MBBS abroad.",
      "ST OTR/NSP rules may apply depending on the state and academic year.",
      "Final benefit depends on official verification.",
    ],
    priorityScore: 77,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["ST", "NSP", "Post-Matric", "Government Scholarship", "India"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "pm-yasasvi-obc-ebc-dnt",
    title: "PM YASASVI / OBC-EBC-DNT Post-Matric and Top Class Routes",
    shortTitle: "OBC/EBC/DNT NSP",
    type: "scholarship",
    applicableFor: "India",
    eligibleStates: ["All India"],
    eligibleCommunities: ["OBC"],
    incomeLimit: {
      label: "Income limit is scheme-specific; students must check NSP/state rules.",
      maxAnnualIncome: 250000,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Category, income, institution and course rules apply.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount: "As per PM YASASVI/OBC/EBC/DNT scheme guidelines and institution rules.",
    interestRate: "Not a loan.",
    repayment: "No repayment if approved as scholarship.",
    moratorium: "Not applicable",
    benefitDescription:
      "Central/state scholarship route for eligible OBC, EBC and DNT students through NSP or state portals.",
    whyUsefulForMBBS:
      "Useful to check for OBC MBBS India students, especially where state portals route applications through NSP.",
    officialWebsite: "https://scholarships.gov.in/All-Scholarships",
    applyRoute: "https://scholarships.gov.in/",
    documents: [...baseAcademicDocuments, "OBC/EBC/DNT certificate", "Domicile certificate", "NSP OTR details"],
    importantNotes: [
      "Eligibility varies by state and scheme component.",
      "Do not assume every private MBBS fee is covered.",
      "Check official portal for current academic-year scheme status.",
    ],
    priorityScore: 66,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["OBC", "EBC", "DNT", "NSP", "India"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "top-class-sc",
    title: "Central Sector Scholarship of Top Class Education for SC Students",
    shortTitle: "Top Class SC",
    type: "scholarship",
    applicableFor: "India",
    eligibleStates: ["All India"],
    eligibleCommunities: ["SC"],
    incomeLimit: {
      label: "Official guidelines mention income up to ₹8 lakh for eligible SC students.",
      maxAnnualIncome: 800000,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Admission must be in a notified/empanelled institution and prescribed course.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount: "Financial support as per notified institution/scheme rules.",
    interestRate: "Not a loan.",
    repayment: "No repayment if approved as scholarship.",
    moratorium: "Not applicable",
    benefitDescription:
      "Central sector scholarship for SC students pursuing studies beyond Class 12 in notified institutions.",
    whyUsefulForMBBS:
      "Relevant for SC MBBS India students only if their medical institution is notified/eligible under the current scheme.",
    officialWebsite: "https://socialjustice.gov.in/schemes/27",
    applyRoute: "https://scholarships.gov.in/",
    documents: [...baseAcademicDocuments, "SC certificate", "Income certificate", "Institution eligibility proof if requested"],
    importantNotes: [
      "Institution list matters.",
      "Do not assume all MBBS colleges qualify.",
      "Students must check NSP and Ministry guidelines for the current year.",
    ],
    priorityScore: 72,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["SC", "Top Class", "NSP", "Government Scholarship", "India"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "top-class-st",
    title: "National Scholarship for Higher Education of ST Students",
    shortTitle: "Top Class ST",
    type: "scholarship",
    applicableFor: "India",
    eligibleStates: ["All India"],
    eligibleCommunities: ["ST"],
    incomeLimit: {
      label: "Check Ministry/NSP rules for current income and institution criteria.",
      maxAnnualIncome: 600000,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Notified institution and course criteria apply.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount: "As per Ministry of Tribal Affairs/NSP scheme rules.",
    interestRate: "Not a loan.",
    repayment: "No repayment if approved as scholarship.",
    moratorium: "Not applicable",
    benefitDescription:
      "Central scholarship route for eligible ST students pursuing higher education in notified institutions.",
    whyUsefulForMBBS:
      "Relevant for ST MBBS India students if the selected institution and course appear in official coverage.",
    officialWebsite: "https://tribal.nic.in/Scholarship.aspx",
    applyRoute: "https://scholarships.gov.in/",
    documents: [...baseAcademicDocuments, "ST certificate", "Income certificate", "NSP OTR details"],
    importantNotes: [
      "Institution and course coverage must be checked.",
      "Do not assume every MBBS seat qualifies.",
      "Final approval depends on official portal verification.",
    ],
    priorityScore: 71,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["ST", "Top Class", "NSP", "Government Scholarship", "India"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "pwd-scholarships",
    title: "Scholarships for Students with Disabilities / Top Class Education PwD",
    shortTitle: "PwD Scholarships",
    type: "scholarship",
    applicableFor: "India",
    eligibleStates: ["All India"],
    eligibleCommunities: ["PwD"],
    incomeLimit: {
      label: "Income and benchmark disability rules vary by scheme; check DEPwD/NSP.",
      maxAnnualIncome: 800000,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Benchmark disability certificate and scheme-specific academic criteria apply.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount: "As per DEPwD/NSP scheme component and institution rules.",
    interestRate: "Not a loan.",
    repayment: "No repayment if approved as scholarship.",
    moratorium: "Not applicable",
    benefitDescription:
      "Pre-matric, post-matric and top-class education scholarship routes for eligible students with disabilities.",
    whyUsefulForMBBS:
      "Relevant for MBBS India aspirants with benchmark disability who can meet official disability, income and institution rules.",
    officialWebsite: "https://depwd.gov.in/en/scholarship/",
    applyRoute: "https://scholarships.gov.in/",
    documents: [...baseAcademicDocuments, "Disability certificate", "Income certificate", "NSP OTR details"],
    importantNotes: [
      "Disability certificate and scheme component are essential.",
      "Final approval depends on NSP, DEPwD and institution verification.",
      "Check official current-year guidelines.",
    ],
    priorityScore: 76,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["PwD", "Disability", "NSP", "Top Class", "India"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "svmcm-west-bengal",
    title: "Swami Vivekananda Merit-cum-Means Scholarship, West Bengal",
    shortTitle: "SVMCM West Bengal",
    type: "scholarship",
    applicableFor: "India",
    eligibleStates: ["West Bengal"],
    eligibleCommunities: ["All"],
    incomeLimit: {
      label: "Annual family income generally not more than ₹2.5 lakh; verify current SVMCM rules.",
      maxAnnualIncome: 250000,
    },
    marksRequirement: {
      minimumPercentage: 60,
      note: "Marks rules vary by level/course; MBBS/medical students should check current official guidelines.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount: "Official sources list medical/engineering support rates by course; check current portal before applying.",
    interestRate: "Not a loan.",
    repayment: "No repayment if approved as scholarship.",
    moratorium: "Not applicable",
    benefitDescription:
      "Merit-cum-means scholarship for West Bengal students pursuing higher studies, including medical courses where eligible.",
    whyUsefulForMBBS:
      "Strong route for West Bengal MBBS India students with high marks and low family income.",
    officialWebsite: "https://svmcm.wb.gov.in/",
    applyRoute: "https://svmcm.wb.gov.in/",
    documents: [...baseAcademicDocuments, "West Bengal domicile proof", "Income certificate", "Admission receipt"],
    importantNotes: [
      "Income and marks criteria are strict.",
      "Minority students may be routed to the WBMDFC scholarship portal as notified.",
      "Students must verify current fresh/renewal rules.",
    ],
    priorityScore: 73,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["West Bengal", "SVMCM", "Merit-cum-Means", "Medical", "Income Based"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "aikyashree-west-bengal",
    title: "Aikyashree West Bengal Minority Scholarship",
    shortTitle: "Aikyashree",
    type: "scholarship",
    applicableFor: "India",
    eligibleStates: ["West Bengal"],
    eligibleCommunities: ["Muslim Minority", "Other Minority"],
    incomeLimit: {
      label: "Merit-cum-Means component generally up to ₹2.5 lakh; check WBMDFC portal.",
      maxAnnualIncome: 250000,
    },
    marksRequirement: {
      minimumPercentage: 50,
      note: "Merit-cum-Means requires professional/technical course admission and previous-exam marks as per official rules.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount: "Merit-cum-Means medical/professional course rates are subject to WBMDFC rules and budget.",
    interestRate: "Not a loan.",
    repayment: "No repayment if approved as scholarship.",
    moratorium: "Not applicable",
    benefitDescription:
      "West Bengal minority scholarship route covering pre-matric, post-matric and merit-cum-means components.",
    whyUsefulForMBBS:
      "Relevant for West Bengal minority MBBS India students in technical/professional course categories.",
    officialWebsite: "https://wbmdfcscholarship.in/",
    applyRoute: "https://wbmdfcscholarship.in/",
    documents: [...baseAcademicDocuments, "Minority/community proof if required", "West Bengal domicile proof"],
    importantNotes: [
      "Budget and merit order matter.",
      "Students outside West Bengal institutions must check notified eligible institution rules.",
      "Final approval depends on WBMDFC verification.",
    ],
    priorityScore: 70,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["West Bengal", "Minority", "Aikyashree", "MCM", "Medical"],
    isInternalIlmalinkSupport: false,
  },
  {
    id: "oasis-west-bengal",
    title: "OASIS West Bengal SC/ST/OBC Scholarship Route",
    shortTitle: "OASIS West Bengal",
    type: "scholarship",
    applicableFor: "India",
    eligibleStates: ["West Bengal"],
    eligibleCommunities: ["SC", "ST", "OBC"],
    incomeLimit: {
      label: "Income ceiling differs for SC/ST/OBC and scheme component; check OASIS portal.",
      maxAnnualIncome: 250000,
    },
    marksRequirement: {
      minimumPercentage: null,
      note: "Category, OTR, course and portal verification rules apply.",
    },
    genderEligibility: "All",
    destinationEligibility: ["India"],
    admissionTypeEligibility: [
      "Government MBBS India",
      "Private MBBS India",
      "Counselling not completed yet",
    ],
    maxAmount: "Post-matric scholarship amount depends on category, course group and hosteller/day scholar status.",
    interestRate: "Not a loan.",
    repayment: "No repayment if approved as scholarship.",
    moratorium: "Not applicable",
    benefitDescription:
      "West Bengal Backward Classes Welfare scholarship portal for SC, ST and OBC students.",
    whyUsefulForMBBS:
      "Relevant for West Bengal SC/ST/OBC MBBS India students who need category-based post-matric scholarship support.",
    officialWebsite: "https://oasis.wb.gov.in/",
    applyRoute: "https://oasis.wb.gov.in/",
    documents: [...baseAcademicDocuments, "SC/ST/OBC certificate", "Domicile certificate", "OTR if required"],
    importantNotes: [
      "OASIS has current academic-year portal rules and announcements.",
      "ST students may need NSP OTR depending on current official instructions.",
      "Final approval depends on district/block/institute verification.",
    ],
    priorityScore: 72,
    sourceType: "official",
    lastVerifiedDate: lastScholarshipsLoansVerificationDate,
    tags: ["West Bengal", "SC", "ST", "OBC", "OASIS", "Post-Matric"],
    isInternalIlmalinkSupport: false,
  },
];
