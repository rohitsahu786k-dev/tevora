"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionTokens } from "@/lib/motion/tokens";

export function TechnicalLineDiagram({
  label = "Equipment pathway",
}: {
  label?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 640 180" role="img" aria-label={label} className="w-full">
      <motion.path
        d="M24 90H176L224 42H416L464 90H616"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: motionTokens.duration.cinematic,
          ease: motionTokens.easing.soft,
        }}
      />
      {[24, 224, 416, 616].map((cx, index) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy={index === 1 || index === 2 ? 42 : 90}
          r="5"
          fill="currentColor"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 + index * 0.1 }}
        />
      ))}
    </svg>
  );
}
