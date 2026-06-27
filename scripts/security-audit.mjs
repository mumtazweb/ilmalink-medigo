import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(rootDir, "app");
const outputDir = path.join(rootDir, "artifacts", "security-audit");

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

const suspiciousTextPattern =
  /\b(russianmarket|ultimateshop|blackbet|casino|gambling|betting|porn|escort|viagra|cialis|levitra|carding|fullz|xmlrpc\.php|wp-login|wp-admin)\b/i;

const googleSearchConsoleRemovalUrls = [
  "https://www.ilmalink.com/russianmarket/",
  "https://www.ilmalink.com/ultimateshop/",
  "https://www.ilmalink.com/blackbet/",
  "https://www.ilmalink.com/courses/",
  "https://www.ilmalink.com/key-function/",
  "https://www.ilmalink.com/area-of-operations/",
  "https://www.ilmalink.com/mode-of-operations/",
  "https://www.ilmalink.com/scholarship-info/",
  "https://www.ilmalink.com/career-roadmap/",
  "https://www.ilmalink.com/author/",
  "https://www.ilmalink.com/ar/",
  "https://www.ilmalink.com/ar/search/",
  "https://www.ilmalink.com/bn/",
  "https://www.ilmalink.com/bn/search/",
  "https://www.ilmalink.com/hi/",
  "https://www.ilmalink.com/hi/search/",
  "https://www.ilmalink.com/login/",
  "https://www.ilmalink.com/create-account/",
  "https://www.ilmalink.com/forgot-password/",
  "https://www.ilmalink.com/reset-password/",
  "https://www.ilmalink.com/dashboard/",
];

const ignoredDirectories = new Set([
  ".git",
  ".next",
  "artifacts",
  "node_modules",
  "out",
]);

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
]);

const remediationFiles = new Set([
  "app/lib/unwantedUrls.ts",
  "scripts/generate-search-index.mjs",
  "scripts/security-audit.mjs",
]);

const ignoredFiles = new Set(["latest-tree.txt", "project-tree.txt"]);

function toPosix(value) {
  return value.split(path.sep).join("/");
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

async function walkFiles(dir, files = []) {
  let entries = [];

  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return files;
  }

  for (const entry of entries) {
    if (ignoredDirectories.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walkFiles(fullPath, files);
      continue;
    }

    if (textExtensions.has(path.extname(entry.name).toLowerCase())) {
      if (ignoredFiles.has(toPosix(path.relative(rootDir, fullPath)))) {
        continue;
      }

      files.push(fullPath);
    }
  }

  return files;
}

function routeFromAppFile(filePath) {
  const relative = toPosix(path.relative(appDir, filePath));

  if (!/(^|\/)(page\.tsx|route\.ts)$/.test(relative)) {
    return "";
  }

  const route = relative
    .replace(/\/page\.tsx$/, "")
    .replace(/\/route\.ts$/, "")
    .replace(/^page\.tsx$/, "")
    .replace(/^route\.ts$/, "")
    .replace(/\([^)]*\)\//g, "")
    .replace(/\[[^/]+\]/g, ":dynamic");

  return route ? `/${route}` : "/";
}

function lineNumberAt(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function extractBlockedLinks(filePath, source) {
  const findings = [];
  const linkPattern =
    /\bhref\s*=\s*(?:"([^"]+)"|'([^']+)'|\{\s*["`]([^"`]+)["`]\s*\})/g;
  let match;

  while ((match = linkPattern.exec(source))) {
    const href = match[1] ?? match[2] ?? match[3] ?? "";

    if (!href.startsWith("/")) continue;
    if (!isBlockedPublicPath(href)) continue;

    findings.push({
      file: toPosix(path.relative(rootDir, filePath)),
      line: lineNumberAt(source, match.index),
      href,
    });
  }

  return findings;
}

function extractSuspiciousText(filePath, source) {
  const relative = toPosix(path.relative(rootDir, filePath));

  if (remediationFiles.has(relative)) {
    return [];
  }

  const findings = [];
  const lines = source.split(/\r?\n/);

  lines.forEach((line, index) => {
    if (!suspiciousTextPattern.test(line)) return;

    findings.push({
      file: relative,
      line: index + 1,
      text: line.trim().slice(0, 240),
    });
  });

  return findings;
}

async function readGeneratedSearchBlockedUrls() {
  const searchIndexPath = path.join(rootDir, "app", "data", "searchIndex.ts");

  try {
    const source = await fs.readFile(searchIndexPath, "utf8");
    const urls = [];
    const urlPattern = /"url":"([^"]+)"/g;
    let match;

    while ((match = urlPattern.exec(source))) {
      const url = match[1];

      if (isBlockedPublicPath(url)) {
        urls.push(url);
      }
    }

    return [...new Set(urls)].sort();
  } catch {
    return [];
  }
}

async function readBlockedBlogDatabaseSlugs() {
  const blogDbPath = path.join(rootDir, "data", "blog-db.json");

  try {
    const database = JSON.parse(await fs.readFile(blogDbPath, "utf8"));
    const collections = [
      ["blogs", database.blogs],
      ["drafts", database.drafts],
    ];
    const findings = [];

    for (const [collection, posts] of collections) {
      if (!Array.isArray(posts)) continue;

      for (const post of posts) {
        if (!isBlockedBlogSlug(post?.slug)) continue;

        findings.push({
          collection,
          id: post.id ?? "",
          slug: post.slug ?? "",
          status: post.status ?? "",
          title: post.title ?? "",
        });
      }
    }

    return findings;
  } catch {
    return [];
  }
}

async function main() {
  const files = await walkFiles(rootDir);
  const routeFiles = [];
  const blockedRouteFiles = [];
  const blockedInternalLinks = [];
  const suspiciousSourceMatches = [];

  for (const filePath of files) {
    const relative = toPosix(path.relative(rootDir, filePath));
    const route = routeFromAppFile(filePath);

    if (route) {
      routeFiles.push({ route, file: relative });

      if (isBlockedPublicPath(route)) {
        blockedRouteFiles.push({ route, file: relative });
      }
    }

    let source = "";

    try {
      source = await fs.readFile(filePath, "utf8");
    } catch {
      continue;
    }

    blockedInternalLinks.push(...extractBlockedLinks(filePath, source));
    suspiciousSourceMatches.push(...extractSuspiciousText(filePath, source));
  }

  const generatedSearchBlockedUrls = await readGeneratedSearchBlockedUrls();
  const blockedBlogDatabaseSlugs = await readBlockedBlogDatabaseSlugs();

  const likelyEntryPaths = [
    "Live indexed legacy URLs such as /russianmarket/ and /ultimateshop/ have no active App Router source files in the current repository, which points to stale indexing from an older deployment, previous static/template content, or external spam URLs rather than a current checked-in route.",
    "The removed /login/, /create-account/, /forgot-password/, /reset-password/, and /dashboard/ URLs came from the former public blog-authoring surface. They are now deleted from App Router source and forced to 410 by proxy.",
    "The repeatable audit should be run after content imports, database blog publishing, or route additions to catch blocked slugs before sitemap/search generation.",
  ];

  const report = {
    generatedAt: new Date().toISOString(),
    blockedRouteFiles,
    blockedInternalLinks,
    generatedSearchBlockedUrls,
    blockedBlogDatabaseSlugs,
    suspiciousSourceMatches,
    likelyEntryPaths,
    googleSearchConsoleRemovalUrls,
    routeCount: routeFiles.length,
  };

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(
    path.join(outputDir, "unwanted-url-audit.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8"
  );
  await fs.writeFile(
    path.join(outputDir, "google-search-console-removals.txt"),
    `${googleSearchConsoleRemovalUrls.join("\n")}\n`,
    "utf8"
  );

  const markdown = [
    "# Unwanted URL Security Audit",
    "",
    `Generated: ${report.generatedAt}`,
    "",
    "## Summary",
    "",
    `- Active blocked route files: ${blockedRouteFiles.length}`,
    `- Blocked internal links: ${blockedInternalLinks.length}`,
    `- Blocked generated search URLs: ${generatedSearchBlockedUrls.length}`,
    `- Blocked blog database slugs: ${blockedBlogDatabaseSlugs.length}`,
    `- Suspicious source text matches: ${suspiciousSourceMatches.length}`,
    "",
    "## Likely Entry Path",
    "",
    ...likelyEntryPaths.map((item) => `- ${item}`),
    "",
    "## Google Search Console Removals",
    "",
    "Use `google-search-console-removals.txt` for the exact canonical URL list.",
    "",
  ].join("\n");

  await fs.writeFile(path.join(outputDir, "README.md"), markdown, "utf8");

  console.log(
    [
      "Security audit complete.",
      `Blocked route files: ${blockedRouteFiles.length}`,
      `Blocked internal links: ${blockedInternalLinks.length}`,
      `Blocked generated search URLs: ${generatedSearchBlockedUrls.length}`,
      `Blocked blog database slugs: ${blockedBlogDatabaseSlugs.length}`,
      `Report: ${path.relative(rootDir, path.join(outputDir, "unwanted-url-audit.json"))}`,
    ].join("\n")
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
