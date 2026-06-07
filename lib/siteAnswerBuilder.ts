import {
  searchInternalSiteData,
  normalizeSiteSearchText,
  normalizeSearchQueryWithCorrections,
  type SearchConfidence,
  type SiteDataSearchResponse,
  type SiteSearchMatch,
  type SuggestedSiteLink,
} from "./siteDataSearch";
import { fmgeCountries } from "@/app/data/fmgeData";

export type AskIlmalinkAnswer = {
  answer: string;
  confidence: SearchConfidence;
  matchedItems: SiteSearchMatch[];
  suggestedLinks: SuggestedSiteLink[];
  shouldShowConnectCTA: true;
  notFound: boolean;
};

const fallbackAnswer =
  "This question can be answered better by our experts. Connect ILMALINK for a personalised reply, and you can ask any other MBBS question there too.";

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : null;
}

function asString(value: unknown) {
  return typeof value === "string" ? value : null;
}

function getTopByKind(search: SiteDataSearchResponse, kind: string) {
  return search.matchedItems.find((item) => item.data?.kind === kind);
}

function getItemsByKind(search: SiteDataSearchResponse, kind: string) {
  return search.matchedItems.filter((item) => item.data?.kind === kind);
}

function formatFacts(item: SiteSearchMatch) {
  return item.keyFacts?.length ? ` Key points: ${item.keyFacts.join("; ")}.` : "";
}

function getSourceText() {
  return "";
}

function getLastUpdatedText(search: SiteDataSearchResponse) {
  return search.lastUpdated ? ` Last updated: ${search.lastUpdated}.` : "";
}

function getTopFmgeCountriesByAppeared(limit = 5) {
  return [...fmgeCountries]
    .sort((first, second) => second.appeared - first.appeared)
    .slice(0, limit);
}

function getTopFmgeCollegesByAppeared(limit = 5) {
  return fmgeCountries
    .flatMap((country) =>
      country.colleges.map((college) => ({
        country: country.country,
        name: college.name,
        appeared: college.appeared,
        passed: college.passed,
        passRate: college.passRate,
      }))
    )
    .sort((first, second) => second.appeared - first.appeared)
    .slice(0, limit);
}

function wantsFmgeVolumeRanking(normalizedQuery: string) {
  return (
    normalizedQuery.includes("most appeared") ||
    normalizedQuery.includes("highest appeared") ||
    normalizedQuery.includes("maximum appeared") ||
    normalizedQuery.includes("most number") ||
    normalizedQuery.includes("highest number") ||
    normalizedQuery.includes("largest number") ||
    normalizedQuery.includes("has most") ||
    normalizedQuery.includes("most student") ||
    normalizedQuery.includes("highest student") ||
    normalizedQuery.includes("best country") ||
    normalizedQuery.includes("best countries") ||
    normalizedQuery.includes("best college") ||
    normalizedQuery.includes("best university")
  );
}

function formatCountryName(country: string) {
  if (country === "RUSSIAN FEDERATION") return "Russia";
  if (country === "UNITED ARAB EMIRATES") return "UAE";
  if (country === "UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND") {
    return "United Kingdom";
  }

  return country
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildFmgeCountryVolumeAnswer() {
  const topCountries = getTopFmgeCountriesByAppeared(5);
  const leader = topCountries[0];
  const countryList = topCountries
    .map(
      (country, index) =>
        `${index + 1}. ${formatCountryName(country.country)} - ${country.appeared.toLocaleString("en-IN")} appeared, ${country.passed.toLocaleString("en-IN")} passed, ${country.passRate} pass rate`
    )
    .join("\n");

  return [
    `By FMGE appeared count, ${formatCountryName(leader.country)} has the strongest student-volume signal in the current ILMALINK FMGE dataset.`,
    `Top countries by appeared count:\n${countryList}`,
    "Use appeared count as a demand/experience signal, then compare pass rate, university recognition, budget, safety, course duration, internship, English medium, and NMC/FMGL compliance before choosing.",
  ].join("\n\n");
}

function buildFmgeCollegeVolumeAnswer() {
  const topColleges = getTopFmgeCollegesByAppeared(5);
  const leader = topColleges[0];
  const collegeList = topColleges
    .map(
      (college, index) =>
        `${index + 1}. ${college.name} (${formatCountryName(college.country)}) - ${college.appeared.toLocaleString("en-IN")} appeared, ${college.passed.toLocaleString("en-IN")} passed, ${college.passRate} pass rate`
    )
    .join("\n");

  return [
    `By FMGE appeared count, ${leader.name} has the strongest college/university volume signal in the current ILMALINK FMGE dataset.`,
    `Top colleges/universities by appeared count:\n${collegeList}`,
    "Appeared count can suggest student volume and past Indian-student presence, but it is not an admission guarantee. Compare pass rate, accreditation, fees, safety, course duration, internship, English medium, and NMC/FMGL compliance before final admission.",
  ].join("\n\n");
}

function buildCutoffAnswer(search: SiteDataSearchResponse) {
  const stateItems = getItemsByKind(search, "mbbs-india-state");
  const bestState = stateItems[0];

  if (!bestState) {
    return "Cutoff depends on NEET score, category, domicile, quota, round, college type, and budget. This question needs personalised score/category/domicile checking. Connect ILMALINK for a sharper reply.";
  }

  const state = asString(bestState.data?.state) ?? bestState.title;
  const queryMentionsState = stateItems.some((item) => {
    const stateName = asString(item.data?.state);

    return stateName
      ? normalizeSiteSearchText(search.query).includes(
          normalizeSiteSearchText(stateName)
        )
      : false;
  });

  if (!queryMentionsState) {
    return "Cutoff depends on NEET score, category, domicile, quota, round, college type, and budget. For a lowest-cutoff state shortlist, your score, category, domicile and fee range should be checked together. Connect ILMALINK for a personalised shortlist.";
  }

  const accessLabel = asString(bestState.data?.accessLabel);
  const accessDetail = asString(bestState.data?.accessDetail);
  const privateCount = asNumber(bestState.data?.privateCount);
  const totalSeats = asNumber(bestState.data?.totalSeats);

  return [
    "Cutoff should be read trend-wise, not as a guarantee.",
    `For trend-wise planning, ${state} is a relevant state to review because it is tagged as ${accessLabel ?? "a state counselling route"}${privateCount !== null ? ` with ${privateCount} private MBBS colleges` : ""}${totalSeats !== null ? ` and ${totalSeats.toLocaleString("en-IN")} total MBBS seats` : ""}.`,
    accessDetail ? `Counselling note: ${accessDetail}` : null,
    "Needs score, category, domicile, quota, round, college type, and budget verification before any admission decision.",
  ]
    .filter(Boolean)
    .join(" ");
}

function buildStateCounsellingAnswer(search: SiteDataSearchResponse) {
  const state = getTopByKind(search, "mbbs-india-state");

  if (!state) {
    return "Counselling rules depend on domicile, quota, round, seat type, documents, and reporting instructions. Connect ILMALINK for personalised guidance on this question.";
  }

  const accessDetail = asString(state.data?.accessDetail);

  return `${state.title} is the closest counselling match. ${state.description}${accessDetail ? ` ${accessDetail}` : ""} Verify the latest state counselling notice, quota rules, document list, seat matrix, and reporting instructions before choice filling.${getSourceText()}${getLastUpdatedText(search)}`;
}

function buildSeatMatrixAnswer(search: SiteDataSearchResponse) {
  const advisory = search.matchedItems.find(
    (item) => item.matchedDataType === "Official Advisory"
  );
  const state = getTopByKind(search, "mbbs-india-state");

  if (advisory) {
    return `The closest seat matrix or round update is "${advisory.title}". ${advisory.description} Use Connect ILMALINK for a round-wise counselling review before choice filling.${getSourceText()}${getLastUpdatedText(search)}`;
  }

  if (state) {
    return `For ${state.title}, seat matrix details can change round-wise. Verify the latest official counselling notice before choice filling, especially if the question is about a current round.`;
  }

  return "Seat matrix updates are round-wise and time-sensitive. This question can be answered better by our experts after checking the exact state, round and quota. Connect ILMALINK for a personalised review.";
}

function buildCollegeAnswer(search: SiteDataSearchResponse) {
  const college = getTopByKind(search, "mbbs-india-college");

  if (!college) {
    return "For college shortlisting, the college/state name, NEET score, category, domicile and budget matter together. Connect ILMALINK for personalised college shortlisting.";
  }

  return `${college.title} is listed as ${college.description}${formatFacts(college)} Cutoff, fee, quota, and admission chances must be verified with NEET score, category, domicile, and counselling round.`;
}

function buildCountryComparisonAnswer(search: SiteDataSearchResponse) {
  const countries = getItemsByKind(search, "fmge-country").slice(0, 3);
  const normalizedQuery = normalizeSearchQueryWithCorrections(search.query);
  const isGenericBestCountryQuestion =
    normalizedQuery.includes("best country") ||
    normalizedQuery.includes("best countries") ||
    normalizedQuery.includes("country to study") ||
    normalizedQuery.includes("countries to study");

  if (isGenericBestCountryQuestion || wantsFmgeVolumeRanking(normalizedQuery)) {
    return buildFmgeCountryVolumeAnswer();
  }

  if (countries.length > 0) {
    const summary = countries
      .map((country) => `${country.title}: ${country.description}`)
      .join(" ");

    return `Here are the closest FMGE country matches. ${summary} FMGE result alone should not decide admission; compare course duration, internship, English medium, licence eligibility, safety, budget, and NMC/FMGL compliance.`;
  }

  const countryPage = search.matchedItems.find(
    (item) => item.matchedDataType === "Country Page"
  );

  if (countryPage) {
    return `${countryPage.title} is a relevant country page. ${countryPage.description} Compare fees, university recognition, FMGE trends, safety, internship, and NMC/FMGL compliance before final admission.`;
  }

  return fallbackAnswer;
}

function buildFeeAnswer(search: SiteDataSearchResponse) {
  const university = getTopByKind(search, "kyrgyz-university");

  if (!university) {
    return "Fees can change by intake, semester, hostel, mess, visa, and university policy. Connect ILMALINK for the latest personalised fee estimate.";
  }

  const feeRows = Array.isArray(university.data?.feeRows)
    ? university.data?.feeRows
    : [];
  const firstFee = feeRows[0] as
    | {
        year?: string;
        semester?: string;
        tuitionFee?: string;
        hostelAccommodation?: string;
        mess?: string;
        totalCost?: string;
      }
    | undefined;
  const feeLine = firstFee
    ? `${firstFee.year ?? "First listed year"} ${firstFee.semester ?? ""}: tuition ${firstFee.tuitionFee ?? "not specified"}, hostel ${firstFee.hostelAccommodation ?? "not specified"}, mess ${firstFee.mess ?? "not specified"}, total ${firstFee.totalCost ?? "not specified"}.`
    : "Fee details need expert verification.";

  return `${university.title} has this first listed fee row: ${feeLine} Fees may change by intake, payment schedule, hostel/mess choice, visa, air ticket, and university policy. Use Connect ILMALINK for a current fee and admission review.`;
}

function buildAccreditationAnswer(search: SiteDataSearchResponse) {
  const university = getTopByKind(search, "kyrgyz-university");

  if (!university) {
    return "Accreditation, recognition, WDOMS listing, and NMC/FMGL compliance must be checked carefully before admission. Connect ILMALINK if you want this institution checked by name.";
  }

  const label = asString(university.data?.accreditationLabel);
  const recommendation = asString(university.data?.recommendationLevel);
  const message = asString(university.data?.recommendationMessage);

  return `${university.title} is marked as "${label ?? university.description}". Recommendation status: ${recommendation ?? "needs expert review before admission"}. ${message ?? ""} Use Connect ILMALINK to check latest accreditation, course duration, internship, WDOMS, local licence eligibility, and NMC/FMGL compliance.`;
}

function buildFmgeAnswer(search: SiteDataSearchResponse) {
  const normalizedQuery = normalizeSearchQueryWithCorrections(search.query);
  const asksForCollegeVolume =
    wantsFmgeVolumeRanking(normalizedQuery) &&
    (normalizedQuery.includes("college") ||
      normalizedQuery.includes("university") ||
      normalizedQuery.includes("institute"));
  const asksForCountryVolume =
    wantsFmgeVolumeRanking(normalizedQuery) &&
    (normalizedQuery.includes("country") ||
      normalizedQuery.includes("countries"));

  if (asksForCollegeVolume) {
    return buildFmgeCollegeVolumeAnswer();
  }

  if (asksForCountryVolume) {
    return buildFmgeCountryVolumeAnswer();
  }

  const fmgeItem =
    getTopByKind(search, "fmge-country") ??
    getTopByKind(search, "fmge-college");

  if (!fmgeItem) {
    return "For FMGE comparison, enter a country or university name. Connect ILMALINK for a personalised country/university comparison.";
  }

  return `${fmgeItem.title}: ${fmgeItem.description}${formatFacts(fmgeItem)} FMGE data is only one planning indicator and does not mean NMC approval or admission suitability.`;
}

function buildNmcFmglAnswer(search: SiteDataSearchResponse) {
  const matches = search.matchedItems.slice(0, 3);
  const matchedText = matches.length
    ? ` Relevant pages found: ${matches.map((item) => item.title).join("; ")}.`
    : "";

  return `For NMC/FMGL planning, students should verify course duration, internship structure, English-medium instruction, WDOMS listing, local licence eligibility, and latest NMC/FMGL compliance before admission.${matchedText} I will not treat this as guaranteed eligibility without official verification.`;
}

function buildAdvisoryAnswer(search: SiteDataSearchResponse) {
  const advisory = search.matchedItems.find(
    (item) => item.matchedDataType === "Official Advisory"
  );

  if (advisory) {
    return `The closest advisory match is "${advisory.title}". ${advisory.description}${getLastUpdatedText(search)} Use Connect ILMALINK if you want an expert to review this advisory before you act.`;
  }

  return "Official advisories can be time-sensitive. Connect ILMALINK and our experts can review the exact country, university, counselling body or advisory topic with you.";
}

function buildGeneralAnswer(search: SiteDataSearchResponse) {
  const top = search.matchedItems[0];

  if (!top) {
    return fallbackAnswer;
  }

  return `The closest match is "${top.title}". ${top.description}${formatFacts(top)}${getSourceText()} Use Connect ILMALINK for latest rules, fees, cutoffs, accreditation, and counselling-instruction review before final admission.`;
}

export function buildSiteAnswerFromSearch(
  search: SiteDataSearchResponse
): AskIlmalinkAnswer {
  const notFound =
    search.matchedItems.length === 0 || search.confidence === "low";

  if (notFound) {
    return {
      answer: fallbackAnswer,
      confidence: search.confidence,
      matchedItems: search.matchedItems,
      suggestedLinks: search.suggestedLinks,
      shouldShowConnectCTA: true,
      notFound: true,
    };
  }

  const answer =
    search.intent === "mbbs-india-cutoff"
      ? buildCutoffAnswer(search)
      : search.intent === "mbbs-india-state-counselling"
        ? buildStateCounsellingAnswer(search)
        : search.intent === "seat-matrix-round-update"
          ? buildSeatMatrixAnswer(search)
          : search.intent === "mbbs-india-college-search"
            ? buildCollegeAnswer(search)
            : search.intent === "mbbs-abroad-country-comparison"
              ? buildCountryComparisonAnswer(search)
              : search.intent === "university-fee"
                ? buildFeeAnswer(search)
                : search.intent === "accreditation-status"
                  ? buildAccreditationAnswer(search)
                  : search.intent === "fmge-data"
                    ? buildFmgeAnswer(search)
                    : search.intent === "nmc-fmgl-rules"
                      ? buildNmcFmglAnswer(search)
                      : search.intent === "official-advisory"
                        ? buildAdvisoryAnswer(search)
                        : buildGeneralAnswer(search);

  return {
    answer,
    confidence: search.confidence,
    matchedItems: search.matchedItems,
    suggestedLinks: search.suggestedLinks,
    shouldShowConnectCTA: true,
    notFound: false,
  };
}

export function answerSiteQuestion(question: string) {
  const search = searchInternalSiteData(question);

  return buildSiteAnswerFromSearch(search);
}
