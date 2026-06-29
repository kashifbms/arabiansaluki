# Saluki Registration System — Pitch Dashboard · Build Tracker

> Static, multi-file front-end demo for the **Arabian Saluki Center** pitch (Emirates Falconers Club).
> Source of truth: [`Saluki_Registration_System_Master_Spec.md`](Saluki_Registration_System_Master_Spec.md).
> Goal: feels like a real working product, but all data is hardcoded dummy data from the spec.

**Legend:** ✅ Done · 🟡 In progress · 🔜 Queued · 💤 Backlog / nice-to-have

---

## 0 · Foundation & Design System
- ✅ Project scaffold (multi-file static: `index.html` + `assets/css` + `assets/js`)
- ✅ Design tokens — brand colors, radii, shadows, spacing (`tokens.css`)
- ✅ **Light / Dark theme switcher** (persisted to `localStorage`, no flash on load)
- ✅ Typography — Sora (display) + Inter (body) + Noto Kufi Arabic (Arabic)
- ✅ Icon system (inline SVG set, hydrated from `data-icon`)
- ✅ App shell — collapsible sidebar nav, sticky glass topbar, responsive grid
- ✅ **Sign-in gate** — shows on **every load** (no persistence), defaults to **light**; logo + username/password (demo: `admin` / `saluki2026`), show/hide password, theme toggle, error+shake on wrong creds. Sign-in reveals the **dark** dashboard; **Sign Out** returns to the light login. (Mock front-end auth for the pitch.)
- ✅ **Official `logo.png`** wired into sidebar + favicon (replaced placeholder)
- ✅ **Density + premium pass** — tighter sidebar/topbar/cards, smaller KPIs (≈161px, 5/row), tabular figures, refined spacing
- ✅ **Dashboard is English-only** (admin tool). Bilingual EN/AR is for the end-user product (mobile app / public pages), not this dashboard — Arabic toggle removed.
- ✅ Dummy-data module (`data.js`) — seeded from spec demo blocks
- ✅ Reusable components — cards, KPI cards, badges, buttons, feed, progress, toasts
- ✅ Live date in topbar, animated count-up KPIs, hover micro-interactions
- ✅ **Lazy view architecture** — each screen renders on first visit from `data.js` via `ASC.views.*`; shared render helpers in `ui.js`, screen styles in `screens.css`

## 1 · Screens (14 total)
- ✅ **Overview / Home** — KPI cards, charts (trend/emirate/breed/status), activity feed, upcoming events, quick actions
- ✅ **Saluki Registry** — search + 4 filters + column sort + pagination, status/colour/DNA cells, row → profile, Register/Export
- ✅ **Saluki Profile** — 4 tabs (Info / Medical / Competitions / Pedigree), QR ID card, pedigree tree, performance chart, passport button; graceful empty-states for sparse records
- ✅ **Owners** + **Owner Profile** (Module 2) — directory with search/filter; profile shows identity & contact, **Emirates ID (masked PII + reveal-with-audit)**, ID-document verification tiles, and linked Salukis (cross-linked with Saluki Profile)
- ✅ **Registration Queue** — status filter tabs + live counts, review list, slide-in drawer with document checklist & photos, Approve / Request Info / Reject (updates status)
- ✅ **Competitions** — events calendar cards, championship leaderboard (medal ranks), participation-by-type chart
- ✅ **Breeder Registry** — licensed kennels table + litter registry + featured-litter puppies; **functional Register-Litter wizard** (3 steps: parentage with sire/dam verification → litter details → per-puppy temp IDs) that adds to the table and updates stats
- ✅ **DNA Verification** — records table with sire/dam parentage match cells + Confirmed/Pending/Disputed status
- ✅ **Analytics** — 6 charts (trend line, emirate/age/participation bars, breed/compliance donuts) + demographics + exportable reports
- ✅ **Members** — KPI strip, search + tier/status filters, directory table with tier badges & renewal dates
- ✅ **Notifications** — outbound push/email/SMS: campaigns table + automated trigger matrix (channel toggles) + bilingual multi-channel composer
- ✅ **App Content (CMS)** — bilingual EN/AR management of app banners, announcements & home cards, with live EN↔ع preview toggle + side-by-side editor (Module 24)
- ✅ **Support** — member ticketing: status filter tabs, ticket table, conversation drawer with reply + Resolve/Close
- ❌ ~~Mobile App showcase~~ — removed; the pitch shows the admin back-office that *manages* the app experience, not app mockups

## 2 · Cross-cutting polish (after screens)
- ✅ Functional table search / filter / sort / pagination (registry & members)
- ✅ Review drawer with Approve / Request Info / Reject (queue)
- ✅ **Topbar global search** jumps into the registry with the query applied
- ✅ **Register-a-Saluki wizard** (4-step modal) + **ownership-transfer** flow
- ✅ **Digital Passport** preview + **Print / Save as PDF** (print stylesheet); QR rendered on profile & passport
- ✅ **Bilingual content management** (Module 24) — admins manage EN/AR app content (home, banners, announcements)
- ✅ **Push / Email / SMS management** (Module 18) — campaigns + automated trigger flow + composer
- ✅ **Support ticketing** — member requests, conversation threads, status workflow
- 💤 Public QR verification mock page

## 3 · Delivery
- ✅ Vendored Chart.js + Google Fonts (Inter/Sora/Noto Kufi) locally → **fully offline, no CDN**
- ✅ Local preview via `.claude/launch.json` (http-server on :4178)
- ✅ README with run instructions

---

## Decisions / Notes
- **Stack:** plain HTML/CSS/JS (no build step) so it opens via any static server.
- **Charts:** Chart.js 4 vendored at `assets/vendor/`. **Fonts:** Inter/Sora/Noto Kufi vendored at `assets/css/webfonts/` (`fonts.css`). **No external requests** — works fully offline.
- **Theme:** dark is default (matches spec), light theme derived in warm sand tones; gold gradient constant across both.
- **Logo:** stylized saluki badge as an SVG placeholder — swap with the official `arabiansaluki.com` badge when available.
- **Numerals:** Western digits kept in data views for clarity (Arabic-Indic numerals noted as a later option).
- **Charts paint synchronously** (`animation:false` + explicit `draw()`): Chart.js routes animated rendering through `requestAnimationFrame`, which browsers pause on hidden/backgrounded tabs — leaving canvases blank with no auto-repaint. Forcing `draw()` guarantees they render regardless of tab visibility. Also re-render on `visibilitychange`/resize.

_Last updated: 2026-06-30 — added a sign-in gate (mock auth) before the dashboard; Add-Event flow; balanced KPI grid. 14 screens, all verified._
