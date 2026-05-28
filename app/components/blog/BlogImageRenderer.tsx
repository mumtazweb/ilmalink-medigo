"use client";

import Image from "next/image";
import type { BlogImage } from "@/app/lib/blog/types";

interface BlogImageRendererProps {
  images: BlogImage[];
  showAll?: boolean;
}

/**
 * Render editorial images with proper styling and positioning
 * Images are displayed as 20vh-height editorial banners with object-fit: cover
 * Supports 16:5 and 21:6 aspect ratios
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
  const sortedImages = [...images].sort((a, b) => a.order - b.order);
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
          <img
            src={image.url}
            alt={image.alt || "Blog image"}
            className="w-full h-full object-cover"
            style={{
              objectPosition: image.position,
            }}
            loading="lazy"
          />
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
