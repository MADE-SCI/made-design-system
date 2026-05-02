import { type ClassValue } from "clsx";
/**
 * Class-name composer used throughout the design system.
 *
 * Combines clsx (conditional class application) with tailwind-merge
 * (intelligent dedup that respects Tailwind's specificity rules), so
 * later utility classes override earlier ones the way you'd expect.
 *
 *   cn("p-4 text-sm", isLarge && "p-6")
 *   // → "text-sm p-6"  (p-6 wins, p-4 dropped)
 */
export declare function cn(...inputs: ClassValue[]): string;
//# sourceMappingURL=utils.d.ts.map