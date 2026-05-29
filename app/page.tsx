import Navbar from "./components/navbar";
import HomeHeroClient from "./components/HomeHeroClient";
import LatestBlogsScroller from "./components/blog/LatestBlogsScroller";
import { getLatestBlogs } from "./lib/blog/store";

export default async function Home() {
  const latestBlogs = await getLatestBlogs(8);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <h1 className="sr-only">
        MBBS Admission & NEET Counselling Guidance for India and Abroad
      </h1>
      <Navbar />
      <HomeHeroClient />
      <LatestBlogsScroller posts={latestBlogs} />
    </main>
  );
}
