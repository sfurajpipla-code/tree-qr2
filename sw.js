const CACHE_NAME = 'tree-survey-v2';
const ASSETS = [
  'index.html',
  'manifest.json',
  'https://unpkg.com/html5-qrcode' // Caches the scanning engine library
];

// Install the service worker and cache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Serve assets from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached file if found, otherwise try the network
      return response || fetch(event.request);
    })
  );
});

// Clear old caches when a new version is deployed
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
});
