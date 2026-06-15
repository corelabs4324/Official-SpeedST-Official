#!/bin/bash
# Run once: prepares the complete upload folder (site + all images)
set -euo pipefail
UPLOAD="$(cd "$(dirname "$0")" && pwd)"
EXPORT="$(dirname "$UPLOAD")/github-export"
CURSOR="$HOME/.cursor/projects/Users-alexanderbarron-Projects-speedst-website/assets"
GITHUB="https://raw.githubusercontent.com/corelabs4324/SpeedST-Official/main/assets"

echo "=== SPEED·ST — preparing upload folder ==="
echo "Upload: $UPLOAD"
echo ""

# Copy latest site files from github-export (skip dev-only)
echo "Copying site files from github-export..."
for item in "$EXPORT"/*; do
  name="$(basename "$item")"
  case "$name" in
    scripts|DEPLOY-NOW.sh|UPLOAD-STEPS.txt) continue ;;
  esac
  if [ -d "$item" ]; then
    rm -rf "$UPLOAD/$name"
    cp -R "$item" "$UPLOAD/$name"
  else
    cp "$item" "$UPLOAD/$name"
  fi
done

# Restore upload-specific helpers (cp above may overwrite)
mkdir -p "$UPLOAD/assets"

echo "Copying PNGs from github-export/assets..."
cp -f "$EXPORT/assets"/*.png "$UPLOAD/assets/" 2>/dev/null || true

echo "Copying your category line images..."
cp -f "$CURSOR/Blackout_plate_image_01_-16f41814-84c7-473e-a573-0e48ffed3be3.png" "$UPLOAD/assets/line-blackout-plates.png" 2>/dev/null || echo "  WARN: line-blackout-plates source missing"
cp -f "$CURSOR/Shop_underglow_button_image-21c3ce52-b931-4ccd-a612-d5819adba9be.png" "$UPLOAD/assets/line-underglow.png" 2>/dev/null || echo "  WARN: line-underglow source missing"
cp -f "$CURSOR/Glow_Bundle_-0167bbfc-bd6f-42b9-8ab7-4d0a3b4b1472.png" "$UPLOAD/assets/line-interior-glow.png" 2>/dev/null || echo "  WARN: line-interior-glow source missing"

echo "Downloading any still-missing images from GitHub..."
for f in hero-product.png bundle-plates-underglow-interior.png kit-dual.png kit-single.png \
  underglow-kit.png underglow-pro-kit.png underglow-car.png underglow-strips.png \
  interior-glow-kit.png interior-glow-marketing.png interior-glow-car.png interior-glow-open-box.png \
  sticker-pack.png meets-hero.png lifestyle-rear.png feature-detail.png feature-fits-all.png \
  feature-universal-fit.png feature-install.png mode-comparison.png promo-10off.png \
  bundle-hero.png product-dual.png product-single.png; do
  if [ ! -f "$UPLOAD/assets/$f" ]; then
    curl -sfL "$GITHUB/$f" -o "$UPLOAD/assets/$f" && echo "  downloaded $f" || echo "  FAILED $f"
  fi
done

# Remove dev files from upload folder
rm -rf "$UPLOAD/scripts" "$UPLOAD/DEPLOY-NOW.sh" "$UPLOAD/UPLOAD-STEPS.txt" 2>/dev/null || true

echo ""
echo "=== Verification ==="
COUNT=$(ls -1 "$UPLOAD/assets"/*.png 2>/dev/null | wc -l | tr -d ' ')
echo "PNG files in assets/: $COUNT"
for req in line-blackout-plates.png line-underglow.png line-interior-glow.png sticker-pack.png kit-dual.png hero-product.png; do
  if [ -f "$UPLOAD/assets/$req" ]; then echo "  OK  $req"; else echo "  MISSING  $req"; fi
done

echo ""
echo "=== READY ==="
echo "Folder: $UPLOAD"
echo "Upload ALL contents to your new GitHub repo root."
echo "See README.txt for GitHub Pages steps."
open "$UPLOAD" 2>/dev/null || true
python3 "$UPLOAD/download-assets.py" 2>/dev/null || true
echo ""
echo "Done. Upload everything in this folder to GitHub repo root."
