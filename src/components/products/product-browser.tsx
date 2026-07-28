"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, SlidersHorizontal, X } from "lucide-react";
import { EmptyState } from "@/components/ui/system";
import {
  getProductFilterValues,
  type ProductFilterDefinition,
} from "@/lib/products/filtering";
import { routes } from "@/lib/routes";
import type { Product } from "@/types/content";
import { motionTokens } from "@/lib/motion/tokens";
import { TevoraMotionProvider } from "@/components/motion/motion-provider";
import { productConceptMediaBySlug } from "@/content/media";

export function ProductBrowser({
  products,
  definitions,
  familyName,
  spaceNames,
}: {
  products: Product[];
  definitions: ProductFilterDefinition[];
  familyName: string;
  spaceNames: Record<string, string>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileFilters, setMobileFilters] = useState(false);
  const filterDialogRef = useRef<HTMLDivElement>(null);
  const selected = Object.fromEntries(
    definitions.map((definition) => [
      definition.field,
      searchParams.get(definition.field)?.split(",").filter(Boolean) ?? [],
    ]),
  ) as Record<string, string[]>;
  const activeCount = Object.values(selected).reduce(
    (count, values) => count + values.length,
    0,
  );
  useEffect(() => {
    if (!mobileFilters || !filterDialogRef.current) return;
    const panel = filterDialogRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.querySelector<HTMLElement>("button,input")?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileFilters(false);
      if (event.key !== "Tab") return;
      const items = [
        ...panel.querySelectorAll<HTMLElement>(
          "button:not([disabled]),input:not([disabled]),a[href]",
        ),
      ];
      const first = items[0],
        last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = previous;
    };
  }, [mobileFilters]);
  const visible = products.filter((product) =>
    definitions.every((definition) => {
      const choices = selected[definition.field] ?? [];
      return (
        !choices.length ||
        choices.some((choice) =>
          getProductFilterValues(product, definition.field).includes(choice),
        )
      );
    }),
  );
  const update = (field: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    const values = new Set(next.get(field)?.split(",").filter(Boolean) ?? []);
    if (values.has(value)) values.delete(value);
    else values.add(value);
    if (values.size) next.set(field, [...values].join(","));
    else next.delete(field);
    router.push(
      `${pathname}${next.size ? `?${next.toString()}` : ""}` as never,
      {
        scroll: false,
      },
    );
  };
  const reset = () => router.push(pathname as never, { scroll: false });
  const filters = (
    <div className="space-y-8">
      {definitions.map((definition) => (
        <fieldset key={definition.id}>
          <legend className="type-spec-label mb-3">{definition.label}</legend>
          <div className="space-y-1">
            {definition.options.map((option) => {
              const checked =
                selected[definition.field]?.includes(option.value) ?? false;
              return (
                <label
                  key={option.value}
                  className="flex min-h-11 cursor-pointer items-center gap-3 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => update(definition.field, option.value)}
                    className="size-5 accent-[#2f7968]"
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
  return (
    <TevoraMotionProvider>
      <div>
        <div className="border-line mb-8 flex items-center justify-between border-y py-4">
          <p className="type-body-sm text-ink-muted">
            <motion.strong
              key={visible.length}
              initial={{ opacity: 0.6, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-graphite inline-block"
            >
              {visible.length}
            </motion.strong>{" "}
            {visible.length === 1 ? "product series" : "product series"}
          </p>
          <div className="flex gap-3">
            {activeCount > 0 && (
              <button
                type="button"
                onClick={reset}
                className="min-h-11 text-sm font-semibold underline underline-offset-4"
              >
                Reset filters
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileFilters(true)}
              className="border-line flex min-h-11 items-center gap-2 border px-4 text-sm font-semibold lg:hidden"
            >
              <SlidersHorizontal aria-hidden className="size-4" />
              Filters {activeCount > 0 && `(${activeCount})`}
            </button>
          </div>
        </div>
        <div className="grid gap-10 lg:grid-cols-[15rem_1fr]">
          <aside aria-label="Product filters" className="hidden lg:block">
            {filters}
          </aside>
          <div>
            {visible.length ? (
              <motion.div
                layout
                className="border-line bg-line grid gap-px border md:grid-cols-2"
              >
                {visible.map((product) => {
                  const primarySpace = getProductFilterValues(
                    product,
                    "space",
                  )[0];
                  const media = productConceptMediaBySlug[product.slug];
                  return (
                    <motion.article
                      key={product.slug}
                      layout
                      initial={{ opacity: 1, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: motionTokens.duration.component }}
                      className="group bg-surface grid min-h-[24rem] content-between"
                    >
                      {media?.kind === "image" && (
                        <div className="relative aspect-[4/3] overflow-hidden bg-white">
                          <Image
                            src={media.src}
                            alt={media.alt}
                            fill
                            sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
                            placeholder={media.blurDataURL ? "blur" : "empty"}
                            blurDataURL={media.blurDataURL}
                            className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.015] motion-reduce:transition-none"
                          />
                          <span className="type-model text-graphite absolute right-3 bottom-3 bg-white/90 px-2 py-1">
                            CONCEPT IMAGE
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between gap-4 px-6 pt-6">
                        <span className="type-series text-accent">
                          {product.series}
                        </span>
                        <span className="type-model text-ink-muted">
                          {product.model ?? "PROJECT CONFIGURED"}
                        </span>
                      </div>
                      <div className="p-6 pt-10">
                        <p className="type-caption text-ink-muted">
                          {familyName}
                        </p>
                        <h3 className="type-product mt-3">{product.name}</h3>
                        <p className="type-body-sm text-ink-muted mt-4">
                          {product.descriptor}
                        </p>
                        <dl className="border-line mt-7 grid gap-4 border-t pt-5 sm:grid-cols-2">
                          <div>
                            <dt className="type-spec-label text-ink-muted">
                              Primary application
                            </dt>
                            <dd className="type-body-sm mt-2">
                              {primarySpace
                                ? spaceNames[primarySpace]
                                : "Project dependent"}
                            </dd>
                          </div>
                          <div>
                            <dt className="type-spec-label text-ink-muted">
                              Key differentiator
                            </dt>
                            <dd className="type-body-sm mt-2">
                              {product.overview}
                            </dd>
                          </div>
                          <div>
                            <dt className="type-spec-label text-ink-muted">
                              Configuration
                            </dt>
                            <dd className="type-body-sm mt-2">
                              {product.dataStatus === "placeholder"
                                ? "Configured during project review"
                                : product.configurable
                                  ? "Configurable"
                                  : "Standard configuration"}
                            </dd>
                          </div>
                        </dl>
                        <Link
                          href={routes.product(product.slug)}
                          className="border-graphite mt-7 inline-flex min-h-11 items-center gap-2 border-b text-sm font-semibold"
                        >
                          View Product{" "}
                          <ArrowRight
                            aria-hidden
                            className="motion-arrow size-4"
                          />
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            ) : (
              <EmptyState
                title="No product series match these filters"
                description="Remove one or more filters to see other series in this product family."
                action={
                  <button
                    type="button"
                    onClick={reset}
                    className="border-graphite min-h-11 border px-4 text-sm font-semibold"
                  >
                    Reset filters
                  </button>
                }
              />
            )}
          </div>
        </div>
        <AnimatePresence>
          {mobileFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-brand-950/60 fixed inset-0 z-[100] lg:hidden"
              onMouseDown={(event) => {
                if (event.currentTarget === event.target)
                  setMobileFilters(false);
              }}
            >
              <motion.div
                ref={filterDialogRef}
                role="dialog"
                aria-modal="true"
                aria-label="Product filters"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  duration: motionTokens.duration.component,
                  ease: motionTokens.easing.enter,
                }}
                className="bg-surface ml-auto h-full w-[min(26rem,92vw)] overflow-y-auto p-6"
              >
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="type-h3">Filter products</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFilters(false)}
                    className="border-line grid size-11 place-items-center border"
                    aria-label="Close filters"
                  >
                    <X aria-hidden className="size-5" />
                  </button>
                </div>
                {filters}
                <div className="bg-surface sticky bottom-0 mt-8 grid grid-cols-2 gap-2 py-4">
                  <button
                    type="button"
                    onClick={reset}
                    className="border-graphite min-h-12 border px-4 font-semibold"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileFilters(false)}
                    className="bg-brand-900 min-h-12 px-4 font-semibold text-white"
                  >
                    Show {visible.length}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TevoraMotionProvider>
  );
}
