import type { Metadata } from "next";

import ToolPlaceholderPage from "../components/ToolPlaceholderPage";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "MBBS Admission Document Checklist | ilmaLink",
  description:
    "Prepare the common academic, identity, NEET, admission, financial and visa documents used for MBBS India and MBBS Abroad planning.",
  alternates: {
    canonical: "https://www.ilmalink.com/document-checklist/",
  },
};

export default function DocumentChecklistPage() {
  return (
    <ToolPlaceholderPage
      eyebrow="Admission document planning"
      title="MBBS Document Checklist"
      description="Prepare the common academic, identity, NEET, admission, financial and visa documents that may be required during MBBS India or MBBS Abroad planning."
      points={[
        "Organise Class 10, Class 12, NEET and other academic records.",
        "Keep identity, address, domicile and category documents ready where applicable.",
        "Review admission-letter, fee, medical, passport and visa requirements.",
        "Verify exact document formats with the official authority before submission.",
      ]}
    />
  );
}



