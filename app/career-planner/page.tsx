import type { Metadata } from "next";

import ToolPlaceholderPage from "../components/ToolPlaceholderPage";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "MBBS Career Planner | ILMALINK MEDIGO",
  description:
    "Plan an MBBS journey using admission timeline, budget, country or college fit, licensing pathway and long-term career goals.",
  alternates: {
    canonical: "https://www.ilmalink.com/career-planner",
  },
};

export default function CareerPlannerPage() {
  return (
    <ToolPlaceholderPage
      eyebrow="Medical career roadmap"
      title="MBBS Career Planner"
      description="Build a practical MBBS roadmap using admission timeline, budget, country or college fit, licensing pathway and long-term medical career goals."
      points={[
        "Map admission, documentation, travel and study milestones on one timeline.",
        "Compare the complete education budget with realistic family resources.",
        "Understand the likely licensing and postgraduate pathway after graduation.",
        "Choose options that fit the student's goals instead of admission pressure.",
      ]}
    />
  );
}
