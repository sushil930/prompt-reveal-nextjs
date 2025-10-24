# Images Folder Structure

This folder contains all images used in the Prompt Gallery application.

## Folder Organization

### `/images/categories/`
- **Purpose**: Images for the infinite scrolling category section
- **Current files**: 1.webp through 6.webp
- **Recommended format**: WebP for better performance
- **Recommended size**: 256x320px (4:5 aspect ratio)

### `/images/prompts/`
- **Purpose**: Images for the prompt cards in the gallery
- **Recommended format**: WebP or PNG
- **Recommended size**: 400x500px (4:5 aspect ratio)
- **Usage**: These images appear in the Pinterest-style masonry gallery

### `/images/hero/`
- **Purpose**: Background images or decorative images for the hero section
- **Recommended format**: WebP or PNG
- **Usage**: Optional hero section imagery

## Adding New Images

1. **For Category Cards**:
   - Place images in `/images/categories/`
   - Name them sequentially (7.webp, 8.webp, etc.)
   - Update the category section code to include more images

2. **For Prompt Cards**:
   - Place images in `/images/prompts/`
   - Update `src/data.ts` with new prompt entries
   - Reference the new images using `/images/prompts/filename.webp`

3. **Optimization Tips**:
   - Use WebP format for best performance
   - Compress images before uploading
   - Maintain consistent aspect ratios (4:5 recommended)

## Current Structure
```
/public/images/
├── README.md (this file)
├── 1.webp through 6.webp (category images - move to categories/)
├── categories/
│   └── (category scroll images)
├── prompts/
│   └── (prompt card images)
└── hero/
    └── (hero section images)
```

## Migration Note
The existing images (1.webp through 6.webp) are currently in the root `/images/` folder. You can optionally move them to `/images/categories/` for better organization and update the image paths in the code.
