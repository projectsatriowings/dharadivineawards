import nodemailer from 'nodemailer';

// Read SMTP configurations
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || '"Dhara Foundations" <no-reply@dharafoundations.in>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@dharafoundations.in';

// Initialize transporter lazily
let transporter: any = null;

function getTransporter() {
  if (transporter) return transporter;

  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("SMTP credentials missing. Email dispatches will run in mock simulation mode.");
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
}

/**
 * Sends an email using Nodemailer. Falls back to console log simulation if credentials are empty.
 */
export async function sendMail(to: string, subject: string, html: string): Promise<boolean> {
  const client = getTransporter();

  if (!client) {
    console.log(`[Email Simulation]
To: ${to}
Subject: ${subject}
Content: (HTML truncated)
--------------------------------`);
    return true;
  }

  try {
    await client.sendMail({
      from: SMTP_FROM,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Email dispatch failed:", error);
    return false;
  }
}

/**
 * Common HTML wrapper for brand consistency (deep forest green header, saffron glow accents, warm cream details).
 */
function getEmailLayout(title: string, bodyContent: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body { font-family: 'Georgia', 'Times New Roman', serif; background-color: #F8F4EC; color: #2C2C2C; margin: 0; padding: 20px; }
        .wrapper { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1.5px solid #E6DBC6; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background-color: #0A3A2A; padding: 32px 20px; text-align: center; border-bottom: 3px solid #F3A712; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: normal; letter-spacing: 0.5px; }
        .content { padding: 36px 28px; line-height: 1.6; font-size: 14.5px; }
        .footer { background-color: #F0EAD8; padding: 24px; text-align: center; border-top: 1px solid #E6DBC6; font-size: 12px; color: #6D6D6D; }
        .btn { display: inline-block; padding: 12px 24px; background-color: #F3A712; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px; text-align: center; }
        .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #FBF9F4; border-radius: 8px; overflow: hidden; }
        .info-table td { padding: 12px 16px; border: 1px solid #EFEAE0; font-size: 13.5px; }
        .info-table td.label { font-weight: bold; color: #401C0C; width: 35%; }
        .quote { border-left: 3.5px solid #F3A712; padding-left: 16px; font-style: italic; color: #555555; margin: 20px 0; }
        .saffron { color: #D9762E; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>Dhara Foundations</h1>
        </div>
        <div class="content">
          ${bodyContent}
        </div>
        <div class="footer">
          <p>© 2026 Dhara Foundations. All rights reserved.</p>
          <p># 44A, 3rd Street, Judge Colony, Tambaram Sanatorium, Chennai – 600047</p>
          <p>Email: info@dharafoundations.in | Helpline: 044-22236641</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Template: Event Registration Confirmation
 */
export function getRegistrationTemplate(name: string, passTier: string, count: number, passCode: string): string {
  const body = `
    <p>Namaste <b>${name}</b>,</p>
    <p>We are delighted to confirm your registration for the upcoming <b>Dhara Divine Awards 2025</b>.</p>
    <p>Your entry pass has been generated. Please keep this email safe and present the pass code at the registration desk for seamless gate entry.</p>
    
    <table class="info-table">
      <tr>
        <td class="label">Attendee Name</td>
        <td>${name}</td>
      </tr>
      <tr>
        <td class="label">Pass Category</td>
        <td><span class="saffron">${passTier.toUpperCase()} PASS</span></td>
      </tr>
      <tr>
        <td class="label">Seats Reserved</td>
        <td>${count} Seat(s)</td>
      </tr>
      <tr>
        <td class="label">Unique Pass Code</td>
        <td style="font-family: monospace; font-size: 16px; font-weight: bold; letter-spacing: 0.5px; color: #0A3A2A;">${passCode}</td>
      </tr>
      <tr>
        <td class="label">Venue</td>
        <td>Chinmaya Heritage Centre, Chetpet, Chennai</td>
      </tr>
      <tr>
        <td class="label">Date &amp; Time</td>
        <td>January 24, 2026 (Saturday) - 4:00 PM onwards</td>
      </tr>
    </table>
    
    <p>We look forward to welcoming you to this grand celebration of spirituality, tradition, and service.</p>
    <p>Warm regards,<br/><b>Dhara Foundations Events Desk</b></p>
  `;
  return getEmailLayout("Event Pass Confirmation - Dhara Divine Awards", body);
}

/**
 * Template: Award Nominations Confirmation
 */
export function getNominationTemplate(nominatorName: string, nomineeName: string, category: string, bio: string): string {
  const body = `
    <p>Namaste <b>${nominatorName}</b>,</p>
    <p>Thank you for submitting a nomination for the <b>Dhara Divine Awards 2025</b>.</p>
    <p>We acknowledge your nomination of <span class="saffron"><b>${nomineeName}</b></span> for his/her selfless grassroots services. Our vetting committee and jury panel will carefully review the profile details and supporting milestones.</p>
    
    <table class="info-table">
      <tr>
        <td class="label">Nominee Name</td>
        <td><b>${nomineeName}</b></td>
      </tr>
      <tr>
        <td class="label">Award Category</td>
        <td>${category}</td>
      </tr>
      <tr>
        <td class="label">Nominator Name</td>
        <td>${nominatorName}</td>
      </tr>
    </table>
    
    <p><b>Service Summary &amp; Bio provided:</b></p>
    <div class="quote">"${bio}"</div>
    
    <p>We will contact you or the nominee if any additional documentation, certificates, or references are required during the vetting process.</p>
    <p>Warm regards,<br/><b>Dhara Divine Awards Jury Council</b></p>
  `;
  return getEmailLayout("Nomination Acknowledged - Dhara Divine Awards", body);
}

/**
 * Template: Volunteer Registration Confirmation
 */
export function getVolunteerTemplate(name: string, skills: string[], availability: string): string {
  const body = `
    <p>Namaste <b>${name}</b>,</p>
    <p>Thank you for registering as a volunteer (Seva Member) for the <b>Dhara Divine Awards 2025</b>.</p>
    <p>Your willingness to contribute your time, skills, and energy to support our sacred work is highly appreciated. Our volunteer coordination desk is reviewing all profiles to allocate responsibilities based on skills and convenience.</p>
    
    <table class="info-table">
      <tr>
        <td class="label">Volunteer Name</td>
        <td>${name}</td>
      </tr>
      <tr>
        <td class="label">Preferred Area</td>
        <td>${skills.join(', ')}</td>
      </tr>
      <tr>
        <td class="label">Availability</td>
        <td>${availability}</td>
      </tr>
    </table>
    
    <p>We will schedule an introductory briefing meeting shortly to walk through logistics, roles, and safety instructions.</p>
    <p>Warm regards,<br/><b>Dhara Volunteer Seva Desk</b></p>
  `;
  return getEmailLayout("Volunteer Registration Confirmed - Dhara Foundations", body);
}

/**
 * Template: Donations/CSR/Sponsorships Confirmation
 */
export function getDonationTemplate(name: string, amount: number, domain: string, tier?: string, pan?: string): string {
  const isCorporate = !!tier;
  const body = `
    <p>Namaste <b>${name}</b>,</p>
    <p>With utmost gratitude, we acknowledge the receipt of your generous contribution to support the noble initiatives of <b>Dhara Foundations</b>.</p>
    <p>Your contribution helps us feed the hungry, protect sacred heritage shrines, maintain GoShalas, and empower underprivileged communities.</p>
    
    <table class="info-table">
      <tr>
        <td class="label">Donor/Company Name</td>
        <td><b>${name}</b></td>
      </tr>
      <tr>
        <td class="label">Amount Received</td>
        <td><span class="saffron">₹${amount.toLocaleString('en-IN')}</span></td>
      </tr>
      <tr>
        <td class="label">Support Allocation</td>
        <td>${domain}</td>
      </tr>
      ${tier ? `<tr><td class="label">Sponsorship Level</td><td><b>${tier.toUpperCase()}</b></td></tr>` : ''}
      ${pan ? `<tr><td class="label">PAN Number</td><td style="font-family: monospace;">${pan}</td></tr>` : ''}
    </table>
    
    <p>Our audit and finance team will process your official <b>Form 10BD 80G Tax Exemption Certificate &amp; Receipt</b> and dispatch it to this email address within the standard timeline.</p>
    <p>“Service to Humanity is Service to the Divine.” Thank you for partnering with us.</p>
    <p>Warm regards,<br/><b>Dhara Foundations Finance Desk</b></p>
  `;
  return getEmailLayout("Donation Receipt & Acknowledgment - Dhara Foundations", body);
}

/**
 * Template: General Enquiry Confirmation
 */
export function getEnquiryTemplate(name: string, subject: string, message: string): string {
  const body = `
    <p>Namaste <b>${name}</b>,</p>
    <p>Thank you for contacting <b>Dhara Foundations</b>.</p>
    <p>This email confirms that we have received your general enquiry. Our coordination lead will review your message and reach out to you shortly.</p>
    
    <table class="info-table">
      <tr>
        <td class="label">Sender Name</td>
        <td>${name}</td>
      </tr>
      <tr>
        <td class="label">Subject</td>
        <td>${subject}</td>
      </tr>
    </table>
    
    <p><b>Your Message:</b></p>
    <div class="quote">"${message}"</div>
    
    <p>If you have urgent questions, please feel free to call our Helpline at 044-22236641.</p>
    <p>Warm regards,<br/><b>Dhara Help Desk Support</b></p>
  `;
  return getEmailLayout("We have received your enquiry - Dhara Foundations", body);
}

/**
 * Template: Admin Alert Notification
 */
export function getAdminAlertTemplate(module: string, payload: any): string {
  const details = Object.entries(payload)
    .filter(([key]) => !['module', 'timestamp'].includes(key))
    .map(([key, val]) => `
      <tr>
        <td class="label" style="text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1')}</td>
        <td>${typeof val === 'object' ? JSON.stringify(val) : String(val)}</td>
      </tr>
    `).join('');

  const body = `
    <p>Dear Admin,</p>
    <p>This is an automated alert to notify you of a new submission on the <b>Dhara Foundations</b> website.</p>
    
    <table class="info-table">
      <tr>
        <td class="label">Submission Module</td>
        <td><span class="saffron" style="font-weight: bold;">${module.toUpperCase()}</span></td>
      </tr>
      <tr>
        <td class="label">Timestamp</td>
        <td>${new Date().toLocaleString()}</td>
      </tr>
      ${details}
    </table>
    
    <p>Please log into the <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5173'}/admin" target="_blank">Dhara Admin Dashboard</a> to view submission status, assign jury members, or generate 80G tax receipt certificates.</p>
    <p>System notification email.</p>
  `;
  return getEmailLayout(`Alert: New ${module} Submission`, body);
}

/**
 * Dispatches both user confirmation and admin alert emails.
 */
export async function dispatchEmails(module: string, userEmail: string, userPayload: any) {
  let userHtml = '';
  let subject = '';

  switch (module) {
    case 'Event Registration':
      userHtml = getRegistrationTemplate(
        userPayload.delegate_name,
        userPayload.pass_tier,
        userPayload.ticket_count,
        userPayload.pass_code
      );
      subject = "Event Pass Confirmation - Dhara Divine Awards 2025";
      break;

    case 'Award Nominations':
      userHtml = getNominationTemplate(
        userPayload.nominator_name,
        userPayload.nominee_name,
        userPayload.category,
        userPayload.bio_summary
      );
      subject = "Nomination Receipt - Dhara Divine Awards 2025";
      break;

    case 'Volunteer Registration':
      userHtml = getVolunteerTemplate(
        userPayload.name,
        userPayload.skills,
        userPayload.availability
      );
      subject = "Volunteer Seva Registration Confirmed - Dhara Foundations";
      break;

    case 'General Enquiries':
      userHtml = getEnquiryTemplate(
        userPayload.sender_name,
        userPayload.subject,
        userPayload.message
      );
      subject = "We have received your enquiry - Dhara Foundations";
      break;

    case 'Donor Support':
    case 'Sponsorship':
    case 'Corporate CSR':
      userHtml = getDonationTemplate(
        userPayload.name,
        userPayload.amount,
        userPayload.seva_domain,
        userPayload.sponsorship_tier,
        userPayload.pan
      );
      subject = "Acknowledgment & Donation Receipt - Dhara Foundations";
      break;
  }

  // 1. Send confirmation email to user
  if (userEmail && userHtml) {
    await sendMail(userEmail, subject, userHtml);
  }

  // 2. Send notification alert to Admin
  if (ADMIN_EMAIL) {
    const adminHtml = getAdminAlertTemplate(module, userPayload);
    await sendMail(ADMIN_EMAIL, `Alert: New Web Submission [${module}]`, adminHtml);
  }
}
