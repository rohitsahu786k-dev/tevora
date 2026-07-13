import type { CSSProperties } from "react";

const safeName = (value: string) => value.replace(/[^a-z0-9-_]/gi, "-");

export function sharedElementStyle(
  type: "product" | "project" | "space" | "family",
  id: string,
): CSSProperties {
  return { viewTransitionName: safeName(`${type}-${id}`) };
}

export function withViewTransition(action: () => void) {
  if (
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const start = (
      document as Document & {
        startViewTransition: (callback: () => void) => unknown;
      }
    ).startViewTransition;
    start.call(document, action);
    return;
  }
  action();
}
