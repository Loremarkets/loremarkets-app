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
    const track = document.getElementById('oracleTickerTrack');
    if (!track) return;

    // Duplicate all children for a seamless infinite loop
    const items  = Array.from(track.children);
    const clone  = document.createDocumentFragment();
    items.forEach((item) => clone.appendChild(item.cloneNode(true)));
    track.appendChild(clone);

    if (REDUCED_MOTION) return; // Static display — no scrolling

    const SPEED = 0.6; // pixels per frame — slow, atmospheric
    let   pos   = 0;
    let   paused = false;
    let   raf;

    function getHalfWidth() {
      // The track contains original + clone; half-width = original width
      return track.scrollWidth / 2;
    }

    function step() {
      if (!paused) {
        pos -= SPEED;
        const half = getHalfWidth();
        if (Math.abs(pos) >= half) {
          pos = 0; // jump back seamlessly
        }
        track.style.transform = `translateX(${pos}px)`;
      }
      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);

    // Pause on hover — lets readers actually read the Oracle
    const ticker = track.closest('.oracle-ticker');
    if (ticker) {
      ticker.addEventListener('mouseenter', () => { paused = true;  });
      ticker.addEventListener('mouseleave', () => { paused = false; });
    }

    // Update prices periodically to maintain live-feel
    const priceItems = track.querySelectorAll('.ticker-item--price');
    const ASSETS = [
      { ticker: 'SHRD', base: 67.00,   vol: 0.012, dir: 1  },
      { ticker: 'SPBK', base: 890.00,  vol: 0.009, dir: 1  },
      { ticker: 'DRAG', base: 425.00,  vol: 0.007, dir: -1 },
      { ticker: 'ENCR', base: 310.00,  vol: 0.005, dir: -1 },
      { ticker: 'MCRX', base: 180.00,  vol: 0.004, dir: 1  },
      { ticker: 'PHLX', base: 1253.00, vol: 0.003, dir: 1  },
      { ticker: 'BLDD', base: 28.14,   vol: 0.002, dir: 1  },
      { ticker: 'DRFT', base: 44.30,   vol: 0.003, dir: -1 },
    ];

    // Map price items to assets by ticker text
    function refreshPrices() {
      priceItems.forEach((item) => {
        const text   = item.textContent;
        const asset  = ASSETS.find((a) => text.startsWith(a.ticker));
        if (!asset) return;

        const noise   = (Math.random() - 0.5) * 2 * asset.vol;
        const change  = asset.base * noise;
        asset.base   += change;
        const pct     = ((change / (asset.base - change)) * 100).toFixed(1);
        const sign    = change >= 0 ? '▲' : '▼';
        const cls     = change >= 0 ? 'ticker-item--up' : 'ticker-item--down';
        const price   = asset.base.toLocaleString('en-US', {
          minimumFractionDigits: 2, maximumFractionDigits: 2,
        });

        item.className = `ticker-item ticker-item--price ${cls}`;
        item.innerHTML = `${asset.ticker} <strong>${price}</strong> ${sign} ${change >= 0 ? '+' : ''}${pct}%`;
      });
    }

    // Refresh every 4 seconds — subtle enough to feel live
    setInterval(refreshPrices, 4000);
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

})();
