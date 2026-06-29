# Saluki Registration System — Pitch Dashboard

A polished, **fully static** front-end demo of the Saluki Registration System for the
**Arabian Saluki Center** (Emirates Falconers Club), built to showcase the platform to the client.
All data is hardcoded dummy data from the [master specification](Saluki_Registration_System_Master_Spec.md) —
there is no backend, but it behaves like a real working product.

> Build progress and the remaining backlog are tracked in [TASKS.md](TASKS.md).

---

## Running it

It's plain HTML/CSS/JS with **no build step** and **no external dependencies** (Chart.js and the fonts
are vendored locally), so any static file server works.

**Option A — one-liner (Node):**
```bash
npx http-server . -p 4178 -c-1
# then open http://localhost:4178
```

**Option B — any static server**, e.g. `python -m http.server`, the VS Code "Live Server" extension,
or just open `index.html` directly in a browser (it works from `file://` too, since everything is local).

> Tip: after editing files, do a hard refresh (`Ctrl/Cmd + Shift + R`) to bypass the browser cache.

**Sign in** with the demo credentials (pre-filled on the login screen): **`admin`** / **`saluki2026`**.
This is mock front-end auth for the pitch — it just gates the dashboard view; there's no backend.

---

## What's inside

**10 screens**, switched via the sidebar (single-page, no reloads):

| Screen | Highlights |
|---|---|
| Overview | KPI cards, 4 live charts, activity feed, upcoming events, quick actions |
| Saluki Registry | Search · filters · column sort · pagination; row → profile |
| Saluki Profile | 4 tabs (Info / Medical / Competitions / Pedigree), QR ID card, pedigree tree, passport |
| Registration Queue | Filter tabs, review drawer, Approve / Request Info / Reject |
| Competitions | Events calendar, championship leaderboard, participation chart |
| Breeder Registry | Licensed kennels + litter registry + puppies |
| DNA Verification | Records with sire/dam parentage matching |
| Analytics | 6 charts + demographics + exportable reports |
| Members | Membership directory with tiers, status, renewals |
| Notifications | Filter tabs, read/unread, mark-all-read |

**Interactive flows:** register-a-Saluki wizard (4 steps), ownership transfer, and a printable
Digital Passport (Print / Save as PDF).

**Also:** dark / light theme toggle (persisted), live global search, animated counters & charts,
and a responsive layout.

---

## Project structure

```
index.html                      # app shell + Overview markup
logo.png                        # Arabian Saluki Center badge
assets/
  css/
    tokens.css                  # brand colours, light/dark themes, design tokens
    base.css                    # reset, layout, sidebar/topbar, utilities
    components.css              # cards, KPIs, badges, buttons, feed, charts
    screens.css                 # tables, tabs, profile, pedigree, drawer, notifications
    modals.css                  # dialogs, wizard, forms, passport + print styles
    fonts.css + webfonts/       # self-hosted Inter / Sora / Noto Kufi Arabic
  js/
    data.js                     # all dummy data (single source of truth)
    icons.js                    # inline SVG icon set
    theme.js  i18n.js           # theme switcher; UI copy (English)
    charts.js                   # Chart.js setup (multi-renderer, theme-aware)
    ui.js  modals.js            # shared render helpers; modal flows
    app.js                      # boot, navigation, interactions
    views/                      # one module per screen (lazy-rendered)
  vendor/chart.umd.min.js       # vendored Chart.js
```

## Design notes

- **Brand:** amber-gold gradient on a warm dark (or light) theme, per the spec's design tokens.
- **Offline-first:** no CDN calls — works without internet, ideal for an on-site pitch.
- **Charts** render synchronously (Chart.js animation is disabled) so they never blank out on
  background tabs, and re-render on navigation / theme change.
- **Logo** is the official `arabiansaluki.com` badge.

---

*AMC Advertising & Marketing Consultants — Abu Dhabi, UAE*
