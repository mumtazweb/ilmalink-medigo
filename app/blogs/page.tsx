import type { Metadata } from "next";
import Navbar from "../components/navbar";
import BlogsDirectory from "../components/blog/BlogsDirectory";
import { blogCategories } from "../lib/blog/seed";

import { getCountries, getPublishedBlogs } from "../lib/blog/store";


export const metadata: Metadata = {
  title: "ILMALINK MEDIGO Blogs | MBBS, NEET & Medical Admission Updates",
  description:
    "Medical education updates, MBBS guidance, NEET insights and career resources from ILMALINK MEDIGO.",
  alternates: {
    canonical: "https://ilmalink.com/blogs",
  },
  openGraph: {
    title: "ILMALINK MEDIGO Blogs",
    description:
      "Medical education updates, MBBS guidance, NEET insights and career resources.",
    url: "https://ilmalink.com/blogs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ILMALINK MEDIGO Blogs",
    description:
      "Medical education updates, MBBS guidance, NEET insights and career resources.",
  },
};

export default async function BlogsPage() {
  const posts = await getPublishedBlogs();
  const countries = getCountries(posts);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ilmalink.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://ilmalink.com/blogs",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* BLOG SYSTEM: Dedicated blog listing hero. */}
      <section className="bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-4 pb-12 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-normal text-[#0F172A] md:text-6xl">
            ILMALINK MEDIGO Blogs
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-slate-600 md:text-xl md:leading-8">
            Medical education updates, MBBS guidance, NEET insights and career resources
          </p>
        </div>
      </section>

      <BlogsDirectory
        posts={posts}
        categories={[...blogCategories]}
        countries={countries}
      />
    </main>
  );
}
