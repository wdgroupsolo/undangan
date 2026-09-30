const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const path = require('path');

const publicDir = path.resolve(__dirname, '../public');

// 1. Rendy & Maya (Javanese Heritage - Solo):
// Authentic real Javanese couple portrait (blangkon, kebaya, warm wedding bokeh)
const rendyMayaCmd = `"${ffmpeg}" -y -i "${path.join(publicDir, 'themes/habib-adiba-closing.jpg')}" -vf "crop=w=720:h=720:x=240:y=240,scale=400:400" "${path.join(publicDir, 'photos/avatar-rendy-maya.jpg')}"`;

// 2. Dimas & Nadia (Split Floral - Yogyakarta):
// Intimate real couple portrait (bride resting head on groom's shoulder, smiling warmly)
const dimasNadiaCmd = `"${ffmpeg}" -y -i "${path.join(publicDir, 'photos/photo-7.jpg')}" -vf "crop=w=640:h=640:x=210:y=300,scale=400:400" "${path.join(publicDir, 'photos/avatar-dimas-nadia.jpg')}"`;

// 3. Faris & Aisyah (Maroon Gold - Semarang):
// Joyful real couple walking hand in hand, laughing happily together in traditional attire
const farisAisyahCmd = `"${ffmpeg}" -y -i "${path.join(publicDir, 'photos/photo-3.jpg')}" -vf "crop=w=440:h=440:x=260:y=470,scale=400:400" "${path.join(publicDir, 'photos/avatar-faris-aisyah.jpg')}"`;

execSync(rendyMayaCmd, { stdio: 'inherit' });
execSync(dimasNadiaCmd, { stdio: 'inherit' });
execSync(farisAisyahCmd, { stdio: 'inherit' });

console.log('All 3 authentic couple avatars successfully created at 400x400 HD!');
