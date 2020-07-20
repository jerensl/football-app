import { precacheAndRoute } from "workbox-precaching"
import { registerRoute, setCatchHandler } from "workbox-routing"
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from "workbox-strategies"
import { CacheableResponse } from "workbox-cacheable-response"
import { ExpirationPlugin } from "workbox-expiration"

precacheAndRoute(self.__WB_MANIFEST, {
  ignoreURLParametersMatching: [/.*/],
})

registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new CacheFirst({
    cacheName: "google-fonts-stylesheets",
  }),
)

registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: "google-fonts-webfonts",
  }),
)

registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  new CacheFirst({
    cacheName: "football-cache",
  }),
)

registerRoute(
  new RegExp("https://newsapi.org/v2/"),
  new NetworkFirst({
    cacheName: "news-cache",
  }),
)

registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      new CacheableResponse({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        // Pertahankan hanya 50 gambar
        maxEntries: 100,
        // Jangan simpan gambar lebih dari 30 hari
        maxAgeSeconds: 30 * 24 * 60 * 60,
        // Otomatis hapus ketika kouta terlampaui
        // purgeOnQuotaError: true,
      }),
    ],
  }),
)

// setCatchHandler(({event}) => {
//   caches.match()
// })

self.addEventListener("push", (event) => {
  let body = event?.data ?? "Push message no payload"

  const options = {
    body: body,
    icon: "images/icon-512x512.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  }

  event.waitUntil(
    self.registration.showNotification("Push Notification", options),
  )
})
