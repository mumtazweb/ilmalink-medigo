import type { MetadataRoute } from "next";

const SITE_URL = "https://www.ilmalink.com";

const staticRoutes = [
  "",
  "/about",
  "/blogs",
  "/mbbs-abroad",
  "/mbbs-abroad/bangladesh",
  "/mbbs-abroad/kyrgyzstan",
  "/mbbs-abroad/georgia",
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

const blogRoutes = [
  "/blogs/patient-doctor-ratio-in-india-comparison-to-worls",
  "/blogs/mbbs-in-kyrgyzstan-guide",
  "/blogs/neet-counselling-checklist-before-choice-filling",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [...staticRoutes, ...blogRoutes].map((route) => {
    const cleanRoute = route === "" ? "" : route.replace(/\/$/, "");

    return {
      url: `${SITE_URL}${cleanRoute}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority:
        route === ""
          ? 1
          : route.includes("bangladesh") || route.includes("kyrgyzstan")
            ? 0.9
            : route.includes("mbbs-abroad") || route.includes("scholarships-loans")
              ? 0.8
              : 0.6,
    };
  });
}