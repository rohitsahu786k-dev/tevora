import type { MediaAsset } from "@/types/media";

export function AccessibleVideo({
  asset,
  className = "",
}: {
  asset: MediaAsset;
  className?: string;
}) {
  if (asset.kind !== "video")
    throw new Error(`AccessibleVideo requires video media: ${asset.id}`);
  return (
    <figure className={className}>
      <video
        controls
        playsInline
        preload="metadata"
        poster={asset.poster}
        aria-label={asset.alt}
        className="bg-brand-950 h-auto w-full"
      >
        <source src={asset.src} />
        {asset.transcript && (
          <track
            kind="descriptions"
            src={asset.transcript}
            srcLang="en"
            label="English descriptions"
          />
        )}
        Your browser does not support HTML video.
      </video>
      {(asset.caption || asset.credit) && (
        <figcaption className="type-caption text-ink-muted mt-3">
          {asset.caption}
          {asset.credit ? ` — ${asset.credit}` : ""}
        </figcaption>
      )}
    </figure>
  );
}
