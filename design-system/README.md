# LoreMarkets — Design System
**Version:** 1.3.0 · **Status:** Active · **Owner:** Carl (UX/UI Lead)

This folder is the single source of truth for the LoreMarkets visual identity. It lives in the root of every repository that builds a LoreMarkets product (website, app, admin panel). When the website repository is created, this folder moves there as-is.

---

## What's In Here

```
design-system/
├── README.md            ← You are here. Start here.
├── design-tokens.css    ← Import this into your app. All CSS custom properties.
├── design-tokens.json   ← Figma Tokens Studio / Style Dictionary source.
└── icon-briefs.md       ← Outsource briefs for all 5 market icons.
```

**Brand assets** (logos, icons, showcase) live in `/brand/`.

---

## Quick Start — Developers

### 1. Import the tokens
```css
/* At the top of your global stylesheet */
@import '../design-system/design-tokens.css';
```

### 2. Load the fonts
```html
<!-- In your <head> — use preconnect for performance -->
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>
```

### 3. Use tokens, never raw values
```css
/* ✓ Correct */
color: var(--color-brand-gold);
background: var(--color-surface);
font-family: var(--font-heading);

/* ✗ Wrong — hardcoded values break theming and cause drift */
color: #f5c030;
background: #160430;
```

---

## Design Tokens — Reference

### Backgrounds (darkest → lightest)
| Token | Value | Use |
|-------|-------|-----|
| `--color-bg-void` | `#06000f` | Primary app background |
| `--color-bg-deep` | `#0d0120` | Section / panel bg |
| `--color-surface` | `#160430` | Default card |
| `--color-surface-elevated` | `#1c0840` | Raised card, modals |
| `--color-surface-hover` | `#2a1058` | Hover, active row |

### Brand Colours
| Token | Value | WCAG on `--color-bg-void` | Use |
|-------|-------|--------------------------|-----|
| `--color-brand-gold` | `#f5c030` | 12.29:1 — AAA ✓ | Primary accent, headings, logo |
| `--color-brand-teal` | `#00ecd6` | 13.77:1 — AAA ✓ | Data, chart, MARKETS wordmark |
| `--color-violet` ⚑ | `#8050d0` | 3.92:1 — Fails AA | **Decorative only.** Never body text. |
| `--color-text-primary` | `#f5f0ff` | 18.52:1 — AAA ✓ | All body copy |

### ⚑ Accessibility Hard Rules (Carl)
1. `--color-violet` **must never** be used for text below 18px normal weight or 14px bold. Use it only for icons, decorative borders, and backgrounds.
2. `--color-text-muted` (`#6a5a90`) and `--color-text-secondary` (`#9a88c0`) are **not safe** for small body copy. Use only for large labels or decorative text where WCAG exceptions apply.
3. All interactive states (hover, focus, active) must maintain at minimum WCAG AA (4.5:1) contrast.
4. Focus rings must be visible. Default: `outline: 2px solid var(--color-brand-gold); outline-offset: 3px;`

### Typography
| Token | Value | Use |
|-------|-------|-----|
| `--font-display` | `'Cinzel Decorative', serif` | Logo, hero, ceremonial |
| `--font-heading` | `'Cinzel', serif` | H1 – H3 |
| `--font-body` | `'Inter', sans-serif` | All body, labels, UI |
| `--font-mono` | `'JetBrains Mono', monospace` | Code, addresses |

### Market Theme Tokens
Each market has its own accent system. Use these when building market-specific screens:
- `--color-arcane-*` — Arcane Exchange (default/MVP)
- `--color-iron-*` — Iron Dominion
- `--color-verdant-*` — Verdant Compact
- `--color-void-ex-*` — Void Exchange

---

## Logo & Icon Usage — Rules

### Logo file — Final asset
The master logo is finalised. Source file: `brand/loremarkets.ai.svg`

### Oracle Codex icon — Final asset
The Oracle Codex sigil mark is finalised. Source file: `brand/loremarkets-oracle.svg`
Use for: app icon, favicon base, social profile, nav badge, leaderboard mark, tournament assets.

### Which lockup to use
| Context | Lockup | File |
|---------|--------|------|
| Website header, email header, OG image | **Horizontal lockup** (Primary) | `brand/loremarkets.ai.svg` |
| Social profile, app store, mobile splash | **Stacked / icon lockup** | `brand/loremarkets.ai.svg` |
| Merch, game loading screen, Discord | **Badge / emblem** | `brand/loremarkets.ai.svg` |
| Favicon, browser tab | **Micro variant** (16×16, hex + teal dot) | Export from `brand/loremarkets.ai.svg` |

### Minimum sizes
- Full horizontal lockup: **180px wide minimum**
- Icon mark alone: **24px minimum**
- Below 24px: use dedicated **micro/favicon variant only**

### Clear space
- Full lockup: 1× badge width clearance on all sides
- Icon alone: 0.5× icon width clearance

### Never do
- Place the logo on a light or white background (no light-mode variant exists yet)
- Remove the black outline strokes from icon elements
- Change the gold → teal colour split in the wordmark
- Scale the icon below 16px without switching to the micro variant
- Add drop shadows to the wordmark text (glow filters only)

---

## Icons — Current Status

| Icon | Status | Location |
|------|--------|----------|
| LoreMarkets Master Logo | ✅ **FINAL** — approved & committed | `brand/loremarkets.ai.svg` |
| Oracle Codex Sigil | ✅ **FINAL** — approved & committed | `brand/loremarkets-oracle.svg` |
| Arcane Exchange | ✅ **FINAL** — approved & committed | `brand/icons/arcane-exchange.svg` |
| Iron Dominion | ⏳ Brief written | `/design-system/icon-briefs.md` |
| Verdant Compact | ⏳ Brief written | `/design-system/icon-briefs.md` |
| Void Exchange | ⏳ Brief written | `/design-system/icon-briefs.md` |

All market icons live in `/brand/icons/` — one file per market.

---

## Figma Setup (Carl's instructions for the design team)

1. Install **Tokens Studio** plugin in Figma
2. Import `design-tokens.json` as your token source
3. Map tokens to Figma styles — **do not create Figma colour styles manually**, always source from the JSON
4. When tokens change, update the JSON file first, then sync to Figma. Never the other way around.
5. The JSON is the source of truth. Figma is the view.

---

## Versioning

| Version | Date | Change |
|---------|------|--------|
| 1.3.0 | 2026-03-15 | Arcane Exchange market icon finalised — `brand/icons/arcane-exchange.svg` committed. arcane-icon-src token added. |
| 1.2.0 | 2026-03-15 | Oracle Codex icon finalised — `brand/loremarkets-oracle.svg` committed. Oracle icon-src token added. Icon status table updated. |
| 1.1.0 | 2026-03-15 | Logo finalised — `brand/loremarkets.ai.svg` committed as master brand asset. Logo usage table updated. Icon status updated to FINAL. |
| 1.0.0 | 2026-03-15 | Initial design system — colours, typography, spacing, logo rules, market themes |

When a token value changes, bump the version in this README and in the `$meta` block of `design-tokens.json`. Announce the change to Yosuf (dev) so CSS variables are updated in production.

---

*Maintained by Carl (UX/UI) · Toni owns brand graphic assets · Arif owns prioritisation · Token updates require Carl + Yosuf sign-off*
