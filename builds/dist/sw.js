this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/',
        '/css/styles.css',
        '/js/scripts.js',
        '/sw.js'/*,
        '/img/apple-touch-logo.png',
        '/img/bell.png',
        '/img/chrome-touch-icon-192x192.png',
        '/img/favicon.png',
        '/img/icon-128x128.png',
        '/img/large-icon-252x252.png',
        '/img/logo.png',
        '/img/ms-touch-icon-144x144.png',*/
      ]);
    }).catch(function(){
      console.warn('Some assets may not have been cached');
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)    
  );
});