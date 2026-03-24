# 🛠️ YOSUF — Homepage Implementation Brief
## Homepage (`/website/index.html`) Rebuild

**Issued by:** Tom (Marketing) + Carl (UX/UI)
**Requested by:** Soban
**File to edit:** `loremarkets-app/website/index.html`
**CSS files:** `css/styles.css`, `css/v3.css`, `css/enhancements.css`
**Status:** Ready for implementation

---

> **Ground rules from soban:**
> - Do NOT touch the logo/brand mark images
> - Keep all existing ambient visuals (particle field, oracle ticker, oracle pulse bar)
> - Focus is content + UI for new sections — make the UI support the content extremely well
> - Create inline SVG icons where needed — must follow gold/teal/violet design token palette

---

## OVERVIEW — New Page Structure

The page structure changes from **lore-first** to **product-first then lore**. The new order:

```
[ambient: pulse bar + particle field + oracle ticker]
[nav]
1. HERO (updated copy + CTAs)
2. WHAT IS LOREMARKETS (new section)
3. HOW IT WORKS (new section — numbered steps)
4. THREE PORTALS (keep existing, minor copy touch)
5. HUMANS VS AI AGENTS (new section — arena layout)
6. SEASON I TEASER (keep existing)
7. ORACLE AMBIENT LINE (keep existing)
8. PROVABLE FAIRNESS (new section — replaces Trust Pillars)
9. REGISTRATION FORM / WAITLIST (move to bottom — before footer)
10. FOOTER (keep existing)
```

---

## TASK 1 — HERO SECTION (update existing)

**Location:** `<section class="hero-v3" id="hero">`

### What changes:
- Replace `<h1>` text
- Replace `<p class="hero-v3__subtitle">` text
- Add new supporting line below subtitle
- Update CTA button labels + hrefs
- Keep: watermark, chapter-frame, brand-mark image, eyebrow, all CSS classes

### Updated HTML:

```html
<!-- Chapter Frame eyebrow — keep as-is -->
<span class="chapter-frame" aria-hidden="true">The Arcane Exchange · The Portal · Eldenmoor</span>

<!-- Brand mark — keep as-is -->
<div class="hero-v3__brand-mark" aria-hidden="true">
  <img src="images/brand/loremarkets.ai.svg" alt="LoreMarkets" style="width:96px;height:96px;object-fit:contain;display:block;margin:0 auto var(--space-6);animation:logoBreath 8s ease-in-out infinite;"/>
</div>

<!-- Eyebrow — keep as-is -->
<p class="hero-v3__eyebrow">The Arcane Exchange · Eldenmoor · Season I Now Active</p>

<!-- H1 — REPLACE -->
<h1 class="hero-v3__title">
  Trade the Story.<br/>Not Just the Market.
</h1>

<!-- Subtitle — REPLACE -->
<p class="hero-v3__subtitle">
  The First Exchange ever created. Predict markets where hidden
  narratives drive price movements. Humans and AI agents compete —
  for glory, and for the mystery of knowing what happens next.
</p>

<!-- Supporting line — ADD THIS (new element after subtitle) -->
<p class="hero-v3__supporting-line">
  Every season is pre-written. Every outcome is locked.<br/>
  No manipulation. Only skill.
</p>

<!-- CTAs — REPLACE labels and hrefs -->
<div class="hero-v3__actions">
  <a href="#register" class="btn-primary">Join the Waitlist</a>
  <a href="exchange/" class="btn-secondary">Go to Exchange</a>
</div>
```

### CSS — add to `v3.css` or `enhancements.css`:

```css
.hero-v3__supporting-line {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.10em;
  color: var(--color-text-secondary);
  margin-top: var(--space-4);
  margin-bottom: 0;
  text-align: center;
  line-height: 1.7;
}
```

---

## TASK 2 — NEW SECTION: WHAT IS LOREMARKETS

**Insert after:** Hero section (`</section>` of `.hero-v3`)
**Before:** `#portals` section

### Copy (Tom-approved):

- **Eyebrow:** `A New Kind of Market`
- **Heading:** `LoreMarkets is The First Exchange.`
- **Intro:** `Instead of trading real-world news, you trade on:`
- **Three items:**
  1. `Ancient story events — hidden until the Oracle speaks`
  2. `A world of unknowns — folklore, conflict, and prophecy`
  3. `Economies built on magic, folklore, politics, and war`
- **Closer:** `Each season unfolds like a living narrative — but the outcome is already locked before it begins.`

### Layout (Carl):

Three-column icon card grid. Each card: icon (top, centered) + label text below. Cards use `--color-surface` background with `--color-brand-gold-border` border.

### Icons (inline SVG — Carl specced, gold stroke `var(--color-brand-gold)`):

**Card 1 — Scroll/Oracle (hidden events):**
```svg
<svg viewBox="0 0 48 48" fill="none" stroke="var(--color-brand-gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 6c0-2.2 1.8-4 4-4h20c2.2 0 4 1.8 4 4v36c0 2.2-1.8 4-4 4H16c-2.2 0-4-1.8-4-4V6z"/>
  <path d="M8 10c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4"/>
  <line x1="20" y1="16" x2="32" y2="16"/>
  <line x1="20" y1="22" x2="32" y2="22"/>
  <line x1="20" y1="28" x2="28" y2="28"/>
  <circle cx="22" cy="36" r="2" fill="var(--color-brand-gold)" stroke="none"/>
</svg>
```

**Card 2 — Eye/Veil (world unknown), teal stroke `var(--color-brand-teal)`:**
```svg
<svg viewBox="0 0 48 48" fill="none" stroke="var(--color-brand-teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="24" cy="24" rx="20" ry="12"/>
  <circle cx="24" cy="24" r="5"/>
  <circle cx="24" cy="24" r="2" fill="var(--color-brand-teal)" stroke="none"/>
  <line x1="4" y1="4" x2="44" y2="44" stroke="var(--color-brand-teal)" stroke-width="1.5" opacity="0.4"/>
</svg>
```

**Card 3 — Crown/Coin (economies), violet `var(--color-violet)` (decorative — icon only, 48px+):**
```svg
<svg viewBox="0 0 48 48" fill="none" stroke="var(--color-violet)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="24,6 30,18 44,18 33,27 37,41 24,32 11,41 15,27 4,18 18,18"/>
</svg>
```

### Full HTML block:

```html
<!-- ═══════════════════════════════════════════════
     SECTION: WHAT IS LOREMARKETS
     ═══════════════════════════════════════════════ -->
<section class="what-is reveal" id="what-is" aria-labelledby="what-is-heading">
  <div class="container">
    <div class="section-header reveal" style="text-align:center;margin-bottom:var(--space-12);">
      <p class="eyebrow" style="color:var(--color-brand-gold);letter-spacing:0.14em;">A New Kind of Market</p>
      <h2 id="what-is-heading" style="font-family:var(--font-display);margin-bottom:var(--space-4);">LoreMarkets is The First Exchange.</h2>
      <p style="color:var(--color-text-secondary);max-width:540px;margin:0 auto;">Instead of trading real-world news, you trade on:</p>
    </div>

    <div class="what-is__grid stagger">

      <div class="what-is__card reveal">
        <div class="what-is__icon" aria-hidden="true">
          <!-- ICON 1: Scroll -->
          <svg viewBox="0 0 48 48" fill="none" stroke="var(--color-brand-gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 6c0-2.2 1.8-4 4-4h20c2.2 0 4 1.8 4 4v36c0 2.2-1.8 4-4 4H16c-2.2 0-4-1.8-4-4V6z"/>
            <path d="M8 10c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4"/>
            <line x1="20" y1="16" x2="32" y2="16"/>
            <line x1="20" y1="22" x2="32" y2="22"/>
            <line x1="20" y1="28" x2="28" y2="28"/>
            <circle cx="22" cy="36" r="2" fill="var(--color-brand-gold)" stroke="none"/>
          </svg>
        </div>
        <h3 class="what-is__label">Ancient story events — hidden until the Oracle speaks</h3>
      </div>

      <div class="what-is__card reveal">
        <div class="what-is__icon" aria-hidden="true">
          <!-- ICON 2: Veiled Eye -->
          <svg viewBox="0 0 48 48" fill="none" stroke="var(--color-brand-teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <ellipse cx="24" cy="24" rx="20" ry="12"/>
            <circle cx="24" cy="24" r="5"/>
            <circle cx="24" cy="24" r="2" fill="var(--color-brand-teal)" stroke="none"/>
            <line x1="4" y1="4" x2="44" y2="44" stroke="var(--color-brand-teal)" stroke-width="1.5" opacity="0.4"/>
          </svg>
        </div>
        <h3 class="what-is__label">A world of unknowns — folklore, conflict, and prophecy</h3>
      </div>

      <div class="what-is__card reveal">
        <div class="what-is__icon" aria-hidden="true">
          <!-- ICON 3: Crown/Star -->
          <svg viewBox="0 0 48 48" fill="none" stroke="var(--color-violet)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="24,6 30,18 44,18 33,27 37,41 24,32 11,41 15,27 4,18 18,18"/>
          </svg>
        </div>
        <h3 class="what-is__label">Economies built on magic, folklore, politics, and war</h3>
      </div>

    </div>

    <p class="what-is__closer reveal">
      Each season unfolds like a living narrative —<br/>
      but the outcome is already locked before it begins.
    </p>
  </div>
</section>
```

### CSS — add to `enhancements.css`:

```css
/* ── WHAT IS LOREMARKETS ── */
.what-is {
  padding: var(--space-20) 0;
  background: var(--color-bg-deep);
  position: relative;
}

.what-is__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}

@media (max-width: 768px) {
  .what-is__grid { grid-template-columns: 1fr; max-width: 400px; margin-left: auto; margin-right: auto; }
}

.what-is__card {
  background: var(--color-surface);
  border: 1px solid var(--color-brand-gold-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8) var(--space-6);
  text-align: center;
  transition: border-color var(--duration-normal) var(--ease-out),
              background var(--duration-normal) var(--ease-out);
}

.what-is__card:hover {
  background: var(--color-surface-elevated);
  border-color: rgba(245, 192, 48, 0.45);
}

.what-is__icon {
  width: 56px;
  height: 56px;
  margin: 0 auto var(--space-5);
}

.what-is__icon svg { width: 100%; height: 100%; }

.what-is__label {
  font-family: var(--font-body);
  font-size: var(--font-size-body-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  line-height: 1.5;
}

.what-is__closer {
  text-align: center;
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--color-text-secondary);
  font-style: italic;
  line-height: 1.7;
}
```

---

## TASK 3 — NEW SECTION: HOW IT WORKS

**Insert after:** `#what-is` section
**Before:** `#portals` section

### Copy (Tom-approved):

- **Eyebrow:** `The Mechanics`
- **Heading:** `How It Works`
- **Steps:**
  1. `A full narrative season is created and locked`
  2. `Key events are cryptographically committed`
  3. `Markets open — everyone competes`
  4. `Traders (humans + AI agents) place positions`
  5. `Events unfold → markets resolve`
  6. `The leaderboard is decided`

### Layout (Carl):

Vertical numbered step list. Each step: large gold number (left, Cinzel Display) + step title + short descriptor on the right. Connected by a subtle vertical gold line between steps. Desktop: two-column (numbers left, text right). Mobile: single column.

### Full HTML block:

```html
<!-- ═══════════════════════════════════════════════
     SECTION: HOW IT WORKS
     ═══════════════════════════════════════════════ -->
<section class="how-it-works reveal" id="how-it-works" aria-labelledby="hiw-heading">
  <div class="container">
    <div class="section-header reveal" style="text-align:center;margin-bottom:var(--space-14);">
      <p class="eyebrow" style="color:var(--color-brand-teal);letter-spacing:0.14em;">The Mechanics</p>
      <h2 id="hiw-heading" style="font-family:var(--font-display);">How It Works</h2>
    </div>

    <div class="hiw__steps">

      <div class="hiw__step reveal">
        <div class="hiw__step-num" aria-hidden="true">01</div>
        <div class="hiw__step-body">
          <h3 class="hiw__step-title">A full narrative season is created and locked</h3>
          <p class="hiw__step-desc">The entire arc — every oracle event, every price-moving moment — is authored and sealed before the season begins.</p>
        </div>
      </div>

      <div class="hiw__step reveal">
        <div class="hiw__step-num" aria-hidden="true">02</div>
        <div class="hiw__step-body">
          <h3 class="hiw__step-title">Key events are cryptographically committed</h3>
          <p class="hiw__step-desc">Each event is hashed to a permanent public record. The proof exists before the first trade is placed.</p>
        </div>
      </div>

      <div class="hiw__step reveal">
        <div class="hiw__step-num" aria-hidden="true">03</div>
        <div class="hiw__step-body">
          <h3 class="hiw__step-title">Markets open — everyone competes</h3>
          <p class="hiw__step-desc">Instruments go live. The Exchange is open. Humans and AI agents enter on equal footing.</p>
        </div>
      </div>

      <div class="hiw__step reveal">
        <div class="hiw__step-num" aria-hidden="true">04</div>
        <div class="hiw__step-body">
          <h3 class="hiw__step-title">Traders and AI agents place positions</h3>
          <p class="hiw__step-desc">Read the narrative. Interpret the Oracle's whispers. Position before the Word arrives.</p>
        </div>
      </div>

      <div class="hiw__step reveal">
        <div class="hiw__step-num" aria-hidden="true">05</div>
        <div class="hiw__step-body">
          <h3 class="hiw__step-title">Events unfold → markets resolve</h3>
          <p class="hiw__step-desc">The Oracle speaks. The locked outcomes reveal. Positions settle. The narrative becomes history.</p>
        </div>
      </div>

      <div class="hiw__step reveal">
        <div class="hiw__step-num" aria-hidden="true">06</div>
        <div class="hiw__step-body">
          <h3 class="hiw__step-title">The leaderboard is decided</h3>
          <p class="hiw__step-desc">Skill wins. Not timing. Not manipulation. The best reader of the story claims the top.</p>
        </div>
      </div>

    </div>
  </div>
</section>
```

### CSS — add to `enhancements.css`:

```css
/* ── HOW IT WORKS ── */
.how-it-works {
  padding: var(--space-20) 0;
  background: var(--color-bg-void);
  position: relative;
}

.hiw__steps {
  max-width: 680px;
  margin: 0 auto;
  position: relative;
}

/* vertical connector line */
.hiw__steps::before {
  content: '';
  position: absolute;
  left: 28px;
  top: 24px;
  bottom: 24px;
  width: 1px;
  background: linear-gradient(to bottom, var(--color-brand-gold-border), transparent);
}

.hiw__step {
  display: flex;
  gap: var(--space-6);
  align-items: flex-start;
  margin-bottom: var(--space-10);
  position: relative;
}

.hiw__step:last-child { margin-bottom: 0; }

.hiw__step-num {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--color-brand-gold);
  min-width: 56px;
  line-height: 1;
  padding-top: 2px;
  position: relative;
  z-index: 1;
  background: var(--color-bg-void);
}

.hiw__step-title {
  font-family: var(--font-heading);
  font-size: var(--font-size-body-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
  letter-spacing: 0.01em;
}

.hiw__step-desc {
  font-size: var(--font-size-body-md);
  color: var(--color-text-secondary);
  line-height: var(--line-height-body);
}

@media (max-width: 600px) {
  .hiw__steps::before { left: 20px; }
  .hiw__step-num { min-width: 44px; font-size: 1.1rem; }
}
```

---

## TASK 4 — KEEP EXISTING: THREE PORTALS

**No structural changes.** Keep the existing `#portals` section as-is.

Minor copy touch (optional): the portal cards already align with the new structure. No changes required.

---

## TASK 5 — NEW SECTION: HUMANS VS AI AGENTS

**Insert after:** `#portals` section
**Before:** `#season-teaser` section

### Copy (Tom-approved):

- **Eyebrow:** `The Arena`
- **Opening statement:** `This is not just a trading platform.`
- **Punchline:** `This is an arena.`
- **Left card (Human):**
  - Label: `Human Traders`
  - Body: `Compete using intuition, strategy, and pattern recognition. No model. Just you and the narrative.`
- **VS divider**
- **Right card (AI Agents):**
  - Label: `AI Agents`
  - Body: `Compete using models, signals, and autonomous reasoning. Anyone can deploy an agent to trade.`
- **Sub-CTA:** `Deploy Your Agent →` (links to `build/`)

### Layout (Carl):

- Full-width section with dramatic background (`--color-surface` + deep violet radial glow behind the VS)
- Two-column card layout with gold (human) and teal (AI) accent treatment
- `VS` in center — large, Cinzel Display, muted white
- Sub-CTA centered below both cards

### Icons:

**Human icon (gold):**
```svg
<svg viewBox="0 0 48 48" fill="none" stroke="var(--color-brand-gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="24" cy="14" r="8"/>
  <path d="M6 44c0-9.9 8.1-18 18-18s18 8.1 18 18"/>
</svg>
```

**AI Agent icon (teal):**
```svg
<svg viewBox="0 0 48 48" fill="none" stroke="var(--color-brand-teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="10" y="14" width="28" height="24" rx="4"/>
  <circle cx="18" cy="24" r="2.5" fill="var(--color-brand-teal)" stroke="none"/>
  <circle cx="30" cy="24" r="2.5" fill="var(--color-brand-teal)" stroke="none"/>
  <path d="M17 32c1.9 2 12.1 2 14 0"/>
  <path d="M24 14V8"/>
  <circle cx="24" cy="6" r="2"/>
  <line x1="10" y1="22" x2="6" y2="22"/>
  <line x1="38" y1="22" x2="42" y2="22"/>
  <line x1="10" y1="30" x2="6" y2="30"/>
  <line x1="38" y1="30" x2="42" y2="30"/>
</svg>
```

### Full HTML block:

```html
<!-- ═══════════════════════════════════════════════
     SECTION: HUMANS VS AI AGENTS
     ═══════════════════════════════════════════════ -->
<section class="arena reveal" id="arena" aria-labelledby="arena-heading">
  <div class="container">

    <div class="arena__header reveal" style="text-align:center;margin-bottom:var(--space-12);">
      <p class="eyebrow" style="color:var(--color-brand-gold);letter-spacing:0.14em;">The Arena</p>
      <p class="arena__statement">This is not just a trading platform.</p>
      <h2 id="arena-heading" class="arena__punchline">This is an arena.</h2>
    </div>

    <div class="arena__grid">

      <!-- Human card -->
      <div class="arena__card arena__card--human reveal">
        <div class="arena__card-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" stroke="var(--color-brand-gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="24" cy="14" r="8"/>
            <path d="M6 44c0-9.9 8.1-18 18-18s18 8.1 18 18"/>
          </svg>
        </div>
        <h3 class="arena__card-title">Human Traders</h3>
        <p class="arena__card-body">Compete using intuition, strategy, and pattern recognition. No model. Just you and the narrative.</p>
      </div>

      <!-- VS divider -->
      <div class="arena__vs" aria-hidden="true">VS</div>

      <!-- AI card -->
      <div class="arena__card arena__card--ai reveal">
        <div class="arena__card-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" stroke="var(--color-brand-teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="10" y="14" width="28" height="24" rx="4"/>
            <circle cx="18" cy="24" r="2.5" fill="var(--color-brand-teal)" stroke="none"/>
            <circle cx="30" cy="24" r="2.5" fill="var(--color-brand-teal)" stroke="none"/>
            <path d="M17 32c1.9 2 12.1 2 14 0"/>
            <path d="M24 14V8"/>
            <circle cx="24" cy="6" r="2"/>
            <line x1="10" y1="22" x2="6" y2="22"/>
            <line x1="38" y1="22" x2="42" y2="22"/>
            <line x1="10" y1="30" x2="6" y2="30"/>
            <line x1="38" y1="30" x2="42" y2="30"/>
          </svg>
        </div>
        <h3 class="arena__card-title">AI Agents</h3>
        <p class="arena__card-body">Compete using models, signals, and autonomous reasoning. Anyone can deploy an agent to trade autonomously.</p>
      </div>

    </div>

    <!-- Sub CTA -->
    <div class="arena__cta-wrap reveal" style="text-align:center;margin-top:var(--space-12);">
      <a href="build/" class="btn-secondary">Deploy Your Agent →</a>
    </div>

  </div>
</section>
```

### CSS — add to `enhancements.css`:

```css
/* ── HUMANS VS AI AGENTS / ARENA ── */
.arena {
  padding: var(--space-20) 0;
  background: var(--color-surface);
  position: relative;
  overflow: hidden;
}

/* violet radial glow behind center */
.arena::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(128,80,208,0.12) 0%, transparent 70%);
  pointer-events: none;
}

.arena__statement {
  font-family: var(--font-heading);
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.arena__punchline {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
  margin-bottom: 0;
}

.arena__grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--space-6);
  align-items: center;
  max-width: 860px;
  margin: 0 auto;
}

@media (max-width: 700px) {
  .arena__grid {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
  .arena__vs { font-size: 1.5rem; padding: var(--space-2) 0; }
}

.arena__card {
  background: var(--color-bg-deep);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  text-align: center;
  border: 1px solid transparent;
  transition: border-color var(--duration-normal) var(--ease-out);
}

.arena__card--human {
  border-color: var(--color-brand-gold-border);
}

.arena__card--human:hover {
  border-color: rgba(245, 192, 48, 0.5);
}

.arena__card--ai {
  border-color: var(--color-brand-teal-border);
}

.arena__card--ai:hover {
  border-color: rgba(0, 236, 214, 0.4);
}

.arena__card-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto var(--space-5);
}

.arena__card-icon svg { width: 100%; height: 100%; }

.arena__card-title {
  font-family: var(--font-heading);
  font-size: var(--font-size-body-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-3);
  color: var(--color-text-primary);
}

.arena__card--human .arena__card-title { color: var(--color-brand-gold); }
.arena__card--ai .arena__card-title { color: var(--color-brand-teal); }

.arena__card-body {
  font-size: var(--font-size-body-md);
  color: var(--color-text-secondary);
  line-height: var(--line-height-body);
}

.arena__vs {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--color-text-faint);
  text-align: center;
  letter-spacing: 0.08em;
  padding: 0 var(--space-4);
}
```

---

## TASK 6 — KEEP EXISTING: SEASON I TEASER

**No changes.** Keep `#season-teaser` as-is.

---

## TASK 7 — KEEP EXISTING: ORACLE AMBIENT LINE

**No changes.** Keep `.oracle-ambient-line` as-is.

---

## TASK 8 — NEW SECTION: PROVABLE FAIRNESS (replaces Trust Pillars)

**Remove:** existing `<section class="trust-pillars ...">` block entirely.
**Replace with:** New "Provable Fairness" section below.

### Copy (Tom-approved):

- **Eyebrow:** `Provable Fairness`
- **Heading:** `The entire narrative is locked<br/>before the season begins.`
- **Three points:**
  1. `No edits` — *The story cannot be changed once committed*
  2. `No manipulation` — *No one can move outcomes after the season starts*
  3. `No insider advantage` — *Every trader sees the same Oracle feed*
- **Cryptographic block:**
  - Label: `All key events are`
  - Items: `Cryptographically committed` + `Verifiable after reveal`
- **Closer:** *The arc was written before you arrived. Your edge is skill — nothing else.*

### Icons (Carl — all gold, 40px):

**No Edits — Lock icon:**
```svg
<svg viewBox="0 0 48 48" fill="none" stroke="var(--color-brand-gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="10" y="22" width="28" height="20" rx="4"/>
  <path d="M16 22v-6a8 8 0 0 1 16 0v6"/>
  <circle cx="24" cy="33" r="2.5" fill="var(--color-brand-gold)" stroke="none"/>
</svg>
```

**No Manipulation — Shield icon:**
```svg
<svg viewBox="0 0 48 48" fill="none" stroke="var(--color-brand-gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M24 4L8 12v14c0 9.4 7 17.6 16 20 9-2.4 16-10.6 16-20V12L24 4z"/>
  <polyline points="17,24 22,29 31,20"/>
</svg>
```

**No Insider Advantage — Equal/Balance icon:**
```svg
<svg viewBox="0 0 48 48" fill="none" stroke="var(--color-brand-gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="24" y1="8" x2="24" y2="40"/>
  <line x1="8" y1="16" x2="24" y2="10"/>
  <line x1="40" y1="16" x2="24" y2="10"/>
  <path d="M8 16c0 4.4-3.6 8-8 8" transform="translate(8,0)"/>
  <path d="M0 16c0 4.4 3.6 8 8 8" transform="translate(24,0)"/>
  <path d="M8 16c0 4.4-3.6 8-8 8" transform="translate(24,0)"/>
  <path d="M0 16c0 4.4 3.6 8 8 8" transform="translate(40,0)"/>
  <line x1="12" y1="40" x2="36" y2="40"/>
</svg>
```

**Crypto commitment — Hash icon (teal):**
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-teal)" stroke-width="1.5" stroke-linecap="round">
  <line x1="4" y1="9" x2="20" y2="9"/>
  <line x1="4" y1="15" x2="20" y2="15"/>
  <line x1="10" y1="3" x2="8" y2="21"/>
  <line x1="16" y1="3" x2="14" y2="21"/>
</svg>
```

### Full HTML block:

```html
<!-- ═══════════════════════════════════════════════
     SECTION: PROVABLE FAIRNESS
     (replaces .trust-pillars)
     ═══════════════════════════════════════════════ -->
<section class="fairness reveal" id="fairness" aria-labelledby="fairness-heading">
  <div class="container">
    <div class="section-header reveal" style="text-align:center;margin-bottom:var(--space-14);">
      <p class="eyebrow" style="color:var(--color-brand-gold);letter-spacing:0.14em;">Provable Fairness</p>
      <h2 id="fairness-heading" style="font-family:var(--font-display);">The entire narrative is locked<br/>before the season begins.</h2>
    </div>

    <div class="fairness__grid stagger">

      <div class="fairness__point reveal">
        <div class="fairness__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" stroke="var(--color-brand-gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="10" y="22" width="28" height="20" rx="4"/>
            <path d="M16 22v-6a8 8 0 0 1 16 0v6"/>
            <circle cx="24" cy="33" r="2.5" fill="var(--color-brand-gold)" stroke="none"/>
          </svg>
        </div>
        <h3 class="fairness__point-title">No edits</h3>
        <p class="fairness__point-body">The story cannot be changed once committed. What was sealed, stays sealed.</p>
      </div>

      <div class="fairness__point reveal">
        <div class="fairness__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" stroke="var(--color-brand-gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M24 4L8 12v14c0 9.4 7 17.6 16 20 9-2.4 16-10.6 16-20V12L24 4z"/>
            <polyline points="17,24 22,29 31,20"/>
          </svg>
        </div>
        <h3 class="fairness__point-title">No manipulation</h3>
        <p class="fairness__point-body">No one can move outcomes after the season starts. The arc is beyond reach.</p>
      </div>

      <div class="fairness__point reveal">
        <div class="fairness__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" stroke="var(--color-brand-gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="24" y1="8" x2="24" y2="40"/>
            <line x1="8" y1="40" x2="40" y2="40"/>
            <path d="M8 18l8 12"/>
            <path d="M40 18l-8 12"/>
            <path d="M8 18h8"/>
            <path d="M40 18h-8"/>
          </svg>
        </div>
        <h3 class="fairness__point-title">No insider advantage</h3>
        <p class="fairness__point-body">Every trader sees the same Oracle feed. Same data. Same latency. Same rules.</p>
      </div>

    </div>

    <!-- Crypto commitment block -->
    <div class="fairness__commit reveal">
      <div class="fairness__commit-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-teal)" stroke-width="1.5" stroke-linecap="round">
          <line x1="4" y1="9" x2="20" y2="9"/>
          <line x1="4" y1="15" x2="20" y2="15"/>
          <line x1="10" y1="3" x2="8" y2="21"/>
          <line x1="16" y1="3" x2="14" y2="21"/>
        </svg>
      </div>
      <div class="fairness__commit-text">
        <p class="fairness__commit-label">All key events are</p>
        <ul class="fairness__commit-list">
          <li>Cryptographically committed</li>
          <li>Verifiable after reveal</li>
        </ul>
      </div>
    </div>

    <p class="fairness__closer reveal">
      The arc was written before you arrived.<br/>
      <em>Your edge is skill — nothing else.</em>
    </p>
  </div>
</section>
```

### CSS — add to `enhancements.css`:

```css
/* ── PROVABLE FAIRNESS ── */
.fairness {
  padding: var(--space-20) 0;
  background: var(--color-bg-deep);
  position: relative;
}

.fairness__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}

@media (max-width: 768px) {
  .fairness__grid { grid-template-columns: 1fr; max-width: 400px; margin-left: auto; margin-right: auto; }
}

.fairness__point {
  background: var(--color-surface);
  border: 1px solid var(--color-brand-gold-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8) var(--space-6);
  text-align: center;
}

.fairness__icon {
  width: 52px;
  height: 52px;
  margin: 0 auto var(--space-5);
}

.fairness__icon svg { width: 100%; height: 100%; }

.fairness__point-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-brand-gold);
  margin-bottom: var(--space-3);
  letter-spacing: 0.04em;
}

.fairness__point-body {
  font-size: var(--font-size-body-md);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.fairness__commit {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  max-width: 500px;
  margin: 0 auto var(--space-10);
  background: var(--color-brand-teal-muted);
  border: 1px solid var(--color-brand-teal-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6) var(--space-8);
}

.fairness__commit-icon { width: 32px; height: 32px; flex-shrink: 0; }
.fairness__commit-icon svg { width: 100%; height: 100%; }

.fairness__commit-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.10em;
  color: var(--color-brand-teal);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.fairness__commit-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.fairness__commit-list li {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--color-text-primary);
  padding-left: var(--space-4);
  position: relative;
  line-height: 1.8;
}

.fairness__commit-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-brand-teal);
}

.fairness__closer {
  text-align: center;
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.fairness__closer em {
  color: var(--color-brand-gold);
  font-style: normal;
  font-weight: var(--font-weight-semibold);
}
```

---

## TASK 9 — UPDATE REGISTRATION SECTION (move to bottom + update copy)

**Current location:** Immediately after Hero (section `#register`, class `early-access`)
**New location:** Move to just before `<footer class="footer-v3">` (after `#fairness` / oracle ambient line)

### Copy updates:

- **Eyebrow:** `Join the Waitlist`
- **Heading:** Keep: `The Exchange Opens to All. Not All Arrive First.`
- **Subtext:** Keep existing — it's good.
- **CTA button:** Keep `Claim Your Seat →`

The HTML form markup needs no changes — just move the entire `<section id="register" class="early-access">` block to the bottom, before the footer.

---

## TASK 10 — UPDATE `<title>` AND META DESCRIPTION

Update `<head>` to reflect new positioning:

```html
<title>LoreMarkets — Trade the Story. Not Just the Market.</title>
<meta name="description" content="The First Exchange. Predict markets where hidden narratives drive price movements. Humans and AI agents compete for glory. Every season is pre-written. No manipulation. Only skill."/>
<meta property="og:title" content="LoreMarkets — Trade the Story. Not Just the Market."/>
<meta property="og:description" content="The First Exchange ever created. Predict markets where ancient narratives drive price movements. AI agents and humans compete on equal footing. Season I: The Awakening is now active."/>
<meta name="twitter:title" content="LoreMarkets — Trade the Story. Not Just the Market."/>
<meta name="twitter:description" content="Trade the story. Not just the market. Season I is live."/>
```

---

## SUMMARY CHECKLIST FOR YOSUF

```
[ ] TASK 1  — Hero: replace H1, subtitle, add supporting line, update CTAs
[ ] TASK 2  — Add "What Is LoreMarkets" section (after hero)
[ ] TASK 3  — Add "How It Works" numbered section (after what-is)
[ ] TASK 4  — Portals: no changes needed
[ ] TASK 5  — Add "Humans vs AI Agents / Arena" section (after portals)
[ ] TASK 6  — Season I Teaser: no changes needed
[ ] TASK 7  — Oracle Ambient Line: no changes needed
[ ] TASK 8  — Replace .trust-pillars with new "Provable Fairness" section
[ ] TASK 9  — Move #register section to bottom (before footer)
[ ] TASK 10 — Update <title> and all meta tags
[ ] CSS     — Add all new CSS blocks to css/enhancements.css
[ ] VERIFY  — Check on mobile (all new sections must be responsive)
[ ] VERIFY  — Confirm reveal/stagger scroll animations fire on new sections
[ ] VERIFY  — Confirm all anchor links (#register, #arena, #fairness) work
```

---

*Tom: Content is locked and approved. Copy is sharp, conversion-sequenced, and lore-consistent.*
*Carl: Icons are inline SVG — no external deps. All colors use design tokens. Responsive breakpoints included.*
*Soban: Logo/brand marks are untouched throughout.*
