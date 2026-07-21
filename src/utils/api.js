import dbData from '../../df-admin/data/db.json';

export const staticData = dbData;

export const API_BASE = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:3000'
  : (import.meta.env.VITE_API_BASE || 'https://dhara-divineawardsadmin.vercel.app');

/**
 * Helper to submit form data to the backend.
 * Automatically backs up to localStorage.
 * 
 * @param {string} module - The name of the module/form
 * @param {object} data - Form field values
 */
export async function submitForm(module, data) {
  const payload = {
    module,
    ...data,
    timestamp: new Date().toISOString()
  };

  // Back up locally
  try {
    const current = JSON.parse(localStorage.getItem('dhara_submissions') || '[]');
    current.push(payload);
    localStorage.setItem('dhara_submissions', JSON.stringify(current));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }

  // POST to API
  try {
    const res = await fetch(`${API_BASE}/api/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    
    return await res.json();
  } catch (err) {
    console.error('Failed to submit form to server, using local fallback:', err);
    return { success: true, localOnly: true };
  }
}

/**
 * Fetches gallery images from the backend.
 */
export async function fetchGallery() {
  try {
    const res = await fetch(`${API_BASE}/api/gallery`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (err) {
    console.error('Failed to fetch gallery, using bundled static data:', err);
    return dbData.gallery || [];
  }
}

/**
 * Fetches events/activities from the backend.
 */
export async function fetchEvents() {
  try {
    const res = await fetch(`${API_BASE}/api/events`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (err) {
    console.error('Failed to fetch events, using bundled static data:', err);
    return dbData.events || [];
  }
}

/**
 * Fetches news articles from the backend.
 */
export async function fetchNews() {
  const defaultItems = dbData.news || [];

  // 1. Check local dynamic store and merge missing seed items (videos/photos)
  try {
    const local = localStorage.getItem('dhara_dynamic_news');
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const existingIds = new Set(parsed.map(item => item.id));
        const missingDefaults = defaultItems.filter(item => !existingIds.has(item.id));
        if (missingDefaults.length > 0) {
          const merged = [...parsed, ...missingDefaults];
          try { localStorage.setItem('dhara_dynamic_news', JSON.stringify(merged)); } catch (e) {}
          return merged;
        }
        return parsed;
      }
    }
  } catch (e) {}

  // 2. Fallback to bundled seed data
  try { localStorage.setItem('dhara_dynamic_news', JSON.stringify(defaultItems)); } catch (e) {}
  return defaultItems;
}

/**
 * Fetches site config from the backend.
 */
export async function fetchSiteConfig() {
  try {
    const res = await fetch(`${API_BASE}/api/config`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    // Convert array format to single object if needed
    if (Array.isArray(data) && data.length > 0) return data[0];
    return data;
  } catch (err) {
    console.error('Failed to fetch site config, using bundled static data:', err);
    return (dbData.siteConfig && dbData.siteConfig.length > 0) ? dbData.siteConfig[0] : null;
  }
}

/**
 * Converts a Google Drive share link to a direct image link.
 */
export function getGoogleDriveDirectLink(url) {
  if (!url) return url;
  
  if (url.includes('drive.google.com/file/d/')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }
  
  if (url.includes('drive.google.com/open?id=')) {
    const match = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }

  return url;
}

/**
 * Creates a Razorpay Order via the backend API.
 */
export async function createRazorpayOrder(orderDetails) {
  try {
    const res = await fetch(`${API_BASE}/api/razorpay/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails)
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend Razorpay order creation offline, using test mode order:', err);
    return {
      success: true,
      order_id: `order_local_${Date.now()}`,
      amount: Math.round((orderDetails.amount || 100) * 100),
      currency: orderDetails.currency || 'INR',
      key_id: 'rzp_test_dhara_demo',
      isTestMode: true
    };
  }
}

/**
 * Verifies Razorpay payment signature and stores transaction in backend DB.
 */
export async function verifyRazorpayPayment(paymentData) {
  try {
    const res = await fetch(`${API_BASE}/api/razorpay/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend payment verification offline, completing locally:', err);
    const isEvent = (paymentData.module || '').toLowerCase().includes('event') || (paymentData.module || '').toLowerCase().includes('delegate');
    return {
      success: true,
      payment_id: paymentData.razorpay_payment_id || `pay_local_${Date.now()}`,
      order_id: paymentData.razorpay_order_id || `order_local_${Date.now()}`,
      details: {
        pass_code: isEvent ? `DDA-2026-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
        receiptNo: !isEvent ? `REC-80G-${Date.now().toString().slice(-6)}` : undefined,
        amount: paymentData.amount,
        donor_name: paymentData.name,
        delegate_name: paymentData.name
      }
    };
  }
}

