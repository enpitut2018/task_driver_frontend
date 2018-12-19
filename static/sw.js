importScripts('/_nuxt/workbox.dev.4c4f5ca6.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/2293ae8530fd9c6f15cc.js",
    "revision": "9eb1f9cc293d033dc769582f3df250b2"
  },
  {
    "url": "/_nuxt/462c6a6d147d71911340.js",
    "revision": "dea9480d8ae4515f691d5e64348e5a4b"
  },
  {
    "url": "/_nuxt/47bca0836de308f51282.js",
    "revision": "c9127934f4bd8918d90359722dbca772"
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
    "url": "/_nuxt/4bd905d9ff361f454276.js",
    "revision": "fbba24c5c5c240d1100bd0682ffaa957"
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
    "url": "/_nuxt/d7a83218c4c7c91ec3f8.js",
    "revision": "d7242e29df82ddc0a5535a1c2c71d3f6"
  },
  {
    "url": "/_nuxt/dc208b4512f973354dfe.js",
    "revision": "2f149c73c84b51f4f5dba48c44913262"
  },
  {
    "url": "/_nuxt/e08c557d2e1b93d86933.js",
    "revision": "a0468d6029381b9aa6a12fdf9a56a14a"
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





