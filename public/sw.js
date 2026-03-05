const CACHE_NAME = 'reifydb-assets-v1';

// Hashed assets contain a pattern like -4qj8gf46. in the filename
const HASHED_ASSET_RE = /\/assets\/.+-[a-zA-Z0-9]{8,}\.\w+$/;

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      ),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only cache-first for hashed assets (safe to cache forever)
  if (!HASHED_ASSET_RE.test(url.pathname)) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      }),
    ),
  );
});
