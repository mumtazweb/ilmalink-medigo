import type { Metadata } from "next";
import Navbar from "./components/navbar";
import HomeHeroClient from "./components/HomeHeroClient";
import LatestBlogsScroller from "./components/blog/LatestBlogsScroller";
import { getLatestBlogSummaries } from "./lib/blog/store";

export const metadata: Metadata = {
  title: "ILMALINK MEDIGO by ilmaLink | MBBS Abroad, MBBS India & NEET Guidance",
  description:
    "Official medical education platform of ilmaLink for MBBS Abroad, MBBS India, NEET counselling, scholarships and university guidance.",
  alternates: {
    canonical: "https://www.ilmalink.com/",
  },
  openGraph: {
    title: "ILMALINK MEDIGO by ilmaLink | MBBS Abroad, MBBS India & NEET Guidance",
    description:
      "Official medical education platform of ilmaLink for MBBS Abroad, MBBS India, NEET counselling, scholarships and university guidance.",
    url: "https://www.ilmalink.com/",
    siteName: "ILMALINK MEDIGO",
    locale: "en_IN",
    type: "website",
  },
};

export default async function Home() {
  const latestBlogs = await getLatestBlogSummaries(8);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <h1 className="sr-only">
        ILMALINK MEDIGO by ilmaLink - MBBS Admission and NEET Counselling Guidance
      </h1>
      <Navbar />
      <HomeHeroClient />
      <LatestBlogsScroller posts={latestBlogs} />
    </main>
  );
}
