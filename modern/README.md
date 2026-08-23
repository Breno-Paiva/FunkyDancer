# Funky Dancer — Modern Edition

Phaser 3 + TypeScript, built with Vite. See
[`docs/modern-version-plan.md`](../docs/modern-version-plan.md) at the
repo root for the full plan.

## Develop

```
npm install
npm run dev        # local dev server with hot reload
npm run typecheck   # tsc --noEmit
```

## Deploy

GitHub Pages here serves whatever's committed at the repo root — there's
no build step in CI. So **`dist/` is intentionally committed**, unlike
most Vite projects:

```
npm run build       # outputs to modern/dist
git add modern/dist
git commit -m "..."
```

The live build ends up at `.../FunkyDancer/modern/dist/`. Don't forget
to rebuild and commit `dist` again after source changes — it won't
happen automatically.
