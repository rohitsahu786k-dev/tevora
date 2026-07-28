import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { MediaFrame, ProductBadge } from "@/components/ui/system";
import type { ContentEntry } from "@/types/content";
import { sharedElementStyle } from "@/lib/motion/shared-elements";
import { productConceptMediaBySlug } from "@/content/media";
export function ProductCard({
  entry,
  href,
}: {
  entry: ContentEntry;
  href: string;
}) {
  const media = productConceptMediaBySlug[entry.slug];
  return (
    <article className="motion-card group">
      <Link
        href={href as never}
        className="block focus-visible:outline-offset-4"
      >
        <MediaFrame
          className="grid place-items-center bg-white transition-colors duration-[var(--duration-slow)]"
          style={sharedElementStyle("product", entry.slug)}
        >
          {media?.kind === "image" ? (
            <>
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                placeholder={media.blurDataURL ? "blur" : "empty"}
                blurDataURL={media.blurDataURL}
                className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.015] motion-reduce:transition-none"
              />
            </>
          ) : (
            <span className="type-model text-ink-muted transition-transform duration-[var(--duration-base)] group-hover:-translate-y-0.5 motion-reduce:transition-none">
              PRODUCT VIEW
            </span>
          )}
        </MediaFrame>
        <div className="border-line border-t pt-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <ProductBadge>Platform</ProductBadge>
              <h3 className="type-h4 mt-4">{entry.title}</h3>
              <p className="type-body-sm text-ink-muted mt-2">
                {entry.summary}
              </p>
            </div>
            <ArrowUpRight
              aria-hidden
              className="motion-arrow mt-1 size-5 shrink-0"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
export function ProductTile({
  entry,
  reference,
}: {
  entry: ContentEntry;
  reference: string;
}) {
  return (
    <article className="motion-card border-line bg-surface grid min-h-52 content-between border p-5">
      <span className="type-model text-ink-muted">{reference}</span>
      <div>
        <h3 className="type-product">{entry.title}</h3>
        <p className="type-body-sm text-ink-muted mt-3">{entry.summary}</p>
      </div>
    </article>
  );
}
