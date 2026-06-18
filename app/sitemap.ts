import type { MetadataRoute } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";

import { countryGeoFacts } from "./data/geo";
import { georgiaUniversities } from "./data/georgiaUniversities";
import { globalSearchIndex } from "./data/searchIndex";

const SITE_URL = "https://www.ilmalink.com";

export const revalidate = 3600;

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
  "/mbbs-abroad/kyrgyzstan/international-higher-school-of-medicine",
  "/mbbs-abroad/kyrgyzstan/kyrgyz-state-medical-academy",
  "/scholarships-loans",
  "/neet",
  "/neet/admit-card",
  "/neet/result",
  "/neet/counselling",
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

  return !excludedRoutes.some(
    (blockedRoute) =>
      route === blockedRoute || route.startsWith(`${blockedRoute}/`)
  );
}

function routePriority(route: string, priorityHint?: number) {
  if (route === "") return 1;
  if (route.startsWith("/blogs/")) return 0.82;
  if (route === "/blogs") return 0.78;
  if (
    route.includes("bangladesh") ||
    route.includes("kyrgyzstan") ||
    route.includes("georgia")
  ) return 0.9;
  if (route.includes("mbbs-abroad") || route.includes("scholarships-loans")) return 0.8;
  if (priorityHint) return Math.max(0.5, Math.min(0.86, priorityHint / 115));

  return 0.6;
}

function buildSitemapEntry(
  route: string,
  lastModified: Date,
  priorityHint?: number
): SitemapEntry {
  const canonicalRoute = route === "" ? "" : `${route}/`;

  return {
    url: `${SITE_URL}${canonicalRoute}`,
    lastModified,
    changeFrequency: route.startsWith("/blogs/") ? "weekly" : "monthly",
    priority: routePriority(route, priorityHint),
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

    return (await blogStoreModule.getPublishedBlogs()) as SitemapBlogPost[];
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
      .filter((blog) => blog.status === "published" && typeof blog.slug === "string")
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

  const route = normalizeBlogRoute(slug);
  if (!shouldIncludeRoute(route)) return;

  const lastModified = parseDate(updatedAt ?? publishDate, now);

  routes.set(route, {
    priority: 95,
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

    const existing = routes.get(route);

    if (!existing || entry.priority > existing.priority) {
      routes.set(route, {
        priority: entry.priority,
        lastModified: now,
      });
    }
  }

  const posts = await getSafePublishedBlogs();

  for (const post of posts) {
    addBlogRoute(routes, post.slug, now, post.updatedAt, post.publishDate);
  }

  return [...routes.entries()]
    .sort(([firstRoute], [secondRoute]) => firstRoute.localeCompare(secondRoute))
    .map(([route, value]) =>
      buildSitemapEntry(route, value.lastModified, value.priority)
    );
}
