// Simple, lightweight Service Worker for PWA installability
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Bypasses Service Worker fetch interception for videos (range requests)
  if (event.request.url.includes('.mp4') || event.request.url.includes('/video/') || event.request.headers.get('range')) {
    return; // Let the browser handle the video range requests natively
  }
  // Pass-through to network (ensures no cached page bugs during updates)
  event.respondWith(fetch(event.request));
});
