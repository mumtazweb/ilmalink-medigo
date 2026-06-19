import { fmgeCountries, type FmgeCountry } from "./fmgeData";
import {
  kyrgyzstanUniversities,
  type KyrgyzUniversityPageData,
} from "./kyrgyzstanUniversities";
import {
  georgiaUniversities,
  type GeorgiaUniversityPageData,
} from "./georgiaUniversities";
import { navbarCountryDestinations } from "./navbarDestinations";
import type { MBBSIndiaCollege } from "./mbbsIndiaColleges";

export const counsellingEventName = "ilmalink:open-counselling";
export const whatsappCounsellingUrl = "https://wa.me/919563910223";

export const slugifyRouteSegment = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const normalizeLookupKey = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const toTitleCase = (value: string) =>
  value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const extraStaticCountryRoutes = [
  { label: "Barbados", href: "/mbbs-abroad/barbados" },
  { label: "Singapore", href: "/mbbs-abroad/singapore" },
  { label: "Vietnam", href: "/mbbs-abroad/vietnam" },
];

const countryRouteAliases: Record<
  string,
  { href: string; label: string }
> = {
  [normalizeLookupKey("IRAN ISLAMIC REPUBLIC OF IRAN")]: {
    href: "/mbbs-abroad/iran",
    label: "Iran",
  },
  [normalizeLookupKey("RUSSIAN FEDERATION")]: {
    href: "/mbbs-abroad/russia",
    label: "Russia",
  },
  [normalizeLookupKey("UNITED ARAB EMIRATES")]: {
    href: "/mbbs-abroad/uae",
    label: "United Arab Emirates",
  },
  [normalizeLookupKey("UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND")]:
    {
      href: "/mbbs-abroad/uk",
      label: "United Kingdom",
    },
};

const knownCountryRoutes = [
  ...navbarCountryDestinations.map((destination) => ({
    label: destination.label,
    href: destination.href,
  })),
  ...extraStaticCountryRoutes,
];

const countryRouteByLookupKey = new Map(
  knownCountryRoutes.flatMap((destination) => {
    const labelWithoutParentheses = destination.label.replace(/\([^)]*\)/g, "");

    return [
      [normalizeLookupKey(destination.label), destination.href],
      [normalizeLookupKey(labelWithoutParentheses), destination.href],
      [normalizeLookupKey(slugifyRouteSegment(destination.label)), destination.href],
    ] as [string, string][];
  })
);

export const staticCountrySlugs = new Set(
  knownCountryRoutes.map((destination) => slugifyRouteSegment(destination.href.split("/").filter(Boolean).at(-1) ?? ""))
);

export function getFmgeCountryHref(country: string) {
  const lookupKey = normalizeLookupKey(country);
  const alias = countryRouteAliases[lookupKey];

  if (alias) return alias.href;

  return (
    countryRouteByLookupKey.get(lookupKey) ??
    `/mbbs-abroad/${slugifyRouteSegment(country)}`
  );
}

export function getFmgeCountryDisplayName(country: string) {
  return countryRouteAliases[normalizeLookupKey(country)]?.label ?? toTitleCase(country);
}

export function getFmgeCountryPageSlug(country: string) {
  return getFmgeCountryHref(country).split("/").filter(Boolean).at(-1) ?? slugifyRouteSegment(country);
}

export function getFmgeCountryBySlug(slug: string): FmgeCountry | undefined {
  return fmgeCountries.find((country) => getFmgeCountryPageSlug(country.country) === slug);
}

export function getGeneratedFmgeCountryStaticParams() {
  return fmgeCountries
    .filter((country) => !staticCountrySlugs.has(getFmgeCountryPageSlug(country.country)))
    .map((country) => ({ country: getFmgeCountryPageSlug(country.country) }));
}

function getKyrgyzUniversityForFmgeCollege(
  country: string,
  collegeName: string
): KyrgyzUniversityPageData | undefined {
  if (normalizeLookupKey(country) !== normalizeLookupKey("KYRGYZSTAN")) return undefined;

  const collegeKey = normalizeLookupKey(collegeName);

  return kyrgyzstanUniversities.find((university) => {
    if (normalizeLookupKey(university.name) === collegeKey) return true;

    return university.fmgePerformance?.some(
      (performance) => normalizeLookupKey(performance.sourceName) === collegeKey
    );
  });
}

function getGeorgiaUniversityForFmgeCollege(
  country: string,
  collegeName: string
): GeorgiaUniversityPageData | undefined {
  if (normalizeLookupKey(country) !== normalizeLookupKey("GEORGIA")) return undefined;

  const collegeKey = normalizeLookupKey(collegeName);

  return georgiaUniversities.find((university) => {
    if (normalizeLookupKey(university.name) === collegeKey) return true;

    return university.fmgePerformance?.some(
      (performance) => normalizeLookupKey(performance.sourceName) === collegeKey
    );
  });
}

export function getFmgeCollegeDetailHref(country: string, collegeName: string) {
  const kyrgyzUniversity = getKyrgyzUniversityForFmgeCollege(country, collegeName);

  if (kyrgyzUniversity?.pageExists) {
    return `/mbbs-abroad/kyrgyzstan/${kyrgyzUniversity.slug}`;
  }

  const georgiaUniversity = getGeorgiaUniversityForFmgeCollege(country, collegeName);

  if (georgiaUniversity?.pageExists) {
    return `/mbbs-abroad/georgia/${georgiaUniversity.slug}`;
  }

  return null;
}

export function getFmgeCollegeAnchor(country: string, collegeName: string) {
  return `fmge-college-${slugifyRouteSegment(`${country}-${collegeName}`)}`;
}

export function getFmgeCollegeContextHref(country: string, collegeName: string) {
  const university =
    getKyrgyzUniversityForFmgeCollege(country, collegeName) ??
    getGeorgiaUniversityForFmgeCollege(country, collegeName);

  if (university) {
    const countrySlug =
      normalizeLookupKey(country) === normalizeLookupKey("GEORGIA")
        ? "georgia"
        : "kyrgyzstan";
    const anchor =
      countrySlug === "georgia" ? "georgia-universities" : "universities";

    return `/mbbs-abroad/${countrySlug}?q=${encodeURIComponent(university.name)}#${anchor}`;
  }

  return `${getFmgeCountryHref(country)}#${getFmgeCollegeAnchor(country, collegeName)}`;
}

export function getFmgeCollegeConnectLabel(country: string, collegeName: string) {
  const university =
    getKyrgyzUniversityForFmgeCollege(country, collegeName) ??
    getGeorgiaUniversityForFmgeCollege(country, collegeName);

  if (university) {
    return `${university.name} does not have a full detail page yet. Connect with a counsellor for verified latest details.`;
  }

  return `${collegeName} does not have a full detail page yet. Connect with a counsellor for verified latest details in ${getFmgeCountryDisplayName(country)}.`;
}

export function getMBBSIndiaStateAnchor(state: string) {
  return slugifyRouteSegment(state);
}

export function getMBBSIndiaStateSlug(state: string) {
  return slugifyRouteSegment(state);
}

export function getMBBSIndiaStateHref(state: string) {
  return `/mbbs-india/${getMBBSIndiaStateSlug(state)}/`;
}

export function getMBBSIndiaCollegeSlug(
  college: Pick<MBBSIndiaCollege, "collegeName">
) {
  return slugifyRouteSegment(college.collegeName);
}

export function getMBBSIndiaCollegeAnchor(college: Pick<MBBSIndiaCollege, "state" | "collegeName">) {
  return `college-${slugifyRouteSegment(`${college.state}-${college.collegeName}`)}`;
}

export function getMBBSIndiaCollegeHref(college: Pick<MBBSIndiaCollege, "state" | "collegeName">) {
  return `${getMBBSIndiaStateHref(college.state)}${getMBBSIndiaCollegeSlug(college)}/`;
}
