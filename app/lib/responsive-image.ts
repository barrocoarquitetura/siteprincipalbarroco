import manifest from './responsive-images.json';

type ImageEntry = { width: number; height: number; candidates: { src: string; width: number }[] };
const images: Record<string, ImageEntry> = manifest;
type Layout = 'hero' | 'serviceHero' | 'caseHero' | 'team' | 'card' | 'gallery' | 'article';

export function responsiveImage(src: string, layout: Layout = 'card') {
  const image = images[src];
  if (!image?.candidates.length) return {};
  const ratio = image.width / image.height;
  // Cover crops need enough source pixels for BOTH axes. Conservative heights also
  // protect landscape photos inside tall mobile cards; zoom keeps original src/href.
  const px = (height: number) => `${Math.ceil(height * ratio)}px`;
  const vw = (height: number) => `${Math.ceil(height * ratio)}vw`;
  const heights = {
    hero: [vw(82), vw(66), px(650)],
    serviceHero: [px(480), px(620), px(650)],
    caseHero: [vw(118), px(660), px(660)],
    team: [vw(78), '580px', px(390)],
    card: [px(420), px(390), px(430)],
    gallery: [px(360), px(560), px(550)],
    article: [vw(110), vw(68), px(760)],
  }[layout];
  const desktop = layout === 'article' ? '1280px' : layout === 'gallery' ? '860px' : '700px';
  const sizes = `(max-width: 560px) max(calc(100vw - 28px), ${heights[0]}), (max-width: 820px) max(calc(100vw - 36px), ${heights[1]}), max(${desktop}, ${heights[2]})`;
  return {
    srcSet: [...image.candidates.map(item => `${item.src} ${item.width}w`), `${src} ${image.width}w`].join(', '),
    sizes,
  };
}
