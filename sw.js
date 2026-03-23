const CACHE_NAME = 'jay-scorepaddev2-v1';
// List every file your app needs to work offline
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

// 1. Install: Open cache and save all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching shell assets');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. Activate: Cleanup old versions of the cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// 3. Fetch: Check cache first, then try network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return the cached file if found, otherwise fetch from internet
      return cachedResponse || fetch(event.request);
    })
  );
});


