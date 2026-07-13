"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/button";
import {
  ImageReveal,
  MaskedHeading,
  TechnicalLineDiagram,
} from "@/components/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionTokens } from "@/lib/motion/tokens";

export function MotionShowcase() {
  const [run, setRun] = useState(0);
  const reduced = useReducedMotion();
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="border-line border p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="type-eyebrow text-accent">Component transition</p>
          <PrimaryButton
            type="button"
            onClick={() => setRun((value) => value + 1)}
          >
            Replay
          </PrimaryButton>
        </div>
        <motion.div
          key={run}
          initial={reduced ? false : { opacity: 0.72, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionTokens.duration.component,
            ease: motionTokens.easing.enter,
          }}
          className="bg-accent-light mt-8 min-h-52 p-6"
        >
          <MaskedHeading as="h3" className="type-h2">
            Precise movement, immediate access.
          </MaskedHeading>
          <p className="type-body-sm text-ink-muted mt-5">
            Content begins visible and resolves into place without blocking
            interaction.
          </p>
        </motion.div>
      </div>
      <ImageReveal className="bg-brand-950 grid min-h-80 place-items-center p-8 text-emerald-300">
        <div className="w-full">
          <TechnicalLineDiagram label="Demonstration of a technical equipment pathway" />
          <p className="type-caption mt-6 text-white/60">
            SVG line motion retains the complete diagram when motion is reduced.
          </p>
        </div>
      </ImageReveal>
      <div className="border-line border p-6 lg:col-span-2">
        <p className="type-spec-label">Current preference</p>
        <p className="type-body-lg mt-3">
          {reduced
            ? "Reduced motion: translations, scale, parallax and route movement are disabled."
            : "Standard motion: restrained transforms and opacity transitions are enabled."}
        </p>
      </div>
    </div>
  );
}
