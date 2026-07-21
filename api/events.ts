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
      return res.status(200).json(db.events || []);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to read events' });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const db = await readDb();
      
      const newEvent = {
        id: `ev-${Date.now()}`,
        type: body.type || 'image',
        category: body.category || 'Spiritual Seva',
        title: body.title || 'Dhara Event',
        image: body.image || '',
        description: body.description || '',
        youtubeId: body.youtubeId || undefined,
        duration: body.duration || undefined
      };

      db.events.unshift(newEvent);
      
      db.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        type: 'system',
        message: `Admin added new event/activity: "${newEvent.title}"`,
        user: body.user || 'Super Admin'
      });

      await writeDb(db);

      return res.status(200).json({ success: true, event: newEvent, events: db.events });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to add event' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const db = await readDb();
      
      const index = db.events.findIndex((ev: any) => ev.id === body.id);
      if (index === -1) {
        return res.status(404).json({ error: 'Event not found' });
      }

      db.events[index] = {
        ...db.events[index],
        ...body
      };

      db.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        type: 'system',
        message: `Admin updated event: "${db.events[index].title}"`,
        user: body.user || 'Super Admin'
      });

      await writeDb(db);

      return res.status(200).json({ success: true, event: db.events[index], events: db.events });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update event' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { id, user } = body;
      const db = await readDb();
      
      const eventIndex = db.events.findIndex((ev: any) => ev.id === id);
      if (eventIndex !== -1) {
        const ev = db.events[eventIndex];
        db.events.splice(eventIndex, 1);
        
        db.activityLogs.unshift({
          id: `log-${Date.now()}`,
          timestamp: 'Just now',
          type: 'system',
          message: `Admin deleted event: "${ev.title}"`,
          user: user || 'Super Admin'
        });

        await writeDb(db);
        return res.status(200).json({ success: true, events: db.events });
      }
      
      return res.status(404).json({ error: 'Event not found' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete event' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
