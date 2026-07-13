"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
const Viewer = dynamic(
  () => import("@/components/media/model-viewer-placeholder"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-surface-muted grid aspect-[4/3] place-items-center">
        <span className="type-model text-ink-muted">LOADING 3D VIEW</span>
      </div>
    ),
  },
);
export function DynamicModelViewer({
  poster,
  alt,
}: {
  poster: string;
  alt: string;
}) {
  const [enabled, setEnabled] = useState(false);
  return enabled ? (
    <Viewer poster={poster} alt={alt} />
  ) : (
    <button
      type="button"
      onClick={() => setEnabled(true)}
      className="border-line bg-surface-muted hover:border-accent grid aspect-[4/3] w-full place-items-center border text-sm font-semibold"
    >
      <span>Load 3D view</span>
    </button>
  );
}
