import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  georgiaUniversities,
  getGeorgiaUniversityBySlug,
} from "../../../data/georgiaUniversities";
import GeorgiaUniversityProfile, {
  buildGeorgiaUniversityMetadata,
} from "../GeorgiaUniversityProfile";

type GeorgiaUniversityRouteProps = {
  params: Promise<{ university: string }>;
};

const dedicatedUniversitySlugs = new Set([
  "georgian-american-university",
  "alte-university",
  "east-european-university",
]);

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return georgiaUniversities
    .filter((university) => !dedicatedUniversitySlugs.has(university.slug))
    .map((university) => ({
      university: university.slug,
    }));
}

export async function generateMetadata({
  params,
}: GeorgiaUniversityRouteProps): Promise<Metadata> {
  const { university: slug } = await params;
  const university = getGeorgiaUniversityBySlug(slug);

  if (!university) {
    return {};
  }

  return buildGeorgiaUniversityMetadata(university);
}

export default async function GeorgiaUniversityPage({
  params,
}: GeorgiaUniversityRouteProps) {
  const { university: slug } = await params;
  const university = getGeorgiaUniversityBySlug(slug);

  if (!university || dedicatedUniversitySlugs.has(university.slug)) {
    notFound();
  }

  return <GeorgiaUniversityProfile university={university} />;
}
