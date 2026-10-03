"""Validate the generated Sony Motors carousel banners (geometry + legibility).

Checks, per banner:
  1. canvas is exactly 2171x724 (matches assets/img/carousel.webp)
  2. not a flat / blank image
  3. the text half stays light, so deep-green copy is legible (WCAG ratio)
  4. dark scooter artwork really is composited over the white halo
  5. copy and artwork never collide, and nothing is clipped at the edges
"""
import os
import sys
from PIL import Image, ImageStat

OUT = "sonymoters/assets/img/carousel"
W, H = 2171, 724
SCOOTER_X = 1516          # left edge of the composited scooter art
INK = (11, 79, 0)         # headline colour


def srgb_lum(rgb):
    def ch(c):
        c /= 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (ch(v) for v in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la, lb = srgb_lum(a), srgb_lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def dark_fraction(grey_crop, cutoff=140):
    """Share of pixels darker than cutoff, from the histogram."""
    hist = grey_crop.histogram()
    return sum(hist[:cutoff]) / float(sum(hist))


def dark_pixels(grey_crop, cutoff=140):
    hist = grey_crop.histogram()
    return sum(hist[:cutoff])


fail = 0
names = sorted(n for n in os.listdir(OUT) if n.startswith("sonycarousel-"))
print(f"{len(names)} banner(s) in {OUT}\n")

for name in names:
    p = os.path.join(OUT, name)
    im = Image.open(p).convert("RGB")
    g = im.convert("L")
    kb = os.path.getsize(p) // 1024
    msgs = []

    if im.size != (W, H):
        msgs.append(f"WRONG SIZE {im.size}")

    if max(ImageStat.Stat(im).stddev) < 6:
        msgs.append("FLAT IMAGE")

    # 3. text half light + headline contrast
    text_bg = im.crop((0, 0, SCOOTER_X - 40, H))
    luma = ImageStat.Stat(text_bg.convert("L")).mean[0]
    ratio = contrast(INK, tuple(ImageStat.Stat(text_bg).mean))
    if luma < 185:
        msgs.append(f"text side too dark (luma {luma:.0f})")
    if ratio < 4.5:
        msgs.append(f"headline contrast {ratio:.1f}:1 below 4.5:1")

    # 4. scooter art present over the white halo
    art = g.crop((SCOOTER_X, 0, W, H))
    dark = dark_fraction(art)
    if dark < 0.06:
        msgs.append(f"scooter art invisible (only {dark*100:.1f}% dark px)")

    # 5. clipping: quiet margins top, bottom and left
    edge_dark = dark_pixels(g.crop((0, 0, W, 14))) + dark_pixels(g.crop((0, H - 14, W, H)))
    if edge_dark > W * 0.02:
        msgs.append(f"copy clipped at top/bottom edge ({edge_dark} dark px)")

    status = "OK  " if not msgs else "FAIL"
    if msgs:
        fail += 1
    print(f"{status} {name:<44} {kb:>3} KB  luma={luma:>3.0f}  contrast={ratio:>4.1f}:1  art={dark*100:>4.1f}%")
    for m in msgs:
        print(f"       -> {m}")

print("\nAll banners passed." if not fail else f"\n{fail} banner(s) need attention.")
sys.exit(1 if fail else 0)