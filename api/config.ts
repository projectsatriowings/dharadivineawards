import { readDb, writeDb } from './_db.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const db = await readDb();
      let config = db.siteConfig && db.siteConfig.length > 0 
        ? db.siteConfig[0] 
        : { id: 'global-config', heroVideoUrl: '', heroVideoPoster: '' };

      return res.status(200).json(config);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to read site config' });
    }
  }

  if (req.method === 'PUT' || req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const db = await readDb();
      
      if (!db.siteConfig) {
        db.siteConfig = [];
      }

      const index = db.siteConfig.findIndex((c: any) => c.id === 'global-config');
      const existing = index !== -1 ? db.siteConfig[index] : {};

      const newConfig = {
        ...existing,
        id: 'global-config',
        heroVideoUrl: body.heroVideoUrl ?? existing.heroVideoUrl ?? '',
        heroVideoPoster: body.heroVideoPoster ?? existing.heroVideoPoster ?? '',
        heroImageUrl: body.heroImageUrl ?? existing.heroImageUrl ?? '',
        heroMediaOrder: body.heroMediaOrder ?? existing.heroMediaOrder ?? 'video-first',
        eventYear: body.eventYear ?? existing.eventYear ?? '2026',
        registrationTickets: body.registrationTickets ?? existing.registrationTickets ?? [],
        eventStats: body.eventStats ?? existing.eventStats ?? [],
        homeStats: body.homeStats ?? existing.homeStats ?? [],
        aboutStats: body.aboutStats ?? existing.aboutStats ?? [],
        homeCredentials: body.homeCredentials ?? existing.homeCredentials ?? [],
        founders: body.founders ?? existing.founders ?? [],
        heroSection: body.heroSection ?? existing.heroSection ?? null,
        aboutSection: body.aboutSection ?? existing.aboutSection ?? null,
        visionMissionSection: body.visionMissionSection ?? existing.visionMissionSection ?? null,
        founderMessage: body.founderMessage ?? existing.founderMessage ?? null,
        donorConfig: body.donorConfig ?? existing.donorConfig ?? null,
        eventRegConfig: body.eventRegConfig ?? existing.eventRegConfig ?? null,
        sponsorshipConfig: body.sponsorshipConfig ?? existing.sponsorshipConfig ?? null,
        volunteerConfig: body.volunteerConfig ?? existing.volunteerConfig ?? null,
        csrConfig: body.csrConfig ?? existing.csrConfig ?? null,
        awardConfig: body.awardConfig ?? existing.awardConfig ?? null,
        generalEnquiriesConfig: body.generalEnquiriesConfig ?? existing.generalEnquiriesConfig ?? null,
        razorpayConfig: body.razorpayConfig ?? existing.razorpayConfig ?? null,
      };

      if (index === -1) {
        db.siteConfig.push(newConfig);
      } else {
        db.siteConfig[index] = newConfig;
      }

      db.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        type: 'system',
        message: `Admin updated site content and subdomain configurations`,
        user: body.user || 'Super Admin'
      });

      await writeDb(db);

      return res.status(200).json({ success: true, config: db.siteConfig[index === -1 ? 0 : index] });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update site config' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
