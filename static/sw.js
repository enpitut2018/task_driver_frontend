importScripts('/_nuxt/workbox.4c4f5ca6.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/069b1a5a24bf792ea110.js",
    "revision": "594759712fff3847a76a586eb082bcd8"
  },
  {
    "url": "/_nuxt/2293ae8530fd9c6f15cc.js",
    "revision": "9eb1f9cc293d033dc769582f3df250b2"
  },
  {
    "url": "/_nuxt/2b478f2442dea933a0aa.js",
    "revision": "03b0549acd51a4460e280f395d14a2de"
  },
  {
    "url": "/_nuxt/462c6a6d147d71911340.js",
    "revision": "dea9480d8ae4515f691d5e64348e5a4b"
  },
  {
    "url": "/_nuxt/4837a0c492662ae75d0e.js",
    "revision": "42b0f434a41619120c96bcfa878995fd"
  },
  {
    "url": "/_nuxt/49867201477a23ed34f7.js",
    "revision": "effc5e76041e5133027c82a393590856"
  },
  {
    "url": "/_nuxt/885b8f70db56806231d7.js",
    "revision": "1a5b0b477d77df4c425667cd1a46d2de"
  },
  {
    "url": "/_nuxt/a3ac1487149ae23b097e.js",
    "revision": "e453055f59d4542da4f4b22fe53ad98f"
  },
  {
    "url": "/_nuxt/dc208b4512f973354dfe.js",
    "revision": "2f149c73c84b51f4f5dba48c44913262"
  },
  {
    "url": "/_nuxt/e08c557d2e1b93d86933.js",
    "revision": "a0468d6029381b9aa6a12fdf9a56a14a"
  },
  {
    "url": "/_nuxt/ff41eca4ebe0753d8150.js",
    "revision": "eb3201b5c2c97c83413c62ba43d4f78d"
  }
], {
  "cacheId": "task_driver_frontend",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')

self.addEventListener('push', function(evt){
  //通知送信時のmessage:の中身を取得(json形式)
  var json = evt.data.json(); 
  evt.waitUntil(
      self.registration.showNotification('今だらだらしてた？',
          {
              body: json.body.name,
              actions: [{
                  action: "yes",
                  title: "5分だけでもチャレンジ"
              }, {
                  action: "no",
                  title: "やる気がでません"
              }],
              data: {
                  target_url: json.body.target_url + json.body.id + "?timer=1"
              },
              vibrate: [200, 100, 200, 100, 200, 100, 200]
          }
      )
  );
}, false);

self.addEventListener('notificationclick', function(event){
  event.notification.close();
  console.log("openwindow");
  clients.openWindow(event.notification.data != null ? event.notification.data.target_url : '/');
}, false);





