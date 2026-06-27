import type { Metadata } from "next";

import ToolPlaceholderPage from "../components/ToolPlaceholderPage";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "MBBS Abroad Eligibility Check | ilmaLink",
  description:
    "Check the main academic, NEET, document, university, course and NMC/FMGL considerations before planning MBBS abroad.",
  alternates: {
    canonical: "https://www.ilmalink.com/mbbs-abroad-eligibility",
  },
};

export default function MbbsAbroadEligibilityPage() {
  return (
    <ToolPlaceholderPage
      eyebrow="Eligibility-first planning"
      title="MBBS Abroad Eligibility"
      description="Review the main academic, NEET, document, university, course and NMC/FMGL considerations that Indian students should verify before planning an MBBS admission abroad."
      points={[
        "Check NEET qualification and relevant Class 12 PCB requirements.",
        "Verify country-specific admission rules and required academic documents.",
        "Review course duration, internship, teaching medium and local licence eligibility.",
        "Confirm the latest NMC/FMGL position and official university status before admission.",
      ]}
    />
  );
}
