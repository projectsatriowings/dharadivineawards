import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || '"Dhara Foundations" <no-reply@dharafoundations.in>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@dharafoundations.in';

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
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
}

export async function sendMail(to: string, subject: string, html: string): Promise<boolean> {
  const client = getTransporter();

  if (!client) {
    console.log(`[Email Simulation] To: ${to} | Subject: ${subject}`);
    return true;
  }

  try {
    await client.sendMail({ from: SMTP_FROM, to, subject, html });
    return true;
  } catch (error) {
    console.error("Email dispatch failed:", error);
    return false;
  }
}

export async function dispatchEmails(module: string, userEmail: string, userPayload: any) {
  if (userEmail) {
    await sendMail(userEmail, `Confirmation: ${module}`, `<p>Thank you for submitting to ${module}</p>`);
  }
  if (ADMIN_EMAIL) {
    await sendMail(ADMIN_EMAIL, `Alert: New Submission [${module}]`, `<p>New submission received for ${module}</p>`);
  }
}
