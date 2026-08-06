/**
 * @made-sci/design-system Tailwind preset.
 *
 * Drop into a consumer's tailwind.config.ts:
 *
 *   import madePreset from "@made-sci/design-system/tailwind.preset";
 *   export default {
 *     presets: [madePreset],
 *     content: ["./src/**\/*.{ts,tsx}"],
 *   } satisfies Config;
 *
 * The preset only adds the `md-*` utilities backed by CSS variables — it
 * does NOT redefine or override the consumer's existing color/space
 * scales. That keeps adoption additive: legacy classes keep working,
 * v2-aligned components opt into `bg-md-teal`, `text-md-text-primary`, etc.
 *
 * The CSS variables themselves come from `@made-sci/design-system/tokens.css`
 * — import that once at app entry and the utilities resolve to real values.
 */
module.exports = {
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Funnel Display"', "Inter", "system-ui", "sans-serif"],
        "funnel-sans": ['"Funnel Sans"', "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        md: {
          // Brand (constant across themes)
          teal: {
            DEFAULT: "var(--md-teal)",
            light: "var(--md-teal-light)",
            tint: "var(--md-teal-tint)",
            "tint-2": "var(--md-teal-tint-2)",
          },
          aqua: {
            DEFAULT: "var(--md-aqua)",
            tint: "var(--md-aqua-tint)",
            "tint-2": "var(--md-aqua-tint-2)",
          },
          green: {
            DEFAULT: "var(--md-green)",
            light: "var(--md-green-light)",
            tint: "var(--md-green-tint)",
            "tint-2": "var(--md-green-tint-2)",
          },
          red: {
            DEFAULT: "var(--md-red)",
            light: "var(--md-red-light)",
            tint: "var(--md-red-tint)",
            "tint-2": "var(--md-red-tint-2)",
          },
          yellow: {
            DEFAULT: "var(--md-yellow)",
            tint: "var(--md-yellow-tint)",
          },
          // Gray ramp (Apple-style 11-step)
          gray: {
            50: "var(--md-gray-50)",
            100: "var(--md-gray-100)",
            150: "var(--md-gray-150)",
            200: "var(--md-gray-200)",
            300: "var(--md-gray-300)",
            400: "var(--md-gray-400)",
            500: "var(--md-gray-500)",
            600: "var(--md-gray-600)",
            700: "var(--md-gray-700)",
            800: "var(--md-gray-800)",
            900: "var(--md-gray-900)",
          },
          // Theme-aware surfaces
          bg: {
            page: "var(--md-bg-page)",
            card: "var(--md-bg-card)",
            "card-secondary": "var(--md-bg-card-secondary)",
            sidebar: "var(--md-bg-sidebar)",
            toolbar: "var(--md-bg-toolbar)",
            accent: "var(--md-bg-accent)",
          },
          // Theme-aware text
          text: {
            primary: "var(--md-text-primary)",
            secondary: "var(--md-text-secondary)",
            tertiary: "var(--md-text-tertiary)",
            quaternary: "var(--md-text-quaternary)",
          },
          // Theme-aware lines
          hairline: {
            DEFAULT: "var(--md-hairline)",
            strong: "var(--md-hairline-strong)",
          },
          // KPI value colors (theme-aware, dark-mode aware)
          val: {
            pipeline: "var(--md-val-pipeline)",
            revenue: "var(--md-val-revenue)",
            win: "var(--md-val-win)",
            risk: "var(--md-val-risk)",
            quota: "var(--md-val-quota)",
          },
        },
      },
      backgroundImage: {
        "md-tint-pipeline": "var(--md-tint-pipeline)",
        "md-tint-revenue": "var(--md-tint-revenue)",
        "md-tint-win": "var(--md-tint-win)",
        "md-tint-risk": "var(--md-tint-risk)",
      },
      boxShadow: {
        "md-window": "var(--md-shadow-window)",
        "md-card": "var(--md-shadow-card)",
        "md-focus": "var(--md-focus-ring)",
      },
      fontSize: {
        "md-hero": ["56px", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "800" }],
        "md-page-title": ["32px", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "700" }],
        "md-kpi-hero": ["36px", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "800" }],
        "md-kpi-mini": ["24px", { lineHeight: "1.15", letterSpacing: "-0.022em", fontWeight: "800" }],
        "md-section": ["20px", { lineHeight: "1.25", letterSpacing: "-0.018em", fontWeight: "700" }],
        "md-card-title": ["17px", { lineHeight: "1.3", letterSpacing: "-0.012em", fontWeight: "700" }],
        "md-body": ["14px", { lineHeight: "1.5", letterSpacing: "-0.005em" }],
        "md-helper": ["12px", { lineHeight: "1.45", letterSpacing: "-0.002em" }],
        "md-eyebrow": ["11px", { lineHeight: "1.3", letterSpacing: "0.08em", fontWeight: "600" }],
      },
      borderRadius: {
        "md-window": "var(--md-radius-window)",
        "md-card": "var(--md-radius-card)",
        "md-tile": "var(--md-radius-tile)",
        "md-control": "var(--md-radius-control)",
        "md-pill": "var(--md-radius-pill)",
      },
      spacing: {
        "md-page": "var(--md-page-padding)",
        "md-card": "var(--md-card-padding)",
        "md-section": "var(--md-section-margin)",
        "md-row": "var(--md-row-padding)",
      },
      keyframes: {
        "md-skel-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        "md-skel-pulse": "md-skel-pulse 1.6s ease-in-out infinite",
      },
      // Opacity scale (0.2.0) — e.g. opacity-md-40 for disabled states
      opacity: {
        "md-0": "var(--md-opacity-0)",
        "md-5": "var(--md-opacity-5)",
        "md-10": "var(--md-opacity-10)",
        "md-20": "var(--md-opacity-20)",
        "md-40": "var(--md-opacity-40)",
        "md-60": "var(--md-opacity-60)",
        "md-80": "var(--md-opacity-80)",
        "md-100": "var(--md-opacity-100)",
      },
      // Z-index / layering (0.2.0) — e.g. z-md-modal
      zIndex: {
        "md-base": "var(--md-z-base)",
        "md-dropdown": "var(--md-z-dropdown)",
        "md-sticky": "var(--md-z-sticky)",
        "md-overlay": "var(--md-z-overlay)",
        "md-modal": "var(--md-z-modal)",
        "md-popover": "var(--md-z-popover)",
        "md-toast": "var(--md-z-toast)",
        "md-tooltip": "var(--md-z-tooltip)",
      },
      // Border widths (0.2.0) — e.g. border-md-thin
      borderWidth: {
        "md-hairline": "var(--md-border-hairline)",
        "md-thin": "var(--md-border-thin)",
        "md-thick": "var(--md-border-thick)",
        "md-heavy": "var(--md-border-heavy)",
      },
      // Motion duration (0.2.0) — e.g. duration-md-fast
      transitionDuration: {
        "md-instant": "var(--md-dur-instant)",
        "md-fast": "var(--md-dur-fast)",
        "md-normal": "var(--md-dur-normal)",
        "md-slow": "var(--md-dur-slow)",
        "md-slower": "var(--md-dur-slower)",
      },
      // Motion easing (0.2.0) — e.g. ease-md-standard
      transitionTimingFunction: {
        "md-standard": "var(--md-ease-standard)",
        "md-decelerate": "var(--md-ease-decelerate)",
        "md-accelerate": "var(--md-ease-accelerate)",
        "md-spring": "var(--md-ease-spring)",
      },
      // Breakpoints (0.2.0) — mirror the --md-bp-* reference tokens
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
};
;
