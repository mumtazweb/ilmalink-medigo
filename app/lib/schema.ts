import {
  ilmaLinkEntityData,
  type CountryGeoFact,
  type IlmaLinkOffice,
} from "../data/geo";

type BreadcrumbItem = {
  name: string;
  url: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

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

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.ilmalink.com/#organization",
    name: "ILMALINK",
    alternateName: ilmaLinkEntityData.alternateName,
    url: ilmaLinkEntityData.url,
    logo: absoluteUrl(ilmaLinkEntityData.logo),
    description:
      "MBBS admission guidance and counselling platform for India and abroad.",
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
    name: "ILMALINK",
    alternateName: "ILMALINK MEDIGO",
    url: ilmaLinkEntityData.url,
    logo: absoluteUrl(ilmaLinkEntityData.logo),
    description:
      "Student counselling and guidance platform for MBBS admission in India and abroad, including MBBS admission consultancy, MBBS abroad consultancy, MBBS admission data bank support and medical education information guidance.",
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
    "@type": "LocalBusiness",
    "@id": `https://www.ilmalink.com/#${id}`,
    name: office.name,
    url: ilmaLinkEntityData.url,
    image: absoluteUrl(ilmaLinkEntityData.logo),
    description:
      "ILMALINK MEDIGO contact point for MBBS admission guidance, MBBS abroad counselling, India medical counselling support and student documentation guidance.",
    address: buildPostalAddress(office),
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
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.ilmalink.com/#website",
    name: "ILMALINK MEDIGO",
    url: ilmaLinkEntityData.url,
    inLanguage: "en-IN",
    publisher: {
      "@id": "https://www.ilmalink.com/#organization",
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
        description: `${countryData.wdomsCount} WDOMS-listed medical school entries in ILMALINK MEDIGO's internal country dataset.`,
      },
      {
        "@type": "Thing",
        name: "Indian licensing requirement",
        description: countryData.licensingNote,
      },
    ],
  };
}
