import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { getCurrentBlogUser } from "@/app/lib/blog/auth";
import {
  generateFileName,
} from "@/app/lib/blog/imageValidation";

/**
 * POST /api/blog/upload-image
 * Upload editorial media.
 * App-level file type and file size caps are intentionally not enforced here.
 * Stores in public/uploads/blogs/
 */
export async function POST(request: Request) {
  try {
    // Verify user is authenticated
    const user = await getCurrentBlogUser();
    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get form data
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const uniqueName = generateFileName(file.name, file.type);
    const uploadDir = join(process.cwd(), "public", "uploads", "blogs");
    const buffer = Buffer.from(await file.arrayBuffer());

    try {
      await mkdir(uploadDir, { recursive: true });
      const filePath = join(uploadDir, uniqueName);
      await writeFile(filePath, buffer);

      return Response.json(
        {
          success: true,
          url: `/uploads/blogs/${uniqueName}`,
          fileName: uniqueName,
          size: file.size,
          type: file.type,
        },
        { status: 200 }
      );
    } catch (storageError) {
      console.warn("File storage is not writable, using inline media fallback:", storageError);

      const mimeType = file.type || "application/octet-stream";
      const inlineUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;

      return Response.json(
        {
          success: true,
          url: inlineUrl,
          fileName: uniqueName,
          size: file.size,
          type: file.type,
          storage: "inline",
          message:
            "Media attached inline because server upload storage is not writable.",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Media upload error:", error);

    return Response.json(
      {
        error: "Upload failed",
        message: "Upload could not be processed. Please try again or paste a media URL.",
      },
      { status: 500 }
    );
  }
}
