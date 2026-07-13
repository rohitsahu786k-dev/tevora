"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/system";
import { brandSettings } from "@/config/brand";
import { mediaAssets } from "@/content/media";
import { routes } from "@/lib/routes";
import { motionTokens } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduced ? "0%" : "6%"],
  );
  const cueOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const item = (delay: number) => ({
    initial: reduced ? false : { opacity: 1, y: 12 },
    animate: reduced ? undefined : { opacity: 1, y: 0 },
    transition: {
      delay,
      duration: motionTokens.duration.section,
      ease: motionTokens.easing.enter,
    },
  });

  return (
    <section
      ref={ref}
      className="bg-brand-950 relative min-h-[100svh] overflow-hidden text-white"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: mediaY }}
        initial={
          reduced ? false : { opacity: 0.7, scale: motionTokens.scale.media }
        }
        animate={reduced ? undefined : { opacity: 1, scale: 1 }}
        transition={{
          duration: motionTokens.duration.cinematic,
          ease: motionTokens.easing.soft,
        }}
      >
        <Image
          src={mediaAssets.homepageHero.src}
          alt={mediaAssets.homepageHero.alt}
          fill
          priority
          quality={68}
          sizes="100vw"
          className="object-cover object-[62%_center] md:object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,22,19,.9)_0%,rgba(10,22,19,.66)_40%,rgba(10,22,19,.08)_78%)]" />
      <Container className="relative flex min-h-[100svh] flex-col justify-end pt-32 pb-12 md:pb-16">
        <div className="max-w-4xl">
          <motion.div {...item(0.08)}>
            <Eyebrow className="text-emerald-300">
              {brandSettings.brandName} {brandSettings.brandDescriptor}
            </Eyebrow>
          </motion.div>
          <h1 className="type-hero mt-7 text-balance">
            {brandSettings.brandLine}
          </h1>
          <motion.p
            {...item(0.25)}
            className="type-body-lg mt-7 max-w-2xl text-white/75"
          >
            {brandSettings.brandName} designs technology-integrated furniture
            for presenting, teaching, meeting, collaborating and controlling.
          </motion.p>
          <motion.div {...item(0.34)} className="mt-9 flex flex-wrap gap-3">
            <PrimaryButton
              asChild
              className="text-brand-950! hover:border-accent hover:bg-accent! border-white bg-white! hover:text-white!"
            >
              <Link href={routes.products}>
                Explore Products{" "}
                <ArrowRight aria-hidden className="motion-arrow size-4" />
              </Link>
            </PrimaryButton>
            <SecondaryButton
              asChild
              className="hover:text-brand-950 border-white/55 text-white hover:border-white hover:bg-white"
            >
              <Link href={routes.spaces}>Explore Spaces</Link>
            </SecondaryButton>
          </motion.div>
        </div>
        <motion.div
          {...item(0.45)}
          style={{ opacity: cueOpacity }}
          className="mt-14 flex items-center gap-3 text-white/55"
        >
          <ArrowDown aria-hidden className="size-4 text-emerald-300" />
          <span className="type-model">EXPLORE {brandSettings.brandName}</span>
        </motion.div>
      </Container>
    </section>
  );
}
