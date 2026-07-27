"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { IconButton } from "@/components/ui/system";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionTokens } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

export type GalleryItem = { src: string; alt: string; label?: string };

export function ProductGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const move = useCallback(
    (direction: number) =>
      setActive(
        (current) => (current + direction + items.length) % items.length,
      ),
    [items.length],
  );
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const trigger = openRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
      if (
        event.key === "Tab" &&
        event.shiftKey &&
        document.activeElement === closeRef.current
      ) {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
      trigger?.focus();
    };
  }, [move, open]);
  if (!items.length) return null;
  const image = items[active]!;
  const transition = reduced
    ? { duration: 0 }
    : {
        duration: motionTokens.duration.component,
        ease: motionTokens.easing.soft,
      };
  const imageView = (fullscreen = false) => (
    <div
      className={cn(
        "relative overflow-hidden bg-white",
        fullscreen ? "h-[min(78vh,60rem)] w-full" : "aspect-[4/3]",
      )}
      onTouchStart={(event) =>
        (touchStart.current = event.touches[0]?.clientX ?? null)
      }
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta =
          (event.changedTouches[0]?.clientX ?? touchStart.current) -
          touchStart.current;
        if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1);
        touchStart.current = null;
      }}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={image.src}
          className="absolute inset-0"
          initial={reduced ? false : { opacity: 0.2, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? undefined : { opacity: 0, x: -6 }}
          transition={transition}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={fullscreen ? "100vw" : "(min-width:768px) 75vw, 100vw"}
            className="object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
  return (
    <>
      <div>
        <div className="relative">
          {imageView()}
          <button
            ref={openRef}
            type="button"
            onClick={() => setOpen(true)}
            className="bg-surface absolute top-4 right-4 grid size-12 place-items-center border border-black/10"
            aria-label="Open full-screen gallery"
          >
            <Expand aria-hidden className="size-4" />
          </button>
          <div className="bg-brand-950 absolute right-4 bottom-4 px-3 py-2 text-white">
            <span className="type-model">
              {active + 1} / {items.length}
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <IconButton
            label="Previous image"
            icon={ChevronLeft}
            onClick={() => move(-1)}
            disabled={items.length < 2}
          />
          <div
            className="flex flex-1 gap-2 overflow-x-auto"
            aria-label="Select gallery image"
          >
            {items.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                aria-label={`Show image ${index + 1}: ${item.label ?? item.alt}`}
                aria-current={active === index ? "true" : undefined}
                onClick={() => setActive(index)}
                className={cn(
                  "relative h-16 w-24 shrink-0 overflow-hidden border-2",
                  active === index ? "border-accent" : "border-transparent",
                )}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </button>
            ))}
          </div>
          <IconButton
            label="Next image"
            icon={ChevronRight}
            onClick={() => move(1)}
            disabled={items.length < 2}
          />
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="bg-brand-950/95 fixed inset-0 z-[120] grid place-items-center p-4 text-white md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 id={titleId} className="sr-only">
              Product gallery
            </h2>
            <button
              ref={closeRef}
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 grid size-12 place-items-center border border-white/30"
              aria-label="Close full-screen gallery"
            >
              <X aria-hidden className="size-5" />
            </button>
            <div className="w-full max-w-7xl">{imageView(true)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
