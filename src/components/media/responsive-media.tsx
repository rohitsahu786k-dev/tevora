import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import { ImageWithFallback } from "@/components/media/image-with-fallback";
import { aspectRatios } from "@/content/media";
import type { MediaAsset } from "@/types/media";

export function ResponsiveMedia({
  asset,
  priority = false,
  sizes = "100vw",
  showCaption = false,
  className = "",
}: {
  asset: MediaAsset;
  priority?: boolean;
  sizes?: string;
  showCaption?: boolean;
  className?: string;
}) {
  if (asset.kind !== "image")
    throw new Error(`ResponsiveMedia requires an image asset: ${asset.id}`);
  const ratio = aspectRatios[asset.aspectRatio];
  const mobile = asset.mobileSrc
    ? getImageProps({
        src: asset.mobileSrc,
        alt: asset.alt,
        width: asset.width,
        height: asset.height,
        sizes: "100vw",
      }).props
    : null;
  const position = `${(asset.focalPoint?.x ?? 0.5) * 100}% ${(asset.focalPoint?.y ?? 0.5) * 100}%`;
  const mobilePosition = `${(asset.mobileFocalPoint?.x ?? asset.focalPoint?.x ?? 0.5) * 100}% ${(asset.mobileFocalPoint?.y ?? asset.focalPoint?.y ?? 0.5) * 100}%`;
  const focalStyle = {
    "--media-focal": position,
    "--media-focal-mobile": mobilePosition,
  } as CSSProperties;
  return (
    <figure className={className}>
      <div
        className="bg-surface-muted relative size-full overflow-hidden"
        style={{ aspectRatio: `${ratio.width}/${ratio.height}` }}
      >
        <picture className="absolute inset-0">
          {mobile && (
            <source media="(max-width: 639px)" srcSet={mobile.srcSet} />
          )}
          <ImageWithFallback
            src={asset.src}
            alt={asset.alt}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes={sizes}
            placeholder={asset.blurDataURL ? "blur" : "empty"}
            blurDataURL={asset.blurDataURL}
            className="media-focal motion-media object-cover"
            style={focalStyle}
          />
        </picture>
      </div>
      {showCaption && (asset.caption || asset.credit) && (
        <figcaption className="text-ink-muted mt-3 flex flex-wrap justify-between gap-2 text-xs">
          <span>{asset.caption}</span>
          {asset.credit && <span>Image: {asset.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
