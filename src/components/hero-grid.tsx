import { useCallback, useEffect, useRef, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function InteractiveHeroGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(0);

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  useEffect(() => {
    const heroSection = containerRef.current?.parentElement;
    if (!heroSection) return;

    let rafId: number | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      // Only track mouse/pen, ignore touch drags to preserve native scrolling
      if (e.pointerType === "touch") return;

      // Respect prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const glow = glowRef.current;
        if (!glow || !heroSection) return;

        const rect = heroSection.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        glow.style.setProperty("--mouse-x", `${x}px`);
        glow.style.setProperty("--mouse-y", `${y}px`);
        glow.style.setProperty("--mouse-active", "1");
      });
    };

    const handlePointerLeave = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      const glow = glowRef.current;
      if (!glow) return;
      glow.style.setProperty("--mouse-active", "0");
    };

    const handleClick = (e: MouseEvent) => {
      // Ignore clicks on buttons, links, or interactive elements
      const target = e.target as HTMLElement | null;
      if (target?.closest("button, a, input, select, textarea, [role='button']")) {
        return;
      }

      // Check prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const id = ++rippleIdRef.current;
      setRipples((prev) => [...prev.slice(-1), { id, x, y }]);
    };

    heroSection.addEventListener("pointermove", handlePointerMove, { passive: true });
    heroSection.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    heroSection.addEventListener("click", handleClick);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      heroSection.removeEventListener("pointermove", handlePointerMove);
      heroSection.removeEventListener("pointerleave", handlePointerLeave);
      heroSection.removeEventListener("click", handleClick);
      setRipples([]);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Base static grid — exactly matches original hero grid appearance */}
      <div className="absolute inset-0 bg-field-pattern" />

      {/* 2. Interactive mouse proximity overlay — soft mint glow + gently intensified grid lines */}
      <div
        ref={glowRef}
        className="absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: "var(--mouse-active, 0)",
        }}
      >
        {/* Soft radial ambient mint-green glow around cursor */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle 260px at var(--mouse-x, -999px) var(--mouse-y, -999px), color-mix(in oklab, var(--leaf) 14%, transparent) 0%, color-mix(in oklab, var(--primary) 5%, transparent) 45%, transparent 75%)",
          }}
        />

        {/* Illuminated grid lines localized around cursor */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--leaf) 32%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--leaf) 32%, transparent) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(circle 220px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, rgba(0,0,0,0.4) 50%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(circle 220px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, rgba(0,0,0,0.4) 50%, transparent 80%)",
          }}
        />
      </div>

      {/* 3. Subtle click ripples for empty hero background */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          onAnimationEnd={() => removeRipple(ripple.id)}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-leaf/40 shadow-[0_0_24px_rgba(105,184,106,0.3)] animate-hero-ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      ))}
    </div>
  );
}

