#!/bin/bash

# Move downloaded images from Downloads folder to public folder
# Run with: bash move-images.sh

echo "🎨 Moving images to /public folder..."

DOWNLOADS="$HOME/Downloads"
PUBLIC="./public"

# Array of image files
images=(
  "og-image.png"
  "apple-touch-icon.png"
  "icon-192.png"
  "icon-512.png"
  "screenshot.png"
  "screenshot-wide.png"
  "screenshot-narrow.png"
)

moved=0
missing=0

for img in "${images[@]}"; do
  if [ -f "$DOWNLOADS/$img" ]; then
    mv "$DOWNLOADS/$img" "$PUBLIC/$img"
    echo "✓ Moved $img"
    ((moved++))
  else
    echo "✗ Not found: $img"
    ((missing++))
  fi
done

echo ""
echo "Summary:"
echo "  Moved: $moved files"
echo "  Missing: $missing files"
echo ""

if [ $missing -eq 0 ]; then
  echo "✅ All images moved successfully!"
  echo ""
  echo "Run 'npm run validate-seo' to verify"
else
  echo "⚠️  Some images are missing. Please download them from generate-images.html"
fi
