/**
 * LoreMarkets — Website JavaScript
 * Carl (UX/UI) + Yosuf (Dev) — Full interaction layer
 *
 * Features:
 *   1. ParticleField — ambient background motes
 *   2. Cursor ambient glow — follows mouse, very subtle
 *   3. Scroll Reveal — blur-to-sharp entrance
 *   4. Stat counters — count up on entrance
 *   5. Live price ticker — fake live prices on asset cards
 *   6. Card magnetic tilt — subtle 3D hover on cards
 *   7. Oracle feed slide-in — sequential entrance animation
 *   8. Code block typewriter — line-by-line reveal
 *   9. FAQ accordion
 *  10. Mobile navigation
 *  11. Nav scroll behaviour
 *  12. Active section tracking
 */

(function () {
  'use strict';


  // ═══════════════════════════════════════════════════════
  // 1. PARTICLE FIELD — Ley-line motes
  // ═══════════════════════════════════════════════════════

  (function initParticleField() {
    const canvas = document.getElementById('particleField');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');
    const COUNT = 55;
    const COLORS = [
      { r: 245, g: 192, b: 48  },  // Gold  — 36%
      { r: 0,   g: 236, b: 214 },  // Teal  — 44%
      { r: 128, g: 80,  b: 208 },  // Violet — 20%
    ];

    function pickColor() {
      const r = Math.random();
      if (r < 0.36) return COLORS[0];
      if (r < 0.80) return COLORS[1];
      return COLORS[2];
    }

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const particles = Array.from({ length: COUNT }, () => ({
      x:           Math.random() * window.innerWidth,
      y:           Math.random() * window.innerHeight,
      r:           0.4 + Math.random() * 2.2,
      baseOpacity: 0.06 + Math.random() * 0.16,
      speedX:      (Math.random() - 0.5) * 0.14,
      speedY:      (Math.random() - 0.5) * 0.14,
      phase:       Math.random() * Math.PI * 2,
      twinkleRate: 0.004 + Math.random() * 0.006,
      color:       pickColor(),
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < -6)                p.x = canvas.width + 6;
        if (p.x > canvas.width + 6)  p.x = -6;
        if (p.y < -6)                p.y = canvas.height + 6;
        if (p.y > canvas.height + 6) p.y = -6;
        p.phase += p.twinkleRate;
        const opacity = p.baseOpacity * (0.6 + 0.4 * Math.sin(p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${opacity})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  })();


  // ═══════════════════════════════════════════════════════
  // 2. CURSOR AMBIENT GLOW
  // ═══════════════════════════════════════════════════════

  (function initCursorGlow() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return; // desktop only

    const glow = document.createElement('div');
    glow.id = 'cursorGlow';
    document.body.appendChild(glow);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX  = mouseX;
    let glowY  = mouseY;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function animate() {
      glowX += (mouseX - glowX) * 0.07;
      glowY += (mouseY - glowY) * 0.07;
      glow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
      requestAnimationFrame(animate);
    }
    animate();
  })();


  // ═══════════════════════════════════════════════════════
  // 3. SCROLL REVEAL — IntersectionObserver
  // ═══════════════════════════════════════════════════════

  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }


  // ═══════════════════════════════════════════════════════
  // 4. STAT COUNTERS — count up on entrance
  // ═══════════════════════════════════════════════════════

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCount(el, target, duration) {
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const val = Math.round(easeOutCubic(t) * target);
      el.textContent = val.toLocaleString();
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('[data-counter]');
  if (counterEls.length && 'IntersectionObserver' in window) {
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.getAttribute('data-counter'), 10);
          const dur    = 1600 + target * 0.4; // longer for larger numbers
          setTimeout(() => animateCount(el, target, Math.min(dur, 2400)), 200);
          counterIO.unobserve(el);
        }
      });
    }, { threshold: 0.6 });
    counterEls.forEach((el) => counterIO.observe(el));
  }


  // ═══════════════════════════════════════════════════════
  // 5. LIVE PRICE TICKER — fake live prices on asset cards
  // ═══════════════════════════════════════════════════════

  const priceEls = document.querySelectorAll('[data-base-price]');

  priceEls.forEach((el) => {
    const base = parseFloat(el.getAttribute('data-base-price'));
    const vol  = parseFloat(el.getAttribute('data-volatility') || '0.004');
    let current = base;
    let started = false;

    // Start ticking only after card is visible
    const priceIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          tick();
          priceIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    priceIO.observe(el);

    function format(n) {
      return n >= 1000
        ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : n.toFixed(2);
    }

    function tick() {
      const delta  = (Math.random() - 0.49) * vol * current; // slight upward bias
      const prev   = current;
      current = Math.max(base * 0.85, Math.min(base * 1.20, current + delta));

      el.textContent = format(current);

      // Flash colour
      el.classList.remove('price-up', 'price-down');
      void el.offsetWidth; // force reflow to restart animation
      el.classList.add(current >= prev ? 'price-up' : 'price-down');

      const delay = 2200 + Math.random() * 3800;
      setTimeout(tick, delay);
    }
  });


  // ═══════════════════════════════════════════════════════
  // 6. CARD MAGNETIC TILT — 3D hover on cards
  // ═══════════════════════════════════════════════════════

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth > 768) {
    const tiltCards = document.querySelectorAll('.feature-card, .asset-card');

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5; // –0.5 → 0.5
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        const rotX = y * -7;
        const rotY = x *  7;
        card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;
        card.style.transition = 'transform 0.08s linear';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.transition = 'transform 0.5s var(--ease-out), border-color 0.3s, box-shadow 0.3s';
      });
    });
  }


  // ═══════════════════════════════════════════════════════
  // 7. ORACLE FEED — sequential slide-in on scroll
  // ═══════════════════════════════════════════════════════

  (function initOracleFeed() {
    const feed = document.querySelector('.oracle__feed');
    if (!feed) return;

    const events = feed.querySelectorAll('.oracle__event');
    events.forEach((ev) => {
      ev.style.opacity   = '0';
      ev.style.transform = 'translateX(-14px)';
    });

    const oracleIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          events.forEach((ev, i) => {
            setTimeout(() => {
              ev.style.transition = 'opacity 0.65s var(--ease-out), transform 0.65s var(--ease-out)';
              ev.style.opacity    = '1';
              ev.style.transform  = 'translateX(0)';
            }, 150 + i * 260);
          });
          oracleIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    oracleIO.observe(feed);
  })();


  // ═══════════════════════════════════════════════════════
  // 8. CODE BLOCK — typewriter reveal (clip-path sweep)
  // ═══════════════════════════════════════════════════════

  (function initCodeReveal() {
    const codeBlock = document.querySelector('.code-block');
    if (!codeBlock) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const pre = codeBlock.querySelector('pre');
    if (!pre) return;

    pre.classList.add('code-pre--hidden');

    const codeIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            pre.classList.remove('code-pre--hidden');
            pre.classList.add('code-pre--typing');
          }, 350);
          codeIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    codeIO.observe(codeBlock);
  })();


  // ═══════════════════════════════════════════════════════
  // 9. FAQ ACCORDION
  // ═══════════════════════════════════════════════════════

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-item__question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });


  // ═══════════════════════════════════════════════════════
  // 10. MOBILE NAVIGATION
  // ═══════════════════════════════════════════════════════

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


  // ═══════════════════════════════════════════════════════
  // 11. SMOOTH SCROLL
  // ═══════════════════════════════════════════════════════

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
      }
    });
  });


  // ═══════════════════════════════════════════════════════
  // 12. NAV — scroll darken + active section tracking
  // ═══════════════════════════════════════════════════════

  const nav        = document.querySelector('.nav');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');
  const sections   = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Darken nav on scroll
    if (nav) {
      nav.style.background = window.pageYOffset > 60
        ? 'rgba(6, 0, 15, 0.97)'
        : 'rgba(6, 0, 15, 0.85)';
    }

    // Active section highlight
    let current = '';
    sections.forEach((sec) => {
      if (window.pageYOffset >= sec.offsetTop - 140) {
        current = sec.getAttribute('id');
      }
    });

    navAnchors.forEach((a) => {
      a.classList.remove('nav__link--active');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('nav__link--active');
      }
    });
  }, { passive: true });

})();


// ═══════════════════════════════════════════════════════
// EMAIL FORM — Supabase waitlist integration
// ═══════════════════════════════════════════════════════

const _SB_URL  = 'https://cwqqnoupqbxfnvpsavua.supabase.co';
const _SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3cXFub3VwcWJ4Zm52cHNhdnVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDIxMzIsImV4cCI6MjA4ODgxODEzMn0.2h4pN8kN2h4eDxKUj3YRSUes04bHjGBjGe06jYWvI0g';

async function handleSubmit(e) {
  e.preventDefault();

  const form      = document.getElementById('emailForm');
  const success   = document.getElementById('formSuccess');
  const errorEl   = document.getElementById('formError');
  const btn       = form.querySelector('button[type="submit"]');
  const emailEl   = document.getElementById('emailInput');
  const nameEl    = document.getElementById('nameInput');
  const typeEl    = document.getElementById('userTypeInput');

  // Detect source page
  const source = window.location.pathname.includes('coming-soon') ? 'coming-soon' : 'index';

  // Loading state
  const originalText   = btn.textContent;
  btn.disabled         = true;
  btn.textContent      = 'Entering the ledger…';
  if (errorEl) errorEl.style.display = 'none';

  try {
    const payload = {
      email:     (emailEl?.value || '').trim(),
      name:      (nameEl?.value  || '').trim() || null,
      user_type: typeEl?.value   || null,
      source,
    };

    const res = await fetch(`${_SB_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'apikey':        _SB_ANON,
        'Authorization': `Bearer ${_SB_ANON}`,
        'Content-Type':  'application/json',
        'Prefer':        'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      // Success
      form.style.display    = 'none';
      success.style.display = 'block';
    } else if (res.status === 409) {
      // Duplicate email — still a win
      form.style.display    = 'none';
      success.textContent   = 'You\'re already on the list. The Oracle remembers.';
      success.style.display = 'block';
    } else {
      const body = await res.text();
      throw new Error(`HTTP ${res.status}: ${body}`);
    }
  } catch (err) {
    console.error('[LoreMarkets] Waitlist submission failed:', err);
    btn.disabled    = false;
    btn.textContent = originalText;
    if (errorEl) errorEl.style.display = 'block';
  }

  return false;
}
