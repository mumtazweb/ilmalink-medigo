import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/dashboard/",
          "/dashboard/*",
          "/admin",
          "/admin/",
          "/admin/*",
          "/api",
          "/api/",
          "/api/*",
          "/login",
          "/create-account",
          "/forgot-password",
          "/reset-password",
        ],
      },
    ],
    sitemap: "https://www.ilmalink.com/sitemap.xml",
    host: "https://www.ilmalink.com",
  };
}