# Changelog

All notable changes to `@made-sci/design-system` are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/) starting at `1.0.0`.

## [Unreleased]

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
