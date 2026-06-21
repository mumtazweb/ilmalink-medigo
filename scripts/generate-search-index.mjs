import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(rootDir, "app");
const blogDbPath = path.join(rootDir, "data", "blog-db.json");
const fmgeDataPath = path.join(rootDir, "app", "data", "fmgeData.ts");
const neetSearchEntriesPath = path.join(rootDir, "app", "data", "neetSearchEntries.json");
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
  "/logout",
  "/dashboard",
  "/private",
];

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function isPublicSearchUrl(url) {
  const pathname = url.split(/[?#]/, 1)[0] || "/";

  return !publicSearchExcludedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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

      const source = await fs.readFile(filePath, "utf8");
      const content = extractVisibleText(source);
      const group = entryGroupForUrl(url);
      const title =
        extractMetadataField(source, "title") ||
        (url === "/" ? "Home" : titleCase(url.split("/").filter(Boolean).at(-1) ?? "Page"));
      const description =
        extractMetadataField(source, "description") ||
        sentenceExcerpt(content);
      const pageEntry = {
        id: `page-${slugify(url || "home") || "home"}`,
        title,
        description,
        url,
        category: group === "Destinations" ? "Destinations" : "Pages",
        group,
        type: entryTypeForGroup(group),
        tags: [group, titleCase(url)],
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

  return database.blogs.filter((blog) => blog.status === "published");
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
          authorName: record.author?.name ?? "ILMALINK Editorial Team",
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
      });
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
  return {
    id: `blog-${slugify(blog.slug || blog.id || blog.title)}`,
    title: blog.title,
    description: blog.metaDescription || blog.shortDescription || blog.title,
    url: `/blogs/${blog.slug}`,
    category: "Blogs",
    group: "Blogs",
    type: "blog",
    tags: [
      ...(Array.isArray(blog.tags) ? blog.tags : []),
      ...(Array.isArray(blog.keywords) ? blog.keywords : []),
      blog.category,
      blog.country,
    ].filter(Boolean),
    content: normalizeText(
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
    ),
    priority: 90 + Math.min(Number(blog.views) || 0, 5000) / 1000,
  };
}

async function buildBlogEntries() {
  const blogsBySlug = new Map();

  for (const blog of await readFileBlogs()) {
    blogsBySlug.set(blog.slug || blog.id || blog.title, blog);
  }

  for (const blog of await readPrismaBlogs()) {
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

function buildManualEntries() {
  const entries = [
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
        "Find MBBS abroad education loan, student loan, medical education loan and ILMALINK MEDIGO loan assistance routes.",
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
        "ILMALINK MEDIGO loan assistance",
      ],
      content:
        "Education loans for MBBS abroad MBBS abroad education loan MBBS abroad loan student loan for MBBS abroad education loan for medical study abroad loan assistance for MBBS abroad MBBS abroad financial support medical education loan study abroad loan India ILMALINK MEDIGO loan assistance PM Vidyalaxmi bank education loan student credit card",
      priority: 97,
    },
    {
      id: "page-scholarships-loans-scholarships",
      title: "Scholarships for MBBS Abroad",
      description:
        "Find MBBS abroad scholarship, medical scholarship abroad, financial aid and ILMALINK MEDIGO scholarship support routes.",
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
        "ILMALINK MEDIGO scholarship support",
        "G.D. Study Circle scholarship",
      ],
      content:
        "Scholarships for MBBS abroad MBBS abroad scholarship scholarship for MBBS abroad medical scholarship abroad scholarship for Indian students MBBS abroad MBBS scholarship assistance study abroad scholarship financial aid for MBBS abroad ILMALINK MEDIGO scholarship support G.D. Study Circle scholarship National Scholarship Portal minority scholarship charitable support",
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
  return `  ${JSON.stringify(entry)},`;
}

async function main() {
  const entries = dedupeEntries(
    [
      ...(await buildRouteEntries()),
      ...(await buildBlogEntries()),
      ...(await buildFmgeEntries()),
      ...(await readNeetSearchEntries()),
      ...buildManualEntries(),
    ].filter((entry) => isPublicSearchUrl(entry.url))
  );

  const output = `// AUTO-GENERATED by npm run search:index.\n// Includes public pages, page sections, FMGE data, manual search entries,\n// and all published blog posts available from Prisma and data/blog-db.json.\n// npm run dev and npm run build regenerate this file before Next.js starts/builds.\nexport type GlobalSearchEntry = {\n  id: string;\n  title: string;\n  description: string;\n  url: string;\n  category: string;\n  group: "Pages" | "Destinations" | "Blogs";\n  type: "page" | "destination" | "blog";\n  subType?: "section";\n  tags: string[];\n  content: string;\n  priority: number;\n};\n\nexport const globalSearchIndex: GlobalSearchEntry[] = [\n${entries.map(emitEntry).join("\n")}\n];\n`;

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, output, "utf8");

  console.log(`Generated ${path.relative(rootDir, outputPath)} with ${entries.length} entries.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
