import { readDb, writeDb } from './_db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateGalleryIfNeeded() {
  try {
    const db = await readDb();
    // If we already have more than 50 gallery images, skip migration
    if (db.gallery && db.gallery.length > 50) {
      return db;
    }

    console.log('Dynamic server-side gallery migration started...');
    const galleryPagePath = path.join(__dirname, '..', 'src', 'components', 'GalleryPage.jsx');
    if (!fs.existsSync(galleryPagePath)) {
      console.log('GalleryPage.jsx not found at', galleryPagePath);
      return db;
    }

    const content = fs.readFileSync(galleryPagePath, 'utf8');

    // Find defaultGalleryImages starting point
    const startIdx = content.indexOf('const defaultGalleryImages = [');
    if (startIdx === -1) {
      console.log('defaultGalleryImages array not found in GalleryPage.jsx');
      return db;
    }

    // Find the first object '{' after highlightImages mapping
    const sectionStartIdx = content.indexOf('{', startIdx + 30);
    const endIdx = content.indexOf('];', sectionStartIdx);
    if (sectionStartIdx === -1 || endIdx === -1) {
      console.log('Section images boundary not found in GalleryPage.jsx');
      return db;
    }

    const sectionImagesText = content.substring(sectionStartIdx, endIdx).trim();

    // Evaluate the section images text
    const sectionImages = eval('[' + sectionImagesText + ']');

    // Generate highlights
    const highlightImages = [
      ...Array.from({ length: 46 }, (_, i) => `/images/Highlights1/Dhara Divine Awards - Highlight  (${i + 1}).png`),
      ...[
        ...Array.from({ length: 53 }, (_, i) => i + 1),
        55, 56, 57, 58, 59,
        67, 68, 69, 70, 71, 72, 73, 74,
        76, 77, 78, 79, 80, 81, 82,
        ...Array.from({ length: 44 }, (_, i) => i + 84)
      ].map(num => `/images/Highlights1/Dhara Divine Awards - Highlight (${num}).png`),
      ...Array.from({ length: 15 }, (_, i) => `/images/Highlights1/E Dhara Divine Awards - Highlight  (${i + 43}).png`)
    ];

    const highlights = highlightImages.map((src, idx) => ({
      src,
      category: 'Highlights',
      caption: 'Dhara Divine Awards - Moments',
      isHighlight: true
    }));

    const allDefaultImages = [...highlights, ...sectionImages];

    // Create unified database objects
    const galleryDbList = allDefaultImages.map((img, idx) => {
      let idPrefix = img.category === 'Highlights' ? 'gal-high-' : 'gal-sec-';
      return {
        id: idPrefix + idx + '-' + Math.floor(Math.random() * 100000),
        src: img.src,
        category: img.category,
        caption: img.caption.replace(/Moments\s+\d+/, 'Moments').trim(),
        priority: idx,
        featured: img.category === 'Highlights' && idx < 9
      };
    });

    const existingSrcs = new Set((db.gallery || []).map((img: any) => img.src));
    
    // Clean up trailing numbers in existing gallery captions if they are moments
    let captionCleaned = false;
    for (const img of db.gallery || []) {
      if (img.category === 'Highlights' && /Moments\s+\d+/.test(img.caption)) {
        img.caption = 'Dhara Divine Awards - Moments';
        captionCleaned = true;
      }
    }

    const newImages = galleryDbList.filter(img => !existingSrcs.has(img.src));

    if (newImages.length > 0 || captionCleaned) {
      db.gallery = [...(db.gallery || []), ...newImages];
      await writeDb(db);
      console.log(`Successfully migrated ${newImages.length} images to the database dynamically.`);
    }
    return db;
  } catch (err) {
    console.error('Gallery migration error:', err);
    return await readDb();
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const db = await migrateGalleryIfNeeded();
      return res.status(200).json(db);
    } catch (error) {
      console.error('Failed to read db:', error);
      return res.status(500).json({ error: 'Failed to read database' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}


