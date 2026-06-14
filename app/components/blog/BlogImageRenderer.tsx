"use client";

import type { BlogImage } from "@/app/lib/blog/types";
import { isImageFile, isVideoFile } from "@/app/lib/blog/imageValidation";

interface BlogImageRendererProps {
  images: BlogImage[];
  showAll?: boolean;
}

/**
 * Render editorial media with proper styling and positioning.
 * Prevents CLS with proper aspect ratio containers
 */
export default function BlogImageRenderer({
  images,
  showAll = true,
}: BlogImageRendererProps) {
  if (!images || images.length === 0) {
    return null;
  }

  // Sort images by order
  const sortedImages = images
    .filter((image) => image.url.trim())
    .sort((a, b) => a.order - b.order);
  const displayImages = showAll ? sortedImages : sortedImages.slice(0, 1);

  return (
    <>
      {displayImages.map((image) => (
        <figure
          key={image.id}
          className="relative w-full overflow-hidden rounded-2xl bg-[#EFF6FF]"
          style={{
            aspectRatio: "16 / 5",
            maxHeight: "20vh",
            minHeight: "120px",
          }}
        >
          {isVideoFile(image.url, image.type) ? (
            <video
              src={image.url}
              className="h-full w-full object-cover"
              style={{
                objectPosition: image.position,
              }}
              controls
              preload="metadata"
            />
          ) : isImageFile(image.url, image.type) ? (
            <img
              src={image.url}
              alt={image.alt || "Blog image"}
              className="h-full w-full object-cover"
              style={{
                objectPosition: image.position,
              }}
              loading="lazy"
            />
          ) : (
            <a
              href={image.url}
              download={image.fileName}
              className="flex h-full w-full items-center justify-center px-4 text-center text-sm font-bold text-[#0F4CFF]"
            >
              {image.fileName || image.alt || "Download file"}
            </a>
          )}
          {image.alt && (
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-2 text-xs text-white">
              {image.alt}
            </figcaption>
          )}
        </figure>
      ))}
    </>
  );
}
