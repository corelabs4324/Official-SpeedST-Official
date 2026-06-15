#!/usr/bin/env python3
"""Download/copy all PNG assets into this folder's assets/ directory."""
import shutil
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
ASSETS = HERE / "assets"
EXPORT = HERE.parent / "github-export" / "assets"
CURSOR = Path("/Users/alexanderbarron/.cursor/projects/Users-alexanderbarron-Projects-speedst-website/assets")
GITHUB = "https://raw.githubusercontent.com/corelabs4324/SpeedST-Official/main/assets"

LINE_MAP = {
    "Blackout_plate_image_01_-16f41814-84c7-473e-a573-0e48ffed3be3.png": "line-blackout-plates.png",
    "Shop_underglow_button_image-21c3ce52-b931-4ccd-a612-d5819adba9be.png": "line-underglow.png",
    "Glow_Bundle_-0167bbfc-bd6f-42b9-8ab7-4d0a3b4b1472.png": "line-interior-glow.png",
}

ALL_PNGS = [
    "hero-product.png", "bundle-plates-underglow-interior.png",
    "line-blackout-plates.png", "line-underglow.png", "line-interior-glow.png",
    "kit-dual.png", "kit-single.png", "sticker-pack.png",
    "underglow-car.png", "underglow-kit.png", "underglow-pro-kit.png", "underglow-strips.png",
    "interior-glow-kit.png", "interior-glow-marketing.png", "interior-glow-car.png",
    "interior-glow-open-box.png", "lifestyle-rear.png", "meets-hero.png",
    "bundle-hero.png", "feature-detail.png", "feature-fits-all.png",
    "feature-universal-fit.png", "mode-comparison.png", "promo-10off.png",
]

def main():
    ASSETS.mkdir(parents=True, exist_ok=True)
    if EXPORT.is_dir():
        for p in EXPORT.glob("*.png"):
            shutil.copy2(p, ASSETS / p.name)
            print(f"export: {p.name}")
    for src, dst in LINE_MAP.items():
        s = CURSOR / src
        if s.exists():
            shutil.copy2(s, ASSETS / dst)
            print(f"line: {dst}")
    for name in ["hero-product.png", "bundle-plates-underglow-interior.png"]:
        s = CURSOR / name
        if s.exists() and not (ASSETS / name).exists():
            shutil.copy2(s, ASSETS / name)
            print(f"cursor: {name}")
    for name in ALL_PNGS:
        dest = ASSETS / name
        if dest.exists():
            continue
        url = f"{GITHUB}/{name}"
        try:
            urllib.request.urlretrieve(url, dest)
            if dest.stat().st_size > 100:
                print(f"download: {name}")
            else:
                dest.unlink(missing_ok=True)
        except Exception as e:
            print(f"skip: {name} ({e})")
    print(f"\n{len(list(ASSETS.glob('*.png')))} PNGs ready in assets/")

if __name__ == "__main__":
    main()
