const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createOgAudi() {
  const src = path.join(__dirname, '../public/photos/audi-ovyola/cover-audi-ovyola.jpg');
  
  if (!fs.existsSync(src)) {
    console.error('Source not found:', src);
    return;
  }

  // 1. Background: 1200x630 blurred warm golden/dark tone from photo
  const bgCard = await sharp(src)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .blur(30)
    .modulate({ brightness: 0.35, saturation: 1.2 })
    .toBuffer();

  // 2. Couple photo in center with elegant framing
  const couplePhoto = await sharp(src)
    .resize(null, 560, { fit: 'inside' })
    .toBuffer();

  const cMeta = await sharp(couplePhoto).metadata();

  // 3. Rounded corners on couple photo
  const roundedCouple = await sharp(couplePhoto)
    .composite([{
      input: Buffer.from(`<svg><rect x="0" y="0" width="${cMeta.width}" height="${cMeta.height}" rx="16" fill="#fff"/></svg>`),
      blend: 'dest-in'
    }])
    .toBuffer();

  // 4. Elegant gold frame SVG
  const xPos = Math.round(600 - cMeta.width / 2);
  const yPos = Math.round(315 - cMeta.height / 2);

  const borderSvg = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffe699" />
          <stop offset="50%" stop-color="#d4af37" />
          <stop offset="100%" stop-color="#8c671a" />
        </linearGradient>
      </defs>
      <!-- Outer margin border -->
      <rect x="25" y="25" width="1150" height="580" rx="20" fill="none" stroke="url(#gold)" stroke-width="1.5" opacity="0.5" />
      
      <!-- Inner Frame around image -->
      <rect x="${xPos - 6}" y="${yPos - 6}" width="${cMeta.width + 12}" height="${cMeta.height + 12}" rx="20" fill="none" stroke="url(#gold)" stroke-width="2.5" opacity="0.9" />
      
      <!-- Branding / Watermark text in bottom corner -->
      <text x="600" y="605" text-anchor="middle" fill="#ffd778" font-family="Georgia, serif" font-size="14" letter-spacing="4" opacity="0.8">
        THE WEDDING OF AUDI &amp; OVYOLA • WD PRODUCTION
      </text>
    </svg>
  `);

  const destDir = path.join(__dirname, '../public');
  const destFile = path.join(destDir, 'og-audi-ovyola.jpg');

  await sharp(bgCard)
    .composite([
      { input: roundedCouple, top: yPos, left: xPos },
      { input: borderSvg, top: 0, left: 0 }
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(destFile);

  console.log('Successfully created:', destFile);
}

createOgAudi().catch(console.error);

