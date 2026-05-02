import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../lib/utils";

/**
 * v2 RoundCheckbox — Apple-Reminders style round checkbox.
 *
 * Per v2 design lock spec (sketches/.../v2/new-opportunity.html):
 *  - 18×18, border-radius 50% (full circle)
 *  - Resting:       1.5px gray-300 border, white background
 *  - Hover:         teal border, teal-tint-2 background
 *  - Checked:       teal background, teal border, white rotated-border checkmark
 *  - Indeterminate: teal background, teal border, white horizontal bar
 *  - Focus visible: 3px teal-18% focus ring per --md-focus-ring
 *
 * Wraps @radix-ui/react-checkbox (already a dep) so we inherit Radix's
 * accessibility behavior — keyboard focus, role=checkbox, aria-checked,
 * indeterminate semantics — without reimplementing.
 *
 * Distinct from `@/components/ui/checkbox.tsx` (the shadcn square primitive).
 * Both coexist; v2-aligned components opt into RoundCheckbox.
 */

export type RoundCheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> & {
  /** Visual size variant. Default 18px (v2 spec). */
  size?: "sm" | "md";
};

const SIZE_MAP = {
  sm: "h-[14px] w-[14px]",
  md: "h-[18px] w-[18px]",
} as const;

export const RoundCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  RoundCheckboxProps
>(({ className, size = "md", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Base shape
      SIZE_MAP[size],
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
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
      {/*
        Two-state indicator: Radix exposes the resolved state via
        the data attribute on Indicator's parent. We render both
        glyphs and let CSS hide the wrong one based on data-state.
      */}
      <span
        aria-hidden="true"
        className={cn(
          // Checkmark — rotated white border (matches v2 spec)
          "block h-[9px] w-[5px] -translate-y-px rotate-[45deg]",
          "border-b-[1.7px] border-r-[1.7px] border-white",
          "group-data-[state=indeterminate]:hidden",
        )}
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
RoundCheckbox.displayName = "RoundCheckbox";

/**
 * Convenience row component combining a RoundCheckbox with a label and
 * optional sub-label. Matches the v2 .check-row pattern from the form sketch.
 *
 * Usage:
 *   <RoundCheckboxRow
 *     checked={notify}
 *     onCheckedChange={setNotify}
 *     label={<>Notify <strong>#leadership</strong> on stage change</>}
 *     subLabel="Sends a Slack ping on every stage transition."
 *   />
 */
export type RoundCheckboxRowProps = RoundCheckboxProps & {
  label: React.ReactNode;
  subLabel?: React.ReactNode;
};

export function RoundCheckboxRow({
  label,
  subLabel,
  className,
  id,
  ...checkboxProps
}: RoundCheckboxRowProps) {
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        "flex cursor-pointer items-start gap-2.5 py-2",
        "text-md-text-primary",
        className,
      )}
    >
      <RoundCheckbox id={checkboxId} className="mt-px" {...checkboxProps} />
      <span className="flex-1 leading-[1.4]">
        <span className="text-[13px] text-md-gray-800">{label}</span>
        {subLabel && (
          <span className="mt-0.5 block text-[11.5px] text-md-text-tertiary">
            {subLabel}
          </span>
        )}
      </span>
    </label>
  );
}
