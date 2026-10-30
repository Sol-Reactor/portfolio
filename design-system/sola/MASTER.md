# SOL Design System

The source of truth for tokens is `src/index.css` (`@theme` for light, `.dark` for dark).
This file explains the intent behind them.

## Identity

- **Default theme:** dark navy. A light variant is available from the navbar toggle.
- **Logo:** `LogoMark` (an "S" with a terminal cursor on the accent square) plus the animated `SOLOMON → SOL` wordmark.
  `public/favicon.svg` mirrors the mark.
- **Voice:** practical, precise and honest. No invented metrics, clients or titles.

## Colour tokens

Palette and type follow the beimnetzewdu.com reference (Outfit, navy dark theme, indigo accents).

| Token | Dark | Light | Use |
|---|---|---|---|
| `bg` | `#0d0f1a` | `#f5f7fa` | Page background |
| `surface` / `surface-2` | `#161929` / `#1e2235` | `#ffffff` / `#eef0f8` | Cards, inputs, hovers, active pills |
| `line` / `line-strong` | `#232640` / `#3d4268` | `#e5e7eb` / `#d1d5db` | Borders, timeline track |
| `ink` / `muted` | `#eef0f8` / `#8b93b4` | `#111827` / `#5b6270` | Body and secondary text |
| `accent` / `accent-hover` | `#1b2598` / `#151d80` | same | Buttons (white text), root nodes |
| `accent-soft` | `#a5b4fc` | `#1b2598` | Accent text, icons, eyebrows, active markers |
| `heading` / `heading-em` | `#eef0f8` / `#818cf8` | `#111827` / `#1b2598` | Headings and their accent words |
| `danger` / `success` | `#ff8f85` / `#6fd59a` | `#b42318` / `#1f7a45` | Form feedback |

`heading-em` is brightened from the reference's `#1b2598` in dark mode, which is only about 1.6:1 on navy.
Shadow and glow tints use indigo `rgb(99 102 241)`.

## Typography

- **Outfit** everywhere (300–700). Geist Mono only for the About terminal and the logo wordmark.
- Hero name `clamp(3rem, 7.5vw, 5.75rem)`, weight 700, tracking -0.045em, line-height 0.92.
- Hero eyebrow 14px, weight 500, uppercase, tracking 0.14em. Hero role `clamp(1rem, 2.2vw, 1.3rem)`, weight 500, `accent-soft`.
- Section titles `clamp(1.85rem, 4vw, 2.6rem)`, weight 600, tracking -0.03em. Write `*word*` in a title for the accent colour.
- Body 16px with line-height about 1.7. Experience roles `clamp(1.05rem, 2.2vw, 1.3rem)`, company 12px bold uppercase.

## Components and patterns

- **Navbar:** fixed, blurs once scrolled, with a shared sliding pill (`layoutId="nav-pill"`) for the active section.
  Below `lg` it becomes a right-side drawer (focus trapped, Esc to close, scroll locked).
- **Side rails (`xl` and up only):** socials on the left, section dots on the right. They are mouse shortcuts,
  hidden from screen readers and Tab, so the navbar stays the single primary navigation.
- **Experience:** vertical timeline with a scroll-filled track. Only a current role pulses.
- **Contact:** introduction and method cards on the left, a validated form on the right. The form delivers through
  `VITE_CONTACT_ENDPOINT` when set, otherwise it hands off to the email app and says so.
- **Cards:** 12–16px radius, 1px `line` border, soft tinted shadow, small lift on hover.

## Motion

- Entrances: 0.3–0.6s, ease `[0.21, 0.6, 0.35, 1]`, triggered once in view.
- Micro-interactions: 150–300ms colour, shadow and transform changes. No layout-shifting hovers.
- Everything respects `prefers-reduced-motion` (`MotionConfig reducedMotion="user"` plus a CSS fallback).

## Layout

- Container `max-w-6xl` with `px-5 sm:px-8`. Sections `py-20 sm:py-28`.
- Touch targets are at least 44px. Inputs are 16px so iOS doesn't zoom.
- Z-index scale: content 0–10, side rails 30, navbar 40, drawer and overlay 50, skip link 60.
