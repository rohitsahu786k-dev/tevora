"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionTokens } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

type MosaicImage = {
  src: string;
  alt: string;
};

export function ContextualImageMosaic({
  images,
  className,
  priority = false,
}: {
  images: MosaicImage[];
  className?: string;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();
  const visibleImages = images.slice(0, 3);

  return (
    <motion.div
      className={cn(
        "text-graphite relative min-h-[26rem] overflow-hidden bg-white",
        className,
      )}
      initial={reduced ? false : { opacity: 0.82, scale: 0.985 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: motionTokens.duration.cinematic,
        ease: motionTokens.easing.soft,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(47,121,104,.13),rgba(255,255,255,0)_42%)]" />
      {visibleImages.map((image, index) => {
        const placement =
          index === 0
            ? "top-6 left-6 right-20 aspect-[4/3]"
            : index === 1
              ? "right-6 bottom-8 w-[52%] aspect-[4/3]"
              : "bottom-14 left-10 w-[38%] aspect-[4/3]";
        return (
          <motion.div
            key={`${image.src}-${index}`}
            className={cn(
              "border-line absolute overflow-hidden border bg-white shadow-[0_24px_60px_rgba(10,22,19,.12)]",
              placement,
            )}
            initial={reduced ? false : { opacity: 0, y: 18, scale: 0.96 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: index * 0.12,
              duration: motionTokens.duration.section,
              ease: motionTokens.easing.enter,
            }}
            whileHover={
              reduced
                ? undefined
                : {
                    y: -4,
                    transition: { duration: motionTokens.duration.component },
                  }
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={priority && index === 0}
              sizes="(min-width: 1024px) 36vw, 86vw"
              className="object-contain"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
