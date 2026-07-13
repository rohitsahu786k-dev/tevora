export const motionTokens = {
  duration: {
    instant: 0,
    micro: 0.16,
    fast: 0.22,
    component: 0.34,
    section: 0.64,
    cinematic: 0.9,
  },
  delay: { short: 0.06, medium: 0.12, long: 0.2 },
  stagger: { tight: 0.045, standard: 0.075, editorial: 0.11 },
  easing: {
    standard: [0.2, 0, 0, 1],
    enter: [0.16, 1, 0.3, 1],
    exit: [0.4, 0, 1, 1],
    emphasised: [0.16, 1, 0.3, 1],
    soft: [0.33, 1, 0.68, 1],
  },
  spring: { stiffness: 260, damping: 30, mass: 0.9 },
  distance: { micro: 3, small: 10, section: 18, panel: 28 },
  scale: { press: 0.985, media: 1.025, subtle: 1.012 },
  blur: { soft: 4 },
  parallax: { subtle: 0.06, editorial: 0.1 },
} as const;

export type MotionLevel = "micro" | "component" | "section" | "cinematic";
