import type { Metadata } from "next";

import StudentDocumentsManager from "../../../components/portal/StudentDocumentsManager";
import { requirePortalStudent } from "../../../lib/portal/session";
import { parseStoredInterests } from "../../../lib/portal/validation";

export const metadata: Metadata = {
  title: "My Documents | ILMALINK MEDIGO",
  robots: { index: false, follow: false },
};

export default async function StudentDocumentsPage() {
  const student = await requirePortalStudent();
  const interests = parseStoredInterests(student.interests);
  const preferredPath =
    student.preferredCourse || interests.join(", ") || "";
  const blobUploadsEnabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <StudentDocumentsManager
      documents={student.documents.map((document) => ({
        id: document.id,
        documentType: document.documentType,
        fileName: document.fileName,
        status: document.status,
        hasFile: Boolean(document.fileUrl),
        note: document.note,
        createdAt: document.createdAt.toISOString(),
      }))}
      preferredPath={preferredPath}
      preferredCountry={student.preferredCountry}
      blobUploadsEnabled={blobUploadsEnabled}
      uploadPathPrefix={`portal-documents/${student.id}/`}
    />
  );
}
