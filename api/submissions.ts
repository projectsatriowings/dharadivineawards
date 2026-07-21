import { readDb, writeDb } from './db';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const db = await readDb();
    const timestamp = new Date().toISOString();

    let newEntry: any = null;
    let activityMessage = '';
    let activityType: 'nomination' | 'donation' | 'checkin' | 'volunteer' | 'system' = 'system';

    const { module } = body;

    if (module === 'Event Registration') {
      const passCode = `DDA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      newEntry = {
        id: `del-${Date.now()}`,
        delegate_name: body.name || 'Anonymous',
        email: body.email || '',
        phone: body.phone || '',
        pass_tier: (body.ticketType || 'delegate').toLowerCase().replace('pass', '').trim(),
        ticket_count: 1,
        pass_code: passCode,
        checked_in: false,
        checkin_time: null,
        seat_zone: 'Zone B - Seva Row 10'
      };
      db.delegates.push(newEntry);
      activityType = 'checkin';
      activityMessage = `New Delegate pass registered for "${newEntry.delegate_name}" (Pass: ${passCode})`;
    } 
    else if (module === 'Award Nominations') {
      newEntry = {
        id: `nom-${Date.now()}`,
        nominee_name: body.nomineeName || 'Unknown Nominee',
        nominee_phone: body.nomineePhone || '',
        category: body.categoryTitle || 'Arts & Culture',
        bio_summary: body.sevaSummary || '',
        supporting_links: body.supportingLinks ? body.supportingLinks.split(',').map((s: string) => s.trim()) : [],
        nominator_name: body.nominatorName || 'Anonymous',
        nominator_phone: body.nominatorPhone || '',
        vetting_status: 'pending',
        created_at: timestamp,
        avatar_url: body.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        nominee_work_image: body.nomineeWorkImage || ''
      };
      db.nominations.push(newEntry);
      activityType = 'nomination';
      activityMessage = `Nomination submitted for "${newEntry.nominee_name}" in ${newEntry.category} by ${newEntry.nominator_name}`;
    } 
    else if (module === 'Volunteer Registration') {
      newEntry = {
        id: `vol-${Date.now()}`,
        name: body.fullName || 'Anonymous',
        email: body.email || '',
        phone: body.phone || '',
        age: body.dob ? new Date().getFullYear() - new Date(body.dob).getFullYear() : 25,
        skills: body.preferredRoleText ? [body.preferredRoleText] : ['Logistics'],
        availability: body.availability || 'Full Event',
        status: 'active',
        assigned_zone: 'General Support'
      };
      db.volunteers.push(newEntry);
      activityType = 'volunteer';
      activityMessage = `New volunteer "${newEntry.name}" registered for ${newEntry.skills.join(', ')}`;
    } 
    else if (module === 'General Enquiries') {
      newEntry = {
        id: `enq-${Date.now()}`,
        sender_name: body.senderName || 'Anonymous',
        email: body.email || '',
        phone: body.phone || '',
        subject: body.subject || 'General Inquiry',
        message: body.message || '',
        type: body.type || 'general',
        status: 'new',
        created_at: timestamp,
        organization: body.organization || ''
      };
      db.enquiries.push(newEntry);
      activityType = 'system';
      activityMessage = `New enquiry received from "${newEntry.sender_name}": "${newEntry.subject}"`;
    } 
    else if (['Donor Support', 'Sponsorship', 'Corporate CSR'].includes(module)) {
      newEntry = {
        id: `don-${Date.now()}`,
        type: body.sponsorshipTier ? 'corporate' : 'individual',
        name: body.name || 'Anonymous Donor',
        email: body.email || '',
        phone: body.phone || '',
        amount: Number(body.amount || 0),
        seva_domain: body.sevaDomain || 'General Fund',
        pan: body.pan || '',
        is_anonymous: Boolean(body.isAnonymous),
        sponsorship_tier: body.sponsorshipTier || undefined,
        receipt_sent: false,
        payment_status: 'success',
        created_at: timestamp
      };
      db.donations.push(newEntry);
      activityType = 'donation';
      activityMessage = `Donation of ₹${newEntry.amount.toLocaleString()} received from ${newEntry.is_anonymous ? 'Anonymous' : newEntry.name} (${newEntry.seva_domain})`;
    } 
    else {
      newEntry = { id: `raw-${Date.now()}`, ...body, timestamp };
      activityType = 'system';
      activityMessage = `Unknown form module submission received`;
    }

    db.activityLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      type: activityType,
      message: activityMessage,
      user: 'System Callback'
    });

    await writeDb(db);

    return res.status(200).json({ success: true, entry: newEntry });
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({ success: false, error: 'Failed to process submission' });
  }
}
