const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const src = 'C:/Users/WD Group/.gemini/antigravity-ide/brain/1f442522-7dc9-42f5-9cd7-ec765274acd2/.user_uploaded/media_1791537655401.png';

async function generateOgImages() {
  if (!fs.existsSync(src)) {
    console.error('Source image not found:', src);
    return;
  }

  // Ensure public/themes/agni-putri directory exists
  fs.mkdirSync('public/themes/agni-putri', { recursive: true });

  const meta = await sharp(src).metadata();
  console.log('Source image loaded:', meta.width, 'x', meta.height);

  // 1. Raw photo converted to optimized JPEG (for fast mobile loading, < 70KB)
  await sharp(src)
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile('public/themes/agni-putri/og-agni-raw.jpg');
  fs.copyFileSync('public/themes/agni-putri/og-agni-raw.jpg', 'public/og-agni-raw.jpg');
  console.log('1. Raw JPEG created');

  // 2. Square 800x800 Open Graph image (perfect for WhatsApp Web square previews)
  // Photo centered with soft blurred ambient backdrop of the same photo
  const bgSquare = await sharp(src)
    .resize(800, 800, { fit: 'cover', position: 'center' })
    .blur(30)
    .modulate({ brightness: 0.65, saturation: 1.1 })
    .toBuffer();

  const photoSquare = await sharp(src)
    .resize(null, 740, { fit: 'inside' })
    .toBuffer();

  await sharp(bgSquare)
    .composite([{ input: photoSquare, gravity: 'center' }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile('public/themes/agni-putri/og-agni-square.jpg');
  fs.copyFileSync('public/themes/agni-putri/og-agni-square.jpg', 'public/og-agni-square.jpg');
  console.log('2. Square 800x800 image created');

  // 3. WhatsApp 1200x630 Large Card Preview
  // Background: Rich ambient blurred forest tone from photo
  // Center-right or Center: The couple photo framed
  // The center is kept focused on the couple so when WhatsApp Web crops to 1:1, the couple is right in the middle!
  const bgCard = await sharp(src)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .blur(35)
    .modulate({ brightness: 0.5, saturation: 1.15 })
    .toBuffer();

  const couplePhotoForCard = await sharp(src)
    .resize(null, 570, { fit: 'inside' })
    .toBuffer();

  const cMeta = await sharp(couplePhotoForCard).metadata();

  // Subtle gold border SVG
  const borderSvg = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e6c670" />
          <stop offset="50%" stop-color="#fff2b2" />
          <stop offset="100%" stop-color="#b88628" />
        </linearGradient>
      </defs>
      <!-- Frame around image -->
      <rect x="${Math.round(600 - cMeta.width / 2) - 6}" y="${Math.round(315 - cMeta.height / 2) - 6}" 
            width="${cMeta.width + 12}" height="${cMeta.height + 12}" 
            rx="16" fill="none" stroke="url(#gold)" stroke-width="2" opacity="0.85" />
      
      <!-- Outer elegant margin border -->
      <rect x="25" y="25" width="1150" height="580" rx="16" fill="none" stroke="url(#gold)" stroke-width="1" opacity="0.4" />
    </svg>
  `);

  // Rounded corners on couple photo
  const roundedCouple = await sharp(couplePhotoForCard)
    .composite([{
      input: Buffer.from(`<svg><rect x="0" y="0" width="${cMeta.width}" height="${cMeta.height}" rx="12" fill="#fff"/></svg>`),
      blend: 'dest-in'
    }])
    .toBuffer();

  const xPos = Math.round(600 - cMeta.width / 2);
  const yPos = Math.round(315 - cMeta.height / 2);

  await sharp(bgCard)
    .composite([
      { input: borderSvg, top: 0, left: 0 },
      { input: roundedCouple, top: yPos, left: xPos }
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile('public/themes/agni-putri/og-agni-card.jpg');
  fs.copyFileSync('public/themes/agni-putri/og-agni-card.jpg', 'public/og-agni-card.jpg');
  console.log('3. Large Card 1200x630 created');

  // Also make standard og-preview.jpg and og-agni-kahuripan.jpg (defaulting to the centered luxury card)
  fs.copyFileSync('public/themes/agni-putri/og-agni-card.jpg', 'public/themes/agni-putri/og-agni-kahuripan.jpg');
  fs.copyFileSync('public/themes/agni-putri/og-agni-card.jpg', 'public/og-agni-kahuripan.jpg');
  fs.copyFileSync('public/themes/agni-putri/og-agni-card.jpg', 'public/og-preview.jpg');

  // Also copy as couple-fern.jpg so the website gallery/theme can use it as well
  fs.copyFileSync('public/themes/agni-putri/og-agni-raw.jpg', 'public/themes/agni-putri/couple-fern.jpg');

  console.log('Finished generating all OG images!');
}

generateOgImages().catch(err => {
  console.error('Error generating OG images:', err);
  process.exit(1);
});
