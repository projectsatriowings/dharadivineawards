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
  const isLoaded = await loadRazorpayScript();
  
  if (!isLoaded) {
    alert('Razorpay Payment Gateway failed to load. Please check your internet connection.');
    return;
  }

  const options = {
    key: key_id || 'rzp_test_dhara_demo',
    amount: amount, // in paise
    currency: currency,
    name: name,
    description: description,
    image: image,
    order_id: order_id,
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
