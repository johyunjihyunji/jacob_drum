// Run with: node scripts/generate-photo-manifest.js
// Called automatically via npm prestart / prebuild
const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, '..', 'public', 'photos');
const outFile = path.join(photosDir, 'manifest.json');

if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir, { recursive: true });
}

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
const EXCLUDE = ['4.jpeg'];
const files = fs.existsSync(photosDir)
  ? fs.readdirSync(photosDir).filter(f => IMAGE_EXTS.includes(path.extname(f).toLowerCase()) && !EXCLUDE.includes(f))
  : [];

fs.writeFileSync(outFile, JSON.stringify(files, null, 2));
console.log(`Photo manifest: ${files.length} image(s) → ${outFile}`);
