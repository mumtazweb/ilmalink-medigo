import Navbar from "./components/navbar";
import HomeHeroClient from "./components/HomeHeroClient";
import LatestBlogsScroller from "./components/blog/LatestBlogsScroller";
import { getLatestBlogs } from "./lib/blog/store";

export default async function Home() {
  const latestBlogs = await getLatestBlogs(8);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* SEO H1 */}
      <h1 className="sr-only">
        MBBS Admission & NEET Counselling Guidance
        for India and Abroad
      </h1>

      {/* NAVBAR */}
      <Navbar />

      {/* 10px GAP */}
      <div className="h-[10px]"></div>

      <HomeHeroClient />

      {/* BLOG SYSTEM: Homepage latest blogs horizontal auto-scroll section. */}
      <LatestBlogsScroller posts={latestBlogs} />
    </main>
  );
}
