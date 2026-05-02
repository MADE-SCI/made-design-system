import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Inbox } from "lucide-react";
import { EmptyState, ErrorState, LoadingState, Skeleton } from "../index";

/**
 * Smoke + behavior tests for the v2 universal state components. These verify:
 *  1. Each component renders without crashing.
 *  2. Action callbacks fire on click.
 *  3. ARIA roles match the semantic spec (status / alert).
 *  4. The Skeleton primitive opts into the motion-reduce variant.
 */

describe("design-system / EmptyState", () => {
  it("renders headline, subhead, and primary CTA", () => {
    const onClick = vi.fn();
    render(
      <EmptyState
        icon={Inbox}
        headline="No opportunities yet"
        subhead="Add your first pipeline opportunity to get started."
        action={{ label: "New Opportunity", onClick }}
      />,
    );

    expect(screen.getByText("No opportunities yet")).toBeInTheDocument();
    expect(screen.getByText(/Add your first pipeline/)).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /New Opportunity/i });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("uses role='status' so screen readers announce empty results", () => {
    const { container } = render(<EmptyState icon={Inbox} headline="Nothing here" />);
    expect(container.querySelector('[role="status"]')).toBeInTheDocument();
  });
});

describe("design-system / ErrorState", () => {
  it("renders default headline + retry button + trace pill", () => {
    const onRetry = vi.fn();
    render(
      <ErrorState
        retry={{ label: "Retry", onClick: onRetry }}
        errorCode="NETWORK_TIMEOUT"
        traceId="abc-1f3e-29a7"
      />,
    );

    // Default headline is plain language per v2 spec
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();

    const retryBtn = screen.getByRole("button", { name: /Retry/i });
    fireEvent.click(retryBtn);
    expect(onRetry).toHaveBeenCalledOnce();

    // Trace pill exposes both the code and the trace id
    expect(screen.getByText("NETWORK_TIMEOUT")).toBeInTheDocument();
    expect(screen.getByText(/abc-1f3e-29a7/)).toBeInTheDocument();
  });

  it("uses role='alert' so screen readers announce errors", () => {
    const { container } = render(<ErrorState />);
    expect(container.querySelector('[role="alert"]')).toBeInTheDocument();
  });
});

describe("design-system / LoadingState", () => {
  it("renders the page-variant scaffolding without crashing", () => {
    const { container } = render(<LoadingState variant="page" />);
    // Multiple skeletons present (gradient bg + animation class)
    const skeletons = container.querySelectorAll('[role="status"][aria-busy="true"]');
    expect(skeletons.length).toBeGreaterThan(5);
  });

  it("renders custom children when variant='custom'", () => {
    render(
      <LoadingState variant="custom">
        <div data-testid="custom-skel">custom</div>
      </LoadingState>,
    );
    expect(screen.getByTestId("custom-skel")).toBeInTheDocument();
  });

  it("respects the rows prop in the table variant", () => {
    const { container } = render(<LoadingState variant="table" rows={3} />);
    const rows = container.querySelectorAll('[class*="grid-template-columns"]');
    expect(rows.length).toBe(3);
  });
});

describe("design-system / Skeleton", () => {
  it("applies aria-busy + role=status for assistive tech", () => {
    const { container } = render(<Skeleton className="h-4 w-20" />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("role")).toBe("status");
    expect(el.getAttribute("aria-busy")).toBe("true");
  });

  it("includes motion-reduce:animate-none for prefers-reduced-motion users", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("motion-reduce:animate-none");
  });
});
