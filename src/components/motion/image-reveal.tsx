"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { mediaReveal } from "@/lib/motion/variants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ImageReveal({
  children,
  className,
  priority = false,
}: {
  children: ReactNode;
  className?: string;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      variants={reduced ? undefined : mediaReveal}
      initial={reduced ? false : "hidden"}
      animate={priority && !reduced ? "visible" : undefined}
      whileInView={!priority && !reduced ? "visible" : undefined}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
