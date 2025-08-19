// Service Worker for PWA functionality
const CACHE_NAME = 'rcs-express-v1';
const urlsToCache = [
  '/',
  '/choisir-statut',
  '/recherche',
  '/login',
  '/static/css/main.css',
  '/static/js/main.js',
  '/lovable-uploads/0bd61b06-875b-4bde-82a0-31d5601427ff.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external domains
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Fallback to offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      })
  );
});

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nouvelle notification',
    icon: '/lovable-uploads/0bd61b06-875b-4bde-82a0-31d5601427ff.png',
    badge: '/lovable-uploads/0bd61b06-875b-4bde-82a0-31d5601427ff.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Voir',
        icon: '/lovable-uploads/0bd61b06-875b-4bde-82a0-31d5601427ff.png'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/lovable-uploads/0bd61b06-875b-4bde-82a0-31d5601427ff.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('RCS Express', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  }
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Retrieve queued requests from IndexedDB and retry
  const db = await openDB();
  const tx = db.transaction('requests', 'readonly');
  const store = tx.objectStore('requests');
  const requests = await store.getAll();

  for (const request of requests) {
    try {
      const response = await fetch(request.url, request.options);
      if (response.ok) {
        // Remove successful request from queue
        const deleteTx = db.transaction('requests', 'readwrite');
        const deleteStore = deleteTx.objectStore('requests');
        await deleteStore.delete(request.id);
      }
    } catch (error) {
      console.log('Background sync failed for request:', request.id);
    }
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('rcs-express-db', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('requests')) {
        db.createObjectStore('requests', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}