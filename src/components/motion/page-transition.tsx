"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { routeReveal } from "@/lib/motion/variants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        variants={reduced ? undefined : routeReveal}
        initial={reduced ? false : "initial"}
        animate={reduced ? undefined : "enter"}
        exit={reduced ? undefined : "exit"}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
