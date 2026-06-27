# Editorial Media System Documentation

## Overview
Professional editorial image system for the ilmaLink blog platform with advanced positioning controls, format validation, and optimized performance.

## Features Implemented

### 1. **Image Format Validation**
- ✅ Only `.webp` and `.svg` formats allowed
- ✅ Maximum file size: 100 KB
- ✅ Frontend and backend validation
- ✅ Clear error messages to users

**File:** `app/lib/blog/imageValidation.ts`

### 2. **Image Upload System**
- ✅ Drag-and-drop upload support
- ✅ Multiple image uploads per blog
- ✅ Instant preview on upload
- ✅ Remove/reorder functionality
- ✅ Auto-generated clean filenames with timestamps
- ✅ Upload progress indication
- ✅ Responsive mobile-first UI

**Files:** 
- `app/api/blog/upload-image/route.ts` - Backend upload handler
- `app/components/blog/ImageUploader.tsx` - Upload component

### 3. **Image Positioning System**
- ✅ 9 positioning options (Top, Center, Bottom, etc.)
- ✅ Maps to CSS object-position values
- ✅ Individual controls per image
- ✅ Real-time preview updates

**Supported Positions:**
```
- Top → center top
- Center → center center
- Bottom → center bottom
- Top Left → left top
- Top Right → right top
- Center Left → left center
- Center Right → right center
- Bottom Left → left bottom
- Bottom Right → right bottom
```

### 4. **Multiple Image Support**
- ✅ Unlimited images per blog
- ✅ Each image stores: URL, alt text, position, order
- ✅ Order/index management with reorder controls
- ✅ JSON serialization for storage

**Data Structure:**
```typescript
type BlogImage = {
  id: string;
  url: string;
  alt: string;
  position: ImagePosition;
  order: number;
};
```

### 5. **Professional UI/UX**
- ✅ Premium blue theme (#0F4CFF)
- ✅ Modern card-based layout
- ✅ Responsive on all devices
- ✅ Loading states and disabled buttons
- ✅ Success/error messaging
- ✅ Image preview thumbnails with badges
- ✅ Up/down reorder buttons
- ✅ Alt text and position controls per image

### 6. **SEO & Performance**
- ✅ Lazy loading for images
- ✅ CLS prevention with aspect ratio containers
- ✅ Responsive image heights (20vh max)
- ✅ Proper alt text support
- ✅ 16:5 and 21:6 aspect ratios
- ✅ object-fit: cover for proper scaling
- ✅ No layout shifts during load
- ✅ Semantic HTML with `<figure>` and `<figcaption>`

## File Structure

```
app/
├── api/
│   └── blog/
│       └── upload-image/
│           └── route.ts                 # Upload endpoint
├── components/
│   └── blog/
│       ├── AuthForm.tsx                 # (Updated) - no changes needed
│       ├── BlogEditorForm.tsx          # (Updated) - integrates ImageUploader
│       ├── BlogContent.tsx              # (Unchanged)
│       ├── BlogImageRenderer.tsx       # NEW - renders editorial images
│       └── ImageUploader.tsx            # NEW - upload interface
├── lib/
│   └── blog/
│       ├── actions.ts                   # (Updated) - handles images JSON
│       ├── types.ts                     # (Updated) - BlogImage type added
│       ├── imageValidation.ts          # NEW - validation utilities
│       ├── auth.ts                      # (Unchanged)
│       ├── email.ts                     # (Unchanged)
│       ├── store.ts                     # (Unchanged)
│       └── seed.ts                      # (Unchanged)
├── blogs/
│   └── [slug]/
│       └── page.tsx                     # (Updated) - displays editorial images
└── globals.css                          # (Unchanged)

public/
└── uploads/
    └── blogs/                           # Image upload directory (gitignored)

prisma/
└── schema.prisma                        # (Updated) - images JSON field added
```

## Database Schema Update

### Prisma Schema
```prisma
model Blog {
  id               String   @id @default(cuid())
  title            String
  slug             String   @unique
  shortDescription String
  content          String   @db.LongText
  category         String
  country          String
  featuredImage    String?
  images           String?  @db.LongText  # NEW - stores JSON array
  status           String   @default("draft")
  views            Int      @default(0)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  authorId String
  author   User @relation(fields: [authorId], references: [id])
}
```

**Migration Required:**
```bash
npx prisma migrate dev --name add_blog_images
```

## API Endpoints

### POST `/api/blog/upload-image`
Upload an editorial media image.

**Authentication:** Required (logged-in user)

**Request:**
```
POST /api/blog/upload-image
Content-Type: multipart/form-data

file: File (.webp or .svg, max 100KB)
```

**Response (Success):**
```json
{
  "success": true,
  "url": "/uploads/blogs/1726234567-abc123.webp",
  "fileName": "1726234567-abc123.webp",
  "size": 45823
}
```

**Response (Error):**
```json
{
  "error": "Invalid format",
  "message": "Only .webp and .svg formats are allowed"
}
```

## Component Usage

### ImageUploader Component
```tsx
import ImageUploader from "@/app/components/blog/ImageUploader";
import type { BlogImage } from "@/app/lib/blog/types";

export default function MyComponent() {
  const [images, setImages] = useState<BlogImage[]>([]);

  return (
    <ImageUploader 
      images={images} 
      onImagesChange={setImages} 
    />
  );
}
```

### BlogImageRenderer Component
```tsx
import BlogImageRenderer from "@/app/components/blog/BlogImageRenderer";

export default function MyComponent({ images }) {
  return (
    <BlogImageRenderer 
      images={images} 
      showAll={true}
    />
  );
}
```

## How It Works

### 1. **Upload Flow**
1. Author opens blog editor
2. Scrolls to "Editorial Images" section
3. Drags images into upload area or clicks to browse
4. Frontend validates format and size
5. Shows preview and upload progress
6. Backend saves file to `public/uploads/blogs/`
7. Returns public URL
8. Image added to gallery with default settings

### 2. **Positioning**
1. Author selects position from dropdown for each image
2. Real-time preview updates
3. Alt text can be edited
4. Images can be reordered with up/down arrows
5. Remove button deletes image

### 3. **Saving**
1. Images array serialized to JSON
2. Stored in hidden form input
3. Sent with blog submission
4. Stored in Prisma `images` field as JSON
5. Retrieved when displaying blog

### 4. **Display**
1. Blog page queries published blog with images array
2. BlogImageRenderer component displays all images
3. Each image styled with aspect ratio container
4. Lazy loading prevents performance issues
5. Proper alt text for accessibility

## Validation Rules

### Frontend
```typescript
// File format check
✓ .webp
✓ .svg
✗ .png
✗ .jpg
✗ .jpeg
✗ .gif

// File size check
✓ < 100 KB
✗ ≥ 100 KB
```

### Backend
```typescript
// Same validation repeated on server
// Prevents bypassing frontend validation
// Secure file system write with validation
```

## Performance Optimizations

1. **Image Format**
   - WebP: Modern, optimized, smaller file size
   - SVG: Scalable, vector, minimal size

2. **Lazy Loading**
   - Images load on-demand using `loading="lazy"`
   - Improves Core Web Vitals

3. **Aspect Ratio Containers**
   - Prevents Cumulative Layout Shift (CLS)
   - Aspect ratio: 16/5 or 21/6
   - Max height: 20vh responsive

4. **Object-fit & Position**
   - `object-fit: cover` ensures proper scaling
   - `object-position` controls alignment
   - No image distortion

5. **Responsive Images**
   - Adapts to mobile and desktop
   - Proper sizing attributes
   - SVG renders at any size

## Security Considerations

1. **Authentication**
   - Only logged-in users can upload
   - User verified via session cookie

2. **File Validation**
   - Format: Only .webp and .svg
   - Size: Maximum 100 KB
   - Validated on frontend AND backend

3. **File Storage**
   - Files stored in `public/` (accessible)
   - Unique filenames prevent conflicts
   - Timestamp + random string for naming

4. **XSS Prevention**
   - SVG files handled safely
   - No direct HTML injection
   - Image URLs validated

## Troubleshooting

### Images Not Uploading
- Check browser console for error messages
- Verify file format (.webp or .svg only)
- Confirm file size < 100 KB
- Check network tab for API response

### Images Not Displaying
- Verify image URL is correct
- Check file exists in `public/uploads/blogs/`
- Confirm alt text is set
- Check blog's `images` field has JSON data

### Upload Directory Not Created
- API route creates directory automatically
- Check `public/` folder exists
- Verify write permissions on `public/` directory

## Future Enhancements

1. **Image Compression**
   - Auto-compress on upload
   - Multiple resolution variants

2. **Image Editing**
   - Crop/rotate before upload
   - Basic filters

3. **Gallery Collections**
   - Group images by gallery
   - Lightbox viewer

4. **CDN Integration**
   - Move uploads to S3/Cloudinary
   - Automatic optimization
   - Global distribution

5. **Image Analytics**
   - Track image views
   - Engagement metrics
   - Performance monitoring

## Files Modified

### `app/lib/blog/types.ts`
- Added `ImagePosition` type
- Added `BlogImage` interface
- Updated `BlogPost` with optional `images` field

### `app/lib/blog/actions.ts`
- Added images JSON parsing
- Added images to blog object

### `app/components/blog/BlogEditorForm.tsx`
- Imported `ImageUploader` component
- Added images state management
- Added hidden images input field
- Added Editorial Images section

### `app/blogs/[slug]/page.tsx`
- Imported `BlogImageRenderer` component
- Added conditional image rendering

### `prisma/schema.prisma`
- Added `images` field to Blog model

### `.gitignore`
- Added `/public/uploads/` to ignore user uploads

## Files Created

1. **app/lib/blog/imageValidation.ts** - Validation utilities
2. **app/api/blog/upload-image/route.ts** - Upload API endpoint
3. **app/components/blog/ImageUploader.tsx** - Upload UI component
4. **app/components/blog/BlogImageRenderer.tsx** - Image display component

## Testing Checklist

- [ ] Upload .webp image (should succeed)
- [ ] Upload .svg image (should succeed)
- [ ] Upload .png image (should fail)
- [ ] Upload 101 KB image (should fail)
- [ ] Upload multiple images (should work)
- [ ] Reorder images (should update order)
- [ ] Change image position (should update preview)
- [ ] Edit alt text (should save)
- [ ] Remove image (should delete from list)
- [ ] Save blog with images (should store JSON)
- [ ] View published blog (should display images)
- [ ] Mobile responsiveness (should adapt layout)
- [ ] Image lazy loading (should load on scroll)
- [ ] SEO optimization (should have proper markup)

## Support

For issues or questions about the editorial media system:
1. Check the troubleshooting section
2. Review console error messages
3. Verify file format and size
4. Check API endpoint responses
5. Ensure authentication is active
