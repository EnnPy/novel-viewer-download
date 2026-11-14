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
