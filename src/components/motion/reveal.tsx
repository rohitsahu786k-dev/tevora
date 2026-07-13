"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { fadeReveal, staggerReveal } from "@/lib/motion/variants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ViewportReveal({
  children,
  className,
  delay = 0,
  amount = 0.18,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduced ? undefined : fadeReveal}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, amount }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const reduced = useReducedMotion();
  const common = {
    className,
    variants: reduced ? undefined : staggerReveal,
    initial: reduced ? (false as const) : "hidden",
    whileInView: reduced ? undefined : "visible",
    viewport: { once: true, amount: 0.12 },
  };
  if (as === "ul") return <motion.ul {...common}>{children}</motion.ul>;
  if (as === "ol") return <motion.ol {...common}>{children}</motion.ol>;
  return <motion.div {...common}>{children}</motion.div>;
}

export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduced ? undefined : fadeReveal}
      {...props}
    >
      {children}
    </motion.div>
  );
}
