"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionTokens } from "@/lib/motion/tokens";

export type ImageTransitionMode =
  "crossfade" | "soft-wipe" | "mask" | "zoom-settle";

export function TransitionImage({
  src,
  alt,
  mode = "crossfade",
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  mode?: ImageTransitionMode;
  sizes?: string;
}) {
  const reduced = useReducedMotion();
  const initial =
    mode === "zoom-settle"
      ? { opacity: 0.5, scale: 1.025 }
      : mode === "soft-wipe" || mode === "mask"
        ? { opacity: 0.72, clipPath: "inset(0 0 8% 0)" }
        : { opacity: 0.25 };
  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.div
        key={src}
        className="absolute inset-0"
        initial={reduced ? false : initial}
        animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
        exit={reduced ? undefined : { opacity: 0 }}
        transition={{
          duration: motionTokens.duration.component,
          ease: motionTokens.easing.soft,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>
    </AnimatePresence>
  );
}

export function BeforeAfterComparison({
  before,
  after,
}: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
}) {
  const [position, setPosition] = useState(50);
  return (
    <figure className="relative aspect-[3/2] overflow-hidden">
      <Image
        src={before.src}
        alt={before.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <label className="bg-surface/95 absolute inset-x-4 bottom-4 flex min-h-12 items-center gap-4 px-4">
        <span className="type-spec-label">Before</span>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="w-full accent-[var(--color-accent)]"
          aria-label="Adjust before and after comparison"
        />
        <span className="type-spec-label">After</span>
      </label>
    </figure>
  );
}
