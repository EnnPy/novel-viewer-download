// App-shell service worker (Flutter 3.47's own flutter_service_worker.js is only a self-removing stub).
// scripts/build_web.ps1 fills VERSION, APP_VERSION, FILES and HASHES after the build; an unfilled copy (flutter run, plain
// `flutter build web`) does nothing, so development never serves stale files.
const VERSION = '7e29f7369258';
const APP_VERSION = '0.4.9'; // pubspec version of this build, shown by the update notice
const FILES = '["./","assets/AssetManifest.bin","assets/AssetManifest.bin.json","assets/assets/fonts/NanumBrushScript-Regular.ttf","assets/assets/fonts/NanumGothic-Bold.ttf","assets/assets/fonts/NanumGothic-Regular.ttf","assets/assets/fonts/NanumMyeongjo-Bold.ttf","assets/assets/fonts/NanumMyeongjo-Regular.ttf","assets/assets/fonts/NanumPenScript-Regular.ttf","assets/assets/fonts/OFL.txt","assets/assets/fonts/OFL-1.1.txt","assets/assets/fonts/OFL-Pretendard.txt","assets/assets/fonts/PretendardVariable.ttf","assets/assets/licenses/brotli_fast-NOTICE.txt","assets/assets/licenses/image-LICENSE-other.txt","assets/assets/tables/big5.bin","assets/assets/tables/cp949.bin","assets/assets/tables/sjis.bin","assets/FontManifest.json","assets/fonts/MaterialIcons-Regular.otf","assets/NOTICES","assets/packages/cupertino_icons/assets/CupertinoIcons.ttf","assets/packages/material_ui/shaders/ink_sparkle.frag","assets/packages/pdfrx/assets/pdfium.wasm","assets/packages/pdfrx/assets/pdfium_client.js","assets/packages/pdfrx/assets/pdfium_worker.js","assets/shaders/ink_sparkle.frag","assets/shaders/stretch_effect.frag","canvaskit/canvaskit.js","canvaskit/canvaskit.wasm","canvaskit/chromium/canvaskit.js","canvaskit/chromium/canvaskit.wasm","fallback-fonts/roboto/v32/KFOmCnqEu92Fr1Me4GZLCzYlKw.woff2","favicon.png","flutter.js","flutter_bootstrap.js","fonts/emoji/NotoColorEmoji.0.woff2","fonts/emoji/NotoColorEmoji.1.woff2","fonts/emoji/NotoColorEmoji.10.woff2","fonts/emoji/NotoColorEmoji.11.woff2","fonts/emoji/NotoColorEmoji.2.woff2","fonts/emoji/NotoColorEmoji.3.woff2","fonts/emoji/NotoColorEmoji.4.woff2","fonts/emoji/NotoColorEmoji.5.woff2","fonts/emoji/NotoColorEmoji.6.woff2","fonts/emoji/NotoColorEmoji.7.woff2","fonts/emoji/NotoColorEmoji.8.woff2","fonts/emoji/NotoColorEmoji.9.woff2","fonts/emoji/OFL.txt","icons/apple-touch-icon.png","icons/Icon-192.png","icons/Icon-512.png","icons/Icon-maskable-192.png","icons/Icon-maskable-512.png","index.html","main.dart.js","manifest.json","share_inbox.js","update.js","version.json"]'; // JSON array of paths relative to the scope
const HASHES = '{"./":"23601bed5e5814f5d1c26661a831bfbae8ad256c2844f1d40efcce94a1fdc9af","assets/AssetManifest.bin":"cbd2aab1869c9630276db13ea924c9400ca984d965f0f1686cb82b132d23f0e2","assets/AssetManifest.bin.json":"4c663b78d93d0a16a4419f8e79629859e5893bbee9b0aae6bbde2a5f3da23388","assets/assets/fonts/NanumBrushScript-Regular.ttf":"27ceaf578c96f594cdf07fe0181b251790acbb746a164e45c1f6473f89911a31","assets/assets/fonts/NanumGothic-Bold.ttf":"f96298f9fb18e364d2370f4c3ce948ac67a2b61af992d7234bc15c42b033c674","assets/assets/fonts/NanumGothic-Regular.ttf":"76f45ef4a6bcff344c837c95a7dcc26e017e38b5846d5ae0cdcb5b86be2e2d31","assets/assets/fonts/NanumMyeongjo-Bold.ttf":"bc9ed8e60d93fe6db054b8fb988481b625f2eef8cb2317ad0e9834681b8fe3f3","assets/assets/fonts/NanumMyeongjo-Regular.ttf":"7ed9e8653a8ed04285d51dc343ffea6eb3d9c73afc27383ea8929ee4ffd03205","assets/assets/fonts/NanumPenScript-Regular.ttf":"6f0d1ab29c7894010dc88831fb7a0a51edb79136e450344183de5b1a8b52bd43","assets/assets/fonts/OFL.txt":"1a3a78b851797e00737be35d0332e2731731e6e080b3b9069e49aeabbbb2b79b","assets/assets/fonts/OFL-1.1.txt":"3921581b3aaa98c4f55c0300d2546b11455e90fff45a78e9954689c941dd4510","assets/assets/fonts/OFL-Pretendard.txt":"4a8e3f92a51de4ca7b18ac2f462abf5fa22c76ec9a2685dda6a0ed95c8715479","assets/assets/fonts/PretendardVariable.ttf":"3090ccde0442bb347aa7685d9ba8b17436a60682df6e8f92a9a670de14056e22","assets/assets/licenses/brotli_fast-NOTICE.txt":"9a74f582592f6c54b79153183830476cddcf44b6b5bdbdfdb8ad00e861fac1e2","assets/assets/licenses/image-LICENSE-other.txt":"ee76825cff245c79371ed75e6ad08265602e7f02322bd1e15a070a516c5c4a97","assets/assets/tables/big5.bin":"68af7c2f306b1e2966c1e392889bba5eff646272e1292384b5d1ceba78f93d78","assets/assets/tables/cp949.bin":"400ccfa2ce63a1f6bab1a9ec829f73ecc791ed631e56b421dc1180606c8fe9d4","assets/assets/tables/sjis.bin":"7ee871575729b4e946a9acc40d213c12fb2c77c79ed5dad4b6d6e0f16627e7e2","assets/FontManifest.json":"25dd1fa4b9796735f16147f351ff5f520a676ce5cbb5cbd6e530988d15da8275","assets/fonts/MaterialIcons-Regular.otf":"d298c2d37af8869e16cfd9ef140258d1009a4e7534fb0ff54c824f79150fbe7a","assets/NOTICES":"59cbdc34d5ab277b4161367b1cf8dc942dd92fb2ed1922a0a51e8e67c6ca03db","assets/packages/cupertino_icons/assets/CupertinoIcons.ttf":"3d90c370aa4cf00dc57ee2b902f6652147c0f81e03e483df584a9c08b1687c9d","assets/packages/material_ui/shaders/ink_sparkle.frag":"2dca5ab93d4ec29e963f996f3916320ba60825e9537dfb149a68008c7a16b026","assets/packages/pdfrx/assets/pdfium.wasm":"5b2cbb18e9dc361dae375e971c7e75f7306d39b7749ad4fced475579e6a549df","assets/packages/pdfrx/assets/pdfium_client.js":"1ac8729c01dd67d03008f410fda7e2f9928d695c0a81e65ebd65bdf622ae5e65","assets/packages/pdfrx/assets/pdfium_worker.js":"658241afadf942bf51bdceb869ddcba0a6a0d23d443fce3971eb91088ad8e156","assets/shaders/ink_sparkle.frag":"2dca5ab93d4ec29e963f996f3916320ba60825e9537dfb149a68008c7a16b026","assets/shaders/stretch_effect.frag":"ab412f07a5b9b50b67a885b24dbe16929738ae28630407d6490c924caf0a3220","canvaskit/canvaskit.js":"bb559f6080c7d312ac2a912b4abec9f68ff3d3022d4a603c7796b9b31460642b","canvaskit/canvaskit.wasm":"fbed517a43e82452404446683f00f2e876d835aed84410695759e67b6bb01cd3","canvaskit/chromium/canvaskit.js":"6018b12bd8ed37e6952eee72d59c1cf7ad707ccdb74a0a45190010f77edd9068","canvaskit/chromium/canvaskit.wasm":"ae8ff1d858140f7b1300ced3fa89fb8c9dce0a400a0f4f1e11f6dcfb3315fdcf","fallback-fonts/roboto/v32/KFOmCnqEu92Fr1Me4GZLCzYlKw.woff2":"35b02ca266b79eb4996590f15817425a1ce9ebf48f84471843233ff614656bf2","favicon.png":"afeadb14def67aeaaff7bcb6959387bcaf73b2f759f4bc6057444a244bb74578","flutter.js":"2beb1ce6b159c71540aa66030af1d7964b6a92377cc78473745e02f97b74effe","flutter_bootstrap.js":"a49009fd3a746919f0a102fba14da43cf971b74310f7c4991bf89cb36f07b7cf","fonts/emoji/NotoColorEmoji.0.woff2":"928e12b560823ba9fe0de01abbdbf35c40fb4c4f27700d4b27b884240df84e1a","fonts/emoji/NotoColorEmoji.1.woff2":"3d6dc79812ee744ecdd79edfec5615e453e6fee42a235cc1694ff029f9fbe2f3","fonts/emoji/NotoColorEmoji.10.woff2":"203659edb0aed836ac36ce7659bc30cd706b4fbc2d73624ceb803bc218ccdd44","fonts/emoji/NotoColorEmoji.11.woff2":"385e562ebc59d03f50366b7ba80fe833bd22ca4e0fa3ccfd6c93f681e20d3477","fonts/emoji/NotoColorEmoji.2.woff2":"c62ab44e5774c86279e001e15df0d4c67cdd518bdc7366dc47f1b59c0f5cf041","fonts/emoji/NotoColorEmoji.3.woff2":"51f31d10bc2be987f091db1d4fd355403b94bd082a0bde87eb7cffcdffdd0865","fonts/emoji/NotoColorEmoji.4.woff2":"23e92d2e456d91ea146de276706d651f2172488df30abe65e5e5cc451023c787","fonts/emoji/NotoColorEmoji.5.woff2":"54c838d33459c44173e7301f6ee1ceb5c5246d059878c3e4d4e45bae09e36b30","fonts/emoji/NotoColorEmoji.6.woff2":"1880e91255718a7d7b4587a5525bc46b2e37b32d788850f09cc1bdf2ffd74851","fonts/emoji/NotoColorEmoji.7.woff2":"ff36706720fd0d853059b1025d7d0928fa71d9eba8fd2a4afe86191fc3657eef","fonts/emoji/NotoColorEmoji.8.woff2":"ee9007c489ff2b25249350c44325bfe91830870d4c89addd8ccf363321064242","fonts/emoji/NotoColorEmoji.9.woff2":"2c6df98bda8729b0df325c2218482d6d4772f44e78694663778e023d4d9acc7a","fonts/emoji/OFL.txt":"5b604079234bcdb49401d290e3002797bf6c8a6b95f9e4ae392eb7956ae6460b","icons/apple-touch-icon.png":"383c61f30fc60800b99f5a56e2162d928e100088b8eda7604a0c0fb5c5a27b2a","icons/Icon-192.png":"a54a2ee23e38967fafd646319b328393df2542bcc2c028d379ba4cef93514506","icons/Icon-512.png":"6dd3d0f2ad6ca3058540a601d50b5b03b16452087d72c10fbb88977d2942580e","icons/Icon-maskable-192.png":"c4ef19154b8d86a84346d3aeec2e8baaee0d4ad8d2044d3524bb5280821147c8","icons/Icon-maskable-512.png":"65b74b3dc7b4c0cef81ad3ddf95c0ce226bd137ed3be5d90a70a144ce789bb2e","index.html":"23601bed5e5814f5d1c26661a831bfbae8ad256c2844f1d40efcce94a1fdc9af","main.dart.js":"7d4d99a058f6a54a7ccf474e19dd3de26c40d234126ddcc3c9a787ffa9820a8f","manifest.json":"d0dfdbc41b52d730b98da5afb1db14f26ae301d170f67bfece1cc68f4a25ff4a","share_inbox.js":"f64ddd83e59f4f15cdb08c7abb9dc8020326d0b562f92149d14437b97de09618","update.js":"5b1e546fd6588c6427de3ec5be69c2210a595518d7b4ab68ffec44724990b13e","version.json":"ab76ee1c33c76ea1cefade01476c10adf7699f47b735d86d4e8eb52df4e54957"}'; // JSON object path -> SHA-256 hex ('./' is index.html)
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
  else if (d.type === 'GET_VERSION' && event.ports[0]) event.ports[0].postMessage(APP_VERSION.startsWith('__') ? VERSION : VERSION + '|' + APP_VERSION);
});

self.addEventListener('activate', (event) => {
  if (!active) return;
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k)))),
  );
});

// Web Share Target (manifest share_target): an image shared into the installed app arrives as a POST to share-target.
// The first image is parked by share_inbox.js (own cache, not under PREFIX, so a version change never drops a pending
// image; a unique id and a Web Lock make put and take atomic); the page takes it on start/resume
// (lib/ui/cover_search/share_inbox_web.dart) and the redirect marker tells it to look.
// A payload without an image, one over SHARE_MAX, or a body over SHARE_BODY_MAX parks nothing and redirects with share-rejected.
// The helper (web/share_inbox.js) is not imported: scripts/build_web.ps1 pastes its text in place of the marker below, so
// the code that runs here is part of this file and covered by the build's integrity check. An unfilled copy has no helper
// and rejects every share.
// The parked share-target image, shared by the service worker (producer: pasted into sw.js by the build) and the page (consumer: a
// <script> in index.html). One entry per scope (a newer share replaces an older one) in its own cache, so a version
// change never drops it. Every entry has a unique id; put and take run under one Web Lock per scope, so a share is
// claimed exactly once and a producer never lands inside a take. Without Web Locks the take still deletes only the
// id it read (compare-and-delete), so a newer entry that arrived meanwhile survives. That fallback is best-effort, not
// exactly-once: two unlocked consumers can both read the same entry before either deletes it (the image may be offered
// twice), and a producer landing between a consumer's re-check and its delete loses its entry. Only the lock closes both.
(function (g) {
  const cacheName = (scope) => 'txture-share:' + scope;
  const keyOf = (scope) => new URL('shared-cover', scope).href;
  const withLock = (scope, fn) => (g.navigator && g.navigator.locks ? g.navigator.locks.request(cacheName(scope), fn) : fn());
  let counter = 0;
  const newId = () => Date.now().toString(36) + '-' + ++counter + '-' + Math.random().toString(36).slice(2);

  g.shareInbox = {
    /** Parks [image] (a Blob/File); resolves to its id. */
    put: (scope, image) =>
      withLock(scope, async () => {
        const id = newId();
        const cache = await g.caches.open(cacheName(scope));
        const headers = { 'content-type': image.type, 'x-shared-at': String(Date.now()), 'x-share-id': id };
        await cache.put(keyOf(scope), new Response(image, { headers }));
        return id;
      }),
    /** Claims the parked entry: {id, type, at, blob}, or null when none is waiting. */
    take: (scope) =>
      withLock(scope, async () => {
        const cache = await g.caches.open(cacheName(scope));
        const key = keyOf(scope);
        const res = await cache.match(key);
        if (!res) return null;
        const claim = { id: res.headers.get('x-share-id'), type: res.headers.get('content-type') || '', at: Number(res.headers.get('x-shared-at')), blob: await res.blob() };
        const now = await cache.match(key);
        if (now && now.headers.get('x-share-id') === claim.id) await cache.delete(key);
        return claim;
      }),
  };
})(globalThis);

const SHARE_ACTION = new URL('share-target', self.registration.scope).href;
const SHARE_MAX = 30 << 20; // lib/ui/cover_search/cover_image.dart maxCoverBytes
const SHARE_BODY_MAX = 35 << 20; // the whole form (image plus its framing), enforced before it is parsed

// The request body as bytes, or null once it is over SHARE_BODY_MAX (a missing or false Content-Length does not matter).
async function readLimited(req) {
  if (Number(req.headers.get('content-length')) > SHARE_BODY_MAX || !req.body) return null;
  const reader = req.body.getReader();
  const chunks = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > SHARE_BODY_MAX) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new Blob(chunks);
}

async function takeShare(req) {
  let marker = 'share-rejected';
  try {
    const body = await readLimited(req);
    if (body) {
      const form = await new Response(body, { headers: { 'content-type': req.headers.get('content-type') || '' } }).formData();
      const image = form.getAll('image').find((v) => typeof v !== 'string' && v.type.toLowerCase().startsWith('image/'));
      if (image && image.size <= SHARE_MAX) {
        await self.shareInbox.put(self.registration.scope, image);
        marker = 'share';
      }
    }
  } catch (_) {
    // unreadable body or a full quota: reported as rejected
  }
  return Response.redirect(new URL('?launch=' + marker, self.registration.scope).href, 303);
}

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'POST' && event.request.url === SHARE_ACTION) event.respondWith(takeShare(event.request));
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