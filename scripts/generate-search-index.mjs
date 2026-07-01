import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(rootDir, "app");
const jiti = createJiti(import.meta.url);
const blogDbPath = path.join(rootDir, "data", "blog-db.json");
const fmgeDataPath = path.join(rootDir, "app", "data", "fmgeData.ts");
const neetSearchEntriesPath = path.join(rootDir, "app", "data", "neetSearchEntries.json");
const neetQuestionsPath = path.join(rootDir, "app", "data", "neet2026Questions.json");
const reNeetCodeAnswerKeysPath = path.join(
  rootDir,
  "app",
  "data",
  "reNeet2026CodeAnswerKeys.json"
);
const outputPath = path.join(rootDir, "app", "data", "searchIndex.ts");
const BLOG_METADATA_PREFIX = "<!-- BLOG_METADATA:";
const BLOG_METADATA_SUFFIX = " -->";

const componentUrls = new Map([
  ["CounsellingPopup", "/"],
  ["FloatingContactButton", "/"],
  ["FMGEExplorerModal", "/mbbs-abroad/explorer"],
  ["NeetRankPredictorTool", "/"],
  ["Footer", "/"],
  ["HomeHeroClient", "/"],
  ["navbar", "/"],
]);

const publicSearchExcludedRoutes = [
  "/admin",
  "/api",
  "/login",
  "/create-account",
  "/forgot-password",
  "/reset-password",
  "/logout",
  "/search",
  "/dashboard",
  "/private",
  "/portal/student",
  "/portal/admin",
  "/portal/counsellor",
  "/portal/management",
  "/portal/forgot-password",
  "/portal/reset-password",
];

const blockedRoutePrefixes = [
  "/russianmarket",
  "/ultimateshop",
  "/blackbet",
  "/courses",
  "/key-function",
  "/area-of-operations",
  "/mode-of-operations",
  "/scholarship-info",
  "/career-roadmap",
  "/author",
  "/ar",
  "/bn",
  "/hi",
  "/login",
  "/create-account",
  "/forgot-password",
  "/reset-password",
  "/dashboard",
  "/wp-admin",
  "/wp-login",
  "/wp-login.php",
  "/xmlrpc.php",
  "/administrator",
  "/admin/login",
  "/user/login",
  "/casino",
  "/gambling",
  "/betting",
  "/adult",
  "/porn",
  "/escort",
];

const unwantedSlugSegmentPattern =
  /(?:^|[-_])(russianmarket|russian-market|ultimateshop|ultimate-shop|blackbet|black-bet|casino|gambling|betting|adult|porn|escort|viagra|cialis|levitra|fullz|carding|dumps|ccv)(?:$|[-_])/i;

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function isPublicSearchUrl(url) {
  const pathname = normalizePublicPath(url);

  if (isBlockedPublicPath(pathname)) {
    return false;
  }

  return !publicSearchExcludedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function normalizePublicPath(value) {
  let pathname = String(value ?? "").trim();

  if (!pathname) {
    return "/";
  }

  if (/^https?:\/\//i.test(pathname)) {
    try {
      pathname = new URL(pathname).pathname;
    } catch {
      return "";
    }
  }

  pathname = pathname.split(/[?#]/, 1)[0] || "/";

  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  pathname = pathname.replace(/\/+$/, "");

  return (pathname || "/").toLowerCase();
}

function hasUnwantedSlugSegment(value) {
  return String(value ?? "")
    .split("/")
    .filter(Boolean)
    .some((segment) => unwantedSlugSegmentPattern.test(segment));
}

function isBlockedPublicPath(value) {
  const pathname = normalizePublicPath(value);

  if (!pathname || pathname === "/") {
    return false;
  }

  if (
    blockedRoutePrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    )
  ) {
    return true;
  }

  return hasUnwantedSlugSegment(pathname);
}

function isBlockedBlogSlug(slug) {
  const normalizedSlug = String(slug ?? "")
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");

  return (
    hasUnwantedSlugSegment(normalizedSlug) ||
    isBlockedPublicPath(`/blogs/${normalizedSlug}`)
  );
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function routeSlug(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function loadDataModule(relativePath) {
  return jiti(path.join(rootDir, relativePath));
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function asUsefulArray(value) {
  return asArray(value).filter((item) => item !== null && item !== undefined && item !== "");
}

function canonicalizeKnownCollegeText(value) {
  return String(value ?? "")
    .replace(/Zakir Hossain/gi, "Jakir Hossain")
    .replace(/Jakir Hosain/gi, "Jakir Hossain")
    .replace(
      /Jakir Hossain Medical College(?: and Research Institute| & Research Institute)(?:, (?:Burdwan|Murshidabad))?|Jakir Hossain Medical College, Burdwan/gi,
      "Jakir Hossain Medical College, Jangipur, Murshidabad"
    );
}

function flattenTextParts(parts) {
  return parts
    .flat(Infinity)
    .filter((part) => part !== null && part !== undefined && part !== "")
    .map((part) => {
      if (typeof part === "string" || typeof part === "number") return String(part);
      if (typeof part === "object") {
        return Object.entries(part)
          .map(([key, value]) => `${key} ${value}`)
          .join(" ");
      }

      return "";
    })
    .filter(Boolean);
}

function createStructuredEntry({
  id,
  title,
  description,
  url,
  category,
  group,
  type,
  subType,
  tags = [],
  intentTags = [],
  content = [],
  priority = 100,
  country,
  state,
  city,
  collegeName,
  dataType,
  data,
}) {
  const compactAliases = [title, collegeName]
    .filter(Boolean)
    .map((value) => normalizeLookupKey(String(value)).replace(/\s+/g, ""))
    .filter((value, index, list) => value.length > 5 && list.indexOf(value) === index);
  const fullTags = [...asUsefulArray(tags), ...compactAliases];
  const textParts = flattenTextParts([
    title,
    description,
    category,
    dataType,
    country,
    state,
    city,
    collegeName,
    fullTags,
    intentTags,
    content,
  ]);

  return {
    id,
    title,
    description,
    url,
    category,
    group,
    type,
    subType,
    tags: fullTags,
    intentTags: asUsefulArray(intentTags),
    content: normalizeText(textParts.join(" ")),
    priority,
    country,
    state,
    city,
    collegeName,
    dataType,
    data,
  };
}

function normalizeLookupKey(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const countryRouteAliases = new Map([
  [
    normalizeLookupKey("IRAN ISLAMIC REPUBLIC OF IRAN"),
    "/mbbs-abroad/iran",
  ],
  [normalizeLookupKey("RUSSIAN FEDERATION"), "/mbbs-abroad/russia"],
  [
    normalizeLookupKey("UNITED ARAB EMIRATES"),
    "/mbbs-abroad/uae",
  ],
  [
    normalizeLookupKey("UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND"),
    "/mbbs-abroad/uk",
  ],
]);

const countryRoutes = [
  ["Kyrgyzstan", "/mbbs-abroad/kyrgyzstan"],
  ["Georgia", "/mbbs-abroad/georgia"],
  ["Bangladesh", "/mbbs-abroad/bangladesh"],
  ["Nepal", "/mbbs-abroad/nepal"],
  ["Russia", "/mbbs-abroad/russia"],
  ["Kazakhstan", "/mbbs-abroad/kazakhstan"],
  ["Uzbekistan", "/mbbs-abroad/uzbekistan"],
  ["Tajikistan", "/mbbs-abroad/tajikistan"],
  ["Malaysia", "/mbbs-abroad/malaysia"],
  ["Egypt", "/mbbs-abroad/egypt"],
  ["Saudi Arabia", "/mbbs-abroad/saudi-arabia"],
  ["Qatar", "/mbbs-abroad/qatar"],
  ["UAE", "/mbbs-abroad/uae"],
  ["Iran", "/mbbs-abroad/iran"],
  ["USA", "/mbbs-abroad/usa"],
  ["Canada", "/mbbs-abroad/canada"],
  ["Australia", "/mbbs-abroad/australia"],
  ["New Zealand", "/mbbs-abroad/new-zealand"],
  ["England (UK)", "/mbbs-abroad/uk"],
  ["Barbados", "/mbbs-abroad/barbados"],
  ["Singapore", "/mbbs-abroad/singapore"],
  ["Vietnam", "/mbbs-abroad/vietnam"],
  ["Germany", "/mbbs-abroad/germany"],
].flatMap(([label, href]) => {
  const labelWithoutParentheses = label.replace(/\([^)]*\)/g, "");

  return [
    [normalizeLookupKey(label), href],
    [normalizeLookupKey(labelWithoutParentheses), href],
    [normalizeLookupKey(slugify(label)), href],
  ];
});

const countryRouteByLookupKey = new Map(countryRoutes);

function getFmgeCountryHref(country) {
  const lookupKey = normalizeLookupKey(country);

  return (
    countryRouteAliases.get(lookupKey) ??
    countryRouteByLookupKey.get(lookupKey) ??
    `/mbbs-abroad/${slugify(country)}`
  );
}

const detailedFmgeCollegeRoutes = new Map([
  [
    `${normalizeLookupKey("KYRGYZSTAN")}::${normalizeLookupKey("INTERNATIONAL HIGHER SCHOOL OF MEDICINE")}`,
    "/mbbs-abroad/kyrgyzstan/international-higher-school-of-medicine",
  ],
  [
    `${normalizeLookupKey("KYRGYZSTAN")}::${normalizeLookupKey("I K AKHUNBAEV KYRGYZ STATE MEDICAL ACADEMY FACULTY OF GENERAL MEDICINE")}`,
    "/mbbs-abroad/kyrgyzstan/kyrgyz-state-medical-academy",
  ],
  [
    `${normalizeLookupKey("GEORGIA")}::${normalizeLookupKey("EAST EUROPEAN UNIVERSITY FACULTY OF HEALTHCARE SCIENCES")}`,
    "/mbbs-abroad/georgia/east-european-university",
  ],
  [
    `${normalizeLookupKey("GEORGIA")}::${normalizeLookupKey("ALTE UNIVERSITY SCHOOL OF MEDICINE")}`,
    "/mbbs-abroad/georgia/alte-university",
  ],
  [
    `${normalizeLookupKey("GEORGIA")}::${normalizeLookupKey("LLC ALTE UNIVERSITY")}`,
    "/mbbs-abroad/georgia/alte-university",
  ],
]);

function getFmgeCollegeUrl(country, college) {
  return (
    detailedFmgeCollegeRoutes.get(
      `${normalizeLookupKey(country)}::${normalizeLookupKey(college)}`
    ) ?? "/"
  );
}

function titleCase(value) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function normalizeText(value) {
  return decodeEntities(value)
    .replace(/\\r|\\n|\\t/g, " ")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/[{}()[\]<>`"'=;]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const officialBrandUpper = "ILMA" + "LINK";
const officialBrandTitle = "Ilma" + "link";
const officialDisplayStyle = "ilma" + "Link";
const serviceLineUpper = "MED" + "IGO";

function normalizeBrandIdentityText(value) {
  return String(value ?? "")
    .replace(new RegExp(`\\b${officialBrandUpper}\\b`, "g"), officialDisplayStyle)
    .replace(new RegExp(`\\b${serviceLineUpper}\\b`, "g"), "ilmalink")
    .replace(new RegExp(`\\b${officialBrandTitle}\\b`, "g"), "ilmalink");
}

function sentenceExcerpt(value, maxLength = 190) {
  const clean = normalizeText(value);
  if (clean.length <= maxLength) return clean;

  const shortened = clean.slice(0, maxLength);
  const lastSpace = shortened.lastIndexOf(" ");

  return `${shortened.slice(0, lastSpace > 80 ? lastSpace : maxLength).trim()}...`;
}

function stripJsxExpressions(value) {
  let current = value;
  let previous = "";

  while (current !== previous) {
    previous = current;
    current = current.replace(/\{[^{}]*\}/g, " ");
  }

  return current;
}

function extractHeadingText(value) {
  return normalizeText(
    stripJsxExpressions(value)
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
  );
}

function isUsefulSectionHeading(value, pageTitle) {
  const clean = normalizeText(value);
  if (clean.length < 4 || clean.length > 120) return false;
  if (!/[a-zA-Z]/.test(clean)) return false;
  if (clean === pageTitle) return false;
  if (/[{}$]/.test(clean)) return false;
  if (/^(home|open|close|search|submit|connect|whatsapp)$/i.test(clean)) return false;

  return true;
}

function routeContextLabel(url, pageTitle) {
  if (url === "/geo-profile") {
    return "Official Entity Reference";
  }

  const parts = url.split("/").filter(Boolean);
  const lastPart = parts.at(-1);
  if (!lastPart) return "Home";

  if (parts.includes("mbbs-abroad")) {
    return titleCase(lastPart.replace(/^country$/, "MBBS Abroad"));
  }

  if (parts.includes("blogs")) return "Blogs";
  if (parts.includes("mbbs-india")) return "MBBS India";

  return titleCase(lastPart) || pageTitle;
}

function titleContainsContext(title, context) {
  const titleTerms = new Set(normalizeLookupKey(title).split(" "));
  return normalizeLookupKey(context)
    .split(" ")
    .filter((term) => term.length > 2)
    .some((term) => titleTerms.has(term));
}

function sectionTitleForHeading(heading, pageTitle, url) {
  const context = routeContextLabel(url, pageTitle);
  if (titleContainsContext(heading, context)) return heading;

  return `${context}: ${heading}`;
}

function findAnchorNearHeading(source, headingIndex, headingTagSource) {
  const headingTagId = headingTagSource.match(/\bid\s*=\s*["']([^"']+)["']/);
  if (headingTagId?.[1]) return headingTagId[1];

  const beforeHeading = source.slice(Math.max(0, headingIndex - 1400), headingIndex);
  const idPattern = /\bid\s*=\s*["']([^"']+)["']/g;
  let match;
  let lastId = "";

  while ((match = idPattern.exec(beforeHeading))) {
    lastId = match[1];
  }

  return lastId;
}

function sectionPriorityForHeading(heading, group) {
  const normalizedHeading = normalizeLookupKey(heading);
  const basePriority = group === "Destinations" ? 78 : group === "Blogs" ? 84 : 62;
  const highIntentBoosts = [
    "eligibility",
    "admission",
    "requirements",
    "fees",
    "fee",
    "fmge",
    "nmc",
    "fmgl",
    "scholarship",
    "loan",
    "colleges",
    "universities",
    "faq",
  ];

  return (
    basePriority +
    highIntentBoosts.reduce(
      (score, term) => score + (normalizedHeading.includes(term) ? 4 : 0),
      0
    )
  );
}

function sectionTagsForHeading({ heading, pageTitle, url, group }) {
  const context = routeContextLabel(url, pageTitle);
  const routeTerms = url
    .split(/[/?#-]+/)
    .filter(Boolean)
    .map(titleCase);

  return [
    group,
    "Section",
    "Page Section",
    context,
    pageTitle,
    heading,
    ...routeTerms,
  ].filter(Boolean);
}

function extractSectionEntries({ source, url, pageTitle, group }) {
  const sectionEntries = [];
  const seenHeadings = new Set();
  const headingPattern = /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/g;
  let match;

  while ((match = headingPattern.exec(source))) {
    const [, level, attributes, children] = match;
    const heading = extractHeadingText(children);

    if (!isUsefulSectionHeading(heading, pageTitle)) continue;

    const headingKey = normalizeLookupKey(heading);
    if (seenHeadings.has(headingKey)) continue;
    seenHeadings.add(headingKey);

    const anchor = findAnchorNearHeading(source, match.index, `<${level}${attributes}>`);
    const sectionUrl = anchor ? `${url}#${anchor}` : url;
    const sectionSlice = source.slice(match.index, match.index + 2400);
    const context = routeContextLabel(url, pageTitle);
    const title = sectionTitleForHeading(heading, pageTitle, url);
    const content = normalizeText(
      [
        title,
        heading,
        pageTitle,
        context,
        extractVisibleText(sectionSlice),
      ].join(" ")
    );

    sectionEntries.push({
      id: `section-${slugify(url || "home") || "home"}-${slugify(heading)}`,
      title,
      description: sentenceExcerpt(content),
      url: sectionUrl,
      category: group === "Destinations" ? "Destination Sections" : "Page Sections",
      group,
      type: entryTypeForGroup(group),
      subType: "section",
      tags: sectionTagsForHeading({ heading, pageTitle, url, group }),
      content,
      priority: sectionPriorityForHeading(heading, group),
    });
  }

  return sectionEntries.slice(0, 18);
}

function isUsefulLiteral(value, before) {
  const clean = normalizeText(value);
  if (clean.length < 2) return false;
  if (!/[a-zA-Z]/.test(clean)) return false;
  if (/^(use client|use server)$/i.test(clean)) return false;
  if (/^(className|style|src|href|width|height|fill|stroke|viewBox)$/i.test(clean)) return false;
  if (/^@/.test(value)) return false;
  if (/^(application\/ld\+json|_blank|noopener|noreferrer|button|submit|force-static|summary_large_image|article|en_in)$/i.test(clean)) return false;
  if (/^(https?:|data:image|mailto:|tel:|wa\.me|\/|\.\/|\.\.\/|@\/|node:)/i.test(clean)) return false;
  if (/\.(svg|png|jpe?g|webp|gif|css|mjs|tsx?|jsx?|json)$/i.test(clean)) return false;

  const context = before.slice(-45);
  if (/\b(className|style|src|href|import|from|fill|stroke|viewBox|type|rel|target|d)\s*=\s*\{?\s*$/i.test(context)) return false;
  if (/"@(?:context|type|id)"\s*:\s*$/i.test(context)) return false;

  const tokens = clean.split(/\s+/);
  const utilityTokens = tokens.filter((token) => /[:\[\]{}]|^(sm|md|lg|xl|hover|focus|group|rounded|border|bg|text|flex|grid|px|py|mt|mb|mx|my|h|w|z)-/i.test(token));
  if (tokens.length > 4 && utilityTokens.length / tokens.length > 0.45) return false;

  return true;
}

function stripNonVisibleSource(source) {
  return source
    .replace(/^\s*["']use\s+(client|server)["'];?\s*$/gm, " ")
    .replace(/^\s*import\s+["'][^"']+["'];?\s*$/gm, " ")
    .replace(/^\s*import[\s\S]*?from\s+["'][^"']+["'];?\s*$/gm, " ")
    .replace(/^\s*export\s+type\s+[\s\S]*?;\s*$/gm, " ")
    .replace(/^\s*export\s+interface\s+[\s\S]*?}\s*$/gm, " ");
}

function extractReturnSource(source) {
  const returnPattern = /return\s*\(/g;
  let match;
  let lastReturnIndex = -1;
  let lastReturnLength = 0;

  while ((match = returnPattern.exec(source))) {
    lastReturnIndex = match.index;
    lastReturnLength = match[0].length;
  }

  if (lastReturnIndex === -1) return source;

  const afterReturn = source.slice(lastReturnIndex + lastReturnLength);
  const endIndex = afterReturn.lastIndexOf(");");

  return endIndex === -1 ? afterReturn : afterReturn.slice(0, endIndex);
}

function collectUsefulLiterals(source) {
  const literals = [];
  const literalPattern = /(["`])((?:\\.|(?!\1)[\s\S])*?)\1/g;
  let match;

  while ((match = literalPattern.exec(source))) {
    const literal = match[2];

    if (
      isUsefulLiteral(
        literal,
        source.slice(Math.max(0, match.index - 80), match.index)
      )
    ) {
      literals.push(literal);
    }
  }

  return literals;
}

function extractVisibleText(source) {
  const textParts = [];

  const withoutComments = source
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/\/\/[^\n\r]*/g, " ")
    .replace(/^\s*["']use\s+(client|server)["'];?\s*$/gm, " ")
    .replace(/^\s*import[\s\S]*?from\s+["'][^"']+["'];?\s*$/gm, " ")
    .replace(/^\s*import\s+["'][^"']+["'];?\s*$/gm, " ")
    .replace(/^\s*export\s+const\s+metadata[\s\S]*?;\s*$/gm, " ")
    .replace(/^\s*export\s+const\s+dynamic[\s\S]*?;\s*$/gm, " ")
    .replace(/^\s*const\s+[a-zA-Z0-9_]+\s*=[\s\S]*?;\s*$/gm, " ");

  const visibleSource = extractReturnSource(withoutComments);

  const jsxText = visibleSource
    .replace(/\bclassName\s*=\s*(?:"[^"]*"|'[^']*'|\{[^}]*\})/g, " ")
    .replace(/\b(?:href|src|style|width|height|fill|stroke|viewBox|d)\s*=\s*(?:"[^"]*"|'[^']*'|\{[^}]*\})/g, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/<\/?[a-z][^>\s]*\b[^>]*>/gi, " ");

  textParts.push(stripJsxExpressions(jsxText));

  const attributePattern =
    /\b(?:placeholder|aria-label|title|alt)\s*=\s*(?:"([^"]+)"|'([^']+)')/g;
  let attributeMatch;

  while ((attributeMatch = attributePattern.exec(visibleSource))) {
    textParts.push(attributeMatch[1] ?? attributeMatch[2]);
  }

  textParts.push(...collectUsefulLiterals(stripNonVisibleSource(source)));

  return normalizeText(textParts.join(" "))
    .replace(/\b([a-zA-Z0-9_]+)\.(map|filter|reduce|slice|join|replace|toLowerCase|toUpperCase)\b/gi, " ")
    .replace(/\b(className|export const|const|function|return|metadata|dangerouslySetInnerHTML|JSON.stringify|target|rel|noopener|noreferrer|_blank|application\/ld\+json|SectionHeading|VerificationCounsellingCard|CtaLink|Link|source|item|college|tag|key|eyebrow|buttonLabel|countryName)\b/gi, " ")
    .replace(/\b(?:section|div|span|ul|li|href|title|description|size|class)\b/gi, " ")
    .replace(/\b(?:inline-flex|items-center|justify-center|flex-shrink-0|rounded[-:\w/.[\]#]*|border[-:\w/.[\]#]*|bg[-:\w/.[\]#]*|text[-:\w/.[\]#]*|font[-:\w/.[\]#]*|shadow[-:\w/.[\]#]*|leading[-:\w/.[\]#]*|tracking[-:\w/.[\]#]*|grid[-:\w/.[\]#]*|gap[-:\w/.[\]#]*|px[-:\w/.[\]#]*|py[-:\w/.[\]#]*|pt[-:\w/.[\]#]*|pb[-:\w/.[\]#]*|mt[-:\w/.[\]#]*|mb[-:\w/.[\]#]*|mx[-:\w/.[\]#]*|my[-:\w/.[\]#]*|sm:[-:\w/.[\]#]+|md:[-:\w/.[\]#]+|lg:[-:\w/.[\]#]+|xl:[-:\w/.[\]#]+|h-\S+|w-\S+|max-w-\S+|min-h-\S+)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMetadataField(source, field) {
  const pattern = new RegExp(`${field}\\s*:\\s*["'\`]([\\s\\S]*?)["'\`]`);
  const match = source.match(pattern);

  return match ? normalizeText(match[1]) : "";
}

function splitBlogContent(value = "") {
  const markerIndex = value.lastIndexOf(BLOG_METADATA_PREFIX);

  if (markerIndex === -1) {
    return {
      content: value,
      metadata: {},
    };
  }

  const markerEnd = value.indexOf(BLOG_METADATA_SUFFIX, markerIndex);

  if (markerEnd === -1) {
    return {
      content: value,
      metadata: {},
    };
  }

  const encoded = value.slice(
    markerIndex + BLOG_METADATA_PREFIX.length,
    markerEnd
  );

  try {
    return {
      content: value.slice(0, markerIndex).trimEnd(),
      metadata: JSON.parse(Buffer.from(encoded, "base64").toString("utf8")),
    };
  } catch {
    return {
      content: value,
      metadata: {},
    };
  }
}

function routeFromPageFile(filePath) {
  const relative = toPosix(path.relative(appDir, filePath));
  if (relative.includes("[") || relative.includes("]")) return "";

  const route = relative
    .replace(/\/page\.tsx$/, "")
    .replace(/\/layout\.tsx$/, "")
    .replace(/^page\.tsx$/, "")
    .replace(/^layout\.tsx$/, "");

  return route ? `/${route}` : "/";
}

function entryGroupForUrl(url) {
  if (url.startsWith("/blogs")) return "Blogs";
  if (url.startsWith("/mbbs-abroad")) return "Destinations";
  return "Pages";
}

function entryTypeForGroup(group) {
  if (group === "Blogs") return "blog";
  if (group === "Destinations") return "destination";
  return "page";
}

async function walkFiles(dir, predicate, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walkFiles(fullPath, predicate, files);
    } else if (predicate(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function buildRouteEntries() {
 const files = await walkFiles(appDir, (filePath) =>
   /(?:^|[\\/])page\.tsx$/.test(filePath),
 );

  return Promise.all(
    files.map(async (filePath) => {
      const url = routeFromPageFile(filePath);
      if (!url) return null;
      if (isBlockedPublicPath(url)) return null;

      const source = await fs.readFile(filePath, "utf8");
      const content = extractVisibleText(source);
      const group = entryGroupForUrl(url);
      const title =
        extractMetadataField(source, "title") ||
        (url === "/" ? "Home" : titleCase(url.split("/").filter(Boolean).at(-1) ?? "Page"));
      const description =
        extractMetadataField(source, "description") ||
        sentenceExcerpt(content);
      const routeTag =
        url === "/geo-profile" ? routeContextLabel(url, title) : titleCase(url);
      const pageEntry = {
        id: `page-${slugify(url || "home") || "home"}`,
        title,
        description,
        url,
        category: group === "Destinations" ? "Destinations" : "Pages",
        group,
        type: entryTypeForGroup(group),
        tags: [group, routeTag],
        content,
        priority: group === "Destinations" ? 70 : 55,
      };

      return [
        pageEntry,
        ...extractSectionEntries({ source, url, pageTitle: title, group }),
      ];
    })
  ).then((entries) => entries.filter(Boolean).flat());
}

// Kept for optional component-level indexing without enabling it by default.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function buildComponentEntries() {
 const files = await walkFiles(appDir, (filePath) =>
   /(?:^|[\\/])page\.tsx$/.test(filePath),
 );

  return Promise.all(
    files.map(async (filePath) => {
      const source = await fs.readFile(filePath, "utf8");
      const content = extractVisibleText(source);
      const name = path.basename(filePath, ".tsx");
      const url = componentUrls.get(name) ?? "/";
      const isDestination = /country|destination|university|fmge/i.test(name + content);
      const group = isDestination ? "Destinations" : "Pages";
      const category =
        name === "FMGEExplorerModal"
          ? "FMGE Data"
          : /popup|contact|counselling/i.test(name)
            ? "Popups"
            : "Site Content";

      return {
        id: `component-${slugify(name)}`,
        title: titleCase(name),
        description: sentenceExcerpt(content),
        url,
        category,
        group,
        type: entryTypeForGroup(group),
        tags: [category, titleCase(name)],
        content,
        priority: category === "FMGE Data" ? 80 : 45,
      };
    })
  );
}

async function readFileBlogs() {
  let database;

  try {
    database = JSON.parse(await fs.readFile(blogDbPath, "utf8"));
  } catch {
    return [];
  }

  if (!Array.isArray(database.blogs)) return [];

  return database.blogs.filter(
    (blog) => blog.status === "published" && !isBlockedBlogSlug(blog.slug)
  );
}

async function readPrismaBlogs() {
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    try {
      const records = await prisma.blog.findMany({
        where: {
          status: "published",
        },
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
          content: true,
          category: true,
          country: true,
          status: true,
          views: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return records.map((record) => {
        const parsed = splitBlogContent(record.content);
        const metadata = parsed.metadata;
        const keywords = Array.isArray(metadata.keywords)
          ? metadata.keywords.filter(Boolean)
          : [];
        const tags = Array.isArray(metadata.tags)
          ? metadata.tags.filter(Boolean)
          : keywords;

        return {
          id: record.id,
          title: record.title,
          slug: record.slug,
          shortDescription: record.shortDescription,
          category: record.category,
          country: record.country || "India",
          tags: tags.length ? tags : [record.category],
          authorName: record.author?.name ?? "ilmaLink Editorial Team",
          publishDate:
            metadata.publishDate ?? record.createdAt.toISOString().slice(0, 10),
          updatedAt: record.updatedAt.toISOString(),
          readTime: metadata.readTime,
          status: record.status,
          seoTitle: metadata.seoTitle ?? record.title,
          metaDescription: metadata.metaDescription ?? record.shortDescription,
          keywords,
          content: parsed.content,
          views: record.views,
        };
      }).filter((blog) => !isBlockedBlogSlug(blog.slug));
    } finally {
      await prisma.$disconnect();
    }
  } catch (error) {
    console.warn(
      `Skipping Prisma blog search records: ${error instanceof Error ? error.message : String(error)}`
    );
    return [];
  }
}

function blogToSearchEntry(blog) {
  const title = canonicalizeKnownCollegeText(blog.title);
  const description = canonicalizeKnownCollegeText(
    blog.metaDescription || blog.shortDescription || blog.title
  );
  const tags = [
    ...(Array.isArray(blog.tags) ? blog.tags : []),
    ...(Array.isArray(blog.keywords) ? blog.keywords : []),
    blog.category,
    blog.country,
  ]
    .map(canonicalizeKnownCollegeText)
    .filter(Boolean);
  const content = canonicalizeKnownCollegeText(
    [
      blog.title,
      blog.seoTitle,
      blog.metaDescription,
      blog.shortDescription,
      blog.category,
      blog.country,
      blog.authorName,
      ...(Array.isArray(blog.tags) ? blog.tags : []),
      ...(Array.isArray(blog.keywords) ? blog.keywords : []),
      blog.content,
    ]
      .filter(Boolean)
      .join(" ")
  );

  return {
    id: `blog-${slugify(blog.slug || blog.id || blog.title)}`,
    title,
    description,
    url: `/blogs/${blog.slug}`,
    category: "Blogs",
    group: "Blogs",
    type: "blog",
    tags,
    content: normalizeText(content),
    priority: 90 + Math.min(Number(blog.views) || 0, 5000) / 1000,
  };
}

async function buildBlogEntries() {
  const blogsBySlug = new Map();

  for (const blog of await readFileBlogs()) {
    if (isBlockedBlogSlug(blog.slug)) continue;
    blogsBySlug.set(blog.slug || blog.id || blog.title, blog);
  }

  for (const blog of await readPrismaBlogs()) {
    if (isBlockedBlogSlug(blog.slug)) continue;
    blogsBySlug.set(blog.slug || blog.id || blog.title, blog);
  }

  return Array.from(blogsBySlug.values()).map(blogToSearchEntry);
}

async function buildFmgeEntries() {
  let source;

  try {
    source = await fs.readFile(fmgeDataPath, "utf8");
  } catch {
    return [];
  }

  const entries = [];
  const countryPattern =
    /  \{\n    country: "([^"]+)",\n    appeared: (\d+),\n    passed: (\d+),\n    passRate: "([^"]+)",\n    colleges: \[\n([\s\S]*?)\n    \],\n  \},/g;
  const collegePattern =
    /      \{\n        name: "([^"]+)",\n        appeared: (\d+),\n        passed: (\d+),\n        passRate: "([^"]+)",\n      \},/g;
  let countryMatch;

  while ((countryMatch = countryPattern.exec(source))) {
    const [, country, appeared, passed, passRate, collegesSource] = countryMatch;
    const colleges = [];
    let collegeMatch;

    while ((collegeMatch = collegePattern.exec(collegesSource))) {
      colleges.push({
        name: collegeMatch[1],
        appeared: Number(collegeMatch[2]),
        passed: Number(collegeMatch[3]),
        passRate: collegeMatch[4],
      });
    }

    entries.push({
      id: `fmge-country-${slugify(country)}`,
      title: `${country} FMGE 2025 Data`,
      description: `${Number(appeared).toLocaleString("en-IN")} appeared, ${Number(passed).toLocaleString("en-IN")} passed, ${passRate} pass rate across ${colleges.length} college entries.`,
      url: getFmgeCountryHref(country),
      category: "FMGE Data",
      group: "Destinations",
      type: "destination",
      tags: [country, "FMGE 2025", "NBEMS", "Country-wise FMGE Data"],
      content: normalizeText(
        [
          country,
          "FMGE 2025",
          "Country-wise FMGE Data",
          "NBEMS",
          appeared,
          passed,
          passRate,
          ...colleges.map((college) => college.name),
        ].join(" ")
      ),
      priority: 88,
    });

    for (const college of colleges) {
      entries.push({
        id: `fmge-college-${slugify(country)}-${slugify(college.name)}`,
        title: college.name,
        description: `${country} FMGE 2025: ${college.appeared.toLocaleString("en-IN")} appeared, ${college.passed.toLocaleString("en-IN")} passed, ${college.passRate} pass rate.`,
        url: getFmgeCollegeUrl(country, college.name),
        category: "FMGE Data",
        group: "Destinations",
        type: "destination",
        tags: [country, "FMGE 2025", "NBEMS", "College-wise FMGE Data"],
        content: normalizeText(
          [
            college.name,
            country,
            "FMGE 2025",
            "College-wise FMGE Data",
            "NBEMS",
            college.appeared,
            college.passed,
            college.passRate,
          ].join(" ")
        ),
        priority: 86,
      });
    }
  }

  return entries;
}

function rowListText(rows) {
  return asArray(rows)
    .map((row) =>
      Object.entries(row)
        .map(([key, value]) => `${key} ${value ?? "not available"}`)
        .join(" ")
    )
    .join(" ");
}

function hasUpdatedFeeRows(rows) {
  return asArray(rows).some((row) => {
    const text = normalizeLookupKey(Object.values(row).join(" "));
    return text && !text.includes("to be updated") && !text.includes("not available");
  });
}

function bangladeshCollegeUrl(college) {
  return college.pageExists === false
    ? "/mbbs-abroad/bangladesh#bangladesh-universities"
    : `/mbbs-abroad/bangladesh/${college.slug}/`;
}

function kyrgyzUniversityUrl(university) {
  return university.pageExists
    ? `/mbbs-abroad/kyrgyzstan/${university.slug}/`
    : "/mbbs-abroad/kyrgyzstan#universities";
}

function georgiaUniversityUrl(university) {
  return university.pageExists
    ? `/mbbs-abroad/georgia/${university.slug}/`
    : `/mbbs-abroad/georgia?q=${encodeURIComponent(university.name)}#georgia-universities`;
}

function mbbsIndiaStateUrl(state) {
  return `/mbbs-india/${routeSlug(state)}/`;
}

function mbbsIndiaCollegeUrl(college) {
  return `${mbbsIndiaStateUrl(college.state)}${routeSlug(college.collegeName)}/`;
}

function buildBangladeshStructuredEntries() {
  const {
    bangladeshFeaturedUniversities = [],
    bangladeshEligibilityRequirements = [],
    bangladeshGapRulePoints = [],
    bangladeshDocumentChecklist = [],
    bangladeshCountryStats = [],
    bangladeshGovernmentQuotaPoints = [],
  } = loadDataModule("app/data/bangladeshUniversities.ts");
  const { abroadCollegeRecommendations = {} } = loadDataModule(
    "app/data/mbbsCollegeFinderPlaceholderLogic.ts"
  );
  const entries = [];
  const country = "Bangladesh";
  const collegeNames = bangladeshFeaturedUniversities.map((college) => college.name);
  const featuredNames = bangladeshFeaturedUniversities
    .filter((college) => college.recommendationLevel === "Featured")
    .map((college) => college.name);
  const countryFeeText = bangladeshFeaturedUniversities
    .map(
      (college) =>
        `${college.name}: ${college.fees}; ${college.totalCourseFeeLabel}; ${college.hostelNote}`
    )
    .join(" ");

  entries.push(
    createStructuredEntry({
      id: "fee-bangladesh-mbbs-private-medical-colleges",
      title: "Bangladesh MBBS Private Medical College Fees",
      description:
        "College-wise Bangladesh MBBS fee, hostel, food, payment schedule and total package notes from the current ilmalink dataset.",
      url: "/mbbs-abroad/bangladesh#fees",
      category: "Bangladesh Admission Data",
      group: "Destinations",
      type: "destination",
      subType: "fees",
      dataType: "University Fee",
      country,
      tags: [
        country,
        "Bangladesh MBBS fees",
        "private medical college fees",
        "tuition fee",
        "hostel fee",
        "mess fee",
        "total package",
        ...collegeNames,
      ],
      intentTags: [
        "fees",
        "fee structure",
        "cost",
        "package",
        "tuition",
        "hostel",
        "mess",
        "budget",
        "payment",
      ],
      content: [countryFeeText, rowListText(bangladeshCountryStats)],
      priority: 124,
      data: {
        kind: "bangladesh-fees",
        country,
        colleges: collegeNames,
      },
    }),
    createStructuredEntry({
      id: "eligibility-bangladesh-mbbs-indian-students",
      title: "Bangladesh MBBS Eligibility for Indian Students",
      description:
        "Bangladesh MBBS GPA, Biology GP, NEET, gap-rule and admission-route eligibility points.",
      url: "/mbbs-abroad/bangladesh#eligibility",
      category: "Bangladesh Admission Data",
      group: "Destinations",
      type: "destination",
      subType: "eligibility",
      dataType: "Eligibility",
      country,
      tags: [
        country,
        "Bangladesh MBBS eligibility",
        "GPA rule",
        "Biology GP",
        "NEET required",
        "gap rule",
      ],
      intentTags: [
        "eligibility",
        "eligible",
        "neet required",
        "pcb",
        "gpa",
        "gap rule",
        "age",
        "marks required",
      ],
      content: [
        bangladeshEligibilityRequirements,
        bangladeshGapRulePoints,
        bangladeshGovernmentQuotaPoints,
      ],
      priority: 121,
      data: {
        kind: "bangladesh-eligibility",
        country,
        eligibility: bangladeshEligibilityRequirements,
        gapRules: bangladeshGapRulePoints,
      },
    }),
    createStructuredEntry({
      id: "documents-bangladesh-mbbs",
      title: "Bangladesh MBBS Required Documents",
      description:
        "Documents required for Bangladesh MBBS processing, eligibility, passport, NEET proof and DGME/BMDC route checks.",
      url: "/mbbs-abroad/bangladesh#documents",
      category: "Bangladesh Admission Data",
      group: "Destinations",
      type: "destination",
      subType: "documents",
      dataType: "Documents",
      country,
      tags: [
        country,
        "Bangladesh MBBS documents",
        "passport",
        "marksheet",
        "certificate",
        "NEET scorecard",
        "DGME",
        "BMDC",
      ],
      intentTags: [
        "documents",
        "required documents",
        "passport",
        "marksheet",
        "certificate",
        "embassy certificate",
        "oci",
        "nri",
      ],
      content: bangladeshDocumentChecklist,
      priority: 118,
      data: {
        kind: "bangladesh-documents",
        country,
        documents: bangladeshDocumentChecklist,
      },
    }),
    createStructuredEntry({
      id: "best-bangladesh-medical-colleges",
      title: "Best Bangladesh Medical Colleges for Indian Students",
      description:
        "Featured Bangladesh private medical colleges with fee letters, FMGE references and eligibility verification notes.",
      url: "/mbbs-abroad/bangladesh#bangladesh-universities",
      category: "Bangladesh Admission Data",
      group: "Destinations",
      type: "destination",
      subType: "ranking",
      dataType: "Ranking",
      country,
      tags: [
        country,
        "best Bangladesh medical colleges",
        "top Bangladesh medical colleges",
        "recommended Bangladesh colleges",
        ...featuredNames,
      ],
      intentTags: [
        "best",
        "top",
        "ranking",
        "preference",
        "recommended",
        "good college",
        "which college",
      ],
      content: [
        featuredNames.join(", "),
        ...bangladeshFeaturedUniversities.map(
          (college) =>
            `${college.name}: ${college.recommendationLevel}; ${college.recommendationMessage}; ${college.summary}; FMGE ${college.fmge?.appeared ?? "not available"} appeared ${college.fmge?.passed ?? "not available"} passed ${college.fmge?.passRate ?? "not available"} pass rate; ${college.fees}`
        ),
      ],
      priority: 122,
      data: {
        kind: "bangladesh-ranking",
        country,
        colleges: featuredNames,
      },
    })
  );

  for (const [index, college] of bangladeshFeaturedUniversities.entries()) {
    const url = bangladeshCollegeUrl(college);
    const commonTags = [
      country,
      "MBBS in Bangladesh",
      college.name,
      college.city,
      college.location,
      college.slug,
      college.ownership,
      college.recommendationLevel,
    ].filter(Boolean);
    const collegeContent = [
      college.summary,
      college.fees,
      college.feeHeadline,
      college.totalCourseFeeLabel,
      college.hostelNote,
      rowListText(college.feeRows),
      rowListText(college.paymentSchedule),
      rowListText(college.additionalFees),
      college.feeNotes,
      college.eligibility,
      college.documentChecklist,
      college.highlights,
      college.facts,
      college.warnings,
      college.recommendationMessage,
      college.disclaimer,
    ];

    entries.push(
      createStructuredEntry({
        id: `fee-bangladesh-${college.slug}`,
        title: `${college.name} MBBS Fees`,
        description: `${college.city}, Bangladesh: ${college.fees}. ${college.hostelNote}`,
        url,
        category: "Bangladesh Admission Data",
        group: "Destinations",
        type: "destination",
        subType: "fees",
        dataType: "University Fee",
        country,
        city: college.city,
        collegeName: college.name,
        tags: [
          ...commonTags,
          "fees",
          "fee structure",
          "tuition fee",
          "hostel fee",
          "mess fee",
          "total package",
          "payment schedule",
        ],
        intentTags: [
          "fees",
          "fee structure",
          "cost",
          "package",
          "tuition",
          "hostel",
          "mess",
          "budget",
          "payment",
        ],
        content: collegeContent,
        priority: 132 - index,
        data: {
          kind: "bangladesh-university",
          country,
          city: college.city,
          name: college.name,
          slug: college.slug,
          fees: college.fees,
          feeSummary: college.fees,
          totalCourseFeeLabel: college.totalCourseFeeLabel,
          hostelNote: college.hostelNote,
          feeRows: college.feeRows,
          paymentSchedule: college.paymentSchedule,
          additionalFees: college.additionalFees,
          feeNotes: college.feeNotes,
          fmge: college.fmge,
          pageExists: college.pageExists !== false,
          projectOrder: index,
        },
      }),
      createStructuredEntry({
        id: `fmge-bangladesh-${college.slug}`,
        title: `${college.name} FMGE 2025 Result`,
        description: `${college.fmge?.appeared ?? "Not available"} appeared, ${college.fmge?.passed ?? "not available"} passed, ${college.fmge?.passRate ?? "not available"} pass rate.`,
        url,
        category: "FMGE Data",
        group: "Destinations",
        type: "destination",
        subType: "fmge",
        dataType: "FMGE College",
        country,
        city: college.city,
        collegeName: college.name,
        tags: [
          ...commonTags,
          "FMGE",
          "FMGE result",
          "pass rate",
          "appeared",
          "passed",
          "NBEMS",
        ],
        intentTags: [
          "fmge",
          "pass rate",
          "appeared",
          "passed",
          "result",
          "nbems",
        ],
        content: [
          college.fmge?.sourceName,
          `${college.fmge?.appeared ?? "not available"} appeared`,
          `${college.fmge?.passed ?? "not available"} passed`,
          `${college.fmge?.passRate ?? "not available"} pass rate`,
          college.summary,
        ],
        priority: college.fmge?.appeared ? 116 - index : 92,
        data: {
          kind: "fmge-college",
          country,
          college: college.name,
          appeared: college.fmge?.appeared,
          passed: college.fmge?.passed,
          passRate: college.fmge?.passRate,
        },
      }),
      createStructuredEntry({
        id: `recognition-bangladesh-${college.slug}`,
        title: `${college.name} Recognition and Route Checks`,
        description: `${college.name} affiliation, DGME/BMDC route and NMC/FMGL verification notes for Indian students.`,
        url,
        category: "Bangladesh Admission Data",
        group: "Destinations",
        type: "destination",
        subType: "recognition",
        dataType: "Recognition",
        country,
        city: college.city,
        collegeName: college.name,
        tags: [
          ...commonTags,
          "recognition",
          "accreditation",
          "WDOMS",
          "NMC",
          "FMGL",
          "BMDC",
          "DGME",
        ],
        intentTags: [
          "nmc",
          "wdoms",
          "fmgl",
          "recognition",
          "accreditation",
          "approved",
          "listed",
          "license",
          "licence",
        ],
        content: [
          college.universityAffiliation,
          college.recommendationMessage,
          college.eligibility,
          college.warnings,
          college.disclaimer,
        ],
        priority: 104 - index,
        data: {
          kind: "bangladesh-recognition",
          country,
          city: college.city,
          college: college.name,
        },
      }),
      createStructuredEntry({
        id: `hostel-bangladesh-${college.slug}`,
        title: `${college.name} Hostel, Food and Living Cost`,
        description: `${college.name}: ${college.hostelNote}`,
        url,
        category: "Bangladesh Admission Data",
        group: "Destinations",
        type: "destination",
        subType: "hostel",
        dataType: "Hostel",
        country,
        city: college.city,
        collegeName: college.name,
        tags: [
          ...commonTags,
          "hostel",
          "mess",
          "food",
          "accommodation",
          "living cost",
          "safety",
          "location",
        ],
        intentTags: [
          "hostel",
          "mess",
          "food",
          "accommodation",
          "living cost",
          "safety",
          "campus",
        ],
        content: [
          college.hostelNote,
          rowListText(college.additionalFees),
          college.location,
          college.highlights,
          college.warnings,
        ],
        priority: 100 - index,
        data: {
          kind: "bangladesh-hostel",
          country,
          city: college.city,
          college: college.name,
        },
      })
    );
  }

  const knownBangladeshCollegeNames = new Set(
    bangladeshFeaturedUniversities.map((college) => normalizeLookupKey(college.name))
  );
  const recommendationGroups = [
    ...(abroadCollegeRecommendations.Bangladesh?.bestFit ?? []).map((college) => ({
      ...college,
      level: "Best fit",
    })),
    ...(abroadCollegeRecommendations.Bangladesh?.backup ?? []).map((college) => ({
      ...college,
      level: "Backup option",
    })),
  ];

  for (const [index, college] of recommendationGroups.entries()) {
    if (knownBangladeshCollegeNames.has(normalizeLookupKey(college.name))) continue;

    entries.push(
      createStructuredEntry({
        id: `ranking-bangladesh-${routeSlug(college.name)}`,
        title: `${college.name} Bangladesh MBBS Recommendation`,
        description: `${college.level}: ${college.reason}`,
        url: "/mbbs-abroad/bangladesh#bangladesh-universities",
        category: "Bangladesh Admission Data",
        group: "Destinations",
        type: "destination",
        subType: "ranking",
        dataType: "Ranking",
        country,
        collegeName: college.name,
        tags: [
          country,
          college.name,
          college.level,
          "Bangladesh MBBS recommendation",
          "best college",
          "backup college",
          "preference",
        ],
        intentTags: [
          "best",
          "top",
          "ranking",
          "preference",
          "recommended",
          "good college",
          "which college",
        ],
        content: [college.name, college.level, college.reason],
        priority: 100 - index,
        data: {
          kind: "bangladesh-ranking-college",
          country,
          college: college.name,
          recommendationLevel: college.level,
          recommendationMessage: college.reason,
        },
      })
    );
  }

  return entries;
}

function buildKyrgyzstanStructuredEntries() {
  const { kyrgyzstanUniversities = [], kyrgyzFinalDisclaimer = "" } =
    loadDataModule("app/data/kyrgyzstanUniversities.ts");
  const country = "Kyrgyzstan";
  const entries = [];
  const recommended = kyrgyzstanUniversities
    .filter((university) =>
      String(university.recommendationLevel).startsWith("Recommended")
    )
    .slice(0, 8);

  entries.push(
    createStructuredEntry({
      id: "best-kyrgyzstan-medical-universities",
      title: "Best Recommended Kyrgyzstan Medical Universities",
      description:
        "Recommended Kyrgyzstan medical universities based on ilmalink accreditation, fee, FMGE and caution-status data.",
      url: "/mbbs-abroad/kyrgyzstan#universities",
      category: "Kyrgyzstan Admission Data",
      group: "Destinations",
      type: "destination",
      subType: "ranking",
      dataType: "Ranking",
      country,
      tags: [
        country,
        "best college in Kyrgyzstan",
        "top medical university in Kyrgyzstan",
        "recommended Kyrgyzstan universities",
        ...recommended.map((university) => university.name),
      ],
      intentTags: [
        "best",
        "top",
        "ranking",
        "preference",
        "recommended",
        "good college",
        "which college",
        "better college",
        "compare",
      ],
      content: [
        recommended.map(
          (university, index) =>
            `${index + 1}. ${university.name}: ${university.recommendationLevel}; ${university.accreditationLabel}; ${university.recommendationMessage}`
        ),
        kyrgyzFinalDisclaimer,
      ],
      priority: 130,
      data: {
        kind: "kyrgyz-ranking",
        country,
        universities: recommended.map((university) => university.name),
      },
    }),
    createStructuredEntry({
      id: "eligibility-kyrgyzstan-mbbs",
      title: "Kyrgyzstan MBBS Eligibility and Documents",
      description:
        "Common Kyrgyzstan MBBS eligibility, NEET/PCB and document checklist points from listed university data.",
      url: "/mbbs-abroad/kyrgyzstan#eligibility",
      category: "Kyrgyzstan Admission Data",
      group: "Destinations",
      type: "destination",
      subType: "eligibility",
      dataType: "Eligibility",
      country,
      tags: [
        country,
        "Kyrgyzstan MBBS eligibility",
        "NEET required",
        "PCB",
        "documents",
      ],
      intentTags: [
        "eligibility",
        "eligible",
        "neet required",
        "pcb",
        "marks required",
        "documents",
      ],
      content: kyrgyzstanUniversities.flatMap((university) => [
        university.name,
        university.entryRequirements,
        university.documentChecklist,
      ]),
      priority: 116,
      data: {
        kind: "kyrgyz-eligibility",
        country,
      },
    })
  );

  for (const [index, university] of kyrgyzstanUniversities.entries()) {
    const url = kyrgyzUniversityUrl(university);
    const commonTags = [
      country,
      "MBBS in Kyrgyzstan",
      university.name,
      university.slug,
      university.location,
      university.accreditationLabel,
      university.recommendationLevel,
    ].filter(Boolean);
    const fmgeSummary = asArray(university.fmgePerformance)
      .map(
        (item) =>
          `${item.sourceName}: ${item.appeared} appeared, ${item.passed} passed, ${item.passRate} pass rate`
      )
      .join(" ");
    const campusFeeText = asArray(university.campuses)
      .map((campus) => `${campus.name} ${rowListText(campus.feeRows)}`)
      .join(" ");
    const feeText = [
      rowListText(university.feeRows),
      campusFeeText,
      rowListText(university.additionalFees),
      university.feeNotes,
      university.paymentTerms,
    ];

    if (hasUpdatedFeeRows(university.feeRows) || campusFeeText) {
      entries.push(
        createStructuredEntry({
          id: `fee-kyrgyzstan-${university.slug}`,
          title: `${university.name} Fee Structure`,
          description: `${university.name}, ${university.location}: semester-wise tuition, hostel, mess and total cost where listed.`,
          url,
          category: "Kyrgyzstan Admission Data",
          group: "Destinations",
          type: "destination",
          subType: "fees",
          dataType: "University Fee",
          country,
          city: university.location,
          collegeName: university.name,
          tags: [
            ...commonTags,
            "fees",
            "fee structure",
            "tuition",
            "hostel",
            "mess",
            "total package",
            "budget",
          ],
          intentTags: [
            "fees",
            "fee structure",
            "cost",
            "package",
            "tuition",
            "hostel",
            "mess",
            "budget",
            "payment",
          ],
          content: [
            feeText,
            university.highlights,
            university.entryRequirements,
            kyrgyzFinalDisclaimer,
          ],
          priority: university.pageExists ? 126 - index : 104 - index,
          data: {
            kind: "kyrgyz-university",
            country,
            slug: university.slug,
            name: university.name,
            location: university.location,
            feeRows: university.feeRows,
            campuses: university.campuses,
            feeNotes: university.feeNotes,
            recommendationLevel: university.recommendationLevel,
            accreditationLabel: university.accreditationLabel,
            pageExists: Boolean(university.pageExists),
            projectOrder: index,
          },
        })
      );
    }

    entries.push(
      createStructuredEntry({
        id: `recognition-kyrgyzstan-${university.slug}`,
        title: `${university.name} Recognition and Accreditation`,
        description: `${university.accreditationLabel}. ${university.recommendationLevel}.`,
        url,
        category: "Kyrgyzstan Admission Data",
        group: "Destinations",
        type: "destination",
        subType: "recognition",
        dataType: "Recognition",
        country,
        city: university.location,
        collegeName: university.name,
        tags: [
          ...commonTags,
          "recognition",
          "accreditation",
          "WDOMS",
          "NMC",
          "FMGL",
          "approved",
          "listed",
        ],
        intentTags: [
          "nmc",
          "wdoms",
          "fmgl",
          "recognition",
          "accreditation",
          "approved",
          "listed",
          "license",
          "licence",
        ],
        content: [
          university.accreditationStatus,
          university.accreditationLabel,
          university.recommendationLevel,
          university.recommendationMessage,
          university.highlights,
          university.history,
          kyrgyzFinalDisclaimer,
        ],
        priority: university.recommendationLevel === "No Admission" ? 92 : 118 - index,
        data: {
          kind: "kyrgyz-recognition",
          country,
          slug: university.slug,
          name: university.name,
          accreditationLabel: university.accreditationLabel,
          recommendationLevel: university.recommendationLevel,
        },
      })
    );

    if (fmgeSummary) {
      entries.push(
        createStructuredEntry({
          id: `fmge-kyrgyzstan-${university.slug}`,
          title: `${university.name} FMGE Result`,
          description: fmgeSummary,
          url,
          category: "FMGE Data",
          group: "Destinations",
          type: "destination",
          subType: "fmge",
          dataType: "FMGE College",
          country,
          city: university.location,
          collegeName: university.name,
          tags: [
            ...commonTags,
            "FMGE",
            "FMGE result",
            "pass rate",
            "appeared",
            "passed",
            "NBEMS",
          ],
          intentTags: [
            "fmge",
            "pass rate",
            "appeared",
            "passed",
            "result",
            "nbems",
          ],
          content: [fmgeSummary, university.recommendationMessage],
          priority: 114 - index,
          data: {
            kind: "fmge-college",
            country,
            college: university.name,
            fmgePerformance: university.fmgePerformance,
          },
        })
      );
    }

    if (university.facilities?.length || feeText.length) {
      entries.push(
        createStructuredEntry({
          id: `hostel-kyrgyzstan-${university.slug}`,
          title: `${university.name} Hostel, Mess and Campus`,
          description: `${university.name} hostel, mess, accommodation, campus and living notes from the available university data.`,
          url,
          category: "Kyrgyzstan Admission Data",
          group: "Destinations",
          type: "destination",
          subType: "hostel",
          dataType: "Hostel",
          country,
          city: university.location,
          collegeName: university.name,
          tags: [
            ...commonTags,
            "hostel",
            "mess",
            "food",
            "accommodation",
            "living cost",
            "safety",
            "campus",
          ],
          intentTags: [
            "hostel",
            "mess",
            "food",
            "accommodation",
            "living cost",
            "safety",
            "campus",
          ],
          content: [
            university.facilities,
            university.clinicalCenters,
            university.feeNotes,
            university.campuses?.map((campus) => [
              campus.name,
              campus.location,
              campus.facilities,
              campus.feeNotes,
            ]),
          ],
          priority: 100 - index,
          data: {
            kind: "kyrgyz-hostel",
            country,
            slug: university.slug,
          },
        })
      );
    }
  }

  return entries;
}

function buildGeorgiaStructuredEntries() {
  const { georgiaUniversities = [], georgiaFinalDisclaimer = "" } =
    loadDataModule("app/data/georgiaUniversities.ts");
  const country = "Georgia";
  const entries = [];
  const featured = georgiaUniversities
    .filter((university) => university.pageExists && university.recommendationLabel)
    .slice(0, 6);

  entries.push(
    createStructuredEntry({
      id: "best-georgia-medical-universities",
      title: "Best Georgia Medical Universities",
      description:
        "Georgia medical universities ranked for comparison using ilmalink fee, FMGE, recognition and recommendation data.",
      url: "/mbbs-abroad/georgia#georgia-universities",
      category: "Georgia Admission Data",
      group: "Destinations",
      type: "destination",
      subType: "ranking",
      dataType: "Ranking",
      country,
      tags: [
        country,
        "best college in Georgia",
        "top medical university in Georgia",
        "recommended Georgia universities",
        ...featured.map((university) => university.name),
      ],
      intentTags: [
        "best",
        "top",
        "ranking",
        "preference",
        "recommended",
        "good college",
        "which college",
        "better college",
        "compare",
      ],
      content: featured.map(
        (university, index) =>
          `${index + 1}. ${university.name}: ${university.recommendationLabel}; ${university.feeSummary}; ${university.accreditationLabel}; ${university.summary}`
      ),
      priority: 124,
      data: {
        kind: "georgia-ranking",
        country,
        universities: featured.map((university) => university.name),
      },
    }),
    createStructuredEntry({
      id: "eligibility-georgia-mbbs",
      title: "Georgia MBBS Eligibility and Documents",
      description:
        "Georgia MBBS eligibility, NEET/PCB, English-medium and document checklist points from university data.",
      url: "/mbbs-abroad/georgia#eligibility",
      category: "Georgia Admission Data",
      group: "Destinations",
      type: "destination",
      subType: "eligibility",
      dataType: "Eligibility",
      country,
      tags: [
        country,
        "Georgia MBBS eligibility",
        "NEET required",
        "PCB",
        "documents",
        "WDOMS",
      ],
      intentTags: [
        "eligibility",
        "eligible",
        "neet required",
        "pcb",
        "marks required",
        "documents",
      ],
      content: georgiaUniversities.flatMap((university) => [
        university.name,
        university.entryRequirements,
        university.documentChecklist,
        university.accreditationLabel,
      ]),
      priority: 114,
      data: {
        kind: "georgia-eligibility",
        country,
      },
    })
  );

  for (const [index, university] of georgiaUniversities.entries()) {
    const url = georgiaUniversityUrl(university);
    const commonTags = [
      country,
      "MBBS in Georgia",
      university.name,
      university.shortName,
      university.slug,
      university.city,
      university.location,
      university.recommendationLabel,
      university.accreditationLabel,
    ].filter(Boolean);
    const fmgeSummary = asArray(university.fmgePerformance)
      .map(
        (item) =>
          `${item.sourceName}: ${item.appeared} appeared, ${item.passed} passed, ${item.passRate} pass rate`
      )
      .join(" ");

    if (university.feeRows.length || university.feeSummary) {
      entries.push(
        createStructuredEntry({
          id: `fee-georgia-${university.slug}`,
          title: `${university.name} Fees`,
          description: `${university.name}, ${university.city}: ${university.feeSummary}`,
          url,
          category: "Georgia Admission Data",
          group: "Destinations",
          type: "destination",
          subType: "fees",
          dataType: "University Fee",
          country,
          city: university.city,
          collegeName: university.name,
          tags: [
            ...commonTags,
            "fees",
            "fee structure",
            "tuition",
            "hostel",
            "mess",
            "total package",
            "budget",
          ],
          intentTags: [
            "fees",
            "fee structure",
            "cost",
            "package",
            "tuition",
            "hostel",
            "mess",
            "budget",
            "payment",
          ],
          content: [
            university.feeSummary,
            university.totalTuition,
            university.annualTuition,
            university.mandatoryHostelMess,
            university.livingCost,
            rowListText(university.feeRows),
            rowListText(university.additionalFees),
            university.feeNotes,
            university.paymentTerms,
          ],
          priority: university.pageExists ? 126 - index : 100 - index,
          data: {
            kind: "georgia-university",
            country,
            slug: university.slug,
            name: university.name,
            city: university.city,
            feeSummary: university.feeSummary,
            totalTuition: university.totalTuition,
            annualTuition: university.annualTuition,
            mandatoryHostelMess: university.mandatoryHostelMess,
            feeRows: university.feeRows,
            feeNotes: university.feeNotes,
            recommendationLabel: university.recommendationLabel,
            pageExists: Boolean(university.pageExists),
            projectOrder: index,
          },
        })
      );
    }

    entries.push(
      createStructuredEntry({
        id: `recognition-georgia-${university.slug}`,
        title: `${university.name} Recognition and Accreditation`,
        description: `${university.accreditationLabel}. ${university.recommendationLabel}.`,
        url,
        category: "Georgia Admission Data",
        group: "Destinations",
        type: "destination",
        subType: "recognition",
        dataType: "Recognition",
        country,
        city: university.city,
        collegeName: university.name,
        tags: [
          ...commonTags,
          "recognition",
          "accreditation",
          "WDOMS",
          "NMC",
          "FMGL",
          "approved",
          "listed",
        ],
        intentTags: [
          "nmc",
          "wdoms",
          "fmgl",
          "recognition",
          "accreditation",
          "approved",
          "listed",
          "license",
          "licence",
        ],
        content: [
          university.accreditationLabel,
          university.recommendationLabel,
          university.summary,
          university.highlights,
          university.facts,
          georgiaFinalDisclaimer,
        ],
        priority: 112 - index,
        data: {
          kind: "georgia-recognition",
          country,
          slug: university.slug,
          name: university.name,
        },
      })
    );

    if (fmgeSummary) {
      entries.push(
        createStructuredEntry({
          id: `fmge-georgia-${university.slug}`,
          title: `${university.name} FMGE Result`,
          description: fmgeSummary,
          url,
          category: "FMGE Data",
          group: "Destinations",
          type: "destination",
          subType: "fmge",
          dataType: "FMGE College",
          country,
          city: university.city,
          collegeName: university.name,
          tags: [
            ...commonTags,
            "FMGE",
            "FMGE result",
            "pass rate",
            "appeared",
            "passed",
            "NBEMS",
          ],
          intentTags: [
            "fmge",
            "pass rate",
            "appeared",
            "passed",
            "result",
            "nbems",
          ],
          content: [fmgeSummary, university.summary],
          priority: 112 - index,
          data: {
            kind: "fmge-college",
            country,
            college: university.name,
            fmgePerformance: university.fmgePerformance,
          },
        })
      );
    }

    entries.push(
      createStructuredEntry({
        id: `hostel-georgia-${university.slug}`,
        title: `${university.name} Hostel, Living Cost and Campus`,
        description: `${university.name}: ${university.mandatoryHostelMess ?? university.livingCost ?? "hostel and living details should be verified"}.`,
        url,
        category: "Georgia Admission Data",
        group: "Destinations",
        type: "destination",
        subType: "hostel",
        dataType: "Hostel",
        country,
        city: university.city,
        collegeName: university.name,
        tags: [
          ...commonTags,
          "hostel",
          "mess",
          "food",
          "accommodation",
          "living cost",
          "safety",
          "campus",
        ],
        intentTags: [
          "hostel",
          "mess",
          "food",
          "accommodation",
          "living cost",
          "safety",
          "campus",
        ],
        content: [
          university.mandatoryHostelMess,
          university.livingCost,
          university.facilities,
          university.supportServices,
          university.feeNotes,
          rowListText(university.additionalFees),
        ],
        priority: 98 - index,
        data: {
          kind: "georgia-hostel",
          country,
          slug: university.slug,
        },
      })
    );
  }

  return entries;
}

function cutoffRowText(record) {
  return asArray(record.categories)
    .map((row) =>
      `${row.category}: round 1 score ${row.round1Score ?? "not available"} rank ${row.round1Rank ?? "not available"}; round 2 score ${row.round2Score ?? "not available"} rank ${row.round2Rank ?? "not available"}; round 3 score ${row.round3Score ?? "not available"} rank ${row.round3Rank ?? "not available"}; stray score ${row.strayScore ?? "not available"} rank ${row.strayRank ?? "not available"}`
    )
    .join(" ");
}

function seatRowText(rows) {
  return asArray(rows)
    .map(
      (row) =>
        `${row.quota}: total ${row.totalSeats ?? "not available"} allocated ${row.allocatedCategorySeats ?? "not available"} ${row.instituteType}; ${Object.entries(row.categorySeats ?? {})
          .map(([category, seats]) => `${category} ${seats ?? "not available"}`)
          .join(" ")}`
    )
    .join(" ");
}

function buildIndiaStructuredEntries() {
  const { mbbsIndiaCollegesByState = [] } =
    loadDataModule("app/data/mbbsIndiaColleges.ts");
  const {
    mbbsIndiaWestBengalPrivateFeeStructures = [],
  } = loadDataModule("app/data/mbbsIndiaFeeStructure.ts");
  const { getAllMBBSIndiaCollegeFacts } =
    loadDataModule("app/data/mbbsIndiaCollegeFacts.ts");

  return buildIndiaStructuredEntriesFromSources({
    mbbsIndiaCollegeFacts:
      typeof getAllMBBSIndiaCollegeFacts === "function"
        ? getAllMBBSIndiaCollegeFacts()
        : [],
    mbbsIndiaCollegesByState,
    mbbsIndiaWestBengalPrivateFeeStructures,
  });
}

function buildIndiaStructuredEntriesFromSources({
  mbbsIndiaCollegeFacts,
  mbbsIndiaCollegesByState,
  mbbsIndiaWestBengalPrivateFeeStructures,
}) {
  const counselling = globalThis.__mbbsIndiaCounselling2025;
  const entries = [];
  const country = "India";
  const facts = asArray(mbbsIndiaCollegeFacts);
  const factByCollegeKey = new Map(
    facts.map((fact) => [normalizeLookupKey(fact.college?.collegeName ?? ""), fact])
  );
  const findFactByName = (name) => factByCollegeKey.get(normalizeLookupKey(name));
  const findFactByAliases = (aliases) =>
    asArray(aliases)
      .map((alias) => findFactByName(alias))
      .find(Boolean);
  const feeTotalTextForRecord = (record) => {
    const fact = findFactByAliases(record.aliases) ?? findFactByName(record.collegeName);
    if (fact?.hasFee) return fact.feeText;

    return asArray(record.rows)
      .filter((row) => row?.yearLabel === "2025")
      .map((row) =>
        row?.totalTuition?.display
          ? `${row.quota} total ${row.totalTuition.display}`
          : ""
      )
      .filter(Boolean)
      .join("; ");
  };
  const privateFeeSummaries = asArray(mbbsIndiaWestBengalPrivateFeeStructures).map((record) => {
    const fact = findFactByAliases(record.aliases) ?? findFactByName(record.collegeName);
    const feeText = feeTotalTextForRecord(record);

    return {
      collegeName: fact?.college?.collegeName ?? record.collegeName,
      aliases: record.aliases,
      seatIntake: record.seatIntake,
      fees: feeText || "To be updated",
      feeText: feeText || "To be updated",
      hasFee: Boolean(feeText),
    };
  });

  entries.push(
    createStructuredEntry({
      id: "fee-west-bengal-private-medical-colleges",
      title: "West Bengal Private MBBS Fee Structure",
      description:
        "West Bengal private MBBS college-wise state quota and management quota total fees for 2025.",
      url: "/mbbs-india/west-bengal/",
      category: "MBBS India Admission Data",
      group: "Pages",
      type: "page",
      subType: "fees",
      dataType: "University Fee",
      country,
      state: "West Bengal",
      tags: [
        "West Bengal",
        "India",
        "private medical college fees",
        "MBBS India fees",
        "state quota",
        "management quota",
        ...privateFeeSummaries.map((record) => record.collegeName),
      ],
      intentTags: [
        "fees",
        "fee structure",
        "cost",
        "package",
        "tuition",
        "hostel",
        "mess",
        "budget",
        "payment",
        "management quota",
        "state quota",
      ],
      content: privateFeeSummaries.flatMap((record) => [
        record.collegeName,
        `${record.seatIntake ?? "not available"} seats`,
        record.feeText,
      ]),
      priority: 130,
      data: {
        kind: "mbbs-india-fees",
        country,
        state: "West Bengal",
        feeStructures: privateFeeSummaries,
      },
    }),
    createStructuredEntry({
      id: "cutoff-west-bengal-private-mbbs",
      title: "West Bengal Private MBBS Cutoff and Last Rank",
      description:
        "Prior-year 2025 West Bengal private MBBS cutoff, closing score, closing rank, quota and category reference.",
      url: "/mbbs-india/west-bengal/",
      category: "MBBS India Admission Data",
      group: "Pages",
      type: "page",
      subType: "cutoff",
      dataType: "Cutoff",
      country,
      state: "West Bengal",
      tags: [
        "West Bengal",
        "private MBBS cutoff",
        "last rank",
        "closing rank",
        "NEET rank",
        "management quota",
        "state quota",
      ],
      intentTags: [
        "cutoff",
        "cut off",
        "closing rank",
        "last rank",
        "opening rank",
        "rank",
        "neet rank",
        "score",
        "allotment",
      ],
      content: asArray(counselling?.cutoffs).flatMap((record) => [
        record.collegeName,
        cutoffRowText(record),
      ]),
      priority: 127,
      data: {
        kind: "mbbs-india-cutoff-summary",
        country,
        state: "West Bengal",
      },
    }),
    createStructuredEntry({
      id: "rank-west-bengal-private-medical-colleges",
      title: "West Bengal Private Medical College Preference Data",
      description:
        "Compare West Bengal private medical colleges using ilmalink seat, fee and prior-year counselling data.",
      url: "/mbbs-india/west-bengal/",
      category: "MBBS India Admission Data",
      group: "Pages",
      type: "page",
      subType: "ranking",
      dataType: "Ranking",
      country,
      state: "West Bengal",
      tags: [
        "West Bengal",
        "best private medical college",
        "top private medical college",
        "preference order",
        "recommended",
        ...privateFeeSummaries.map((record) => record.collegeName),
      ],
      intentTags: [
        "best",
        "top",
        "ranking",
        "preference",
        "recommended",
        "good college",
        "which college",
        "better college",
        "compare",
      ],
      content: privateFeeSummaries.flatMap((record) => [
        record.collegeName,
        `${record.seatIntake ?? "not available"} seats`,
        record.feeText,
      ]),
      priority: 120,
      data: {
        kind: "mbbs-india-ranking",
        country,
        state: "West Bengal",
      },
    })
  );

  for (const record of mbbsIndiaWestBengalPrivateFeeStructures) {
    const recordFact = findFactByAliases(record.aliases) ?? findFactByName(record.collegeName);
    const recordFeeText = feeTotalTextForRecord(record);
    const recordCollegeName = recordFact?.college?.collegeName ?? record.collegeName;

    entries.push(
      createStructuredEntry({
        id: `fee-west-bengal-${routeSlug(recordCollegeName)}`,
        title: `${recordCollegeName} MBBS Fees`,
        description: `${recordCollegeName}: ${recordFeeText || "Fees to be updated"}.`,
        url: recordFact?.href ?? mbbsIndiaCollegeUrl({
          state: "West Bengal",
          collegeName: recordCollegeName,
        }),
        category: "MBBS India Admission Data",
        group: "Pages",
        type: "page",
        subType: "fees",
        dataType: "University Fee",
        country,
        state: "West Bengal",
        collegeName: recordCollegeName,
        tags: [
          "West Bengal",
          "India",
          recordCollegeName,
          ...record.aliases,
          "fees",
          "fee structure",
          "state quota",
          "management quota",
          "tuition",
          "budget",
        ],
        intentTags: [
          "fees",
          "fee structure",
          "cost",
          "package",
          "tuition",
          "budget",
          "payment",
          "management quota",
          "state quota",
        ],
        content: [
          recordCollegeName,
          record.aliases,
          `${record.seatIntake ?? "not available"} seats`,
          recordFeeText,
        ],
        priority: 128,
        data: {
          kind: "mbbs-india-fee-structure",
          country,
          state: "West Bengal",
          collegeName: recordCollegeName,
          aliases: record.aliases,
          seatIntake: record.seatIntake,
          fees: recordFeeText || "To be updated",
          feeText: recordFeeText || "To be updated",
          hasFee: Boolean(recordFeeText),
        },
      })
    );
  }

  for (const cutoff of asArray(counselling?.cutoffs)) {
    const cutoffFact = findFactByName(cutoff.collegeName);
    const cutoffCollege = cutoffFact?.college ?? {
      state: cutoff.state,
      collegeName: cutoff.collegeName,
    };

    entries.push(
      createStructuredEntry({
        id: `cutoff-${routeSlug(cutoff.state)}-${routeSlug(cutoffCollege.collegeName)}`,
        title: `${cutoffCollege.collegeName} 2025 Cutoff and Last Rank`,
        description: `2025 ${cutoff.state} prior-year cutoff scores and closing ranks by category and round.`,
        url: cutoffFact?.href ?? mbbsIndiaCollegeUrl(cutoffCollege),
        category: "MBBS India Admission Data",
        group: "Pages",
        type: "page",
        subType: "cutoff",
        dataType: "Cutoff",
        country,
        state: cutoff.state,
        collegeName: cutoffCollege.collegeName,
        tags: [
          cutoff.state,
          cutoffCollege.collegeName,
          "cutoff",
          "last rank",
          "closing rank",
          "closing score",
          "NEET rank",
          "state quota",
          "management quota",
        ],
        intentTags: [
          "cutoff",
          "cut off",
          "closing rank",
          "last rank",
          "opening rank",
          "rank",
          "neet rank",
          "score",
          "allotment",
        ],
        content: [cutoffCollege.collegeName, cutoffFact?.cutoffText ?? cutoffRowText(cutoff)],
        priority: 126,
        data: {
          kind: "mbbs-india-cutoff",
          country,
          state: cutoff.state,
          collegeName: cutoffCollege.collegeName,
          cutoff,
        },
      })
    );
  }

  for (const fact of facts) {
    const { college } = fact;
    const feeLabel = fact.hasFee ? `Fees: ${fact.feeText}` : "Fees to be updated";
    entries.push(
      createStructuredEntry({
        id: `seats-${routeSlug(college.state)}-${routeSlug(college.collegeName)}`,
        title: `${college.collegeName} MBBS Seats and Establishment`,
        description: `${college.category} medical college in ${college.state} with ${college.seatCapacity.toLocaleString("en-IN")} MBBS seats; established ${college.establishmentYear}. ${feeLabel}.`,
        url: fact.href,
        category: "MBBS India Admission Data",
        group: "Pages",
        type: "page",
        subType: "seats",
        dataType: "Seats",
        country,
        state: college.state,
        collegeName: college.collegeName,
        tags: [
          college.state,
          college.collegeName,
          college.category,
          "MBBS India",
          "seats",
          "seat intake",
          "annual intake",
          "capacity",
          "establishment year",
          "fees",
          "fee structure",
          "seat matrix",
          "cutoff",
          "closing rank",
          "last rank",
          ...(fact.hasFee ? [fact.feeText] : []),
          "old college",
          "new college",
        ],
        intentTags: [
          "seats",
          "intake",
          "annual intake",
          "capacity",
          "establishment year",
          "old college",
          "new college",
          "fees",
          "fee structure",
          "seat matrix",
          "cutoff",
          "closing rank",
          "last rank",
        ],
        content: [
          fact.searchableText,
          `${college.seatCapacity} seats`,
          `established ${college.establishmentYear}`,
          feeLabel,
          fact.seatMatrixText,
          fact.cutoffText,
        ],
        priority: college.state === "West Bengal" ? 116 : 96,
        data: {
          kind: "mbbs-india-college",
          country,
          state: college.state,
          category: college.category,
          collegeName: college.collegeName,
          seatCapacity: college.seatCapacity,
          establishmentYear: college.establishmentYear,
          fees: fact.feeText,
          feeText: fact.feeText,
          seatText: fact.seatText,
          seatMatrixText: fact.seatMatrixText,
          cutoffText: fact.cutoffText,
          hasFee: fact.hasFee,
          hasSeatMatrix: fact.hasSeatMatrix,
          hasCutoff: fact.hasCutoff,
          counselling2025: fact.counselling,
        },
      })
    );
  }

  for (const group of mbbsIndiaCollegesByState) {
    entries.push(
      createStructuredEntry({
        id: `state-wise-india-college-search-${routeSlug(group.state)}`,
        title: `${group.state} MBBS College Search`,
        description: `${group.state}: ${group.privateCount} private, ${group.governmentCount} government and ${group.totalSeats.toLocaleString("en-IN")} total MBBS seats.`,
        url: mbbsIndiaStateUrl(group.state),
        category: "MBBS India Admission Data",
        group: "Pages",
        type: "page",
        subType: "state",
        dataType: "MBBS India State",
        country,
        state: group.state,
        tags: [
          group.state,
          "MBBS India",
          "state wise college search",
          "medical colleges",
          "government medical college",
          "private medical college",
          "seats",
          "counselling",
        ],
        intentTags: [
          "state-wise India college search",
          "seats",
          "best",
          "top",
          "admission route",
          "counselling route",
        ],
        content: [
          `${group.privateCount} private colleges`,
          `${group.governmentCount} government colleges`,
          `${group.totalSeats} seats`,
          group.privateColleges.map((college) => college.collegeName),
          group.governmentColleges.map((college) => college.collegeName),
        ],
        priority: group.state === "West Bengal" ? 120 : 100,
        data: {
          kind: "mbbs-india-state",
          country,
          state: group.state,
          privateCount: group.privateCount,
          governmentCount: group.governmentCount,
          totalSeats: group.totalSeats,
        },
      })
    );
  }

  return entries;
}

async function buildStructuredAdmissionEntries() {
  const counsellingPath = path.join(rootDir, "app", "data", "mbbsIndiaCounselling2025.json");
  const counsellingSource = await fs.readFile(counsellingPath, "utf8");

  globalThis.__mbbsIndiaCounselling2025 = JSON.parse(counsellingSource);

  try {
    return [
      ...buildBangladeshStructuredEntries(),
      ...buildKyrgyzstanStructuredEntries(),
      ...buildGeorgiaStructuredEntries(),
      ...buildIndiaStructuredEntries(),
    ];
  } finally {
    delete globalThis.__mbbsIndiaCounselling2025;
  }
}

function buildManualEntries() {
  const {
    ilmaLinkBrandAliases = [],
    ilmaLinkBrandMisspellings = [],
    ilmaLinkBrandDisambiguation = "",
  } = loadDataModule("app/data/geo.ts");
  const brandSearchTerms = [
    ...asArray(ilmaLinkBrandAliases),
    ...asArray(ilmaLinkBrandMisspellings),
  ];
  const entries = [
    {
      id: "official-ilmalink-brand-entity",
      title: "ilmalink Official Website and Brand Entity",
      description:
        "Official ilmalink website: ilmaLink is the public display style of ilmalink, a medical MBBS admission platform and consultancy for MBBS Abroad, MBBS India and NEET guidance.",
      url: "/",
      category: "Official Brand",
      group: "Pages",
      type: "page",
      subType: "brand-entity",
      dataType: "Official Brand",
      tags: [
        "ilmalink",
        "ilmaLink",
        "official ilmalink",
        "ilmalink official website",
        "ilmalink.com",
        "www.ilmalink.com",
        "MBBS admission platform",
        "MBBS abroad consultancy",
        "MBBS India guidance",
        "NEET guidance",
        "GEO entity reference",
        "AI entity reference",
        ...brandSearchTerms,
      ],
      intentTags: [
        "official website",
        "brand",
        "entity",
        "about",
        "contact",
        "ai",
        "geo",
      ],
      content: [
        "Official ilmalink website",
        "ilmalink is written as one word i-l-m-a-l-i-n-k",
        "ilmaLink is the public display style of ilmalink",
        "ilmalink is an extension/service line of ilmalink, not a separate brand",
        "ilmalink MBBS Abroad MBBS India NEET counselling scholarships education loans medical admission guidance",
        ilmaLinkBrandDisambiguation,
        brandSearchTerms.join(" "),
      ].join(" "),
      priority: 140,
      data: {
        kind: "brand-entity",
        officialName: "ilmalink",
        displayName: "ilmaLink",
        canonicalUrl: "https://www.ilmalink.com/",
        commonMistypedQueries: asArray(ilmaLinkBrandMisspellings),
      },
    },
    {
      id: "page-bangladesh-gpa-calculator",
      title: "Bangladesh MBBS GPA Eligibility Calculator",
      description:
        "Check Class 10 top five marks, Class 12 PCB marks, Biology GP 3.50, Combined GPA 7.00, Bangladesh gap rule and NEET qualification for Indian students.",
      url: "/mbbs-abroad/bangladesh#bangladesh-gpa-calculator",
      category: "Destinations",
      group: "Destinations",
      type: "destination",
      subType: "section",
      tags: [
        "Bangladesh MBBS GPA calculator",
        "Bangladesh MBBS eligibility calculator",
        "Bangladesh MBBS gap rule",
        "Bangladesh MBBS GPA requirement",
        "Bangladesh MBBS 2025 eligibility",
        "Bangladesh MBBS 2026 eligibility",
        "Bangladesh MBBS Biology GP 3.50",
        "Bangladesh MBBS combined GPA 7",
        "Bangladesh MBBS Class 10 GPA",
        "Bangladesh MBBS Class 12 PCB GPA",
        "Bangladesh MBBS NEET eligibility",
        "Bangladesh MBBS eligibility for Indian students",
        "BMDC eligibility calculator",
        "DGME Bangladesh MBBS eligibility",
        "MBBS abroad eligibility calculator",
        "Class 10 top five GPA Bangladesh",
        "Class 12 PCB GPA Bangladesh",
      ],
      content:
        "Bangladesh MBBS GPA Eligibility Calculator Bangladesh MBBS eligibility for Indian students Class 10 top five marks Class 12 PCB marks Biology GP 3.50 Combined GPA 7.00 Bangladesh gap rule NEET qualification DGME BMDC eligibility calculator MBBS abroad eligibility calculator",
      priority: 108,
    },
    {
      id: "page-scholarships-loans-education-loans",
      title: "Education Loans for MBBS Abroad",
      description:
        "Find MBBS abroad education loan, student loan, medical education loan and ilmalink service-line loan assistance routes under ilmalink.",
      url: "/scholarships-loans#education-loans",
      category: "Pages",
      group: "Pages",
      type: "page",
      subType: "section",
      tags: [
        "MBBS abroad education loan",
        "MBBS abroad loan",
        "student loan for MBBS abroad",
        "education loan for medical study abroad",
        "loan assistance for MBBS abroad",
        "MBBS abroad financial support",
        "medical education loan",
        "study abroad loan India",
        "ilmalink service-line loan assistance under ilmalink",
      ],
      content:
        "Education loans for MBBS abroad MBBS abroad education loan MBBS abroad loan student loan for MBBS abroad education loan for medical study abroad loan assistance for MBBS abroad MBBS abroad financial support medical education loan study abroad loan India ilmalink service-line loan assistance under ilmalink PM Vidyalaxmi bank education loan student credit card",
      priority: 97,
    },
    {
      id: "page-scholarships-loans-scholarships",
      title: "Scholarships for MBBS Abroad",
      description:
        "Find MBBS abroad scholarship, medical scholarship abroad, financial aid and ilmalink service-line scholarship support routes under ilmalink.",
      url: "/scholarships-loans#scholarships",
      category: "Pages",
      group: "Pages",
      type: "page",
      subType: "section",
      tags: [
        "MBBS abroad scholarship",
        "scholarship for MBBS abroad",
        "medical scholarship abroad",
        "scholarship for Indian students MBBS abroad",
        "MBBS scholarship assistance",
        "study abroad scholarship",
        "financial aid for MBBS abroad",
        "ilmalink service-line scholarship support under ilmalink",
        "G.D. Study Circle scholarship",
      ],
      content:
        "Scholarships for MBBS abroad MBBS abroad scholarship scholarship for MBBS abroad medical scholarship abroad scholarship for Indian students MBBS abroad MBBS scholarship assistance study abroad scholarship financial aid for MBBS abroad ilmalink service-line scholarship support under ilmalink G.D. Study Circle scholarship National Scholarship Portal minority scholarship charitable support",
      priority: 97,
    },
  ];

  return entries.map((entry) => ({
    ...entry,
    content: normalizeText([entry.title, entry.description, entry.tags.join(" "), entry.content].join(" ")),
  }));
}

async function readNeetSearchEntries() {
  try {
    const entries = JSON.parse(await fs.readFile(neetSearchEntriesPath, "utf8"));

    if (!Array.isArray(entries)) return [];

    return entries.map((entry) => ({
      ...entry,
      content: normalizeText(
        [
          entry.title,
          entry.description,
          Array.isArray(entry.tags) ? entry.tags.join(" ") : "",
          entry.content,
        ].join(" ")
      ),
    }));
  } catch (error) {
    console.warn(
      `Skipping NEET search records: ${error instanceof Error ? error.message : String(error)}`
    );
    return [];
  }
}

async function readNeetQuestionEntries() {
  try {
    const questions = JSON.parse(
      await fs.readFile(neetQuestionsPath, "utf8")
    );

    if (!Array.isArray(questions)) return [];

    return questions.map((question) => {
      const title = `NEET 2026 ${question.subject} Question ${question.questionNumber}`;
      const optionText = Array.isArray(question.options)
        ? question.options
            .map((option) => `Option ${option.label} ${option.text}`)
            .join(" ")
        : "";
      const description = sentenceExcerpt(
        `${question.question} ${question.correctAnswer}`,
        190
      );

      return {
        id: question.id,
        title,
        description,
        url: `/neet/questions/${question.slug}`,
        category: "NEET Questions",
        group: "Pages",
        type: "page",
        tags: [
          "NEET 2026",
          "Re-NEET 2026",
          question.subject,
          question.chapter,
          question.topic,
          ...(Array.isArray(question.keywords) ? question.keywords : []),
        ],
        content: normalizeText(
          [
            title,
            question.question,
            optionText,
            question.correctAnswer,
            question.explanation,
            question.subject,
            question.chapter,
            question.topic,
            question.difficulty,
            question.questionType,
            question.sourceText,
            Array.isArray(question.keywords)
              ? question.keywords.join(" ")
              : "",
          ].join(" ")
        ),
        priority: 88,
      };
    });
  } catch (error) {
    console.warn(
      `Skipping NEET question records: ${error instanceof Error ? error.message : String(error)}`
    );
    return [];
  }
}

async function readReNeetCodeAnswerEntries() {
  try {
    const source = JSON.parse(
      await fs.readFile(reNeetCodeAnswerKeysPath, "utf8")
    );
    const codes = ["50", "60", "70", "80"];

    return codes.map((code) => {
      const answers = Array.isArray(source.codes?.[code])
        ? source.codes[code]
        : [];
      const answerText = answers
        .map(
          (answer, index) =>
            `Question ${index + 1} answer ${answer === "B" ? "Bonus" : answer}`
        )
        .join(" ");

      return {
        id: `re-neet-2026-answer-key-code-${code}`,
        title: `Re-NEET 2026 Code ${code} Answer Key`,
        description: `Read all ${answers.length} supplied answer markers for Re-NEET 2026 Paper Code ${code}.`,
        url: `/neet/re-neet-2026-answer-key-codes#code-${code}`,
        category: "NEET Answer Keys",
        group: "Pages",
        type: "page",
        subType: "section",
        tags: [
          "Re-NEET 2026",
          `Code ${code}`,
          "answer key",
          "question paper code",
        ],
        content: normalizeText(
          [
            `Re-NEET 2026 Paper Code ${code} answer key`,
            "Questions 1 to 180",
            "B means Bonus",
            answerText,
          ].join(" ")
        ),
        priority: 92,
      };
    });
  } catch (error) {
    console.warn(
      `Skipping Re-NEET code answer-key records: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return [];
  }
}

function dedupeEntries(entries) {
  const seen = new Map();

  for (const entry of entries) {
    const key = `${entry.url}:${entry.title}`;
    const previous = seen.get(key);

    if (!previous || entry.content.length > previous.content.length) {
      seen.set(key, entry);
    }
  }

  return [...seen.values()].sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.title.localeCompare(b.title);
  });
}

function emitEntry(entry) {
  const normalizedEntry = {
    ...entry,
    title: normalizeBrandIdentityText(entry.title),
    description: normalizeBrandIdentityText(entry.description),
    tags: Array.isArray(entry.tags)
      ? entry.tags.map((tag) => normalizeBrandIdentityText(tag))
      : entry.tags,
    intentTags: Array.isArray(entry.intentTags)
      ? entry.intentTags.map((tag) => normalizeBrandIdentityText(tag))
      : entry.intentTags,
    content: normalizeBrandIdentityText(entry.content),
  };

  return `  ${JSON.stringify(normalizedEntry)},`;
}

async function main() {
  const entries = dedupeEntries(
    [
      ...(await buildRouteEntries()),
      ...(await buildBlogEntries()),
      ...(await buildFmgeEntries()),
      ...(await buildStructuredAdmissionEntries()),
      ...(await readNeetSearchEntries()),
      ...(await readNeetQuestionEntries()),
      ...(await readReNeetCodeAnswerEntries()),
      ...buildManualEntries(),
    ].filter((entry) => isPublicSearchUrl(entry.url))
  );

  const output = `// AUTO-GENERATED by npm run search:index.\n// Includes public pages, page sections, structured admission data, FMGE data,\n// manual search entries, and published blog posts available from Prisma and data/blog-db.json.\n// npm run dev and npm run build regenerate this file before Next.js starts/builds.\nexport type GlobalSearchEntry = {\n  id: string;\n  title: string;\n  description: string;\n  url: string;\n  category: string;\n  group: "Pages" | "Destinations" | "Blogs";\n  type: "page" | "destination" | "blog";\n  subType?: string;\n  tags: string[];\n  intentTags?: string[];\n  content: string;\n  priority: number;\n  country?: string;\n  state?: string;\n  city?: string;\n  collegeName?: string;\n  dataType?: string;\n  data?: Record<string, unknown>;\n};\n\nexport const globalSearchIndex: GlobalSearchEntry[] = [\n${entries.map(emitEntry).join("\n")}\n];\n`;

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, output, "utf8");

  console.log(`Generated ${path.relative(rootDir, outputPath)} with ${entries.length} entries.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
