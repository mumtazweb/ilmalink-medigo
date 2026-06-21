import {
  fmgeCountries,
  type FMGECollege,
  type FmgeCountry,
} from "../data/fmgeCountries";

export const FMGE_2025_DISCLAIMER =
  "FMGE 2025 data is compiled from NBEMS official institute-wise performance records for student information only. It is not a university ranking, admission guarantee, licence guarantee or recommendation.";

export const FMGE_2025_DATA_NOT_AVAILABLE =
  "FMGE 2025 data not available in the NBEMS report for this country.";

export const FMGE_OFFICIAL_TOTALS = {
  countries: 48,
  colleges: 513,
  appeared: 78905,
  passed: 16973,
  passRate: "21.51%",
} as const;

const countryAliases: Record<string, string> = {
  "IRAN": "IRAN ISLAMIC REPUBLIC OF IRAN",
  "IRAN ISLAMIC REPUBLIC OF IRAN": "IRAN ISLAMIC REPUBLIC OF IRAN",
  "ISLAMIC REPUBLIC OF IRAN": "IRAN ISLAMIC REPUBLIC OF IRAN",
  "MOLDOVA": "REPUBLIC OF MOLDOVA",
  "REPUBLIC OF MOLDOVA": "REPUBLIC OF MOLDOVA",
  "RUSSIA": "RUSSIAN FEDERATION",
  "RUSSIAN FEDERATION": "RUSSIAN FEDERATION",
  "UAE": "UNITED ARAB EMIRATES",
  "UNITED ARAB EMIRATES": "UNITED ARAB EMIRATES",
  "UK": "UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND",
  "UNITED KINGDOM": "UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND",
  "ENGLAND": "UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND",
  "GREAT BRITAIN": "UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND",
  "UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND":
    "UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND",
  "USA": "UNITED STATES OF AMERICA",
  "US": "UNITED STATES OF AMERICA",
  "UNITED STATES": "UNITED STATES OF AMERICA",
  "UNITED STATES OF AMERICA": "UNITED STATES OF AMERICA",
  "KYRGYZ REPUBLIC": "KYRGYZSTAN",
  "KYRGYZSTAN": "KYRGYZSTAN",
};

const normalizeLookupKey = (value: string) =>
  value
    .toUpperCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " AND ")
    .replace(/[^A-Z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const countryByLookupKey = new Map(
  fmgeCountries.map((country) => [normalizeLookupKey(country.country), country])
);

export function normalizeCountryName(name: string) {
  const lookupKey = normalizeLookupKey(name);
  return countryAliases[lookupKey] ?? lookupKey;
}

export function normalizeFmgeText(value: string) {
  return normalizeLookupKey(value);
}

export function getFmgeCountry(countryName: string): FmgeCountry | undefined {
  return countryByLookupKey.get(normalizeCountryName(countryName));
}

export function getFmgeSummary(countryName: string) {
  const country = getFmgeCountry(countryName);

  if (!country) {
    return {
      available: false as const,
      message: FMGE_2025_DATA_NOT_AVAILABLE,
    };
  }

  return {
    available: true as const,
    country,
    countryName: country.country,
    appeared: country.appeared,
    passed: country.passed,
    passRate: country.passRate,
    colleges: country.colleges.length,
  };
}

export function getFmgeCollege(
  countryName: string,
  collegeName: string
): FMGECollege | undefined {
  const country = getFmgeCountry(countryName);
  if (!country) return undefined;

  const collegeKey = normalizeLookupKey(collegeName);
  return country.colleges.find(
    (college) => normalizeLookupKey(college.name) === collegeKey
  );
}

export function getTopFmgeColleges(countryName: string, limit = 10) {
  const country = getFmgeCountry(countryName);
  if (!country) return [];

  return [...country.colleges]
    .sort(
      (first, second) =>
        second.appeared - first.appeared ||
        second.passed - first.passed ||
        first.name.localeCompare(second.name)
    )
    .slice(0, limit);
}

export function getOverallFmgeTotals() {
  const totals = fmgeCountries.reduce(
    (summary, country) => {
      summary.countries += 1;
      summary.colleges += country.colleges.length;
      summary.appeared += country.appeared;
      summary.passed += country.passed;
      return summary;
    },
    {
      countries: 0,
      colleges: 0,
      appeared: 0,
      passed: 0,
      passRate: "0.00%",
    }
  );

  return {
    ...totals,
    passRate:
      totals.appeared > 0
        ? `${((totals.passed / totals.appeared) * 100).toFixed(2)}%`
        : "0.00%",
  };
}
