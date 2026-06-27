import type { MetadataRoute } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";

import { countryGeoFacts } from "./data/geo";
import { georgiaUniversities } from "./data/georgiaUniversities";
import { neet2026Questions } from "./data/neet2026Questions";
import { globalSearchIndex } from "./data/searchIndex";
import { BLOGS_PAGE_SIZE } from "./lib/blog/pagination";
import { isBlockedBlogSlug, isBlockedPublicPath } from "./lib/unwantedUrls";

const SITE_URL = "https://www.ilmalink.com";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const countryRoutes = countryGeoFacts.map((country) =>
  country.slug === "india" ? "/mbbs-india" : `/mbbs-abroad/${country.slug}`
);

const additionalPublicCountryRoutes = [
  "/mbbs-abroad/germany",
  "/mbbs-abroad/barbados",
  "/mbbs-abroad/antigua-and-barbuda",
  "/mbbs-abroad/aruba",
];

const staticRoutes = [
  "",
  "/about",
  "/contact",
  "/data-methodology",
  "/geo-profile",
  "/official-links",
  "/site-hierarchy",
  "/blogs",

  "/mbbs-abroad",
  ...countryRoutes,
  ...additionalPublicCountryRoutes,

  "/mbbs-abroad/georgia",
  ...georgiaUniversities.map(
    (university) => `/mbbs-abroad/georgia/${university.slug}`
  ),

  "/mbbs-abroad/uzbekistan",
  "/mbbs-abroad/uzbekistan/medical-institute-of-karakalpakstan",

  "/mbbs-abroad/kyrgyzstan/international-higher-school-of-medicine",
  "/mbbs-abroad/kyrgyzstan/kyrgyz-state-medical-academy",

  "/scholarships-loans",

  "/neet",
  "/neet/information-bulletin",
  "/neet/admit-card",
  "/neet/result",
  "/neet/discussion-centre",
  "/neet/questions",
  "/neet/answer-key",
  "/neet/re-neet-2026-answer-key-codes",
  "/neet/re-neet-2026-questions",
  ...neet2026Questions.map((question) => `/neet/questions/${question.slug}`),
  "/neet/counselling",

  "/portal/signup",
  "/portal/login",

  "/trust-center",
  "/alert",
  "/official-advisories",
];

const excludedRoutes = [
  "/login",
  "/create-account",
  "/forgot-password",
  "/reset-password",
  "/dashboard",
  "/admin",
  "/api",
  "/search",
  "/portal/student",
  "/portal/admin",
  "/portal/counsellor",
  "/portal/management",
  "/portal/forgot-password",
  "/portal/reset-password",
];

type SitemapEntry = MetadataRoute.Sitemap[number];

type SitemapBlogPost = {
  slug: string;
  publishDate?: string | Date;
  updatedAt?: string | Date;
};

function cleanRoute(url: string) {
  if (/^https?:\/\//.test(url)) {
    try {
      const parsed = new URL(url);

      if (
        parsed.hostname !== "ilmalink.com" &&
        parsed.hostname !== "www.ilmalink.com"
      ) {
        return "";
      }

      return parsed.pathname === "/" ? "" : parsed.pathname.replace(/\/$/, "");
    } catch {
      return "";
    }
  }

  const pathOnly = url.split(/[?#]/, 1)[0] || "/";

  if (!pathOnly.startsWith("/")) {
    return "";
  }

  return pathOnly === "/" ? "" : pathOnly.replace(/\/$/, "");
}

function shouldIncludeRoute(route: string) {
  if (route === "") {
    return true;
  }

  if (isBlockedPublicPath(route)) {
    return false;
  }

  return !excludedRoutes.some(
    (blockedRoute) =>
      route === blockedRoute || route.startsWith(`${blockedRoute}/`)
  );
}

function normalizePriority(value: number) {
  if (value > 1) {
    return Math.max(0.5, Math.min(0.9, value / 115));
  }

  return Math.max(0.5, Math.min(1, value));
}

function routePriority(route: string) {
  if (route === "") return 1;

  if (route === "/about") return 0.94;
  if (route === "/contact") return 0.9;
  if (route === "/trust-center") return 0.9;
  if (route === "/geo-profile") return 0.72;
  if (route === "/official-links") return 0.86;
  if (route === "/data-methodology") return 0.84;

  if (route === "/portal/signup") return 0.88;
  if (route === "/portal/login") return 0.7;

  if (route === "/blogs") return 0.88;
  if (route.startsWith("/blogs/page/")) return 0.72;
  if (route.startsWith("/blogs/")) return 0.86;

  if (route === "/neet") return 0.92;
  if (route.startsWith("/neet/")) return 0.84;

  if (route === "/mbbs-abroad") return 0.9;

  if (route === "/mbbs-abroad/uzbekistan") return 0.92;

  if (
    route ===
    "/mbbs-abroad/uzbekistan/medical-institute-of-karakalpakstan"
  ) {
    return 0.9;
  }

  if (
    route.includes("bangladesh") ||
    route.includes("kyrgyzstan") ||
    route.includes("georgia") ||
    route.includes("uzbekistan")
  ) {
    return 0.9;
  }

  if (route.includes("mbbs-abroad") || route.includes("scholarships-loans")) {
    return 0.8;
  }

  return 0.6;
}

function routeChangeFrequency(route: string): SitemapEntry["changeFrequency"] {
  if (route === "") return "daily";
  if (route === "/blogs") return "daily";
  if (route.startsWith("/blogs/page/")) return "weekly";
  if (route.startsWith("/blogs/")) return "weekly";
  if (route === "/neet" || route.startsWith("/neet/")) return "daily";
  if (route === "/mbbs-abroad/uzbekistan") return "weekly";
  if (
    route ===
    "/mbbs-abroad/uzbekistan/medical-institute-of-karakalpakstan"
  ) {
    return "weekly";
  }

  return "monthly";
}

function buildSitemapEntry(
  route: string,
  lastModified: Date,
  priority: number
): SitemapEntry {
  const canonicalRoute = route === "" ? "/" : `${route}/`;

  return {
    url: `${SITE_URL}${canonicalRoute}`,
    lastModified,
    changeFrequency: routeChangeFrequency(route),
    priority: normalizePriority(priority),
  };
}

function parseDate(value: unknown, fallback: Date) {
  if (!value) return fallback;

  const parsed = new Date(value as string | Date);

  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

async function getPublishedBlogsFromStore() {
  try {
    const blogStoreModule = await import("./lib/blog/store");

    return (await blogStoreModule.getPublishedBlogSummaries()) as SitemapBlogPost[];
  } catch (error) {
    console.error("Sitemap blog store loading error:", error);

    return [];
  }
}

async function getPublishedBlogsFromFile() {
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), "data", "blog-db.json"),
      "utf8"
    );

    const parsed = JSON.parse(raw) as {
      blogs?: Array<{
        slug?: string;
        status?: string;
        publishDate?: string;
        updatedAt?: string;
      }>;
    };

    return (parsed.blogs ?? [])
      .filter(
        (blog) => blog.status === "published" && typeof blog.slug === "string"
      )
      .map((blog) => ({
        slug: blog.slug as string,
        publishDate: blog.publishDate,
        updatedAt: blog.updatedAt,
      })) as SitemapBlogPost[];
  } catch (error) {
    console.error("Sitemap blog file loading error:", error);

    return [];
  }
}

function normalizeBlogRoute(slug: string) {
  return cleanRoute(`/blogs/${slug}`);
}

function addBlogRoute(
  routes: Map<string, { priority: number; lastModified: Date }>,
  slug: string,
  now: Date,
  updatedAt?: unknown,
  publishDate?: unknown
) {
  if (!slug) return;
  if (isBlockedBlogSlug(slug)) return;

  const route = normalizeBlogRoute(slug);

  if (!shouldIncludeRoute(route)) return;

  const lastModified = parseDate(updatedAt ?? publishDate, now);

  routes.set(route, {
    priority: 0.86,
    lastModified,
  });
}

async function getSafePublishedBlogs() {
  try {
    const fromStore = await getPublishedBlogsFromStore();

    if (fromStore.length > 0) {
      return fromStore;
    }

    return await getPublishedBlogsFromFile();
  } catch (error) {
    console.error("Sitemap blog loading error:", error);

    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const routes = new Map<string, { priority: number; lastModified: Date }>();

  for (const rawRoute of staticRoutes) {
    const route = cleanRoute(rawRoute);

    if (!shouldIncludeRoute(route)) continue;

    routes.set(route, {
      priority: routePriority(route),
      lastModified: now,
    });
  }

  for (const entry of globalSearchIndex) {
    const route = cleanRoute(entry.url);

    if (!route && entry.url !== "/") continue;
    if (!shouldIncludeRoute(route)) continue;

    const priority = normalizePriority(entry.priority);
    const existing = routes.get(route);

    if (!existing || priority > existing.priority) {
      routes.set(route, {
        priority,
        lastModified: now,
      });
    }
  }

  const posts = await getSafePublishedBlogs();

  for (const post of posts) {
    addBlogRoute(routes, post.slug, now, post.updatedAt, post.publishDate);
  }

  const totalBlogPages = Math.max(1, Math.ceil(posts.length / BLOGS_PAGE_SIZE));

  for (let pageNumber = 2; pageNumber <= totalBlogPages; pageNumber += 1) {
    const route = cleanRoute(`/blogs/page/${pageNumber}`);

    if (!shouldIncludeRoute(route)) continue;

    routes.set(route, {
      priority: 0.72,
      lastModified: now,
    });
  }

  return [...routes.entries()]
    .sort(([firstRoute], [secondRoute]) =>
      firstRoute.localeCompare(secondRoute)
    )
    .map(([route, value]) =>
      buildSitemapEntry(route, value.lastModified, value.priority)
    );
}
