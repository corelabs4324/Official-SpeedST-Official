#!/bin/bash
cd "$(dirname "$0")"
echo "Building assets folder..."
python3 - <<'PY'
import os, re, shutil, urllib.request

DST = os.path.join(os.getcwd(), "assets")
SRC_EXPORT = os.path.join(os.path.dirname(os.getcwd()), "github-export", "assets")
CURSOR = os.path.expanduser("~/.cursor/projects/Users-alexanderbarron-Projects-speedst-website/assets")
GITHUB = "https://raw.githubusercontent.com/corelabs4324/SpeedST-Official/main/assets"

LINE = {
    "Blackout_plate_image_01_-16f41814-84c7-473e-a573-0e48ffed3be3.png": "line-blackout-plates.png",
    "Shop_underglow_button_image-21c3ce52-b931-4ccd-a612-d5819adba9be.png": "line-underglow.png",
    "Glow_Bundle_-0167bbfc-bd6f-42b9-8ab7-4d0a3b4b1472.png": "line-interior-glow.png",
}

FILES = [
    "hero-product.png", "bundle-plates-underglow-interior.png", "kit-dual.png", "kit-single.png",
    "underglow-kit.png", "underglow-pro-kit.png", "underglow-car.png", "underglow-strips.png",
    "underglow-boxes.png", "interior-glow-kit.png", "interior-glow-marketing.png",
    "interior-glow-car.png", "interior-glow-open-box.png", "interior-glow-pro-kit.png",
    "sticker-pack.png", "meets-hero.png", "lifestyle-rear.png", "feature-detail.png",
    "feature-fits-all.png", "feature-universal-fit.png", "feature-install.png",
    "mode-comparison.png", "promo-10off.png", "bundle-hero.png", "brand-collage.png",
    "plates-collage.png", "product-dual.png", "product-single.png",
    "line-blackout-plates.png", "line-underglow.png", "line-interior-glow.png",
]

os.makedirs(DST, exist_ok=True)
if os.path.isdir(SRC_EXPORT):
    for f in os.listdir(SRC_EXPORT):
        if f.endswith(".png"):
            shutil.copy2(os.path.join(SRC_EXPORT, f), os.path.join(DST, f))
for src, dst in LINE.items():
    p = os.path.join(CURSOR, src)
    if os.path.isfile(p):
        shutil.copy2(p, os.path.join(DST, dst))
        print("OK line", dst)
for name in FILES:
    out = os.path.join(DST, name)
    if os.path.isfile(out):
        continue
    try:
        urllib.request.urlretrieve(f"{GITHUB}/{name}", out)
        print("OK dl", name)
    except Exception as e:
        print("FAIL", name, e)
pngs = sorted(f for f in os.listdir(DST) if f.endswith(".png"))
print(f"\n{len(pngs)} PNG files ready in assets/")
PY
echo ""
echo "Done. Press Enter to close."
read
