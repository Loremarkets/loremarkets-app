/**
 * LoreMarkets — Enhancement JavaScript
 * Oracle Ticker Tape · Sparkline Charts · Arcane Exchange micro-marks
 *
 * Carl (UX/UI) + Yosuf (Dev) — Season I
 *
 * This file handles the features that layer on top of main.js:
 *   1. Oracle Ticker Tape — seamless marquee with live-feel price updates
 *   2. Sparkline charts   — per-asset mini price history on canvas
 *   3. Exchange marks     — Arcane icon injected into each asset card
 */

(function () {
  'use strict';

  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  // ═══════════════════════════════════════════════════════════════
  // 1. ORACLE TICKER TAPE
  //    Clones the static ticker items to create a seamless loop,
  //    then drives the scroll via requestAnimationFrame (not CSS
  //    animation) so we can control speed precisely and pause on hover.
  // ═══════════════════════════════════════════════════════════════

  (function initOracleTicker() {
    // FIX: was 'oracleTickerTrack' — correct ID is 'tickerTrack'
    const track = document.getElementById('tickerTrack');
    if (!track) return;

    // ── Simulated fallback prices (used when API is unavailable) ──
    const ASSETS = [
      { ticker: 'SHRD', base: 812.35,   vol: 0.012 },
      { ticker: 'SPBK', base: 488.20,   vol: 0.009 },
      { ticker: 'DRAG', base: 2847.50,  vol: 0.007 },
      { ticker: 'ENCR', base: 341.90,   vol: 0.005 },
      { ticker: 'MCRX', base: 1203.75,  vol: 0.004 },
      { ticker: 'PHLX', base: 9240.00,  vol: 0.003 },
      { ticker: 'BLDD', base: 56.80,    vol: 0.007 },
      { ticker: 'DRFT', base: 127.45,   vol: 0.004 },
    ];

    // ── Live API fetch — updates ASSETS with real prices ──
    const API_BASE = 'https://api.loremarkets.ai';

    async function fetchLivePrices() {
      try {
        const res = await fetch(`${API_BASE}/api/markets/arcane/assets`, {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(6000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const body   = await res.json();
        const apiAssets = Array.isArray(body) ? body : (body.assets || body.data || []);
        if (!apiAssets.length) throw new Error('Empty asset list');

        apiAssets.forEach((a) => {
          const sym  = (a.ticker || a.symbol || '').toUpperCase();
          const live = parseFloat(a.current_price ?? a.price ?? a.last_price);
          const slot = ASSETS.find((x) => x.ticker === sym);
          if (slot && !isNaN(live) && live > 0) {
            slot.base = live;
          }
        });

        // Apply live prices to ticker items immediately after fetch
        refreshTickerPrices();

      } catch (err) {
        // Silent fallback — simulated prices keep running
        if (err.name !== 'AbortError') {
          console.debug('[LoreMarkets] Ticker live prices unavailable — using simulated feed.', err.message);
        }
      }
    }

    // ── Update every .ticker-item that carries a price span ──
    // HTML structure: <span class="ticker-item">SYM <span class="ticker-item__price ...">▲ pct%</span></span>
    function refreshTickerPrices() {
      // Select both original + cloned items so both halves of the seamless loop stay in sync
      const allItems = track.querySelectorAll('.ticker-item');

      allItems.forEach((item) => {
        const priceSpan = item.querySelector('.ticker-item__price');
        if (!priceSpan) return; // narrative / phase items — skip

        // Extract ticker symbol from the item's own text (before the price span)
        const rawText = item.childNodes[0];
        if (!rawText) return;
        const sym = rawText.textContent.trim().toUpperCase();

        const asset = ASSETS.find((a) => a.ticker === sym);
        if (!asset) return;

        // Apply a small random walk for the simulation branch
        const noise  = (Math.random() - 0.5) * 2 * asset.vol;
        const delta  = asset.base * noise;
        const prev   = asset.base;
        asset.base  += delta;

        const pct    = Math.abs((delta / prev) * 100).toFixed(1);
        const isUp   = delta >= 0;
        const arrow  = isUp ? '▲' : '▼';
        const sign   = isUp ? '+' : '−';
        const upDown = isUp ? 'ticker-item--up' : 'ticker-item--down';

        priceSpan.className = `ticker-item__price ${upDown}`;
        priceSpan.textContent = `${arrow} ${sign}${pct}%`;

        // Brief flash on update
        priceSpan.classList.add('price-flash');
        setTimeout(() => priceSpan.classList.remove('price-flash'), 700);
      });
    }

    // ── Duplicate children for seamless infinite scroll loop ──
    const items = Array.from(track.children);
    const cloneFragment = document.createDocumentFragment();
    items.forEach((item) => cloneFragment.appendChild(item.cloneNode(true)));
    track.appendChild(cloneFragment);

    // ── Marquee RAF animation ──
    if (!REDUCED_MOTION) {
      const SPEED = 0.6; // px per frame
      let pos    = 0;
      let paused = false;

      function getHalfWidth() { return track.scrollWidth / 2; }

      function step() {
        if (!paused) {
          pos -= SPEED;
          if (Math.abs(pos) >= getHalfWidth()) pos = 0;
          track.style.transform = `translateX(${pos}px)`;
        }
        requestAnimationFrame(step);
      }

      requestAnimationFrame(step);

      const wrapper = track.closest('.oracle-ticker');
      if (wrapper) {
        wrapper.addEventListener('mouseenter', () => { paused = true;  });
        wrapper.addEventListener('mouseleave', () => { paused = false; });
      }
    }

    // ── Start: fetch live prices immediately, simulate every 4s ──
    fetchLivePrices();                        // live on load
    setInterval(refreshTickerPrices, 4000);   // simulated tick every 4s
    setInterval(fetchLivePrices, 30000);      // re-sync with API every 30s
  })();


  // ═══════════════════════════════════════════════════════════════
  // 2. SPARKLINE CHARTS
  //    Each asset card has a <canvas class="asset-card__sparkline">
  //    with data-sparkline-vol attribute. We generate a plausible
  //    recent price series and draw it as a simple line chart.
  // ═══════════════════════════════════════════════════════════════

  (function initSparklines() {
    const canvases = document.querySelectorAll('.asset-card__sparkline');
    if (!canvases.length) return;

    // Colour per volatility tier from the parent card
    function getSparklineColor(card) {
      if (card.classList.contains('asset-card--extreme'))     return '#8b5cf6';
      if (card.classList.contains('asset-card--very-high'))   return '#f5c030';
      if (card.classList.contains('asset-card--high'))        return '#fb923c';
      if (card.classList.contains('asset-card--medium-high')) return '#00ecd6';
      if (card.classList.contains('asset-card--medium'))      return '#8050d0';
      if (card.classList.contains('asset-card--low'))         return '#94a3b8';
      if (card.classList.contains('asset-card--very-low'))    return '#22c55e';
      return '#9a88c0';
    }

    // Generate a simple random-walk price series
    function generateSeries(vol, points) {
      const series = [0];
      for (let i = 1; i < points; i++) {
        series.push(series[i - 1] + (Math.random() - 0.48) * vol * 100);
      }
      return series;
    }

    function drawSparkline(canvas) {
      const card  = canvas.closest('.asset-card');
      const vol   = parseFloat(canvas.dataset.sparklineVol || '0.004');
      const color = getSparklineColor(card);
      const W     = canvas.width;
      const H     = canvas.height;
      const ctx   = canvas.getContext('2d');
      const POINTS = 24;

      const series = generateSeries(vol, POINTS);
      const min    = Math.min(...series);
      const max    = Math.max(...series);
      const range  = max - min || 1;

      // Map to canvas coords
      const toX = (i) => (i / (POINTS - 1)) * W;
      const toY = (v) => H - ((v - min) / range) * (H * 0.75) - H * 0.10;

      ctx.clearRect(0, 0, W, H);

      // Gradient fill under the line
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, color.replace(')', ', 0.30)').replace('rgb', 'rgba').replace('#', 'rgba(').replace(/rgba\(([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2}), 0.30\)/, (_, r, g, b) => `rgba(${parseInt(r,16)},${parseInt(g,16)},${parseInt(b,16)},0.30)`));
      grad.addColorStop(1, 'rgba(6,0,15,0)');

      // Build the color as rgba manually
      const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1,3),16);
        const g = parseInt(hex.slice(3,5),16);
        const b = parseInt(hex.slice(5,7),16);
        return `rgba(${r},${g},${b},${alpha})`;
      };
      const gradFill = ctx.createLinearGradient(0, 0, 0, H);
      gradFill.addColorStop(0, hexToRgba(color.length === 7 ? color : '#9a88c0', 0.30));
      gradFill.addColorStop(1, 'rgba(6,0,15,0)');

      // Draw fill
      ctx.beginPath();
      series.forEach((v, i) => {
        if (i === 0) ctx.moveTo(toX(i), toY(v));
        else ctx.lineTo(toX(i), toY(v));
      });
      ctx.lineTo(toX(POINTS - 1), H);
      ctx.lineTo(toX(0), H);
      ctx.closePath();
      ctx.fillStyle = gradFill;
      ctx.fill();

      // Draw line
      ctx.beginPath();
      series.forEach((v, i) => {
        if (i === 0) ctx.moveTo(toX(i), toY(v));
        else ctx.lineTo(toX(i), toY(v));
      });
      ctx.strokeStyle = color.length === 7 ? color : '#9a88c0';
      ctx.lineWidth   = 1.5;
      ctx.lineJoin    = 'round';
      ctx.lineCap     = 'round';
      ctx.stroke();

      // End dot
      const lastX = toX(POINTS - 1);
      const lastY = toY(series[POINTS - 1]);
      ctx.beginPath();
      ctx.arc(lastX, lastY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = color.length === 7 ? color : '#9a88c0';
      ctx.fill();
    }

    // Draw all sparklines
    canvases.forEach(drawSparkline);

    // Redraw on card hover to animate a new simulated path
    if (!REDUCED_MOTION) {
      canvases.forEach((canvas) => {
        const card = canvas.closest('.asset-card');
        card.addEventListener('mouseenter', () => {
          drawSparkline(canvas);
        });
      });
    }
  })();


  // ═══════════════════════════════════════════════════════════════
  // 3. ARCANE EXCHANGE MICRO-MARK
  //    Inject the Arcane-logo.svg as a subtle top-right mark on
  //    each asset card. Muted opacity — present but not competing.
  // ═══════════════════════════════════════════════════════════════

  (function initAssetCardMarks() {
    const cards = document.querySelectorAll('.asset-card');
    if (!cards.length) return;

    cards.forEach((card) => {
      const mark = document.createElement('img');
      mark.src    = '../brand/icons/Arcane-logo.svg';
      mark.alt    = '';
      mark.setAttribute('aria-hidden', 'true');
      mark.className = 'asset-card__exchange-mark';
      card.appendChild(mark);
    });
  })();


  // ═══════════════════════════════════════════════════════════════
  // 4. WHAT-IS STICKY STACK — full-screen takeover
  //    Each card is 100vh tall, position:sticky, z-index stacked.
  //    Card 2 slides up and fully covers card 1 as you scroll.
  //    No JS transforms needed — CSS handles the whole effect.
  // ═══════════════════════════════════════════════════════════════

  (function initStackCards() {
    // No scroll logic needed — pure CSS sticky + z-index stack.
    // This function is a placeholder for any future enhancements
    // (e.g. progress dots, card label animations on entry).
  })();

})();
