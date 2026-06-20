export type NeetPathwayResult = {
  minScore: number;
  maxScore: number | null;
  bandLabel: string;
  headline: string;
  indiaRoute: string;
  abroadBackup: string;
  budgetAdvice: string;
  nextStep: string;
  warning: string;
};

export const getNeetPathwayEmptyState =
  "Enter your NEET score to see India, Abroad, BDS, AYUSH, paramedical and repeat-NEET pathway guidance.";

export const getNeetPathwayInvalidState =
  "Enter a valid NEET score between 1 and 720 to view your pathway.";

export const neetPathwayBands: NeetPathwayResult[] = [
  {
    minScore: 700,
    maxScore: null,
    bandLabel: "700+",
    headline: "AIIMS / Top Government MBBS Priority Zone",
    indiaRoute:
      "With a 700+ NEET score, the student is in a very strong position for AIIMS, top government medical colleges, central institutes and high-demand state government colleges. The student should participate in MCC central counselling as well as their state medical counselling.",
    abroadBackup:
      "MBBS Abroad is usually not required as a main plan in this score band, but can be kept only as an emergency backup if the student has a very specific international plan.",
    budgetAdvice:
      "Focus on choice filling quality, counselling order and documentation rather than high-fee private options.",
    nextStep:
      "Register for MCC counselling and state counselling, prepare an aspirational + realistic + safe choice filling list, and track every round carefully.",
    warning:
      "Even at this score, admission depends on all-India rank, category, domicile, counselling round, seat matrix and official counselling rules.",
  },
  {
    minScore: 650,
    maxScore: 699,
    bandLabel: "650–699",
    headline: "Top Government MBBS Possibility Zone",
    indiaRoute:
      "A 650+ score gives top government MBBS possibility in many states. MCC AIQ and state counselling should both be analysed. Premium choices may be accessible through home-state quota or central counselling depending on rank, category and seat availability.",
    abroadBackup:
      "MBBS Abroad should normally remain only a final backup, not the first route.",
    budgetAdvice:
      "Private or deemed MBBS should be analysed only as backup or preference-based route, not because of panic.",
    nextStep:
      "Participate in MCC AIQ counselling and state counselling. Build a strong choice list with top, realistic and safe options.",
    warning:
      "Do not depend on one counselling route only. MCC and state counselling both matter.",
  },
  {
    minScore: 600,
    maxScore: 649,
    bandLabel: "600–649",
    headline: "Strong Government MBBS / State Quota Zone",
    indiaRoute:
      "Strong government MBBS possibility depending on state, category, domicile and round. State counselling becomes very important.",
    abroadBackup:
      "MBBS Abroad can be kept as final backup only if India counselling does not produce a suitable seat.",
    budgetAdvice:
      "Analyse government MBBS, government BDS, state quota and selected private backup options.",
    nextStep:
      "Prepare separate MCC and state counselling strategies. Track mop-up and stray rounds carefully.",
    warning:
      "Possibility differs sharply by domicile, category and state cutoff.",
  },
  {
    minScore: 550,
    maxScore: 599,
    bandLabel: "550–599",
    headline:
      "Borderline Government MBBS + Strong State/Semi-Government Planning Zone",
    indiaRoute:
      "Government MBBS or BDS may be possible in some states/categories. Semi-government or state quota route may be the highest-value possibility. Private and deemed MBBS should also be analysed.",
    abroadBackup:
      "MBBS Abroad should be treated as a final backup after India counselling analysis.",
    budgetAdvice:
      "Compare semi-government/state quota fees, private MBBS, deemed MBBS and BDS before final choice filling.",
    nextStep:
      "Do not skip any counselling round. Analyse government, semi-government, private, deemed, BDS and abroad backup together.",
    warning:
      "Do not assume government MBBS without checking state, category, rank and latest round-wise data.",
  },
  {
    minScore: 500,
    maxScore: 549,
    bandLabel: "500–549",
    headline: "State Quota / Private MBBS / BDS / Abroad Backup Zone",
    indiaRoute:
      "State quota or semi-government MBBS chance may be low to moderate depending on state/category. Private MBBS, semi-government BDS, private management seats and AYUSH should be analysed.",
    abroadBackup:
      "MBBS Abroad becomes a practical backup if India private budget is high or seat quality is not suitable.",
    budgetAdvice:
      "Prepare a budget-based choice plan covering private MBBS, BDS, AYUSH, deemed and abroad options.",
    nextStep:
      "Compare fees, bond rules, hidden costs, hostel, location, recognition and counselling risk before payment.",
    warning:
      "Avoid last-minute seat promises without official counselling confirmation.",
  },
  {
    minScore: 420,
    maxScore: 499,
    bandLabel: "420–499",
    headline: "Private MBBS / BDS / AYUSH / Abroad Planning Zone",
    indiaRoute:
      "Government MBBS is difficult for most students in this range. Semi-government BDS, government AYUSH, private MBBS, deemed MBBS and budget-based routes should be explored.",
    abroadBackup:
      "MBBS Abroad is a strong backup if the student wants MBBS and India private budget is limited.",
    budgetAdvice:
      "Bihar and Jharkhand may be explored for relatively lower private MBBS fee structures compared with many other Indian states, but current official fees, cutoff and seat availability must be verified before counselling.",
    nextStep:
      "Analyse India private MBBS, BDS, AYUSH, MBBS Abroad and repeat NEET before committing money.",
    warning:
      "This is a planning zone. The best route depends heavily on budget, domicile, category and willingness to study abroad.",
  },
  {
    minScore: 300,
    maxScore: 419,
    bandLabel: "300–419",
    headline: "Private Management / AYUSH / Abroad / Repeat Strategy Zone",
    indiaRoute:
      "Government MBBS and semi-government MBBS are generally not realistic for most students. Semi-government BDS and government AYUSH may have low possibility depending on state/category. Private AYUSH possibility is higher. Private management MBBS/BDS may be possible with higher budget.",
    abroadBackup:
      "MBBS Abroad is a strong practical route if the student wants MBBS but India private/deemed budget is not suitable.",
    budgetAdvice:
      "If the family has around 90 lakh+ India MBBS budget, private/deemed MBBS options may be analysed. Otherwise MBBS Abroad or repeat NEET may be more practical.",
    nextStep:
      "Do not waste money on unrealistic promises. Compare private management, AYUSH, BDS, MBBS Abroad and repeat NEET.",
    warning:
      "Bihar/Jharkhand low-fee options may be difficult in this band; verify current official cutoff and fee data.",
  },
  {
    minScore: 200,
    maxScore: 299,
    bandLabel: "200–299",
    headline: "High-Budget India / MBBS Abroad / Repeat NEET Zone",
    indiaRoute:
      "Government MBBS, semi-government MBBS and government BDS are generally not realistic. Private AYUSH may be possible. Private management MBBS/BDS may be possible in some states with high budget.",
    abroadBackup:
      "MBBS Abroad is usually one of the strongest options if the student wants MBBS and has limited India private budget.",
    budgetAdvice:
      "If there is 90 lakh+ budget, India private/deemed MBBS can be analysed. Otherwise, MBBS Abroad or repeat NEET should be strongly considered.",
    nextStep:
      "Compare realistic private management options, MBBS Abroad, BDS/AYUSH and repeat NEET.",
    warning:
      "Do not rely on “confirmed low-budget MBBS India” claims in this score band without official counselling proof.",
  },
  {
    // Scores 144–149 use the same just-above-qualification guidance so no
    // qualifying score falls through the public pathway tool.
    minScore: 144,
    maxScore: 199,
    bandLabel: "150–199",
    headline: "Just Above Qualification / Abroad or Repeat Planning Zone",
    indiaRoute:
      "In NEET 2025, the General/EWS qualifying mark was 144. A score just above the qualifying mark may technically allow participation, but good private management MBBS seats in India may be difficult. Some private BDS options in selected states such as Jharkhand or Chhattisgarh, and limited private MBBS possibilities in some states such as Tripura, may need careful verification.",
    abroadBackup:
      "MBBS Abroad or repeat NEET are usually the best practical options if the student wants MBBS.",
    budgetAdvice:
      "India private MBBS may require very high budget and careful state-wise verification. Avoid unrealistic seat promises.",
    nextStep:
      "Analyse MBBS Abroad, repeat NEET, private BDS in selected states, AYUSH and allied health options.",
    warning:
      "Qualification alone does not mean a good India MBBS seat is practically accessible.",
  },
  {
    minScore: 1,
    maxScore: 143,
    bandLabel: "Below NEET Qualifying Cutoff",
    headline: "Not Qualified for NEET-Based Medical Counselling This Year",
    indiaRoute:
      "Below the NEET qualifying cutoff, NEET-based courses like MBBS, BDS and AYUSH counselling are not possible for that admission year through normal NEET counselling routes.",
    abroadBackup:
      "If the student wants to practise medicine in India after foreign MBBS, they must be very careful because NEET qualification and NMC/FMGL compliance are critical. Do not take MBBS Abroad admission based on false “without NEET for India practice” claims.",
    budgetAdvice:
      "Do not spend money on fake MBBS/BDS/AYUSH admission promises. Use the year for repeat NEET or choose non-NEET alternatives.",
    nextStep:
      "Repeat NEET if MBBS/BDS/AYUSH is the target. Otherwise apply for paramedical, allied health, B.Sc or other science-based courses as per eligibility.",
    warning:
      "No NEET-related MBBS/BDS/AYUSH counselling route should be promised below qualifying cutoff.",
  },
];

export function getNeetPathway(score: number): NeetPathwayResult | null {
  if (!Number.isFinite(score) || score < 1 || score > 720) {
    return null;
  }

  return (
    neetPathwayBands.find(
      (band) =>
        score >= band.minScore &&
        (band.maxScore === null || score <= band.maxScore)
    ) ?? null
  );
}
