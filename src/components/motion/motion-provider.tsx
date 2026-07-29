"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion/tokens";

export function OnespaceMotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration: motionTokens.duration.component,
        ease: motionTokens.easing.standard,
      }}
    >
      {children}
    </MotionConfig>
  );
}
