"use client";
export default function ModelViewerPlaceholder({
  poster,
  alt,
}: {
  poster: string;
  alt: string;
}) {
  return (
    <div
      className="bg-surface-muted relative grid aspect-[4/3] place-items-center overflow-hidden"
      role="img"
      aria-label={`${alt}. Interactive 3D view is not yet available.`}
      style={
        poster
          ? {
              backgroundImage: `url(${poster})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <span className="type-model bg-surface/90 text-ink-muted p-3">
        3D VIEW NOT AVAILABLE
      </span>
    </div>
  );
}
