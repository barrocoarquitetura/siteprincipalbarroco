# Responsive images — 2026-10-03

19 indexable pages use responsive photography. 155 smaller WebP variants were generated at quality 88; originals and full-size lightbox links are unchanged.

## File-size comparison

Measured directly from files generated from the same originals. This is not a Lighthouse score, a network timing, or a Core Web Vitals measurement. Browser selection depends on viewport, pixel density and cover crop.

| Image | Original bytes | 480px bytes | Reduction | 768px bytes | Reduction |
|---|---:|---:|---:|---:|---:|
| hero-lavabo-geometrico.webp | 139148 | 52846 | 62.0% | 107268 | 22.9% |
| portfolio-cozinha-verde.webp | 68316 | 28724 | 58.0% | 54094 | 20.8% |
| mayara-cimino-luiz-faria.webp | 38436 | 8600 | 77.6% | 17118 | 55.5% |

## Validation

- Build/export and artifact validator passed.
- Six static tests passed, including candidate file existence, actual decoded widths, preserved aspect ratios, byte savings and original zoom links.
- Lint passed.
- Responsive preload and img use matching srcset/sizes.
- CSS, form handling, analytics runtime, canonical URLs and sitemaps were not changed.
- Full-size originals remain the fallback for high-density/large displays.
- Cover-aware sizes deliberately choose larger sources for tall crops to protect sharpness.
- No new field-performance data or before/after mobile timings were collected.
