import { NextResponse } from 'next/server';
import { readDb, writeDb } from '../db';

export async function GET() {
  try {
    const db = await readDb();
    let config = db.siteConfig && db.siteConfig.length > 0 
      ? db.siteConfig[0] 
      : { id: 'global-config', heroVideoUrl: '', heroVideoPoster: '' };

    return NextResponse.json(config, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read site config' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const db = await readDb();
    
    if (!db.siteConfig) {
      db.siteConfig = [];
    }

    const index = db.siteConfig.findIndex(c => c.id === 'global-config');
    const existing = index !== -1 ? db.siteConfig[index] : {};

    const newConfig = {
      ...existing,
      id: 'global-config',
      // Legacy compatibility
      heroVideoUrl: body.heroVideoUrl ?? existing.heroVideoUrl ?? '',
      heroVideoPoster: body.heroVideoPoster ?? existing.heroVideoPoster ?? '',
      heroImageUrl: body.heroImageUrl ?? existing.heroImageUrl ?? '',
      heroMediaOrder: body.heroMediaOrder ?? existing.heroMediaOrder ?? 'video-first',
      eventYear: body.eventYear ?? existing.eventYear ?? '2026',
      registrationTickets: body.registrationTickets ?? existing.registrationTickets ?? [],
      homeStats: body.homeStats ?? existing.homeStats ?? [],
      aboutStats: body.aboutStats ?? existing.aboutStats ?? [],
      homeCredentials: body.homeCredentials ?? existing.homeCredentials ?? [],
      founders: body.founders ?? existing.founders ?? [],

      // Extended Dynamic Content Configuration
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

    return NextResponse.json({ success: true, config: db.siteConfig[index === -1 ? 0 : index] }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update site config' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}
