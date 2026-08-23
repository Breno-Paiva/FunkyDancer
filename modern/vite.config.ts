import { defineConfig } from 'vite';

// Relative base so the build works whether it's served from the site
// root, a subpath (e.g. /FunkyDancer/modern/), or opened locally.
// Revisit once the GitHub Pages deployment path is finalized.
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
  },
});
