import {
  buildGeorgiaUniversityMetadata,
  default as GeorgiaUniversityProfile,
} from "../GeorgiaUniversityProfile";
import { georgianAmericanUniversity } from "../../../data/georgiaUniversities";

export const dynamic = "force-static";

export const metadata = buildGeorgiaUniversityMetadata(
  georgianAmericanUniversity,
);

export default function GeorgianAmericanUniversityPage() {
  return (
    <GeorgiaUniversityProfile university={georgianAmericanUniversity} />
  );
}
