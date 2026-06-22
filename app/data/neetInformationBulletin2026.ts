export const bulletinQuickFacts = [
  { label: "Exam Date", value: "03 May 2026", detail: "Sunday", icon: "calendar" },
  { label: "Exam Duration", value: "180 Minutes", detail: "3 hours", icon: "clock" },
  { label: "Total Questions", value: "180", detail: "All compulsory", icon: "questions" },
  { label: "Total Marks", value: "720", detail: "+4 / -1 marking", icon: "award" },
  { label: "Mode", value: "Pen & Paper", detail: "OMR based", icon: "pen" },
  { label: "Subjects", value: "PCB", detail: "Physics, Chemistry, Biology", icon: "subjects" },
] as const;

export const bulletinSectionCards = [
  { id: "about-neet-ug-2026", tag: "Chapter 2", title: "About NEET UG", description: "NEET overview, role of NTA, authorities and official websites.", icon: "book", tone: "blue" },
  { id: "neet-2026-examination-scheme", tag: "Chapter 4", title: "Examination Scheme", description: "Pattern, syllabus, mode, duration and marking scheme.", icon: "clipboard", tone: "teal" },
  { id: "neet-2026-eligibility-mbbs-bds", tag: "Chapter 6", title: "Eligibility MBBS/BDS", description: "Qualification, age, NRI/OCI, PCB and appearing rules.", icon: "eligibility", tone: "green" },
  { id: "neet-2026-counselling-reservation", tag: "Chapter 7", title: "Counselling & Reservation", description: "AIQ, State quota, MCC, PwD, reservation and documents.", icon: "users", tone: "orange" },
  { id: "neet-2026-merit-list-qualifying-criteria", tag: "Chapter 8", title: "Merit List & Criteria", description: "Qualifying criteria, tie-breaking and merit list rules.", icon: "medal", tone: "violet" },
  { id: "neet-2026-ayush-admission-rules", tag: "Chapter 9", title: "AYUSH Admission Rules", description: "BAMS, BUMS, BSMS and BHMS admission through NEET.", icon: "leaf", tone: "pink" },
  { id: "neet-2026-dress-code-barred-items", tag: "Chapter 11", title: "Dress Code & Barred Items", description: "What to wear and what is strictly not allowed.", icon: "shirt", tone: "red" },
  { id: "neet-2026-post-exam-result-answer-key", tag: "Chapter 15", title: "Result & Post-Exam", description: "OMR, answer key, result, challenge and re-check rules.", icon: "chart", tone: "cyan" },
  { id: "neet-ug-2026-syllabus", tag: "Appendix III", title: "NEET UG 2026 Syllabus", description: "Physics, Chemistry, Botany and Zoology topic guide.", icon: "syllabus", tone: "blue" },
  { id: "neet-2026-state-counselling-directorates", tag: "Appendix II", title: "State Counselling Directorates", description: "State and UT counselling offices and official portals.", icon: "building", tone: "violet" },
  { id: "neet-2026-college-details", tag: "Appendix IV", title: "College Details", description: "Medical, Dental, AYUSH and Homoeopathy college checks.", icon: "college", tone: "green" },
  { id: "neet-2026-nri-oci-foreign-candidate-documents", tag: "Appendix VI & VII", title: "NRI / OCI / Foreign Documents", description: "Embassy certificate, citizenship proof and passport documents.", icon: "passport", tone: "orange" },
] as const;

export const bulletinNavigation = [
  ["about-neet-ug-2026", "About NEET UG 2026"],
  ["neet-2026-important-dates", "Important Dates"],
  ["neet-2026-examination-scheme", "Examination Scheme"],
  ["neet-2026-eligibility-mbbs-bds", "Eligibility MBBS/BDS"],
  ["neet-2026-counselling-reservation", "Counselling & Reservation"],
  ["neet-2026-merit-list-qualifying-criteria", "Merit List & Criteria"],
  ["neet-2026-ayush-admission-rules", "AYUSH Admission Rules"],
  ["neet-2026-dress-code-barred-items", "Dress Code & Barred Items"],
  ["neet-2026-post-exam-result-answer-key", "Result & Post-Exam"],
  ["neet-ug-2026-syllabus", "Syllabus NEET UG 2026"],
  ["neet-2026-state-counselling-directorates", "State Directorates"],
  ["neet-2026-college-details", "College Details"],
  ["neet-2026-nri-oci-foreign-candidate-documents", "NRI / OCI / Foreign Docs"],
  ["neet-2026-application-process", "Application Process"],
  ["neet-2026-admit-card-exam-day", "Admit Card & Exam Day"],
  ["neet-2026-miscellaneous-provisions", "Miscellaneous Rules"],
  ["neet-2026-faq", "FAQ"],
  ["neet-2026-important-links", "Important Links"],
] as const;

export const importantDates = [
  ["Online application", "08 February to 08 March 2026 (up to 9:00 PM)"],
  ["Last date of fee payment", "08 March 2026 (up to 11:50 PM)"],
  ["Correction window", "10 March to 12 March 2026"],
  ["City intimation", "To be announced on the NTA website"],
  ["Admit card download", "To be announced on the NTA website"],
  ["Date of examination", "03 May 2026 (Sunday)"],
  ["Exam timing", "2:00 PM to 5:00 PM IST"],
  ["Result declaration", "To be announced on the NTA website"],
  ["Official websites", "neet.nta.nic.in and nta.ac.in"],
] as const;

export const examPattern = [
  ["Physics", "45", "180", "MCQ - one correct/best option"],
  ["Chemistry", "45", "180", "MCQ - one correct/best option"],
  ["Biology (Botany & Zoology)", "90", "360", "MCQ - one correct/best option"],
  ["Total", "180", "720", "All questions compulsory"],
] as const;

export const authorityCards = [
  ["NTA", "Conducts the examination, accepts applications, issues admit cards, publishes OMR/answer keys, result and All India Rank."],
  ["NMC / DCI / NCISM / NCH / DGHS", "Set or administer the applicable medical, dental, AYUSH, eligibility, quota and regulatory rules."],
  ["MCC / AACCC", "Conduct central medical/dental and AYUSH counselling respectively for the seats under their jurisdiction."],
  ["State Authorities", "Conduct State/UT counselling, apply domicile and reservation rules, verify documents and allot eligible seats."],
] as const;

export const eligibilityCards = [
  ["Indian candidates", "Minimum age 17 by 31 December 2026; recognized qualifying route with Physics, Chemistry, Biology/Biotechnology and English."],
  ["NRI candidates", "Eligible subject to State, institution and Government rules; upload the prescribed diplomatic-mission certificate and retain the original."],
  ["OCI candidates", "Eligible subject to applicable rules and the rights recognized by the cited Supreme Court order; keep OCI/citizenship proof ready."],
  ["Foreign candidates", "Upload valid passport pages or competent-authority citizenship proof and confirm eligibility with the counselling authority."],
  ["Class 12 appearing", "May appear using qualifying Code 01, but must pass the qualifying examination by the first counselling round."],
  ["Passed candidates", "Choose the correct qualifying Code 02-07 and preserve evidence of the required subjects, practicals and equivalence where applicable."],
] as const;

export const eligibilityComparison = [
  ["Indian", "17 years by 31 December 2026; qualifying PCB/Biotechnology and English route", "Correct qualifying code and board records", "State/AIQ rules apply separately"],
  ["NRI", "NEET qualification plus applicable NRI eligibility", "Diplomatic-mission/embassy certificate; passport and relationship records as asked", "NRI quota rules vary by authority"],
  ["OCI", "NEET qualification and applicable OCI admission rules", "OCI card or accepted citizenship/nationality proof", "Verify current State/institution treatment"],
  ["Foreign national", "NEET and institution/State eligibility", "Passport pages or competent-authority citizenship certificate", "Confirm before applying for counselling"],
  ["Class 12 appearing", "Appear provisionally using Code 01", "Must pass before first counselling round", "No admission while qualifying result remains unmet"],
] as const;

export const counsellingCards = [
  ["All India Quota Counselling", "MCC/DGHS handles 15% AIQ and the other central seats under its notified scheme."],
  ["State Quota Counselling", "Designated State/UT authorities handle State quota and seats under their jurisdiction."],
  ["Deemed / Central / AIIMS / JIPMER", "MCC registration, choice filling and allotment apply as notified for these institutions."],
  ["PwD / PwBD Counselling", "Reservation and admission depend on valid certification, applicable guidelines and designated verification."],
  ["Reservation Rules", "Central reservation snapshot: EWS 10%, OBC-NCL 27%, SC 15%, ST 7.5%, PwBD 5% horizontal where applicable."],
  ["Documents & Choice Filling", "Registration alone is not allotment: verify documents, fill/review choices, track rounds and report on time."],
] as const;

export const counsellingComparison = [
  ["15% AIQ / central medical seats", "MCC, DGHS", "AIQ, AIIMS, JIPMER, central/deemed and notified institutions", "Register, pay, fill choices, follow allotment/reporting", "Read the current MCC scheme"],
  ["State quota", "State/UT counselling authority", "State quota, private and other jurisdictional seats", "Meet domicile/category rules and register separately", "Policies differ by State"],
  ["AYUSH AIQ", "AACCC", "AIQ BAMS, BSMS, BUMS and BHMS seats under its scope", "Register and follow AACCC rounds", "Use the current AACCC scheme"],
  ["State AYUSH", "State AYUSH authority", "State AYUSH seats", "Check the State AYUSH portal", "Reservation and eligibility vary"],
] as const;

export const meritRules = [
  "General/General-EWS candidates ordinarily need the 50th percentile; SC/ST/OBC-NCL candidates the 40th percentile; specified PwBD categories follow the applicable percentile rules.",
  "The All India Rank and merit list are prepared under the regulatory criteria; counselling authorities use the rank to prepare route-specific merit/allotment results.",
  "Tie-breaking follows the sequence notified in Chapter 8. Students should rely on the published score card and current NTA notice rather than informal calculations.",
  "A qualifying percentile only makes a candidate eligible for the next stage. It does not itself create a seat entitlement.",
] as const;

export const ayushRules = [
  "NEET UG 2026 is the common entrance route for BAMS, BSMS, BUMS and BHMS admissions covered by the bulletin.",
  "AACCC conducts counselling for notified All India Quota AYUSH seats; State authorities handle seats within their jurisdiction.",
  "Eligibility, qualifying percentile, reservation and document rules follow NCISM/NCH and the applicable counselling authority.",
  "Candidates must register separately for the relevant counselling route and follow its choice-filling, allotment and reporting schedule.",
  "NTA conducts the test and supplies the result; it does not allot AYUSH seats or verify admission documents.",
] as const;

export const barredItems = [
  "Mobile phones, Bluetooth devices, earphones, smartwatches and communication devices",
  "Calculators, electronic pens, scanners, storage devices and cameras",
  "Loose paper, notes, printed material, geometry boxes and stationery not expressly permitted",
  "Watches, wallets, handbags, belts, caps, ornaments and unnecessary metallic items",
  "Food and opaque water containers unless specifically permitted for a medical need",
] as const;

export const dressCodeRules = [
  "Wear light, simple clothes and follow every instruction printed on the admit card/current NTA notice.",
  "Avoid heavy garments, large buttons, brooches, badges, flowers, jewellery and metal accessories.",
  "Candidates wearing customary/religious attire should report early for additional security checks.",
  "Slippers or low-heeled sandals are safer where the official instruction restricts shoes; verify the current notice.",
  "Cooperate with frisking, identity checks and centre staff. Medical exceptions should be supported by documents.",
] as const;

export const resultProcess = [
  ["Recorded responses / OMR", "NTA displays scanned OMR and recorded responses for a notified period.", "Log in and compare carefully.", "Do not wait until the final hour."],
  ["OMR grading challenge", "Candidates may challenge recorded grading through the notified online process.", "Pay the prescribed processing fee and retain proof.", "Only the official window is valid."],
  ["Provisional answer key", "NTA publishes keys and accepts question/answer challenges.", "Submit evidence through the portal.", "Informal emails do not replace the process."],
  ["Final key and result", "Experts review challenges; the final key is used for result and rank.", "Download score card and preserve copies.", "Check name/category details immediately."],
  ["Re-check / re-evaluation", "The bulletin provides no separate re-checking or re-evaluation after declaration.", "Use the pre-result challenge windows.", "Final result follows the notified rules."],
] as const;

export const syllabusTopics = [
  { subject: "Physics", topics: ["Physics and Measurement", "Kinematics", "Laws of Motion", "Work, Energy and Power", "Rotational Motion", "Gravitation", "Properties of Solids and Liquids", "Thermodynamics and Kinetic Theory", "Oscillations and Waves", "Electrostatics", "Current Electricity", "Magnetic Effects of Current", "Electromagnetic Induction and AC", "Optics", "Dual Nature, Atoms and Nuclei", "Electronic Devices", "Experimental Skills"] },
  { subject: "Chemistry", topics: ["Some Basic Concepts", "Atomic Structure", "Chemical Bonding", "Thermodynamics", "Solutions", "Equilibrium", "Redox and Electrochemistry", "Chemical Kinetics", "Periodicity", "p-Block, d- and f-Block Elements", "Coordination Compounds", "Purification and Characterisation", "Organic Chemistry Principles", "Hydrocarbons", "Halogen, Oxygen and Nitrogen Compounds", "Biomolecules", "Practical Chemistry"] },
  { subject: "Biology / Botany", topics: ["Diversity in Living World", "Structural Organisation in Plants", "Cell Structure and Function", "Plant Physiology", "Reproduction", "Genetics and Evolution", "Biology and Human Welfare", "Biotechnology and its Applications", "Ecology and Environment"] },
  { subject: "Zoology", topics: ["Animal Diversity", "Structural Organisation in Animals", "Cell and Biomolecules", "Human Physiology", "Human Reproduction", "Inheritance and Evolution", "Human Health and Disease", "Biotechnology", "Ecology and Environmental Biology"] },
] as const;

export const collegeCategories = [
  ["Medical colleges", "NMC", "Check MBBS recognition, permitted intake and counselling seat matrix", "Verify the exact college and course on NMC/current counselling portal"],
  ["Dental colleges", "DCI", "Check BDS recognition and available seats", "Use DCI and counselling authority records"],
  ["Ayurveda colleges", "NCISM", "Review BAMS permission and AACCC/State availability", "Permission and seat matrix may change"],
  ["Siddha colleges", "NCISM", "Review BSMS permission and counselling route", "Confirm current intake and quota"],
  ["Unani colleges", "NCISM", "Review BUMS permission and counselling route", "Confirm current intake and quota"],
  ["Homoeopathy colleges", "NCH", "Review BHMS recognition and counselling route", "Confirm NCH status and seat matrix"],
] as const;

export const nriDocumentCards = [
  ["NRI Candidates", "Prescribed embassy/diplomatic-mission certificate, passport and the relationship/sponsorship evidence requested by the counselling authority."],
  ["OCI Candidates", "OCI card or accepted nationality/citizenship document with clear identity, validity and issuing-authority details."],
  ["Foreign Candidates", "First/last passport pages or competent-authority citizenship certificate, plus any institution/visa documentation requested."],
  ["Documents to Keep Ready", "Originals, clear scans, translations where required, NEET score card, academic records, identity and category/quota documents."],
  ["Counselling Verification", "Uploading a document to NTA does not guarantee acceptance by MCC, State or college verification teams."],
] as const;

export const nriDocumentComparison = [
  ["NRI", "Embassy/diplomatic-mission certificate and quota relationship proof", "Application and counselling", "Format and validity can be authority-specific"],
  ["OCI", "OCI card or accepted citizenship/nationality proof", "Application, counselling and admission", "Check current rights and quota treatment"],
  ["Foreign national", "Passport identity/nationality pages or competent-authority citizenship certificate", "Application and document verification", "Confirm equivalence, visa and institution eligibility"],
] as const;

export const applicationRules = [
  "Apply online only through the official NEET NTA portal; do not send the confirmation page to NTA by post or messaging apps.",
  "Use the candidate's or parent/guardian's own mobile number and email. Mobile and email OTPs are part of the official NTA application flow.",
  "Upload the prescribed photograph, signature, finger/thumb impressions and identity documents in the notified format.",
  "Select the correct qualifying examination code: Code 01 for result-awaited Class 12 candidates; Codes 02-07 for applicable passed routes.",
  "Use the correction window only for permitted fields and download the final confirmation page after successful payment.",
  "Do not submit multiple applications and do not use a coaching centre's address, mobile number or email as the candidate contact.",
] as const;

export const admitDayRules = [
  "Download the admit card from the official portal and read every page, self-declaration and centre-specific instruction.",
  "Carry the permitted identity document, photographs and PwD/PwBD papers exactly as required by the current notice/admit card.",
  "Report within the notified window; late entry, identity mismatch or prohibited items can prevent examination entry.",
  "Parents/guardians should help the candidate preserve documents and reach the correct centre but must follow centre restrictions.",
  "Inside the hall, follow seat, booklet/OMR, signature, timing and invigilator instructions. Do not communicate or exchange material.",
  "Unfair means can lead to candidature/result cancellation, debarment and other action under the bulletin and applicable law.",
] as const;

export const miscellaneousRules = [
  ["Caution notice", "Rely only on NTA and competent-authority notices; ignore agents claiming influence over exam or allotment."],
  ["Non-disclosure", "Question-paper and examination material are governed by the bulletin's confidentiality/non-disclosure rules."],
  ["Correspondence", "Use official channels, quote the application number and preserve receipts/screenshots."],
  ["CSC / facilitation", "Common Services Centres may assist with online submission, but the candidate remains responsible for accuracy."],
  ["Weeding-out rules", "NTA retains records for notified periods; keep hard and digital copies of confirmation, admit card and score card."],
  ["Legal jurisdiction", "The bulletin states Delhi jurisdiction for disputes relating to conduct of the examination."],
  ["DigiLocker", "NTA may provide confirmation page, admit card and score card through DigiLocker in notified phases."],
  ["Payment and disability annexures", "Follow Appendix VIII for payment support and use the prescribed certificate/undertaking formats for scribe or writing limitations."],
] as const;

export const trustItems = [
  ["100% Student Friendly", "Bulletin explained in plain language for easier understanding."],
  ["SEO & AI Optimized", "Structured, server-rendered headings, tables and internal links."],
  ["Mobile Friendly", "Readable cards, navigation chips and scroll-safe tables."],
  ["Trusted Source Guide", "Summarized from the uploaded official bulletin with verification reminders."],
] as const;

export const relatedLinks = [
  ["NEET Hub", "/neet"],
  ["NEET Answer Key", "/neet/answer-key"],
  ["Search NEET Questions", "/neet/questions"],
  ["Code-wise Re-NEET Answer Keys", "/neet/re-neet-2026-answer-key-codes"],
  ["Re-NEET 2026 Questions", "/neet/re-neet-2026-questions"],
  ["Discussion Centre", "/neet/discussion-centre"],
  ["Create Student Profile", "/portal/signup"],
] as const;

export const officialBulletinLinks = [
  ["NTA NEET Portal", "https://neet.nta.nic.in/"],
  ["National Testing Agency", "https://nta.ac.in/"],
  ["Medical Counselling Committee", "https://mcc.nic.in/"],
  ["National Medical Commission", "https://www.nmc.org.in/"],
  ["AYUSH Counselling Committee", "https://aaccc.gov.in/"],
  ["NCISM", "https://ncismindia.org/"],
  ["National Commission for Homoeopathy", "https://nch.org.in/"],
] as const;
