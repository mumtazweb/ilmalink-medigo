import {
  buildGeorgiaUniversityMetadata,
  default as GeorgiaUniversityProfile,
} from "../GeorgiaUniversityProfile";
import { eastEuropeanUniversity } from "../../../data/georgiaUniversities";

export const dynamic = "force-static";

export const metadata = buildGeorgiaUniversityMetadata(
  eastEuropeanUniversity,
);

export default function EastEuropeanUniversityPage() {
  return <GeorgiaUniversityProfile university={eastEuropeanUniversity} />;
}
