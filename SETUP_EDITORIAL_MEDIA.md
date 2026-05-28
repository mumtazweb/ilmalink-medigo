# Quick Start: Editorial Media System

## Setup Instructions

### 1. **Database Migration**
```bash
cd c:\Users\91956\ilmalink-medigo

# Run Prisma migration to add images field to Blog model
npx prisma migrate dev --name add_blog_images

# OR if using prisma studio to verify
npx prisma studio
```

### 2. **Create Uploads Directory**
```bash
# Create the public/uploads/blogs directory
mkdir -p public/uploads/blogs
```

### 3. **Verify Installation**

#### Check file structure:
```
✓ app/api/blog/upload-image/route.ts
✓ app/lib/blog/imageValidation.ts
✓ app/components/blog/ImageUploader.tsx
✓ app/components/blog/BlogImageRenderer.tsx
✓ app/lib/blog/types.ts (updated)
✓ app/components/blog/BlogEditorForm.tsx (updated)
✓ app/blogs/[slug]/page.tsx (updated)
✓ prisma/schema.prisma (updated)
✓ .gitignore (updated)
```

### 4. **Start Development Server**
```bash
npm run dev

# Navigate to http://localhost:3000/dashboard
# Create new blog or edit existing blog
```

## How to Use

### For Authors (Blog Editors)

**Step 1: Open Blog Editor**
- Go to Dashboard
- Create new blog or edit existing one
- Scroll to "Editorial Images" section

**Step 2: Upload Images**
- Drag & drop images onto upload area
  OR
- Click to browse and select files
- Only .webp and .svg allowed
- Maximum 100 KB per image

**Step 3: Configure Images**
- Set alt text for accessibility
- Choose positioning (Top, Center, Bottom, etc.)
- Reorder images with up/down arrows
- Remove images with × button

**Step 4: Save Blog**
- Click "Save draft", "Submit for approval", or "Publish"
- Images are automatically serialized and saved

**Step 5: View Published Blog**
- Go to blog page
- Editorial images display below content
- Images are fully responsive
- Lazy loading improves performance

### For Developers

**Upload Multiple Images Programmatically**
```typescript
const images: BlogImage[] = [
  {
    id: "img-001",
    url: "/uploads/blogs/1726234567-abc123.webp",
    alt: "MBBS Admission Process",
    position: "center center",
    order: 0,
  },
  {
    id: "img-002",
    url: "/uploads/blogs/1726234568-def456.svg",
    alt: "Medical College Rankings",
    position: "center bottom",
    order: 1,
  },
];
```

**Render Images in Custom Component**
```tsx
import BlogImageRenderer from "@/app/components/blog/BlogImageRenderer";
import type { BlogImage } from "@/app/lib/blog/types";

export default function CustomBlogView({ blog }) {
  return (
    <>
      <h1>{blog.title}</h1>
      {blog.images && (
        <BlogImageRenderer images={blog.images} showAll={true} />
      )}
      <BlogContent content={blog.content} />
    </>
  );
}
```

## Image Specifications

### Recommended Dimensions
- **Width:** 800px - 1200px
- **Height:** 200px - 400px (maintains 16:5 or 21:6 ratio)
- **Aspect Ratio:** 16:5 or 21:6 (recommended)
- **Display Height:** ~20vh on screen (responsive)

### File Format Requirements
```
✓ WebP (.webp)
  - Modern, optimized format
  - Best compression
  - Recommended for photos
  
✓ SVG (.svg)
  - Scalable vector format
  - Perfect for diagrams
  - Minimal file size

✗ PNG (.png) - Not allowed
✗ JPG (.jpg) - Not allowed
✗ JPEG (.jpeg) - Not allowed
✗ GIF (.gif) - Not allowed
```

### File Size Constraints
- **Maximum:** 100 KB per image
- **Recommended:** 30-80 KB for optimal performance

## Positioning Options

```
Position Selector Maps To CSS Object-Position:

Top             → center top
Center          → center center
Bottom          → center bottom
Top Left        → left top
Top Right       → right top
Center Left     → left center
Center Right    → right center
Bottom Left     → left bottom
Bottom Right    → right bottom
```

**Usage:**
- Select position to control where cropping occurs
- Especially useful for images with important content
- Updates preview in real-time

## API Endpoint

### POST /api/blog/upload-image

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/blog/upload-image \
  -F "file=@image.webp" \
  -H "Cookie: ilmalink_blog_session=YOUR_SESSION_ID"
```

**JavaScript Example:**
```typescript
const formData = new FormData();
formData.append("file", imageFile);

const response = await fetch("/api/blog/upload-image", {
  method: "POST",
  body: formData,
});

const data = await response.json();
if (data.success) {
  console.log("Upload successful:", data.url);
} else {
  console.error("Upload failed:", data.message);
}
```

## Performance Optimization

The editorial media system is optimized for:
- ✅ **Core Web Vitals** - No CLS, fast LCP
- ✅ **Mobile Performance** - Responsive images
- ✅ **SEO** - Proper alt text and markup
- ✅ **Lazy Loading** - Load on demand
- ✅ **Bandwidth** - Small file sizes only

## Troubleshooting

### Problem: Upload button not working
**Solution:**
- Check you're logged in
- Verify file format is .webp or .svg
- Check file size < 100 KB
- Open browser console for error details

### Problem: Images not showing on published blog
**Solution:**
- Verify images have alt text
- Check image URL is correct in database
- Confirm file exists in public/uploads/blogs/
- Try clearing browser cache

### Problem: Cannot upload images - getting "Unauthorized" error
**Solution:**
- Log out and log back in
- Check session cookie exists
- Clear browser cookies and try again
- Check auth system is working

### Problem: Images appear distorted
**Solution:**
- Adjust image position setting
- Ensure image maintains aspect ratio
- Try different crop position
- Use 16:5 or 21:6 aspect ratio

## Next Steps

1. ✅ **Test Uploads**
   - Create test blog
   - Upload .webp and .svg images
   - Verify they display correctly

2. ✅ **Configure Positions**
   - Try different positioning options
   - See how images adjust
   - Use best positioning for your content

3. ✅ **Publish Content**
   - Submit blog for approval
   - Review on published page
   - Check mobile responsiveness

4. ⚠️ **Monitor Performance**
   - Use PageSpeed Insights
   - Check Core Web Vitals
   - Monitor image loading times

## Advanced Configuration (Optional)

### Convert Images to WebP
```bash
# Using ImageMagick
convert input.jpg -quality 80 output.webp

# Using ffmpeg
ffmpeg -i input.jpg -c:v libwebp output.webp
```

### Optimize Image Size
```bash
# Using ImageMagick
convert input.webp -quality 80 -resize 1000x output.webp

# Using WebP CLI
cwebp -q 80 input.webp -o output.webp
```

## Security Notes

✅ **What's Protected:**
- Only logged-in users can upload
- File format validation on frontend and backend
- File size validation (100 KB max)
- Unique filenames prevent conflicts

⚠️ **What to Monitor:**
- User account security
- File storage permissions
- Disk space for uploads directory
- Regular backups of upload directory

## Support & Documentation

See detailed documentation in: `EDITORIAL_MEDIA_SYSTEM.md`

Key sections:
- Features Implemented
- File Structure
- Component Usage
- API Documentation
- Performance Optimizations
- Testing Checklist

---

**Implementation Date:** May 28, 2026
**Version:** 1.0.0
**Status:** Production Ready ✅
