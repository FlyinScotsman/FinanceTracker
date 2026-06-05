/* Finance Tracker service worker — offline support + prompt updates */
var CACHE = "finance-tracker-v2";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  if(e.request.method!=="GET") return;
  var accept = e.request.headers.get("accept") || "";
  var isDoc = e.request.mode === "navigate" || accept.indexOf("text/html") > -1;

  if(isDoc){
    /* network-first for the page itself, so updates show as soon as you're online */
    e.respondWith(
      fetch(e.request).then(function(resp){
        var copy = resp.clone();
        caches.open(CACHE).then(function(c){ c.put("./index.html", copy); });
        return resp;
      }).catch(function(){
        return caches.match("./index.html").then(function(m){ return m || caches.match(e.request); });
      })
    );
  } else {
    /* cache-first for static assets (icons, manifest), refreshed in the background */
    e.respondWith(
      caches.match(e.request).then(function(cached){
        var network = fetch(e.request).then(function(resp){
          if(resp && resp.status===200 && resp.type==="basic"){
            var copy=resp.clone();
            caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
          }
          return resp;
        }).catch(function(){ return cached; });
        return cached || network;
      })
    );
  }
});
