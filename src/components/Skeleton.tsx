import { cn } from "../lib/utils";

/**
 * v2 skeleton primitive.
 *
 * Per v2 states-pattern spec:
 *  - Background: gray-150 → gray-200 → gray-150 horizontal gradient
 *  - Animation: opacity pulse 1.6s ease-in-out infinite
 *  - Reduced motion: pulse disabled globally via prefers-reduced-motion in tokens.css
 *  - Shape: caller picks width/height to mimic the real component being loaded
 *
 * Usage:
 *   <Skeleton className="h-4 w-32 rounded-sm" />
 *   <Skeleton className="h-[18px] w-[70%]" />
 */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-busy="true"
      className={cn(
        "rounded-md bg-gradient-to-r from-md-gray-150 via-md-gray-200 to-md-gray-150",
        "animate-md-skel-pulse motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}
