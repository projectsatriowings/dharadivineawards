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
    const newConfig = {
      id: 'global-config',
      heroVideoUrl: body.heroVideoUrl || '',
      heroVideoPoster: body.heroVideoPoster || '',
      eventYear: body.eventYear || '2026',
      registrationTickets: body.registrationTickets || [],
      homeStats: body.homeStats || [],
      homeCredentials: body.homeCredentials || []
    };

    if (index === -1) {
      db.siteConfig.push(newConfig);
    } else {
      db.siteConfig[index] = { ...db.siteConfig[index], ...newConfig };
    }

    db.activityLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      type: 'system',
      message: `Admin updated global site configuration`,
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
