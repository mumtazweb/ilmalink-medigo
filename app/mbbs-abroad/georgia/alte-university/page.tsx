import {
  buildGeorgiaUniversityMetadata,
  default as GeorgiaUniversityProfile,
} from "../GeorgiaUniversityProfile";
import { alteUniversity } from "../../../data/georgiaUniversities";

export const dynamic = "force-static";

export const metadata = buildGeorgiaUniversityMetadata(alteUniversity);

export default function AlteUniversityPage() {
  return <GeorgiaUniversityProfile university={alteUniversity} />;
}
