import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { getCurrentBlogUser } from "@/app/lib/blog/auth";
import {
  MAX_IMAGE_SIZE,
  MAX_IMAGE_SIZE_LABEL,
  generateFileName,
  isImageFile,
} from "@/app/lib/blog/imageValidation";

/**
 * POST /api/blog/upload-image
 * Upload an editorial media image with validation
 * Supports browser-recognized image files
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

    // Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
      return Response.json(
        {
          error: "File too large",
          message: `Maximum file size is ${MAX_IMAGE_SIZE_LABEL} (received ${(file.size / 1024 / 1024).toFixed(2)} MB)`,
        },
        { status: 400 }
      );
    }

    // Validate image type
    if (!isImageFile(file.name, file.type)) {
      return Response.json(
        {
          error: "Invalid format",
          message: "Please upload an image file",
        },
        { status: 400 }
      );
    }

    // Generate unique filename
    const uniqueName = generateFileName(file.name, file.type);
    const uploadDir = join(process.cwd(), "public", "uploads", "blogs");

    // Create directory if it doesn't exist
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch {
      // Directory might already exist
    }

    // Write file to disk
    const filePath = join(uploadDir, uniqueName);
    const buffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(buffer));

    // Return public URL
    const publicUrl = `/uploads/blogs/${uniqueName}`;

    return Response.json(
      {
        success: true,
        url: publicUrl,
        fileName: uniqueName,
        size: file.size,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Image upload error:", error);

    return Response.json(
      {
        error: "Upload failed",
        message: "Something went wrong during upload",
      },
      { status: 500 }
    );
  }
}
