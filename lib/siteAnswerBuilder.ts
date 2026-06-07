import {
  searchInternalSiteData,
  normalizeSiteSearchText,
  type SearchConfidence,
  type SiteDataSearchResponse,
  type SiteSearchMatch,
  type SuggestedSiteLink,
} from "./siteDataSearch";

export type AskIlmalinkAnswer = {
  answer: string;
  confidence: SearchConfidence;
  matchedItems: SiteSearchMatch[];
  suggestedLinks: SuggestedSiteLink[];
  shouldShowConnectCTA: true;
  notFound: boolean;
};

const fallbackAnswer =
  "I could not find enough verified information inside ILMALINK MEDIGO data for this question. Please connect with our counsellor for a personalised reply.";

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

function getSourceText(search: SiteDataSearchResponse) {
  if (search.sourceLabels.length === 0) {
    return "";
  }

  return ` Source: ${search.sourceLabels.slice(0, 3).join(", ")}.`;
}

function getLastUpdatedText(search: SiteDataSearchResponse) {
  return search.lastUpdated ? ` Last updated: ${search.lastUpdated}.` : "";
}

function buildCutoffAnswer(search: SiteDataSearchResponse) {
  const stateItems = getItemsByKind(search, "mbbs-india-state");
  const bestState = stateItems[0];

  if (!bestState) {
    return "Cutoff depends on NEET score, category, domicile, quota, round, college type, and budget. I could not find verified cutoff figures inside ILMALINK MEDIGO data for this exact question. Please connect with our counsellor for personalised score/category/domicile guidance.";
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
    return "Cutoff depends on NEET score, category, domicile, quota, round, college type, and budget. Exact verified state-wise lowest cutoff data is not available inside ILMALINK MEDIGO data for this question. I have linked the closest MBBS India/state counselling pages below, but admission planning needs score, category, domicile, quota, round, college type, and budget verification.";
  }

  const accessLabel = asString(bestState.data?.accessLabel);
  const accessDetail = asString(bestState.data?.accessDetail);
  const privateCount = asNumber(bestState.data?.privateCount);
  const totalSeats = asNumber(bestState.data?.totalSeats);

  return [
    "Based on available ILMALINK data, exact verified cutoff numbers are not available inside the website dataset yet.",
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
    return "I found general MBBS counselling information, but no exact state counselling match in the internal data for this query. Counselling rules depend on domicile, quota, round, seat type, documents, and reporting instructions. Please connect for personalised guidance.";
  }

  const accessDetail = asString(state.data?.accessDetail);

  return `Based on available ILMALINK data, ${state.title} is the closest counselling match. ${state.description}${accessDetail ? ` ${accessDetail}` : ""} Verify the latest state counselling notice, quota rules, document list, seat matrix, and reporting instructions before choice filling.${getSourceText(search)}${getLastUpdatedText(search)}`;
}

function buildSeatMatrixAnswer(search: SiteDataSearchResponse) {
  const advisory = search.matchedItems.find(
    (item) => item.matchedDataType === "Official Advisory"
  );
  const state = getTopByKind(search, "mbbs-india-state");

  if (advisory) {
    return `Based on approved ILMALINK official-update data, the closest seat matrix or round update is "${advisory.title}". ${advisory.description} New official changes should be reviewed before public data is replaced.${getSourceText(search)}${getLastUpdatedText(search)}`;
  }

  if (state) {
    return `I found related MBBS India state data for ${state.title}, but no approved latest seat matrix version for this exact question inside ILMALINK data. Seat matrix details can change round-wise, so verify the latest official counselling notice before choice filling.`;
  }

  return "I could not find an approved latest seat matrix update inside ILMALINK MEDIGO data for this exact question. Please connect with our counsellor for a personalised review.";
}

function buildCollegeAnswer(search: SiteDataSearchResponse) {
  const college = getTopByKind(search, "mbbs-india-college");

  if (!college) {
    return "I found MBBS India data, but not a specific college match for this question. Try entering the college or state name, or connect with our counsellor for personalised college shortlisting.";
  }

  return `Based on available ILMALINK data, ${college.title} is listed as ${college.description}${formatFacts(college)} Cutoff, fee, quota, and admission chances must be verified with NEET score, category, domicile, and counselling round.`;
}

function buildCountryComparisonAnswer(search: SiteDataSearchResponse) {
  const countries = getItemsByKind(search, "fmge-country").slice(0, 3);

  if (countries.length > 0) {
    const summary = countries
      .map((country) => `${country.title}: ${country.description}`)
      .join(" ");

    return `Based on available ILMALINK FMGE data, here are the closest country matches. ${summary} FMGE result alone should not decide admission; compare course duration, internship, English medium, licence eligibility, safety, budget, and NMC/FMGL compliance.`;
  }

  const countryPage = search.matchedItems.find(
    (item) => item.matchedDataType === "Country Page"
  );

  if (countryPage) {
    return `Based on available ILMALINK destination data, ${countryPage.title} is a relevant country page. ${countryPage.description} Compare fees, university recognition, FMGE trends, safety, internship, and NMC/FMGL compliance before final admission.`;
  }

  return fallbackAnswer;
}

function buildFeeAnswer(search: SiteDataSearchResponse) {
  const university = getTopByKind(search, "kyrgyz-university");

  if (!university) {
    return "I could not find a verified internal fee structure for this exact university or college. Fees can change by intake, semester, hostel, mess, visa, and university policy, so please connect for the latest verified estimate.";
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
    : "Fee rows are not fully available in the internal dataset.";

  return `Based on available ILMALINK data, ${university.title} has this first listed fee row: ${feeLine} Fees may change by intake, payment schedule, hostel/mess choice, visa, air ticket, and university policy. Verify before final admission.`;
}

function buildAccreditationAnswer(search: SiteDataSearchResponse) {
  const university = getTopByKind(search, "kyrgyz-university");

  if (!university) {
    return "I could not find a verified internal accreditation match for this exact institution. Accreditation, recognition, WDOMS listing, and NMC/FMGL compliance must be checked from official/latest data before admission.";
  }

  const label = asString(university.data?.accreditationLabel);
  const recommendation = asString(university.data?.recommendationLevel);
  const message = asString(university.data?.recommendationMessage);

  return `Based on available ILMALINK Kyrgyzstan university data, ${university.title} is marked as "${label ?? university.description}". Recommendation status: ${recommendation ?? "verify before admission"}. ${message ?? ""} Students must re-check latest official accreditation, course duration, internship, WDOMS, local licence eligibility, and NMC/FMGL compliance.`;
}

function buildFmgeAnswer(search: SiteDataSearchResponse) {
  const fmgeItem =
    getTopByKind(search, "fmge-country") ??
    getTopByKind(search, "fmge-college");

  if (!fmgeItem) {
    return "I could not find enough internal FMGE data for this exact query. Try a country or university name, or connect for a personalised comparison.";
  }

  return `Based on available ILMALINK FMGE data, ${fmgeItem.title}: ${fmgeItem.description}${formatFacts(fmgeItem)} FMGE data is only one planning indicator and does not mean NMC approval or admission suitability.`;
}

function buildNmcFmglAnswer(search: SiteDataSearchResponse) {
  const matches = search.matchedItems.slice(0, 3);
  const matchedText = matches.length
    ? ` Relevant ILMALINK pages/data found: ${matches.map((item) => item.title).join("; ")}.`
    : "";

  return `For NMC/FMGL planning, students should verify course duration, internship structure, English-medium instruction, WDOMS listing, local licence eligibility, and latest NMC/FMGL compliance before admission.${matchedText} I will not treat this as guaranteed eligibility without official verification.`;
}

function buildAdvisoryAnswer(search: SiteDataSearchResponse) {
  const advisory = search.matchedItems.find(
    (item) => item.matchedDataType === "Official Advisory"
  );

  if (advisory) {
    return `Based on approved ILMALINK official-source update data, the closest advisory match is "${advisory.title}". ${advisory.description}${getLastUpdatedText(search)} Please read the official source link and verify before acting.`;
  }

  return "I could not find an approved official advisory inside ILMALINK MEDIGO data for this exact question. The public Ask tool does not fetch live official websites. Please connect with our counsellor for a personalised review.";
}

function buildGeneralAnswer(search: SiteDataSearchResponse) {
  const top = search.matchedItems[0];

  if (!top) {
    return fallbackAnswer;
  }

  return `Based on available ILMALINK data, the closest match is "${top.title}". ${top.description}${formatFacts(top)}${getSourceText(search)} Please verify latest rules, fees, cutoffs, accreditation, and counselling instructions before final admission.`;
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
