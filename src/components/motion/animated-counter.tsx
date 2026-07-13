"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  motion,
} from "motion/react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AnimatedCounter({
  value,
  suffix = "",
  verified,
}: {
  value: number;
  suffix?: string;
  verified: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const number = useMotionValue(reduced ? value : 0);
  const display = useTransform(
    number,
    (current) => `${Math.round(current)}${suffix}`,
  );
  useEffect(() => {
    if (!verified || !inView || reduced) return;
    const controls = animate(number, value, { duration: 0.8, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, number, reduced, value, verified]);
  if (!verified)
    return (
      <span>
        {value}
        {suffix}
      </span>
    );
  if (reduced)
    return (
      <span>
        {value}
        {suffix}
      </span>
    );
  return <motion.span ref={ref}>{display}</motion.span>;
}
