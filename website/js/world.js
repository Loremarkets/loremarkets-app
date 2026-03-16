/**
 * LoreMarkets — World of Eldenmoor JavaScript
 * Lore card mouse-tracking glow · Reveal observer · Particle field init
 *
 * Carl (UX/UI) · Yosuf (Dev) — Season I
 */

(function () {
  'use strict';

  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ═══════════════════════════════════════
  // 1. LORE CARD — mouse tracking radial glow
  // ═══════════════════════════════════════
  if (!REDUCED_MOTION) {
    document.querySelectorAll('.lore-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
        const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
        card.style.setProperty('--mx', `${x}%`);
        card.style.setProperty('--my', `${y}%`);
      });
    });
  }

  // ═══════════════════════════════════════
  // 2. INTERSECTION OBSERVER — scroll reveals
  // ═══════════════════════════════════════
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // ═══════════════════════════════════════
  // 3. ORACLE ACTS — staggered entrance
  // ═══════════════════════════════════════
  const actsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const acts = entry.target.querySelectorAll('.oracle-act');
        acts.forEach((act, i) => {
          setTimeout(() => {
            act.style.opacity    = '1';
            act.style.transform  = 'translateY(0)';
          }, i * 180);
        });
        actsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const oracleActsSection = document.querySelector('.oracle-acts');
  if (oracleActsSection && !REDUCED_MOTION) {
    oracleActsSection.querySelectorAll('.oracle-act').forEach((act) => {
      act.style.opacity    = '0';
      act.style.transform  = 'translateY(20px)';
      act.style.transition = 'opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)';
    });
    actsObserver.observe(oracleActsSection);
  }

  // ═══════════════════════════════════════
  // 4. LORE GRID — staggered entrance
  // ═══════════════════════════════════════
  const loreGridObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.lore-card');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity   = '1';
            card.style.transform = 'translateY(0)';
          }, i * 80);
        });
        loreGridObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  const loreGrid = document.querySelector('.lore-grid');
  if (loreGrid && !REDUCED_MOTION) {
    loreGrid.querySelectorAll('.lore-card').forEach((card) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(28px)';
      card.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease';
    });
    loreGridObserver.observe(loreGrid);
  }

  // ═══════════════════════════════════════
  // 5. MARKETS PREVIEW — staggered entrance
  // ═══════════════════════════════════════
  const marketsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.market-preview-card');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity   = '1';
            card.style.transform = 'translateY(0)';
          }, i * 120);
        });
        marketsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const marketsPreview = document.querySelector('.markets-preview');
  if (marketsPreview && !REDUCED_MOTION) {
    marketsPreview.querySelectorAll('.market-preview-card').forEach((card) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(32px)';
      card.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease';
    });
    marketsObserver.observe(marketsPreview);
  }

  // ═══════════════════════════════════════
  // 6. NAV — scroll darken
  // ═══════════════════════════════════════
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.background = window.pageYOffset > 60
        ? 'rgba(6, 0, 15, 0.97)'
        : 'rgba(6, 0, 15, 0.85)';
    }, { passive: true });
  }

  // ═══════════════════════════════════════
  // 7. MOBILE NAV
  // ═══════════════════════════════════════
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ═══════════════════════════════════════
  // 8. DIVIDER LINES — animate on entry
  // ═══════════════════════════════════════
  if (!REDUCED_MOTION) {
    const dividerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lines = entry.target.querySelectorAll('.world-divider__line');
          lines.forEach((line, i) => {
            setTimeout(() => {
              line.style.opacity   = '1';
              line.style.transform = 'scaleX(1)';
            }, i * 100);
          });
          dividerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.world-divider').forEach((div) => {
      div.querySelectorAll('.world-divider__line').forEach((line) => {
        line.style.opacity   = '0';
        line.style.transform = 'scaleX(0)';
        line.style.transformOrigin = 'left center';
        line.style.transition = 'opacity 0.7s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)';
      });
      dividerObserver.observe(div);
    });
  }

})();
