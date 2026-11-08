// App-shell service worker (Flutter 3.47's own flutter_service_worker.js is only a self-removing stub).
// scripts/build_web.ps1 fills VERSION, FILES and HASHES after the build; an unfilled copy (flutter run, plain
// `flutter build web`) does nothing, so development never serves stale files.
const VERSION = 'cf6eeb010a45';
const FILES = '["./","assets/AssetManifest.bin","assets/AssetManifest.bin.json","assets/assets/fonts/NanumBrushScript-Regular.ttf","assets/assets/fonts/NanumGothic-Bold.ttf","assets/assets/fonts/NanumGothic-Regular.ttf","assets/assets/fonts/NanumMyeongjo-Bold.ttf","assets/assets/fonts/NanumMyeongjo-Regular.ttf","assets/assets/fonts/NanumPenScript-Regular.ttf","assets/assets/fonts/OFL.txt","assets/assets/fonts/OFL-1.1.txt","assets/assets/fonts/OFL-Pretendard.txt","assets/assets/fonts/PretendardVariable.ttf","assets/assets/tables/big5.bin","assets/assets/tables/cp949.bin","assets/assets/tables/sjis.bin","assets/FontManifest.json","assets/fonts/MaterialIcons-Regular.otf","assets/NOTICES","assets/packages/cupertino_icons/assets/CupertinoIcons.ttf","assets/packages/material_ui/shaders/ink_sparkle.frag","assets/packages/pdfrx/assets/pdfium.wasm","assets/packages/pdfrx/assets/pdfium_client.js","assets/packages/pdfrx/assets/pdfium_worker.js","assets/shaders/ink_sparkle.frag","assets/shaders/stretch_effect.frag","canvaskit/canvaskit.js","canvaskit/canvaskit.wasm","canvaskit/chromium/canvaskit.js","canvaskit/chromium/canvaskit.wasm","fallback-fonts/roboto/v32/KFOmCnqEu92Fr1Me4GZLCzYlKw.woff2","favicon.png","flutter.js","flutter_bootstrap.js","icons/apple-touch-icon.png","icons/Icon-192.png","icons/Icon-512.png","icons/Icon-maskable-192.png","icons/Icon-maskable-512.png","index.html","main.dart.js","manifest.json","update.js","version.json"]'; // JSON array of paths relative to the scope
const HASHES = '{"./":"05abdec553d641a9151a4729938f9c27da59733e44de6d4e027ae2a7e046785f","assets/AssetManifest.bin":"060b2faebf7d73612a5e458f6ed78e8e2e66ba9ff17778af4e5c7185e48085fa","assets/AssetManifest.bin.json":"a88db804c5267e2d3f134821db61d1558129f0087855a412820b009543a3f7b0","assets/assets/fonts/NanumBrushScript-Regular.ttf":"27ceaf578c96f594cdf07fe0181b251790acbb746a164e45c1f6473f89911a31","assets/assets/fonts/NanumGothic-Bold.ttf":"f96298f9fb18e364d2370f4c3ce948ac67a2b61af992d7234bc15c42b033c674","assets/assets/fonts/NanumGothic-Regular.ttf":"76f45ef4a6bcff344c837c95a7dcc26e017e38b5846d5ae0cdcb5b86be2e2d31","assets/assets/fonts/NanumMyeongjo-Bold.ttf":"bc9ed8e60d93fe6db054b8fb988481b625f2eef8cb2317ad0e9834681b8fe3f3","assets/assets/fonts/NanumMyeongjo-Regular.ttf":"7ed9e8653a8ed04285d51dc343ffea6eb3d9c73afc27383ea8929ee4ffd03205","assets/assets/fonts/NanumPenScript-Regular.ttf":"6f0d1ab29c7894010dc88831fb7a0a51edb79136e450344183de5b1a8b52bd43","assets/assets/fonts/OFL.txt":"8eb1c1019fe7fe6d0b6e7d7bbbba1d9cbdd969d8c5f26455708f6cfb8a77284c","assets/assets/fonts/OFL-1.1.txt":"3667e7e53647b53c0a90af71347ccf1854477f3e496a5b88dc9f61b6da8212b0","assets/assets/fonts/OFL-Pretendard.txt":"b04538c9abec39a3db75108cf0af0fd9c77032fe8aa2cf38345b4d250e98e38e","assets/assets/fonts/PretendardVariable.ttf":"3090ccde0442bb347aa7685d9ba8b17436a60682df6e8f92a9a670de14056e22","assets/assets/tables/big5.bin":"68af7c2f306b1e2966c1e392889bba5eff646272e1292384b5d1ceba78f93d78","assets/assets/tables/cp949.bin":"400ccfa2ce63a1f6bab1a9ec829f73ecc791ed631e56b421dc1180606c8fe9d4","assets/assets/tables/sjis.bin":"7ee871575729b4e946a9acc40d213c12fb2c77c79ed5dad4b6d6e0f16627e7e2","assets/FontManifest.json":"25dd1fa4b9796735f16147f351ff5f520a676ce5cbb5cbd6e530988d15da8275","assets/fonts/MaterialIcons-Regular.otf":"4733d071ffec4101504b1cebb1a6820e7b6d23ad675eb4feabff2e2c3bf7de7b","assets/NOTICES":"6ae606e567f94fca4c491fd8f6b11545ca8f7ad75a72c1ea6cdc1d9de44dc582","assets/packages/cupertino_icons/assets/CupertinoIcons.ttf":"3d90c370aa4cf00dc57ee2b902f6652147c0f81e03e483df584a9c08b1687c9d","assets/packages/material_ui/shaders/ink_sparkle.frag":"2dca5ab93d4ec29e963f996f3916320ba60825e9537dfb149a68008c7a16b026","assets/packages/pdfrx/assets/pdfium.wasm":"5b2cbb18e9dc361dae375e971c7e75f7306d39b7749ad4fced475579e6a549df","assets/packages/pdfrx/assets/pdfium_client.js":"1ac8729c01dd67d03008f410fda7e2f9928d695c0a81e65ebd65bdf622ae5e65","assets/packages/pdfrx/assets/pdfium_worker.js":"658241afadf942bf51bdceb869ddcba0a6a0d23d443fce3971eb91088ad8e156","assets/shaders/ink_sparkle.frag":"2dca5ab93d4ec29e963f996f3916320ba60825e9537dfb149a68008c7a16b026","assets/shaders/stretch_effect.frag":"ab412f07a5b9b50b67a885b24dbe16929738ae28630407d6490c924caf0a3220","canvaskit/canvaskit.js":"bb559f6080c7d312ac2a912b4abec9f68ff3d3022d4a603c7796b9b31460642b","canvaskit/canvaskit.wasm":"fbed517a43e82452404446683f00f2e876d835aed84410695759e67b6bb01cd3","canvaskit/chromium/canvaskit.js":"6018b12bd8ed37e6952eee72d59c1cf7ad707ccdb74a0a45190010f77edd9068","canvaskit/chromium/canvaskit.wasm":"ae8ff1d858140f7b1300ced3fa89fb8c9dce0a400a0f4f1e11f6dcfb3315fdcf","fallback-fonts/roboto/v32/KFOmCnqEu92Fr1Me4GZLCzYlKw.woff2":"35b02ca266b79eb4996590f15817425a1ce9ebf48f84471843233ff614656bf2","favicon.png":"fd75124c542d1a37c62e18f9279c27070e3039a33eeb6f49972e3106447eb43e","flutter.js":"2beb1ce6b159c71540aa66030af1d7964b6a92377cc78473745e02f97b74effe","flutter_bootstrap.js":"61a5bd06d28639fa39058e917018e2f5741c01b11cd209b9ffefe57074745d26","icons/apple-touch-icon.png":"883a3ab7582de4aae4355cfa2b76430bf2dd9fe4bb542d2a9c66a8814b0c301a","icons/Icon-192.png":"8997c58202acc28e134c1eaa248815c4331ef6ab579e19d8e5c1d2198f3b8d2f","icons/Icon-512.png":"56bcff4807eb9a6aceace3bf013e50b55d31298d7ad0202daf4a6d084807df25","icons/Icon-maskable-192.png":"8997c58202acc28e134c1eaa248815c4331ef6ab579e19d8e5c1d2198f3b8d2f","icons/Icon-maskable-512.png":"56bcff4807eb9a6aceace3bf013e50b55d31298d7ad0202daf4a6d084807df25","index.html":"05abdec553d641a9151a4729938f9c27da59733e44de6d4e027ae2a7e046785f","main.dart.js":"2c5bd88bb5cfdf88096cff50d845dc8339143499ef9aeb00bdb212b98a52cbcc","manifest.json":"9ff458ec0acb0a50ff3f4ac856ce608ba28bee025422917046cad7a4a9fa594f","update.js":"7eee14f60f1806dd22a9d647cd98e77ce7323d8cd1666a0e8e8f2122ae57f2cb","version.json":"32323aa4464ed913c2ed3f688e7f4b1fce018c4ba6116b2a54b015db8a1c97b9"}'; // JSON object path -> SHA-256 hex ('./' is index.html)
// Scoped by registration scope: another app on the same origin (another GitHub Pages project path) never loses its cache.
const PREFIX = 'novel-viewer:' + self.registration.scope + ':';
const CACHE = PREFIX + VERSION;
const active = !VERSION.startsWith('__');

// cache:'reload' bypasses the browser HTTP cache only; the CDN (GitHub Pages ignores query strings in its cache key)
// may still serve files of the previous deploy. The SHA-256 check is the actual defense: any copy that is not this
// build's file rejects the install, so a stale body is never stored under the new VERSION.
async function precache(cache, path, hashes) {
  const plain = new URL(path, self.registration.scope).href;
  const res = await fetch(new Request(plain, { cache: 'reload' }));
  if (!res.ok) throw new Error('precache ' + path + ': HTTP ' + res.status);
  const digest = await crypto.subtle.digest('SHA-256', await res.clone().arrayBuffer());
  const hex = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
  if (hex !== hashes[path]) throw new Error('precache ' + path + ': stale or corrupt copy');
  await cache.put(plain, res);
}

self.addEventListener('install', (event) => {
  if (!active) return;
  const files = JSON.parse(FILES);
  const hashes = JSON.parse(HASHES);
  // All or nothing: a failed fetch or a quota error rejects the install (the app shows "not offline-ready" and
  // offers a retry). A cache this install created is dropped so it does not eat the quota that just ran out;
  // a cache that already existed under this version belongs to the active worker and is never deleted.
  event.waitUntil(
    (async () => {
      const existed = await caches.has(CACHE);
      try {
        const c = await caches.open(CACHE);
        // one file at a time: only one body is buffered (fetch + hash copy) at once
        for (const f of files) await precache(c, f, hashes);
      } catch (e) {
        if (!existed) await caches.delete(CACHE);
        throw e;
      }
    })(),
  );});

// A verified new worker waits (no skipWaiting at install) until the page, on the user's button, asks it to take over.
self.addEventListener('message', (event) => {
  const d = event.data;
  if (!d) return;
  if (d.type === 'SKIP_WAITING') self.skipWaiting();
  else if (d.type === 'GET_VERSION' && event.ports[0]) event.ports[0].postMessage(VERSION);
});

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