// App-shell service worker (Flutter 3.47's own flutter_service_worker.js is only a self-removing stub).
// scripts/build_web.ps1 fills VERSION and FILES after the build; an unfilled copy (flutter run, plain
// `flutter build web`) does nothing, so development never serves stale files.
const VERSION = 'ef9778849d7f';
const FILES = '["./","assets/AssetManifest.bin","assets/AssetManifest.bin.json","assets/assets/fonts/NanumBrushScript-Regular.ttf","assets/assets/fonts/NanumGothic-Bold.ttf","assets/assets/fonts/NanumGothic-Regular.ttf","assets/assets/fonts/NanumMyeongjo-Bold.ttf","assets/assets/fonts/NanumMyeongjo-Regular.ttf","assets/assets/fonts/NanumPenScript-Regular.ttf","assets/assets/fonts/OFL.txt","assets/assets/fonts/OFL-1.1.txt","assets/assets/fonts/OFL-Pretendard.txt","assets/assets/fonts/PretendardVariable.ttf","assets/assets/tables/big5.bin","assets/assets/tables/cp949.bin","assets/assets/tables/sjis.bin","assets/FontManifest.json","assets/fonts/MaterialIcons-Regular.otf","assets/NOTICES","assets/packages/cupertino_icons/assets/CupertinoIcons.ttf","assets/packages/material_ui/shaders/ink_sparkle.frag","assets/packages/pdfrx/assets/pdfium.wasm","assets/packages/pdfrx/assets/pdfium_client.js","assets/packages/pdfrx/assets/pdfium_worker.js","assets/shaders/ink_sparkle.frag","assets/shaders/stretch_effect.frag","canvaskit/canvaskit.js","canvaskit/canvaskit.wasm","canvaskit/chromium/canvaskit.js","canvaskit/chromium/canvaskit.wasm","fallback-fonts/roboto/v32/KFOmCnqEu92Fr1Me4GZLCzYlKw.woff2","favicon.png","flutter.js","flutter_bootstrap.js","icons/apple-touch-icon.png","icons/Icon-192.png","icons/Icon-512.png","icons/Icon-maskable-192.png","icons/Icon-maskable-512.png","index.html","main.dart.js","manifest.json","version.json"]'; // JSON array of paths relative to the scope
// Scoped by registration scope: another app on the same origin (another GitHub Pages project path) never loses its cache.
const PREFIX = 'novel-viewer:' + self.registration.scope + ':';
const CACHE = PREFIX + VERSION;
const active = !VERSION.startsWith('__');

self.addEventListener('install', (event) => {
  if (!active) return;
  const files = JSON.parse(FILES);
  // All or nothing: a failed fetch or a quota error rejects the install (the app shows "not offline-ready" and
  // offers a retry). A cache this install created is dropped so it does not eat the quota that just ran out;
  // a cache that already existed under this version belongs to the active worker and is never deleted.
  event.waitUntil(
    (async () => {
      const existed = await caches.has(CACHE);
      try {
        const c = await caches.open(CACHE);
        await c.addAll(files.map((f) => new URL(f, self.registration.scope).href));
      } catch (e) {
        if (!existed) await caches.delete(CACHE);
        throw e;
      }
    })(),
  );});

self.addEventListener('activate', (event) => {
  if (!active) return;
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k)))),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  // Cross-origin (Bing, font downloads, ...) and non-GET requests always go straight to the network.
  if (!active || req.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(req, { ignoreSearch: true });
      if (hit) return hit;
      if (req.mode === 'navigate') {
        const shell = await cache.match(new URL('index.html', self.registration.scope).href);
        if (shell) return shell;
      }
      const res = await fetch(req);
      if (res.ok && res.type === 'basic') cache.put(req, res.clone());
      return res;
    })(),
  );
});