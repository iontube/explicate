import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public');

const iconSvg = `
<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#818cf8"/>
      <stop offset="50%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#4338ca"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="110" fill="url(#bg)"/>
  <text x="256" y="320" font-family="system-ui, sans-serif" font-size="280" font-weight="800" fill="white" text-anchor="middle">E</text>
</svg>`;

const ogSvg = `
<svg viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0f172a"/>
  <rect x="60" y="60" width="100" height="100" rx="22" fill="#6366f1"/>
  <text x="110" y="135" font-family="system-ui" font-size="60" font-weight="800" fill="white" text-anchor="middle">E</text>
  <text x="200" y="135" font-family="system-ui" font-size="48" font-weight="700" fill="white">explicate<tspan fill="#818cf8">.ro</tspan></text>
  <text x="60" y="350" font-family="system-ui" font-size="56" font-weight="700" fill="white">Explicații pe care chiar</text>
  <text x="60" y="420" font-family="system-ui" font-size="56" font-weight="700" fill="#818cf8">le înțelegi</text>
  <text x="60" y="520" font-family="system-ui" font-size="24" fill="#64748b">Matematică · Fizică · Chimie · Biologie · Română · Istorie</text>
</svg>`;

async function generate() {
  const iconBuf = Buffer.from(iconSvg);
  const ogBuf = Buffer.from(ogSvg);

  await sharp(iconBuf).resize(32, 32).png().toFile(resolve(publicDir, 'favicon-32.png'));
  await sharp(iconBuf).resize(180, 180).png().toFile(resolve(publicDir, 'apple-touch-icon.png'));
  await sharp(iconBuf).resize(192, 192).png().toFile(resolve(publicDir, 'icon-192.png'));
  await sharp(iconBuf).resize(512, 512).png().toFile(resolve(publicDir, 'icon-512.png'));
  await sharp(ogBuf).resize(1200, 630).png().toFile(resolve(publicDir, 'og-default.png'));

  console.log('All icons generated!');
}

generate().catch(console.error);
