// React/HTML: replace IMAGE with the actual filename stem.
<picture>
  <source media="(max-width: 767px)" type="image/avif"
          srcSet="/images/IMAGE-mobile.avif" />
  <source media="(max-width: 1279px)" type="image/avif"
          srcSet="/images/IMAGE-tablet.avif" />
  <source type="image/avif"
          srcSet="/images/IMAGE-desktop.avif" />

  <source media="(max-width: 767px)" type="image/webp"
          srcSet="/images/IMAGE-mobile.webp" />
  <source media="(max-width: 1279px)" type="image/webp"
          srcSet="/images/IMAGE-tablet.webp" />
  <source type="image/webp"
          srcSet="/images/IMAGE-desktop.webp" />

  <img
    src="/images/IMAGE-desktop.webp"
    alt="Descriptive alt text"
    loading="lazy"
    decoding="async"
  />
</picture>
