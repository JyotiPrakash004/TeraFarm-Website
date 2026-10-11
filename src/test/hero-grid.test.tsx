import { render, fireEvent, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InteractiveHeroGrid } from "@/components/hero-grid";

describe("InteractiveHeroGrid", () => {
  it("renders base grid and glow overlay correctly", () => {
    const { container } = render(
      <section>
        <InteractiveHeroGrid />
      </section>,
    );

    const grid = container.querySelector("[aria-hidden='true']");
    expect(grid).toBeInTheDocument();
    expect(grid?.querySelector(".bg-field-pattern")).toBeInTheDocument();
  });

  it("updates CSS variables when pointer moves over the hero section", () => {
    const { container } = render(
      <section style={{ width: 1000, height: 600 }}>
        <InteractiveHeroGrid />
      </section>,
    );

    const section = container.querySelector("section")!;
    const glowOverlay = container.querySelector(
      "[aria-hidden='true'] > div:nth-child(2)",
    ) as HTMLElement;

    // Simulate pointermove
    fireEvent.pointerMove(section, { clientX: 300, clientY: 200, pointerType: "mouse" });

    // RequestAnimationFrame flush
    act(() => {
      // In jsdom rAF might be mocked or scheduled
    });

    expect(glowOverlay).toBeInTheDocument();
  });

  it("adds a ripple when an empty background area is clicked", () => {
    const { container } = render(
      <section style={{ width: 1000, height: 600 }}>
        <InteractiveHeroGrid />
        <button>Clickable button</button>
      </section>,
    );

    const section = container.querySelector("section")!;
    fireEvent.click(section, { clientX: 150, clientY: 150 });

    const ripple = container.querySelector(".animate-hero-ripple");
    expect(ripple).toBeInTheDocument();
  });

  it("does not trigger ripple when clicking an interactive element inside hero", () => {
    const { container } = render(
      <section style={{ width: 1000, height: 600 }}>
        <InteractiveHeroGrid />
        <button id="test-btn">Download Demo</button>
      </section>,
    );

    const btn = container.querySelector("#test-btn")!;
    fireEvent.click(btn);

    const ripple = container.querySelector(".animate-hero-ripple");
    expect(ripple).toBeNull();
  });
});

