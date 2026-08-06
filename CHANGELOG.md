# Changelog

All notable changes to `@made-sci/design-system` are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/) starting at `1.0.0`.

## [Unreleased]

## [0.2.0] — 2026-08-06

### Added
- **Completed the token taxonomy** to align with the W3C Design Tokens (DTCG) format v2025.10. New categories in `tokens.css` (all additive `--md-*`, no breaking changes): opacity scale (`--md-opacity-*`), z-index/layering (`--md-z-*`), breakpoints (`--md-bp-*`), motion durations (`--md-dur-*`), motion easings (`--md-ease-*`), and border widths (`--md-border-*`).
- **`tokens.dtcg.json`** — new canonical DTCG-format export with a three-layer taxonomy (primitive → semantic → component). Machine source of truth, ingestible by Style Dictionary / Tokens Studio / Figma. Shipped in `dist/` and exposed via `@made-sci/design-system/tokens.dtcg.json`.
- **Tailwind preset** now exposes the new scales: `opacity-md-*`, `z-md-*`, `duration-md-*`, `ease-md-*`, `border-md-*`, and explicit `screens` breakpoints.

### Notes
- Purely additive — no existing `md-*` utility or token changed value, so consumers on `#v0.1.1` upgrade without visual regressions. Bump the pin to `#v0.2.0` and `npm install`.
- `tokens.css` (CSS runtime) and `tokens.dtcg.json` (machine SoT) must be kept in lockstep going forward.

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
