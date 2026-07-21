import { readDb, writeDb } from './db.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const db = await readDb();
      return res.status(200).json(db.gallery || []);
    } catch (error) {
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
