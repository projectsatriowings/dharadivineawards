import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', receipt, notes } = body;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json({ error: 'Valid payment amount is required' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dhara_demo';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'test_dhara_secret_key';

    const amountInPaise = Math.round(Number(amount) * 100);
    const orderReceipt = receipt || `rcpt_${Date.now()}`;

    // If using real Razorpay credentials (non-demo)
    if (keyId !== 'rzp_test_dhara_demo' && keySecret !== 'test_dhara_secret_key') {
      try {
        const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
        const response = await fetch('https://api.razorpay.com/v1/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`
          },
          body: JSON.stringify({
            amount: amountInPaise,
            currency: currency.toUpperCase(),
            receipt: orderReceipt,
            notes: notes || {}
          })
        });

        if (response.ok) {
          const order = await response.json();
          return NextResponse.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: keyId,
            receipt: order.receipt
          }, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
          });
        }
      } catch (err) {
        console.warn('Razorpay API request failed, falling back to test mode order creation', err);
      }
    }

    // Fallback/Demo test order generator
    const testOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return NextResponse.json({
      success: true,
      order_id: testOrderId,
      amount: amountInPaise,
      currency: currency.toUpperCase(),
      key_id: keyId,
      receipt: orderReceipt,
      isTestMode: true
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create Razorpay order' }, { status: 500 });
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
