IMAGE OPTIMIZATION NOTES

1. No cropping was applied. Aspect ratios are preserved.
2. Original files remain untouched outside this package.
3. WebP and AVIF are generated at high quality; alpha/transparency is preserved.
4. GIF is NOT recommended for these static website images. It is usually larger and has poor photographic quality.
5. Use responsive variants for hero/carousel images. For small product images, the native size may already be smaller than the responsive target.
6. For above-the-fold hero/carousel image: use loading="eager" and fetchpriority="high" on the FIRST visible slide only.
7. For other carousel slides: loading="lazy" decoding="async".
8. Always set width/height or aspect-ratio to prevent layout shift.
