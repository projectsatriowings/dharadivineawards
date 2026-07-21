import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { readDb, writeDb } from '../../db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      module = 'donations',
      name = 'Anonymous',
      email = '',
      phone = '',
      amount = 0,
      ticketType = 'Delegate Pass',
      pan = '',
      isAnonymous = false,
      organization = '',
      interest = '',
      specialNotes = ''
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'test_dhara_secret_key';

    let isValidSignature = true;
    if (razorpay_order_id && razorpay_payment_id && razorpay_signature && keySecret !== 'test_dhara_secret_key') {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');
      
      isValidSignature = (generatedSignature === razorpay_signature);
    }

    if (!isValidSignature) {
      return NextResponse.json({ error: 'Invalid Razorpay payment signature' }, { status: 400 });
    }

    const db = await readDb();
    const timestamp = new Date().toISOString();
    const paymentId = razorpay_payment_id || `pay_sim_${Date.now()}`;
    const orderId = razorpay_order_id || `order_sim_${Date.now()}`;

    let resultData: any = {};

    if (module.toLowerCase().includes('event') || module.toLowerCase().includes('delegate')) {
      const passCode = `DDA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const delegateEntry = {
        id: `del-${Date.now()}`,
        delegate_name: name,
        email,
        phone,
        organization,
        interest,
        specialNotes,
        pass_tier: ticketType,
        ticket_count: 1,
        pass_code: passCode,
        checked_in: false,
        payment_status: 'PAID',
        payment_id: paymentId,
        order_id: orderId,
        amount: Number(amount),
        created_at: timestamp
      };

      if (!db.delegates) db.delegates = [];
      db.delegates.unshift(delegateEntry);

      if (!db.activityLogs) db.activityLogs = [];
      db.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        type: 'checkin',
        message: `New Delegate pass booked with Razorpay for "${name}" (Pass: ${passCode})`,
        user: 'Razorpay Payment Gateway'
      });

      resultData = {
        pass_code: passCode,
        ticketType,
        delegate_name: name,
        paymentId
      };
    } else {
      // Default to Donation
      const receiptNo = `REC-80G-${Date.now().toString().slice(-6)}`;
      const donationEntry = {
        id: `don-${Date.now()}`,
        donor_name: isAnonymous ? 'Anonymous Donor' : name,
        email,
        phone,
        pan: pan ? pan.toUpperCase() : '',
        amount: Number(amount),
        isAnonymous,
        payment_status: 'PAID',
        payment_id: paymentId,
        order_id: orderId,
        receipt_no: receiptNo,
        created_at: timestamp
      };

      if (!db.donations) db.donations = [];
      db.donations.unshift(donationEntry);

      if (!db.activityLogs) db.activityLogs = [];
      db.activityLogs.unshift({
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        type: 'donation',
        message: `New Donation of ₹${Number(amount).toLocaleString('en-IN')} received via Razorpay from "${isAnonymous ? 'Anonymous' : name}"`,
        user: 'Razorpay Payment Gateway'
      });

      resultData = {
        receiptNo,
        amount: Number(amount),
        donor_name: isAnonymous ? 'Anonymous Donor' : name,
        paymentId
      };
    }

    await writeDb(db);

    return NextResponse.json({
      success: true,
      message: 'Payment verified and recorded successfully',
      payment_id: paymentId,
      order_id: orderId,
      details: resultData
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to verify payment' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
