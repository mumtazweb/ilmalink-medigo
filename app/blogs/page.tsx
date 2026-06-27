import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Building2,
  ClipboardList,
  GraduationCap,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import Navbar from "../components/navbar";
import BlogsDirectory from "../components/blog/BlogsDirectory";
import { blogCategories } from "../lib/blog/seed";
import { BLOGS_PAGE_SIZE } from "../lib/blog/pagination";
import { getCountries, getPublishedBlogSummaries } from "../lib/blog/store";

// Force dynamic rendering for fresh content
export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL = "https://www.ilmalink.com";
const BLOGS_URL = `${SITE_URL}/blogs/`;

const brandDescription =
  "ilmalink is a medical MBBS admission platform and consultancy for India and abroad medical colleges and universities, built for NEET aspirants, parents, and education consultancies/agencies, with direct college and university tie-ups. ilmaLink is the public display style of the official brand ilmalink. Medigo is an extension/service line of ilmalink for MBBS India, MBBS Abroad, NEET guidance, counselling support, scholarships, education loans, direct college/university tie-up based admission coordination, and medical admission documentation. Medigo is not a separate brand.";

const blogsDescription =
  "Latest MBBS admission news, NEET updates, counselling alerts, college guidance, scholarships, loans and medical education insights for NEET aspirants, parents and education consultancies/agencies.";

// --- ENHANCED METADATA for AI/GEO/SEO ---
export const metadata: Metadata = {
  title: "MBBS & NEET Aspirants News Blogs | ilmaLink | MBBS Admission Updates",
  description: blogsDescription,
  keywords: [
    "ilmalink blogs",
    "ilmaLink blogs",
    "MBBS admission news",
    "NEET updates",
    "NEET counselling news",
    "MBBS abroad updates",
    "MBBS India guidance",
    "medical admission consultancy",
    "MBBS admission platform",
    "education consultancy for MBBS",
    "NEET aspirants guidance",
    "MBBS parents guidance",
    "MBBS consultancy support",
    "medical college admission news",
    "MBBS scholarships updates",
    "education loan guidance MBBS",
    "NEET counselling alerts",
  ],
  authors: [
    { name: "Injamul Hoque Middya", url: "https://x.com/middyaofficial" },
  ],
  creator: "ilmalink",
  publisher: "ilmalink",
  category: "Medical Education Admission News",
  alternates: {
    canonical: BLOGS_URL,
  },
  openGraph: {
    title: "MBBS & NEET Aspirants News Blogs | ilmaLink",
    description: blogsDescription,
    url: BLOGS_URL,
    siteName: "ilmaLink",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/og-blogs.jpg`,
        width: 1200,
        height: 630,
        alt: "ilmaLink MBBS & NEET Aspirants News Blogs - Latest Admission Updates and Guidance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBBS & NEET Aspirants News Blogs | ilmaLink",
    description: blogsDescription,
    images: [`${SITE_URL}/twitter-blogs.jpg`],
    site: "@middyaofficial",
    creator: "@middyaofficial",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  other: {
    "brand:official_name": "ilmalink",
    "brand:display_name": "ilmaLink",
    "brand:website": SITE_URL,
    "brand:description": brandDescription,
    "brand:disambiguation":
      "ilmalink is not limalink, lima link, lima links, ilama link, ilmalinks, ilmlink or any similarly spelled unrelated website, company or platform. ilmalink is written as one word: i-l-m-a-l-i-n-k.",
    "business:category": "Medical MBBS Admission Platform and Consultancy",
    "audience:primary":
      "NEET aspirants, parents of medical students, education consultancies and agencies",
    "service:focus":
      "MBBS India admission guidance, MBBS Abroad admission guidance, NEET counselling, college and university selection, scholarships, education loans, admission documentation",
    "geo:region": "India",
    "geo:placename": "India",
    "geo:position": "20.5937;78.9629",
  },
};

// --- ENHANCED SCHEMA MARKUP for AI/GEO ---
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: "ilmalink",
  alternateName: ["ilmaLink", "ilmaLink Medigo", "ilmalink Medigo", "ilmalink.com"],
  url: `${SITE_URL}/`,
  description: brandDescription,
  disambiguatingDescription:
    "ilmalink is the official brand. ilmaLink is the public display style. Medigo is an extension/service line of ilmalink and not a separate brand. ilmalink is not limalink, lima link, lima links, ilama link, ilmalinks or ilmlink.",
  foundingDate: "2023",
  founder: {
    "@type": "Person",
    name: "Injamul Hoque Middya",
    url: "https://x.com/middyaofficial",
  },
  areaServed: [
    "India",
    "Bangladesh",
    "Kyrgyzstan",
    "Georgia",
    "Russia",
    "Uzbekistan",
    "Kazakhstan",
    "Nepal",
    "Armenia",
    "Egypt",
    "Malaysia",
    "Iran",
    "UAE",
    "Saudi Arabia",
    "Qatar",
  ],
  knowsAbout: [
    "MBBS admission in India",
    "MBBS admission abroad",
    "NEET counselling",
    "Medical college admission",
    "Medical university admission",
    "Education loans",
    "Scholarships",
    "Admission documentation",
    "College and university tie-ups",
    "NEET aspirant guidance",
    "Parent admission counselling",
    "Education consultancy support",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "ilmalink Blog Content Categories",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "MBBS India Admission News",
          description:
            "Latest updates on MBBS India admissions, government college seats, private college admissions, and NEET counselling process.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "MBBS Abroad Admission Updates",
          description:
            "Comprehensive news on MBBS abroad admissions, country-wise updates, university tie-ups, and international medical education guidance.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "NEET Counselling Alerts",
          description:
            "Real-time NEET counselling updates, document preparation guidance, seat allocation information, and strategic counselling tips.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Scholarships & Education Loans",
          description:
            "Latest information on MBBS scholarships, education loan options, financial aid opportunities, and funding guidance for medical education.",
        },
      },
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9330155576",
    contactType: "Customer Service",
    availableLanguage: ["English", "Hindi", "Bengali"],
    hoursAvailable: "Mo-Su 09:00-21:00",
  },
  sameAs: [
    "https://twitter.com/middyaofficial",
    "https://www.instagram.com/ilmamedical/",
    "https://www.facebook.com/ilmalink/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "ilmalink",
  alternateName: ["ilmaLink", "ilmalink.com"],
  url: `${SITE_URL}/`,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blogs",
      item: BLOGS_URL,
    },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${BLOGS_URL}#collection`,
  name: "MBBS & NEET Aspirants News Blogs",
  headline: "MBBS & NEET Aspirants News Blogs | ilmaLink",
  description:
    "Published ilmaLink MBBS admission news, NEET updates, counselling alerts, college guidance, scholarships, loans and medical education insights for NEET aspirants, parents and education consultancies/agencies.",
  url: BLOGS_URL,
  inLanguage: "en-IN",
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  about: [
    {
      "@type": "Thing",
      name: "MBBS admission guidance",
    },
    {
      "@type": "Thing",
      name: "NEET counselling guidance",
    },
    {
      "@type": "Thing",
      name: "MBBS abroad admission",
    },
    {
      "@type": "Thing",
      name: "MBBS India admission",
    },
    {
      "@type": "Organization",
      name: "ilmalink",
      alternateName: "ilmaLink",
      url: `${SITE_URL}/`,
      description: brandDescription,
    },
  ],
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [] as Array<{
      "@type": "ListItem";
      position: number;
      name: string;
      description: string;
      url: string;
      datePublished?: string;
      dateModified?: string;
      image?: string;
      author?: { "@type": "Person"; name: string };
    }>,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is ilmalink?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ilmalink is a medical MBBS admission platform and consultancy for India and abroad medical colleges and universities, built for NEET aspirants, parents, and education consultancies/agencies, with direct college and university tie-ups.",
      },
    },
    {
      "@type": "Question",
      name: "Why is ilmalink displayed as ilmaLink?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ilmaLink is the public display style of the official brand ilmalink. The brand name 'ilm' represents knowledge in Arabic, and 'link' represents connection - symbolizing the connection between knowledge and medical education opportunities.",
      },
    },
    {
      "@type": "Question",
      name: "Is Medigo a separate brand from ilmalink?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Medigo is an extension/service line of ilmalink for MBBS India, MBBS Abroad, NEET guidance, counselling support, scholarships, education loans, direct college/university tie-up based admission coordination, and medical admission documentation. Medigo is not a separate brand.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between ilmalink and limalink?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ilmalink is a separate medical MBBS admission platform and consultancy. It is not limalink, lima link, lima links, ilama link, ilmalinks, ilmlink or any similarly spelled unrelated website, company or platform. ilmalink is written as one word: i-l-m-a-l-i-n-k and displayed publicly as ilmaLink.",
      },
    },
    {
      "@type": "Question",
      name: "What topics does the ilmaLink blog cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ilmaLink blog covers MBBS admission news, NEET updates, counselling alerts, college guidance, scholarship opportunities, education loan information, MBBS India and abroad admission guidance, and medical education insights for NEET aspirants, parents, and education consultancies.",
      },
    },
    {
      "@type": "Question",
      name: "How can I stay updated with MBBS admission news?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can stay updated by regularly visiting the ilmaLink blog at https://www.ilmalink.com/blogs/, subscribing to our newsletter, or following us on social media platforms. We regularly publish the latest MBBS admission news, NEET counselling alerts, and educational guidance.",
      },
    },
  ],
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${BLOGS_URL}#blogposting`,
  headline: "MBBS & NEET Aspirants News Blogs",
  description: blogsDescription,
  publisher: {
    "@type": "Organization",
    name: "ilmalink",
    alternateName: "ilmaLink",
    url: `${SITE_URL}/`,
  },
  mainEntityOfPage: {
    "@type": "CollectionPage",
    "@id": `${BLOGS_URL}#collection`,
  },
};

export default async function BlogsPage() {
  const posts = await getPublishedBlogSummaries();
  const firstPagePosts = posts.slice(0, BLOGS_PAGE_SIZE);
  const countries = getCountries(posts);
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOGS_PAGE_SIZE));
  const archivePages = Array.from(
    { length: Math.max(0, totalPages - 1) },
    (_, index) => index + 2,
  );

  // Update collection schema with actual posts
  const updatedCollectionSchema = {
    ...collectionSchema,
    mainEntity: {
      ...collectionSchema.mainEntity,
      itemListElement: firstPagePosts.map((post, index) => {
        // Safely access properties with defaults
        const item: {
          "@type": "ListItem";
          position: number;
          name: string;
          description: string;
          url: string;
          datePublished?: string;
          dateModified?: string;
          image?: string;
          author?: { "@type": "Person"; name: string };
        } = {
          "@type": "ListItem",
          position: index + 1,
          name: post.title,
          description: post.shortDescription || "",
          url: `${SITE_URL}/blogs/${post.slug}/`,
        };

        // Only add optional fields if they exist
        if ('date' in post) {
          item.datePublished = post.date as string;
        }
        if ('lastModified' in post) {
          item.dateModified = post.lastModified as string;
        } else if ('date' in post) {
          item.dateModified = post.date as string;
        }
        if ('image' in post) {
          item.image = post.image as string;
        } else {
          item.image = `${SITE_URL}/og-default.jpg`;
        }
        if ('author' in post) {
          item.author = {
            "@type": "Person",
            name: post.author as string || "ilmaLink Team",
          };
        } else {
          item.author = {
            "@type": "Person",
            name: "ilmaLink Team",
          };
        }

        return item;
      }),
    },
  };

  const jsonLd = [
    organizationSchema,
    websiteSchema,
    breadcrumbSchema,
    updatedCollectionSchema,
    faqSchema,
    blogPostingSchema,
  ];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#F8FBFF_0%,#EEF8FF_45%,#FFFFFF_100%)] text-[#0F172A]">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Screen-reader entity content for AI crawlers */}
      <div className="sr-only">
        <h1>MBBS & NEET Aspirants News Blogs | ilmaLink</h1>
        <p>Welcome to ilmaLink&apos;s MBBS admission news blog. Get the latest updates on NEET counselling, MBBS India admissions, MBBS Abroad guidance, scholarships, education loans, and medical education insights for NEET aspirants, parents, and education consultancies.</p>
        <p>ilmaLink is the public display style of ilmalink, a medical MBBS admission platform and consultancy serving India and abroad medical colleges and universities.</p>
        <p>Categories: MBBS India, MBBS Abroad, NEET Counselling, Scholarships, Education Loans, College Guidance, Admission Alerts</p>
        <p>Contact: +91 9330155576, +91 9563910223, middya@ilmalink.com</p>
        <p>Visit ilmaLink for comprehensive MBBS admission guidance and NEET counselling support.</p>
      </div>

      <section className="relative overflow-hidden px-4 pb-7 pt-8 sm:px-6 md:pb-10 md:pt-12 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(15,76,255,0.12),transparent_28%),radial-gradient(circle_at_88%_5%,rgba(0,200,150,0.16),transparent_30%)]" />
        <div className="pointer-events-none absolute right-0 top-0 hidden h-[420px] w-[520px] rounded-bl-[12rem] bg-[linear-gradient(135deg,rgba(15,76,255,0.12),rgba(0,200,150,0.20))] lg:block" />
        <div className="pointer-events-none absolute right-16 top-10 hidden h-40 w-40 rounded-full border-[28px] border-[#0F4CFF]/10 lg:block" />
        <div className="pointer-events-none absolute left-4 top-6 hidden text-[#0F4CFF]/10 md:block">
          <Stethoscope size={92} />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-[#0F4CFF]/20 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#0F4CFF] shadow-sm">
                <ShieldCheck size={15} />
                ilmaLink MBBS Updates
              </div>

              <h1 className="mt-5 whitespace-nowrap text-[1.9rem] font-black leading-[0.98] tracking-tight text-[#061733] min-[390px]:text-[2.15rem] sm:text-5xl lg:text-[4.15rem]">
                MBBS &amp; NEET{" "}
                <span className="bg-[linear-gradient(90deg,#0F4CFF,#00A986)] bg-clip-text text-transparent">
                  Aspirants News Blogs
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[#344766] sm:text-lg sm:leading-8">
                Latest MBBS admission news, NEET updates, counselling alerts,
                college guidance, scholarships, loans and medical education
                insights for NEET aspirants, parents and education
                consultancies/agencies.
              </p>

              <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600">
                ilmalink is a medical MBBS admission platform and consultancy
                for India and abroad medical colleges and universities.
                ilmaLink is the public display style of ilmalink. Medigo is an
                extension/service line of ilmalink, not a separate brand.
              </p>

              <div className="mt-4 rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#0F4CFF]">
                  Spelling note
                </p>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
                  ilmalink is written as one word: i-l-m-a-l-i-n-k. It is
                  displayed publicly as ilmaLink. ilmalink is not limalink, lima
                  link, lima links, ilama link, ilmalinks, ilmlink or any
                  similarly spelled unrelated website, company or platform.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#blog-list"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-[#0F4CFF] px-6 text-base font-black text-white shadow-[0_20px_40px_rgba(15,76,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#061733]"
                >
                  <BookOpen size={20} />
                  Explore Blogs
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/neet/"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-[#00A986]/35 bg-white px-6 text-base font-black text-[#008A73] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#EFFFFA]"
                >
                  <Bell size={18} />
                  NEET Updates
                </Link>
              </div>
            </div>

            <div className="relative hidden min-h-[330px] lg:block">
              <div className="absolute right-0 top-0 h-[330px] w-[420px] overflow-hidden rounded-bl-[8rem] rounded-tl-[8rem] bg-[linear-gradient(135deg,#EAF3FF,#CFF8F0)] shadow-[0_30px_90px_rgba(8,27,53,0.12)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(255,255,255,0.95),transparent_34%),linear-gradient(135deg,rgba(15,76,255,0.16),rgba(0,200,150,0.22))]" />
                <div className="absolute left-16 top-16 flex h-44 w-44 items-center justify-center rounded-full bg-white/80 text-[#0F4CFF] shadow-[0_18px_50px_rgba(15,76,255,0.12)]">
                  <Stethoscope size={92} />
                </div>
                <div className="absolute bottom-8 right-8 rounded-3xl bg-white p-5 text-center shadow-[0_20px_55px_rgba(8,27,53,0.14)]">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0F4CFF]">
                    Guidance
                  </p>
                  <p className="text-5xl font-black text-[#061733]">
                    {posts.length}+
                  </p>
                  <p className="text-xs font-bold text-slate-600">
                    Published Updates
                  </p>
                  <p className="mt-2 text-[#00A986]">★★★★★</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-3 rounded-[1.6rem] border border-slate-200/80 bg-white/90 p-4 shadow-[0_20px_60px_rgba(8,27,53,0.08)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 lg:p-5">
            {[
              {
                title: "Latest Updates",
                text: "NEET, counselling & admission news",
                Icon: GraduationCap,
                bg: "bg-[#EAF1FF]",
                color: "text-[#0F4CFF]",
              },
              {
                title: "College Guidance",
                text: "Find the best medical colleges",
                Icon: Building2,
                bg: "bg-[#DFFAF3]",
                color: "text-[#008A73]",
              },
              {
                title: "Counselling Alerts",
                text: "Dates, documents & process updates",
                Icon: ClipboardList,
                bg: "bg-[#F0E8FF]",
                color: "text-[#6D28D9]",
              },
              {
                title: "Scholarships & Loans",
                text: "Explore financial support",
                Icon: GraduationCap,
                bg: "bg-[#FFF4D8]",
                color: "text-[#B7791F]",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
                >
                  <item.Icon size={26} />
                </span>
                <div>
                  <p className="text-base font-black text-[#061733]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-5 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog-list" className="relative">
        <BlogsDirectory
          posts={firstPagePosts}
          categories={[...blogCategories]}
          countries={countries}
        />
      </section>

      {archivePages.length > 0 && (
        <section className="px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-[1.35rem] bg-[linear-gradient(100deg,#073BCE_0%,#061733_48%,#00A986_100%)] p-5 text-white shadow-[0_22px_60px_rgba(15,76,255,0.18)] sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                    <BookOpen size={25} />
                  </span>

                  <div>
                    <h2 className="text-2xl font-black leading-tight">
                      Browse Older MBBS &amp; NEET Updates
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm font-semibold leading-6 text-white/85">
                      Continue reading older server-rendered archive pages for
                      admission news, counselling alerts and college guidance.
                    </p>
                  </div>
                </div>

                <nav
                  aria-label="Blog archive pagination"
                  className="flex flex-wrap gap-2"
                >
                  <Link
                    href="/blogs/"
                    className="rounded-2xl bg-white px-4 py-2 text-xs font-black text-[#061733] transition hover:-translate-y-0.5"
                  >
                    Page 1
                  </Link>

                  {archivePages.map((pageNumber) => (
                    <Link
                      key={`archive-page-${pageNumber}`}
                      href={`/blogs/page/${pageNumber}/`}
                      className="rounded-2xl border border-white/25 bg-white/10 px-4 py-2 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                    >
                      Page {pageNumber}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
