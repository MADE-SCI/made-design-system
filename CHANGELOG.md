# Changelog

All notable changes to `@made-sci/design-system` are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/) starting at `1.0.0`.

## [Unreleased]

### Added
- **Font family tokens.** `--md-font-display` (Funnel Display) and `--md-font-body` (Funnel Sans) now ship in `tokens.css`. The brand type stack previously existed only as README prose and as hard-coded literals in the Tailwind preset, so consumers reading the CSS tokens found colors, spacing, and type sizes but no families — and two shipped client-facing products drifted onto a different pair without anyone noticing. The tokens only NAME the families: there is still no `@font-face` and no Google Fonts import in this package, and consumers continue to self-host the faces.
- **`font-body` utility** in the Tailwind preset — the token-named counterpart to `font-display`. The existing `font-funnel-sans` is retained as an alias and behaves identically.

### Changed
- **Tailwind preset font families now resolve through the tokens.** `font-display` and `font-funnel-sans` were hard-coded family lists; they now read `var(--md-font-display, …)` and `var(--md-font-body, …)` so Tailwind consumers and plain-CSS consumers cannot diverge. Each `var()` keeps the previous literal stack as its fallback, so a consumer that uses the preset without importing `tokens.css` renders exactly as before — no visual change to any existing consumer.

## [0.1.1] — 2026-05-02

### Fixed
- **Lovable build compatibility.** v0.1.0 relied on a `prepare` script to build `dist/` post-clone when consumers used `npm install github:...`. Lovable's build environment (likely Bun-based) did not run the prepare script reliably, so `dist/` ended up missing in consumer `node_modules` and downstream Vite builds failed with module resolution errors. Resolution: ship pre-built `dist/` directly in git so the package works under any package manager regardless of script-execution policy.

### Changed
- **`dist/` is now tracked in git.** The `.gitignore` no longer excludes it. CI/local clones get a working package without running `npm run build`.
- **Release workflow updated.** When bumping versions: (1) make changes in `src/`, (2) `npm run build` to regenerate `dist/`, (3) commit `src/` + `dist/` together, (4) `npm version patch`, (5) `git push origin main && git push origin <tag>`.
- The `prepare` script remains as defense-in-depth (its `existsSync('dist')` guard makes it a no-op when `dist/` is already present, but it can rebuild on the rare case where a clone is missing artifacts).

### Migration
Consumers on `#v0.1.0` should update to `#v0.1.1`:

```diff
- "@made-sci/design-system": "github:MADE-SCI/made-design-system#v0.1.0"
+ "@made-sci/design-system": "github:MADE-SCI/made-design-system#v0.1.1"
```

Then run `npm install` to refresh the lockfile.

## [0.1.0] — 2026-05-02

### Added
- Initial extraction from `minimal-science-hub`. Same component code, same tests, packaged as a standalone npm library.
- Universal state components: `EmptyState`, `LoadingState`, `ErrorState`, `Skeleton`.
- Density mode: `DensityProvider`, `useDensity`, `DensityToggle`.
- Primitives: `RoundCheckbox`, `RoundCheckboxRow`, `FreshnessBadge`.
- Hooks: `useUrlTab`, `useDebounce`.
- Tailwind preset (`tailwind.preset`) with all `md-*` utilities (colors, gray ramp, surfaces, text, hairlines, KPI values, gradients, shadows, font sizes, radii, spacing, keyframes).
- CSS tokens (`tokens.css`) — light, dark, and density-dense modes.
- Vitest setup with the existing density + states test suite.
- Vite library-mode build producing ESM + CJS + `.d.ts` outputs.
