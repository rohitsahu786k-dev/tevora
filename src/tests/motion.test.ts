import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { motionTokens } from "@/lib/motion/tokens";
import { sharedElementStyle } from "@/lib/motion/shared-elements";

describe("motion system", () => {
  it("keeps named durations within the documented limits", () => {
    expect(motionTokens.duration.micro).toBeGreaterThanOrEqual(0.12);
    expect(motionTokens.duration.fast).toBeLessThanOrEqual(0.22);
    expect(motionTokens.duration.component).toBeGreaterThanOrEqual(0.25);
    expect(motionTokens.duration.component).toBeLessThanOrEqual(0.45);
    expect(motionTokens.duration.section).toBeGreaterThanOrEqual(0.5);
    expect(motionTokens.duration.section).toBeLessThanOrEqual(0.8);
    expect(motionTokens.duration.cinematic).toBeLessThanOrEqual(1.2);
  });

  it("uses controlled easing and spring values", () => {
    Object.values(motionTokens.easing).forEach((curve) =>
      expect(curve).toHaveLength(4),
    );
    expect(motionTokens.spring.stiffness).toBeGreaterThan(0);
    expect(motionTokens.spring.damping).toBeGreaterThan(20);
  });

  it("creates stable, CSS-safe shared element names", () => {
    expect(sharedElementStyle("product", "ARC Pro / 01")).toEqual({
      viewTransitionName: "product-ARC-Pro---01",
    });
  });

  it("defines reduced-motion and progressive view-transition CSS", () => {
    const css = readFileSync("src/app/globals.css", "utf8");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("@view-transition");
    expect(css).toContain("scroll-behavior: auto");
  });

  it("does not add a heavyweight animation or smooth-scroll dependency", () => {
    const packageJson = readFileSync("package.json", "utf8");
    expect(packageJson).not.toMatch(/\"gsap\"/);
    expect(packageJson).not.toMatch(/\"lenis\"/);
  });
});
