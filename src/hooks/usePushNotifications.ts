import { useEffect, useState } from 'react';

interface NotificationPermission {
  granted: boolean;
  denied: boolean;
  prompt: boolean;
}

export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>({
    granted: false,
    denied: false,
    prompt: false
  });
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    checkNotificationPermission();
    getExistingSubscription();
  }, []);

  const checkNotificationPermission = () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return;
    }

    const status = Notification.permission;
    setPermission({
      granted: status === 'granted',
      denied: status === 'denied',
      prompt: status === 'default'
    });
  };

  const getExistingSubscription = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();
      setSubscription(existingSubscription);
    } catch (error) {
      console.error('Error getting existing subscription:', error);
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      return false;
    }

    const permission = await Notification.requestPermission();
    checkNotificationPermission();
    return permission === 'granted';
  };

  const subscribeToPush = async (): Promise<PushSubscription | null> => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('Push messaging is not supported');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Check if already subscribed
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        setSubscription(existingSubscription);
        return existingSubscription;
      }

      // Subscribe to push notifications
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(
          'BL7ELYEahGhO-3BG8ZdPQTEMTqJVNfgAe3mEaR6xYAi7A7wHhFNm4SoYsG_R3h7HyCw6Z_i0ZrKz1IqDfJ4XQa0'
        )
      });

      setSubscription(newSubscription);
      
      // Send subscription to your server
      await sendSubscriptionToServer(newSubscription);
      
      return newSubscription;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      return null;
    }
  };

  const unsubscribe = async (): Promise<boolean> => {
    if (!subscription) {
      return false;
    }

    try {
      const success = await subscription.unsubscribe();
      if (success) {
        setSubscription(null);
        // Remove subscription from server
        await removeSubscriptionFromServer(subscription);
      }
      return success;
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
      return false;
    }
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (permission.granted && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, {
          icon: '/lovable-uploads/0bd61b06-875b-4bde-82a0-31d5601427ff.png',
          badge: '/lovable-uploads/0bd61b06-875b-4bde-82a0-31d5601427ff.png',
          ...options
        });
      });
    }
  };

  return {
    permission,
    subscription,
    requestPermission,
    subscribeToPush,
    unsubscribe,
    sendNotification
  };
};

// Helper functions
function urlB64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
  // TODO: Send subscription to your backend
  console.log('Subscription to send to server:', subscription);
}

async function removeSubscriptionFromServer(subscription: PushSubscription): Promise<void> {
  // TODO: Remove subscription from your backend
  console.log('Subscription to remove from server:', subscription);
}