import type { MetadataRoute } from "next";

import { globalSearchIndex } from "./data/searchIndex";
import { getPublishedBlogs } from "./lib/blog/store";

const SITE_URL = "https://www.ilmalink.com";

export const revalidate = 3600;

const staticRoutes = [
  "",
  "/about",
  "/official-links",
  "/blogs",
  "/mbbs-abroad",
  "/mbbs-abroad/bangladesh",
  "/mbbs-abroad/nepal",
  "/mbbs-abroad/kyrgyzstan",
  "/mbbs-abroad/georgia",
  "/mbbs-abroad/georgia/east-european-university",
  "/mbbs-abroad/georgia/alte-university",
  "/mbbs-abroad/russia",
  "/mbbs-abroad/kazakhstan",
  "/mbbs-abroad/uzbekistan",
  "/mbbs-abroad/tajikistan",
  "/mbbs-abroad/malaysia",
  "/mbbs-abroad/egypt",
  "/mbbs-abroad/saudi-arabia",
  "/mbbs-abroad/qatar",
  "/mbbs-abroad/uae",
  "/mbbs-abroad/iran",
  "/mbbs-abroad/usa",
  "/mbbs-abroad/canada",
  "/mbbs-abroad/australia",
  "/mbbs-abroad/new-zealand",
  "/mbbs-abroad/uk",
  "/mbbs-abroad/germany",
  "/mbbs-abroad/vietnam",
  "/mbbs-abroad/singapore",
  "/mbbs-abroad/barbados",
  "/mbbs-abroad/antigua-and-barbuda",
  "/mbbs-abroad/armenia",
  "/mbbs-abroad/aruba",
  "/mbbs-india",
  "/scholarships-loans",
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
  return {
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route.startsWith("/blogs/") ? "weekly" : "monthly",
    priority: routePriority(route, priorityHint),
  };
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

  const posts = await getPublishedBlogs();

  for (const post of posts) {
    const route = cleanRoute(`/blogs/${post.slug}`);
    const lastModified = new Date(post.updatedAt || post.publishDate || now);

    routes.set(route, {
      priority: 95,
      lastModified: Number.isNaN(lastModified.getTime()) ? now : lastModified,
    });
  }

  return [...routes.entries()]
    .sort(([firstRoute], [secondRoute]) => firstRoute.localeCompare(secondRoute))
    .map(([route, value]) =>
      buildSitemapEntry(route, value.lastModified, value.priority)
    );
}
