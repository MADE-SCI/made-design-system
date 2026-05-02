import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
