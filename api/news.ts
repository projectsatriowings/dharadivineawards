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
      return res.status(200).json(db.news || []);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to read news' });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const db = await readDb();

      if (!db.news) db.news = [];
      
      const newItem = {
        id: `news-${Date.now()}`,
        title: body.title || 'Untitled News',
        date: body.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        image: body.image || '/images/News/DHARA Divine Awards Ceremony.jpg',
        link: body.link || '',
        summary: body.summary || ''
      };

      db.news.unshift(newItem);
      
      db.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        type: 'system',
        message: `Admin added news article: "${newItem.title}"`,
        user: body.user || 'Super Admin'
      });

      await writeDb(db);

      return res.status(200).json({ success: true, item: newItem, news: db.news });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create news item' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const db = await readDb();

      if (!db.news) db.news = [];
      
      const index = db.news.findIndex((n: any) => n.id === body.id);
      if (index === -1) {
        return res.status(404).json({ error: 'News article not found' });
      }

      db.news[index] = {
        ...db.news[index],
        ...body
      };

      db.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        type: 'system',
        message: `Admin updated news article: "${db.news[index].title}"`,
        user: body.user || 'Super Admin'
      });

      await writeDb(db);

      return res.status(200).json({ success: true, item: db.news[index], news: db.news });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update news item' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { id, user } = body;
      const db = await readDb();

      if (!db.news) db.news = [];

      const item = db.news.find((n: any) => n.id === id);
      db.news = db.news.filter((n: any) => n.id !== id);

      db.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        type: 'system',
        message: `Admin deleted news article: "${item?.title || id}"`,
        user: user || 'Super Admin'
      });

      await writeDb(db);

      return res.status(200).json({ success: true, news: db.news });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete news item' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
