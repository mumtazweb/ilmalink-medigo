import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { getCurrentBlogUser } from "@/app/lib/blog/auth";
import { ALLOWED_IMAGE_FORMATS, MAX_IMAGE_SIZE, generateFileName } from "@/app/lib/blog/imageValidation";

/**
 * POST /api/blog/upload-image
 * Upload an editorial media image with validation
 * Supports .webp and .svg only, max 100KB
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
    const file = formData.get("file") as File;

    if (!file) {
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
          message: `Maximum file size is 100 KB (received ${(file.size / 1024).toFixed(1)} KB)`,
        },
        { status: 400 }
      );
    }

    // Validate file format
    const fileName = file.name.toLowerCase();
    const extension = fileName.split(".").pop() || "";

    if (!ALLOWED_IMAGE_FORMATS.includes(extension)) {
      return Response.json(
        {
          error: "Invalid format",
          message: "Only .webp and .svg formats are allowed",
        },
        { status: 400 }
      );
    }

    // Generate unique filename
    const uniqueName = generateFileName(fileName);
    const uploadDir = join(process.cwd(), "public", "uploads", "blogs");

    // Create directory if it doesn't exist
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
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
