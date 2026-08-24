# Funky Dancer — Modern Version Enhancement Plan

**Status:** Scope decided, implementation not yet started.

This is the plan for what lands behind the "Modern" side of the toggle
we added (currently a "Coming Soon" placeholder). The Classic 2017
edition is frozen as a time capsule — nothing below touches it.

---

## Decisions So Far

| Question | Decision |
|---|---|
| Scope | **Full rewrite**, new stack |
| Pace | **Ongoing hobby project** — no fixed deadline |
| Priorities | **Gameplay feel, visual polish, mobile/touch support, more content** (roughly in that order of what shapes the engine choice) |
| Classic edition | **Frozen** — no further changes beyond what's already done |
| Missed notes | **Break the streak**, same as a wrong key press |
| Backend | **None** — static site only, `localStorage` for personal high scores |
| Hosting | **Must run on GitHub Pages** — client-side only, no server |
| Tech stack | **Phaser 3 + TypeScript**, built with **Vite** (see rationale below) |
| Charting new songs | **Offline onset-detection script** for first-draft charts (Python + `librosa`), refined by ear, **plus** an in-app charting tool later for ongoing use |

### Why Phaser 3 + TypeScript + Vite

The priority list (gameplay feel, visual polish, mobile) all point the
same direction: less time hand-building engine plumbing, more time on
the actual game. Phaser gives us, out of the box, what CreateJS didn't:

- **Scene management** — menu, song select, gameplay, and results as
  clean, separate states instead of one big `DOMContentLoaded` handler.
- **Unified input** — keyboard and touch normalized through the same
  system, so mobile support isn't a separate input layer bolted on.
- **Tweens and particle emitters** — exactly what hit-effects and combo
  celebrations need.
- **An audio manager** with volume/mute built in, instead of hand-rolled
  `new Audio()` calls scattered through the code.
- 100% client-side, builds to static files, deploys cleanly to GitHub
  Pages — well-worn territory with existing Phaser+Vite templates.

TypeScript is worth it given this is an *ongoing* project — types pay
for themselves the more you come back to code after time away.

### Repo & deployment layout — resolved

Checked how the site is actually deployed: `brenopaiva.com/FunkyDancer/`
is live and already reflects pushes to `master` with no CI step, which
means Pages here is "deploy from branch" (root of `master`), not a
GitHub Actions build. Changing that would mean flipping the Pages
source setting in repo Settings — not something to do silently.

Decision: keep the branch-deploy setup as-is. The `modern/` project's
build output (`modern/dist/`) is **committed directly to git**, unlike
a typical Vite project. `npm run build` locally, then commit `dist`
alongside source. Live path ends up at
`.../FunkyDancer/modern/dist/index.html` (see `modern/README.md`).

The toggle's "Modern" side stays on "Coming Soon" for now rather than
linking to the in-progress build — a bare title screen isn't a
worthwhile thing to send people to yet. Revisit once there's an
actual playable milestone (end of the "Core feel" phase).

---

## 1. Gameplay & Core Mechanics

- ~~Miss detection~~ — **decided: misses break streak.**
- **Timing judgment tiers** (Perfect/Good/Miss) instead of today's
  binary correct/wrong with one fixed ±0.1s window.
- **Score multiplier / combo scaling** instead of flat +1 per hit.
- **Difficulty levels** (Easy/Normal/Hard: note density, hit window,
  scroll speed) — *still open, see questions below.*
- **Results screen** after each song — accuracy, max combo, a grade.
  *Exact contents still open.*
- **Dancer animation tied to hit correctness**, not raw key presses —
  a great move on a hit, a stumble on a miss, instead of any keydown
  triggering an animation regardless of accuracy.
- **Countdown before the song starts**, replacing the current silent
  gap before audio begins.

## 2. Content

- **More songs** — *still open: specific tracks, or want me to suggest some?*
- **Offline onset-detection script** (Python + `librosa`) to generate
  first-draft charts from any audio file, refined by ear afterward.
- **In-app charting tool** for ongoing use once the engine exists.
- **Carry the two Classic songs/charts forward, or start fresh content
  for Modern?** — *still open.*

## 3. Visual & UX Polish

- Modern lane-based layout, hit-flash/particle feedback, combo
  milestones beyond the current single "funky" tier at streak 9.
- Song select screen with previews.
- Volume/mute controls (via Phaser's audio manager).
- Settings menu: key remapping, audio/visual offset calibration.
- **Visual direction** — brighter/flatter, neon/arcade, minimalist,
  or keep continuity with the current palette (greens/pinks/yellows/
  teal)? *Still open — happy to propose a direction if you want.*

## 4. Accessibility

Not called out as a top priority, but worth deciding whether it
shapes the initial build or comes later:

- Distinguish notes by shape, not just color (colorblind support).
- Captions for the MC's voice lines.
- Key remapping, adjustable scroll speed.
- Respect `prefers-reduced-motion` in gameplay, not just menus.

*Still open: build in from day one, or address in a later pass?*

## 5. Mobile & Touch Support

Confirmed priority. Phaser's input system handles the normalization;
the remaining design work is the on-screen tap-zone layout itself and
how it coexists with keyboard play on desktop.

## 6. Technical / Architecture

- Re-establish a real, reproducible build (this repo currently has no
  `package.json` at all — `bundle.js` is a hand-built, unreproducible
  webpack output). Vite fixes this outright for the new project.
- Externalize song charts to JSON files instead of embedding them in
  game logic.
- Local high scores via `localStorage`, shown on song select.
- Automated tests (none exist today).

## 7. Social / Meta

**Decided: out of scope.** No backend, no shared leaderboards — static
site with personal local high scores only.

---

## Non-Goals

- No backend, no accounts, no shared leaderboards.
- No changes to the Classic 2017 edition beyond what's already shipped.
- Auto-charting is a first-draft aid, not a replacement for by-ear
  refinement — not aiming for fully automatic chart generation.

## Proposed Phasing

1. **Foundation** — ✅ Phaser/TS/Vite scaffolded in `modern/`, builds
   clean, boot scene verified rendering with zero console errors.
   Deployment path resolved (commit `dist`, see above). Toggle stays
   on "Coming Soon" until there's an actual playable milestone.
2. **Core feel** — ✅ done for the "Catz" chart: Perfect/Good/Miss
   timing tiers (±60ms / ±140ms, tunable in `GameplayScene.ts`),
   combo-scaled scoring (multiplier +1x per 10 combo, capped at 5x),
   a 3-2-1-GO countdown, correctness-driven dancer animation (only
   plays a dance move on an actual hit, not any keypress — fixes the
   gap noted in the original plan), and a results screen (score,
   accuracy%, max combo, a letter grade, perfect/good/miss breakdown).
   Verified with a real (non-mocked) playthrough — timed keypresses
   against the actual chart via Playwright, confirmed correct tier
   detection, scoring, miss handling, and the results transition, zero
   console errors. One deliberate design change from Classic: a
   keypress with no note nearby is now just ignored rather than
   triggering a "wrong" penalty — only a note that actually scrolls
   past unhit counts as a miss.
3. **Content pipeline** — onset-detection script, at least one new
   charted song, JSON chart format.
4. **Polish** — ✅ first pass done: a Menu scene (replaces the old bare
   "click to start" Boot screen) with a Catz song card plus a locked
   "??? — more songs coming soon" placeholder card, echoing the
   Classic toggle's own "Coming Soon" theme. Added a persistent
   Sound On/Off toggle (localStorage-backed, shared across scenes via
   `src/ui/muteButton.ts`), particle bursts and floating PERFECT/GOOD/
   MISS text on every hit, and a "FUNKY!" banner at every 10-combo
   milestone (homage to Classic's streak-9 moment). Flow is now
   Menu → Gameplay → Results → Menu. Settings menu (key remapping,
   audio/visual offset calibration) and a real song-select UI (only
   matters once there's a second song) are still ahead.
5. **Mobile** — ✅ done: a full-height tap zone per lane (far more
   forgiving than the small target marker), immediate tap-ripple
   feedback on every touch regardless of hit/miss, multi-touch enabled
   (up to 4 simultaneous pointers, for future chord notes), and a
   landscape-orientation prompt (this genre wants landscape; portrait
   would just letterbox the game tiny). Also hardened touch handling
   in `index.html` — disabled pinch-zoom/double-tap-zoom/pull-to-refresh
   so rapid tapping doesn't fight the browser. Verified with real touch
   emulation (Playwright + iPhone 13 device profile, both orientations):
   rotate prompt shows/hides correctly, touch taps drive real hit
   detection, zero console errors.
6. **Reach** — difficulty levels, accessibility pass, in-app charting
   tool, local high scores.

---

## Remaining Open Questions

1. Difficulty levels — worth building, or one fixed chart per song is fine?
2. More songs — specific tracks in mind, or want suggestions?
3. Carry the two Classic songs/charts into Modern permanently (the
   "Catz" chart/audio is already in there as the build-out target for
   Core feel — still fair game to swap out for new content)?
4. Visual direction — a specific reference/style, or want me to propose
   one? (Gameplay so far reuses Classic's palette and the dancer sprite
   sheet as a placeholder — real "visual polish" phase work is still ahead.)
5. Accessibility — build in from the start, or address in a later pass?
6. Keep the "AJ" MC voice-line bits and current comedic tone, or
   rethink that part of the identity for the modern version?
