# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

There is no build step, package manager, or test runner. React 18, ReactDOM, and `@babel/standalone` are loaded from `unpkg.com` via `<script>` tags in `Helix CRM.html`, and every `.jsx` file is transpiled in the browser via `<script type="text/babel">`.

To preview, open `Helix CRM.html` in a browser — but `file://` will fail because the CDN scripts have `integrity` / `crossorigin` attributes and Babel fetches sibling JSX files. Serve the folder over HTTP, e.g.:

```powershell
python -m http.server 8000
# then open http://localhost:8000/Helix%20CRM.html
```

PNGs in `_review/` are reference screenshots of various views and states — not part of the runtime.

## Architecture

This is a single-page React prototype with **no module system**. Understanding the load order and global-namespace conventions is the only non-obvious part.

### Script load order (in `Helix CRM.html`)
`data.js` → `icons.jsx` → `tweaks-panel.jsx` → UI primitives (`sidebar`, `topbar`, `charts`, `pipeline`, `customers`, `ai-panels`, `modals`, `popovers`) → view bundles (`views-1`, `views-2`, `views-components`) → `app.jsx`. Each file declares its dependencies in a `/* global ... */` header comment. Don't reorder — `app.jsx` must load last, and primitives must load before the view bundles that consume them.

### Global namespace
Every component, hook, and dataset is attached to `window` (either implicitly via top-level `function Foo()` in a Babel-transpiled file, or explicitly via `window.HELIX_DATA = ...`, `window.InboxView = ...`). `app.jsx` references some views as `<window.InboxView/>` because they're defined in later-loading bundles — this isn't a typo, it's how forward refs to globals work here.

If you add a new view bundle, append it to the script list in `Helix CRM.html` **before** `app.jsx`, and reference it from `App` either directly (if loaded before app.jsx) or as `<window.NewView/>`.

### Naming collisions
`views-1.jsx` and `views-2.jsx` deliberately alias React hooks to dodge redeclaration in the global scope: `const { useState: useState2, useMemo: useMemo2 } = React;`. `popovers.jsx` uses `useP`/`usePE`/`usePR`; `modals.jsx` uses `useM`/`useME`/`useMR`. Preserve this pattern when adding to those files — using bare `useState` will throw a redeclaration error at runtime.

### Routing & app shell
`App` in `app.jsx` is a switch on a `page` string (`'dashboard' | 'pipeline' | 'contacts' | 'deals' | 'inbox' | 'reports' | 'automations' | 'calendar' | 'chat' | 'settings' | 'components'`). The nav list lives in `sidebar.jsx` (`NAV_MAIN`, `NAV_WORK`, `NAV_RESOURCES`). Adding a page = add to one of those arrays + add a case in `App`.

### Cross-component communication: custom DOM events
Components do **not** receive `onCreateDeal` etc. as props. They dispatch `window.dispatchEvent(new CustomEvent('helix:new-deal'))` and `App` listens. The full event bus is registered in `app.jsx` near "Global event bus for 'create X' actions":

- `helix:new-deal`, `helix:new-contact`, `helix:new-event`, `helix:new-automation`, `helix:compose` — open the corresponding modal
- `helix:open-ai` — open the AI assistant panel
- `helix:confirm` — `detail` is `{ title, message, onConfirm, confirmLabel, destructive }`
- `helix:toast` — `detail` is the toast message string
- `helix:openpalette` — open command palette

Use this pattern for any "open modal from a deep child" interaction rather than threading callback props.

### Theming
Theme is `[data-theme="dark|light"]` on `<html>`, applied in `app.jsx`. Accent color is one of five presets (`indigo`, `emerald`, `rose`, `amber`, `slate`) and is written to CSS custom properties `--a1`/`--a2`/`--a3`/`--accent` on `:root`. Density (`compact`/`comfy`/`spacious`) sets `--density` (0.8 / 1 / 1.15) which scales the `--pad-*` token family in `styles.css`. **All styling goes through these tokens** — no hardcoded colors, paddings, or shadows. See the `:root { ... }` block in `styles.css` for the full token list.

### Tweaks panel & EDITMODE block
`tweaks-panel.jsx` is a reusable floating settings panel that talks to a host iframe via `postMessage` (`__activate_edit_mode`, `__edit_mode_set_keys`, `__edit_mode_dismissed`, etc.). It is hidden by default and only opens when the host activates it — opening it locally requires the host protocol to fire.

The `TWEAK_DEFAULTS` constant at the top of `app.jsx` is wrapped in `/*EDITMODE-BEGIN*/.../*EDITMODE-END*/` sentinels. The host rewrites the JSON inside that block on disk when tweaks change. **Do not move, rename, or reformat these sentinels** — keep the JSON literal directly between them. Add a new tweak by: (1) adding a key/value to that JSON, (2) wiring a `useEffect` in `App` to apply it, (3) adding a `Tweak*` control inside the `<TweaksPanel>` at the bottom of `App`.

### Pipeline drag-and-drop
`Pipeline` in `pipeline.jsx` uses native HTML5 drag-and-drop, mutates `deals` (a `{ stageId: deal[] }` map held in `App` state), and bumps `deal.progress` to a hardcoded value per stage index (`[18, 40, 60, 80, 100]`) when a deal moves. The same component is rendered both on the Dashboard and on the dedicated Pipeline view.

### Data
All "data" is mocked in `data.js` and exposed as `window.HELIX_DATA` (`SEED_DEALS`, `STAGES`, `CUSTOMERS`, `ACTIVITY`, `REV_THIS`, `REV_LAST`, `MONTHS`, `FUNNEL`, `HEAT`). A few view bundles also define their own local mock arrays (e.g. `THREADS` in `views-1.jsx`, `EVENTS` in `views-2.jsx`). There is no API layer or persistence.
