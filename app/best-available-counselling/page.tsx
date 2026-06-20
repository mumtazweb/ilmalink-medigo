import type { Metadata } from "next";

import ToolPlaceholderPage from "../components/ToolPlaceholderPage";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Best Available MBBS Counselling | ILMALINK MEDIGO",
  description:
    "Compare practical MBBS counselling pathways based on NEET profile, budget, preferred location, eligibility and admission goals.",
  alternates: {
    canonical: "https://www.ilmalink.com/best-available-counselling",
  },
};

export default function BestAvailableCounsellingPage() {
  return (
    <ToolPlaceholderPage
      eyebrow="MBBS counselling support"
      title="Best Available Counselling"
      description="Find the most suitable MBBS counselling route by comparing your NEET profile, budget, preferred location, eligibility and admission priorities before making a college decision."
      points={[
        "Review MBBS India and MBBS Abroad pathways against the student profile.",
        "Compare college and country choices using budget, eligibility and long-term fit.",
        "Identify the official counselling or admission route before making payments.",
        "Prepare focused questions for transparent, pressure-free counselling.",
      ]}
    />
  );
}
