export const neet2026OfficialLinks = {
  portal: "https://neet.nta.nic.in/",
  bulletin:
    "https://neet.nta.nic.in/document/information-bulletin-english/",
  publicNotices:
    "https://neet.nta.nic.in/document-category/public-notices/",
  admitCardNotice:
    "https://nta.ac.in/Download/Notice/Notice_20260617200534.PDF",
  reExaminationNotice:
    "https://www.nta.ac.in/Download/Notice/Notice_20260516152513.pdf",
  dressCodeNotice:
    "https://nta.ac.in/Download/Notice/Notice_20260618184532.pdf",
  readinessNotice:
    "https://nta.ac.in/Download/Notice/Notice_20260619122302.pdf",
  mcc: "https://mcc.nic.in/",
} as const;

export const neet2026CurrentStatus = {
  label: "Re-examination schedule",
  date: "21 June 2026",
  examWindow: "2:00 PM to 5:15 PM IST",
  answeringTime: "180 minutes",
  formalitiesTime: "15 additional minutes",
  reportingTime: "11:00 AM onward",
  lastEntry: "1:30 PM sharp",
  mode: "Pen-and-paper, single shift",
  reach: "551 Indian cities and 14 cities abroad",
  candidates: "Over 22.79 lakh candidates",
  updated: "21 June 2026",
} as const;

export const neet2026Timeline = [
  {
    event: "Online application",
    date: "8 February to 11 March 2026",
    note: "The original 8 March deadline in the bulletin was extended to 11 March 2026.",
    status: "Closed",
  },
  {
    event: "Final fee payment",
    date: "11 March 2026, 11:50 PM",
    note: "Online payment deadline after the registration extension.",
    status: "Closed",
  },
  {
    event: "Application correction",
    date: "12 March, 12:00 PM to 14 March 2026, 11:50 PM",
    note: "One-time correction window under the later NTA notice.",
    status: "Closed",
  },
  {
    event: "Original examination",
    date: "3 May 2026",
    note: "This original bulletin date was followed by an NTA re-examination decision.",
    status: "Superseded",
  },
  {
    event: "Re-examination admit card",
    date: "Released 14 June 2026",
    note: "Download only through the official NTA NEET candidate portal.",
    status: "Released",
  },
  {
    event: "NEET UG 2026 re-examination",
    date: "21 June 2026, 2:00 PM to 5:15 PM IST",
    note: "The 15-minute extension is for documentation, verification and related formalities.",
    status: "Official schedule",
  },
  {
    event: "Answer key, OMR and result",
    date: "Check current NTA notices",
    note: "The information bulletin did not specify fixed announcement dates.",
    status: "Await official notice",
  },
] as const;

export const neet2026Fees = [
  { category: "General", india: "₹1,700" },
  { category: "General-EWS / OBC-NCL", india: "₹1,600" },
  { category: "SC / ST / PwBD / PwD / Third Gender", india: "₹1,000" },
  { category: "Candidates applying outside India", india: "₹9,500" },
] as const;

export const neet2026Pattern = [
  { subject: "Physics", questions: 45, marks: 180 },
  { subject: "Chemistry", questions: 45, marks: 180 },
  { subject: "Biology (Botany and Zoology)", questions: 90, marks: 360 },
] as const;

export const neet2026ScoringRules = [
  { label: "Correct answer", value: "+4 marks" },
  { label: "Incorrect answer", value: "-1 mark" },
  { label: "Unanswered question", value: "0 marks" },
] as const;

export const neet2026Courses = [
  {
    code: "MBBS",
    name: "Bachelor of Medicine and Bachelor of Surgery",
    counsellingRoute:
      "Medical counselling through MCC, state/UT authorities, deemed universities and participating institutions as applicable.",
  },
  {
    code: "BDS",
    name: "Bachelor of Dental Surgery",
    counsellingRoute:
      "Dental counselling through MCC and state/UT dental counselling authorities as applicable.",
  },
  {
    code: "BAMS",
    name: "Bachelor of Ayurvedic Medicine and Surgery",
    counsellingRoute:
      "AYUSH counselling route through AACCC or state/UT AYUSH counselling authorities as applicable.",
  },
  {
    code: "BSMS",
    name: "Bachelor of Siddha Medicine and Surgery",
    counsellingRoute:
      "AYUSH counselling route through AACCC or state/UT AYUSH counselling authorities as applicable.",
  },
  {
    code: "BUMS",
    name: "Bachelor of Unani Medicine and Surgery",
    counsellingRoute:
      "AYUSH counselling route through AACCC or state/UT AYUSH counselling authorities as applicable.",
  },
  {
    code: "BHMS",
    name: "Bachelor of Homeopathic Medicine and Surgery",
    counsellingRoute:
      "AYUSH counselling route through AACCC or state/UT AYUSH counselling authorities as applicable.",
  },
] as const;

export const neet2026KolkataResidentialInstitute = {
  name: "Mumtaz Educational Institutions",
  heading: "Best NEET-UG preparation Institute in Kolkata - Residential",
  href: "https://www.mumtazeducation.com",
  location: "Kolkata, West Bengal",
  description:
    "Dedicated external reference for residential NEET-UG preparation in Kolkata. ILMALINK keeps NEET bulletin guidance on this page and links the institute separately for students who want a residential preparation option.",
  searchPhrases: [
    "Best NEET-UG preparation Institute in Kolkata residential",
    "residential NEET coaching Kolkata",
    "Mumtaz NEET preparation Kolkata",
    "NEET UG residential institute Kolkata",
  ],
} as const;

export const neet2026StudentFlow = [
  {
    step: "Check eligibility",
    detail:
      "Age, Class 12 PCB or Biotechnology with English, category documents and foreign-MBBS NEET requirement.",
  },
  {
    step: "Understand the paper",
    detail:
      "Physics 45 questions, Chemistry 45 questions and Biology 90 questions for a total of 720 marks.",
  },
  {
    step: "Follow exam-day rules",
    detail:
      "Use the current admit card, reporting time, permitted items, dress code and centre instructions.",
  },
  {
    step: "Track result process",
    detail:
      "OMR display, answer-key challenge, final key, merit list and All India Rank happen through NTA.",
  },
  {
    step: "Enter counselling",
    detail:
      "MCC, state, deemed, dental and AYUSH routes each need separate schedule and document tracking.",
  },
] as const;

export const neet2026Languages = [
  "English",
  "Hindi",
  "Assamese",
  "Bengali",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Odia",
  "Punjabi",
  "Tamil",
  "Telugu",
  "Urdu",
] as const;

export const neet2026Eligibility = [
  "The candidate must complete 17 years of age on or before 31 December 2026. The bulletin states a date of birth on or before 31 December 2009.",
  "There is no upper age limit under the NMC guidance cited in the bulletin.",
  "The qualifying route requires Physics, Chemistry, Biology or Biotechnology and English through a recognized qualifying examination.",
  "Candidates who study the required subjects as additional subjects after Class 12 may be permitted when the board is duly recognized and documentary proof is available.",
  "A Class 12 result-awaited candidate may sit the exam, but must pass the qualifying examination by the first counselling round to remain eligible for admission.",
  "Indian citizens and OCI candidates intending to pursue an undergraduate medical course at a foreign medical or dental institution also need to qualify NEET UG.",
] as const;

export const neet2026QualifyingPercentiles = [
  { category: "General / General-EWS", percentile: "50th percentile" },
  { category: "SC / ST / OBC-NCL", percentile: "40th percentile" },
  {
    category: "PwBD - General / General-EWS",
    percentile: "45th percentile",
  },
  {
    category: "PwBD - SC / ST / OBC-NCL",
    percentile: "40th percentile",
  },
] as const;

export const neet2026MccReservation = [
  { category: "General-EWS", share: "10%" },
  { category: "OBC-NCL", share: "27%" },
  { category: "Scheduled Caste", share: "15%" },
  { category: "Scheduled Tribe", share: "7.5%" },
  {
    category: "PwBD",
    share: "5% horizontal reservation in each applicable category",
  },
] as const;

export const neet2026ExamDayDocuments = [
  "Printed NEET UG 2026 re-examination admit card downloaded from the official NTA portal.",
  "One original and valid photo identity document matching the candidate details.",
  "Two passport-size photographs for the attendance sheet, as stated in NTA's 19 June readiness notice.",
  "PwD/PwBD certificate and related documents where applicable.",
] as const;

export const neet2026PermittedItems = [
  "Transparent water bottle.",
  "Admit card kept in a transparent plastic pouch.",
  "Religious or customary articles, subject to early reporting and security checks.",
  "Full-sleeve garments or woollens when required, subject to early reporting and thorough frisking.",
  "Sugar tablets and permitted fruits for diabetic candidates, following NTA instructions.",
] as const;

export const neet2026ProhibitedItems = [
  "Mobile phones, smartwatches, Bluetooth accessories, earphones and all communication devices.",
  "Calculators, electronic pens, scanners, storage devices and written or printed study material.",
  "Metallic items, large belt buckles, heavy jewellery and unnecessary accessories.",
  "Food items other than specifically permitted medical provisions.",
] as const;

export const neet2026ResultProcess = [
  "NTA displays scanned OMR answer sheets and recorded responses through the official website.",
  "Candidates receive a time-limited opportunity to challenge OMR grading and the provisional answer key by paying the notified non-refundable processing fee.",
  "Subject experts review answer-key challenges. The final key is used for result preparation.",
  "NTA prepares the merit list and All India Rank under the applicable qualifying criteria.",
  "There is no provision for re-checking or re-evaluation after result declaration under the bulletin.",
] as const;

export const neet2026Helpline = {
  phone: "011-40759000 / 011-69227700",
  email: "neetug2026@nta.ac.in",
} as const;
