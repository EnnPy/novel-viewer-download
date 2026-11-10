// "새 버전이 있습니다" plumbing between the service worker registration and the Dart app (lib/web_update/).
// Loaded by index.html, precached and SHA-256 verified like every other build file.
// Contract with Dart: window.__update.subscribe(cb) with cb(kind, value):
//   'waiting' <version>  ('<build hash>|<app version>' from a worker that knows it) a fully installed (hash-verified) new worker is waiting; never fired for a failed install
//   'gone'    ''         that waiting worker was replaced or dropped
//   'swapped' ''         the new worker took over (this tab asked for it, or another tab did); no reload happens here
// window.__update.apply() asks the waiting worker to skipWaiting; window.__update.reload() reloads once (loop guard).
(function () {
  if (!('serviceWorker' in navigator)) return;
  const sw = navigator.serviceWorker;
  const THROTTLE_MS = 30 * 60 * 1000;
  const CHECK_KEY = 'novel-viewer:update-check';
  const RELOAD_KEY = 'novel-viewer:update-reload';
  const DISMISS_KEY = 'novel-viewer:update-dismissed';
  const RAN_KEY = 'novel-viewer:ran-version';
  const FRESH_KEY = 'novel-viewer:fresh-install';
  const RELOAD_GUARD_MS = 20 * 1000;
  // A tab that started without a controller (first visit, hard reload) must not reload on the first claim.
  const hadController = !!sw.controller;
  // A visit with no sign of an earlier install writes the fresh-install sentinel right now, before registration or
  // check() write anything, so a first visit cut short before the app stored its version is not taken for an
  // upgrade by the next load. v0.2.10 users never get the sentinel; their earlier install shows as above.
  const hadInstall = (() => {
    try {
      const fresh = localStorage.getItem(FRESH_KEY) !== null;
      const earlier = hadController || localStorage.getItem(CHECK_KEY) !== null;
      if (!earlier && !fresh) localStorage.setItem(FRESH_KEY, '1');
      return earlier && !fresh;
    } catch (e) {
      return hadController;
    }
  })();
  let reg = null;
  let listener = null;
  let waiting = null; // the announced worker
  let version = null;
  let swapped = false;
  let lastCheck = 0;

  const emit = (kind, value) => {
    if (!listener) return;
    try {
      listener(kind, value || '');
    } catch (e) {}
  };

  // The worker answers with its VERSION; without an answer (an older worker) the script URL stands in.
  const versionOf = (worker) =>
    new Promise((resolve) => {
      const fallback = setTimeout(() => resolve('unknown'), 2000);
      try {
        const ch = new MessageChannel();
        ch.port1.onmessage = (e) => {
          clearTimeout(fallback);
          resolve(String(e.data));
        };
        worker.postMessage({ type: 'GET_VERSION' }, [ch.port2]);
      } catch (e) {
        clearTimeout(fallback);
        resolve('unknown');
      }
    });

  const announce = async () => {
    const w = reg && reg.waiting;
    // No controller = first install: nothing to replace, so nothing to announce.
    if (!w || !sw.controller || w === waiting) return;
    const v = await versionOf(w);
    if (reg.waiting !== w) return;
    waiting = w;
    version = v;
    w.addEventListener('statechange', () => {
      if (w.state === 'redundant' && waiting === w) {
        waiting = null;
        emit('gone');
      }
    });
    emit('waiting', v);
  };

  const readStamp = () => {
    try {
      return Number(localStorage.getItem(CHECK_KEY)) || lastCheck;
    } catch (e) {
      return lastCheck;
    }
  };
  const writeStamp = (t) => {
    lastCheck = t;
    try {
      localStorage.setItem(CHECK_KEY, String(t));
    } catch (e) {}
  };

  // About once per 30 min across all tabs. A failed install is retried by the next check after that.
  const check = () => {
    if (!reg) return;
    const now = Date.now();
    const last = readStamp();
    if (now >= last && now - last < THROTTLE_MS) return;
    writeStamp(now);
    reg.update().catch(() => {});
  };

  // Never reloads by itself: Dart decides (own button: reload; another tab swapped: tell the user).
  const swap = () => {
    if (swapped) return;
    swapped = true;
    emit('swapped');
  };

  // Reloads once. A second reload within the guard window (a loop) is refused.
  const reload = () => {
    try {
      const last = Number(sessionStorage.getItem(RELOAD_KEY)) || 0;
      const now = Date.now();
      if (now >= last && now - last < RELOAD_GUARD_MS) return false;
      sessionStorage.setItem(RELOAD_KEY, String(now));
    } catch (e) {}
    location.reload();
    return true;
  };

  sw.addEventListener('controllerchange', () => {
    if (hadController) swap();
  });

  const tracked = new WeakSet();
  const track = (w) => {
    if (!w || tracked.has(w)) return;
    tracked.add(w);
    const done = () => {
      if (w.state === 'installed') announce();
    };
    w.addEventListener('statechange', done);
    done(); // an installer that is already past 'installing' when we look
  };

  window.__updateWatch = (r) => {
    if (reg === r) return; // a retried registration returns the same object
    reg = r;
    announce();
    track(r.installing); // an install already under way
    r.addEventListener('updatefound', () => track(r.installing));
    check(); // launch
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') check();
  });

  window.__update = {
    subscribe(cb) {
      listener = cb;
      if (waiting && reg && reg.waiting === waiting) cb('waiting', version);
      if (swapped) cb('swapped', '');
    },
    // true when the waiting worker was asked to take over
    apply() {
      const w = reg && reg.waiting;
      if (!w) return false;
      // iOS standalone sometimes never fires controllerchange; the worker reaching 'activated' is the same fact.
      w.addEventListener('statechange', () => {
        if (w.state === 'activated') swap();
      });
      w.postMessage({ type: 'SKIP_WAITING' });
      return true;
    },
    reload,
    // True when an earlier install (v0.2.10 or older, which stored no version) existed before this page load: a
    // worker already controlled the page, or v0.2.10's update-check stamp existed, and this was not a fresh visit
    // (fresh-install sentinel). Captured before registration and before any write of this start.
    hadInstall: () => hadInstall,
    // The app version this origin last ran; '' = none stored. localStorage is per origin and per storage container:
    // tabs of one browser share it, but the iOS Home Screen app has its own, isolated from Safari.
    lastVersion() {
      try {
        return localStorage.getItem(RAN_KEY) || '';
      } catch (e) {
        return '';
      }
    },
    setLastVersion(v) {
      try {
        localStorage.setItem(RAN_KEY, v);
      } catch (e) {}
    },
    // versions whose notice was closed in this tab; sessionStorage survives a refresh but not a new tab/session
    dismissed() {
      try {
        return sessionStorage.getItem(DISMISS_KEY) || '[]';
      } catch (e) {
        return '[]';
      }
    },
    dismiss(v) {
      try {
        const l = JSON.parse(sessionStorage.getItem(DISMISS_KEY) || '[]');
        if (!l.includes(v)) l.push(v);
        sessionStorage.setItem(DISMISS_KEY, JSON.stringify(l));
      } catch (e) {}
    },
  };
})();
