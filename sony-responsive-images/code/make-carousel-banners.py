"""Generate one Sony Motors hero-carousel banner per device.

Output: sonymoters/assets/img/carousel/sonycarousel-<device>.webp

Canvas matches the existing assets/img/carousel.webp (2171x724) so the
.promo-carousel-frame CSS needs no change.

Design notes
------------
The product cutouts in assets/img/products are dark silhouettes (mean RGB
~50-95) on a transparent background, so they vanish on a saturated green
field. The banners are therefore built light: a white -> mint gradient with
deep-green type, which is also the light-dominant palette of the existing
carousel.webp. The scooter sits on a white halo with a soft contact shadow.
"""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

SRC = "sonymoters/assets/img/products"
OUT = "sonymoters/assets/img/carousel"
W, H = 2171, 724

FONT_B = r"C:\Windows\Fonts\seguibl.ttf"   # Segoe UI Black
FONT_SB = r"C:\Windows\Fonts\seguisb.ttf"  # Segoe UI Semibold
FONT_R = r"C:\Windows\Fonts\segoeui.ttf"   # Segoe UI

# Brand ramp lifted from sony-motors.css.
DEEP = (15, 107, 0)      # --brand-deep
BRAND = (23, 138, 0)     # --brand
INK = (11, 79, 0)        # near-black green, headline
BODY = (60, 90, 52)      # muted green body copy
MINT = (231, 241, 222)   # lightest brand tint
PAPER = (255, 255, 255)

# device slug, display name, range, speed, battery, colours, price band
DEVICES = [
    ("sony-glide-pro",     "Sony Glide Pro",     "75-90 km",  "25 km/h",  "Lead acid / Lithium-ion", 7, "\u20b944,999 \u2013 \u20b954,999"),
    ("sony-glide-plus",    "Sony Glide Plus",    "75-90 km",  "25 km/h",  "Lead acid / Lithium-ion", 5, "\u20b945,999 \u2013 \u20b955,999"),
    ("sony-nebo-plus",     "Sony Nebo Plus",     "75-90 km",  "25 km/h",  "Lead acid / Lithium-ion", 7, "\u20b959,999 \u2013 \u20b969,999"),
    ("sony-nebo-advanced", "Sony Nebo Advanced", "70-85 km",  "25 km/h",  "Lead acid / Lithium-ion", 7, "\u20b954,999 \u2013 \u20b964,999"),
    ("sony-blossom",       "Sony Blossom",       "75-90 km",  "25 km/h",  "Lead acid / Lithium-ion", 8, "\u20b952,999 \u2013 \u20b962,999"),
    ("sony-zenith",        "Sony Zenith",        "90-120 km", "60+ km/h", "Lithium-ion",             7, "\u20b989,999"),
    ("sony-nebo",          "Sony Nebo",          "70-90 km",  "25 km/h",  "Lead acid / Lithium-ion", 6, "\u20b956,999 \u2013 \u20b966,999"),
    ("sony-nebo-fx",       "Sony Nebo FX",       "70-90 km",  "25 km/h",  "Lead acid / Lithium-ion", 5, "\u20b954,999 \u2013 \u20b964,999"),
    ("sony-nebo-ola",      "Sony Nebo Ola",      "70-90 km",  "25 km/h",  "Lead acid / Lithium-ion", 7, "\u20b957,999 \u2013 \u20b967,999"),
    ("sony-nebo-super",    "Sony Nebo Super",    "75-90 km",  "25 km/h",  "Lead acid / Lithium-ion", 6, "\u20b955,999 \u2013 \u20b965,999"),
    ("sony-nebo-xl",       "Sony Nebo XL",       "80-90 km",  "25 km/h",  "Lead acid / Lithium-ion", 7, "\u20b956,999 \u2013 \u20b966,999"),
]


def gradient(size, c0, c1):
    """Horizontal linear gradient."""
    w, h = size
    strip = Image.new("RGB", (w, 1))
    px = strip.load()
    for x in range(w):
        t = x / (w - 1)
        px[x, 0] = tuple(int(c0[i] + (c1[i] - c0[i]) * t) for i in range(3))
    return strip.resize((w, h), Image.BILINEAR)


def radial(size, centre, radius, colour, strength=150):
    """Soft radial wash, drawn small then upscaled for speed."""
    w, h = size
    sw, sh = max(2, w // 8), max(2, h // 8)
    small = Image.new("L", (sw, sh), 0)
    d = ImageDraw.Draw(small)
    cx, cy, r = centre[0] / 8, centre[1] / 8, radius / 8
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=strength)
    small = small.filter(ImageFilter.GaussianBlur(r * 0.5))
    layer = Image.new("RGBA", (w, h), colour + (0,))
    layer.putalpha(small.resize((w, h), Image.LANCZOS))
    return layer


def fit_within(im, box_w, box_h):
    scale = min(box_w / im.width, box_h / im.height)
    return im.resize((max(1, int(im.width * scale)), max(1, int(im.height * scale))), Image.LANCZOS)


def pill(draw, x, y, text, font, fill, fg, outline=None, padx=30, pady=15):
    l, t, r, b = draw.textbbox((0, 0), text, font=font)
    w, h = r - l, b - t
    box = [x, y, x + w + padx * 2, y + h + pady * 2]
    draw.rounded_rectangle(box, radius=(box[3] - box[1]) // 2, fill=fill, outline=outline, width=2 if outline else 0)
    draw.text((x + padx - l, y + pady - t), text, font=font, fill=fg)
    return box[2] - box[0]


def width_of(draw, s, font):
    l, t, r, b = draw.textbbox((0, 0), s, font=font)
    return r - l


os.makedirs(OUT, exist_ok=True)

for slug, name, rng, speed, battery, colours, price in DEVICES:
    # ---- background -------------------------------------------------------
    base = gradient((W, H), PAPER, MINT).convert("RGBA")
    base.alpha_composite(radial((W, H), (int(W * 0.18), int(H * 0.05)), int(W * 0.42), PAPER, 165))
    base.alpha_composite(radial((W, H), (int(W * 0.83), int(H * 0.52)), int(W * 0.30), PAPER, 205))

    # decorative rings behind the scooter
    deco = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dd = ImageDraw.Draw(deco)
    for i, rad in enumerate((430, 545, 660)):
        dd.ellipse(
            [int(W * 0.80) - rad, int(H * 0.52) - rad, int(W * 0.80) + rad, int(H * 0.52) + rad],
            outline=DEEP + (30 - i * 8,),
            width=3,
        )
    base.alpha_composite(deco)

    # ---- scooter + contact shadow ----------------------------------------
    scooter = fit_within(Image.open(os.path.join(SRC, slug + ".png")).convert("RGBA"), 660, 600)
    sx = int(W * 0.975) - scooter.width
    sy = int(H * 0.52) - scooter.height // 2

    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse(
        [sx + 24, sy + scooter.height - 54, sx + scooter.width - 24, sy + scooter.height + 4],
        fill=(20, 60, 10, 105),
    )
    base.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(20)))
    base.alpha_composite(scooter, (sx, sy))

    # ---- copy -------------------------------------------------------------
    draw = ImageDraw.Draw(base)
    f_eye = ImageFont.truetype(FONT_SB, 30)
    f_name = ImageFont.truetype(FONT_B, 112)
    f_spec = ImageFont.truetype(FONT_SB, 40)
    f_pill = ImageFont.truetype(FONT_SB, 30)
    f_price = ImageFont.truetype(FONT_SB, 34)

    x = 132

    draw.rounded_rectangle([x, 148, x + 76, 155], radius=4, fill=BRAND)
    draw.text((x + 100, 128), "SONY MOTORS ELECTRIC 2-WHEELER", font=f_eye, fill=DEEP)
    draw.text((x - 4, 182), name, font=f_name, fill=INK)
    draw.text((x, 328), f"{rng} range  \u2022  {speed}  \u2022  {battery}", font=f_spec, fill=BODY)

    px, py = x, 404
    px += pill(draw, px, py, f"{colours} colours", f_pill, PAPER, DEEP, outline=BRAND) + 16
    px += pill(draw, px, py, "Book on WhatsApp", f_pill, DEEP, PAPER) + 16
    draw.text((x, py + 82), f"Starting from {price}", font=f_price, fill=BODY)

    # guard: copy must not run under the scooter artwork
    text_right = max(
        x + width_of(draw, name, f_name),
        x + width_of(draw, f"{rng} range  \u2022  {speed}  \u2022  {battery}", f_spec),
        px - 16,
    )
    if text_right > sx - 40:
        raise SystemExit(f"{slug}: text column ends at {text_right}, scooter starts at {sx}")

    out = os.path.join(OUT, f"sonycarousel-{slug}.webp")
    base.convert("RGB").save(out, "WEBP", quality=84, method=6)
    print(f"{os.path.basename(out)}  {scooter.width}x{scooter.height} art @x{sx}  {os.path.getsize(out)//1024} KB")