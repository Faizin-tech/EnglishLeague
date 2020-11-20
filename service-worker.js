// import script workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log('workbox berhasil di install');
} else {
    console.log("gagal install workbox");
}

workbox.precaching.precacheAndRoute([
    {url: 'index.html', revision: '1'},
    {url: '/content/navbar-content.html', revision: '1'},
    {url: '/details.html', revision: 'null'},
    {url: '/manifest.json', revision: '1'},
    {url: '/css/style.css', revision: '1'},
    {url: '/css/materialize.min.css', revision: '1'},
    {url: '/js/materialize.min.js', revision: '1'},
    {url: '/js/loadcontent.js', revision: '1'},
    {url: '/js/main-index.js', revision: '1'},
    {url: '/js/main-details.js', revision: '1'},
    {url: '/js/api.js', revision: '1'},
    {url: '/js/idb.js', revision: '1'},
    {url: '/js/database.js', revision: '1'},
],  {
    ignoreUrlParametersMatching: [/.*/],
    }
);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'fetchUrl',
        plugins: [
            new workbox.cacheableResponse.Plugin({
              statuses: [0, 200],
            })
          ],
    })
);

workbox.routing.registerRoute(
    new RegExp(/\.(?:png|gif|jpg|jpeg|svg)$/),
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
        }),
      ],
    }),
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
);
   
// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
);

self.addEventListener('push', function(event) {
    let body;
    if (event.data) {
        body - event.data.text();
    } else {
        body = 'Selamat Datang';
    }

    let options = {
        body: body,
        icon: 'images/logo144.png',
        vibrate: [100,50,100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(self.registration.showNotification('Push Notification', options));
});