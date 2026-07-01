import {
  ilmaLinkEntityData,
  ilmaLinkOrganizationSchema,
  ilmaLinkWebsiteSchema,
  type CountryGeoFact,
  type IlmaLinkOffice,
} from "../data/geo";
import type { BlogSummaryPost } from "./blog/types";

type BreadcrumbItem = {
  name: string;
  url: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type ServiceSchemaInput = {
  name: string;
  serviceType: string;
  path: string;
  description: string;
  areaServed?: string | string[];
};

type SiteNavigationItem = {
  name: string;
  url: string;
};

const siteNavigationItems: SiteNavigationItem[] = [
  { name: "Home", url: "/" },
  {
    name: "MBBS Admission Consultancy in India",
    url: "/mbbs-admission-consultancy-india",
  },
  { name: "Explore All Pages", url: "/site-hierarchy" },
  { name: "MBBS Abroad", url: "/mbbs-abroad" },
  { name: "Study MBBS in Georgia", url: "/mbbs-abroad/georgia" },
  {
    name: "East European University",
    url: "/mbbs-abroad/georgia/east-european-university",
  },
  { name: "MBBS India", url: "/mbbs-india" },
  { name: "Medical Colleges in India", url: "/mbbs-india#west-bengal" },
  { name: "NEET Hub", url: "/neet" },
  { name: "NEET Admit Card", url: "/neet/admit-card" },
  { name: "NEET Result", url: "/neet/result" },
  { name: "NEET Counselling", url: "/neet/counselling" },
  { name: "Scholarships and Loans", url: "/scholarships-loans" },
  { name: "Trust Center", url: "/trust-center" },
  { name: "Student Alert", url: "/alert" },
  { name: "Official Links", url: "/official-links" },
  { name: "Official Advisories", url: "/official-advisories" },
  { name: "Blogs", url: "/blogs" },
  { name: "Search", url: "/search" },
  { name: "About", url: "/about" },
];

function absoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith("http")) {
    return pathOrUrl;
  }

  return `https://www.ilmalink.com${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

function buildPostalAddress(office: IlmaLinkOffice) {
  return {
    "@type": "PostalAddress",
    streetAddress: office.streetAddress,
    addressLocality: office.addressLocality,
    addressRegion: office.addressRegion,
    ...(office.postalCode ? { postalCode: office.postalCode } : {}),
    addressCountry: office.addressCountry,
  };
}

function buildMbbsConsultancyServices() {
  const serviceNames = [
    "MBBS admission guidance and consultancy",
    "MBBS abroad admission guidance and consultancy",
    "NEET counselling and admission planning support",
    "Medical admission documentation guidance",
  ];

  return {
    "@type": "OfferCatalog",
    name: "MBBS Admission Guidance and Consultancy Services",
    itemListElement: serviceNames.map((serviceName, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: serviceName,
        serviceType: serviceName,
        provider: {
          "@id": "https://www.ilmalink.com/#organization",
        },
      },
    })),
  };
}

export function buildOrganizationSchema() {
  return {
    ...ilmaLinkOrganizationSchema,
    logo: absoluteUrl(ilmaLinkEntityData.logo),
    legalName: "ilmalink",
    areaServed: "India and international medical education destinations",
    sameAs: ilmaLinkEntityData.sameAs,
    department: ilmaLinkEntityData.offices.map((office) => ({
      "@type": "Organization",
      name: office.name,
      address: buildPostalAddress(office),
    })),
    knowsAbout: ilmaLinkEntityData.services,
  };
}

export function buildEducationalOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://www.ilmalink.com/#educationalorganization",
    name: "ilmalink",
    alternateName: ilmaLinkOrganizationSchema.alternateName,
    url: ilmaLinkEntityData.url,
    logo: absoluteUrl(ilmaLinkEntityData.logo),
    description:
      "Medigo is an extension/service line of ilmalink for MBBS India, MBBS Abroad, NEET guidance, counselling support, scholarships, education loans, direct college/university tie-up based admission coordination, and medical admission documentation.",
    disambiguatingDescription:
      ilmaLinkOrganizationSchema.disambiguatingDescription,
    areaServed: [
      "West Bengal",
      "Maharashtra",
      "Karnataka",
      "India",
      "International medical education destinations",
    ],
    knowsAbout: [
      "MBBS admission consultancy",
      "MBBS abroad consultancy",
      "MBBS admission data bank",
      "Medical education information centre",
      "NEET counselling support",
      "Scholarship and loan guidance",
    ],
    parentOrganization: {
      "@id": "https://www.ilmalink.com/#organization",
    },
  };
}

export function buildLocalBusinessSchema(office: IlmaLinkOffice) {
  const id = office.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": `https://www.ilmalink.com/#${id}`,
    name: office.name,
    url: ilmaLinkEntityData.url,
    image: absoluteUrl(ilmaLinkEntityData.logo),
    description:
      "ilmaLink contact point for Medigo MBBS admission guidance and consultancy, MBBS abroad counselling, India medical counselling support and student documentation guidance.",
    telephone: ilmaLinkEntityData.contact.call,
    email: ilmaLinkEntityData.contact.email,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "admissions",
        telephone: ilmaLinkEntityData.contact.call,
        email: ilmaLinkEntityData.contact.email,
        areaServed: [office.addressRegion, "India"],
        availableLanguage: ["English", "Hindi", "Bengali"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: ilmaLinkEntityData.contact.whatsapp,
        url: ilmaLinkEntityData.contact.whatsappHref,
        areaServed: [office.addressRegion, "India"],
      },
    ],
    address: buildPostalAddress(office),
    hasOfferCatalog: buildMbbsConsultancyServices(),
    knowsAbout: [
      "MBBS admission guidance",
      "MBBS admission consultancy",
      "MBBS abroad admission consultancy",
      "NEET counselling support",
    ],
    parentOrganization: {
      "@id": "https://www.ilmalink.com/#organization",
    },
    areaServed: [
      office.addressRegion,
      "India",
      "International medical education destinations",
    ],
  };
}

export function buildWebsiteSchema() {
  return {
    ...ilmaLinkWebsiteSchema,
    inLanguage: "en-IN",
  };
}

export function buildServiceSchema(service: ServiceSchemaInput) {
  const serviceUrl = absoluteUrl(service.path);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name: service.name,
    serviceType: service.serviceType,
    url: serviceUrl,
    description: service.description,
    provider: {
      "@id": "https://www.ilmalink.com/#organization",
    },
    ...(service.areaServed ? { areaServed: service.areaServed } : {}),
    isPartOf: {
      "@id": "https://www.ilmalink.com/#website",
    },
  };
}

export function buildArticleSchema(post: BlogSummaryPost) {
  const articleUrl = absoluteUrl(`/blogs/${post.slug}/`);

  return {
    "@context": "https://schema.org",
    "@type": ["Article", "BlogPosting"],
    "@id": `${articleUrl}#article`,
    headline: post.title,
    description: post.shortDescription,
    articleSection: post.category,
    inLanguage: "en-IN",
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    author: {
      "@id": "https://www.ilmalink.com/#organization",
    },
    publisher: {
      "@id": "https://www.ilmalink.com/#organization",
    },
    isPartOf: {
      "@id": "https://www.ilmalink.com/#website",
    },
    ...(post.tags.length
      ? {
          keywords: post.tags.slice(0, 8).join(", "),
        }
      : {}),
    ...(post.featuredImage
      ? {
          image: absoluteUrl(post.featuredImage),
        }
      : {}),
  };
}

export function buildGuidanceDisclaimerSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": "https://www.ilmalink.com/#guidance-disclaimer",
    name: "ilmalink Admissions Guidance Disclaimer",
    text:
      "Medigo is an extension/service line of ilmalink. It provides admission guidance, counselling and student-support information. Final admission, eligibility, documentation, visa approval, scholarship, loan or licence outcome is subject to official rules, university decisions, regulatory authorities and applicable government norms.",
    inLanguage: "en-IN",
    isPartOf: {
      "@id": "https://www.ilmalink.com/#website",
    },
    publisher: {
      "@id": "https://www.ilmalink.com/#organization",
    },
  };
}

export function buildSiteNavigationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://www.ilmalink.com/#site-navigation",
    name: "ilmalink Study and Support Navigation",
    itemListElement: siteNavigationItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SiteNavigationElement",
        name: item.name,
        url: absoluteUrl(item.url),
      },
    })),
    isPartOf: {
      "@id": "https://www.ilmalink.com/#website",
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function buildFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildCountryMedicalEducationSchema(countryData: CountryGeoFact) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "@id": `https://www.ilmalink.com/mbbs-abroad/${countryData.slug}#medical-education-program`,
    name: `MBBS in ${countryData.countryName} guidance`,
    url: `https://www.ilmalink.com/mbbs-abroad/${countryData.slug}`,
    description: countryData.eligibilitySummary,
    educationalProgramMode: "On campus",
    programPrerequisites: countryData.neetRequirementForIndianStudents,
    timeToComplete: countryData.duration,
    provider: {
      "@id": "https://www.ilmalink.com/#educationalorganization",
    },
    areaServed: {
      "@type": "Country",
      name: countryData.countryName,
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: `Medical education pathway in ${countryData.countryName}`,
    },
    about: [
      {
        "@type": "Thing",
        name: `${countryData.countryName} WDOMS medical schools`,
        description: `${countryData.wdomsCount} WDOMS-listed medical school entries in the Medigo service-line country dataset of ilmalink.`,
      },
      {
        "@type": "Thing",
        name: "Indian licensing requirement",
        description: countryData.licensingNote,
      },
    ],
  };
}
