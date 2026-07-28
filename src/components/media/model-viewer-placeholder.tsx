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
      aria-label={`${alt}. Product view for project planning.`}
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
      <span className="glass-control type-model text-ink-muted p-3">
        PRODUCT VIEW
      </span>
    </div>
  );
}
