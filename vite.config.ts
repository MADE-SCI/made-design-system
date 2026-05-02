import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Library-mode build for @made-sci/design-system.
 *
 * Outputs:
 *   dist/index.js    (ESM bundle)
 *   dist/index.cjs   (CJS bundle for legacy consumers)
 *   dist/tokens.css  (CSS tokens — copied from src by the build)
 *
 * .d.ts files are produced separately by `tsc -p tsconfig.build.json`
 * (run after vite build via the npm `build` script). Keeping the type
 * generation out of the bundler avoids `vite-plugin-dts` flakiness.
 *
 * Peer-dep externalization: react, react-dom, react-router-dom are
 * never bundled — consumers bring their own. lucide-react and Radix
 * primitives are also externalized to avoid duplicate-instance bugs
 * when the design-system is installed alongside an app that already
 * uses them.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "react-router-dom",
        "lucide-react",
        "@radix-ui/react-checkbox",
        "clsx",
        "tailwind-merge",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-router-dom": "ReactRouterDOM",
        },
      },
    },
    sourcemap: true,
    target: "es2020",
    cssCodeSplit: false,
  },
});
