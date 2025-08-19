import { useEffect, useState } from 'react';

interface BackgroundSyncOptions {
  tag: string;
  onSync?: () => Promise<void>;
}

export const useBackgroundSync = ({ tag, onSync }: BackgroundSyncOptions) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    checkBackgroundSyncSupport();
  }, []);

  const checkBackgroundSyncSupport = () => {
    const supported = 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype;
    setIsSupported(supported);
  };

  const register = async (): Promise<boolean> => {
    if (!isSupported) {
      console.log('Background sync is not supported');
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      // Type assertion for background sync
      await (registration as any).sync.register(tag);
      setIsRegistered(true);
      
      // Listen for sync events
      if (onSync) {
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'SYNC_COMPLETE' && event.data.tag === tag) {
            onSync();
          }
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error registering background sync:', error);
      return false;
    }
  };

  const queueRequest = async (url: string, options: RequestInit): Promise<void> => {
    if (!isSupported) {
      console.log('Background sync not supported, making direct request');
      try {
        await fetch(url, options);
      } catch (error) {
        console.error('Direct request failed:', error);
        throw error;
      }
      return;
    }

    try {
      // Store request in IndexedDB for background sync
      const db = await openDB();
      const tx = db.transaction('requests', 'readwrite');
      const store = tx.objectStore('requests');
      
      await store.add({
        url,
        options: {
          method: options.method || 'GET',
          headers: options.headers,
          body: options.body
        },
        timestamp: Date.now(),
        tag
      });

      // Register background sync
      await register();
    } catch (error) {
      console.error('Error queueing request for background sync:', error);
      throw error;
    }
  };

  return {
    isSupported,
    isRegistered,
    register,
    queueRequest
  };
};

function openDB(): Promise<IDBDatabase> {
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