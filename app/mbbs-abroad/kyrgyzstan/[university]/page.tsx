import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  kyrgyzstanUniversityDirectory,
  getKyrgyzUniversityBySlug,
} from "../../../data/kyrgyzstanUniversities";
import KyrgyzstanUniversityProfile, {
  buildKyrgyzstanUniversityMetadata,
} from "../KyrgyzstanUniversityProfile";

type KyrgyzstanUniversityRouteProps = {
  params: Promise<{ university: string }>;
};

const dedicatedUniversitySlugs = new Set([
  "international-higher-school-of-medicine",
  "kyrgyz-state-medical-academy",
  "osh-state-university",
]);

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return kyrgyzstanUniversityDirectory
    .filter((university) => !dedicatedUniversitySlugs.has(university.slug))
    .map((university) => ({
      university: university.slug,
    }));
}

export async function generateMetadata({
  params,
}: KyrgyzstanUniversityRouteProps): Promise<Metadata> {
  const { university: slug } = await params;
  const university = getKyrgyzUniversityBySlug(slug);

  if (!university) {
    return {};
  }

  return buildKyrgyzstanUniversityMetadata(university);
}

export default async function KyrgyzstanUniversityPage({
  params,
}: KyrgyzstanUniversityRouteProps) {
  const { university: slug } = await params;
  const university = getKyrgyzUniversityBySlug(slug);

  if (!university || dedicatedUniversitySlugs.has(university.slug)) {
    notFound();
  }

  return <KyrgyzstanUniversityProfile university={university} />;
}
