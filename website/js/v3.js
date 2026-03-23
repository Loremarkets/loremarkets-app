/**
 * LoreMarkets — v3.0 JavaScript
 * Storytelling-First · Multi-Page · Mobile-First
 *
 * Yosuf (Dev) · Carl (UX/UI) — Full Rebuild Plan v3.0 · March 2026
 *
 * Features:
 *   1.  Oracle Ambient Pulse Bar — disappears into nav on scroll
 *   2.  Oracle Whisper — fade in, hold, settle to ambient
 *   3.  Bottom Tab Bar — active state, More drawer
 *   4.  Page Transition — gold shimmer via View Transitions API
 *   5.  Asset card tap-expand (oracle line reveal)
 *   6.  Three-act timeline — interactive expand/collapse
 *   7.  Season level accordion
 *   8.  Code block copy buttons
 *   9.  Oracle feed polling (placeholder — connects to /api/oracle)
 *  10.  Particle field — mobile count reduction
 */

(function () {
  'use strict';

  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IS_MOBILE      = window.innerWidth < 768;


  // ═══════════════════════════════════════════════════════
  // 1. ORACLE AMBIENT PULSE BAR
  // Hides when nav is reached by scroll.
  // ═══════════════════════════════════════════════════════

  (function initOraclePulseBar() {
    const bar = document.querySelector('.oracle-pulse-bar');
    if (!bar) return;

    const nav = document.querySelector('.nav');
    let lastY = 0;

    window.addEventListener('scroll', () => {
      const y = window.pageYOffset;
      if (nav) {
        const navBottom = nav.getBoundingClientRect().bottom + y;
        bar.classList.toggle('hidden', y > 20);
      } else {
        bar.classList.toggle('hidden', y > 20);
      }
      lastY = y;
    }, { passive: true });
  })();


  // ═══════════════════════════════════════════════════════
  // 2. ORACLE WHISPER ANIMATION
  // Fade in over 0.8s → hold at full opacity 4s → settle
  // to 20% opacity permanently. Not dismissible.
  // ═══════════════════════════════════════════════════════

  (function initOracleWhisper() {
    const whisper = document.querySelector('.oracle-whisper');
    if (!whisper) return;

    if (REDUCED_MOTION) {
      whisper.style.opacity = '0.20';
      return;
    }

    // Delay slightly so page entrance settles first
    setTimeout(() => {
      whisper.classList.add('whisper-in');
      setTimeout(() => {
        whisper.classList.remove('whisper-in');
        whisper.classList.add('whisper-settle');
      }, 4800); // 0.8s fade-in + 4s hold
    }, 1200);
  })();


  // ═══════════════════════════════════════════════════════
  // 3. BOTTOM TAB BAR
  // Active state by current pathname. More drawer toggle.
  // ═══════════════════════════════════════════════════════

  (function initBottomTabBar() {
    const tabBar = document.querySelector('.bottom-tab-bar');
    if (!tabBar) return;

    // Set active tab from current page
    const path = window.location.pathname;
    const tabs = tabBar.querySelectorAll('.bottom-tab-bar__tab[data-page]');

    tabs.forEach((tab) => {
      const page = tab.getAttribute('data-page');
      let isActive = false;

      if (page === 'home' && (path === '/' || path.endsWith('/index.html') || path === '')) {
        isActive = true;
      } else if (page === 'oracle' && path.includes('/oracle')) {
        isActive = true;
      } else if (page === 'season' && path.includes('/season')) {
        isActive = true;
      } else if (page === 'build' && path.includes('/build')) {
        isActive = true;
      }

      if (isActive) tab.classList.add('active');
    });

    // More drawer
    const moreBtn   = tabBar.querySelector('.bottom-tab-bar__more-btn');
    const drawer    = document.querySelector('.bottom-tab-more-drawer');
    const overlay   = document.getElementById('drawerOverlay');

    if (moreBtn && drawer) {
      let drawerOpen = false;

      function openDrawer() {
        drawerOpen = true;
        drawer.classList.add('open');
        moreBtn.setAttribute('aria-expanded', 'true');
        if (overlay) overlay.style.display = 'block';
      }

      function closeDrawer() {
        drawerOpen = false;
        drawer.classList.remove('open');
        moreBtn.setAttribute('aria-expanded', 'false');
        if (overlay) overlay.style.display = 'none';
      }

      moreBtn.addEventListener('click', () => {
        drawerOpen ? closeDrawer() : openDrawer();
      });

      // Close on outside tap
      document.addEventListener('click', (e) => {
        if (drawerOpen && !drawer.contains(e.target) && !moreBtn.contains(e.target)) {
          closeDrawer();
        }
      });

      // Close on link click
      drawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeDrawer);
      });
    }
  })();


  // ═══════════════════════════════════════════════════════
  // 4. PAGE TRANSITIONS — CSS View Transitions API
  // Gold shimmer when navigating between pages.
  // Progressive enhancement — falls back to instant.
  // ═══════════════════════════════════════════════════════

  (function initPageTransitions() {
    if (!document.startViewTransition) return;
    if (REDUCED_MOTION) return;

    // Intercept internal link clicks
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // Only internal, non-anchor links
      if (!href || href.startsWith('#') || href.startsWith('http') ||
          href.startsWith('mailto') || anchor.hasAttribute('target')) return;

      e.preventDefault();
      document.startViewTransition(() => {
        window.location.assign(href);
      });
    });
  })();


  // ═══════════════════════════════════════════════════════
  // 5. ASSET CARD TAP-EXPAND (Oracle line reveal)
  // Tap/click asset card to toggle oracle line.
  // ═══════════════════════════════════════════════════════

  (function initAssetCardExpand() {
    const cards = document.querySelectorAll('.asset-card[data-oracle-line]');
    cards.forEach((card) => {
      // Inject oracle line HTML if not already present
      if (!card.querySelector('.asset-card__oracle-line')) {
        const oracleLine = document.createElement('div');
        oracleLine.className = 'asset-card__oracle-line';
        oracleLine.innerHTML = `<span style="color:rgba(245,192,48,0.45);font-size:10px;letter-spacing:0.12em;text-transform:uppercase;font-family:var(--font-mono);font-style:normal;">◈ Oracle · Season I</span><br><em>${card.getAttribute('data-oracle-line')}</em>`;
        card.appendChild(oracleLine);
      }

      card.addEventListener('click', () => {
        card.classList.toggle('expanded');
      });

      // Keyboard accessibility
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('expanded');
        }
      });
    });
  })();


  // ═══════════════════════════════════════════════════════
  // 6. THREE-ACT TIMELINE — Interactive expand/collapse
  // Click/tap an act card to expand its oracle dispatch.
  // First act is expanded by default.
  // ═══════════════════════════════════════════════════════

  (function initThreeActs() {
    const actCards    = document.querySelectorAll('.act-card');
    const connectors  = document.querySelectorAll('.three-acts__connector-line');

    if (!actCards.length) return;

    function activate(index) {
      actCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
      });
      // Fill connectors up to active index
      connectors.forEach((c, i) => {
        c.classList.toggle('filled', i < index);
      });
    }

    actCards.forEach((card, i) => {
      card.addEventListener('click', () => activate(i));
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate(i);
        }
      });
    });

    // Activate first by default
    activate(0);
  })();


  // ═══════════════════════════════════════════════════════
  // 7. SEASON LEVEL ACCORDION
  // ═══════════════════════════════════════════════════════

  (function initSeasonLevels() {
    const levels = document.querySelectorAll('.season-level');

    levels.forEach((level, i) => {
      const header = level.querySelector('.season-level__header');
      const body   = level.querySelector('.season-level__body');
      if (!header || !body) return;

      // Default: first level open
      if (i > 0) {
        body.style.display = 'none';
        header.setAttribute('aria-expanded', 'false');
      } else {
        header.setAttribute('aria-expanded', 'true');
      }

      header.addEventListener('click', () => {
        const isOpen = body.style.display !== 'none';
        body.style.display = isOpen ? 'none' : 'block';
        header.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });

      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    });
  })();


  // ═══════════════════════════════════════════════════════
  // 8. CODE BLOCK COPY BUTTONS
  // ═══════════════════════════════════════════════════════

  (function initCopyButtons() {
    const buttons = document.querySelectorAll('.code-block-v3__copy');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const block = btn.closest('.code-block-v3');
        const pre   = block && block.querySelector('pre');
        if (!pre) return;

        navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
          const orig = btn.textContent;
          btn.textContent = 'Copied ✓';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = orig;
            btn.classList.remove('copied');
          }, 2000);
        }).catch(() => {
          // Fallback: select text
          const range = document.createRange();
          range.selectNodeContents(pre);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        });
      });
    });
  })();


  // ═══════════════════════════════════════════════════════
  // 9. ORACLE FEED POLLING
  // Fetches live oracle events from /api/oracle.
  // Falls back gracefully if API is unavailable.
  // ═══════════════════════════════════════════════════════

  (function initOracleFeedLive() {
    const feedContainer = document.getElementById('oracleFeedLive');
    if (!feedContainer) return;

    const API_BASE = 'https://api.loremarkets.ai';

    async function fetchFeed() {
      try {
        const res = await fetch(`${API_BASE}/api/oracle`, {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        renderFeed(data);
      } catch (err) {
        // Keep placeholder content — don't crash the page
        console.debug('[LoreMarkets] Oracle feed unavailable:', err.message);
      }
    }

    function renderFeed(events) {
      if (!events || !events.length) return;
      feedContainer.innerHTML = '';
      events.forEach((ev) => {
        const phaseClass = `oracle-event-card--${(ev.phase || 'whisper').toLowerCase()}`;
        const tickers = (ev.markets || []).map(t =>
          `<span class="oracle-event-card__ticker-tag">${t}</span>`
        ).join('');
        const timeAgo = ev.issued_at ? formatTimeAgo(ev.issued_at) : 'Recently';

        feedContainer.insertAdjacentHTML('beforeend', `
          <div class="oracle-event-card ${phaseClass}">
            <div class="oracle-event-card__header">
              <span class="oracle-event-card__phase">${ev.phase || 'Whisper'}</span>
              <div class="oracle-event-card__tickers">${tickers}</div>
            </div>
            <p class="oracle-event-card__body">"${ev.text || ev.content || ''}"</p>
            <div class="oracle-event-card__footer">
              <span>${timeAgo}</span>
              ${ev.episode ? `<span>Episode ${ev.episode}</span>` : ''}
              ${ev.chapter ? `<span>Chapter ${ev.chapter}</span>` : ''}
            </div>
          </div>
        `);
      });
    }

    function formatTimeAgo(isoString) {
      const diff = Date.now() - new Date(isoString).getTime();
      const mins  = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      if (mins  < 2)   return 'Just now';
      if (hours < 1)   return `${mins} minutes ago`;
      if (hours < 24)  return `${hours} hour${hours === 1 ? '' : 's'} ago`;
      return `${Math.floor(hours/24)} day${Math.floor(hours/24) === 1 ? '' : 's'} ago`;
    }

    fetchFeed();
    // Poll every 90 seconds
    setInterval(fetchFeed, 90000);
  })();


  // ═══════════════════════════════════════════════════════
  // 10. PARTICLE FIELD — mobile particle count reduction
  // Overrides the COUNT in main.js for mobile devices.
  // Must run BEFORE main.js — but since it's loaded after,
  // we patch the canvas after init by reducing draw density.
  // ═══════════════════════════════════════════════════════

  // Mobile particle reduction is handled by the modified canvas init
  // in main.js via data attribute. On mobile (<640px) we target 25 particles.
  // No changes needed here — handled declaratively.


  // ═══════════════════════════════════════════════════════
  // NAV: mark active page link
  // ═══════════════════════════════════════════════════════

  (function markActiveNavLink() {
    const path  = window.location.pathname;
    const links = document.querySelectorAll('.nav__links a');

    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Normalise: strip trailing slash
      const normHref = href.replace(/\/$/, '');
      const normPath = path.replace(/\/$/, '');

      let isActive = false;
      if (normHref === '' && (normPath === '' || normPath.endsWith('index.html'))) {
        isActive = false; // don't mark home as active on sub-pages
      } else if (normHref && normPath.includes(normHref) && normHref !== '' && normHref !== '/') {
        isActive = true;
      }

      if (isActive) link.classList.add('nav__link--page-active');
    });
  })();


  // ═══════════════════════════════════════════════════════
  // DRAWER OVERLAY (tappable backdrop)
  // ═══════════════════════════════════════════════════════

  (function createDrawerOverlay() {
    if (window.innerWidth >= 768) return; // desktop only in theory
    const overlay = document.createElement('div');
    overlay.id    = 'drawerOverlay';
    overlay.style.cssText = `
      position: fixed; inset: 0;
      background: rgba(6,0,15,0.7);
      z-index: ${199};
      display: none;
      backdrop-filter: blur(2px);
    `;
    document.body.appendChild(overlay);
  })();

})();


// ═══════════════════════════════════════════════════════════════
// LIVE ASSET PRICES — Yosuf: wire /api/markets/arcane/assets
// Falls back gracefully to the existing fake price simulator.
// ═══════════════════════════════════════════════════════════════

(function initLivePrices() {
  const priceCards = document.querySelectorAll('.asset-card');
  if (!priceCards.length) return;

  const API_BASE = 'https://api.loremarkets.ai';

  function formatPrice(n) {
    return n >= 1000
      ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : n.toFixed(2);
  }

  function flashPrice(el, prev, next) {
    el.classList.remove('price-up', 'price-down');
    void el.offsetWidth; // reflow to restart CSS animation
    el.classList.add(next >= prev ? 'price-up' : 'price-down');
  }

  async function fetchAndUpdate() {
    try {
      const res = await fetch(`${API_BASE}/api/markets/arcane/assets`, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const body = await res.json();
      // Normalise response shape — API may return { assets: [...] } or flat array
      const assets = Array.isArray(body) ? body : (body.assets || body.data || []);

      assets.forEach((asset) => {
        const ticker = (asset.ticker || asset.symbol || '').toUpperCase();
        if (!ticker) return;

        // Find the card whose symbol matches
        const card = Array.from(priceCards).find((c) => {
          const sym = c.querySelector('.asset-card__symbol');
          return sym && sym.textContent.trim() === ticker;
        });
        if (!card) return;

        const priceEl = card.querySelector('.asset-card__price');
        if (!priceEl) return;

        const newPrice = parseFloat(asset.price ?? asset.last_price ?? asset.current_price);
        if (isNaN(newPrice) || newPrice <= 0) return;

        const prevPrice = parseFloat(priceEl.getAttribute('data-base-price')) || newPrice;

        // Update DOM
        priceEl.textContent = formatPrice(newPrice);
        priceEl.setAttribute('data-base-price', newPrice);

        flashPrice(priceEl, prevPrice, newPrice);

        // Sync the volatility if the API provides it
        if (asset.volatility != null) {
          priceEl.setAttribute('data-volatility', asset.volatility);
        }
      });

      // Mark exchange page as "live" for any status indicators
      const liveIndicator = document.getElementById('pricesLiveIndicator');
      if (liveIndicator) liveIndicator.style.display = 'flex';

    } catch (err) {
      // Silent fallback — the existing [data-base-price] fake ticker (in main.js) keeps running
      if (err.name !== 'AbortError') {
        console.info('[LoreMarkets] Live prices unavailable — using simulated feed.', err.message);
      }
    }
  }

  // Fetch on load, then refresh every 30 s
  fetchAndUpdate();
  setInterval(fetchAndUpdate, 30_000);
})();
