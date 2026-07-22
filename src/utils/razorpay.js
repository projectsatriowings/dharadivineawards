/**
 * Utility to load Razorpay Checkout script dynamically and open payment checkout modal.
 */

export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function showDemoPaymentGateway({ order_id, amount, currency, name, description, prefill, onSuccess, onDismiss }) {
  const modalDiv = document.createElement('div');
  modalDiv.id = 'demo-payment-modal';
  modalDiv.style.cssText = `
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(18, 19, 16, 0.7);
    backdrop-filter: blur(8px);
    padding: 16px;
    font-family: system-ui, -apple-system, sans-serif;
  `;

  const amountFormatted = (amount / 100).toLocaleString('en-IN', {
    style: 'currency',
    currency: currency || 'INR',
    maximumFractionDigits: 2
  });

  modalDiv.innerHTML = `
    <div style="background-color: #fff; border-radius: 28px; padding: 32px; width: 100%; max-width: 440px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid #D9CBB0; box-sizing: border-box; text-align: center; animation: modalEnter 0.3s ease-out;">
      <style>
        @keyframes modalEnter {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .demo-btn-primary:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }
        .demo-btn-secondary:hover {
          background-color: #eae8e3 !important;
        }
      </style>
      <div style="width: 60px; height: 60px; border-radius: 50%; background-color: #f4efe6; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; border: 1px solid #D9CBB0;">
        <span style="font-size: 28px; color: #401c0c;">🪔</span>
      </div>
      <h3 style="font-size: 22px; font-weight: 700; color: #401c0c; margin: 0 0 6px; font-family: Georgia, serif;">Dhara Foundations</h3>
      <p style="font-size: 13px; color: #867463; margin: 0 0 24px;">${description || 'Devotional Contribution'}</p>
      
      <div style="background-color: #FAF8F5; border-radius: 20px; padding: 20px; border: 1px solid #eae8e3; margin-bottom: 24px; text-align: left;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;">
          <span style="color: #867463;">Pass Price / Amount:</span>
          <span style="font-weight: 700; color: #1B1C19;">${amountFormatted}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;">
          <span style="color: #867463;">Payer Name:</span>
          <span style="font-weight: 600; color: #1B1C19;">${prefill.name || 'Anonymous Donor'}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 14px;">
          <span style="color: #867463;">Payment Mode:</span>
          <span style="font-weight: 700; color: #d9762e; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; background: #fff3e6; padding: 2px 8px; border-radius: 6px; border: 1px solid #ffe3c2;">Demo Gateway (Test)</span>
        </div>
      </div>

      <p style="font-size: 12px; color: #867463; line-height: 1.5; margin: 0 0 24px; text-align: center;">
        This is a simulated transaction. Clicking "Authorize Payment" will process the booking/donation in the database and issue your pass immediately.
      </p>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        <button id="demo-pay-success" class="demo-btn-primary" style="width: 100%; padding: 14px; border-radius: 14px; background: linear-gradient(to right, #D9762E, #C9A646); color: #281006; font-size: 14px; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 6px -1px rgba(217,118,46,0.2);">
          Authorize Payment (Simulate Success)
        </button>
        <button id="demo-pay-cancel" class="demo-btn-secondary" style="width: 100%; padding: 12px; border-radius: 14px; background-color: #f5f3ee; color: #534436; font-size: 13px; font-weight: 600; border: 1px solid #eae8e3; cursor: pointer; transition: all 0.2s;">
          Cancel / Decline Payment
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modalDiv);

  const cleanUp = () => {
    if (document.body.contains(modalDiv)) {
      document.body.removeChild(modalDiv);
    }
  };

  document.getElementById('demo-pay-success').onclick = () => {
    cleanUp();
    if (onSuccess) {
      onSuccess({
        razorpay_order_id: order_id || `order_mock_${Date.now()}`,
        razorpay_payment_id: `pay_mock_${Date.now()}`,
        razorpay_signature: `sig_mock_${Date.now()}`
      });
    }
  };

  document.getElementById('demo-pay-cancel').onclick = () => {
    cleanUp();
    if (onDismiss) {
      onDismiss();
    }
  };
}

export async function openRazorpayCheckout({
  key_id,
  order_id,
  amount,
  currency = 'INR',
  name = 'Dhara Foundations',
  description = 'Devotional Contribution',
  image = '/logo/dhara logo.jpg',
  prefill = {},
  onSuccess,
  onDismiss
}) {
  // If the Key ID is mock/fallback, use the custom simulation overlay
  if (!key_id || key_id === 'rzp_test_dhara_demo' || key_id.trim() === '') {
    showDemoPaymentGateway({ order_id, amount, currency, name, description, prefill, onSuccess, onDismiss });
    return;
  }

  const isLoaded = await loadRazorpayScript();
  
  if (!isLoaded) {
    alert('Razorpay Payment Gateway failed to load. Please check your internet connection.');
    return;
  }

  // Real Razorpay Order IDs created via API start with "order_" followed by alphanumeric string (e.g. order_PtX8w2yZ9kL1aM)
  const isServerOrderId = Boolean(
    order_id && 
    typeof order_id === 'string' && 
    order_id.startsWith('order_') && 
    !order_id.includes('local') && 
    !order_id.includes('demo') && 
    !order_id.includes('sim') &&
    !order_id.includes(' ')
  );

  const options = {
    key: key_id.trim(),
    amount: amount, // in paise
    currency: currency,
    name: name,
    description: description,
    image: image,
    ...(isServerOrderId ? { order_id } : {}),
    handler: function (response) {
      if (onSuccess) {
        onSuccess(response);
      }
    },
    prefill: {
      name: prefill.name || '',
      email: prefill.email || '',
      contact: prefill.phone || ''
    },
    notes: prefill.notes || {},
    theme: {
      color: '#0A3A2A' // Deep Forest Theme Color
    },
    modal: {
      ondismiss: function () {
        if (onDismiss) {
          onDismiss();
        }
      }
    }
  };

  const rzp = new window.Razorpay(options);
  
  rzp.on('payment.failed', function (response) {
    console.error('Payment failed:', response.error);
    alert(`Payment Failed: ${response.error.description || 'Transaction declined'}`);
  });

  rzp.open();
}

