# LoreMarkets Website — Improvement Plan
## For Yosuf's Rebuild
**Prepared by:** Arif (PM) · Tom (Marketing) · JJ (Lore) · Carl (UX/UI)
**Date:** March 16, 2026
**Status:** Approved — Ready for Yosuf

---

> *"The Exchange does not care who wins wars. It only asks who is selling."*
> — Inscription above the doors of the Eldenmoor Concordat Hall

---

## Executive Summary

The current site (`loremarkets-app/website/index.html`) has the right structure but fails on three fundamental levels: the copy describes instead of transporting, the design ignores brand assets that already exist, and the Oracle — the single most powerful differentiator in the product — is presented as a feature rather than an ancient force.

This plan defines every change needed. Yosuf implements. No interpretation required.

---

## Part 1: Language & Positioning (Tom + JJ)

### 1.1 The Word We Never Say Again

**"Simulator" is permanently retired.**

Every occurrence in public-facing copy, meta tags, structured data, and FAQ answers must be removed. The replacement framing:

> LoreMarkets is the Arcane Exchange of Eldenmoor — a living marketplace where prophecy moves prices and the Oracle speaks before the market knows it's listening.

This is not a game. Not a platform. Not a tool. It is a **place**. Write it like one.

**Occurrences to remove:**
- `index.html` meta description: "A fictional trading simulator where..."
- `index.html` hero subtitle: "A fictional trading simulator where..."
- `index.html` structured data: `"description": "A fictional trading simulator..."`
- `index.html` FAQ answer: "LoreMarkets is a fictional trading simulator..."
- `about.html` (audit and purge all occurrences)

---

### 1.2 Hero Section — Full Rewrite

**Current (REJECTED):**
```
Headline: "Where Ancient Lore Meets Live Markets"
Subheadline: "A fictional trading simulator where AI agents and human traders
compete in fantasy-themed markets driven by oracle prophecies."
```

**New (APPROVED):**
```
EYEBROW: "THE ARCANE EXCHANGE · ELDENMOOR · SEASON I"

HEADLINE:
"The Exchange Has Been Open
 for Four Hundred Years.
 Now It's Your Turn."

SUBHEADLINE:
"LoreMarkets is the ancient Arcane Exchange of Eldenmoor — a living marketplace
where prophecy moves prices, AI agents stalk the leaderboard, and the Oracle
speaks before the market knows it's listening."

PRIMARY CTA: "Enter the Exchange"
SECONDARY CTA: "Deploy Your Agent"
```

**Implementation notes:**
- The headline spans two lines intentionally — break after "Years."
- "Four Hundred Years" carries the entire weight of the fiction. Do not abbreviate.
- Replace "Get Early Access" with "Enter the Exchange" — positioning shift from access to arrival.
- Replace "View API Docs" with "Deploy Your Agent" — developer framing, not documentation framing.

---

### 1.3 Hero Stats — Rewrite

**Current:**
```
8 · Magical Assets
24/7 · Live Price Feeds
27 · Oracle Events
```

**New:**
```
8 · Tradeable Commodities
400 · Years of Exchange History
27 · Oracle Prophecies Active
```

The middle stat (400 years) is a lore anchor. It makes the world feel old. Keep it.

---

### 1.4 Features Section — Full Rewrite

Kill the SaaS-bullet format. Each card becomes an Exchange truth — a declarative statement about the world, not a product feature. Eyebrow changes to "The Laws of the Exchange."

**Section header:**
```
EYEBROW: "THE LAWS OF THE EXCHANGE"
H2: "The Arcane Exchange Has No Mercy. It Has Rules."
BODY: "Four centuries of trading have produced one truth: the market does
not reward optimism. It rewards intelligence, timing, and whoever reads
the Oracle's Whisper before everyone else does."
```

**Feature cards — rewritten:**

| Card | Old Title | New Title | New Body |
|------|-----------|-----------|----------|
| Oracle | "Oracle-Driven Markets" | "The Oracle Has Never Been Wrong." | "Every market catalyst follows three acts: the Whisper, the Word, and the Settling. Traders who hear the Whisper early don't just survive — they profit from the chaos that follows." |
| AI vs Human | "AI vs Human Competition" | "The Leaderboard Doesn't Know if You're Human." | "AI agents and human traders compete on identical footing. Same data. Same latency. Same Oracle feed. The board shows one ranking. Your strategy determines where you appear on it." |
| Price Models | "Realistic Price Models" | "These Prices Are Real. The Gold Is Not." | "Geometric Brownian motion, mean reversion, jump diffusion. Calibrated volatility caps per asset. The mathematics of real markets, powering a world that doesn't exist." |
| 8 Assets | "8 Magical Commodities" | "Eight Commodities. Centuries of History. Zero Sympathy." | "From the volatile Dragon Scale to the near-silent Bloodmoss Root — each asset carries its own lore, its own risk profile, and its own relationship with the Oracle's prophecies." |
| WebSocket | "Real-Time WebSocket Feeds" | "The Market Never Sleeps. Neither Should Your Agent." | "Sub-second price ticks. OHLCV candles at every interval. Oracle event streams. Every signal your agent needs, delivered before the rest of the board reacts." |
| API | "API-First Architecture" | "Your Agent Has a Free Seat at the Table." | "REST endpoints, WebSocket subscriptions, and self-serve registration. An API key in under a minute. The Exchange charges no entry fee — your agent's performance is the only currency that matters." |

---

### 1.5 Oracle Section — Full Rewrite

This is the most important section rewrite. The Oracle becomes a character, not a feature.

**Section header — new:**
```
EYEBROW: "THE ORACLE OF ELDENMOOR"
H2: "It Spoke Three Hours Before the Market Crashed."
```

**Oracle body copy — new:**
```
Paragraph 1:
"No faction in Eldenmoor has ever verified what the Oracle actually is. The
Merchant's Concordat funds its operation because the alternative — trading
without it — was tried once, in the wreckage of the Mana Wars, and the Exchange
nearly collapsed within three months. They do not understand it. They depend on it."

Paragraph 2:
"The Oracle speaks in three acts. The Whisper arrives hours before the event —
a quiet signal that those paying attention will catch. The Word lands, and the
market moves. Then comes the Settling: the price finds its new level, and every
position taken before the Word was either right or wrong."

Paragraph 3:
"There are 27 active prophecies in the current cycle. Some are foreshadowing
events that haven't happened yet. Somewhere in that feed, the next Dragon Scale
collapse, Manacrux discovery, or Spellbound Purge is already written.
The Oracle knows. It always knows first."
```

**Oracle feed cards — updated labels:**

Replace "Foreshadow / Trigger / Echo" with **"Whisper / Word / Settling"** — these are the in-world canon names.

**CTA in Oracle section:**
```
"Read the Oracle Feed →"  (not "Explore the Oracle")
```

---

### 1.6 Markets/Assets Section — Rewrite

**Section header — new:**
```
EYEBROW: "THE ARCANE EXCHANGE · SEASON I"
H2: "Eight Commodities That Have Moved Markets for Four Centuries."
BODY: "Each commodity carries a history. Each price movement has a reason.
The Oracle does not fabricate events — it reports what is already in motion
in the world of Eldenmoor."
```

**Asset card enhancements:** Each card gets a one-line lore flavor beneath its volatility label:

| Asset | Flavor Line |
|-------|-------------|
| DRAG Dragon Scale | *"The covenant is breaking. Few have noticed."* |
| MCRX Manacrux Ore | *"Reliable on the surface. Alive underneath."* |
| SPBK Spellbound Tome | *"Every sealed tome may contain lost knowledge. Or nothing."* |
| ENCR Enchanted Crystal | *"Traders watch ENCR as a leading indicator of arcane health."* |
| PHLX Philosopher's Dust | *"Produced at a pace that cannot be rushed. Held by those who can wait."* |
| DRFT Driftwood Wand | *"The market nobody watches until the wetlands flood."* |
| BLDD Bloodmoss Root | *"The quiet market. The one that wakes up in a crisis."* |
| SHRD Shadow Shard | *"They come from places where reality is wrong."* |

---

### 1.7 Developer Section — Rewrite

**Section header — new:**
```
EYEBROW: "FOR AGENT BUILDERS"
H2: "Your Agent Has a Free Seat in the Exchange."
BODY: "LoreMarkets is an open arena. Register your agent, get an API key,
and it starts competing on the same leaderboard as human traders in under
a minute. The data is live. The competition is real. The gold is fictional.
Your agent's ranking is not."
```

**Feature list — rewritten:**
```
BEFORE: "REST API for markets, assets, candles, ticks, and oracle events"
AFTER:  "Full REST API — markets, assets, candles, ticks, and live Oracle events"

BEFORE: "WebSocket subscriptions for real-time price feeds"
AFTER:  "WebSocket subscriptions — sub-second Oracle and price feeds"

BEFORE: "Self-serve agent registration with instant API keys"
AFTER:  "Self-serve agent registration — API key in under 60 seconds"

BEFORE: "120 requests/min rate limit on the free tier"
AFTER:  "120 requests/min — free tier, no credit card, no gatekeeping"

BEFORE: "Machine-parseable error responses with proper HTTP codes"
AFTER:  "Machine-parseable errors — your agent knows exactly what broke and why"

BEFORE: "OHLCV candles at 1m, 5m, 15m, 1h, 4h, 1d intervals"
AFTER:  "OHLCV candles at six intervals — 1m through 1d, all markets"
```

---

### 1.8 Roadmap/Universe Section — Rewrite

**Section header — new:**
```
EYEBROW: "THE EXPANDING WORLD"
H2: "The Exchange is Only the Beginning."
BODY: "Eldenmoor is not the only world. LoreMarkets is built in Seasons.
Each Season opens a new market, a new set of commodities, and a new
relationship between the Oracle and the forces that shape prices."
```

**Timeline items — enhanced:**

| Season | Old Title | New Framing |
|--------|-----------|-------------|
| S1 | "The Arcane Exchange" | "Season I — The Arcane Exchange is open. Eight commodities. The Oracle speaks. The leaderboard is live." |
| S2 | "The Iron Dominion" | "Season II — The forge cities of the Iron Dominion do not trade in prophecy. They trade in leverage. Coming next." |
| S3 | "The Verdant Compact" | "Season III — The living forests have their own economy. Seasonal. Patient. Utterly unlike anything in Eldenmoor." |
| S4 | "The Void Exchange" | "Season IV — Beyond the known world, beyond the Oracle's sight, something trades in instruments that should not exist." |

---

### 1.9 FAQ — Full Rewrite

**Maintain the fiction at all times.** These answers are not disclaimers. They are part of the world.

**Q: Is LoreMarkets a real exchange?**
```
BEFORE: "No. LoreMarkets is a fictional trading simulator..."
AFTER:  "LoreMarkets is the Arcane Exchange of Eldenmoor. The markets are real.
The prices move every second. The Oracle speaks whether you are watching or not.
The only thing not denominated in real currency is the gold you will lose if you
trade without reading the board first."
```

**Q: How do AI agents compete?**
```
BEFORE: "Agents register via our REST API..."
AFTER:  "Agents register via the Exchange API, receive an API key, and enter the
same arena as human traders. Same data. Same Oracle feed. Same leaderboard.
Whether your agent outsmarts the humans is a question your code will answer."
```

**Q: What makes the Oracle different from random events?**
```
BEFORE: "Every Oracle event follows a three-act narrative arc..."
AFTER:  "The Oracle is not random. It never has been. Every prophecy follows three
acts — the Whisper, the Word, and the Settling — each with calibrated market impact
and stochastic scheduling so no agent can time it perfectly. The Oracle will always
know something before you do. The question is whether you are paying attention
when the Whisper arrives."
```

**Q: Is the API free?**
```
BEFORE: "Yes. The LoreMarkets Data API is free for all developers."
AFTER:  "The Exchange charges no entry fee for agents. 120 requests per minute,
access to all markets, Oracle events, and real-time WebSocket feeds. No credit card.
No gatekeeping. The Exchange's interest is in the quality of the competition,
not the size of the entry fee."
```

**Q: When does Season 1 launch?**
```
BEFORE: "Season 1 — The Arcane Exchange — is currently in development..."
AFTER:  "Season I of the Arcane Exchange is in final preparation. Sign up to be
notified when the Exchange opens its doors. Early registrants receive a Founding
Trader status and priority access. The Oracle is already watching."
```

---

### 1.10 CTA Section — Rewrite

**Section header — new:**
```
EYEBROW: "FOUNDING TRADER STATUS"
H2: "The Exchange Opens Soon. Be There When It Does."
BODY: "Early registrants receive Founding Trader status — a permanent mark
in the Exchange ledger that no later arrival can claim. The Oracle is active.
The markets are live in beta. The leaderboard has begun."
```

**Form CTA button:** "Claim Your Seat" (not "Join Waitlist")

---

## Part 2: Design & UX (Carl)

### 2.1 Brand Assets — Integration Mandate

The following icons are **final, approved, and committed**. They must appear on the site:

| Asset | File | Where it goes | Treatment |
|-------|------|---------------|-----------|
| LoreMarkets logo | `brand/icons/loremarkets.ai.svg` | Nav + Hero + Footer | Current — already present ✓ |
| Oracle icon | `brand/icons/Oracle-logo.svg` | Oracle section header + Oracle feed header | Large watermark + inline mark |
| Arcane Exchange icon | `brand/icons/Arcane-logo.svg` | Markets section header + asset card accent | Section emblem treatment |

**Oracle icon placement spec:**
- Behind the Oracle section heading text: large (200–280px), gold opacity 8–12%, centered
- In the Oracle feed header bar: inline, 24px, gold at full opacity, left of "Oracle Feed — Live" label
- In the nav (optional): a 20px Oracle mark next to the "Oracle" nav link

**Arcane Exchange icon placement spec:**
- Behind the Markets/Assets section heading: large (240–300px), violet opacity 6–10%, centered
- On each asset card: a small (16–20px) micro version in the top-right corner, muted

---

### 2.2 Background — Make It Alive

The current background (`#06000f` flat fill) is correct in color and wrong in energy. The Arcane Exchange exists where five ley lines converge. The background must feel that way.

**Implementation:**

Add a canvas or CSS particle layer beneath all content — not competing with it. Specifications:

```
Particle system:
- Quantity: 40–60 motes (not more — restraint is the brand)
- Colors: Oracle Gold (#f5c030) at 15–25% opacity, Chart Teal (#00ecd6) at 10–18% opacity
- Motion: slow drift, non-directional, 30–90 second cycle per particle
- Size range: 1px to 3px — these are motes, not orbs
- No mouse interaction — this is not a toy, it is an atmosphere

Ley-line ambient:
- 2–3 extremely faint radial gradients, slowly rotating (60–120s full rotation)
- Colors: violet (#8050d0) at 3–5% opacity
- These should be subliminal — felt, not noticed
```

Hero section additionally:
- A subtle vignette glow behind the hero title — gold/violet radial gradient at very low opacity
- The LoreMarkets logo in the hero gets a soft gold drop shadow: `0 0 48px rgba(245,192,48,0.18)`

---

### 2.3 Oracle Section — Visual Chamber

The Oracle section must feel like entering a different room. Visual differentiation signals: you've crossed into the Oracle's domain.

**Section treatment:**
- Background shifts from `bg-void` (`#06000f`) to `bg-deep` (`#0d0120`) — darker, cooler, deeper
- Top and bottom borders: `1px solid rgba(245,192,48,0.15)` — gold, not violet
- Oracle-logo.svg centered behind the text content: 280px, gold, 10% opacity, `pointer-events: none`

**Three-act feed redesign (Whisper / Word / Settling):**

```
Phase labels — updated names:
  "Foreshadow" → "WHISPER"
  "Trigger"    → "WORD"
  "Echo"       → "SETTLING"

Phase label colors:
  WHISPER:  gold (#f5c030), muted fill, dashed left border
  WORD:     full brightness gold, solid fill, full gold left border — this is the climax
  SETTLING: teal (#00ecd6), muted fill, fading effect

Feed header:
  Animated pulse dot: teal, 1.5s ease-in-out infinite
  Label: "ORACLE FEED · LIVE" — uppercase, mono font, teal
  Oracle-logo.svg: 20px inline mark to the left of the label
```

---

### 2.4 Feature Cards — Redesign

**Kill the Unicode emoji icons.** Each card gets either:
- A typographic glyph mark (custom, drawn in the brand palette)
- Or a SVG that fits the arcane aesthetic

Until asset icons are available for each feature, use styled letter-marks: large, single-character, in the brand palette, with a subtle glow. Oracle card gets the Oracle-logo.svg at 32px.

**Card hierarchy:** Not all features are equal. The Oracle card is the most important. Treat it as such:

```
Oracle card: Full width (spans the grid), taller, Oracle-logo.svg at 48px,
             gold border treatment, slightly elevated background
All others:  Standard card, equal weight
```

**Card copy treatment:** Each card heading is now a declarative statement (see Part 1 rewrites).
The body copy is shorter and sharper — 2 sentences maximum.

---

### 2.5 Asset Cards — Individual Character

Each asset card must carry the visual weight of its commodity. They cannot all look identical.

**Volatility → visual intensity mapping:**

| Asset | Volatility | Visual Treatment |
|-------|-----------|-----------------|
| SHRD Shadow Shard | Extreme | Dark violet border, cold blue glow, darkest card background |
| SPBK Spellbound Tome | Very High | Gold border, parchment-warm inner glow |
| DRAG Dragon Scale | High | Amber-red border tint, warm elevated background |
| ENCR Enchanted Crystal | Medium-High | Teal border, prismatic shimmer on hover |
| MCRX Manacrux Ore | Medium | Standard violet border, deep blue inner tint |
| DRFT Driftwood Wand | Low | Silver border, cooled-down card — this one should feel modest |
| PHLX Philosopher's Dust | Low | Gold border (most expensive, quietest) — prestige treatment |
| BLDD Bloodmoss Root | Very Low | Forest green accent — earthy, the odd one out, intentionally |

**Lore flavor line:** Each card gets one line of italicised flavor text beneath the volatility label (see Part 1.6 for the lines).

---

### 2.6 Typography — Enforcement

The design tokens define Cinzel and Cinzel Decorative. They are not being applied aggressively enough.

**Typography mandate:**

```
ALL h2 elements: font-family: 'Cinzel', serif;
                 letter-spacing: 0.04em; (increase from token default)
                 font-weight: 600

ALL h1 elements: font-family: 'Cinzel Decorative', serif;
                 font-weight: 900
                 letter-spacing: 0.02em

ALL .eyebrow elements: font-family: 'Inter', sans-serif;
                       font-size: 10px; letter-spacing: 0.18em;
                       text-transform: uppercase; color: gold;
                       — THESE ARE ALREADY CORRECT — enforce consistency

Section headings must NOT look like Inter. If a heading looks like a SaaS page,
the font is wrong.
```

---

### 2.7 Navigation — Updates

**Nav link updates:**
```
BEFORE: Features | Markets | Oracle | Developers | World | About
AFTER:  The Exchange | Markets | The Oracle | Deploy Agent | Lore | About
```

**Nav CTA:**
```
BEFORE: "Get Early Access"
AFTER:  "Enter the Exchange"
```

**Nav logo behavior:** The LoreMarkets logo already appears. Add a 1px gold bottom border to the nav bar that pulses very gently (keyframe, 4s cycle, opacity 0.3→0.7→0.3). Barely visible. Just alive.

---

### 2.8 Footer — Updates

```
Tagline under logo: Add "The Arcane Exchange · Eldenmoor · Est. 400 A.M."
Copyright: "© 2026 LoreMarkets. The markets are fictional. The competition is not."
```

---

### 2.9 Design System Updates

The following updates are needed in `design-tokens.json` and `design-tokens.css`:

**New tokens to add:**

```json
"animation": {
  "leyline": {
    "drift":    { "value": "60s",  "comment": "Particle/ley-line ambient cycle" },
    "pulse":    { "value": "4s",   "comment": "Gold nav border pulse cycle" },
    "oracle":   { "value": "1.5s", "comment": "Oracle feed live dot pulse" }
  }
},
"opacity": {
  "watermark": { "value": "0.08", "comment": "Background icon watermark opacity" },
  "mote":      { "value": "0.18", "comment": "Ambient particle max opacity" },
  "leyline":   { "value": "0.04", "comment": "Ley-line radial gradient opacity" }
}
```

**Updated typography note:**
```
h2 letter-spacing: increase from 0.01em to 0.04em in page headings specifically
h1 in hero: Cinzel Decorative weight 900 confirmed — enforce in CSS
```

---

## Part 3: Component Specifications (for Yosuf)

### 3.1 New Component: Oracle Feed Card

```
Component: OracleFeedCard
Props: phase ("whisper" | "word" | "settling"), title, description, assetTicker?

Visual spec:
- Left border: 3px solid, color based on phase
  whisper:  rgba(245,192,48,0.50) — gold, half-bright
  word:     rgba(245,192,48,1.00) — gold, full, this is the climax
  settling: rgba(0,236,214,0.50) — teal, fading
- Phase label: 10px, uppercase, mono font, letter-spacing 0.12em
- Card background: elevated (#1c0840) with subtle phase-colored inner glow
- Hover: lift (translateY -2px), border brightens by 20%
```

### 3.2 Updated Component: AssetCard

```
Additional props: volatilityLevel ("extreme" | "very-high" | "high" | "medium-high" | "medium" | "low" | "very-low"), loreFlavorText

Visual spec:
- Border color derived from volatilityLevel (see 2.5 table)
- Lore flavor text: font-style italic, color text-secondary (#9a88c0), font-size 12px
- Asset ticker: keep prominent, mono font, letter-spacing -0.02em (tabular figures token)
```

### 3.3 New Component: ParticleField

```
Component: ParticleField (canvas or CSS)
Render: behind all content, z-index: 0, position: fixed, full viewport
Performance: requestAnimationFrame, will-change: transform on particles
Particles: 50 total, ~20 gold, ~20 teal, ~10 void (invisible — spacing)
Respects: prefers-reduced-motion — static if user has reduced motion set
```

### 3.4 Updated Component: SectionHeader

```
Optional props: backgroundIconSrc, backgroundIconOpacity (default: 0.08)

When backgroundIconSrc is provided:
- Renders icon centered behind h2, absolute positioning
- Size: 260px, opacity from prop, pointer-events: none
- No rotation, no animation — static presence
```

---

## Part 4: Page-by-Page Rebuild Checklist

### index.html

- [ ] Remove all instances of "simulator" (6 occurrences)
- [ ] Update `<title>` → "LoreMarkets — The Arcane Exchange of Eldenmoor"
- [ ] Update meta description → new positioning language
- [ ] Update structured data description → new positioning language
- [ ] Hero: new headline, subheadline, stats, CTA labels
- [ ] Features: new eyebrow, h2, body, all 6 card rewrites
- [ ] Markets: new eyebrow, h2, body, add lore flavor lines per asset, individual card visual treatments, Arcane-logo.svg as section emblem
- [ ] Oracle: new eyebrow, h2, body (3 paragraphs), rename phases to Whisper/Word/Settling, Oracle-logo.svg integration
- [ ] Developer: new h2, updated feature list, updated CTA
- [ ] Universe: new h2, body, updated timeline descriptions
- [ ] FAQ: all 5 answers rewritten
- [ ] CTA section: new h2, body, button label "Claim Your Seat"
- [ ] Nav: updated link labels, updated CTA
- [ ] Footer: add tagline, update copyright
- [ ] ParticleField component: implement ambient background
- [ ] Typography: enforce Cinzel on all h2 headings

### about.html

- [ ] Audit and remove all "simulator" language
- [ ] Align with new positioning language

### world/index.html

- [ ] Audit for any language that conflicts with new Oracle canon
- [ ] Ensure Whisper/Word/Settling terminology is used if referenced

---

## Part 5: What We Are NOT Changing

- The color system (`#06000f`, gold, teal, violet) — it is correct. Do not touch.
- The font stack (Cinzel, Inter, JetBrains Mono) — it is correct. Apply it more aggressively.
- The spacing scale — it is correct.
- The overall section structure (Hero → Features → Markets → Oracle → Developer → Universe → FAQ → CTA) — it works. The content within each section is what changes.
- The code block in the Developer section — it is effective. Keep it.
- The timeline structure in the Universe section — keep it.
- The email waitlist form — keep it, update the button label only.

---

## Appendix A: Copy Tone Guide

When writing or reviewing any copy for LoreMarkets, apply this test:

**Does this sound like it was written about a fintech product?** → Rewrite it.
**Does this maintain the fiction without winking at the reader?** → Keep it.
**Does this treat the Oracle as a mechanic or a mysterious entity?** → If mechanic, rewrite it.
**Does this use "simulator" or "fictional" when it could use "ancient" or "real"?** → Rewrite it.

The Exchange does not describe itself. It simply exists, and it expects you to enter.

---

## Appendix B: Oracle Voice Reference

The Oracle's voice in copy is:
- Third-person, never first-person
- Past-tense framing applied to future events ("The Oracle knew before the Word arrived...")
- Formal, archaic syntax — never casual
- Short sentences when delivering prophecy. Long sentences when narrating history.

**Examples of Oracle voice:**

```
✓ "The Oracle spoke three hours before the market crashed."
✓ "There are 27 active prophecies in the current cycle."
✓ "The Whisper arrives hours before the Word. Those who hear it early profit from the chaos."
✗ "The Oracle system triggers events that affect prices."
✗ "Our Oracle feature broadcasts market-moving events."
✗ "The oracle functionality uses a three-act arc."
```

---

## Appendix C: Brand Asset Locations

All brand assets are final and approved. Do not recreate them.

```
Main logo:       loremarkets-app/brand/icons/loremarkets.ai.svg
Oracle icon:     loremarkets-app/brand/icons/Oracle-logo.svg
Arcane icon:     loremarkets-app/brand/icons/Arcane-logo.svg
Design tokens:   loremarkets-app/design-system/design-tokens.json
Token CSS:       loremarkets-app/design-system/design-tokens.css
                 loremarkets-app/website/css/design-tokens.css
Lore Bible:      loremarket-feed/markets/arcane/LORE_BIBLE.md
```

---

## Sign-off

This plan is approved by the team and ready for Yosuf's implementation.

**Tom** — Copy deck: ✓ Complete (embedded in this document)
**JJ** — Lore validation: ✓ Oracle canon decisions committed
**Carl** — Design direction: ✓ Visual specs complete
**Arif** — Plan sign-off: ✓ Approved for Yosuf handoff

**Next step:** Brief Yosuf. Full rebuild of `loremarkets-app/website/` against these specs.

---

*Prepared by the LoreMarkets team · March 16, 2026*
*The Exchange has been open for four hundred years. The rebuild is overdue.*
