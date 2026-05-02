import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
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
export type RoundCheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    /** Visual size variant. Default 18px (v2 spec). */
    size?: "sm" | "md";
};
export declare const RoundCheckbox: React.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React.RefAttributes<HTMLButtonElement>, "ref"> & {
    /** Visual size variant. Default 18px (v2 spec). */
    size?: "sm" | "md";
} & React.RefAttributes<HTMLButtonElement>>;
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
export declare function RoundCheckboxRow({ label, subLabel, className, id, ...checkboxProps }: RoundCheckboxRowProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=RoundCheckbox.d.ts.map