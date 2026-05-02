import { jsx as t, jsxs as i } from "react/jsx-runtime";
import { clsx as P } from "clsx";
import { twMerge as R } from "tailwind-merge";
import { AlertTriangle as _, RefreshCw as p, CircleDot as b, LayoutGrid as j, Rows3 as L } from "lucide-react";
import * as m from "react";
import { useState as D, useEffect as S, useCallback as $ } from "react";
import * as w from "@radix-ui/react-checkbox";
import { useSearchParams as I } from "react-router-dom";
function o(...e) {
  return R(P(e));
}
function c({ className: e, ...n }) {
  return /* @__PURE__ */ t(
    "div",
    {
      role: "status",
      "aria-label": "Loading",
      "aria-busy": "true",
      className: o(
        "rounded-md bg-gradient-to-r from-md-gray-150 via-md-gray-200 to-md-gray-150",
        "animate-md-skel-pulse motion-reduce:animate-none",
        e
      ),
      ...n
    }
  );
}
function V({
  icon: e,
  headline: n,
  subhead: r,
  action: s,
  secondaryAction: a,
  className: l
}) {
  const d = s?.icon;
  return /* @__PURE__ */ i(
    "div",
    {
      className: o(
        "flex flex-1 flex-col items-center justify-center px-6 py-8 text-center",
        l
      ),
      role: "status",
      children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: "mb-4 flex h-[76px] w-[76px] items-center justify-center rounded-md-tile shadow-md-card",
            style: {
              background: "linear-gradient(135deg, var(--md-teal-tint) 0%, var(--md-aqua-tint) 100%)"
            },
            "aria-hidden": "true",
            children: /* @__PURE__ */ t(e, { className: "h-9 w-9 text-md-teal", strokeWidth: 1.6 })
          }
        ),
        /* @__PURE__ */ t("div", { className: "font-display text-[18px] font-bold leading-tight tracking-[-0.015em] text-md-text-primary", children: n }),
        r && /* @__PURE__ */ t("p", { className: "mt-1.5 max-w-[280px] text-[13px] leading-[1.5] text-md-text-secondary", children: r }),
        (s || a) && /* @__PURE__ */ i("div", { className: "mt-4 flex flex-col items-center gap-2", children: [
          s && /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: s.onClick,
              className: o(
                "inline-flex h-[34px] items-center gap-1.5 rounded-md-pill px-[18px]",
                "bg-md-teal text-[13px] font-semibold text-white shadow-md-card",
                "transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:shadow-md-focus"
              ),
              children: [
                d && /* @__PURE__ */ t(d, { className: "h-3.5 w-3.5", strokeWidth: 2.2 }),
                s.label
              ]
            }
          ),
          a && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: a.onClick,
              className: o(
                "inline-flex items-center gap-1 text-[12px] font-semibold text-md-teal",
                "transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:underline"
              ),
              children: a.label
            }
          )
        ] })
      ]
    }
  );
}
function X({
  variant: e = "page",
  rows: n = 6,
  className: r,
  children: s
}) {
  const a = o("flex flex-1 flex-col gap-3", r);
  return e === "custom" ? /* @__PURE__ */ t("div", { className: a, children: s }) : e === "kpi" ? /* @__PURE__ */ t("div", { className: a, children: /* @__PURE__ */ t(y, {}) }) : e === "table" ? /* @__PURE__ */ t("div", { className: a, children: /* @__PURE__ */ t(N, { rows: n }) }) : e === "card" ? /* @__PURE__ */ t("div", { className: a, children: /* @__PURE__ */ t(F, {}) }) : /* @__PURE__ */ i("div", { className: a, children: [
    /* @__PURE__ */ t(W, {}),
    /* @__PURE__ */ t(y, {}),
    /* @__PURE__ */ t(U, {}),
    /* @__PURE__ */ t(N, { rows: n })
  ] });
}
function W() {
  return /* @__PURE__ */ i("div", { className: "mb-2 flex flex-col gap-2", children: [
    /* @__PURE__ */ t(c, { className: "h-3 w-20 rounded-sm" }),
    /* @__PURE__ */ t(c, { className: "h-7 w-48 rounded-md" })
  ] });
}
function y() {
  return /* @__PURE__ */ t("div", { className: "grid grid-cols-2 gap-2 md:grid-cols-4", children: Array.from({ length: 4 }).map((e, n) => /* @__PURE__ */ i(
    "div",
    {
      className: "flex flex-col gap-2 rounded-xl bg-md-bg-card p-3 shadow-md-card",
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(c, { className: "h-3.5 w-3.5 rounded-sm" }),
          /* @__PURE__ */ t(c, { className: "h-2 w-16 rounded-sm" })
        ] }),
        /* @__PURE__ */ t(c, { className: "h-[18px] w-[70%] rounded-sm" }),
        /* @__PURE__ */ t(c, { className: "h-2 w-[50%] rounded-sm" })
      ]
    },
    n
  )) });
}
function U() {
  return /* @__PURE__ */ i("div", { className: "rounded-xl bg-md-bg-card p-3.5 shadow-md-card", children: [
    /* @__PURE__ */ t(c, { className: "mb-2.5 h-3 w-28 rounded-sm" }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-5 gap-1.5", children: Array.from({ length: 5 }).map((e, n) => /* @__PURE__ */ t(c, { className: "h-14 rounded-md" }, n)) })
  ] });
}
function N({ rows: e = 6 }) {
  return /* @__PURE__ */ t("div", { className: "rounded-xl bg-md-bg-card px-3.5 py-3 shadow-md-card", children: Array.from({ length: e }).map((n, r) => /* @__PURE__ */ i(
    "div",
    {
      className: o(
        "grid items-center gap-2.5 py-2.5",
        "[grid-template-columns:14px_1fr_60px_60px]",
        r < e - 1 && "border-b-[0.5px] border-md-hairline"
      ),
      children: [
        /* @__PURE__ */ t(c, { className: "h-3.5 w-3.5 rounded-full" }),
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t(c, { className: "h-[11px] w-[70%] rounded-sm" }),
          /* @__PURE__ */ t(c, { className: "h-2 w-[45%] rounded-sm" })
        ] }),
        /* @__PURE__ */ t(c, { className: "h-2.5 w-full rounded-sm" }),
        /* @__PURE__ */ t(c, { className: "h-2.5 w-full rounded-sm" })
      ]
    },
    r
  )) });
}
function F() {
  return /* @__PURE__ */ i("div", { className: "rounded-xl bg-md-bg-card p-4 shadow-md-card", children: [
    /* @__PURE__ */ t(c, { className: "mb-2 h-5 w-32 rounded-sm" }),
    /* @__PURE__ */ t(c, { className: "mb-1.5 h-3 w-full rounded-sm" }),
    /* @__PURE__ */ t(c, { className: "h-3 w-3/4 rounded-sm" })
  ] });
}
function ee({
  icon: e = _,
  headline: n = "Something went wrong",
  subhead: r = "There was a problem loading this. Check your connection or try again.",
  retry: s,
  secondaryAction: a,
  errorCode: l,
  traceId: d,
  className: u
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: o(
        "flex flex-1 flex-col items-center justify-center px-6 py-8 text-center",
        u
      ),
      role: "alert",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: "mb-4 flex h-[76px] w-[76px] items-center justify-center rounded-md-tile shadow-md-card",
            style: {
              background: "linear-gradient(135deg, var(--md-red-tint) 0%, var(--md-red-tint-2) 100%)"
            },
            "aria-hidden": "true",
            children: /* @__PURE__ */ t(e, { className: "h-9 w-9 text-md-red", strokeWidth: 1.6 })
          }
        ),
        /* @__PURE__ */ t("div", { className: "font-display text-[18px] font-bold leading-tight tracking-[-0.015em] text-md-text-primary", children: n }),
        /* @__PURE__ */ t("p", { className: "mt-1.5 max-w-[280px] text-[13px] leading-[1.5] text-md-text-secondary", children: r }),
        (s || a) && /* @__PURE__ */ i("div", { className: "mt-4 flex items-center gap-2", children: [
          s && /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: s.onClick,
              className: o(
                "inline-flex h-8 items-center gap-1.5 rounded-md-pill px-4",
                "bg-md-teal text-[12.5px] font-semibold text-white shadow-md-card",
                "transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:shadow-md-focus"
              ),
              children: [
                /* @__PURE__ */ t(p, { className: "h-3 w-3", strokeWidth: 2.2 }),
                s.label
              ]
            }
          ),
          a && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: a.onClick,
              className: o(
                "inline-flex h-8 items-center gap-1 rounded-md-pill px-3.5",
                "border-[0.5px] border-md-hairline-strong bg-white shadow-md-card",
                "text-[12.5px] font-semibold text-md-gray-700",
                "transition-colors hover:bg-md-gray-50",
                "focus-visible:outline-none focus-visible:shadow-md-focus"
              ),
              children: a.label
            }
          )
        ] }),
        (l || d) && /* @__PURE__ */ i(
          "div",
          {
            className: o(
              "mt-4 inline-flex items-center gap-1.5 rounded-[5px] border-[0.5px] border-md-hairline",
              "bg-md-gray-100 px-2.5 py-1 text-[10.5px] font-medium text-md-text-tertiary",
              "tabular-nums"
            ),
            children: [
              l && /* @__PURE__ */ t("span", { className: "font-bold text-md-gray-700", children: l }),
              l && d && /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "·" }),
              d && /* @__PURE__ */ i("span", { children: [
                "trace ",
                d
              ] })
            ]
          }
        )
      ]
    }
  );
}
const A = {
  sm: "h-[14px] w-[14px]",
  md: "h-[18px] w-[18px]"
}, C = m.forwardRef(({ className: e, size: n = "md", ...r }, s) => /* @__PURE__ */ t(
  w.Root,
  {
    ref: s,
    className: o(
      // Base shape
      A[n],
      "shrink-0 rounded-full border-[1.5px] border-md-gray-300 bg-white",
      "flex items-center justify-center",
      "transition-colors duration-150",
      // Hover
      "hover:border-md-teal hover:bg-md-teal-tint-2",
      // Focus visible (uses v2-locked focus ring)
      "focus-visible:outline-none focus-visible:shadow-md-focus",
      // Checked
      "data-[state=checked]:border-md-teal data-[state=checked]:bg-md-teal",
      "data-[state=indeterminate]:border-md-teal data-[state=indeterminate]:bg-md-teal",
      // Disabled
      "disabled:cursor-not-allowed disabled:opacity-50",
      e
    ),
    ...r,
    children: /* @__PURE__ */ t(w.Indicator, { className: "flex items-center justify-center text-white", children: /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: o(
          // Checkmark — rotated white border (matches v2 spec)
          "block h-[9px] w-[5px] -translate-y-px rotate-[45deg]",
          "border-b-[1.7px] border-r-[1.7px] border-white",
          "group-data-[state=indeterminate]:hidden"
        )
      }
    ) })
  }
));
C.displayName = "RoundCheckbox";
function te({
  label: e,
  subLabel: n,
  className: r,
  id: s,
  ...a
}) {
  const l = m.useId(), d = s ?? l;
  return /* @__PURE__ */ i(
    "label",
    {
      htmlFor: d,
      className: o(
        "flex cursor-pointer items-start gap-2.5 py-2",
        "text-md-text-primary",
        r
      ),
      children: [
        /* @__PURE__ */ t(C, { id: d, className: "mt-px", ...a }),
        /* @__PURE__ */ i("span", { className: "flex-1 leading-[1.4]", children: [
          /* @__PURE__ */ t("span", { className: "text-[13px] text-md-gray-800", children: e }),
          n && /* @__PURE__ */ t("span", { className: "mt-0.5 block text-[11.5px] text-md-text-tertiary", children: n })
        ] })
      ]
    }
  );
}
const B = {
  amberAfterMin: 20,
  redAfterMin: 60
};
function H(e, n) {
  if (!e || Number.isNaN(e)) return "never";
  const r = Math.max(0, n - e), s = Math.floor(r / 6e4);
  if (s < 1) return "just now";
  if (s < 60) return `${s} min ago`;
  const a = Math.floor(s / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function G(e, n, r) {
  if (!e || Number.isNaN(e)) return "text-md-gray-400";
  const s = (n - e) / 6e4;
  return s < r.amberAfterMin ? "text-md-green" : s < r.redAfterMin ? "text-md-yellow" : "text-md-red";
}
function ne({
  updatedAt: e,
  isFetching: n = !1,
  label: r = "Updated",
  thresholds: s,
  variant: a = "compact",
  className: l
}) {
  const [d, u] = D(() => Date.now());
  S(() => {
    const T = setInterval(() => u(Date.now()), 3e4);
    return () => clearInterval(T);
  }, []);
  const x = {
    ...B,
    ...s
  }, h = H(e, d), g = G(e, d, x);
  return a === "bare" ? /* @__PURE__ */ i(
    "span",
    {
      className: o(
        "inline-flex items-center gap-1.5 text-md-helper text-md-text-secondary tabular-nums",
        l
      ),
      title: e ? `${r} ${new Date(e).toLocaleString()}` : `${r}: never`,
      children: [
        /* @__PURE__ */ t(b, { className: o("h-3 w-3", g) }),
        h,
        n && /* @__PURE__ */ t(p, { className: "h-3 w-3 animate-spin text-md-text-tertiary" })
      ]
    }
  ) : /* @__PURE__ */ i(
    "span",
    {
      className: o(
        "inline-flex items-center gap-1.5 text-md-helper text-md-text-secondary tabular-nums",
        "rounded-full border border-md-hairline bg-md-surface-1 px-2.5 py-1",
        l
      ),
      title: e ? `${r} ${new Date(e).toLocaleString()}` : `${r}: never`,
      children: [
        /* @__PURE__ */ t(b, { className: o("h-3 w-3", g) }),
        /* @__PURE__ */ i("span", { children: [
          r,
          " ",
          h
        ] }),
        n && /* @__PURE__ */ t(p, { className: "h-3 w-3 animate-spin text-md-text-tertiary" })
      ]
    }
  );
}
const M = "made.density", f = "briefing", E = m.createContext(void 0);
function K() {
  if (typeof window > "u") return f;
  try {
    const e = window.localStorage.getItem(M);
    return e === "dense" || e === "briefing" ? e : f;
  } catch {
    return f;
  }
}
function v(e) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(M, e);
    } catch {
    }
}
function re({ children: e }) {
  const [n, r] = m.useState(() => K());
  m.useEffect(() => {
    typeof document > "u" || document.documentElement.classList.toggle("density-dense", n === "dense");
  }, [n]);
  const s = m.useCallback((d) => {
    r(d), v(d);
  }, []), a = m.useCallback(() => {
    r((d) => {
      const u = d === "briefing" ? "dense" : "briefing";
      return v(u), u;
    });
  }, []), l = m.useMemo(
    () => ({ density: n, setDensity: s, toggleDensity: a }),
    [n, s, a]
  );
  return /* @__PURE__ */ t(E.Provider, { value: l, children: e });
}
function O() {
  const e = m.useContext(E);
  if (!e)
    throw new Error(
      "useDensity must be used within a <DensityProvider>. Mount it in src/App.tsx near the other providers."
    );
  return e;
}
function se({ className: e }) {
  const { density: n, setDensity: r } = O();
  return /* @__PURE__ */ i(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Display density",
      className: o(
        "inline-flex items-center gap-0.5 rounded-md-pill border-[0.5px] border-md-hairline-strong",
        "bg-md-bg-card p-0.5 shadow-md-card",
        e
      ),
      children: [
        /* @__PURE__ */ t(
          k,
          {
            active: n === "briefing",
            onClick: () => r("briefing"),
            label: "Briefing",
            icon: /* @__PURE__ */ t(j, { className: "h-3.5 w-3.5", strokeWidth: 2 })
          }
        ),
        /* @__PURE__ */ t(
          k,
          {
            active: n === "dense",
            onClick: () => r("dense"),
            label: "Dense",
            icon: /* @__PURE__ */ t(L, { className: "h-3.5 w-3.5", strokeWidth: 2 })
          }
        )
      ]
    }
  );
}
function k({
  active: e,
  onClick: n,
  label: r,
  icon: s
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      role: "radio",
      "aria-checked": e,
      onClick: n,
      className: o(
        "inline-flex h-7 items-center gap-1.5 rounded-md-pill px-3",
        "text-[12px] font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:shadow-md-focus",
        e ? "bg-md-teal text-white" : "text-md-text-secondary hover:text-md-text-primary"
      ),
      children: [
        s,
        r
      ]
    }
  );
}
function ae(e, n, r = "tab") {
  const [s, a] = I(), l = s.get(r), d = l && n.includes(l) ? l : e, u = $(
    (x) => {
      const h = new URLSearchParams(s);
      x === e ? h.delete(r) : h.set(r, x), a(h, { replace: !1 });
    },
    [s, a, e, r]
  );
  return [d, u];
}
function ie(e, n) {
  const [r, s] = D(e);
  return S(() => {
    const a = setTimeout(() => {
      s(e);
    }, n);
    return () => {
      clearTimeout(a);
    };
  }, [e, n]), r;
}
export {
  F as CardSkeleton,
  re as DensityProvider,
  se as DensityToggle,
  V as EmptyState,
  ee as ErrorState,
  ne as FreshnessBadge,
  U as FunnelSkeleton,
  y as KpiStrip,
  X as LoadingState,
  W as PageHeaderSkeleton,
  C as RoundCheckbox,
  te as RoundCheckboxRow,
  c as Skeleton,
  N as TableSkeleton,
  o as cn,
  ie as useDebounce,
  O as useDensity,
  ae as useUrlTab
};
//# sourceMappingURL=index.js.map
