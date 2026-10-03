"""Build the Sony Kids World social share image (1200x630 JPEG).

Matches the project convention already used by the root site
(assets/img/og-cover.jpg, 1200x630) so the og:image is a JPEG at the
size every scraper prefers, rather than a 2172x724 WebP banner.
"""
import os
from PIL import Image

SRC = "sonykidsworld/sony-kids-world-site/assets/images/hero-cars.webp"
OUT = "sonykidsworld/sony-kids-world-site/assets/images/og-cover.jpg"
TW, TH = 1200, 630

im = Image.open(SRC).convert("RGB")
w, h = im.size

# centre-crop to the target aspect ratio, then scale down
target = TW / TH
if w / h > target:
    nw = int(h * target)
    left = (w - nw) // 2
    im = im.crop((left, 0, left + nw, h))
else:
    nh = int(w / target)
    top = (h - nh) // 2
    im = im.crop((0, top, w, top + nh))

im = im.resize((TW, TH), Image.LANCZOS)
im.save(OUT, "JPEG", quality=84, optimize=True, progressive=True)
print(f"{OUT}  {im.size[0]}x{im.size[1]}  {os.path.getsize(OUT)//1024} KB")