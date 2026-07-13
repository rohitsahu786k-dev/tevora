export type MediaCategory =
  | "product-cutout"
  | "product-hero"
  | "product-detail"
  | "product-environment"
  | "product-family-hero"
  | "space-hero"
  | "sector-hero"
  | "project-media"
  | "finish-swatch"
  | "technical-diagram"
  | "video"
  | "360-sequence"
  | "3d-poster";

export type AspectRatioName =
  | "homepage-hero"
  | "product-family-hero"
  | "product-hero"
  | "product-tile"
  | "editorial-feature"
  | "portrait-story"
  | "finish-swatch"
  | "mobile-hero";

export type ImageFormat = "png" | "jpg" | "jpeg" | "webp" | "avif";
export type VideoFormat = "mp4" | "webm";
export type ModelFormat = "glb" | "usdz";

export interface FocalPoint {
  x: number;
  y: number;
}
export interface MediaAsset {
  id: string;
  category: MediaCategory;
  kind: "image" | "video" | "model" | "sequence";
  src: string;
  mobileSrc?: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: AspectRatioName;
  focalPoint?: FocalPoint;
  mobileFocalPoint?: FocalPoint;
  blurDataURL?: string;
  caption?: string;
  credit?: string;
  poster?: string;
  transcript?: string;
}
