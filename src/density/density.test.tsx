import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { DensityProvider, useDensity, DensityToggle, RoundCheckbox } from "../index";

/**
 * Tests for the v2 density mode + round checkbox primitives.
 *
 * Density coverage:
 *  - default state is "briefing"
 *  - persists across re-mounts via localStorage
 *  - applies .density-dense to <html> when toggled
 *  - useDensity throws if called outside the provider
 *
 * Round checkbox coverage:
 *  - renders with role=checkbox via Radix
 *  - reports checked/unchecked state correctly via aria-checked
 *  - fires onCheckedChange on user interaction
 */

beforeEach(() => {
  // Clean slate per test — density persistence must not leak between tests.
  window.localStorage.clear();
  document.documentElement.classList.remove("density-dense");
});

describe("design-system / DensityProvider", () => {
  it("defaults density to 'briefing' on first render", () => {
    function Probe() {
      const { density } = useDensity();
      return <div data-testid="d">{density}</div>;
    }
    render(
      <DensityProvider>
        <Probe />
      </DensityProvider>,
    );
    expect(screen.getByTestId("d").textContent).toBe("briefing");
  });

  it("toggles density and applies .density-dense to <html>", () => {
    function Probe() {
      const { density, toggleDensity } = useDensity();
      return (
        <button onClick={toggleDensity} data-testid="t">
          {density}
        </button>
      );
    }
    render(
      <DensityProvider>
        <Probe />
      </DensityProvider>,
    );

    expect(document.documentElement.classList.contains("density-dense")).toBe(false);
    fireEvent.click(screen.getByTestId("t"));
    expect(document.documentElement.classList.contains("density-dense")).toBe(true);
    expect(screen.getByTestId("t").textContent).toBe("dense");
  });

  it("persists the chosen density to localStorage", () => {
    function Probe() {
      const { setDensity } = useDensity();
      return <button onClick={() => setDensity("dense")}>set</button>;
    }
    render(
      <DensityProvider>
        <Probe />
      </DensityProvider>,
    );
    fireEvent.click(screen.getByText("set"));
    expect(window.localStorage.getItem("made.density")).toBe("dense");
  });

  it("rehydrates density from localStorage on mount", () => {
    window.localStorage.setItem("made.density", "dense");
    function Probe() {
      const { density } = useDensity();
      return <div data-testid="d">{density}</div>;
    }
    render(
      <DensityProvider>
        <Probe />
      </DensityProvider>,
    );
    expect(screen.getByTestId("d").textContent).toBe("dense");
  });

  it("throws if useDensity is called outside DensityProvider", () => {
    function Probe() {
      useDensity();
      return null;
    }
    // Suppress React's expected error log for this assertion.
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow(/DensityProvider/);
    consoleError.mockRestore();
  });
});

describe("design-system / DensityToggle", () => {
  it("renders both options as accessible radio buttons", () => {
    render(
      <DensityProvider>
        <DensityToggle />
      </DensityProvider>,
    );
    const briefing = screen.getByRole("radio", { name: /briefing/i });
    const dense = screen.getByRole("radio", { name: /dense/i });
    expect(briefing).toHaveAttribute("aria-checked", "true");
    expect(dense).toHaveAttribute("aria-checked", "false");
  });

  it("flips aria-checked when the user picks the other option", () => {
    render(
      <DensityProvider>
        <DensityToggle />
      </DensityProvider>,
    );
    const dense = screen.getByRole("radio", { name: /dense/i });
    fireEvent.click(dense);
    expect(dense).toHaveAttribute("aria-checked", "true");
    expect(
      screen.getByRole("radio", { name: /briefing/i }),
    ).toHaveAttribute("aria-checked", "false");
  });
});

describe("design-system / RoundCheckbox", () => {
  it("renders with role=checkbox and reports state via aria-checked", () => {
    render(<RoundCheckbox />);
    const cb = screen.getByRole("checkbox");
    expect(cb).toBeInTheDocument();
    expect(cb).toHaveAttribute("aria-checked", "false");
  });

  it("fires onCheckedChange when clicked", () => {
    const onCheckedChange = vi.fn();
    render(<RoundCheckbox onCheckedChange={onCheckedChange} />);
    const cb = screen.getByRole("checkbox");
    act(() => {
      fireEvent.click(cb);
    });
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
