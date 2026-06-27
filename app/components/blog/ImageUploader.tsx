"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, Upload, X, AlertCircle, CheckCircle2 } from "lucide-react";
import type { BlogImage, ImagePosition } from "@/app/lib/blog/types";
import {
  validateImageFile,
  formatFileSize,
  isImageFile,
  isVideoFile,
} from "@/app/lib/blog/imageValidation";

const IMAGE_POSITIONS: { label: string; value: ImagePosition }[] = [
  { label: "Top", value: "center top" },
  { label: "Center", value: "center center" },
  { label: "Bottom", value: "center bottom" },
  { label: "Top Left", value: "left top" },
  { label: "Top Right", value: "right top" },
  { label: "Center Left", value: "left center" },
  { label: "Center Right", value: "right center" },
  { label: "Bottom Left", value: "left bottom" },
  { label: "Bottom Right", value: "right bottom" },
];

interface ImageUploaderProps {
  images: BlogImage[];
  onImagesChange: (images: BlogImage[]) => void;
}

export default function ImageUploader({ images, onImagesChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  async function handleFileUpload(file: File) {
    setUploadError(null);
    setUploadSuccess(null);

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.message || "Invalid file");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/blog/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setUploadError(errorData.message || "Upload failed");
        setUploading(false);
        return;
      }

      const data = await response.json();

      if (!data.success) {
        setUploadError(data.message || "Upload failed");
        setUploading(false);
        return;
      }

      // Add to images list
      const newImage: BlogImage = {
        id: `img-${Date.now()}`,
        url: data.url,
        alt: file.name.replace(/\.[^/.]+$/, ""),
        position: "center center",
        order: images.length,
        size: data.size,
        type: data.type || file.type,
        fileName: data.fileName || file.name,
      };

      onImagesChange([...images, newImage]);
      setUploadSuccess(data.message || "Media uploaded successfully");

      // Clear input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Clear message after 3 seconds
      setTimeout(() => setUploadSuccess(null), 3000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  }

  function handleRemoveImage(id: string) {
    const updated = images.filter((img) => img.id !== id);
    // Reorder
    const reordered = updated.map((img, idx) => ({ ...img, order: idx }));
    onImagesChange(reordered);
  }

  function handlePositionChange(id: string, position: ImagePosition) {
    const updated = images.map((img) =>
      img.id === id ? { ...img, position } : img
    );
    onImagesChange(updated);
  }

  function handleAltChange(id: string, alt: string) {
    const updated = images.map((img) =>
      img.id === id ? { ...img, alt } : img
    );
    onImagesChange(updated);
  }

  function handleReorder(from: number, to: number) {
    const updated = [...images];
    const [item] = updated.splice(from, 1);
    updated.splice(to, 0, item);
    const reordered = updated.map((img, idx) => ({ ...img, order: idx }));
    onImagesChange(reordered);
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${
          dragActive
            ? "border-[#0F4CFF] bg-[#0F4CFF]/5"
            : "border-slate-200 bg-[#F8FAFC] hover:border-[#0F4CFF]/50"
        }`}
      >
        <input
          id="blog-image-upload"
          name="blogImageUpload"
          ref={fileInputRef}
          type="file"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
          disabled={uploading}
          className="sr-only"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="relative inline-flex flex-col items-center gap-2"
        >
          <div className="rounded-full bg-[#0F4CFF]/10 p-3">
            <Upload size={24} className="text-[#0F4CFF]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#0F172A]">
              {uploading ? "Uploading..." : "Drop media or click to upload"}
            </p>
            <p className="text-xs text-slate-600">
              Images, videos and files allowed
            </p>
          </div>
        </button>
      </div>

      {/* Messages */}
      {uploadError && (
        <div className="rounded-xl bg-red-50 px-4 py-3 flex items-start gap-2">
          <AlertCircle size={18} className="text-red-700 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{uploadError}</p>
        </div>
      )}

      {uploadSuccess && (
        <div className="rounded-xl bg-green-50 px-4 py-3 flex items-start gap-2">
          <CheckCircle2 size={18} className="text-green-700 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-green-700">{uploadSuccess}</p>
        </div>
      )}

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[#0F172A]">Uploaded Media ({images.length})</h3>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {images.map((image, idx) => (
              <div
                key={image.id}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden"
              >
                {/* Preview */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#F8FAFC]">
                  {isVideoFile(image.url, image.type) ? (
                    <video
                      src={image.url}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: image.position }}
                      controls
                      muted
                    />
                  ) : isImageFile(image.url, image.type) ? (
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: image.position }}
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
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ objectPosition: image.position }}
                  />

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image.id)}
                    className="absolute top-2 right-2 rounded-full bg-red-500 hover:bg-red-600 p-1.5 text-white transition"
                  >
                    <X size={16} />
                  </button>

                  {/* Order Badge */}
                  <div className="absolute top-2 left-2 rounded-full bg-[#0F4CFF] text-white text-xs font-bold px-2.5 py-1">
                    #{idx + 1}
                  </div>
                </div>

                {/* Controls */}
                <div className="p-3 space-y-2">
                  {/* Alt Text */}
                  <label className="block">
                    <span className="text-xs font-bold text-slate-700">Label / alt text</span>
                    <input
                      id={`blog-image-alt-${image.id}`}
                      name={`blogImageAlt-${image.id}`}
                      type="text"
                      value={image.alt}
                      onChange={(e) => handleAltChange(image.id, e.target.value)}
                      className="mt-1 w-full h-8 rounded-lg border border-slate-200 bg-[#F8FAFC] px-2 text-xs outline-none transition focus:border-[#0F4CFF] focus:bg-white"
                      placeholder="Describe image..."
                    />
                  </label>

                  {/* Position */}
                  <label className="block">
                    <span className="text-xs font-bold text-slate-700">Position</span>
                    <select
                      id={`blog-image-position-${image.id}`}
                      name={`blogImagePosition-${image.id}`}
                      value={image.position}
                      onChange={(e) =>
                        handlePositionChange(image.id, e.target.value as ImagePosition)
                      }
                      className="mt-1 w-full h-8 rounded-lg border border-slate-200 bg-[#F8FAFC] px-2 text-xs outline-none transition focus:border-[#0F4CFF] focus:bg-white"
                    >
                      {IMAGE_POSITIONS.map((pos) => (
                        <option key={pos.value} value={pos.value}>
                          {pos.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* File Info */}
                  <p className="text-xs text-slate-500 truncate">
                    {typeof image.size === "number" ? `${formatFileSize(image.size)} - ` : ""}
                    {image.fileName || image.url.split("/").pop()}
                  </p>
                </div>

                {/* Reorder Controls */}
                <div className="flex gap-1 border-t border-slate-200 p-2 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => handleReorder(idx, Math.max(0, idx - 1))}
                    disabled={idx === 0}
                    className="flex-1 h-7 rounded text-xs font-bold text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ArrowUp aria-label="Move up" className="mx-auto" size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReorder(idx, Math.min(images.length - 1, idx + 1))}
                    disabled={idx === images.length - 1}
                    className="flex-1 h-7 rounded text-xs font-bold text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ArrowDown aria-label="Move down" className="mx-auto" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

