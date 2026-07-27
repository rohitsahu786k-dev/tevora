"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useDeviceCapability } from "@/hooks/use-device-capability";
import { motionTokens } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

export type StickyStoryItem = {
  title: string;
  eyebrow: string;
  body: string;
  note?: string;
  media: string;
  alt: string;
};

export function StickyProductStory({ items }: { items: StickyStoryItem[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const reduced = useReducedMotion();
  const { limitedHeight } = useDeviceCapability();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current)
          setActive(Number((current.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-30% 0px -45%", threshold: [0.2, 0.5, 0.8] },
    );
    refs.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  if (!items.length) return null;
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden bg-white lg:col-span-7 lg:h-fit",
          !limitedHeight && "lg:sticky lg:top-24",
        )}
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={items[active]?.media}
            className="absolute inset-0"
            initial={reduced ? false : { opacity: 0.25, scale: 1.012 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{
              duration: motionTokens.duration.component,
              ease: motionTokens.easing.soft,
            }}
          >
            <Image
              src={items[active]!.media}
              alt={items[active]!.alt}
              fill
              sizes="(min-width:1024px) 58vw, 100vw"
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute right-4 bottom-4 flex gap-1" aria-hidden>
          {items.map((item, index) => (
            <span
              key={item.title}
              className={cn(
                "h-0.5 w-8 transition-colors",
                index === active ? "bg-white" : "bg-white/35",
              )}
            />
          ))}
        </div>
      </div>
      <div className="lg:col-span-4 lg:col-start-9">
        {items.map((item, index) => (
          <article
            key={item.title}
            ref={(node) => {
              refs.current[index] = node;
            }}
            data-index={index}
            className="border-line flex min-h-[22rem] flex-col justify-center border-t py-12 last:border-b"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="type-series text-accent">{item.eyebrow}</p>
              <span
                className="type-model text-ink-muted"
                aria-label={`Feature ${index + 1} of ${items.length}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h2 className="type-h2 mt-5">{item.title}</h2>
            <p className="type-body text-ink-muted mt-5">{item.body}</p>
            {item.note && (
              <p className="type-technical border-accent text-ink-muted mt-7 border-l-2 pl-4">
                Technical note: {item.note}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
