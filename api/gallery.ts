import { readDb, writeDb } from './_db.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Run self-healing migration check dynamically
      let db = await readDb();
      if (!db.gallery || db.gallery.length <= 50) {
        const fs = await import('fs');
        const path = await import('path');
        const { fileURLToPath } = await import('url');
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const galleryPagePath = path.join(__dirname, '..', 'src', 'components', 'GalleryPage.jsx');
        if (fs.existsSync(galleryPagePath)) {
          const content = fs.readFileSync(galleryPagePath, 'utf8');
          const startIdx = content.indexOf('const defaultGalleryImages = [');
          if (startIdx !== -1) {
            const sectionStartIdx = content.indexOf('{', startIdx + 30);
            const endIdx = content.indexOf('];', sectionStartIdx);
            if (sectionStartIdx !== -1 && endIdx !== -1) {
              const sectionImagesText = content.substring(sectionStartIdx, endIdx).trim();
              const sectionImages = eval('[' + sectionImagesText + ']');
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
              const newImages = galleryDbList.filter(img => !existingSrcs.has(img.src));
              if (newImages.length > 0) {
                db.gallery = [...(db.gallery || []), ...newImages];
                await writeDb(db);
              }
            }
          }
        }
      }
      
      // Clean up moment captions with numbers in the return list
      const finalGallery = (db.gallery || []).map((img: any) => {
        if (img.category === 'Highlights' && /Moments\s+\d+/.test(img.caption)) {
          return { ...img, caption: 'Dhara Divine Awards - Moments' };
        }
        return img;
      });

      return res.status(200).json(finalGallery);
    } catch (error) {
      console.error('Failed to read gallery in API:', error);
      return res.status(500).json({ error: 'Failed to read gallery' });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const db = await readDb();
      
      const newImage = {
        id: `gal-${Date.now()}`,
        src: body.src,
        category: body.category || 'Award Ceremony',
        caption: body.caption || 'Dhara Divine Awards image',
        priority: body.priority || 0,
        featured: body.featured || false
      };

      db.gallery.unshift(newImage);
      
      db.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        type: 'system',
        message: `Admin added new gallery image: "${newImage.caption}"`,
        user: body.user || 'Super Admin'
      });

      await writeDb(db);

      return res.status(200).json({ success: true, image: newImage, gallery: db.gallery });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to add image to gallery' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const db = await readDb();
      
      const index = db.gallery.findIndex((img: any) => img.id === body.id);
      if (index === -1) {
        return res.status(404).json({ error: 'Image not found' });
      }

      db.gallery[index] = {
        ...db.gallery[index],
        ...body
      };

      db.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        type: 'system',
        message: `Admin updated gallery image: "${db.gallery[index].caption}"`,
        user: body.user || 'Super Admin'
      });

      await writeDb(db);

      return res.status(200).json({ success: true, image: db.gallery[index], gallery: db.gallery });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update image in gallery' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { id, user } = body;
      const db = await readDb();
      
      const imageIndex = db.gallery.findIndex((img: any) => img.id === id);
      if (imageIndex !== -1) {
        const img = db.gallery[imageIndex];
        db.gallery.splice(imageIndex, 1);
        
        db.activityLogs.unshift({
          id: `log-${Date.now()}`,
          timestamp: 'Just now',
          type: 'system',
          message: `Admin deleted gallery image: "${img.caption}"`,
          user: user || 'Super Admin'
        });

        await writeDb(db);
        return res.status(200).json({ success: true, gallery: db.gallery });
      }
      
      return res.status(404).json({ error: 'Image not found' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete gallery image' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
