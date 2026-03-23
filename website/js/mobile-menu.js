/**
 * LoreMarkets — Mobile Menu + Live Oracle Ticker
 * Carl (UX/UI) + Yosuf (Dev) · March 2026
 *
 * Features:
 *   1. Mobile hamburger menu open/close
 *   2. Live Oracle ticker from LoreMarkets API
 *   3. Lock body scroll when menu open
 *   4. ESC key closes menu
 *   5. Active page highlighting in mobile menu
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════
  // 1. MOBILE HAMBURGER MENU
  // ═══════════════════════════════════════════════════════

  const overlay   = document.getElementById('mobileMenuOverlay');
  const navToggle = document.getElementById('navToggle');
  const closeBtn  = document.getElementById('mobileMenuClose');

  if (!overlay) return; // guard — menu HTML not on page

  // Expose close function globally (used in onclick attributes)
  window.closeMobileMenu = function () {
    overlay.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  };

  function openMobileMenu() {
    overlay.classList.add('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    // Focus the close button for accessibility
    setTimeout(() => { if (closeBtn) closeBtn.focus(); }, 100);
  }

  // Hamburger toggle button
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = overlay.classList.contains('open');
      if (isOpen) {
        window.closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close button inside the panel
  if (closeBtn) {
    closeBtn.addEventListener('click', window.closeMobileMenu);
  }

  // Click on the backdrop (outside the panel) closes the menu
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      window.closeMobileMenu();
    }
  });

  // ESC key closes menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      window.closeMobileMenu();
      if (navToggle) navToggle.focus();
    }
  });

  // Mark active page in mobile menu
  (function markActiveMobilePage() {
    const currentPath = window.location.pathname;
    const menuLinks = overlay.querySelectorAll('.mobile-menu-nav-link');

    menuLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Normalise paths for comparison
      const linkPath = new URL(href, window.location.href).pathname;

      // Match exact page or parent directory
      if (
        currentPath === linkPath ||
        (linkPath !== '/' && currentPath.startsWith(linkPath))
      ) {
        link.classList.add('active-page');
      }
    });
  })();


  // ═══════════════════════════════════════════════════════
  // 2. TICKER PRICES
  // Live price updates are handled by enhancements.js which
  // owns the seamless marquee loop and RAF animation.
  // This file only handles oracle narrative event injection.
  // ═══════════════════════════════════════════════════════

  const API_BASE = 'https://api.loremarkets.ai';


  // ═══════════════════════════════════════════════════════
  // 3. ORACLE API — Live event feed in ticker
  // Pulls active Oracle prophecies and adds to ticker
  // ═══════════════════════════════════════════════════════

  async function fetchOracleEvents() {
    try {
      const res = await fetch(`${API_BASE}/api/oracle`, {
        signal: AbortSignal.timeout(5000),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const events = Array.isArray(data) ? data : (data.events || data.data || []);

      if (!events.length) return;

      injectOracleEvents(events);
    } catch (err) {
      console.debug('[LoreMarkets] Oracle events fetch failed:', err.message);
    }
  }

  function injectOracleEvents(events) {
    const track = document.getElementById('tickerTrack');
    if (!track) return;

    // Take up to 3 active oracle events to inject
    const liveEvents = events.slice(0, 3);

    liveEvents.forEach((ev) => {
      const phase     = (ev.phase || ev.status || 'whisper').toUpperCase();
      const text      = ev.summary || ev.text || ev.title || '';
      const phaseClass = `ticker-item__phase--${phase.toLowerCase()}`;

      const el = document.createElement('span');
      el.className = 'ticker-item ticker-item--live';
      el.innerHTML = `<span class="ticker-item__phase ${phaseClass}">${phase}</span>&nbsp;· ${text}`;

      // Prepend live events to the ticker
      track.insertBefore(el, track.firstChild);
    });
  }

  // Fetch oracle events on load
  fetchOracleEvents();

})();
