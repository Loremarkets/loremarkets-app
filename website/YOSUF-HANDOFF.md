# LoreMarkets Website Rebuild — Yosuf Handoff
**From:** Arif (PM)
**To:** Yosuf (Full-Stack Architect)
**Date:** March 16, 2026

---

## What This Is

The `loremarkets-app/website/` HTML/CSS/JS site needs a full rebuild.
All decisions have been made. Your job is implementation, not design or copy.
Everything you need is in this folder.

---

## Read These First (In This Order)

1. `IMPROVEMENT-PLAN.md` — Full spec. Every copy change, every design decision, every component.
2. `../design-system/design-tokens.json` — Updated tokens (v1.4.0). New ambient animation and opacity scales.
3. `../design-system/design-tokens.css` — Use as your CSS variable source.
4. `../../loremarket-feed/markets/arcane/LORE_BIBLE.md` — World context. Read it. You will understand the product better.

---

## Brand Assets (Do Not Recreate — They Exist)

```
Main logo:    ../brand/icons/loremarkets.ai.svg
Oracle icon:  ../brand/icons/Oracle-logo.svg     ← currently unused on site. Fix this.
Arcane icon:  ../brand/icons/Arcane-logo.svg     ← currently unused on site. Fix this.
```

---

## Critical Rules

1. **Never use the word "simulator"** in any visible text.
2. **Oracle phases are named**: Whisper / Word / Settling. Not Foreshadow / Trigger / Echo.
3. **All three icons must appear** on the page in the sections defined in IMPROVEMENT-PLAN.md.
4. **The background must animate** — ParticleField component, see Part 3.3 of the plan.
5. **Cinzel / Cinzel Decorative** on all headings. Inter on body. JetBrains Mono on code only.
6. **Respect prefers-reduced-motion** — ParticleField is static if user has reduced motion set.

---

## What You're Rebuilding

The site at `website/index.html` and its CSS/JS. Same HTML file structure (single-page).
The section order stays the same. The content within each section changes.

**Scope:**
- `index.html` — Full rebuild against plan
- `css/styles.css` — Update to support new components and typography enforcement
- `js/main.js` — Add ParticleField implementation
- `about.html` — Remove "simulator" language, light alignment pass
- `world/index.html` — Light audit only

---

## Key New Components to Build

| Component | Description | Spec Location |
|-----------|-------------|---------------|
| `ParticleField` | Ambient background mote system | Plan Part 3.3 |
| `OracleFeedCard` | Three-phase Oracle event display | Plan Part 3.1 |
| Updated `AssetCard` | Individual volatility visual treatments + lore flavor | Plan Part 3.2 |
| Updated `SectionHeader` | Background icon watermark support | Plan Part 3.4 |

---

## Questions?

If anything is ambiguous, come back to Arif before implementing. Do not interpret.

The plan is complete. Build it.

---

*Arif · PM · March 16, 2026*
