"use client";
import Image, { type ImageProps } from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

type Props = Omit<ImageProps, "alt"> & { alt: string; fallbackLabel?: string };
export function ImageWithFallback({ alt, fallbackLabel, ...props }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div
        role="img"
        aria-label={`${fallbackLabel ?? alt ?? "Image"} unavailable`}
        className="bg-surface-muted text-ink-muted flex size-full min-h-40 items-center justify-center"
      >
        <div className="text-center">
          <ImageIcon aria-hidden className="mx-auto size-7" />
          <span className="type-caption mt-3 block">Media unavailable</span>
        </div>
      </div>
    );
  return <Image alt={alt} {...props} onError={() => setFailed(true)} />;
}
