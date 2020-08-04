const CACHE_NAME = "submission-mpwa-dicoding";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/manifest.json",
    "/pages/home.html",
    "/pages/information.html",
    "/pages/majors.html",
    "/pages/organization.html",
    "/pages/gallery.html",
    "/pages/about.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/script.js",
    "icon.png",
    "/assets/image/jurusan.jpg",
    "/assets/image/osis.jpg",
    "/assets/image/pramuka.jpg",
    "/assets/image/paskibra.jpg",
    "/assets/image/gallery4.jpg",
    "/assets/image/gallery5.jpg",
    "/assets/image/gallery6.jpg",
    "/assets/image/gallery7.jpg",
    "/assets/image/gallery8.jpg",
    "/assets/image/gallery9.jpg",
    "/assets/image/gallery10.jpg",
    "/assets/image/gallery11.jpg",
    "/assets/image/gallery12.jpg",
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.map(function(cacheName) {
                if (cacheName != CACHE_NAME) {
                    console.log("ServiceWorker: cache " + cacheName + " dihapus");
                    return caches.delete(cacheName);
                }
            })
        );
    })
  );
});
