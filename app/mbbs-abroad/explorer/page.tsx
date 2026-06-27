import type { Metadata } from "next";

import FMGEExplorerClient from "./FMGEExplorerClient";

export const metadata: Metadata = {
  title: "FMGE Explorer | MBBS Abroad | ilmaLink",
  description:
    "Browse the full FMGE country and college dataset for MBBS abroad shortlisting with filters, search, and pagination.",
  alternates: {
    canonical: "https://www.ilmalink.com/mbbs-abroad/explorer",
  },
};

export default function FMGEExplorerPage() {
  return <FMGEExplorerClient />;
}
