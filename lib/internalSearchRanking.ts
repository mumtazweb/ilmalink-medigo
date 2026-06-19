export type InternalSearchRegion = "india" | "abroad" | "global";

export type InternalSearchNumberKind =
  | "marks"
  | "rank"
  | "fee"
  | "seats"
  | "percentage"
  | "gpa"
  | "year"
  | "number";

export type InternalSearchNumber = {
  raw: string;
  value: number;
  kind: InternalSearchNumberKind;
};

export type InternalSearchIntents = {
  college: boolean;
  course: boolean;
  fees: boolean;
  eligibility: boolean;
  counselling: boolean;
  rankMarks: boolean;
  scholarship: boolean;
  fmgeNmc: boolean;
  documents: boolean;
};

export type InternalSearchEntity = {
  canonicalName: string;
  country?: string;
  aliases: string[];
};

export type InternalSearchQueryProfile = {
  normalizedQuery: string;
  country?: string;
  state?: string;
  city?: string;
  regionIntent: InternalSearchRegion;
  explicitAbroad: boolean;
  comparison: boolean;
  entity?: InternalSearchEntity;
  intents: InternalSearchIntents;
  numbers: InternalSearchNumber[];
};

export type InternalSearchRecordLike = {
  id?: string;
  title: string;
  description?: string;
  url?: string;
  category?: string;
  tags?: string[];
  content?: string;
  country?: string;
  state?: string;
  city?: string;
  regionType?: InternalSearchRegion;
  data?: Record<string, unknown>;
};

export type InternalSearchRecordClassification = {
  regionType: InternalSearchRegion;
  country?: string;
  state?: string;
  city?: string;
};

type RegionAlias = {
  state: string;
  aliases: string[];
  cities?: string[];
};

type CountryAlias = {
  country: string;
  aliases: string[];
  slugs: string[];
};

const indiaRegions: RegionAlias[] = [
  { state: "Andaman Nicobar Islands", aliases: ["andaman nicobar islands", "andaman and nicobar islands"], cities: ["port blair"] },
  { state: "Andhra Pradesh", aliases: ["andhra pradesh"], cities: ["vijayawada", "visakhapatnam", "guntur", "tirupati"] },
  { state: "Arunachal Pradesh", aliases: ["arunachal pradesh"] },
  { state: "Assam", aliases: ["assam"], cities: ["guwahati", "dibrugarh", "silchar"] },
  { state: "Bihar", aliases: ["bihar"], cities: ["patna", "gaya", "muzaffarpur"] },
  { state: "Chandigarh", aliases: ["chandigarh"] },
  { state: "Chhattisgarh", aliases: ["chhattisgarh", "chattisgarh"], cities: ["raipur", "bilaspur"] },
  { state: "Delhi", aliases: ["delhi", "new delhi", "ncr"] },
  { state: "Goa", aliases: ["goa"], cities: ["panaji"] },
  { state: "Gujarat", aliases: ["gujarat"], cities: ["ahmedabad", "surat", "vadodara", "rajkot"] },
  { state: "Haryana", aliases: ["haryana"], cities: ["gurugram", "gurgaon", "faridabad", "rohtak"] },
  { state: "Himachal Pradesh", aliases: ["himachal pradesh"], cities: ["shimla"] },
  { state: "Jammu and Kashmir", aliases: ["jammu and kashmir", "jammu kashmir"], cities: ["jammu", "srinagar"] },
  { state: "Jharkhand", aliases: ["jharkhand"], cities: ["ranchi", "jamshedpur", "dhanbad"] },
  { state: "Karnataka", aliases: ["karnataka"], cities: ["bengaluru", "bangalore", "mangalore", "mysuru", "mysore"] },
  { state: "Kerala", aliases: ["kerala"], cities: ["kochi", "cochin", "thiruvananthapuram", "trivandrum", "kozhikode"] },
  { state: "Ladakh", aliases: ["ladakh"], cities: ["leh"] },
  { state: "Madhya Pradesh", aliases: ["madhya pradesh"], cities: ["bhopal", "indore", "jabalpur", "gwalior"] },
  { state: "Maharashtra", aliases: ["maharashtra"], cities: ["mumbai", "pune", "nagpur", "nashik", "aurangabad"] },
  { state: "Manipur", aliases: ["manipur"], cities: ["imphal"] },
  { state: "Meghalaya", aliases: ["meghalaya"], cities: ["shillong"] },
  { state: "Mizoram", aliases: ["mizoram"], cities: ["aizawl"] },
  { state: "Nagaland", aliases: ["nagaland"], cities: ["kohima"] },
  { state: "Odisha", aliases: ["odisha", "orissa"], cities: ["bhubaneswar", "cuttack"] },
  { state: "Puducherry", aliases: ["puducherry", "pondicherry"] },
  { state: "Punjab", aliases: ["punjab"], cities: ["amritsar", "ludhiana"] },
  { state: "Rajasthan", aliases: ["rajasthan"], cities: ["jaipur", "jodhpur", "udaipur", "kota"] },
  { state: "Sikkim", aliases: ["sikkim"], cities: ["gangtok"] },
  { state: "Tamil Nadu", aliases: ["tamil nadu"], cities: ["chennai", "coimbatore", "madurai", "salem"] },
  { state: "Telangana", aliases: ["telangana"], cities: ["hyderabad", "warangal"] },
  { state: "Tripura", aliases: ["tripura"], cities: ["agartala"] },
  { state: "Uttar Pradesh", aliases: ["uttar pradesh"], cities: ["lucknow", "noida", "kanpur", "varanasi", "agra", "meerut"] },
  { state: "Uttarakhand", aliases: ["uttarakhand", "uttaranchal"], cities: ["dehradun", "haldwani"] },
  { state: "West Bengal", aliases: ["west bengal", "bengal"], cities: ["kolkata", "calcutta", "durgapur", "siliguri"] },
];

const countryAliases: CountryAlias[] = [
  { country: "Kyrgyzstan", aliases: ["kyrgyzstan", "kirgizstan"], slugs: ["kyrgyzstan"] },
  { country: "Georgia", aliases: ["georgia", "tbilisi"], slugs: ["georgia"] },
  { country: "Bangladesh", aliases: ["bangladesh", "dgme", "bmdc"], slugs: ["bangladesh"] },
  { country: "China", aliases: ["china"], slugs: ["china"] },
  { country: "Nepal", aliases: ["nepal"], slugs: ["nepal"] },
  { country: "Russia", aliases: ["russia", "russian federation"], slugs: ["russia"] },
  { country: "Kazakhstan", aliases: ["kazakhstan"], slugs: ["kazakhstan"] },
  { country: "Uzbekistan", aliases: ["uzbekistan"], slugs: ["uzbekistan"] },
  { country: "Tajikistan", aliases: ["tajikistan"], slugs: ["tajikistan"] },
  { country: "Malaysia", aliases: ["malaysia"], slugs: ["malaysia"] },
  { country: "Egypt", aliases: ["egypt"], slugs: ["egypt"] },
  { country: "Saudi Arabia", aliases: ["saudi arabia"], slugs: ["saudi-arabia"] },
  { country: "Qatar", aliases: ["qatar"], slugs: ["qatar"] },
  { country: "UAE", aliases: ["uae", "united arab emirates", "dubai", "abu dhabi"], slugs: ["uae"] },
  { country: "Iran", aliases: ["iran"], slugs: ["iran"] },
  { country: "USA", aliases: ["usa", "united states", "united states of america"], slugs: ["usa"] },
  { country: "Canada", aliases: ["canada"], slugs: ["canada"] },
  { country: "Australia", aliases: ["australia"], slugs: ["australia"] },
  { country: "New Zealand", aliases: ["new zealand"], slugs: ["new-zealand"] },
  { country: "UK", aliases: ["uk", "united kingdom", "england"], slugs: ["uk"] },
  { country: "Barbados", aliases: ["barbados"], slugs: ["barbados"] },
  { country: "Singapore", aliases: ["singapore"], slugs: ["singapore"] },
  { country: "Vietnam", aliases: ["vietnam"], slugs: ["vietnam"] },
  { country: "Germany", aliases: ["germany"], slugs: ["germany"] },
];

const entityAliases: InternalSearchEntity[] = [
  {
    canonicalName: "Kyrgyz State Medical Academy",
    country: "Kyrgyzstan",
    aliases: ["ksma", "kyrgyz state medical academy", "i k akhunbaev kyrgyz state medical academy"],
  },
  {
    canonicalName: "International Higher School of Medicine",
    country: "Kyrgyzstan",
    aliases: ["ihsm", "international higher school of medicine"],
  },
  {
    canonicalName: "East European University",
    country: "Georgia",
    aliases: ["eeu", "east european university"],
  },
  {
    canonicalName: "Georgian American University",
    country: "Georgia",
    aliases: ["gau", "georgian american university"],
  },
  {
    canonicalName: "Tbilisi State Medical University",
    country: "Georgia",
    aliases: ["tsmu", "tbilisi state medical university"],
  },
];

const phraseIncludes = (text: string, phrase: string) =>
  ` ${text} `.includes(` ${normalizeInternalSearchText(phrase)} `);

const hasAnyPhrase = (text: string, phrases: string[]) =>
  phrases.some((phrase) => phraseIncludes(text, phrase));

export function normalizeInternalSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9%]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function canonicalCountry(value: string | undefined) {
  if (!value) return undefined;
  const normalized = normalizeInternalSearchText(value);

  if (normalized === "india") return "India";

  for (const item of countryAliases) {
    if (
      normalizeInternalSearchText(item.country) === normalized ||
      item.aliases.some((alias) => normalizeInternalSearchText(alias) === normalized) ||
      item.slugs.some((slug) => normalizeInternalSearchText(slug) === normalized)
    ) {
      return item.country;
    }
  }

  return value;
}

function findCountry(text: string) {
  for (const item of countryAliases) {
    if (hasAnyPhrase(text, item.aliases)) return item.country;
  }

  return undefined;
}

function findIndiaRegion(text: string) {
  for (const item of indiaRegions) {
    const city = item.cities?.find((candidate) => phraseIncludes(text, candidate));
    if (city) {
      return { state: item.state, city };
    }

    if (hasAnyPhrase(text, item.aliases)) {
      return { state: item.state, city: undefined };
    }
  }

  return {};
}

function findEntity(text: string) {
  return entityAliases.find((entity) => hasAnyPhrase(text, entity.aliases));
}

function parseNumbers(text: string): InternalSearchNumber[] {
  const matches = [...text.matchAll(/\b\d[\d,]*(?:\.\d+)?%?\b/g)];

  return matches.flatMap((match) => {
    const raw = match[0];
    const value = Number(raw.replace(/[,%]/g, ""));
    if (!Number.isFinite(value)) return [];

    const start = Math.max(0, (match.index ?? 0) - 22);
    const end = Math.min(text.length, (match.index ?? 0) + raw.length + 22);
    const context = text.slice(start, end);
    let kind: InternalSearchNumberKind = "number";

    if (/%|percent|percentage|percentile/.test(context)) kind = "percentage";
    else if (/\bgpa\b/.test(context)) kind = "gpa";
    else if (/\brank|air\b/.test(context)) kind = "rank";
    else if (/\bmark|marks|score|scored|neet\b/.test(context) && value <= 720) kind = "marks";
    else if (/\bfee|fees|cost|budget|usd|inr|rupee|lakh|crore|tuition\b/.test(context)) kind = "fee";
    else if (/\bseat|seats\b/.test(context)) kind = "seats";
    else if (value >= 2000 && value <= 2100) kind = "year";

    return [{ raw, value, kind }];
  });
}

export function buildInternalSearchQueryProfile(
  query: string
): InternalSearchQueryProfile {
  const normalizedQuery = normalizeInternalSearchText(query);
  const entity = findEntity(normalizedQuery);
  const detectedCountry = entity?.country ?? findCountry(normalizedQuery);
  const region = findIndiaRegion(normalizedQuery);
  const comparison = hasAnyPhrase(normalizedQuery, [
    "compare",
    "comparison",
    "versus",
    "better than",
    "vs",
  ]);
  const explicitAbroad = hasAnyPhrase(normalizedQuery, [
    "abroad",
    "foreign",
    "overseas",
    "outside india",
    "mbbs abroad",
    "study abroad",
  ]);
  const rankMarks = hasAnyPhrase(normalizedQuery, [
    "rank",
    "neet",
    "marks",
    "mark",
    "score",
    "cutoff",
    "closing rank",
  ]);
  const college = hasAnyPhrase(normalizedQuery, [
    "college",
    "colleges",
    "university",
    "universities",
    "institute",
    "institution",
    "academy",
  ]);
  const indiaSignal = hasAnyPhrase(normalizedQuery, [
    "india",
    "mbbs india",
    "neet",
    "mcc",
    "aiq",
    "all india quota",
    "state quota",
    "government medical college",
    "private medical college",
    "deemed university",
    "management quota",
    "wbjee",
  ]);
  const isIndiaIntent = Boolean(
    !detectedCountry &&
      (region.state || indiaSignal || (rankMarks && college && !explicitAbroad))
  );

  return {
    normalizedQuery,
    country: detectedCountry,
    state: region.state,
    city: region.city,
    regionIntent: detectedCountry
      ? "abroad"
      : isIndiaIntent
        ? "india"
        : explicitAbroad
          ? "abroad"
          : "global",
    explicitAbroad,
    comparison,
    entity,
    intents: {
      college,
      course: hasAnyPhrase(normalizedQuery, ["course", "program", "programme", "mbbs", "md"]),
      fees: hasAnyPhrase(normalizedQuery, ["fee", "fees", "cost", "budget", "tuition", "hostel", "mess", "usd", "inr"]),
      eligibility: hasAnyPhrase(normalizedQuery, ["eligibility", "eligible", "criteria", "requirement", "pcb", "gpa", "percentage"]),
      counselling: hasAnyPhrase(normalizedQuery, ["counselling", "counseling", "choice filling", "mcc", "aiq", "quota", "seat matrix", "allotment", "round"]),
      rankMarks,
      scholarship: hasAnyPhrase(normalizedQuery, ["scholarship", "loan", "financial aid", "education loan"]),
      fmgeNmc: hasAnyPhrase(normalizedQuery, ["fmge", "nbems", "nmc", "fmgl", "wdoms", "pass rate", "appeared", "passed"]),
      documents: hasAnyPhrase(normalizedQuery, ["document", "documents", "passport", "scorecard", "admit card"]),
    },
    numbers: parseNumbers(normalizedQuery),
  };
}

function valueFromData(
  data: Record<string, unknown> | undefined,
  key: string
) {
  const value = data?.[key];
  return typeof value === "string" ? value : undefined;
}

function countryFromUrl(url: string) {
  const match = url.match(/^\/mbbs-abroad\/([^/?#]+)/);
  if (!match?.[1]) return undefined;

  return countryAliases.find((item) => item.slugs.includes(match[1]))?.country;
}

function stateFromUrl(url: string) {
  const match = url.match(/^\/mbbs-india\/([^/?#]+)/);
  if (!match?.[1]) return undefined;
  const slugText = normalizeInternalSearchText(match[1].replace(/-/g, " "));
  return findIndiaRegion(slugText).state;
}

export function classifyInternalSearchRecord(
  record: InternalSearchRecordLike
): InternalSearchRecordClassification {
  const kind = valueFromData(record.data, "kind") ?? "";
  const explicitState =
    record.state ??
    valueFromData(record.data, "state") ??
    stateFromUrl(record.url ?? "");
  const explicitCity = record.city ?? valueFromData(record.data, "city");
  const explicitCountry = canonicalCountry(
    record.country ?? valueFromData(record.data, "country")
  );

  if (
    record.regionType === "india" ||
    explicitCountry === "India" ||
    kind.startsWith("mbbs-india-") ||
    (record.url ?? "").startsWith("/mbbs-india") ||
    (record.url ?? "").startsWith("/neet") ||
    normalizeInternalSearchText(record.category ?? "").includes("mbbs india")
  ) {
    return {
      regionType: "india",
      country: "India",
      state: explicitState,
      city: explicitCity,
    };
  }

  const kindCountry =
    kind === "kyrgyz-university"
      ? "Kyrgyzstan"
      : kind === "georgia-university"
        ? "Georgia"
        : undefined;
  const urlCountry = countryFromUrl(record.url ?? "");
  const identityText = normalizeInternalSearchText(
    [
      record.title,
      record.category,
      record.tags?.join(" ") ?? "",
      record.url ?? "",
    ].join(" ")
  );
  const titleCountry = findCountry(
    normalizeInternalSearchText(record.title)
  );
  const identityCountry = findCountry(identityText);
  const detectedCountry =
    kindCountry ??
    titleCountry ??
    urlCountry ??
    identityCountry ??
    (explicitCountry === "India" ? undefined : explicitCountry);

  if (
    record.regionType === "abroad" ||
    detectedCountry ||
    kind === "fmge-country" ||
    kind === "fmge-college" ||
    (record.url ?? "").startsWith("/mbbs-abroad") ||
    normalizeInternalSearchText(record.category ?? "").includes("mbbs abroad") ||
    identityText.includes("mbbs abroad") ||
    normalizeInternalSearchText(record.category ?? "").includes("universities")
  ) {
    return {
      regionType: "abroad",
      country: detectedCountry,
      city: explicitCity,
    };
  }

  const identityRegion = findIndiaRegion(identityText);
  if (
    identityRegion.state ||
    hasAnyPhrase(identityText, ["mbbs india", "medical college india", "neet counselling"])
  ) {
    return {
      regionType: "india",
      country: "India",
      state: explicitState ?? identityRegion.state,
      city: explicitCity ?? identityRegion.city,
    };
  }

  return {
    regionType: record.regionType ?? "global",
    country: explicitCountry,
    state: explicitState,
    city: explicitCity,
  };
}

export function passesInternalSearchRegionFilter(
  profile: InternalSearchQueryProfile,
  classification: InternalSearchRecordClassification
) {
  if (profile.comparison) return true;

  if (profile.country) {
    return (
      classification.regionType === "abroad" &&
      classification.country === profile.country
    );
  }

  if (profile.regionIntent === "india") {
    if (classification.regionType !== "india") return false;

    if (
      profile.state &&
      classification.state &&
      classification.state !== profile.state
    ) {
      return false;
    }

    return true;
  }

  if (profile.regionIntent === "abroad") {
    return classification.regionType === "abroad";
  }

  return true;
}

export function getInternalSearchRankingBoost(
  profile: InternalSearchQueryProfile,
  classification: InternalSearchRecordClassification,
  record: InternalSearchRecordLike,
  searchableText: string
) {
  const text = normalizeInternalSearchText(searchableText);
  const title = normalizeInternalSearchText(record.title);
  const identity = normalizeInternalSearchText(
    [record.title, record.category, record.tags?.join(" ") ?? ""].join(" ")
  );
  const kind = valueFromData(record.data, "kind") ?? "";
  let score = 0;

  if (profile.country && classification.country === profile.country) score += 900;
  if (profile.regionIntent === "india" && classification.regionType === "india") score += 500;
  if (profile.state && classification.state === profile.state) score += 750;
  if (
    profile.state &&
    phraseIncludes(title, profile.state)
  ) {
    score += 500;

    if (title.includes("mbbs colleges")) {
      score += 800;
    }
  }
  if (profile.city && phraseIncludes(text, profile.city)) score += 240;

  if (profile.entity) {
    const entityPhrases = [
      profile.entity.canonicalName,
      ...profile.entity.aliases,
    ];

    if (hasAnyPhrase(title, entityPhrases)) score += 1_100;
    else if (hasAnyPhrase(identity, entityPhrases)) score += 700;
  }

  if (profile.intents.college) {
    if (
      kind === "mbbs-india-college" ||
      kind === "kyrgyz-university" ||
      kind === "georgia-university"
    ) {
      score += 180;
    }

    if (/college|university|institute|academy/.test(title)) score += 90;
  }

  if (profile.intents.fees && /fee|fees|tuition|cost|budget|hostel|mess|usd|inr|lakh/.test(text)) score += 180;
  if (profile.intents.eligibility && /eligibility|eligible|criteria|requirement|pcb|gpa|percentage|neet/.test(text)) score += 160;
  if (profile.intents.counselling && /counselling|counseling|choice filling|seat matrix|quota|round|allotment|mcc|aiq/.test(text)) score += 180;
  if (profile.intents.scholarship && /scholarship|loan|financial aid|education loan/.test(text)) score += 220;
  if (profile.intents.fmgeNmc && /fmge|nbems|nmc|fmgl|wdoms|pass rate|appeared|passed/.test(text)) score += 220;
  if (profile.intents.documents && /document|documents|passport|scorecard|admit card/.test(text)) score += 120;

  if (profile.intents.rankMarks && classification.regionType === "india") {
    if (record.id?.includes("rank-predictor")) score += 1_300;
    if (/cutoff|closing rank|seat matrix|counselling|rank predictor/.test(text)) score += 260;
    if (kind === "mbbs-india-college") score += 160;
  }

  for (const number of profile.numbers) {
    const normalizedNumber = String(number.value);
    if (phraseIncludes(text, normalizedNumber)) score += 90;

    if (
      number.kind === "fee" &&
      /fee|fees|tuition|cost|budget|usd|inr/.test(text)
    ) {
      score += 100;
    }
  }

  return score;
}
