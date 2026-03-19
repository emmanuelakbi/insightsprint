# Generate Images for SEO

## Quick Start

1. Open `generate-images.html` in your browser
2. Click each "Download" button to save the images
3. Save all files to the `/public` folder
4. Run `npm run validate-seo` to verify

## What Gets Generated

The HTML file will generate all 7 required images:

1. **og-image.png** (1200x630px) - Social media sharing
2. **apple-touch-icon.png** (180x180px) - iOS home screen
3. **icon-192.png** (192x192px) - PWA icon
4. **icon-512.png** (512x512px) - PWA icon (high-res)
5. **screenshot.png** (1280x720px) - App screenshot
6. **screenshot-wide.png** (1280x720px) - PWA desktop
7. **screenshot-narrow.png** (750x1334px) - PWA mobile

## Design

All images use:

- Your activity/pulse icon in accent orange (#FF6B35)
- InsightSprint branding
- Brutalist design aesthetic
- High contrast for readability

## After Generating

1. Place all images in `/public` folder
2. Run: `npm run validate-seo`
3. Should show 100% SEO readiness
4. Ready to deploy!

## Alternative: Manual Creation

If you prefer to create custom images:

- Use the specifications in `public/.gitkeep`
- Follow the brand guidelines
- Maintain the activity/pulse icon theme
