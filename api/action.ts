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
    const { action, payload } = body;
    const db = await readDb();
    const timestamp = new Date().toISOString();

    let success = true;
    let message = '';
    let resultPayload: any = null;

    const logActivity = (type: any, msg: string, user: string) => {
      db.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        type,
        message: msg,
        user
      });
    };

    switch (action) {
      case 'updateNominationStatus': {
        const { id, status, jury } = payload;
        const nom = db.nominations.find((n: any) => n.id === id);
        if (nom) {
          nom.vetting_status = status;
          nom.assigned_jury = jury || 'Super Admin';
          logActivity('nomination', `Updated "${nom.nominee_name}" vetting status to ${status.toUpperCase()}`, jury || 'Super Admin');
          message = `Status updated for ${nom.nominee_name}`;
        } else {
          success = false;
          message = 'Nomination not found';
        }
        break;
      }

      case 'deleteNomination': {
        const { id, user } = payload;
        const nomIndex = db.nominations.findIndex((n: any) => n.id === id);
        if (nomIndex !== -1) {
          const nom = db.nominations[nomIndex];
          db.nominations.splice(nomIndex, 1);
          logActivity('nomination', `Archived nomination submission for "${nom.nominee_name}"`, user || 'Super Admin');
          message = `Nomination for ${nom.nominee_name} archived`;
        } else {
          success = false;
          message = 'Nomination not found';
        }
        break;
      }

      case 'checkInDelegate': {
        const { query, user } = payload;
        const cleanQuery = query.trim().toLowerCase();
        const found = db.delegates.find((d: any) => 
          d.pass_code.toLowerCase() === cleanQuery || 
          d.phone.replace(/\s+/g, '').includes(cleanQuery) ||
          d.delegate_name.toLowerCase().includes(cleanQuery)
        );

        if (!found) {
          success = false;
          message = `No pass or delegate found matching "${query}"`;
        } else if (found.checked_in) {
          success = false;
          message = `Pass ${found.pass_code} (${found.delegate_name}) was ALREADY checked in at ${new Date(found.checkin_time || '').toLocaleTimeString()}`;
          resultPayload = { delegate: found };
        } else {
          found.checked_in = true;
          found.checkin_time = timestamp;
          logActivity('checkin', `Gate check-in success for pass ${found.pass_code} (${found.delegate_name})`, user || 'Gate Scanner');
          message = `Verified! Checked in ${found.delegate_name} (${found.pass_tier.toUpperCase()} Pass - ${found.ticket_count} Seats)`;
          resultPayload = { delegate: found };
        }
        break;
      }

      case 'sendDonationReceipt': {
        const { id, user } = payload;
        const don = db.donations.find((d: any) => d.id === id);
        if (don) {
          don.receipt_sent = true;
          logActivity('donation', `Generated & emailed 80G Seva Patr PDF Receipt to ${don.name} (${don.email})`, user || 'Auditor');
          message = `Receipt generated and sent to ${don.name}`;
        } else {
          success = false;
          message = 'Donation not found';
        }
        break;
      }

      case 'updateVolunteerStatus': {
        const { id, status, user } = payload;
        const vol = db.volunteers.find((v: any) => v.id === id);
        if (vol) {
          vol.status = status;
          logActivity('volunteer', `Updated volunteer ${vol.name} status to ${status}`, user || 'Moderator');
          message = `Volunteer ${vol.name} marked as ${status}`;
        } else {
          success = false;
          message = 'Volunteer not found';
        }
        break;
      }

      case 'updateEnquiryStatus': {
        const { id, status, user } = payload;
        const enq = db.enquiries.find((e: any) => e.id === id);
        if (enq) {
          enq.status = status;
          logActivity('system', `Marked enquiry from ${enq.sender_name} as ${status.replace('_', ' ')}`, user || 'Moderator');
          message = `Enquiry marked as ${status}`;
        } else {
          success = false;
          message = 'Enquiry not found';
        }
        break;
      }

      case 'logActivity': {
        const { type, message: logMsg, user } = payload;
        logActivity(type, logMsg, user || 'System');
        message = 'Activity logged';
        break;
      }

      case 'deleteActivityLog': {
        const { id } = payload;
        const logIndex = db.activityLogs.findIndex((l: any) => l.id === id);
        if (logIndex !== -1) {
          db.activityLogs.splice(logIndex, 1);
          message = 'Activity log deleted';
        } else {
          success = false;
          message = 'Log not found';
        }
        break;
      }

      default: {
        success = false;
        message = 'Invalid action';
      }
    }

    if (success) {
      await writeDb(db);
    }

    return res.status(200).json({ success, message, result: resultPayload, db });
  } catch (error) {
    console.error('Admin Action error:', error);
    return res.status(500).json({ success: false, error: 'Failed to process admin action' });
  }
}
