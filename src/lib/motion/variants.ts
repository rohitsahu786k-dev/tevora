import type { Variants } from "motion/react";
import { motionTokens } from "@/lib/motion/tokens";

export const fadeReveal: Variants = {
  hidden: { opacity: 1, y: motionTokens.distance.small },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.section,
      ease: motionTokens.easing.enter,
    },
  },
};

export const mediaReveal: Variants = {
  hidden: {
    opacity: 0.72,
    scale: motionTokens.scale.media,
    clipPath: "inset(0 0 10% 0)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: motionTokens.duration.cinematic,
      ease: motionTokens.easing.soft,
    },
  },
};

export const staggerReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionTokens.stagger.standard,
      delayChildren: motionTokens.delay.short,
    },
  },
};

export const routeReveal: Variants = {
  initial: { opacity: 0.92, y: 6 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.component,
      ease: motionTokens.easing.enter,
    },
  },
  exit: {
    opacity: 0.96,
    y: -4,
    transition: {
      duration: motionTokens.duration.micro,
      ease: motionTokens.easing.exit,
    },
  },
};
