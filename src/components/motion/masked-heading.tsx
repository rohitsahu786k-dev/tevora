"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function MaskedHeading({
  children,
  as = "h2",
  className,
  delay = 0,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const Tag = as;
  return (
    <Tag className={cn("relative text-balance", className)}>
      {children}
      <motion.span
        aria-hidden
        className="bg-accent absolute -bottom-2 left-0 h-px w-12"
        initial={reduced ? false : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{
          delay,
          duration: motionTokens.duration.section,
          ease: motionTokens.easing.enter,
        }}
        style={{ transformOrigin: "left" }}
      />
    </Tag>
  );
}
