import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import sharp from 'sharp';

// Originals remain untouched for zoom, sharing and large/high-density screens.
const root = path.resolve('public/images');
const output = path.join(root, 'responsive');
await mkdir(output, { recursive: true });
const manifest = {};
for (const name of (await readdir(root)).sort()) {
  if (!name.endsWith('.webp') || name.startsWith('logo-')) continue;
  const buffer = await readFile(path.join(root, name));
  const { width, height } = await sharp(buffer).metadata();
  const hash = createHash('sha256').update(buffer).update('responsive-v1-q88').digest('hex').slice(0, 10);
  const candidates = [];
  for (const size of [480, 768, 1024]) {
    if (size >= width) continue;
    const file = `${path.parse(name).name}-${hash}-${size}.webp`;
    const resized = await sharp(buffer).resize({ width: size, withoutEnlargement: true }).webp({ quality: 88, effort: 6 }).toBuffer();
    // A candidate must actually save bytes, not just have fewer pixels.
    if (resized.length >= buffer.length) continue;
    await writeFile(path.join(output, file), resized);
    candidates.push({ src: `/images/responsive/${file}`, width: size, bytes: resized.length });
  }
  manifest[`/images/${name}`] = { width, height, bytes: buffer.length, candidates };
}
await writeFile('app/lib/responsive-images.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Responsive images: ${Object.keys(manifest).length} originals, ${Object.values(manifest).reduce((n, image) => n + image.candidates.length, 0)} smaller variants`);
