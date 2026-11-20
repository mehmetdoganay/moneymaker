/* Para Takip Firebase Cloud Messaging service worker */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBckzlAxIgd7FZw6u6J2ss1GABH2ZrGLJM",
  authDomain: "moneymaker-75bc7.firebaseapp.com",
  projectId: "moneymaker-75bc7",
  storageBucket: "moneymaker-75bc7.firebasestorage.app",
  messagingSenderId: "803305179652",
  appId: "1:803305179652:web:0b6b549406971d7e4bc351"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  const title = payload.data?.title || payload.notification?.title || 'Para Takip';
  const options = {
    body: payload.data?.body || payload.notification?.body || 'Yeni bildiriminiz var.',
    icon: new URL('icon-192.png', self.registration.scope).href,
    badge: new URL('icon-192.png', self.registration.scope).href,
    data: { url: payload.data?.url || self.registration.scope }
  };
  return self.registration.showNotification(title, options);
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || '/', self.location.origin).href;
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
    for (const win of wins) { if (win.url.startsWith(self.location.origin) && 'focus' in win) return win.focus(); }
    return clients.openWindow(target);
  }));
});
